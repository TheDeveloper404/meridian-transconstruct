import {
  HONEYPOT_FIELD,
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact/validation";
import type { MailTransport, OutgoingMail } from "./mail-transport";
import type { FixedWindowRateLimiter } from "./rate-limit";

// Regulile cererii de ofertă: validare, anti-spam (honeypot + limitare), compunerea mesajului
// și trimiterea prin transportul primit. Nu știe nimic despre HTTP sau Nodemailer.

export type ContactResult =
  | { status: "sent" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "rate_limited"; retryAfterSeconds: number }
  | { status: "unavailable" }
  | { status: "failed" };

export type ContactServiceDeps = {
  /** null când SMTP/destinatarul nu sunt configurați. */
  transport: MailTransport | null;
  limiter: FixedWindowRateLimiter;
  from: string;
  to: string;
  now?: () => Date;
};

export type ContactService = {
  submit(raw: unknown, clientKey: string): Promise<ContactResult>;
};

export function buildContactMail(
  input: ContactInput,
  { from, to, receivedAt }: { from: string; to: string; receivedAt: Date },
): OutgoingMail {
  const received = new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Bucharest",
  }).format(receivedAt);

  // Doar text simplu: fără HTML, deci fără suprafață de injecție în clientul de e-mail.
  const text = [
    "Cerere nouă din formularul de pe site.",
    "",
    `Nume / firmă: ${input.name}`,
    `E-mail: ${input.email}`,
    `Telefon: ${input.phone || "—"}`,
    `Primită: ${received}`,
    "",
    "Despre lucrare:",
    input.message,
    "",
    "—",
    "Răspunde direct la acest e-mail pentru a scrie solicitantului.",
  ].join("\n");

  return {
    from,
    to,
    replyTo: input.email,
    subject: `Cerere ofertă — ${input.name}`,
    text,
  };
}

export function createContactService(deps: ContactServiceDeps): ContactService {
  const now = deps.now ?? (() => new Date());

  return {
    async submit(raw, clientKey) {
      const validation = validateContact(raw);
      if (!validation.ok) return { status: "invalid", errors: validation.errors };

      // Spam: răspundem ca la succes, ca botul să nu afle că a fost filtrat; nu trimitem nimic.
      // Verificat înaintea limitei, ca trimiterile filtrate să nu consume din cota vizitatorilor reali.
      const honeypot = raw !== null && typeof raw === "object"
        ? (raw as Record<string, unknown>)[HONEYPOT_FIELD]
        : undefined;
      if (typeof honeypot === "string" && honeypot.trim() !== "") return { status: "sent" };

      const decision = deps.limiter.consume(clientKey);
      if (!decision.allowed) {
        return { status: "rate_limited", retryAfterSeconds: decision.retryAfterSeconds };
      }

      if (!deps.transport) return { status: "unavailable" };

      try {
        await deps.transport.send(
          buildContactMail(validation.data, { from: deps.from, to: deps.to, receivedAt: now() }),
        );
        return { status: "sent" };
      } catch (error) {
        // Doar codul erorii: fără conținutul cererii, adrese sau răspunsul complet al serverului.
        const code =
          error !== null && typeof error === "object" && "code" in error ? String(error.code) : "UNKNOWN";
        console.error(`[contact] trimiterea SMTP a eșuat (${code})`);
        return { status: "failed" };
      }
    },
  };
}
