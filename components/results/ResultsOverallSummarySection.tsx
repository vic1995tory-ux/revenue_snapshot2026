"use client";

import type { OverallSummaryData } from "@/lib/results/types";

export function ResultsOverallSummarySection({
  summary,
}: {
  summary: OverallSummaryData;
}) {
  return (
    <section className="rounded-[32px] bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Итог
      </div>

      <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
        Сводка
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {summary.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[24px] bg-[#0d1c36] p-5"
          >
            <div className="text-sm text-white/52">{card.title}</div>
            <div className="mt-3 text-[18px] font-medium leading-[1.4]">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
