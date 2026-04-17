"use client";

import type { ForecastsData } from "@/lib/results/types";
import { MetricCard } from "./MetricCard";

export function ResultsForecastsSection({
  forecasts,
}: {
  forecasts: ForecastsData;
}) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Forecasts
      </div>

      <h2 className="mt-2 text-[32px] font-semibold leading-[0.96] tracking-[-0.04em]">
        Что меняется при внедрении
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Revenue"
          current={forecasts.revenue.current}
          target={forecasts.revenue.target}
          delta={forecasts.revenue.delta}
        />
        <MetricCard
          title="Costs"
          current={forecasts.costs.current}
          target={forecasts.costs.target}
          delta={forecasts.costs.delta}
          invert
        />
        <MetricCard
          title="Profit"
          current={forecasts.profit.current}
          target={forecasts.profit.target}
          delta={forecasts.profit.delta}
        />
      </div>

      <div className="mt-6 rounded-[24px] border border-white/10 bg-[#0d1c36] p-5">
        <div className="text-sm text-white/52">Scenario assumptions</div>
        <div className="mt-3 grid gap-2">
          {forecasts.assumptions.map((item) => (
            <div key={item} className="text-[15px] leading-[1.6] text-white/72">
              • {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
