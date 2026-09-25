// Configurația formularului, citită exclusiv din mediul serverului. Fără valori implicite pentru
// SMTP/destinatar: dacă lipsesc, formularul răspunde „indisponibil” (503) în loc să trimită greșit.

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
};

export type ContactConfig = {
  smtp: SmtpConfig;
  from: string;
  to: string;
};

export type RateLimitConfig = {
  limit: number;
  windowMs: number;
};

type Env = Record<string, string | undefined>;

function positiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function readContactConfig(env: Env = process.env): ContactConfig | null {
  const host = env.SMTP_HOST?.trim();
  const user = env.SMTP_USER?.trim();
  const password = env.SMTP_PASSWORD;
  const from = env.CONTACT_MAIL_FROM?.trim();
  const to = env.CONTACT_MAIL_TO?.trim();
  if (!host || !user || !password || !from || !to) return null;

  const port = positiveInt(env.SMTP_PORT, 587);
  // Port 465 = TLS implicit; 587 = STARTTLS. SMTP_SECURE suprascrie deducția.
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE === "true" : port === 465;

  return { smtp: { host, port, secure, user, password }, from, to };
}

export function readRateLimitConfig(env: Env = process.env): RateLimitConfig {
  return {
    limit: positiveInt(env.CONTACT_RATE_LIMIT_MAX, 5),
    windowMs: positiveInt(env.CONTACT_RATE_LIMIT_WINDOW_MINUTES, 60) * 60_000,
  };
}

/** Header-ele X-Forwarded-For / X-Real-IP sunt de încredere doar în spatele unui reverse proxy
 * care le suprascrie (nginx). Altfel oricine le poate falsifica. */
export function trustProxyHeaders(env: Env = process.env): boolean {
  return env.TRUST_PROXY === "true";
}
