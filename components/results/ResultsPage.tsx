"use client";

import { useState } from "react";
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

type FocusTopic = "problem" | "solution" | "plan" | "now";

const focusNavItems: Array<{ id: FocusTopic; label: string }> = [
  { id: "problem", label: "В чем проблема?" },
  { id: "solution", label: "Как решить?" },
  { id: "plan", label: "Какой план?" },
  { id: "now", label: "А сейчас-то что происходит?" },
];

function focusClass(activeTopic: FocusTopic | null, topics: FocusTopic[]) {
  if (!activeTopic) return "";
  return topics.includes(activeTopic) ? "rs-focus-match" : "rs-focus-muted";
}

export function ResultsPage({
  data,
  profileHref,
}: {
  data: ResultsPageData;
  profileHref?: string;
}) {
  const [activeTopic, setActiveTopic] = useState<FocusTopic | null>(null);

  return (
    <main className="rs-page-shell min-h-screen text-white">
      <div className="rs-page-background" aria-hidden="true">
        <div className="rs-aurora rs-aurora-1" />
        <div className="rs-aurora rs-aurora-2" />
        <div className="rs-aurora rs-aurora-3" />
        <div className="rs-aurora rs-aurora-4" />
        <div className="rs-vignette" />
      </div>
      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-5 pb-16 pt-6">
        <section className={focusClass(activeTopic, ["now", "problem"])} onClick={() => activeTopic && !["now", "problem"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsHeroSection hero={data.hero} />
        </section>

        <nav className="rs-question-nav">
          <div className="rs-question-group">
            {focusNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`rs-question-btn ${activeTopic === item.id ? "is-active" : ""}`}
                onClick={() =>
                  setActiveTopic((current) => (current === item.id ? null : item.id))
                }
              >
                {item.label}
              </button>
            ))}
          </div>
          <ResultsTopMenu profileHref={profileHref} />
        </nav>

        <section className={focusClass(activeTopic, ["solution", "plan"])} onClick={() => activeTopic && !["solution", "plan"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsTransitionSection transition={data.transition} />
        </section>

        <section className={focusClass(activeTopic, ["solution", "plan"])} onClick={() => activeTopic && !["solution", "plan"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsSolutionSection
            solution={data.solution}
            roadmap={data.roadmap}
            forecasts={data.forecasts}
          />
        </section>

        <section className={focusClass(activeTopic, ["plan", "now"])} onClick={() => activeTopic && !["plan", "now"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsScenariosSection scenarios={data.scenarios} />
        </section>

        <section className={focusClass(activeTopic, ["problem", "now"])} onClick={() => activeTopic && !["problem", "now"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsBlockTabsSection blocks={data.blocks} />
        </section>

        <section className={focusClass(activeTopic, ["now", "problem"])} onClick={() => activeTopic && !["now", "problem"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsEvidenceSection evidence={data.evidence} baseRevenue={data.hero.cashIn} />
        </section>

        <section className={focusClass(activeTopic, ["problem"])} onClick={() => activeTopic && !["problem"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsReliabilitySection reliability={data.reliability} />
        </section>

        <section className={focusClass(activeTopic, ["now"])} onClick={() => activeTopic && !["now"].includes(activeTopic) && setActiveTopic(null)}>
          <ResultsBusinessContextSection context={data.businessContext} />
        </section>

        <section className={focusClass(activeTopic, ["now", "problem", "solution", "plan"])} onClick={() => activeTopic && setActiveTopic(null)}>
          <ResultsOverallSummarySection summary={data.overallSummary} />
        </section>
      </div>
    </main>
  );
}
