import { beforeEach, describe, expect, it, vi } from "vitest";

const createTransport = vi.hoisted(() => vi.fn(() => ({ sendMail: vi.fn(async () => ({})) })));
vi.mock("nodemailer", () => ({ default: { createTransport } }));

import { createSmtpTransport } from "./smtp-transport";

const base = { host: "smtp.exemplu.ro", user: "u", password: "p" };

beforeEach(() => createTransport.mockClear());

describe("createSmtpTransport", () => {
  it("pe 587 cere STARTTLS obligatoriu (nu continuă în clar)", () => {
    createSmtpTransport({ ...base, port: 587, secure: false });
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ secure: false, requireTLS: true, tls: { minVersion: "TLSv1.2" } }),
    );
  });

  it("pe 465 folosește TLS implicit", () => {
    createSmtpTransport({ ...base, port: 465, secure: true });
    expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({ secure: true, requireTLS: false }));
  });
});
