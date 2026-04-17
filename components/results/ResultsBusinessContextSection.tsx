"use client";

import { useState } from "react";
import type { BusinessContextData } from "@/lib/results/types";

export function ResultsBusinessContextSection({
  context,
}: {
  context: BusinessContextData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
            Business Context
          </div>
          <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
            Все данные о бизнесе в одной рамке
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white"
        >
          {open ? "Свернуть" : "Показать полностью"}
        </button>
      </div>

      <p className="mt-4 max-w-[960px] text-[15px] leading-[1.65] text-white/68">
        {context.summary}
      </p>

      {open ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {context.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[24px] border border-white/10 bg-[#0d1c36] p-5"
            >
              <div className="text-sm text-white/52">{section.title}</div>
              <div className="mt-4 grid gap-3">
                {section.rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <span className="text-white/62">{row.label}</span>
                    <span className="text-right text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
