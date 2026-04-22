"use client";

import { ResultsHeroSection } from "./ResultsHeroSection";
import { ResultsSolutionSection } from "./ResultsSolutionSection";
import { ResultsTransitionSection } from "./ResultsTransitionSection";
import { ResultsScenariosSection } from "./ResultsScenariosSection";
import { ResultsEvidenceSection } from "./ResultsEvidenceSection";
import { ResultsReliabilitySection } from "./ResultsReliabilitySection";
import { ResultsBusinessContextSection } from "./ResultsBusinessContextSection";
import { ResultsBlockTabsSection } from "./ResultsBlockTabsSection";
import { ResultsOverallSummarySection } from "./ResultsOverallSummarySection";
import { ResultsTopMenu } from "./ResultsTopMenu";
import type { ResultsPageData } from "@/lib/results/types";

export function ResultsPage({ data }: { data: ResultsPageData }) {
  return (
    <main className="rs-page-shell min-h-screen text-white">
      <div className="rs-page-background" aria-hidden="true">
        <div className="rs-aurora rs-aurora-1" />
        <div className="rs-aurora rs-aurora-2" />
        <div className="rs-aurora rs-aurora-3" />
        <div className="rs-aurora rs-aurora-4" />
        <div className="rs-vignette" />
      </div>
      <ResultsTopMenu />
      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-16 pt-6">
        <ResultsHeroSection hero={data.hero} />

        <ResultsBlockTabsSection blocks={data.blocks} />

        <ResultsTransitionSection transition={data.transition} />

        <ResultsSolutionSection
          solution={data.solution}
          roadmap={data.roadmap}
          forecasts={data.forecasts}
        />

        <ResultsScenariosSection scenarios={data.scenarios} />

        <ResultsEvidenceSection evidence={data.evidence} baseRevenue={data.hero.cashIn} />

        <ResultsReliabilitySection reliability={data.reliability} />

        <ResultsBusinessContextSection context={data.businessContext} />

        <ResultsOverallSummarySection summary={data.overallSummary} />
      </div>
    </main>
  );
}
