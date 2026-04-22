"use client";

import type { TransitionData } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";
import { GrowthKpiCard } from "./GrowthKpiCard";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function numberFromText(value?: string) {
  const match = value?.replace(",", ".").match(/\d+(\.\d+)?/);
  if (!match) return 0;
  return Number(match[0]) || 0;
}

function moneyFromText(value?: string) {
  const compactMatch = value?.match(/\$?(\d+(\.\d+)?)k/i);
  if (compactMatch) return Number(compactMatch[1]) * 1000;
  return numberFromText(value);
}

function formatMoney(value: number) {
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return `$${Math.round(value)}`;
}

function TransitionTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; name?: string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-[14px] bg-[#111820]/95 p-3 shadow-2xl">
      <div className="text-xs uppercase tracking-[0.14em] text-[#f7d237]">
        {label}
      </div>
      <div className="mt-2 grid gap-1">
        {payload.map((item) => (
          <div key={item.name} className="text-sm text-white">
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsTransitionSection({
  transition,
}: {
  transition: TransitionData;
}) {
  const conversion = transition.kpiChanges.find((item) =>
    item.metric.toLowerCase().includes("conversion"),
  );
  const revenue = transition.kpiChanges.find((item) =>
    item.metric.toLowerCase().includes("revenue"),
  );
  const capacity = transition.kpiChanges.find((item) =>
    item.metric.toLowerCase().includes("capacity"),
  );
  const profit = transition.kpiChanges.find((item) =>
    item.metric.toLowerCase().includes("profit"),
  );
  const unmetDemand = transition.kpiChanges.find((item) =>
    item.metric.toLowerCase().includes("unmet"),
  );

  const currentConversion = numberFromText(conversion?.current);
  const targetConversion = numberFromText(conversion?.expected) || 12;
  const currentRevenue = moneyFromText(revenue?.current) || 1900;
  const targetRevenue = currentRevenue * 3;
  const currentCapacity = numberFromText(capacity?.current) || 325;

  const conversionData = [
    { name: "Текущая", value: currentConversion },
    { name: "До цели", value: Math.max(0, targetConversion - currentConversion) },
  ];

  const revenueTimeline = [
    { month: "0", revenue: currentRevenue, note: "Старт" },
    { month: "3", revenue: Math.round(currentRevenue * 1.25), note: "Unlock" },
    { month: "6", revenue: Math.round(currentRevenue * 1.75), note: "Leverage" },
    { month: "12", revenue: Math.round(targetRevenue), note: "Scale" },
  ];

  const capacityTimeline = [
    { month: "0", load: currentCapacity, note: "Перегруз" },
    { month: "3", load: 180, note: "Очередь" },
    { month: "6", load: 125, note: "Handoff" },
    { month: "12", load: 100, note: "Норма" },
  ];

  const financeTimeline = revenueTimeline.map((item, index) => ({
    month: item.month,
    revenue: item.revenue,
    profit: Math.round(item.revenue * [0.55, 0.45, 0.38, 0.35][index]),
  }));

  return (
    <section className="rounded-[32px] bg-[#121923] p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
            Переход
          </div>
          <h2 className="mt-2 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
            Цель
          </h2>
        </div>
        {transition.confidenceLevel ? (
          <ConfidenceDots level={transition.confidenceLevel} />
        ) : null}
      </div>

      <p className="mt-5 max-w-[980px] text-[16px] leading-[1.7] text-white/70">
        {transition.gapSummary}
      </p>

      <div className="mt-8 grid gap-10">
        <div className="grid items-center gap-7 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-5">
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              Conversion
            </div>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={76}
                    outerRadius={104}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                  >
                    <Cell fill="#f7d237" />
                    <Cell fill="rgba(255,255,255,0.08)" />
                  </Pie>
                  <Tooltip content={<TransitionTooltip />} />
                  <text
                    x="50%"
                    y="48%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-[28px] font-semibold"
                  >
                    {currentConversion}%
                  </text>
                  <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-[rgba(255,255,255,0.52)] text-[12px]"
                  >
                    цель {conversion?.expected}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {conversion ? (
            <div>
              <GrowthKpiCard
                title={conversion.metric}
                current={conversion.current}
                target={conversion.expected}
                delta={conversion.delta}
                driver={conversion.driver}
              />
            </div>
          ) : null}
        </div>

        <div className="grid items-center gap-7 xl:grid-cols-[0.92fr_1.08fr]">
          {revenue ? (
            <GrowthKpiCard
              title={revenue.metric}
              current={revenue.current}
              target={revenue.expected}
              delta={revenue.delta}
              driver={revenue.driver}
            />
          ) : null}
          <div>
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              Revenue
            </div>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTimeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 12 }} />
                  <Tooltip content={<TransitionTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#f7d237"
                    fill="rgba(247,210,55,0.18)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid items-center gap-7 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              Capacity
            </div>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={capacityTimeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 12 }} />
                  <Tooltip content={<TransitionTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="load"
                    name="Capacity load"
                    stroke="#57d6a3"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#57d6a3" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid gap-4">
            {capacity ? (
              <GrowthKpiCard
                title={capacity.metric}
                current={capacity.current}
                target={capacity.expected}
                delta={capacity.delta}
                driver={capacity.driver}
              />
            ) : null}
            {unmetDemand ? (
              <GrowthKpiCard
                title={unmetDemand.metric}
                current={unmetDemand.current}
                target={unmetDemand.expected}
                delta={unmetDemand.delta}
                driver={unmetDemand.driver}
              />
            ) : null}
          </div>
        </div>

        <div className="grid items-center gap-7 xl:grid-cols-[0.92fr_1.08fr]">
          {profit ? (
            <GrowthKpiCard
              title={profit.metric}
              current={profit.current}
              target={profit.expected}
              delta={profit.delta}
              driver={profit.driver}
            />
          ) : null}
          <div>
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              Доход / прибыль
            </div>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financeTimeline}>
                  <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 12 }} tickFormatter={(value) => formatMoney(Number(value))} />
                  <Tooltip content={<TransitionTooltip />} />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#f7d237" strokeWidth={3} />
                  <Line type="monotone" dataKey="profit" name="Profit" stroke="#57d6a3" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
