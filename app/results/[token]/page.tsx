"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

type ConfidenceLevel = "high" | "medium" | "preliminary";

type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title?: string;
  tooltip_text?: string;
};

type ConfidenceUiSystem = {
  component: "reliability_dots";
  dots_total: number;
  dot_size_px: number;
  gap_px: number;
  hover_zone: string;
  inactive_style: string;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
};

type HeroBlockPayload = {
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

type UnifiedResultsPayload = {
  confidence_ui_system?: ConfidenceUiSystem;
  hero_block?: HeroBlockPayload;
  normalized_data?: any;
  charts?: any;
  tables?: any;
  summary?: any;
  insights?: any;
  risks?: Array<{
    risk: string;
    impact: string;
    confidence_level?: ConfidenceLevel;
  }>;
  missing_data?: Array<{
    field: string;
    reason: string;
  }>;
  confidence_note?: string;
  solution?: any;
  roadmap?: any;
  forecasts?: any;
  overall_conclusions?: any;
  positioning?: any;
  economics?: any;
  clients_flow?: any;
  product_sales?: any;
  analytics_management?: any;
  structure_processes?: any;
  strategy?: any;
  meta?: {
    generated_at?: string;
    result_status?: string;
    account_href?: string;
    whatsapp_href?: string;
    telegram_href?: string;
  };
};

const BRAND = {
  bg: "#0b1d3a",
  yellow: "#f7d237",
};

const DEFAULT_CONFIDENCE_UI_SYSTEM: ConfidenceUiSystem = {
  component: "reliability_dots",
  dots_total: 3,
  dot_size_px: 7,
  gap_px: 4,
  hover_zone: "group",
  inactive_style: "low_opacity",
  levels: {
    high: {
      display: "● ● ●",
      active_dots: 3,
      tooltip_title: "Устойчивый показатель",
      tooltip_text: "Можно опираться в выводах.",
    },
    medium: {
      display: "● ● ○",
      active_dots: 2,
      tooltip_title: "Вероятный показатель",
      tooltip_text: "Можно использовать с оговоркой.",
    },
    preliminary: {
      display: "● ○ ○",
      active_dots: 1,
      tooltip_title: "Предварительный показатель",
      tooltip_text:
        "Показывает направление, но требует подтверждения дополнительными данными.",
    },
  },
};

const RESULT_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "solution", label: "Solution" },
  { id: "roadmap", label: "Roadmap" },
  { id: "forecasts", label: "Forecasts" },
  { id: "business-reality-map", label: "Business Context" },
  { id: "block-analysis", label: "Block Analysis" },
] as const;

const ANALYSIS_BLOCKS = [
  { id: "overall_conclusions", label: "Overall conclusions" },
  { id: "positioning", label: "Positioning" },
  { id: "economics", label: "Economics" },
  { id: "clients_flow", label: "Clients & Flow" },
  { id: "product_sales", label: "Product & Sales" },
  { id: "analytics_management", label: "Analytics & Management" },
  { id: "structure_processes", label: "Structure & Processes" },
  { id: "strategy", label: "Strategy" },
] as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number, maxFractionDigits = 0) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: maxFractionDigits }).format(value);
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

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function safeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

function stringifyValue(value: unknown): string {
  if (value == null) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(stringifyValue).join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

export default function ResultPage() {
  const params = useParams<{ token: string }>();
  const token = typeof params?.token === "string" ? params.token : "";

  const [payload, setPayload] = useState<UnifiedResultsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/results/${token}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load result payload: ${res.status}`);
        const data = (await res.json()) as UnifiedResultsPayload;
        if (isMounted) setPayload(data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (token) void load();
    else {
      setLoading(false);
      setError("Missing token");
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b1d3a] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-6 lg:px-8">
          <GlassCard className="p-8">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">Results</div>
            <div className="mt-4 text-2xl font-semibold text-white">Loading...</div>
          </GlassCard>
        </div>
      </main>
    );
  }

  if (error || !payload) {
    return (
      <main className="min-h-screen bg-[#0b1d3a] text-white">
        <div className="mx-auto max-w-[1600px] px-4 py-10 md:px-6 lg:px-8">
          <GlassCard className="p-8">
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">Results</div>
            <div className="mt-4 text-2xl font-semibold text-white">Failed to load</div>
            <p className="mt-3 text-sm leading-7 text-white/64">{error ?? "Payload is empty."}</p>
          </GlassCard>
        </div>
      </main>
    );
  }

  const generatedAt = payload?.meta?.generated_at ?? "";
  const resultStatus = payload?.meta?.result_status ?? "ready";
  const accountHref = payload?.meta?.account_href ?? "/account";
  const whatsappHref = payload?.meta?.whatsapp_href ?? "https://wa.me/";
  const telegramHref = payload?.meta?.telegram_href ?? "https://t.me/";

  return (
    <main className="min-h-screen bg-[#0b1d3a] text-white">
      <ResultsClientRuntime
        payload={payload}
        generatedAt={generatedAt}
        resultStatus={resultStatus}
        accountHref={accountHref}
        whatsappHref={whatsappHref}
        telegramHref={telegramHref}
      />
    </main>
  );
}

function ResultsClientRuntime({
  payload,
  generatedAt,
  resultStatus,
  accountHref,
  whatsappHref,
  telegramHref,
}: {
  payload: UnifiedResultsPayload;
  generatedAt: string;
  resultStatus: string;
  accountHref: string;
  whatsappHref: string;
  telegramHref: string;
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [realityExpanded, setRealityExpanded] = useState(false);
  const [activeBlock, setActiveBlock] = useState<string>("overall_conclusions");

  const availableBlocks = useMemo(() => {
    return ANALYSIS_BLOCKS.filter((block) => payload?.[block.id as keyof UnifiedResultsPayload]);
  }, [payload]);

  const solutionPayload = {
    confidence_ui_system: payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM,
    solution: payload.solution ?? {},
  };

  const roadmapPayload = {
    confidence_ui_system: payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM,
    roadmap: payload.roadmap ?? {},
  };

  const forecastsPayload = {
    confidence_ui_system: payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM,
    ...(payload.forecasts ?? {}),
  };

  const overallPayload = {
    confidence_ui_system: payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM,
    ...(payload.overall_conclusions ?? {}),
    summary: payload.overall_conclusions?.summary ?? payload.summary ?? {},
    insights: payload.overall_conclusions?.insights ?? payload.insights ?? {},
    solution: payload.overall_conclusions?.solution ?? payload.solution ?? {},
    risks: payload.overall_conclusions?.risks ?? payload.risks ?? [],
    missing_data: payload.overall_conclusions?.missing_data ?? payload.missing_data ?? [],
    confidence_note: payload.overall_conclusions?.confidence_note ?? payload.confidence_note ?? "",
    positioning: payload.overall_conclusions?.positioning ?? payload.positioning ?? {},
    economics: payload.overall_conclusions?.economics ?? payload.economics ?? {},
    clients_flow: payload.overall_conclusions?.clients_flow ?? payload.clients_flow ?? {},
    product_sales: payload.overall_conclusions?.product_sales ?? payload.product_sales ?? {},
    analytics_management:
      payload.overall_conclusions?.analytics_management ?? payload.analytics_management ?? {},
    structure_processes:
      payload.overall_conclusions?.structure_processes ?? payload.structure_processes ?? {},
    strategy: payload.overall_conclusions?.strategy ?? payload.strategy ?? {},
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-6 lg:px-8">
        <StickyMiniNav />

        <section id="hero" className="scroll-mt-24 pt-6">
          <TopActionBar
            onOpenCalendar={() => setIsCalendarOpen(true)}
            accountHref={accountHref}
            whatsappHref={whatsappHref}
            telegramHref={telegramHref}
          />
          <HeroSection
            results={payload}
            proposedModelShift={payload?.solution?.model_change_recommendation?.proposed_model_shift}
            generatedAt={generatedAt}
            resultStatus={resultStatus}
          />
        </section>

        <section id="solution" className="scroll-mt-24 pt-8">
          <SolutionSection data={solutionPayload} />
        </section>

        <section id="roadmap" className="scroll-mt-24 pt-8">
          <RoadmapBlock data={roadmapPayload} />
        </section>

        <section id="forecasts" className="scroll-mt-24 pt-8">
          <ForecastsSection data={forecastsPayload} />
        </section>

        <section id="business-reality-map" className="scroll-mt-24 pt-8">
          <CollapsibleRealityFrame expanded={realityExpanded} onToggle={() => setRealityExpanded((v) => !v)}>
            <BusinessRealityFrame payload={payload} />
          </CollapsibleRealityFrame>
        </section>

        <section id="block-analysis" className="scroll-mt-24 pt-8">
          <StickyBlockSwitcher blocks={availableBlocks} activeBlock={activeBlock} onSelect={setActiveBlock} />
          <div className="mt-6">
            {activeBlock === "overall_conclusions" && <OverallConclusionsBlock data={overallPayload} />}
            {activeBlock !== "overall_conclusions" && (
              <DeepDiveSectionShell
                title={ANALYSIS_BLOCKS.find((x) => x.id === activeBlock)?.label ?? "Block"}
                solutionHref="#solution"
                roadmapHref="#roadmap"
                relatedBlocks={ANALYSIS_BLOCKS.filter((x) => x.id !== activeBlock && x.id !== "overall_conclusions")
                  .slice(0, 2)
                  .map((x) => ({ id: x.id, label: x.label }))}
                onOpenRelated={setActiveBlock}
              >
                <GenericDeepDiveBlock
                  title={ANALYSIS_BLOCKS.find((x) => x.id === activeBlock)?.label ?? "Block"}
                  data={payload?.[activeBlock as keyof UnifiedResultsPayload]}
                  confidenceSystem={payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM}
                />
              </DeepDiveSectionShell>
            )}
          </div>
        </section>
      </div>

      <CalendarModal open={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
}

function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.18)]", className)}>
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">{eyebrow}</div>
      <div className="mt-2 text-2xl font-semibold text-white md:text-[34px]">{title}</div>
      {text ? <p className="mt-3 max-w-[980px] text-sm leading-7 text-white/62">{text}</p> : null}
    </div>
  );
}

function ReliabilityDots({ level, system, compact = false }: { level?: ConfidenceLevel; system: ConfidenceUiSystem; compact?: boolean }) {
  const resolvedLevel = level ?? "preliminary";
  const meta = system.levels[resolvedLevel] ?? system.levels.preliminary;

  return (
    <div className="group relative inline-flex items-center gap-1.5">
      {Array.from({ length: system.dots_total }).map((_, index) => {
        const active = index < meta.active_dots;
        return (
          <span
            key={index}
            className={cn("rounded-full", active ? "bg-[#f7d237]" : "bg-white/20")}
            style={{
              width: compact ? Math.max(system.dot_size_px - 1, 5) : system.dot_size_px,
              height: compact ? Math.max(system.dot_size_px - 1, 5) : system.dot_size_px,
            }}
          />
        );
      })}

      <div className="pointer-events-none absolute right-0 top-full z-20 mt-3 hidden min-w-[220px] rounded-[18px] border border-white/10 bg-[#081932] p-3 shadow-2xl group-hover:block">
        <div className="text-xs font-semibold text-white">{meta.tooltip_title ?? "Надежность"}</div>
        <div className="mt-1 text-xs leading-5 text-white/65">{meta.tooltip_text ?? "Показатель зависит от полноты входных данных."}</div>
      </div>
    </div>
  );
}

function ParagraphCard({ title, text, tone = "default" }: { title: string; text: string; tone?: "default" | "accent" | "warning" }) {
  const toneClasses =
    tone === "accent"
      ? "border-[#f7d237]/18 bg-[#f7d237]/8"
      : tone === "warning"
      ? "border-red-400/18 bg-red-400/8"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={cn("rounded-[24px] border p-5", toneClasses)}>
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{title}</div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/74">{text || "—"}</p>
    </div>
  );
}

function InsightCard({ title, value, text }: { title: string; value: string; text: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{title}</div>
      <div className="mt-3 text-lg font-semibold leading-7 text-white">{value}</div>
      <p className="mt-3 text-sm leading-7 text-white/66">{text}</p>
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{title}</div>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map((item, index) => (
            <div key={`${title}-${index}`} className="flex gap-3 text-sm leading-7 text-white/72">
              <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#f7d237]" />
              <span>{item}</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-white/46">—</div>
        )}
      </div>
    </div>
  );
}

function JsonPreviewCard({ title, value }: { title: string; value: unknown }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{title}</div>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-xs leading-6 text-white/72">
        {typeof value === "string" ? value : JSON.stringify(value ?? {}, null, 2)}
      </pre>
    </div>
  );
}
function KeyValueRows({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        {title}
      </div>

      <div className="mt-4 space-y-3">
        {rows.length ? (
          rows.map((row, index) => (
            <div
              key={`${title}-${row.label}-${index}`}
              className="flex items-start justify-between gap-6 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"
            >
              <div className="max-w-[44%] text-sm text-white/48">
                {row.label}
              </div>
              <div className="max-w-[56%] text-right text-sm font-medium text-white/84">
                {row.value}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-white/46">—</div>
        )}
      </div>
    </div>
  );
}

function objectToRows(value: unknown): Array<{ label: string; value: string }> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  return Object.entries(value as Record<string, unknown>).map(([key, val]) => ({
    label: key.replace(/_/g, " "),
    value: stringifyValue(val),
  }));
}
function StickyMiniNav() {
  return (
    <div className="sticky top-0 z-40 mb-6 hidden border-b border-white/10 bg-[#0b1d3a]/80 backdrop-blur-xl lg:block">
      <div className="flex flex-wrap items-center gap-2 py-3">
        {RESULT_SECTIONS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/70 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function TopActionBar({ onOpenCalendar, accountHref, whatsappHref, telegramHref }: { onOpenCalendar: () => void; accountHref: string; whatsappHref: string; telegramHref: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <button type="button" onClick={onOpenCalendar} className="rounded-full bg-[#f7d237] px-5 py-3 text-sm font-semibold text-[#0b1d3a] transition hover:opacity-90">60 min strat session</button>
      <Link href={accountHref} className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/88 transition hover:bg-white/[0.06]">Вернуться в ЛК</Link>
      <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/88 transition hover:bg-white/[0.06]">Связаться • WhatsApp</a>
      <a href={telegramHref} target="_blank" rel="noreferrer" className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/88 transition hover:bg-white/[0.06]">Связаться • Telegram</a>
    </div>
  );
}

function CollapsibleRealityFrame({ expanded, onToggle, children }: { expanded: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">Business Reality Map</div>
          <div className="mt-2 text-2xl font-semibold text-white">Source of truth</div>
          <p className="mt-2 max-w-[900px] text-sm leading-7 text-white/62">Сверху остается summary, ниже раскрывается полный business context.</p>
        </div>
        <button type="button" onClick={onToggle} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/82 transition hover:bg-white/[0.07]">{expanded ? "Свернуть" : "Show full business context"}</button>
      </div>
      <div className={expanded ? "block" : "max-h-[320px] overflow-hidden"}>
        <div className="px-5 pb-5 md:px-6 md:pb-6">{children}</div>
      </div>
      {!expanded && <div className="px-5 pb-5 md:px-6"><div className="pointer-events-none h-20 bg-gradient-to-t from-[#0b1d3a] to-transparent" /></div>}
    </div>
  );
}

function StickyBlockSwitcher({ blocks, activeBlock, onSelect }: { blocks: readonly { id: string; label: string }[]; activeBlock: string; onSelect: (id: string) => void }) {
  return (
    <div className="sticky top-[64px] z-30 rounded-[24px] border border-white/10 bg-[#0b1d3a]/85 p-3 backdrop-blur-xl">
      <div className="flex flex-wrap gap-2">
        {blocks.map((block) => (
          <button key={block.id} type="button" onClick={() => onSelect(block.id)} className={cn("rounded-full px-4 py-2 text-xs uppercase tracking-[0.16em] transition", activeBlock === block.id ? "bg-[#f7d237] text-[#0b1d3a]" : "border border-white/10 bg-white/[0.03] text-white/72 hover:bg-white/[0.06]")}>{block.label}</button>
        ))}
      </div>
    </div>
  );
}

function DeepDiveSectionShell({ title, solutionHref, roadmapHref, relatedBlocks, onOpenRelated, children }: { title: string; solutionHref: string; roadmapHref: string; relatedBlocks: Array<{ id: string; label: string }>; onOpenRelated: (id: string) => void; children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 md:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">Deep-dive analysis</div>
          <div className="mt-2 text-2xl font-semibold text-white">{title}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={solutionHref} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.07]">Вернуться к solution</a>
          <a href={roadmapHref} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.07]">Посмотреть roadmap phase</a>
          {relatedBlocks.map((item) => (
            <button key={item.id} type="button" onClick={() => onOpenRelated(item.id)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.07]">Открыть related block: {item.label}</button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

function CalendarModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#0b1d3a] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">Schedule</div>
            <div className="mt-2 text-2xl font-semibold text-white">60 min strategy session</div>
            <p className="mt-3 max-w-[720px] text-sm leading-7 text-white/64">Здесь позже подгрузите календарь и слоты из webhook / Notion / calendar source.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/82">Закрыть</button>
        </div>
        <div className="mt-6 rounded-[24px] border border-dashed border-white/15 bg-white/[0.02] p-8 text-center text-white/46">Placeholder for calendar popup</div>
      </div>
    </div>
  );
}

type HeroSectionProps = {
  results: UnifiedResultsPayload;
  proposedModelShift?: string;
  generatedAt?: string;
  resultStatus?: string;
};

function HeroInfoTile({ label, value, subvalue, fullWidth = false }: { label: string; value: string; subvalue?: string; fullWidth?: boolean }) {
  return <div className={cn("rounded-[22px] border border-white/10 bg-[#284b9b]/90 px-5 py-5", fullWidth && "md:col-span-2")}><div className="text-[11px] uppercase tracking-[0.18em] text-white/65">{label}</div><div className="mt-3 text-[18px] font-semibold leading-snug text-white md:text-[20px]">{value}</div>{subvalue ? <div className="mt-2 text-sm leading-6 text-white/72">{subvalue}</div> : null}</div>;
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
        "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#f7d237]/20 bg-[#f7d237]/12 px-4 text-center text-[13px] font-medium text-[#f3d86a]",
        wide ? "min-w-[220px]" : "min-w-[120px]"
      )}
    >
      {children}
    </div>
  );
}

function HeroGauge({ title, value }: { title: string; value: number }) {
  const safeValue = clamp(Number.isFinite(value) ? value : 0, 0, 100);

  return (
    <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5">
      <div className="text-center text-[14px] tracking-[0.14em] text-white/82">
        {title}
      </div>

      <div className="mt-5 flex justify-center">
        <div className="relative h-[132px] w-[132px]">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke={BRAND.yellow}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${
                2 * Math.PI * 44 * (1 - safeValue / 100)
              }`}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[30px] font-semibold text-white">
              {formatPercent(safeValue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroTreemap({ title, items }: { title: string; items: Array<{ label: string; value: number }> }) {
  const sorted = [...items].filter((item) => Number.isFinite(item.value) && item.value > 0).sort((a, b) => b.value - a.value).slice(0, 5);
  const [first, second, ...rest] = sorted;
const colors = [
  "#f7d237",
  "#efd03a",
  "#e6cc3c",
  "#ddc73f",
  "#d4c242",
  "#cbbd45",
  "#c2b847",
  "#b9b34a",
  "#afad4d",
  "#a6a750"
];
  return <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"><div className="text-[15px] tracking-[0.28em] text-white/86">{title}</div><div className="mt-4 grid min-h-[312px] gap-1.5 md:grid-cols-[1.06fr_0.94fr_0.42fr]">{first ? <div className="flex items-center justify-center rounded-[8px] px-4 py-4 text-center text-[18px] text-[#fefefe]" style={{ background: colors[0] }}><div><div>{first.label}</div><div className="mt-2 text-sm opacity-70">{formatPercent(first.value)}</div></div></div> : null}{second ? <div className="flex items-center justify-center rounded-[8px] px-4 py-4 text-center text-[18px] text-[#fefefe]" style={{ background: colors[1] }}><div><div>{second.label}</div><div className="mt-2 text-sm opacity-70">{formatPercent(second.value)}</div></div></div> : null}<div className="grid gap-1.5">{rest.map((item, index) => <div key={`${item.label}-${index}`} className="flex items-center justify-center rounded-[8px] px-3 py-3 text-center text-sm text-[#fefefe]" style={{ background: colors[index + 2] }}><div><div>{item.label}</div><div className="mt-1 text-xs opacity-70">{formatPercent(item.value)}</div></div></div>)}</div></div></div>;
}

function HeroLeadsClientsDonut({ leads, clients, conversionRatePercent }: { leads: number; clients: number; conversionRatePercent: number }) {
  const safePercent = clamp(Number.isFinite(conversionRatePercent) ? conversionRatePercent : 0, 0, 100);
  return <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"><div className="text-[15px] tracking-[0.18em] text-white/86">Lead → Client Conversion</div><div className="mt-6 flex items-center justify-center"><div className="relative h-[178px] w-[178px] rounded-full" style={{ background: `conic-gradient(#d68c6c 0 ${100 - safePercent}%, ${BRAND.yellow} ${100 - safePercent}% 100%)` }}><div className="absolute inset-[28%] rounded-full bg-[#122345]" /><div className="absolute inset-0 flex items-center justify-center text-[26px] font-medium text-[#fefefe]"><span className="text-white">{formatPercent(safePercent, 1)}</span></div></div></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-[16px] border border-white/8 bg-white/[0.04] px-4 py-3 text-center"><div className="text-[11px] uppercase tracking-[0.16em] text-white/48">Leads</div><div className="mt-2 text-lg font-semibold text-white">{formatNumber(leads)}</div></div><div className="rounded-[16px] border border-white/8 bg-white/[0.04] px-4 py-3 text-center"><div className="text-[11px] uppercase tracking-[0.16em] text-white/48">Clients</div><div className="mt-2 text-lg font-semibold text-white">{formatNumber(clients)}</div></div></div></div>;
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
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[15px] tracking-[0.18em] text-white/86">
        Demand / Capacity
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-sm text-white/68">Leads</span>
            <span className="text-base font-semibold text-white">
              {formatNumber(demand)}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-emerald-400"
              style={{ width: demandWidth }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-sm text-white/68">Capacity</span>
            <span className="text-base font-semibold text-white">
              {formatNumber(capacity)}
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/10">
            <div
              className="h-3 rounded-full bg-orange-400"
              style={{ width: capacityWidth }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-[16px] border border-white/8 bg-white/[0.04] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              Gap
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatNumber(Math.max(demand - capacity, 0))}
            </div>
          </div>

          <div className="rounded-[16px] border border-white/8 bg-white/[0.04] px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-white/42">
              Ratio
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

function HeroSection({ results, generatedAt, resultStatus = "ready" }: HeroSectionProps) {
  const hero = results.hero_block ?? {};
  const normalized = (results.normalized_data ?? {}) as any;
  const company = normalized.company ?? {};
  const offer = normalized.offer ?? {};
  const financials = normalized.financials ?? {};
  const sales = normalized.sales ?? {};
  const acquisition = normalized.acquisition ?? {};
const companyName = hero.companyName?.trim() || company.name || "—";

const summary =
  hero.summary?.trim() ||
  results.summary?.snapshot ||
  "—";

const description =
  hero.description?.trim() ||
  company.description ||
  "—";

const businessModel = results.positioning?.business_model ?? {};
const modelShift =
  [businessModel.type, businessModel.explanation]
    .filter(Boolean)
    .join(" — ") || "—";

const geoLabel =
  safeStringArray(
    hero.sales_geography?.length
      ? hero.sales_geography
      : company.sales_geography
  ).join(" / ") || "—";

const stageLabel = company.stage || "—";

const revenueValue = financials.last_month_cash_in ?? hero.cash_in?.value ?? null;
const revenueCurrency = financials.last_month_currency ?? hero.cash_in?.currency ?? "USD";
const revenueTag =
  revenueValue !== null ? formatCurrency(Number(revenueValue), revenueCurrency) : "—";

const revenueSubvalue =
  hero.cash_in?.period === "last_month" || financials.last_month_cash_in
    ? "last month cash-in"
    : "revenue basis";

const paymentModel = financials.contract_payment_structure || "модель оплаты не указана";
const growthLimit = hero.growth_limit || "—";
  const decisionMakers = (Array.isArray(normalized.team?.roles) && normalized.team.roles.length ? normalized.team.roles : hero.roles) ?? [];
  const productMargins = hero.product_margins_chart?.series?.map((item) => ({ title: item.product, value: Number(item.margin ?? 0) })) ?? [];
  const channelDistribution = Array.isArray(acquisition.channels) ? acquisition.channels.map((item: any) => ({ label: item.channel, value: Number(item.share_percent ?? 0) })) : [];
  const leads = Number(sales.lead_volume ?? hero.clients_vs_leads_chart?.series?.find((x) => x.label === "Лиды")?.value ?? 0);
  const clients = Number(sales.last_month_clients ?? hero.clients_vs_leads_chart?.series?.find((x) => x.label === "Клиенты")?.value ?? 0);
  const conversionRatePercent = sales.conversion_rate != null ? Number(sales.conversion_rate) * 100 : leads > 0 ? (clients / leads) * 100 : 0;
  const demand = Number(sales.lead_volume ?? 0);
  const capacity = Number(sales.processing_capacity ?? 0);

  return <GlassCard className="mb-8 overflow-hidden p-0"><div className="grid xl:grid-cols-[0.98fr_1.02fr]"><div className="border-b border-white/10 p-6 md:p-8 xl:border-b-0 xl:border-r xl:p-10"><div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] uppercase tracking-[0.30em] text-[#f7d237]"><span>Snapshot ready</span><span>/</span><span>{generatedAt || "дата"}</span><span>/</span><span>{resultStatus}</span></div>{companyName !== "—" ? (
  <h1 className="mt-8 text-[28px] font-medium leading-[1.08] text-white md:text-[42px]">
    {companyName}
  </h1>
) : null}

<div className="mt-8 max-w-[760px] space-y-6">
  <p className="text-[16px] leading-8 text-white/84 md:text-[18px]">
    {summary}
  </p>

  <p className="text-[16px] leading-8 text-white/72 md:text-[18px]">
    {description}
  </p>

  <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-5 py-4">
    <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
      Business model
    </div>
    <p className="mt-2 text-[15px] leading-7 text-white/78 md:text-[16px]">
      {modelShift}
    </p>
  </div>
</div><div className="mt-10 flex flex-wrap gap-3">
  <HeroTag>Geo: {geoLabel}</HeroTag>
  <HeroTag>Stage: {stageLabel}</HeroTag>
  <HeroTag wide>Revenue: {revenueTag}</HeroTag>
</div>
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <HeroInfoTile label="revenue" value={revenueValue !== null ? formatCurrency(Number(revenueValue), revenueCurrency) : "—"} subvalue={revenueSubvalue} />
      <HeroInfoTile label="модель оплаты" value={paymentModel} />
      <HeroInfoTile label="growth limit" value={growthLimit} fullWidth /></div>
    {decisionMakers.length > 0 && <div className="mt-8 grid gap-6 md:grid-cols-2"
                                    >{decisionMakers.slice(0, 2).map((item: any, index: number) => 
                                      <div key={`${item.role}-${index}`} className="rounded-[22px] border border-white/10 bg-[#284b9b]/90 px-5 py-5">
                                        <div className="text-[15px] leading-8 text-white"><div>{item.role}</div>
                                          <div className="mt-3 text-white/88">{item.responsibility}</div>
                                          {item.decision_maker ? <div className="mt-4 text-sm uppercase tracking-[0.18em] text-[#fff3b2]">decision maker</div> : null}</div></div>)}</div>}</div>
    <div className="p-6 md:p-8 xl:p-10"><div>
      <div className="text-[18px] tracking-[0.18em] text-white/92">Маржинальность core продуктов</div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{productMargins.slice(0, 3).map((item, index) => <HeroGauge key={`${item.title}-${index}`} title={item.title} value={item.value} />)}</div></div>
      {channelDistribution.length > 0 && <div className="mt-8"><HeroTreemap title="Дистрибуция по каналам" items={channelDistribution} /></div>}<div className="mt-8 grid gap-6 md:grid-cols-2"><HeroLeadsClientsDonut leads={leads} clients={clients} conversionRatePercent={conversionRatePercent} /><HeroDemandCapacity demand={demand} capacity={capacity} /></div></div></div></GlassCard>;
}

function BlockTag({ text }: { text: string }) { return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white/62">{text}</span>; }

function SolutionSection({ data }: { data: { confidence_ui_system: ConfidenceUiSystem; solution: any } }) {
  const system = data.confidence_ui_system;
  const solution = data.solution ?? {};
  const summary = solution.solution_summary ?? {};
  return <section className="mb-8"><GlassCard className="p-5 md:p-6 xl:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div className="max-w-[980px]"><div className="text-[11px] uppercase tracking-[0.30em] text-[#f7d237]">Main decision layer</div><h2 className="mt-4 text-[30px] font-semibold leading-tight text-white md:text-[44px]">Solution</h2><p className="mt-4 max-w-[920px] text-sm leading-7 text-white/60 md:text-base">Центральный вывод по текущей модели бизнеса: что именно нужно менять, почему это является главным рычагом роста и при каких условиях это даст результат.</p></div><ReliabilityDots level={summary.confidence_level} system={system} /></div><div className="mt-6 rounded-[28px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5 md:p-6"><div className="text-[11px] uppercase tracking-[0.20em] text-[#fff3b2]">solution_summary</div><div className="mt-3 text-[24px] font-semibold leading-tight text-white md:text-[32px]">{summary.headline || "—"}</div><p className="mt-4 max-w-[980px] text-sm leading-7 text-white/80 md:text-base">{summary.core_logic || "—"}</p></div><div className="mt-6 grid gap-4 xl:grid-cols-3">{[solution.primary_growth_lever, solution.primary_constraint, solution.revenue_loss_source].map((item, index) => { if (!item) return null; const title = index === 0 ? "primary_growth_lever" : index === 1 ? "primary_constraint" : "revenue_loss_source"; return <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="flex items-start justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{title}</div><ReliabilityDots level={item.confidence_level} system={system} compact /></div><div className="mt-3 text-lg font-semibold leading-7 text-white">{item.lever || item.label || "—"}</div>{item.constraint_type ? <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/40">{item.constraint_type}</div> : null}{item.loss_type ? <div className="mt-2 flex flex-wrap gap-2"><BlockTag text={String(item.loss_type)} />{item.visible_or_hidden ? <BlockTag text={String(item.visible_or_hidden)} /> : null}</div> : null}<p className="mt-3 text-sm leading-7 text-white/66">{item.reason || item.explanation || "—"}</p>{safeStringArray(item.supported_by_blocks).length > 0 ? <div className="mt-4 flex flex-wrap gap-2">{safeStringArray(item.supported_by_blocks).map((x, index2) => <BlockTag key={`${x}-${index2}`} text={x} />)}</div> : null}</div>; })}</div>{solution.model_change_recommendation ? <><div className="mt-6 grid gap-4 xl:grid-cols-2"><ParagraphCard title="current_model_problem" text={solution.model_change_recommendation.current_model_problem || "—"} tone="warning" /><ParagraphCard title="proposed_model_shift" text={solution.model_change_recommendation.proposed_model_shift || "—"} tone="accent" /></div><div className="mt-4 grid gap-4 xl:grid-cols-2"><ParagraphCard title="why_this_shift" text={solution.model_change_recommendation.why_this_shift || "—"} /><ParagraphCard title="expected_unlock" text={solution.model_change_recommendation.expected_unlock || "—"} /></div></> : null}{safeArray(solution.strategic_priorities).length > 0 ? <div className="mt-8"><SectionHead eyebrow="priorities" title="Strategic priorities" text="Последовательность шагов внутри solution. Это еще не roadmap, а логика приоритизации." /><div className="grid gap-4 xl:grid-cols-3">{safeArray(solution.strategic_priorities).map((item: any) => <div key={String(item.priority_rank)} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="flex items-center justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">priority {item.priority_rank}</div><span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/78">{item.priority_rank}</span></div><div className="mt-4 text-base font-semibold leading-7 text-white">{item.action}</div><div className="mt-4 space-y-4"><div><div className="text-[11px] uppercase tracking-[0.14em] text-white/38">why_now</div><p className="mt-1 text-sm leading-7 text-white/66">{item.why_now}</p></div><div><div className="text-[11px] uppercase tracking-[0.14em] text-white/38">dependency</div><p className="mt-1 text-sm leading-7 text-white/66">{item.dependency}</p></div><div><div className="text-[11px] uppercase tracking-[0.14em] text-white/38">expected_result</div><p className="mt-1 text-sm leading-7 text-white/66">{item.expected_result}</p></div></div></div>)}</div></div> : null}{solution.business_impact ? <div className="mt-8"><SectionHead eyebrow="business impact" title="Expected business impact" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Object.entries(solution.business_impact).map(([key, value]) => <InsightCard key={key} title={key} value={key.replace(/_/g, " ")} text={String(value)} />)}</div></div> : null}{solution.implementation_conditions ? <div className="mt-8"><SectionHead eyebrow="implementation conditions" title="What must be true for this to work" /><div className="grid gap-4 xl:grid-cols-2">{Object.entries(solution.implementation_conditions).map(([key, value]) => <BulletList key={key} title={key} items={Array.isArray(value) ? value.map(String) : [String(value)]} />)}</div></div> : null}</GlassCard></section>;
}

function RoadmapBlock({ data }: { data: { confidence_ui_system: ConfidenceUiSystem; roadmap: any } }) {
  const system = data.confidence_ui_system;
  const roadmap = data.roadmap ?? {};
  return <section className="mb-8"><GlassCard className="p-5 md:p-6 xl:p-8"><SectionHead eyebrow="Roadmap" title="How to implement the shift" text="Фазовая логика внедрения: что делать сначала, какие линии работы идут параллельно, на чем держится порядок действий и какие сигналы подтверждают, что система движется правильно." /><div className="grid gap-4 xl:grid-cols-2"><ParagraphCard title="strategic_objective" text={roadmap.strategic_objective || "—"} /><ParagraphCard title="core_jtbd" text={roadmap.core_jtbd || "—"} tone="accent" /></div>{safeArray(roadmap.phases).length > 0 ? <div className="mt-8"><div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">phases</div><div className="space-y-5">{safeArray(roadmap.phases).map((phase: any) => <GlassCard key={String(phase.phase)} className="p-5"><div className="flex items-start justify-between gap-4"><div><div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">phase</div><div className="mt-2 text-2xl font-semibold text-white">{phase.phase}</div></div><ReliabilityDots level={phase.confidence_level} system={system} /></div><div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]"><ParagraphCard title="goal" text={phase.goal || "—"} /><ParagraphCard title="linked_context" text={phase.linked_constraint || phase.linked_lever || phase.linked_system || "—"} tone="accent" /></div>{safeArray(phase.key_actions).length > 0 ? <div className="mt-5 space-y-4">{safeArray(phase.key_actions).map((item: any, index: number) => <div key={`${String(phase.phase)}-${index}`} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"><div className="flex items-start justify-between gap-4"><div className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 px-2 text-[11px] text-white/48">{index + 1}</div><ReliabilityDots level={item.confidence_level} system={system} compact /></div><div className="mt-3 text-base font-medium leading-7 text-white">{item.action}</div><div className="mt-3 rounded-[18px] border border-white/8 bg-white/[0.03] p-4"><div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">why_this_phase</div><div className="mt-2 text-sm leading-7 text-white/68">{item.why_this_phase}</div></div></div>)}</div> : null}</GlassCard>)}</div></div> : null}{safeArray(roadmap.workstreams).length > 0 ? <div className="mt-8"><div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">workstreams</div><div className="grid gap-4 xl:grid-cols-2">{safeArray(roadmap.workstreams).map((item: any) => <div key={String(item.name)} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="flex items-start justify-between gap-4"><div className="text-base font-semibold text-white">{item.name}</div><ReliabilityDots level={item.confidence_level} system={system} compact /></div><p className="mt-3 text-sm leading-7 text-white/68">{item.focus}</p><div className="mt-4 flex flex-wrap gap-2">{safeStringArray(item.related_blocks).map((block, index) => <BlockTag key={`${String(item.name)}-${block}-${index}`} text={block} />)}</div></div>)}</div></div> : null}{safeArray(roadmap.dependencies).length > 0 ? <div className="mt-8"><div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">dependencies</div><div className="grid gap-4">{safeArray(roadmap.dependencies).map((item: any, index: number) => <div key={`${String(item.dependency)}-${index}`} className="rounded-[24px] border border-red-400/18 bg-red-400/8 p-5"><div className="text-[11px] uppercase tracking-[0.18em] text-red-100/85">dependency</div><div className="mt-3 text-base font-medium leading-7 text-white">{item.dependency}</div><div className="mt-4 rounded-[18px] border border-white/8 bg-white/[0.04] p-4"><div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">reason</div><div className="mt-2 text-sm leading-7 text-white/68">{item.reason}</div></div></div>)}</div></div> : null}<div className="mt-8 grid gap-4 xl:grid-cols-2"><BulletList title="first_priority_actions" items={safeArray(roadmap.first_priority_actions).map(String)} /><div className="grid gap-4">{Object.entries(roadmap.expected_outcomes ?? {}).map(([key, value]) => <InsightCard key={key} title={key} value={key.replace(/_/g, " ")} text={String(value)} />)}</div></div></GlassCard></section>;
}

function ForecastsSection({ data }: { data: any }) {
  const system = data.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM;
  const currentVsTarget = data.current_vs_target ?? {};
  return <section className="mb-8"><SectionHead eyebrow="forecasts" title="Forecasts" text="Сценарный слой: что может измениться в бизнесе при улучшении исполнения, обработке текущего спроса и снижении founder overload." /><div className="grid gap-6"><GlassCard className="p-5 md:p-6 xl:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">current vs target</div><div className="mt-2 text-2xl font-semibold text-white">State shift</div></div><ReliabilityDots level={currentVsTarget.confidence_level} system={system} /></div><div className="mt-6 grid gap-4 xl:grid-cols-2"><div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">current_state</div><div className="mt-5 space-y-4">{Object.entries(currentVsTarget.current_state ?? {}).map(([key, value]) => <ParagraphCard key={key} title={key} text={String(value)} />)}</div></div><div className="rounded-[28px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]">target_state</div><div className="mt-5 space-y-4">{Object.entries(currentVsTarget.target_state ?? {}).map(([key, value]) => <ParagraphCard key={key} title={key} text={String(value)} tone="accent" />)}</div></div></div><div className="mt-5"><ParagraphCard title="gap_summary" text={currentVsTarget.gap_summary || "—"} tone="warning" /></div></GlassCard>{safeArray(data.expected_kpi_changes).length > 0 ? <GlassCard className="p-5 md:p-6 xl:p-8"><SectionHead eyebrow="expected_kpi_changes" title="KPI change model" /><div className="grid gap-4 xl:grid-cols-2">{safeArray(data.expected_kpi_changes).map((item: any, index: number) => <div key={`${String(item.metric)}-${index}`} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="flex items-start justify-between gap-4"><div className="text-base font-semibold text-white">{item.metric}</div><ReliabilityDots level={item.confidence_level} system={system} compact /></div><div className="mt-4 grid gap-3"><ParagraphCard title="current" text={item.current} /><ParagraphCard title="expected" text={item.expected} tone="accent" /><ParagraphCard title="delta" text={item.delta} /><ParagraphCard title="driver" text={item.driver} /></div></div>)}</div></GlassCard> : null}{data.scenarios ? <div className="grid gap-6 xl:grid-cols-3">{Object.entries(data.scenarios).map(([key, value]: [string, any]) => <div key={key} className={cn("rounded-[28px] border p-5", key === "failure_case" ? "border-red-400/18 bg-red-400/8" : key === "improved_execution" ? "border-[#f7d237]/18 bg-[#f7d237]/8" : "border-white/10 bg-white/[0.03]")}><div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">scenario</div><div className="mt-2 text-xl font-semibold text-white">{key}</div><div className="mt-5 space-y-4">{Object.entries(value ?? {}).map(([subKey, subVal]) => <div key={subKey}><div className="text-[11px] uppercase tracking-[0.16em] text-white/38">{subKey}</div><p className="mt-2 text-sm leading-7 text-white/74">{String(subVal)}</p></div>)}</div></div>)}</div> : null}</div></section>;
}

function FrameKpi({ label, value, confidenceLevel, system }: { label: string; value: string; confidenceLevel?: ConfidenceLevel; system: ConfidenceUiSystem }) {
  return <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4"><div className="flex items-start justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{label}</div>{confidenceLevel ? <ReliabilityDots level={confidenceLevel} system={system} compact /> : null}</div><div className="mt-3 text-xl font-semibold text-white">{value}</div></div>;
}

function FrameKeyValueCard({ title, rows }: { title: string; rows: Array<{ label: string; value: string }> }) {
  return <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">{title}</div><div className="mt-4 space-y-3">{rows.map((row) => <div key={`${title}-${row.label}`} className="flex items-start justify-between gap-6 border-b border-white/8 pb-3 last:border-b-0 last:pb-0"><div className="text-sm text-white/52">{row.label}</div><div className="max-w-[62%] text-right text-sm font-medium text-white/82">{row.value || "—"}</div></div>)}</div></div>;
}

function BusinessRealityFrame({ payload }: { payload: UnifiedResultsPayload }) {
  const system = payload.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM;
  const normalized = (payload.normalized_data ?? {}) as any;
  const summary = (payload.summary ?? {}) as any;
  const insights = (payload.insights ?? {}) as any;
  const company = normalized.company ?? {};
  const offer = normalized.offer ?? {};
  const financials = normalized.financials ?? {};
  const sales = normalized.sales ?? {};
  const goals = normalized.goals ?? {};
  return <section className="mb-8"><SectionHead eyebrow="Business reality map" title="Source of truth" text="Единая рамка фактических данных, на которых построены выводы, прогноз и тематические блоки." /><GlassCard className="p-5 md:p-6 xl:p-8"><div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"><div className="space-y-4"><div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]">Summary</div><div className="mt-4 space-y-3">{summary.snapshot ? <p className="text-sm leading-7 text-white/80">{summary.snapshot}</p> : null}{summary.current_position ? <p className="text-sm leading-7 text-white/74">{summary.current_position}</p> : null}{summary.economics ? <p className="text-sm leading-7 text-white/74">{summary.economics}</p> : null}{summary.primary_need ? <p className="text-sm leading-7 text-white/74">{summary.primary_need}</p> : null}</div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><FrameKpi label="Stage" value={company.stage || "—"} confidenceLevel={company.confidence_level} system={system} /><FrameKpi label="Business age" value={typeof company.business_age_months === "number" ? `${formatNumber(company.business_age_months)} months` : "—"} confidenceLevel={company.confidence_level} system={system} /><FrameKpi label="Last month cash-in" value={typeof financials.last_month_cash_in === "number" ? formatCurrency(financials.last_month_cash_in, financials.last_month_currency || "USD") : "—"} confidenceLevel={financials.confidence_level} system={system} /><FrameKpi label="Demand / capacity" value={typeof sales.demand_to_capacity === "number" ? `${formatNumber(sales.demand_to_capacity, 2)}x` : "—"} confidenceLevel={sales.confidence_level} system={system} /></div></div><div className="grid gap-4">{insights.current_state ? <InsightCard title={insights.current_state.title || "Current state"} value="Current state" text={insights.current_state.text || "—"} /> : null}{insights.main_loss ? <InsightCard title={insights.main_loss.title || "Main loss"} value="Main loss" text={insights.main_loss.text || "—"} /> : null}{insights.growth_limit ? <InsightCard title={insights.growth_limit.title || "Growth limit"} value="Growth limit" text={insights.growth_limit.text || "—"} /> : null}</div></div><div className="mt-8 grid gap-4 xl:grid-cols-3"><FrameKeyValueCard title="Company" rows={[{ label: "Name", value: company.name || "—" },{ label: "Founded", value: company.founded || "—" },{ label: "Physical location", value: company.physical_location || "—" },{ label: "Sales geography", value: stringifyValue(company.sales_geography) },{ label: "Core team size", value: stringifyValue(company.team_size_core) },{ label: "Uses contractors", value: stringifyValue(company.uses_contractors) }]} /><FrameKeyValueCard title="Offer" rows={[{ label: "Business type", value: offer.business_type || "—" },{ label: "Most profitable segment", value: offer.most_profitable_segment || "—" },{ label: "Target customers", value: stringifyValue(offer.target_customers) },{ label: "Other verticals", value: stringifyValue(offer.other_experience_verticals) }]} /><FrameKeyValueCard title="Financials" rows={[{ label: "Cash-in", value: typeof financials.last_month_cash_in === "number" ? formatCurrency(financials.last_month_cash_in, financials.last_month_currency || "USD") : "—" },{ label: "Contract value", value: typeof financials.contract_value === "number" ? formatCurrency(financials.contract_value, financials.last_month_currency || "USD") : "—" },{ label: "Reported margin", value: typeof financials.reported_margin_percent === "number" ? formatPercent(financials.reported_margin_percent) : "—" },{ label: "Target margin at scale", value: typeof financials.target_margin_at_scale_percent === "number" ? formatPercent(financials.target_margin_at_scale_percent) : "—" },{ label: "Estimated profit", value: typeof financials.profit_last_month_estimated === "number" ? formatCurrency(financials.profit_last_month_estimated, financials.last_month_currency || "USD") : "—" },{ label: "Goal net profit growth", value: typeof financials.goal_net_profit_growth_percent === "number" ? formatPercent(financials.goal_net_profit_growth_percent) : "—" }]} /></div><div className="mt-4 grid gap-4 xl:grid-cols-2"><FrameKeyValueCard title="Sales & demand" rows={[{ label: "Clients last month", value: stringifyValue(sales.last_month_clients) },{ label: "Client note", value: sales.client_period_note || "—" },{ label: "Lead volume", value: stringifyValue(sales.lead_volume) },{ label: "Processing capacity", value: stringifyValue(sales.processing_capacity) },{ label: "Conversion rate", value: typeof sales.conversion_rate === "number" ? formatPercent(sales.conversion_rate * 100, 2) : "—" },{ label: "Avg check", value: typeof sales.avg_check_last_month === "number" ? formatCurrency(sales.avg_check_last_month, financials.last_month_currency || "USD") : "—" },{ label: "Unmet demand", value: stringifyValue(sales.unmet_demand) }]} /><div className="grid gap-4 md:grid-cols-3"><BulletList title="Goals • 3 months" items={safeArray(goals["3_months"]).map(String)} /><BulletList title="Goals • 6 months" items={safeArray(goals["6_months"]).map(String)} /><BulletList title="Goals • 12 months" items={safeArray(goals["12_months"]).map(String)} /></div></div><div className="mt-6 rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5"><div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]">Confidence note</div><p className="mt-3 text-sm leading-7 text-white/80">{payload.confidence_note || "—"}</p></div></GlassCard></section>;
}

function SupportedBlocks({ items }: { items: unknown }) {
  const blocks = safeStringArray(items);
  return <div className="mt-4 flex flex-wrap gap-2">{blocks.map((item, index) => <span key={`${item}-${index}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/62">{item}</span>)}</div>;
}

function OverallConclusionsBlock({ data }: { data: any }) {
  const system = data.confidence_ui_system ?? DEFAULT_CONFIDENCE_UI_SYSTEM;
  const summary = data.summary ?? {};
  const solution = data.solution ?? {};
  const crossBlockFindings = [
    { label: "Positioning", text: data.positioning?.truth_summary?.summary, level: data.positioning?.truth_summary?.confidence_level },
    { label: "Economics", text: data.economics?.truth_summary?.summary, level: data.economics?.truth_summary?.confidence_level },
    { label: "Clients & Flow", text: data.clients_flow?.truth_summary?.summary, level: data.clients_flow?.truth_summary?.confidence_level },
    { label: "Product & Sales", text: data.product_sales?.truth_summary?.summary, level: data.product_sales?.truth_summary?.confidence_level },
    { label: "Analytics & Management", text: data.analytics_management?.truth_summary?.summary, level: data.analytics_management?.truth_summary?.confidence_level },
    { label: "Structure & Processes", text: data.structure_processes?.truth_summary?.summary, level: data.structure_processes?.truth_summary?.confidence_level },
    { label: "Strategy", text: data.strategy?.truth_summary?.summary, level: data.strategy?.truth_summary?.confidence_level },
  ].filter((item) => item.text);
  return <section className="mb-8"><SectionHead eyebrow="overall conclusions" title="Cross-block reading of the business" text="Сводный слой, который связывает все блоки в одну систему: где находится главный лимит, где теряются деньги и почему решение выглядит именно так." /><GlassCard className="p-5 md:p-6 xl:p-8"><div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"><div><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">central thesis</div><h3 className="mt-3 text-[28px] font-semibold leading-tight text-white md:text-[38px]">{solution.solution_summary?.headline || "—"}</h3></div><ReliabilityDots level={solution.solution_summary?.confidence_level} system={system} /></div><p className="mt-5 max-w-[900px] text-sm leading-7 text-white/72 md:text-base">{solution.solution_summary?.core_logic || "—"}</p><div className="mt-6 grid gap-4 md:grid-cols-2">{solution.primary_growth_lever ? <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"><div className="flex items-start justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">growth lever</div><ReliabilityDots level={solution.primary_growth_lever.confidence_level} system={system} compact /></div><div className="mt-3 text-lg font-semibold leading-7 text-white">{solution.primary_growth_lever.lever}</div><p className="mt-3 text-sm leading-7 text-white/66">{solution.primary_growth_lever.reason}</p><SupportedBlocks items={solution.primary_growth_lever.supported_by_blocks} /></div> : null}{solution.primary_constraint ? <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5"><div className="flex items-start justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#fff3b2]">primary constraint</div><ReliabilityDots level={solution.primary_constraint.confidence_level} system={system} compact /></div><div className="mt-3 text-lg font-semibold leading-7 text-white">{solution.primary_constraint.label}</div><p className="mt-3 text-sm leading-7 text-white/78">{solution.primary_constraint.reason}</p><SupportedBlocks items={solution.primary_constraint.supported_by_blocks} /></div> : null}</div></div><div className="grid gap-4">{summary.snapshot ? <InsightCard title="snapshot" value="Business snapshot" text={summary.snapshot} /> : null}{summary.current_position ? <ParagraphCard title="current_position" text={summary.current_position} /> : null}{summary.economics ? <ParagraphCard title="economics" text={summary.economics} /> : null}{summary.primary_need ? <ParagraphCard title="primary_need" text={summary.primary_need} tone="accent" /> : null}</div></div></GlassCard>{crossBlockFindings.length > 0 ? <div className="mt-6"><SectionHead eyebrow="cross-block findings" title="What each block confirms" text="Сводные truth-summary из всех аналитических модулей. Именно здесь читается повторяющийся паттерн, а не отдельные локальные наблюдения." /><div className="grid gap-4 xl:grid-cols-2">{crossBlockFindings.map((item) => <GlassCard key={item.label} className="p-5"><div className="flex items-start justify-between gap-3"><div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">{item.label}</div><ReliabilityDots level={item.level} system={system} compact /></div><p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p></GlassCard>)}</div></div> : null}</section>;
}

function GenericDeepDiveBlock({
  title,
  data,
  confidenceSystem,
}: {
  title: string;
  data: unknown;
  confidenceSystem: ConfidenceUiSystem;
}) {
  if (!data || typeof data !== "object") {
    return <ParagraphCard title={title} text="No payload for this block." />;
  }

  const obj = data as Record<string, unknown>;
  const entries = Object.entries(obj);

  const summaryCandidate =
    (obj.truth_summary as any)?.summary ||
    (obj.confidence_note as string) ||
    (obj.takeaway as string) ||
    "Detailed payload loaded.";

  const confidenceLevel =
    (obj.truth_summary as any)?.confidence_level ||
    ((obj as any).confidence_level as ConfidenceLevel | undefined) ||
    "preliminary";

  const preferredOrder = [
    "truth_summary",
    "strategic_posture",
    "primary_priority",
    "main_goal_conflict",
    "execution_risk",
    "near_term_focus",
    "strategy_feasibility_view",
    "operating_model_type",
    "founder_dependency_level",
    "main_process_break",
    "team_scalability_limit",
    "main_management_gap",
    "controllability_level",
    "data_usage_takeaway",
    "management_growth_limit_view",
    "product_model_type",
    "core_revenue_driver",
    "revenue_dependency_type",
    "main_revenue_leak",
    "retention_layer_takeaway",
    "product_scalability_view",
    "current_flow_state",
    "main_flow_loss_pattern",
    "bottleneck_type",
    "flow_stability",
    "channel_concentration_risk",
    "seasonality_impact",
    "flow_growth_limit_view",
    "business_model",
    "core_offer",
    "target_client",
    "positioning_type",
    "positioning_risks",
    "market_fit_view",
    "current_economic_state",
    "main_loss_pattern",
    "reliability_of_margin",
    "economic_risk",
    "economic_growth_limit_view",
    "normalized_inputs",
  ];

  const sortedEntries = preferredOrder
    .map((key) => [key, obj[key]] as [string, unknown])
    .filter(([, value]) => value !== undefined);

  const fallbackEntries = entries.filter(
    ([key]) => !preferredOrder.includes(key) && key !== "truth_summary"
  );

  const displayEntries = [...sortedEntries, ...fallbackEntries];

  return (
    <div className="space-y-6">
      <GlassCard className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
              block summary
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">
              {title}
            </div>
          </div>

          <ReliabilityDots level={confidenceLevel} system={confidenceSystem} />
        </div>

        <p className="mt-4 text-sm leading-7 text-white/70">
          {summaryCandidate}
        </p>
      </GlassCard>

      <div className="grid gap-4 xl:grid-cols-2">
        {displayEntries
          .filter(([key]) => key !== "truth_summary").filter(([key]) => key !== "truth_summary" && key !== "normalized_inputs")
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <BulletList
                  key={key}
                  title={key}
                  items={value.map(stringifyValue)}
                />
              );
            }

            if (
              value &&
              typeof value === "object" &&
              !Array.isArray(value)
            ) {
              const rows = objectToRows(value);

              if (rows.length > 0) {
                return <KeyValueRows key={key} title={key} rows={rows} />;
              }

              return <ParagraphCard key={key} title={key} text="—" />;
            }

            return (
              <ParagraphCard
                key={key}
                title={key}
                text={stringifyValue(value)}
              />
            );
          })}
      </div>
    </div>
  );
}
