"use client";

import { type ReactNode } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  Treemap,
} from "recharts";

export type ConfidenceLevel = "high" | "medium" | "preliminary";

export type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title?: string;
  tooltip_text?: string;
};

export type ConfidenceUiSystem = {
  component: "reliability_dots";
  dots_total: number;
  dot_size_px: number;
  gap_px: number;
  hover_zone: string;
  inactive_style: string;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
};

export type HeroBlockPayload = {
  companyName?: string;
  summary?: string;
  description?: string;
  growth_limit?: string;
  sales_geography?: string[];
  roles?: Array<{
    role: string;
    responsibility?: string;
    decision_maker?: boolean;
  }>;
  cash_in?: {
    value?: number;
    currency?: string;
    period?: string;
  };
  product_margins_chart?: {
    series?: Array<{
      product: string;
      margin: number;
    }>;
  };
  clients_vs_leads_chart?: {
    series?: Array<{
      label: string;
      value: number;
    }>;
  };
};

export type UnifiedResultsPayload = {
  hero_block?: HeroBlockPayload;
  normalized_data?: any;
  summary?: any;
  insights?: any;
  positioning?: any;
};

const BRAND = {
  yellow: "#f7d237",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number, maxFractionDigits = 0) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

function formatPercent(value: number, maxFractionDigits = 0) {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, maxFractionDigits)}%`;
}

function formatCurrency(value: number, currency = "USD") {
  if (!Number.isFinite(value)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${formatNumber(value)}`;
  }
}

function safeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function HeroInfoTile({
  label,
  value,
  subvalue,
  fullWidth = false,
  tone = "default",
}: {
  label: string;
  value: string;
  subvalue?: string;
  fullWidth?: boolean;
  tone?: "default" | "accent";
}) {
  return (
    <div
      className={cn(
        "rounded-[24px] border px-5 py-5 backdrop-blur-xl",
        tone === "accent"
          ? "border-[#f7d237]/18 bg-[#f7d237]/10"
          : "border-white/10 bg-white/[0.04]",
        fullWidth && "md:col-span-2"
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/46">
        {label}
      </div>
      <div className="mt-3 text-[20px] font-semibold leading-snug text-white md:text-[22px]">
        {value}
      </div>
      {subvalue ? (
        <div className="mt-2 text-sm leading-6 text-white/64">{subvalue}</div>
      ) : null}
    </div>
  );
}

function HeroTag({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 text-center text-[13px] font-medium text-white/82 backdrop-blur-xl",
        wide ? "min-w-[220px]" : "min-w-[120px]"
      )}
    >
      {children}
    </div>
  );
}

function HeroProductMarginRadials({
  items,
}: {
  items: Array<{ title: string; value: number }>;
}) {
  const normalized = items
    .filter((item) => Number.isFinite(item.value))
    .slice(0, 3)
    .map((item) => ({
      ...item,
      fill: BRAND.yellow,
    }));

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        Core product margins
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {normalized.map((item) => (
          <div
            key={item.title}
            className="rounded-[20px] border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="h-[144px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="72%"
                  outerRadius="100%"
                  data={[{ name: item.title, value: clamp(item.value, 0, 100) }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                  />
                  <RadialBar
                    dataKey="value"
                    cornerRadius={12}
                    background={{ fill: "rgba(255,255,255,0.10)" }}
                    fill={item.fill}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            <div className="-mt-16 text-center">
              <div className="text-[28px] font-semibold text-white">
                {formatPercent(item.value)}
              </div>
              <div className="mt-2 text-sm leading-5 text-white/68">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroChannelTreemap({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number }>;
}) {
  const colors = ["#c7a93b", "#b8962f", "#a8842a", "#967528", "#846625"];

  const data = [...items]
    .filter((item) => Number.isFinite(item.value) && item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((item, index) => ({
      name: item.label,
      size: item.value,
      fill: colors[index] ?? colors[colors.length - 1],
    }));

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        {title}
      </div>

      <div className="mt-5 h-[320px] w-full overflow-hidden rounded-[18px] border border-white/8 bg-[#0f223f]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="size"
            stroke="rgba(255,255,255,0.10)"
            content={({ x, y, width, height, name, size, fill }: any) => {
              if (width < 60 || height < 42) return null;

              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    rx={10}
                    ry={10}
                    fill={fill}
                  />
                  <text
                    x={x + width / 2}
                    y={y + height / 2 - 6}
                    textAnchor="middle"
                    fill="#fefefe"
                    fontSize={width > 120 ? 16 : 13}
                    fontWeight={600}
                  >
                    {name}
                  </text>
                  <text
                    x={x + width / 2}
                    y={y + height / 2 + 16}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.75)"
                    fontSize={12}
                  >
                    {formatPercent(size)}
                  </text>
                </g>
              );
            }}
          />
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function HeroConversionCard({
  leads,
  clients,
  conversionRatePercent,
}: {
  leads: number;
  clients: number;
  conversionRatePercent: number;
}) {
  const safePercent = clamp(
    Number.isFinite(conversionRatePercent) ? conversionRatePercent : 0,
    0,
    100
  );

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        Lead → client conversion
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative h-[140px] w-[140px] shrink-0 rounded-full"
          style={{
            background: `conic-gradient(${BRAND.yellow} 0 ${safePercent}%, rgba(255,255,255,0.10) ${safePercent}% 100%)`,
          }}
        >
          <div className="absolute inset-[24px] rounded-full bg-[#10213d]" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <div className="text-[24px] font-semibold text-white">
                {formatPercent(safePercent, 1)}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/42">
                conversion
              </div>
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-3">
          <div className="rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              leads
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(leads)}
            </div>
          </div>

          <div className="rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              clients
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(clients)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroDemandCapacity({
  demand,
  capacity,
}: {
  demand: number;
  capacity: number;
}) {
  const maxValue = Math.max(demand, capacity, 1);
  const demandWidth = `${(demand / maxValue) * 100}%`;
  const capacityWidth = `${(capacity / maxValue) * 100}%`;

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        Demand / capacity
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-sm text-white/62">Leads</span>
            <span className="text-base font-semibold text-white">
              {formatNumber(demand)}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full"
              style={{
                width: demandWidth,
                background:
                  "linear-gradient(90deg, rgba(247,210,55,0.95), rgba(243,216,106,0.95))",
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-sm text-white/62">Capacity</span>
            <span className="text-base font-semibold text-white">
              {formatNumber(capacity)}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-white/40"
              style={{ width: capacityWidth }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              gap
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(Math.max(demand - capacity, 0))}
            </div>
          </div>

          <div className="rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              ratio
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {capacity > 0 ? `${(demand / capacity).toFixed(2)}x` : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type HeroSectionProps = {
  results: UnifiedResultsPayload;
  generatedAt?: string;
  resultStatus?: string;
};

export default function HeroSection({
  results,
  generatedAt,
  resultStatus = "ready",
}: HeroSectionProps) {
  const hero = results.hero_block ?? {};
  const normalized = (results.normalized_data ?? {}) as any;

  const company = normalized.company ?? {};
  const financials = normalized.financials ?? {};
  const sales = normalized.sales ?? {};
  const acquisition = normalized.acquisition ?? {};
  const team = normalized.team ?? {};
  const summaryBlock = results.summary ?? {};
  const positioning = results.positioning ?? {};

  const companyName =
    hero.companyName?.trim() || company.name || "Revenue Snapshot";
  const summary = hero.summary?.trim() || summaryBlock.snapshot || "—";
  const description = hero.description?.trim() || company.description || "—";

  const businessModel = positioning.business_model ?? {};
  const modelShift =
    [businessModel.type, businessModel.explanation].filter(Boolean).join(" — ") ||
    "—";

  const geoLabel =
    safeStringArray(
      hero.sales_geography?.length ? hero.sales_geography : company.sales_geography
    ).join(" / ") || "—";

  const stageLabel = company.stage || "—";

  const revenueValue =
    financials.last_month_cash_in ?? hero.cash_in?.value ?? null;
  const revenueCurrency =
    financials.last_month_currency ?? hero.cash_in?.currency ?? "USD";

  const revenueTag =
    revenueValue !== null
      ? formatCurrency(Number(revenueValue), revenueCurrency)
      : "—";

  const revenueSubvalue =
    hero.cash_in?.period === "last_month" || financials.last_month_cash_in
      ? "last month cash-in"
      : "revenue basis";

  const paymentModel =
    financials.contract_payment_structure || "модель оплаты не указана";

  const growthLimit =
    hero.growth_limit ||
    acquisition.main_need_for_improvement ||
    results.insights?.growth_limit?.text ||
    "—";

  const decisionMakers =
    (Array.isArray(team?.roles) && team.roles.length ? team.roles : hero.roles) ?? [];

  const productMargins =
    hero.product_margins_chart?.series?.map((item) => ({
      title: item.product,
      value: Number(item.margin ?? 0),
    })) ?? [];

  const channelDistribution = Array.isArray(acquisition.channels)
    ? acquisition.channels.map((item: any) => ({
        label: item.channel,
        value: Number(item.share_percent ?? 0),
      }))
    : [];

  const leads = Number(
    sales.lead_volume ??
      hero.clients_vs_leads_chart?.series?.find((x) => x.label === "Лиды")?.value ??
      0
  );

  const clients = Number(
    sales.last_month_clients ??
      hero.clients_vs_leads_chart?.series?.find((x) => x.label === "Клиенты")?.value ??
      0
  );

  const conversionRatePercent =
    sales.conversion_rate != null
      ? Number(sales.conversion_rate) * 100
      : leads > 0
      ? (clients / leads) * 100
      : 0;

  const demand = Number(sales.lead_volume ?? 0);
  const capacity = Number(sales.processing_capacity ?? 0);
  const demandRatio = capacity > 0 ? `${(demand / capacity).toFixed(2)}x` : "—";

  return (
    <GlassCard className="mb-8 overflow-hidden p-0">
      <div className="grid xl:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-white/10 p-6 md:p-8 xl:border-b-0 xl:border-r xl:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] uppercase tracking-[0.26em] text-[#f7d237]">
            <span>Snapshot ready</span>
            <span>/</span>
            <span>{generatedAt || "дата"}</span>
            <span>/</span>
            <span>{resultStatus}</span>
          </div>

          <h1 className="mt-8 max-w-[780px] text-[32px] font-semibold leading-[0.98] text-white md:text-[48px]">
            {companyName}
          </h1>

          <div className="mt-6 max-w-[760px] space-y-5">
            <p className="text-[17px] leading-8 text-white/84 md:text-[19px]">
              {summary}
            </p>

            <p className="text-[15px] leading-7 text-white/66 md:text-[17px]">
              {description}
            </p>

            <div className="rounded-[20px] border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Business model
              </div>
              <p className="mt-2 text-[15px] leading-7 text-white/76 md:text-[16px]">
                {modelShift}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <HeroTag>Geo: {geoLabel}</HeroTag>
            <HeroTag>Stage: {stageLabel}</HeroTag>
            <HeroTag wide>Revenue: {revenueTag}</HeroTag>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <HeroInfoTile
              label="cash-in"
              value={
                revenueValue !== null
                  ? formatCurrency(Number(revenueValue), revenueCurrency)
                  : "—"
              }
              subvalue={revenueSubvalue}
            />
            <HeroInfoTile label="payment model" value={paymentModel} />
            <HeroInfoTile
              label="demand / capacity"
              value={demandRatio}
              subvalue={`${formatNumber(demand)} leads / ${formatNumber(
                capacity
              )} capacity`}
            />
            <HeroInfoTile
              label="growth limit"
              value={growthLimit}
              tone="accent"
            />
          </div>

          {decisionMakers.length > 0 ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {decisionMakers.slice(0, 2).map((item: any, index: number) => (
                <div
                  key={`${item.role}-${index}`}
                  className="rounded-[22px] border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-xl"
                >
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                    team role
                  </div>
                  <div className="mt-3 text-[18px] font-semibold text-white">
                    {item.role}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/72">
                    {item.responsibility || "—"}
                  </div>
                  {item.decision_maker ? (
                    <div className="mt-4 text-[11px] uppercase tracking-[0.16em] text-white/44">
                      decision maker
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-6 p-6 md:p-8 xl:p-10">
          {productMargins.length > 0 ? (
            <HeroProductMarginRadials items={productMargins} />
          ) : null}

          {channelDistribution.length > 0 ? (
            <HeroChannelTreemap
              title="Channel distribution"
              items={channelDistribution}
            />
          ) : null}

          <div className="grid gap-6 md:grid-cols-2">
            <HeroConversionCard
              leads={leads}
              clients={clients}
              conversionRatePercent={conversionRatePercent}
            />
            <HeroDemandCapacity demand={demand} capacity={capacity} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
