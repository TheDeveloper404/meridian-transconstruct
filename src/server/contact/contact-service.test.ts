import { afterEach, describe, expect, it, vi } from "vitest";
import { buildContactMail, createContactService } from "./contact-service";
import type { MailTransport, OutgoingMail } from "./mail-transport";
import { FixedWindowRateLimiter } from "./rate-limit";

const valid = {
  name: "Firma Exemplu SRL",
  email: "contact@exemplu.ro",
  phone: "",
  message: "Renovare și anvelopare pentru o clădire de birouri în Lupeni.",
};

function fakeTransport(impl?: (mail: OutgoingMail) => Promise<void>) {
  const sent: OutgoingMail[] = [];
  const transport: MailTransport = {
    send: vi.fn(async (mail: OutgoingMail) => {
      if (impl) await impl(mail);
      sent.push(mail);
    }),
  };
  return { transport, sent };
}

function service(transport: MailTransport | null, limit = 5) {
  return createContactService({
    transport,
    limiter: new FixedWindowRateLimiter({ limit, windowMs: 60_000 }),
    from: "Site <site@exemplu.ro>",
    to: "inbox@exemplu.ro",
    now: () => new Date("2026-09-25T12:00:00Z"),
  });
}

afterEach(() => vi.restoreAllMocks());

describe("contact service", () => {
  it("trimite cererea validă către destinatarul din configurație, cu Reply-To vizitatorul", async () => {
    const { transport, sent } = fakeTransport();
    const result = await service(transport).submit({ ...valid, to: "atacator@rau.ro" }, "ip");

    expect(result).toEqual({ status: "sent" });
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({
      from: "Site <site@exemplu.ro>",
      to: "inbox@exemplu.ro",
      replyTo: "contact@exemplu.ro",
      subject: "Cerere ofertă — Firma Exemplu SRL",
    });
    expect(sent[0].text).toContain(valid.message);
  });

  it("nu trimite nimic pentru input invalid și nu consumă din limită", async () => {
    const { transport } = fakeTransport();
    const svc = service(transport, 1);

    const invalid = await svc.submit({ ...valid, email: "gresit" }, "ip");
    expect(invalid.status).toBe("invalid");
    expect(transport.send).not.toHaveBeenCalled();

    expect((await svc.submit(valid, "ip")).status).toBe("sent");
  });

  it("limitează trimiterile per client", async () => {
    const { transport } = fakeTransport();
    const svc = service(transport, 1);

    expect((await svc.submit(valid, "ip-1")).status).toBe("sent");
    const blocked = await svc.submit(valid, "ip-1");
    expect(blocked.status).toBe("rate_limited");
    expect((await svc.submit(valid, "ip-2")).status).toBe("sent");
    expect(transport.send).toHaveBeenCalledTimes(2);
  });

  it("honeypot completat: răspunde ca la succes, dar nu trimite", async () => {
    const { transport } = fakeTransport();
    const result = await service(transport).submit({ ...valid, website: "http://spam" }, "ip");
    expect(result).toEqual({ status: "sent" });
    expect(transport.send).not.toHaveBeenCalled();
  });

  it("honeypot completat nu consumă din limita vizitatorilor reali", async () => {
    const { transport } = fakeTransport();
    const svc = service(transport, 1);
    for (let i = 0; i < 3; i++) await svc.submit({ ...valid, website: "http://spam" }, "global");
    expect((await svc.submit(valid, "global")).status).toBe("sent");
    expect(transport.send).toHaveBeenCalledTimes(1);
  });

  it("fără configurație SMTP răspunde „unavailable”", async () => {
    expect(await service(null).submit(valid, "ip")).toEqual({ status: "unavailable" });
  });

  it("eșecul SMTP devine „failed”, fără să logheze datele cererii", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const { transport } = fakeTransport(async () => {
      throw Object.assign(new Error(`respins pentru ${valid.email}`), { code: "EAUTH" });
    });

    expect(await service(transport).submit(valid, "ip")).toEqual({ status: "failed" });
    expect(log).toHaveBeenCalledTimes(1);
    const logged = log.mock.calls.flat().join(" ");
    expect(logged).toContain("EAUTH");
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.message);
  });
});

describe("buildContactMail", () => {
  it("compune un e-mail text cu toate câmpurile și ora României", () => {
    const mail = buildContactMail(
      { ...valid, phone: "0723 400 646" },
      { from: "f@x.ro", to: "t@x.ro", receivedAt: new Date("2026-09-25T12:00:00Z") },
    );
    expect(mail.text).toContain("Nume / firmă: Firma Exemplu SRL");
    expect(mail.text).toContain("Telefon: 0723 400 646");
    expect(mail.text).toContain("15:00");
    expect(mail).not.toHaveProperty("html");
  });
});
