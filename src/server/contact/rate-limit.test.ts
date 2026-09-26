import { describe, expect, it } from "vitest";
import { FixedWindowRateLimiter } from "./rate-limit";

function clock(start = 0) {
  let now = start;
  return { now: () => now, advance: (ms: number) => (now += ms) };
}

describe("FixedWindowRateLimiter", () => {
  it("permite până la limită, apoi blochează cu Retry-After", () => {
    const time = clock();
    const limiter = new FixedWindowRateLimiter({ limit: 2, windowMs: 60_000, now: time.now });

    expect(limiter.consume("a")).toEqual({ allowed: true });
    expect(limiter.consume("a")).toEqual({ allowed: true });
    time.advance(15_000);
    expect(limiter.consume("a")).toEqual({ allowed: false, retryAfterSeconds: 45 });
  });

  it("resetează după fereastră", () => {
    const time = clock();
    const limiter = new FixedWindowRateLimiter({ limit: 1, windowMs: 1_000, now: time.now });
    limiter.consume("a");
    expect(limiter.consume("a").allowed).toBe(false);
    time.advance(1_000);
    expect(limiter.consume("a").allowed).toBe(true);
  });

  it("numără cheile separat", () => {
    const limiter = new FixedWindowRateLimiter({ limit: 1, windowMs: 1_000, now: () => 0 });
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("b").allowed).toBe(true);
    expect(limiter.consume("a").allowed).toBe(false);
  });

  it("nu depășește numărul maxim de chei", () => {
    const limiter = new FixedWindowRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2, now: () => 0 });
    limiter.consume("a");
    limiter.consume("b");
    limiter.consume("c"); // elimină „a”, cea mai veche
    expect(limiter.consume("a").allowed).toBe(true);
    expect(limiter.consume("c").allowed).toBe(false);
  });

  it("sweepExpired șterge doar cheile cu fereastra expirată", () => {
    const time = clock();
    const limiter = new FixedWindowRateLimiter({ limit: 1, windowMs: 60_000, now: time.now });
    limiter.consume("a");
    time.advance(30_000);
    limiter.consume("b");
    time.advance(30_000);
    limiter.sweepExpired();
    expect(limiter.size).toBe(1); // „a” a expirat, „b” mai are 30 s
    time.advance(30_000);
    limiter.sweepExpired();
    expect(limiter.size).toBe(0);
  });
});
