import { describe, expect, it, vi } from "vitest";
import { createContactService } from "./contact-service";
import { clientKey, handleContactRequest, MAX_BODY_BYTES } from "./http";
import type { MailTransport } from "./mail-transport";
import { FixedWindowRateLimiter } from "./rate-limit";

// Integrare: handler HTTP + serviciu real + transport fals (fără SMTP).

const valid = {
  name: "Maria Ionescu",
  email: "maria@example.ro",
  phone: "0726 379 408",
  message: "Aș dori o ofertă pentru un garaj în Vulcan.",
};

function setup({ limit = 5, transport }: { limit?: number; transport?: MailTransport | null } = {}) {
  const send = vi.fn(async () => {});
  const svc = createContactService({
    transport: transport === undefined ? { send } : transport,
    limiter: new FixedWindowRateLimiter({ limit, windowMs: 60_000 }),
    from: "site@example.ro",
    to: "inbox@example.ro",
  });
  const call = (init: RequestInit & { headers?: Record<string, string> } = {}, trustProxy = true) =>
    handleContactRequest(
      new Request("http://localhost/api/contact", {
        method: "POST",
        ...init,
        headers: { "content-type": "application/json", "x-real-ip": "203.0.113.7", ...init.headers },
      }),
      svc,
      { trustProxy },
    );
  return { send, call };
}

describe("POST /api/contact", () => {
  it("200 pentru o cerere validă", async () => {
    const { send, call } = setup();
    const response = await call({ body: JSON.stringify(valid) });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("400 cu erori pe câmpuri, în formatul unic de eroare", async () => {
    const { send, call } = setup();
    const response = await call({ body: JSON.stringify({ ...valid, email: "x" }) });
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details.fields).toHaveProperty("email");
    expect(send).not.toHaveBeenCalled();
  });

  it("400 pentru JSON invalid", async () => {
    const { call } = setup();
    const response = await call({ body: "{nu e json" });
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe("VALIDATION_ERROR");
  });

  it("415 pentru alt tip de conținut (ex. formular HTML de pe alt site)", async () => {
    const { send, call } = setup();
    const response = await call({
      body: "name=a&email=b",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    expect(response.status).toBe(415);
    expect(send).not.toHaveBeenCalled();
  });

  it("413 pentru corp prea mare, chiar fără Content-Length", async () => {
    const { send, call } = setup();
    const response = await call({ body: JSON.stringify({ ...valid, message: "a".repeat(MAX_BODY_BYTES) }) });
    expect(response.status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it("413 pentru corp chunked, fără să citească tot corpul", async () => {
    const { send } = setup();
    const svc = createContactService({
      transport: { send },
      limiter: new FixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
      from: "site@example.ro",
      to: "inbox@example.ro",
    });
    // 512 bucăți de 1 KiB, fără Content-Length; numărăm câte sunt cerute efectiv.
    let pulled = 0;
    const chunk = new TextEncoder().encode("a".repeat(1024));
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        if (pulled > 512) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: stream,
      duplex: "half",
    } as RequestInit);
    expect(request.headers.get("content-length")).toBeNull();

    const response = await handleContactRequest(request, svc, { trustProxy: false });
    expect(response.status).toBe(413);
    expect(pulled).toBeLessThan(40);
    expect(send).not.toHaveBeenCalled();
  });

  it("acceptă caractere pe mai mulți octeți împărțite între bucăți", async () => {
    const { send } = setup();
    const svc = createContactService({
      transport: { send },
      limiter: new FixedWindowRateLimiter({ limit: 5, windowMs: 60_000 }),
      from: "site@example.ro",
      to: "inbox@example.ro",
    });
    const bytes = new TextEncoder().encode(JSON.stringify({ ...valid, name: "Ștefan Țărână" }));
    const middle = bytes.indexOf(0xc8) + 1; // taie „Ș” (0xC8 0x98) în două
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, middle));
        controller.enqueue(bytes.slice(middle));
        controller.close();
      },
    });
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: stream,
      duplex: "half",
    } as RequestInit);

    const response = await handleContactRequest(request, svc, { trustProxy: false });
    expect(response.status).toBe(200);
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ subject: "Cerere ofertă — Ștefan Țărână" }));
  });

  it("429 cu Retry-After după limită", async () => {
    const { call } = setup({ limit: 1 });
    await call({ body: JSON.stringify(valid) });
    const response = await call({ body: JSON.stringify(valid) });
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
    expect((await response.json()).error.message).toContain("0723 400 646");
  });

  it("503 când SMTP nu e configurat", async () => {
    const { call } = setup({ transport: null });
    const response = await call({ body: JSON.stringify(valid) });
    expect(response.status).toBe(503);
    expect((await response.json()).error.code).toBe("SERVICE_UNAVAILABLE");
  });

  it("500 fără detalii interne când transportul eșuează", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { call } = setup({
      transport: {
        send: async () => {
          throw new Error("535 Authentication failed for smtp.intern.ro");
        },
      },
    });
    const response = await call({ body: JSON.stringify(valid) });
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toContain("INTERNAL_ERROR");
    expect(text).not.toContain("smtp.intern.ro");
    expect(text).not.toContain("535");
  });
});

describe("clientKey", () => {
  const request = (headers: Record<string, string>) => new Request("http://localhost", { headers });

  it("ignoră header-ele de proxy dacă proxy-ul nu e de încredere", () => {
    expect(clientKey(request({ "x-real-ip": "1.1.1.1" }), false)).toBe("global");
  });

  it("preferă X-Real-IP, apoi ultimul element din X-Forwarded-For", () => {
    expect(clientKey(request({ "x-real-ip": "1.1.1.1", "x-forwarded-for": "9.9.9.9" }), true)).toBe("1.1.1.1");
    // Primul element poate fi falsificat de client; ultimul e adăugat de proxy-ul nostru.
    expect(clientKey(request({ "x-forwarded-for": "6.6.6.6, 2.2.2.2" }), true)).toBe("2.2.2.2");
    expect(clientKey(request({}), true)).toBe("global");
  });
});
