"use client";

import type { AnalyticalBlockData } from "@/lib/results/types";
import { ConfidenceDots } from "../ConfidenceDots";

export function StrategyBlock({ block }: { block: AnalyticalBlockData }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-[#0d1c36] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
            {block.title}
          </div>
          <h3 className="mt-2 text-[28px] font-semibold leading-[0.98] tracking-[-0.04em]">
            {block.truthSummary}
          </h3>
        </div>
        <ConfidenceDots level={block.confidenceLevel} />
      </div>

      <p className="mt-4 max-w-[920px] text-[15px] leading-[1.65] text-white/70">
        {block.mainDiagnosis}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {block.keySignals.map((item) => (
          <div
            key={item.label}
            className="rounded-[20px] border border-white/10 bg-white/5 p-4"
          >
            <div className="text-sm text-white/50">{item.label}</div>
            <div className="mt-2 text-[18px] font-medium">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/50">Explanation</div>
          <p className="mt-3 text-[15px] leading-[1.65] text-white/72">
            {block.explanation}
          </p>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-white/50">Implication</div>
          <p className="mt-3 text-[15px] leading-[1.65] text-white/72">
            {block.implication}
          </p>
        </div>
      </div>
    </article>
  );
}
