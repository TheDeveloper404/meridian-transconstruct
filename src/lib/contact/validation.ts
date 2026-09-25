// Reguli de validare pentru cererea de ofertă. Funcție pură, folosită:
// - pe server (sursa de adevăr, în serviciul de contact);
// - în formular, doar pentru feedback imediat.

export type ContactField = "name" | "email" | "phone" | "message";

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors };

/** Câmp ascuns vizual (honeypot); un om nu îl completează, un bot de obicei da. */
export const HONEYPOT_FIELD = "website";

export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phone: 30,
  messageMin: 10,
  message: 5000,
} as const;

// Caractere de control (inclusiv CR/LF): nu au ce căuta în câmpuri pe un rând și ar permite
// injectarea de header-e dacă o valoare ajunge într-un header de e-mail.
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
// La mesaj păstrăm \n și \t; eliminăm restul caracterelor de control.
const MESSAGE_CONTROL_CHARS = /[\u0000-\u0008\u000B-\u001F\u007F]/g;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function singleLine(value: unknown): string {
  return text(value).replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim();
}

export function validateContact(raw: unknown): ValidationResult {
  const source = raw !== null && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  const name = singleLine(source.name);
  const email = singleLine(source.email);
  const phone = singleLine(source.phone);
  const message = text(source.message)
    .replace(/\r\n?/g, "\n")
    .replace(MESSAGE_CONTROL_CHARS, "")
    .trim();

  const errors: FieldErrors = {};

  if (!name) errors.name = "Completează numele sau denumirea firmei.";
  else if (name.length > CONTACT_LIMITS.name)
    errors.name = `Numele poate avea maximum ${CONTACT_LIMITS.name} de caractere.`;

  if (!email) errors.email = "Completează adresa de e-mail.";
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email))
    errors.email = "Adresa de e-mail nu este validă — folosește formatul nume@domeniu.ro.";

  if (phone) {
    const digits = phone.replace(/\D/g, "").length;
    if (phone.length > CONTACT_LIMITS.phone || !PHONE_RE.test(phone) || digits < 6 || digits > 15)
      errors.phone = "Numărul de telefon nu este valid — de exemplu 0723 400 646.";
  }

  if (!message) errors.message = "Descrie pe scurt lucrarea.";
  else if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Descrie lucrarea în cel puțin ${CONTACT_LIMITS.messageMin} caractere.`;
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Mesajul poate avea maximum ${CONTACT_LIMITS.message} de caractere.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, phone, message } };
}
