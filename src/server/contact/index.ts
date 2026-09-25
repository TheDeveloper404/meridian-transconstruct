import { readContactConfig, readRateLimitConfig } from "./config";
import { createContactService, type ContactService } from "./contact-service";
import { FixedWindowRateLimiter } from "./rate-limit";
import { createSmtpTransport } from "./smtp-transport";

// Compunerea serviciului din configurația de mediu. O singură instanță per proces, ca limitarea
// trimiterilor să persiste între cereri.

let service: ContactService | undefined;

export function getContactService(): ContactService {
  if (!service) {
    const config = readContactConfig();
    const { limit, windowMs } = readRateLimitConfig();
    service = createContactService({
      transport: config ? createSmtpTransport(config.smtp) : null,
      limiter: new FixedWindowRateLimiter({ limit, windowMs }),
      from: config?.from ?? "",
      to: config?.to ?? "",
    });
  }
  return service;
}

export type { ContactResult, ContactService } from "./contact-service";
