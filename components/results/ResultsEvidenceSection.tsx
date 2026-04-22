"use client";

import type { EvidenceChartData, EvidenceData } from "@/lib/results/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = ["#f7d237", "#57d6a3", "#d4a373", "#e9c46a", "#b8c0aa"];

function EvidenceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; name?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0];

  return (
    <div className="rounded-[14px] bg-[#111820]/95 p-3 shadow-2xl">
      <div className="text-xs uppercase tracking-[0.14em] text-[#f7d237]">
        {point.name ?? label}
      </div>
      <div className="mt-2 text-sm font-medium text-white">{point.value}</div>
    </div>
  );
}

function EvidenceChart({ chart }: { chart: EvidenceChartData }) {
  const isDonut = chart.chartType === "donut";

  return (
    <div>
      <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
        {chart.title}
      </div>
      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          {isDonut ? (
            <PieChart>
              <Pie
                data={chart.series}
                dataKey="value"
                nameKey="label"
                innerRadius={62}
                outerRadius={96}
                paddingAngle={3}
              >
                {chart.series.map((item, index) => (
                  <Cell
                    key={`${chart.id}-${item.label}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<EvidenceTooltip />} />
            </PieChart>
          ) : (
            <BarChart data={chart.series} barCategoryGap={16}>
              <CartesianGrid stroke="rgba(255,255,255,0.07)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<EvidenceTooltip />} />
              <Bar dataKey="value" radius={[8, 8, 2, 2]}>
                {chart.series.map((item, index) => (
                  <Cell
                    key={`${chart.id}-${item.label}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ResultsEvidenceSection({ evidence }: { evidence: EvidenceData }) {
  return (
    <section className="rounded-[32px] bg-[#121923] p-6 md:p-8">
      <div className="text-sm uppercase tracking-[0.16em] text-[#f7d237]">
        Данные
      </div>
      <h2 className="mt-2 text-[36px] font-semibold leading-[0.96] tracking-[-0.04em] text-white md:text-[48px]">
        Метрики
      </h2>

      <div className="mt-8 grid gap-9 lg:grid-cols-2">
        {evidence.charts.map((chart) => (
          <EvidenceChart key={chart.id} chart={chart} />
        ))}
      </div>

      <div className="mt-10 grid gap-10">
        {evidence.tables.map((table) => (
          <div key={table.id}>
            <div className="text-sm uppercase tracking-[0.14em] text-[#f7d237]">
              {table.title}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {table.columns.map((column) => (
                      <th
                        key={column}
                        className="py-3 pr-5 font-normal text-white/44"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, index) => (
                    <tr key={`${table.id}-${index}`} className="border-b border-white/7 last:border-b-0">
                      {table.columns.map((column) => (
                        <td key={column} className="py-3 pr-5 text-white/78">
                          {String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
