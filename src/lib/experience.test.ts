import { describe, expect, it } from "vitest";
import { formatYears, fullYearsSince } from "./experience";

describe("fullYearsSince", () => {
  it("numără doar anii împliniți", () => {
    expect(fullYearsSince("2019-07-26", new Date(2026, 8, 25))).toBe(7);
    expect(fullYearsSince("2019-07-26", new Date(2026, 6, 25))).toBe(6);
    expect(fullYearsSince("2019-07-26", new Date(2026, 6, 26))).toBe(7);
  });

  it("nu întoarce valori negative", () => {
    expect(fullYearsSince("2030-01-01", new Date(2026, 0, 1))).toBe(0);
  });
});

describe("formatYears", () => {
  it("acordă corect numeralul", () => {
    expect(formatYears(1)).toBe("1 an");
    expect(formatYears(7)).toBe("7 ani");
    expect(formatYears(19)).toBe("19 ani");
    expect(formatYears(20)).toBe("20 de ani");
    expect(formatYears(101)).toBe("101 ani");
  });
});
