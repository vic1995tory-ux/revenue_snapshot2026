"use client";

import { ResultsHeroSection } from "./ResultsHeroSection";
import { ResultsSolutionSection } from "./ResultsSolutionSection";
import { ResultsRoadmapSection } from "./ResultsRoadmapSection";
import { ResultsForecastsSection } from "./ResultsForecastsSection";
import { ResultsBusinessContextSection } from "./ResultsBusinessContextSection";
import { ResultsBlockTabsSection } from "./ResultsBlockTabsSection";
import { ResultsOverallSummarySection } from "./ResultsOverallSummarySection";
import type { ResultsPageData } from "@/lib/results/types";

export function ResultsPage({ data }: { data: ResultsPageData }) {
  return (
    <main className="min-h-screen bg-[#0a1526] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-16 pt-10">
        <ResultsHeroSection hero={data.hero} />

        <ResultsSolutionSection
          solution={data.solution}
          roadmap={data.roadmap}
        />

        <ResultsRoadmapSection roadmap={data.roadmap} />
        <ResultsForecastsSection forecasts={data.forecasts} />
        <ResultsBusinessContextSection context={data.businessContext} />

        <ResultsBlockTabsSection
          blocks={data.blocks}
          overallSummary={data.overallSummary}
        />

        <ResultsOverallSummarySection summary={data.overallSummary} />
      </div>
    </main>
  );
}
