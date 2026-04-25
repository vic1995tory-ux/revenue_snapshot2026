import { describe, expect, it } from "vitest";
import {
  getPurchasedServiceLabel,
  getServiceCodeFromPlan,
  getServiceCodeFromToken,
} from "../lib/purchase-service";

describe("purchase-service", () => {
  it("maps plan names to service codes", () => {
    expect(getServiceCodeFromPlan("playground")).toBe("pg");
    expect(getServiceCodeFromPlan("onrec")).toBe("on_rec");
    expect(getServiceCodeFromPlan("gs")).toBe("gs");
    expect(getServiceCodeFromPlan("unknown")).toBeNull();
  });

  it("extracts service code from access token prefixes", () => {
    expect(getServiceCodeFromToken("pg_123")).toBe("pg");
    expect(getServiceCodeFromToken("on_rec_test")).toBe("on_rec");
    expect(getServiceCodeFromToken("sa-token")).toBe("sa");
    expect(getServiceCodeFromToken("mystery_token")).toBeNull();
  });

  it("returns readable labels for purchased services", () => {
    expect(getPurchasedServiceLabel("pg_123", false)).toBe(
      "Playground Revenue Snapshot"
    );
    expect(getPurchasedServiceLabel("on_rec_123", false)).toBe(
      "On Rec Revenue Snapshot"
    );
    expect(getPurchasedServiceLabel("demo", true)).toBe("Revenue Snapshot");
  });
});
