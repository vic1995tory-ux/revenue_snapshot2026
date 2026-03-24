"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Gauge,
  LineChart,
  MoveRight,
  PanelsRightBottom,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";

type StatusTone = "stable" | "watch" | "priority";
type PanelKey =
  | "solution"
  | "economic"
  | "clients"
  | "product"
  | "sales"
  | "positioning"
  | "structure"
  | "analytics"
  | "strategy"
  | null;

type LeverKey = "aov" | "pricing" | "marketing" | "newProduct" | "costs";

type SectionCard = {
  key: Exclude<PanelKey, "solution" | null>;
  title: string;
  short: string;
  value: string;
  delta: string;
  tone: StatusTone;
  note: string;
};

type LeverDef = {
  key: LeverKey;
  label: string;
  subtitle: string;
  cap: number;
  step: number;
  defaultValue: number;
  why: string;
  effectLabel: string;
  implementation: string[];
  risks: string[];
  impact: {
    revenuePerPct: number;
    profitPerPct: number;
    effort: string;
    ceilingReason: string;
  };
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function pct(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${Math.round(n)}%`;
}

function toneClasses(tone: StatusTone) {
  switch (tone) {
    case "priority":
      return "border-amber-300/35 bg-amber-300/12 text-amber-200";
    case "watch":
      return "border-violet-300/30 bg-violet-300/12 text-violet-200";
    case "stable":
    default:
      return "border-emerald-300/30 bg-emerald-300/12 text-emerald-200";
  }
}

function toneLabel(tone: StatusTone) {
  switch (tone) {
    case "priority":
      return "Priority";
    case "watch":
      return "Watch";
    case "stable":
    default:
      return "Stable";
  }
}

const sectionCards: SectionCard[] = [
  {
    key: "economic",
    title: "Economic Rate",
    short: "Profit is positive, but margin headroom is constrained by current cost architecture.",
    value: "0.81",
    delta: "+11%",
    tone: "priority",
    note: "Largest gain sits in margin expansion, not raw demand volume.",
  },
  {
    key: "clients",
    title: "Clients & Flow",
    short: "Demand exists, but channel mix and capacity balance are still fragile.",
    value: "0.56",
    delta: "+6%",
    tone: "watch",
    note: "Flow quality depends too much on 2 channels and manual routing.",
  },
  {
    key: "product",
    title: "Product",
    short: "High-value offer exists, but monetization ladder is underdeveloped.",
    value: "0.73",
    delta: "+9%",
    tone: "watch",
    note: "Upsell logic is present, yet not formalized into a scalable system.",
  },
  {
    key: "sales",
    title: "Sales",
    short: "Conversion leverage is real, but current process loses value between stages.",
    value: "0.62",
    delta: "+8%",
    tone: "priority",
    note: "The main leak is not lead count, but stage discipline and value framing.",
  },
  {
    key: "positioning",
    title: "Positioning",
    short: "The market sees value, but the promise is still broader than the strongest wedge.",
    value: "0.58",
    delta: "+4%",
    tone: "watch",
    note: "Sharpening the core promise would improve price justification and close speed.",
  },
  {
    key: "structure",
    title: "Structure & Processes",
    short: "Decision load is concentrated around the founder, limiting processing speed.",
    value: "0.49",
    delta: "+12%",
    tone: "priority",
    note: "The operational bottleneck is managerial dependence, not team size.",
  },
  {
    key: "analytics",
    title: "Analytics & Management",
    short: "Some metrics are tracked, but decision loops remain only partially instrumented.",
    value: "0.52",
    delta: "+5%",
    tone: "watch",
    note: "Blind spots remain around true source contribution and post-sale value creation.",
  },
  {
    key: "strategy",
    title: "Strategy",
    short: "Growth intent is strong, though the plan requires tighter prioritization by leverage.",
    value: "0.69",
    delta: "+10%",
    tone: "stable",
    note: "The horizon is realistic only if execution follows one dominant path first.",
  },
];

const levers: LeverDef[] = [
  {
    key: "aov",
    label: "AOV growth",
    subtitle: "Increase average check through offer packaging and pricing logic.",
    cap: 20,
    step: 5,
    defaultValue: 10,
    why: "The business already has proof that buyers tolerate premium value when the outcome is framed clearly. The current gap is not product absence, but weak monetization packaging.",
    effectLabel: "Projected 6M uplift from average check optimization.",
    implementation: [
      "Repackage current offer into clearer pricing tiers.",
      "Introduce premium scope framing at proposal stage.",
      "Add one visible upsell linked to a concrete business result.",
      "Align close scripts with value instead of service list.",
    ],
    risks: [
      "Price lift without stronger framing reduces close rate.",
      "Team must be able to defend value consistently.",
      "Delivery scope needs tighter boundaries after repricing.",
    ],
    impact: {
      revenuePerPct: 720,
      profitPerPct: 390,
      effort: "Medium",
      ceilingReason:
        "Above 20% the value argument becomes structurally weak without major repositioning or a stronger premium layer.",
    },
  },
  {
    key: "pricing",
    label: "Pricing revision",
    subtitle: "Rebuild pricing logic around retained value and profitability thresholds.",
    cap: 18,
    step: 3,
    defaultValue: 9,
    why: "The current pricing model likely undercharges relative to outcome depth. Margin improvement can come faster from price logic than from pure volume chasing.",
    effectLabel: "Projected 6M uplift from pricing architecture revision.",
    implementation: [
      "Set a minimum profitable pricing floor.",
      "Separate base scope from custom expansion work.",
      "Rebuild proposal format around business impact, not feature count.",
      "Introduce margin guardrails for custom deals.",
    ],
    risks: [
      "Improper transition can create quote friction.",
      "Existing clients may require grandfathering logic.",
      "Sales needs a stronger objection-handling layer.",
    ],
    impact: {
      revenuePerPct: 640,
      profitPerPct: 420,
      effort: "Medium",
      ceilingReason:
        "Above 18% the new price level likely requires a stronger category narrative and additional proof assets.",
    },
  },
  {
    key: "marketing",
    label: "Marketing spend",
    subtitle: "Increase acquisition investment only where demand quality is measurable.",
    cap: 25,
    step: 5,
    defaultValue: 10,
    why: "There is room to scale inbound, but only if additional spend stays tied to the channels with the clearest contribution to profitable demand.",
    effectLabel: "Projected 6M uplift from controlled marketing scale.",
    implementation: [
      "Concentrate budget in 1–2 proven sources first.",
      "Track cost by qualified conversation, not only top-line lead volume.",
      "Refresh messaging around sharper positioning.",
      "Tighten feedback loop between sales outcome and campaign decisions.",
    ],
    risks: [
      "More spend without channel discipline can expand losses.",
      "Capacity limits may reduce realized upside.",
      "Weak sales handoff will mute paid acquisition efficiency.",
    ],
    impact: {
      revenuePerPct: 510,
      profitPerPct: 230,
      effort: "High",
      ceilingReason:
        "Beyond 25% more spend likely increases complexity faster than profit unless sales and capacity are already upgraded.",
    },
  },
  {
    key: "newProduct",
    label: "New product test",
    subtitle: "Launch a structured offer layer to capture unmet willingness to pay.",
    cap: 15,
    step: 5,
    defaultValue: 5,
    why: "A new offer layer can expand revenue density per client, but it should remain a test path until the core monetization logic is tightened.",
    effectLabel: "Projected 6M uplift from new product validation.",
    implementation: [
      "Define one narrow premium or expansion offer.",
      "Test with existing warm demand first.",
      "Measure attach rate and margin separately.",
      "Validate whether it raises LTV or just adds delivery noise.",
    ],
    risks: [
      "Premature expansion can distract from the core bottleneck.",
      "Operational complexity may rise before demand clarity appears.",
      "Weak packaging can blur positioning further.",
    ],
    impact: {
      revenuePerPct: 430,
      profitPerPct: 210,
      effort: "High",
      ceilingReason:
        "Above 15% modeled contribution this path becomes too speculative without real attach-rate evidence.",
    },
  },
  {
    key: "costs",
    label: "Cost restructuring",
    subtitle: "Lower drag by tightening expense logic and delivery efficiency.",
    cap: 16,
    step: 4,
    defaultValue: 8,
    why: "The model shows margin pressure. Restructuring costs is a valid support lever, but alone it will not create the strongest upside unless paired with better monetization.",
    effectLabel: "Projected 6M uplift from cost discipline and delivery efficiency.",
    implementation: [
      "Audit variable vs fixed spend by real contribution.",
      "Remove duplicated effort in delivery and coordination.",
      "Rebuild expense thresholds by scenario.",
      "Tie outsourcing and tooling to clear payback logic.",
    ],
    risks: [
      "Over-cutting can reduce delivery quality.",
      "Savings may be temporary if process discipline does not change.",
      "Cost focus can distract from the stronger growth lever.",
    ],
    impact: {
      revenuePerPct: 180,
      profitPerPct: 340,
      effort: "Medium",
      ceilingReason:
        "Above 16% modeled improvement, cuts begin to threaten growth capacity or service quality.",
    },
  },
];

const drawerContent = {
  economic: {
    eyebrow: "Economic Rate",
    title: "The model is economically viable, but profit gain is capped by a monetization gap.",
    summary:
      "Revenue generation works, yet too much value is left unclaimed between delivered outcome and captured price. The strongest upside does not come from chasing more volume first, but from improving revenue density and margin logic.",
    bullets: [
      "The current margin is positive, though still below the level required for confident scaling.",
      "Main loss type: structural monetization leak rather than demand collapse.",
      "The business can likely create more profit faster by extracting more value per processed client.",
    ],
  },
  clients: {
    eyebrow: "Clients & Flow",
    title: "Demand exists, but the flow model is only partially controllable.",
    summary:
      "The business is not empty on top of funnel. The real issue is channel dependence and uneven flow quality, combined with a capacity ceiling that can mute upside from acquisition.",
    bullets: [
      "A significant share of flow likely comes from a narrow set of sources.",
      "Capacity and incoming demand sit too close to each other to scale safely.",
      "The next improvement should raise quality and processing speed, not only lead volume.",
    ],
  },
  product: {
    eyebrow: "Product",
    title: "The offer has value, but the monetization ladder is still shallow.",
    summary:
      "There are signs of strong product relevance, yet the current offer system is probably under-layered. This limits average check, repeat value, and logical expansion into premium positioning.",
    bullets: [
      "The strongest path is to formalize offer packaging rather than add random service variations.",
      "Retention mechanics exist, but they need clearer linkage to revenue logic.",
      "The product should be easier to buy at multiple value levels.",
    ],
  },
  sales: {
    eyebrow: "Sales",
    title: "The funnel leaks value between interest and conversion.",
    summary:
      "The business likely loses money not only on traffic quality but on how value is carried across the sales path. This makes conversion improvement one of the highest-return support levers.",
    bullets: [
      "Proposal framing likely under-defends price and strategic value.",
      "The path from first contact to positive experience needs stronger stage ownership.",
      "Sales improvement will amplify other levers instead of replacing them.",
    ],
  },
  positioning: {
    eyebrow: "Positioning",
    title: "The promise is broader than the strongest value wedge.",
    summary:
      "The market can probably understand the offer, but not yet through the sharpest economic promise. Stronger positioning would support faster close, better pricing, and more focused acquisition.",
    bullets: [
      "A tighter wedge would make premium pricing more defendable.",
      "The positioning should translate complexity into one clear buying reason.",
      "This is a leverage layer that strengthens both marketing and sales efficiency.",
    ],
  },
  structure: {
    eyebrow: "Structure & Processes",
    title: "Managerial concentration is slowing scale and decision speed.",
    summary:
      "The founder is likely carrying too much routing and approval load. That makes throughput dependent on one person and limits reliable scale, even if demand grows.",
    bullets: [
      "The bottleneck is decision architecture, not just manpower.",
      "More volume without role clarity would increase chaos before profit.",
      "Process relief is necessary for the main growth lever to realize fully.",
    ],
  },
  analytics: {
    eyebrow: "Analytics & Management",
    title: "The company tracks some metrics, but not yet the right decision system.",
    summary:
      "Measurement exists, though it does not yet fully support allocation decisions. This creates blind spots around source contribution, margin logic, and the economics of strategic choices.",
    bullets: [
      "The next step is not more dashboards, but clearer decision metrics.",
      "Contribution by source and by offer tier should become visible.",
      "Analytics should help rank levers, not only report outcomes.",
    ],
  },
  strategy: {
    eyebrow: "Strategy",
    title: "The ambition is valid, but sequencing now matters more than scope.",
    summary:
      "The business appears ready for growth decisions, but only one dominant path should lead the next stage. Trying to improve everything at once will reduce execution quality and blur impact.",
    bullets: [
      "The correct horizon is leverage-first, not activity-first.",
      "The main strategy should support one primary economic change and 1–2 support layers.",
      "JTBD must reflect dependencies, not only aspirations.",
    ],
  },
};

const slots = [
  { label: "Mon · 13:00", note: "Tbilisi" },
  { label: "Tue · 14:30", note: "Tbilisi" },
  { label: "Wed · 16:00", note: "Tbilisi" },
  { label: "Thu · 12:30", note: "Tbilisi" },
];

function MetricPill({
  label,
  value,
  tone = "stable",
}: {
  label: string;
  value: string;
  tone?: StatusTone;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
      <div className="text-[11px] uppercase tracking-[0.24em] text-white/45">{label}</div>
      <div className={cn("mt-2 text-2xl font-semibold text-white", tone === "priority" && "text-amber-100")}>{value}</div>
    </div>
  );
}

function SectionSummaryCard({
  card,
  onOpen,
}: {
  card: SectionCard;
  onOpen: (key: SectionCard["key"]) => void;
}) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_10px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={cn("inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.22em]", toneClasses(card.tone))}>
            {toneLabel(card.tone)}
          </div>
          <div className="mt-4 text-xl font-semibold text-white">{card.title}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">Value</div>
          <div className="mt-2 text-3xl font-semibold text-white">{card.value}</div>
          <div className="mt-1 text-sm text-emerald-300">{card.delta}</div>
        </div>
      </div>

      <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/68">{card.short}</p>

      <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/52">
        {card.note}
      </div>

      <button
        type="button"
        onClick={() => onOpen(card.key)}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
      >
        Open
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function RevenueImpactBoard({
  lever,
  value,
}: {
  lever: LeverDef;
  value: number;
}) {
  const baseRevenue = 13000;
  const baseGrossProfit = 5600;
  const activeRevenue = baseRevenue + lever.impact.revenuePerPct * value;
  const activeGrossProfit = baseGrossProfit + lever.impact.profitPerPct * value;
  const opex = activeRevenue * 0.22;
  const cogs = activeRevenue * 0.26;
  const gross = activeGrossProfit;
  const maxScale = 22000;
  const bars = [
    { label: "Revenue", value: activeRevenue, money: money(activeRevenue), accent: "bg-[#edd86f]" },
    { label: "OPEX", value: opex, money: money(opex), accent: "bg-[#8aa0ff]" },
    { label: "COGS", value: cogs, money: money(cogs), accent: "bg-[#8aa0ff]" },
    { label: "Gross Profit", value: gross, money: money(gross), accent: "bg-[#edd86f]" },
  ];

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,28,64,0.76),rgba(10,16,37,0.92))] p-6 shadow-[0_16px_80px_rgba(0,0,0,0.38)]">
      <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">Solution simulator</div>

      <div className="mt-5 flex flex-wrap gap-3">
        <MetricPill label="Driver" value={lever.label} tone="priority" />
        <MetricPill label="Applied shift" value={`${value}%`} />
        <MetricPill label="6M revenue delta" value={money(activeRevenue - baseRevenue)} tone="stable" />
        <MetricPill label="6M GP delta" value={money(activeGrossProfit - baseGrossProfit)} tone="stable" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">Leads / mo</div>
          <div className="mt-3 text-4xl font-semibold text-white">10</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">Deals / mo</div>
          <div className="mt-3 text-4xl font-semibold text-white">2.0</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">AOV</div>
          <div className="mt-3 text-4xl font-semibold text-white">{money(4100 + value * 170)}</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">Margin</div>
          <div className="mt-3 text-4xl font-semibold text-white">{44 + Math.round(value * 0.45)}%</div>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-white/8 bg-white/[0.035] p-6">
        <div className="grid grid-cols-5 gap-2 text-center text-white/40">
          {[0, 5000, 10000, 15000, 20000].map((v) => (
            <div key={v} className="text-xs sm:text-sm">
              {money(v)}
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-7">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-center justify-between text-sm text-white/65">
                <span>{bar.label}</span>
                <span>{bar.money}</span>
              </div>
              <div className="mt-3 h-6 rounded-full bg-white/7">
                <div
                  className={cn("h-6 rounded-full shadow-[0_0_24px_rgba(255,255,255,0.14)]", bar.accent)}
                  style={{ width: `${Math.min(100, (bar.value / maxScale) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">Base</div>
          <div className="mt-3 text-4xl font-semibold text-white">{money(baseRevenue)}</div>
          <div className="mt-2 text-xl text-white/55">{money(baseGrossProfit)} gross profit / 6M step</div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
          <div className="text-white/55">Active driver</div>
          <div className="mt-3 text-4xl font-semibold text-white">{money(activeRevenue)}</div>
          <div className="mt-2 text-xl text-white/55">{money(activeGrossProfit)} gross profit / 6M step</div>
        </div>
      </div>

      <div className="mt-5 rounded-full border border-amber-300/15 bg-amber-300/10 px-5 py-4 text-lg text-amber-100">
        <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full bg-[#f7d237]" />
        Current highlighted driver: <span className="font-semibold">{lever.label}</span> — projected uplift from the selected path over 6 months.
      </div>
    </div>
  );
}

function SolutionDrawer({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"overview" | "levers" | "simulator" | "execution" | "jtbd">("overview");
  const [activeLever, setActiveLever] = useState<LeverKey>("aov");
  const lever = levers.find((item) => item.key === activeLever) ?? levers[0];
  const [leverValue, setLeverValue] = useState<number>(lever.defaultValue);

  const effectiveValue = Math.min(leverValue, lever.cap);

  const projected = useMemo(() => {
    const revenueGain = effectiveValue * lever.impact.revenuePerPct;
    const profitGain = effectiveValue * lever.impact.profitPerPct;
    return {
      revenueGain,
      profitGain,
      revenue: 13000 + revenueGain,
      profit: 5600 + profitGain,
    };
  }, [effectiveValue, lever]);

  const handleLeverChange = (key: LeverKey) => {
    const nextLever = levers.find((item) => item.key === key) ?? levers[0];
    setActiveLever(key);
    setLeverValue(nextLever.defaultValue);
  };

  const TabButton = ({ id, label }: { id: typeof tab; label: string }) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={cn(
        "rounded-full border px-4 py-2.5 text-sm transition",
        tab === id
          ? "border-amber-300/40 bg-amber-300/14 text-amber-100"
          : "border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]">
      <button type="button" className="flex-1 cursor-default" onClick={onClose} aria-label="Close overlay" />
      <div className="h-full w-full max-w-[760px] overflow-y-auto border-l border-white/10 bg-[#07122a]/95 px-6 py-6 shadow-[-20px_0_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">Solution & Practice</div>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Primary path: increase average check before scaling spend.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-[15px]">
              The strongest path for the next 6 months is not broad expansion. It is a tighter monetization system: clearer pricing logic,
              stronger packaging, and one premium path that raises captured value per processed client.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricPill label="Main lever" value="AOV growth" tone="priority" />
          <MetricPill label="Expected 6M gain" value={money(projected.revenueGain)} tone="stable" />
          <MetricPill label="Gross profit gain" value={money(projected.profitGain)} tone="stable" />
          <MetricPill label="Execution effort" value={lever.impact.effort} tone="watch" />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <TabButton id="overview" label="Overview" />
          <TabButton id="levers" label="Levers" />
          <TabButton id="simulator" label="Simulator" />
          <TabButton id="execution" label="Execution conditions" />
          <TabButton id="jtbd" label="JTBD roadmap" />
        </div>

        {tab === "overview" && (
          <div className="mt-6 space-y-5">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
              <div className="flex items-center gap-3 text-white/50">
                <Sparkles className="h-4 w-4 text-amber-200" />
                Executive recommendation
              </div>
              <p className="mt-4 text-base leading-8 text-white/78">
                The business should avoid dispersing effort across too many fixes. The highest-return path is to improve revenue density per client,
                then support it with conversion and process relief. More spend or new complexity before monetization discipline would likely expand
                effort faster than profit.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">Why now</div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                  <li>• Value is already created, but not fully captured.</li>
                  <li>• Price and packaging improvements can raise profit faster than pure acquisition scale.</li>
                  <li>• This path creates a better base for later channel expansion.</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">If nothing changes</div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                  <li>• Revenue may grow slower than effort.</li>
                  <li>• Margin remains pressured by underpriced value.</li>
                  <li>• New spend would amplify existing process leakage.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === "levers" && (
          <div className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className="space-y-3">
              {levers.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleLeverChange(item.key)}
                  className={cn(
                    "w-full rounded-[24px] border p-4 text-left transition",
                    activeLever === item.key
                      ? "border-amber-300/40 bg-amber-300/12"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
                  )}
                >
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="mt-2 text-sm leading-6 text-white/55">{item.subtitle}</div>
                </button>
              ))}
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/40">Selected path</div>
              <h3 className="mt-3 text-2xl font-semibold text-white">{lever.label}</h3>
              <p className="mt-3 text-sm leading-7 text-white/70">{lever.why}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white">What must be done</div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/66">
                    {lever.implementation.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white">Execution risks</div>
                  <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/66">
                    {lever.risks.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-violet-300/15 bg-violet-300/10 p-5 text-sm leading-7 text-violet-100/92">
                <span className="font-semibold">Ceiling logic:</span> {lever.impact.ceilingReason}
              </div>
            </div>
          </div>
        )}

        {tab === "simulator" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/38">Active lever</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{lever.label}</div>
                  <div className="mt-2 text-sm text-white/58">{lever.effectLabel}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {levers.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleLeverChange(item.key)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition",
                        activeLever === item.key
                          ? "border-amber-300/40 bg-amber-300/14 text-amber-100"
                          : "border-white/10 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-white/62">
                  <span>Adjustment level</span>
                  <span>
                    {effectiveValue}% / {lever.cap}%
                  </span>
                </div>
                <input
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#f7d237]"
                  type="range"
                  min={0}
                  max={lever.cap}
                  step={lever.step}
                  value={effectiveValue}
                  onChange={(e) => setLeverValue(Number(e.target.value))}
                />
                <div className="mt-3 flex justify-between text-xs uppercase tracking-[0.2em] text-white/30">
                  <span>0%</span>
                  <span>{Math.round(lever.cap / 2)}%</span>
                  <span>{lever.cap}%</span>
                </div>
                <div className="mt-4 rounded-[24px] border border-amber-300/15 bg-amber-300/10 p-4 text-sm leading-7 text-amber-100/92">
                  Above {lever.cap}% this lever is no longer considered realistic for the next 6 months. Reason: {lever.impact.ceilingReason}
                </div>
              </div>
            </div>

            <RevenueImpactBoard lever={lever} value={effectiveValue} />
          </div>
        )}

        {tab === "execution" && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
              <div className="flex items-center gap-3 text-white/50">
                <Wrench className="h-4 w-4 text-violet-200" />
                What needs to be true
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                <li>• Offer architecture must be clarified before new spend scales.</li>
                <li>• Sales scripts need stronger value framing and price defense.</li>
                <li>• Delivery scope should be standardized to protect margin.</li>
                <li>• Decision load must shift away from the founder on routine operations.</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
              <div className="flex items-center gap-3 text-white/50">
                <ShieldCheck className="h-4 w-4 text-emerald-200" />
                Dependencies and control points
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                <li>• Track close rate after pricing and packaging adjustment.</li>
                <li>• Watch margin by offer tier, not just total revenue.</li>
                <li>• Validate upsell attach rate before building more complexity.</li>
                <li>• Review delivery load every 2 weeks during rollout.</li>
              </ul>
            </div>
          </div>
        )}

        {tab === "jtbd" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">Strategic objective</div>
              <div className="mt-3 text-2xl font-semibold text-white">Raise profit without increasing operational chaos.</div>
              <p className="mt-4 text-sm leading-7 text-white/70">
                The job is not simply to grow. The job is to build a model where each processed client creates more captured value, while the founder’s direct load and the company’s margin volatility both decrease.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-sm font-semibold text-white">0–6 weeks</div>
                <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/68">
                  <li>• Rebuild offer ladder and price boundaries.</li>
                  <li>• Define one premium or upsell path with clear value logic.</li>
                  <li>• Tighten proposal framing and closing narrative.</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-sm font-semibold text-white">3 months</div>
                <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/68">
                  <li>• Validate price tolerance and upsell conversion.</li>
                  <li>• Reallocate spend toward high-quality acquisition paths.</li>
                  <li>• Create margin visibility by offer tier and source.</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-sm font-semibold text-white">6 months</div>
                <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/68">
                  <li>• Scale only the monetization paths that proved profitable.</li>
                  <li>• Reduce founder routing through process ownership.</li>
                  <li>• Lock one primary growth loop instead of many experiments.</li>
                </ul>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6">
                <div className="text-sm font-semibold text-white">Expected outcome</div>
                <ul className="mt-4 space-y-2.5 text-sm leading-7 text-white/68">
                  <li>• Higher average check with better close economics.</li>
                  <li>• Better margin resilience at similar demand levels.</li>
                  <li>• Cleaner operating model for later scale decisions.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionDrawer({ panel, onClose }: { panel: Exclude<PanelKey, "solution" | null>; onClose: () => void }) {
  const data = drawerContent[panel];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]">
      <button type="button" className="flex-1 cursor-default" onClick={onClose} aria-label="Close overlay" />
      <div className="h-full w-full max-w-[640px] overflow-y-auto border-l border-white/10 bg-[#081328]/95 px-6 py-6 shadow-[-20px_0_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">{data.eyebrow}</div>
            <h2 className="mt-3 text-3xl font-semibold text-white">{data.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 text-sm leading-7 text-white/72">
          {data.summary}
        </div>

        <div className="mt-5 space-y-4">
          {data.bullets.map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/70">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RevenueSnapshotResultsPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07122a] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,124,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(247,210,55,0.12),transparent_24%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(ellipse_at_bottom,rgba(247,210,55,0.18),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,15,39,0.92),rgba(7,14,30,0.95))] p-5 shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_420px]">
            <div>
              <div className="text-[12px] uppercase tracking-[0.34em] text-white/42">Revenue Snapshot · Diagnostic output</div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {[
                  ["Economic Rate", Gauge],
                  ["Growth Limit", TrendingUp],
                  ["Solution & Practice", Sparkles],
                  ["JTBD", Target],
                ].map(([label, Icon]) => (
                  <div
                    key={String(label)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/72"
                  >
                    <Icon className="h-4 w-4 text-amber-200" />
                    {label}
                  </div>
                ))}
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
                This diagnostic shows where profit is constrained now — and which one path creates the strongest 6‑month gain.
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/62 sm:text-[15px]">
                Draft output view for the client result page. The hero remains familiar to preserve continuity from Snapshot Action, while the
                detailed reading moves into right-side panels to keep the page faster, cleaner and easier to scan.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricPill label="Economic rate" value="0.81" tone="priority" />
                <MetricPill label="Main growth limit" value="Founder load" tone="watch" />
                <MetricPill label="Priority horizon" value="6 months" tone="stable" />
                <MetricPill label="Expected gross uplift" value={money(3900)} tone="stable" />
              </div>

              <div className="mt-6 rounded-[30px] border border-white/10 bg-white/[0.045] p-5">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">Leads / mo</div>
                    <div className="mt-3 text-4xl font-semibold text-white">10</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">Deals / mo</div>
                    <div className="mt-3 text-4xl font-semibold text-white">2.0</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">AOV</div>
                    <div className="mt-3 text-4xl font-semibold text-white">$4 100</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">Margin</div>
                    <div className="mt-3 text-4xl font-semibold text-white">44%</div>
                  </div>
                </div>

                <div className="mt-5 rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(23,35,68,0.8),rgba(11,18,37,0.9))] p-5">
                  <div className="grid grid-cols-5 gap-2 text-center text-sm text-white/40">
                    {[0, 5000, 10000, 15000, 20000].map((v) => (
                      <div key={v}>{money(v)}</div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-6">
                    {[
                      { label: "Revenue", width: "76%", amount: "$15 200", accent: "bg-[#edd86f]" },
                      { label: "OPEX", width: "19%", amount: "$3 300", accent: "bg-[#8aa0ff]" },
                      { label: "COGS", width: "22%", amount: "$3 900", accent: "bg-[#8aa0ff]" },
                      { label: "Gross Profit", width: "33%", amount: "$6 700", accent: "bg-[#edd86f]" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-sm text-white/65">
                          <span>{item.label}</span>
                          <span>{item.amount}</span>
                        </div>
                        <div className="mt-3 h-6 rounded-full bg-white/7">
                          <div className={cn("h-6 rounded-full", item.accent)} style={{ width: item.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">Base</div>
                    <div className="mt-3 text-4xl font-semibold text-white">$13 000</div>
                    <div className="mt-2 text-xl text-white/55">$5 600 gross profit / mo</div>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                    <div className="text-white/55">Active driver</div>
                    <div className="mt-3 text-4xl font-semibold text-white">$15 200</div>
                    <div className="mt-2 text-xl text-white/55">$6 700 gross profit / mo</div>
                  </div>
                </div>

                <div className="mt-5 rounded-full border border-amber-300/15 bg-amber-300/10 px-5 py-4 text-lg text-amber-100">
                  <span className="mr-3 inline-block h-3.5 w-3.5 rounded-full bg-[#f7d237]" />
                  Current highlighted driver: <span className="font-semibold">AOV</span> — average check expansion.
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">Solution & Practice</div>
                <div className="rounded-full border border-amber-300/30 bg-amber-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-amber-100">
                  Main path
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white">AOV-led growth with pricing and offer control.</h2>
              <p className="mt-4 text-sm leading-7 text-white/68">
                The strongest move is to increase revenue density per processed client first. This path builds profit before extra acquisition
                complexity and creates a more durable base for the next stage of scaling.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Primary lever</div>
                  <div className="mt-2 text-lg font-semibold text-white">Average check</div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Priority horizon</div>
                  <div className="mt-2 text-lg font-semibold text-white">0–6 months</div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Expected impact</div>
                  <div className="mt-2 text-lg font-semibold text-white">+{money(7200)} revenue</div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Job to be done</div>
                  <div className="mt-2 text-lg font-semibold text-white">Raise profit without chaos</div>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-violet-300/18 bg-violet-300/10 p-4 text-sm leading-7 text-violet-100/92">
                Main support layers: pricing revision, conversion tightening, process relief, and margin visibility by offer tier.
              </div>

              <button
                type="button"
                onClick={() => setActivePanel("solution")}
                className="mt-6 inline-flex w-full items-center justify-between rounded-[22px] border border-white/12 bg-white/5 px-5 py-4 text-left text-white transition hover:border-white/20 hover:bg-white/10"
              >
                <span>
                  <span className="block text-sm font-semibold">Open Solution & Practice</span>
                  <span className="mt-1 block text-sm text-white/55">Detailed overview, levers, simulator, execution and JTBD roadmap.</span>
                </span>
                <MoveRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sectionCards.map((card) => (
            <SectionSummaryCard key={card.key} card={card} onOpen={setActivePanel} />
          ))}
        </section>

        <section className="mt-8 rounded-[34px] border border-white/10 bg-white/[0.045] p-5 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">Decoding session</div>
              <h2 className="mt-3 text-3xl font-semibold text-white">Book a 30-minute working session with Growth Avenue.</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68">
                Use this call to align the diagnostic with your actual business context, validate the dominant lever, and confirm which path is worth executing first.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/12 px-5 py-3 text-sm font-medium text-amber-100 transition hover:bg-amber-300/18">
              Open all slots
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {slots.map((slot) => {
              const selected = selectedSlot === slot.label;
              return (
                <button
                  key={slot.label}
                  type="button"
                  onClick={() => setSelectedSlot(slot.label)}
                  className={cn(
                    "rounded-[24px] border p-4 text-left transition",
                    selected
                      ? "border-amber-300/35 bg-amber-300/12"
                      : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex items-center gap-2 text-white/50">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-[0.22em]">Available slot</span>
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">{slot.label}</div>
                  <div className="mt-1 text-sm text-white/52">{slot.note}</div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {activePanel === "solution" && <SolutionDrawer onClose={() => setActivePanel(null)} />}
      {activePanel && activePanel !== "solution" && <SectionDrawer panel={activePanel} onClose={() => setActivePanel(null)} />}
    </main>
  );
}
