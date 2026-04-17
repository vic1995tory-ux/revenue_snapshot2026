"use client";

import type { SolutionData } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";

export function ResultsSolutionSection({
  solution,
}: {
  solution: SolutionData;
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
            Solution
          </div>
          <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
            {solution.title}
          </h2>
        </div>
        <ConfidenceDots level={solution.confidenceLevel} />
      </div>

      <p className="max-w-[960px] text-[17px] leading-[1.65] text-white/74">
        {solution.summary}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {solution.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5"
          >
            <div className="text-sm text-white/52">{card.title}</div>
            <div className="mt-3 text-[18px] font-medium leading-[1.35] text-white">
              {card.value}
            </div>
            {card.note ? (
              <div className="mt-3 text-sm leading-[1.5] text-white/58">{card.note}</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
