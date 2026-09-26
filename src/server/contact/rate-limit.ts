// Limitare de trimiteri pe fereastră fixă, în memoria procesului.
// Potrivită pentru un singur proces Node (server OVHcloud cu `next start` / standalone).
// Cu mai multe instanțe sau restarturi dese, limita devine per proces — atunci se mută într-un
// magazin partajat. Numărul de chei e plafonat ca memoria să nu crească nelimitat.

export type RateLimitDecision = { allowed: true } | { allowed: false; retryAfterSeconds: number };

type Bucket = { count: number; windowStart: number };

export type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  maxKeys?: number;
  now?: () => number;
};

export class FixedWindowRateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly maxKeys: number;
  private readonly now: () => number;

  constructor({ limit, windowMs, maxKeys = 10_000, now = Date.now }: RateLimiterOptions) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.maxKeys = maxKeys;
    this.now = now;
  }

  consume(key: string): RateLimitDecision {
    const now = this.now();
    const bucket = this.buckets.get(key);

    if (!bucket || now - bucket.windowStart >= this.windowMs) {
      this.makeRoom(now);
      this.buckets.set(key, { count: 1, windowStart: now });
      return { allowed: true };
    }

    if (bucket.count >= this.limit) {
      const retryAfterMs = bucket.windowStart + this.windowMs - now;
      return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
    }

    bucket.count += 1;
    return { allowed: true };
  }

  /** Șterge cheile (adresele IP) a căror fereastră a expirat. Apelată periodic din `index.ts`,
   * ca IP-urile să nu rămână în memorie după fereastră (politica de confidențialitate). */
  sweepExpired() {
    const now = this.now();
    for (const [key, bucket] of this.buckets) {
      if (now - bucket.windowStart >= this.windowMs) this.buckets.delete(key);
    }
  }

  get size(): number {
    return this.buckets.size;
  }

  private makeRoom(now: number) {
    if (this.buckets.size < this.maxKeys) return;
    for (const [key, bucket] of this.buckets) {
      if (now - bucket.windowStart >= this.windowMs) this.buckets.delete(key);
    }
    // Toate cheile sunt încă active: eliminăm cea mai veche (Map păstrează ordinea inserării).
    if (this.buckets.size >= this.maxKeys) {
      const oldest = this.buckets.keys().next().value;
      if (oldest !== undefined) this.buckets.delete(oldest);
    }
  }
}
