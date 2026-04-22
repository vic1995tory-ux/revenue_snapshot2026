"use client";

import type { ScenariosData } from "@/lib/results/types";

export function ResultsScenariosSection({
  scenarios,
}: {
  scenarios: ScenariosData;
}) {
  return (
    <section className="rounded-[32px] bg-[#121923] p-6 md:p-8">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Сценарии
      </div>
      <h2 className="mt-2 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
        Варианты
      </h2>

      <div className="mt-7 grid gap-6 lg:grid-cols-3">
        {scenarios.items.map((item) => (
          <article key={item.name}>
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              {item.name}
            </div>
            <h3 className="mt-3 text-[22px] font-semibold leading-[1.12] text-white">
              {item.description}
            </h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-white/66">
              {item.expectedOutcome}
            </p>
            {item.note ? (
              <p className="mt-4 text-sm leading-[1.65] text-white/48">
                {item.note}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Допущения
          </div>
          <div className="mt-4 grid gap-3">
            {scenarios.assumptions.map((item) => (
              <div key={item} className="text-[15px] leading-[1.6] text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
            Чувствительность
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {scenarios.sensitivityPoints.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/7 px-3 py-1.5 text-sm text-white/72"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
