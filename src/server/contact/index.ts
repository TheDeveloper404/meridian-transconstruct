import { readContactConfig, readRateLimitConfig, trustProxyHeaders } from "./config";
import { createContactService, type ContactService } from "./contact-service";
import { FixedWindowRateLimiter } from "./rate-limit";
import { createSmtpTransport } from "./smtp-transport";

// Compunerea serviciului din configurația de mediu. O singură instanță per proces, ca limitarea
// trimiterilor să persiste între cereri.

let service: ContactService | undefined;

/** Cât de des se șterg din memorie IP-urile cu fereastra expirată. */
const SWEEP_INTERVAL_MS = 60_000;

export function getContactService(): ContactService {
  if (!service) {
    const config = readContactConfig();
    const { limit, windowMs } = readRateLimitConfig();
    const limiter = new FixedWindowRateLimiter({ limit, windowMs });
    // unref: temporizatorul nu ține procesul în viață la oprire.
    setInterval(() => limiter.sweepExpired(), SWEEP_INTERVAL_MS).unref();

    if (process.env.NODE_ENV === "production" && !trustProxyHeaders()) {
      // Fără proxy de încredere nu știm IP-ul vizitatorului: toți împart aceeași limită.
      console.warn("[contact] TRUST_PROXY nu e activ: limita de trimiteri e comună tuturor vizitatorilor");
    }

    service = createContactService({
      transport: config ? createSmtpTransport(config.smtp) : null,
      limiter,
      from: config?.from ?? "",
      to: config?.to ?? "",
    });
  }
  return service;
}

export type { ContactResult, ContactService } from "./contact-service";
