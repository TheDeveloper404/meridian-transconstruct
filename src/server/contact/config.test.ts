import { describe, expect, it } from "vitest";
import { readContactConfig, readRateLimitConfig, trustProxyHeaders } from "./config";

const env = {
  SMTP_HOST: "smtp.example.ro",
  SMTP_USER: "site@example.ro",
  SMTP_PASSWORD: "secret",
  CONTACT_MAIL_FROM: "Meridian Transconstruct <site@example.ro>",
  CONTACT_MAIL_TO: "inbox@example.ro",
};

describe("readContactConfig", () => {
  it("returnează null dacă lipsește orice valoare obligatorie", () => {
    for (const key of Object.keys(env)) {
      expect(readContactConfig({ ...env, [key]: "" }), key).toBeNull();
    }
  });

  it("port 587 + STARTTLS implicit; 465 = TLS implicit; SMTP_SECURE suprascrie", () => {
    expect(readContactConfig(env)?.smtp).toMatchObject({ port: 587, secure: false });
    expect(readContactConfig({ ...env, SMTP_PORT: "465" })?.smtp).toMatchObject({ port: 465, secure: true });
    expect(readContactConfig({ ...env, SMTP_PORT: "2525", SMTP_SECURE: "true" })?.smtp.secure).toBe(true);
  });
});

describe("readRateLimitConfig", () => {
  it("are valori implicite și ignoră valori invalide", () => {
    expect(readRateLimitConfig({})).toEqual({ limit: 5, windowMs: 3_600_000 });
    expect(readRateLimitConfig({ CONTACT_RATE_LIMIT_MAX: "-1", CONTACT_RATE_LIMIT_WINDOW_MINUTES: "x" })).toEqual({
      limit: 5,
      windowMs: 3_600_000,
    });
    expect(readRateLimitConfig({ CONTACT_RATE_LIMIT_MAX: "3", CONTACT_RATE_LIMIT_WINDOW_MINUTES: "10" })).toEqual({
      limit: 3,
      windowMs: 600_000,
    });
  });
});

describe("trustProxyHeaders", () => {
  it("este activ doar cu TRUST_PROXY=true", () => {
    expect(trustProxyHeaders({})).toBe(false);
    expect(trustProxyHeaders({ TRUST_PROXY: "1" })).toBe(false);
    expect(trustProxyHeaders({ TRUST_PROXY: "true" })).toBe(true);
  });
});
