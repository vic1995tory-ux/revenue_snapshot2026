"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { AnalyticalBlockData } from "@/lib/results/types";
import { ConfidenceDots } from "./ConfidenceDots";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLOCK_ORDER = [
  "strategy",
  "structure_processes",
  "analytics_management",
  "product_sales",
  "clients_flow",
  "positioning",
  "economics",
] as const;

const BLOCK_TITLES: Record<string, string> = {
  strategy: "Стратегия",
  structure_processes: "Структура",
  analytics_management: "Управление",
  product_sales: "Продажи",
  clients_flow: "Поток",
  positioning: "Позиция",
  economics: "Экономика",
};

const colors = ["#f7d237", "#8fa8ff", "#57d6a3", "#f59eaf", "#a78bfa"];

function extractNumber(value: string) {
  const match = value.replace(",", ".").match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const number = Number(match[0]);
  return Number.isFinite(number) ? Math.abs(number) : null;
}

function chartDataFromSignals(block: AnalyticalBlockData) {
  return block.keySignals
    .map((signal) => ({
      name: signal.label,
      value: extractNumber(signal.value),
      raw: signal.value,
    }))
    .filter((item): item is { name: string; value: number; raw: string } =>
      item.value !== null && item.value > 0
    );
}

function SignalTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload?: { name?: string; raw?: string } }>;
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0]?.payload;

  return (
    <div className="rounded-[16px] bg-[#081427]/95 p-3 shadow-2xl">
      <div className="text-xs uppercase tracking-[0.16em] text-[#f7d237]">
        Показатель
      </div>
      <div className="mt-2 text-sm font-medium text-white">
        {item?.name}: {item?.raw}
      </div>
    </div>
  );
}

function AnalyticalBlockCard({ block }: { block: AnalyticalBlockData }) {
  const chartData = chartDataFromSignals(block);
  const title = BLOCK_TITLES[block.id] ?? block.title;

  return (
    <article className="rounded-[32px] bg-white/[0.045] p-5 md:p-7">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#081932] p-6 md:p-7">
          <div className="pointer-events-none absolute inset-0 opacity-[0.13]">
            <Image
              src="/hero.svg"
              alt=""
              fill
              className="object-cover object-left"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
                  {title}
                </div>
                <h2 className="mt-3 text-[30px] font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-[42px]">
                  {block.mainDiagnosis}
                </h2>
              </div>
              <ConfidenceDots level={block.confidenceLevel} />
            </div>

            <p className="mt-5 max-w-[860px] text-[15px] leading-[1.72] text-white/68">
              {block.truthSummary}
            </p>

            <div className="mt-auto pt-8">
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/42">
                Следствие
              </div>
              <div className="mt-2 text-[18px] font-medium leading-[1.45] text-white">
                {block.implication}
              </div>
            </div>
          </div>
        </div>

        <div className="grid content-start gap-5">
          <div className="rounded-[24px] bg-[#0a1b38] p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
                  Сигналы
                </div>
                <h3 className="mt-2 text-[24px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
                  Показатели
                </h3>
              </div>
              {chartData.length ? (
                <div className="text-sm text-white/45">
                  {chartData.length} числ.
                </div>
              ) : null}
            </div>

            <div className="mt-5 overflow-hidden rounded-[18px] bg-white/[0.035]">
              <table className="w-full text-left text-sm">
                <tbody>
                  {block.keySignals.map((signal) => (
                    <tr key={signal.label} className="border-b border-white/6 last:border-b-0">
                      <th className="w-[48%] px-4 py-3 font-normal text-white/52">
                        {signal.label}
                      </th>
                      <td className="px-4 py-3 font-medium text-white">
                        {signal.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {chartData.length >= 2 ? (
            <div className="rounded-[24px] bg-[#0a1b38] p-5">
              <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
                Сравнение
              </div>
              <div className="mt-4 h-[230px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barCategoryGap={14}>
                    <CartesianGrid
                      stroke="rgba(255,255,255,0.06)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.62)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.36)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<SignalTooltip />}
                      cursor={{ fill: "rgba(255,255,255,0.035)" }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 3, 3]}>
                      {chartData.map((item, index) => (
                        <Cell
                          key={`${item.name}-${item.raw}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : null}

          <div className="rounded-[24px] bg-[#0a1b38] p-5">
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              Связь
            </div>
            <p className="mt-3 text-[15px] leading-[1.7] text-white/70">
              {block.explanation}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ResultsBlockTabsSection({
  blocks,
}: {
  blocks: AnalyticalBlockData[];
}) {
  const orderedBlocks = useMemo(() => {
    return BLOCK_ORDER.map((id) => blocks.find((block) => block.id === id)).filter(
      Boolean
    ) as AnalyticalBlockData[];
  }, [blocks]);

  return (
    <section className="grid gap-6">
      <div>
        <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
          Диагностика
        </div>
        <h2 className="mt-2 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
          Выводы
        </h2>
      </div>

      <div className="grid gap-6">
        {orderedBlocks.map((block) => (
          <AnalyticalBlockCard key={block.id} block={block} />
        ))}
      </div>
    </section>
  );
}
