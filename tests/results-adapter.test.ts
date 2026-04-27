import { describe, expect, it } from "vitest";
import { adaptRawResultsPayload } from "../lib/results/adapters";
import { resultsPayloadMock } from "../lib/results/mock-data";

describe("adaptRawResultsPayload", () => {
  it("converts raw Revenue Snapshot payload into page data", () => {
    const adapted = adaptRawResultsPayload(resultsPayloadMock);

    expect(adapted).not.toBeNull();
    expect(adapted?.hero.summary).toBe(resultsPayloadMock.hero_block.summary);
    expect(adapted?.solution.title).toBe(
      resultsPayloadMock.solution.solution_summary.headline,
    );
    expect(adapted?.transition.gapSummary).toBe(
      resultsPayloadMock.current_vs_target.gap_summary,
    );
    expect(adapted?.roadmap.phases.length).toBeGreaterThan(0);
    expect(adapted?.blocks.length).toBeGreaterThan(0);
  });
});
