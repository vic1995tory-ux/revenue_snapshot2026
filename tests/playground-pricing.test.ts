import { describe, expect, it } from "vitest";
import { getPlaygroundPricingSnapshot } from "../lib/playground-pricing";

describe("playground pricing", () => {
  it("uses preorder price before May 8 UTC", () => {
    const snapshot = getPlaygroundPricingSnapshot(
      new Date(Date.UTC(2026, 4, 7, 12, 0, 0))
    );

    expect(snapshot.currentPrice).toBe(93);
    expect(snapshot.tiers[0]?.active).toBe(true);
  });

  it("uses middle tier from May 8 until May 17 UTC inclusive", () => {
    const snapshot = getPlaygroundPricingSnapshot(
      new Date(Date.UTC(2026, 4, 12, 12, 0, 0))
    );

    expect(snapshot.currentPrice).toBe(115);
    expect(snapshot.tiers[1]?.active).toBe(true);
  });

  it("uses final tier from May 18 UTC", () => {
    const snapshot = getPlaygroundPricingSnapshot(
      new Date(Date.UTC(2026, 4, 18, 0, 0, 0))
    );

    expect(snapshot.currentPrice).toBe(147);
    expect(snapshot.tiers[2]?.active).toBe(true);
  });
});
