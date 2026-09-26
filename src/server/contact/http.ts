import { company } from "@/content/company";
import type { ContactResult, ContactService } from "./contact-service";

// Stratul HTTP al formularului: tip de conținut, dimensiune, parsare JSON, cheia clientului și
// maparea rezultatului pe coduri HTTP. Format unic de eroare: { error: { code, message, details? } }.

export const MAX_BODY_BYTES = 16 * 1024;

type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNSUPPORTED_MEDIA_TYPE"
  | "PAYLOAD_TOO_LARGE"
  | "RATE_LIMITED"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

function errorResponse(
  status: number,
  code: ErrorCode,
  message: string,
  details?: unknown,
  headers?: HeadersInit,
): Response {
  return Response.json(
    { error: { code, message, ...(details === undefined ? {} : { details }) } },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

const PHONE_FALLBACK = `Poți suna la ${company.phones.map((phone) => phone.display).join(" sau ")}.`;

export function clientKey(request: Request, trustProxy: boolean): string {
  if (!trustProxy) return "global";
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  // Ultimul element e cel adăugat de proxy-ul nostru; cele dinainte pot fi trimise de client.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return forwarded || "global";
}

/** Citește corpul pe bucăți și se oprește imediat ce depășește limita: fără Content-Length
 * (transfer chunked), `request.text()` ar citi tot în memorie înainte de verificare.
 * `null` = prea mare. */
async function readBodyWithLimit(request: Request, limit: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export function toResponse(result: ContactResult): Response {
  switch (result.status) {
    case "sent":
      return Response.json({ ok: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
    case "invalid":
      return errorResponse(400, "VALIDATION_ERROR", "Verifică câmpurile marcate.", {
        fields: result.errors,
      });
    case "rate_limited":
      return errorResponse(
        429,
        "RATE_LIMITED",
        `Au fost trimise prea multe cereri într-un timp scurt. Încearcă din nou mai târziu. ${PHONE_FALLBACK}`,
        undefined,
        { "Retry-After": String(result.retryAfterSeconds) },
      );
    case "unavailable":
      return errorResponse(
        503,
        "SERVICE_UNAVAILABLE",
        `Formularul nu este disponibil momentan. ${PHONE_FALLBACK}`,
      );
    case "failed":
      return errorResponse(
        500,
        "INTERNAL_ERROR",
        `Cererea nu a putut fi trimisă. Încearcă din nou. ${PHONE_FALLBACK}`,
      );
  }
}

export async function handleContactRequest(
  request: Request,
  service: ContactService,
  { trustProxy }: { trustProxy: boolean },
): Promise<Response> {
  // Doar JSON: un formular HTML de pe alt site nu poate trimite application/json fără preflight CORS.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return errorResponse(415, "UNSUPPORTED_MEDIA_TYPE", "Cererea trebuie trimisă ca JSON.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", "Cererea este prea mare.");
  }

  const body = await readBodyWithLimit(request, MAX_BODY_BYTES);
  if (body === null) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", "Cererea este prea mare.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return errorResponse(400, "VALIDATION_ERROR", "Cererea nu este un JSON valid.");
  }

  const result = await service.submit(payload, clientKey(request, trustProxy));
  return toResponse(result);
}
