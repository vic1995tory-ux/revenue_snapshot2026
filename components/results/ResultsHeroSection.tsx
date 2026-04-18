"use client";

import type { HeroData } from "@/lib/results/types";
import { motion } from "framer-motion";
import { BarChart3, BriefcaseBusiness, MapPin, TrendingUp, Users, Wallet } from "lucide-react";
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
import { ConfidenceDots } from "./ConfidenceDots";
import { InfoPill } from "./InfoPill";

const colors = [
  "#c7a93b",
  "#b8962f",
  "#a8842a",
  "#967528",
  "#846625",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

function formatMonths(value?: number) {
  if (!value || !Number.isFinite(value)) return "—";
  if (value < 12) return `${value} мес.`;
  const years = Math.floor(value / 12);
  const months = value % 12;
  if (!months) return `${years} г.`;
  return `${years} г. ${months} мес.`;
}

function GoldTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ value?: number; name?: string; payload?: Record<string, unknown> }>;
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0];
  const value = typeof point?.value === "number" ? point.value : 0;
  const pointName =
    typeof point?.name === "string"
      ? point.name
      : typeof label === "string"
        ? label
        : "Показатель";

  return (
    <div className="max-w-[280px] rounded-[18px] border border-[#c7a93b]/20 bg-[#081427]/95 p-3 shadow-2xl backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.18em] text-[#c7a93b]">
        Data point
      </div>
      <div className="mt-2 text-sm font-semibold text-white">
        {pointName}: {formatNumber(value)}
        {suffix}
      </div>
      <p className="mt-2 text-xs leading-5 text-white/68">
        Краткая сводка по этому сигналу из payload.
      </p>
    </div>
  );
}

function HeroCard({
  icon,
  label,
  value,
  subvalue,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subvalue?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-2 text-white/48">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c7a93b]/20 bg-[#c7a93b]/10 text-[#c7a93b]">
          {icon}
        </div>
        <div className="text-[12px] uppercase tracking-[0.18em]">{label}</div>
      </div>

      <div className="mt-4 text-[24px] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-[30px]">
        {value}
      </div>

      {subvalue ? (
        <div className="mt-3 text-sm leading-6 text-white/62">{subvalue}</div>
      ) : null}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.24em] text-[#c7a93b]">
      {children}
    </div>
  );
}

export function ResultsHeroSection({ hero }: { hero: HeroData }) {
  const productMarginsData = hero.productMargins.map((item) => ({
    name: item.name,
    value: item.marginPercent,
  }));

  const clientsVsLeadsData = hero.clientsVsLeads
    ? [
        { name: "Clients", value: hero.clientsVsLeads.clients },
        { name: "Leads", value: hero.clientsVsLeads.leads },
      ]
    : [];

  const channelMixData = hero.channelMix ?? [];

  const businessMeta = [
    hero.stage ? `Stage: ${hero.stage}` : null,
    hero.businessAgeMonths ? `Age: ${formatMonths(hero.businessAgeMonths)}` : null,
    hero.physicalLocation ? `Location: ${hero.physicalLocation}` : null,
    hero.teamSizeCore ? `Core team: ${hero.teamSizeCore}` : null,
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#071426] px-5 py-5 shadow-[0_30px_80px_rgba(0,0,0,0.32)] md:px-7 md:py-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,169,59,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(199,169,59,0.08),transparent_24%)]" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <InfoPill>{hero.companyName || "Revenue Snapshot"}</InfoPill>
              <InfoPill>{hero.salesGeography}</InfoPill>
              <ConfidenceDots level={hero.confidenceLevel} />
            </div>

            <SectionLabel>Business snapshot</SectionLabel>

            <h1 className="mt-3 max-w-[760px] text-[38px] font-semibold leading-[0.92] tracking-[-0.05em] text-white md:text-[56px]">
              Revenue Snapshot
            </h1>

            <p className="mt-5 max-w-[780px] text-[19px] leading-[1.28] text-white/88 md:text-[21px]">
              {hero.summary}
            </p>

            <p className="mt-4 max-w-[760px] text-[15px] leading-[1.7] text-white/62">
              {hero.description}
            </p>

            {businessMeta.length ? (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {businessMeta.map((item) => (
                  <InfoPill key={item}>{item}</InfoPill>
                ))}
              </div>
            ) : null}

            {!!hero.roles.length && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {hero.roles.map((role) => (
                  <InfoPill key={`${role.role}-${role.responsibility}`}>
                    {role.role}: {role.responsibility}
                  </InfoPill>
                ))}
              </div>
            )}

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <HeroCard
                icon={<TrendingUp size={16} />}
                label="Growth limit"
                value={hero.growthLimit}
                subvalue={hero.currentPosition || "Главное ограничение роста, вынесенное в верхний уровень страницы."}
              />

              <HeroCard
                icon={<Wallet size={16} />}
                label="Cash-in"
                value={hero.cashIn}
                subvalue={hero.snapshot || "Фактически полученный платеж за последний период."}
              />
            </div>
          </div>

          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <SectionLabel>Products</SectionLabel>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Product margins
                  </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7a93b]/20 bg-[#c7a93b]/10 text-[#c7a93b]">
                  <BarChart3 size={18} />
                </div>
              </div>

              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productMarginsData} barCategoryGap={18}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.68)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.42)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<GoldTooltip suffix="%" />}
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    />
                    <Bar dataKey="value" radius={[10, 10, 4, 4]}>
                      {productMarginsData.map((entry, index) => (
                        <Cell key={entry.name} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <SectionLabel>Flow</SectionLabel>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Clients vs leads
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7a93b]/20 bg-[#c7a93b]/10 text-[#c7a93b]">
                    <Users size={18} />
                  </div>
                </div>

                <div className="h-[210px]">
                  {clientsVsLeadsData.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={clientsVsLeadsData} barCategoryGap={28}>
                        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "rgba(255,255,255,0.68)", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "rgba(255,255,255,0.42)", fontSize: 12 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          content={<GoldTooltip />}
                          cursor={{ fill: "rgba(255,255,255,0.03)" }}
                        />
                        <Bar dataKey="value" radius={[10, 10, 4, 4]}>
                          {clientsVsLeadsData.map((entry, index) => (
                            <Cell key={entry.name} fill={colors[index % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                      No data
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <SectionLabel>Acquisition</SectionLabel>
                    <div className="mt-2 text-lg font-semibold text-white">
                      Channel mix
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c7a93b]/20 bg-[#c7a93b]/10 text-[#c7a93b]">
                    <MapPin size={18} />
                  </div>
                </div>

                <div className="h-[210px]">
                  {channelMixData.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelMixData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={48}
                          outerRadius={82}
                          paddingAngle={3}
                        >
                          {channelMixData.map((entry, index) => (
                            <Cell key={entry.name} fill={colors[index % colors.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<GoldTooltip suffix="%" />} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                      No data
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-4">
            <div className="flex items-center gap-2 text-white/50">
              <BriefcaseBusiness size={15} className="text-[#c7a93b]" />
              <span className="text-[11px] uppercase tracking-[0.18em]">Snapshot</span>
            </div>
            <div className="mt-3 text-sm leading-6 text-white/76">
              {hero.snapshot || "Нет данных"}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-4">
            <div className="flex items-center gap-2 text-white/50">
              <TrendingUp size={15} className="text-[#c7a93b]" />
              <span className="text-[11px] uppercase tracking-[0.18em]">Current position</span>
            </div>
            <div className="mt-3 text-sm leading-6 text-white/76">
              {hero.currentPosition || "Нет данных"}
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-4">
            <div className="flex items-center gap-2 text-white/50">
              <Users size={15} className="text-[#c7a93b]" />
              <span className="text-[11px] uppercase tracking-[0.18em]">Business facts</span>
            </div>
            <div className="mt-3 text-sm leading-6 text-white/76">
              {[hero.stage, hero.physicalLocation, hero.teamSizeCore ? `${hero.teamSizeCore} core team` : null]
                .filter(Boolean)
                .join(" · ") || "Нет данных"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
