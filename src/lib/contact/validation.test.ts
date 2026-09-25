import { describe, expect, it } from "vitest";
import { CONTACT_LIMITS, validateContact } from "./validation";

const valid = {
  name: "Ion Popescu",
  email: "ion@example.ro",
  phone: "0723 400 646",
  message: "Casă P+1 la roșu în Petrila, avem autorizația.",
};

describe("validateContact", () => {
  it("acceptă o cerere completă și normalizează spațiile", () => {
    const result = validateContact({ ...valid, name: "  Ion   Popescu  ", email: " ion@example.ro " });
    expect(result).toEqual({ ok: true, data: { ...valid, name: "Ion Popescu" } });
  });

  it("telefonul este opțional", () => {
    const result = validateContact({ ...valid, phone: "" });
    expect(result.ok).toBe(true);
  });

  it("cere nume, e-mail și mesaj", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("tratează input care nu e obiect ca gol", () => {
    for (const raw of [null, undefined, "text", 42, []]) {
      expect(validateContact(raw).ok).toBe(false);
    }
  });

  it("ignoră valori care nu sunt șiruri", () => {
    const result = validateContact({ ...valid, name: { $ne: "" }, message: ["a"] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toHaveProperty("name");
  });

  it("respinge e-mailuri invalide", () => {
    for (const email of ["ion", "ion@", "ion@example", "ion @example.ro", `${"a".repeat(250)}@x.ro`]) {
      const result = validateContact({ ...valid, email });
      expect(result.ok, email).toBe(false);
    }
  });

  it("elimină CR/LF din câmpurile pe un rând (fără injecție de header-e)", () => {
    const result = validateContact({
      ...valid,
      name: "Ion\r\nBcc: victima@example.com",
      email: "ion@example.ro\r\nBcc: x@y.ro",
    });
    // Numele rămâne pe un rând; e-mailul cu CR/LF devine invalid.
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBeDefined();
      expect(result.errors.name).toBeUndefined();
    }
    const nameOnly = validateContact({ ...valid, name: "Ion\r\nBcc: victima@example.com" });
    expect(nameOnly.ok && nameOnly.data.name).toBe("Ion Bcc: victima@example.com");
  });

  it("păstrează rândurile noi în mesaj și elimină alte caractere de control", () => {
    const result = validateContact({ ...valid, message: "Rând 1\r\nRând 2\u0000\u0007 final" });
    expect(result.ok && result.data.message).toBe("Rând 1\nRând 2 final");
  });

  it("validează telefonul doar dacă e completat", () => {
    expect(validateContact({ ...valid, phone: "+40 723 400 646" }).ok).toBe(true);
    expect(validateContact({ ...valid, phone: "(0254) 541-234" }).ok).toBe(true);
    expect(validateContact({ ...valid, phone: "abc" }).ok).toBe(false);
    expect(validateContact({ ...valid, phone: "12345" }).ok).toBe(false);
  });

  it("aplică limitele de lungime", () => {
    expect(validateContact({ ...valid, name: "a".repeat(CONTACT_LIMITS.name + 1) }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "scurt" }).ok).toBe(false);
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.message) }).ok).toBe(true);
    expect(validateContact({ ...valid, message: "a".repeat(CONTACT_LIMITS.message + 1) }).ok).toBe(false);
  });
});
