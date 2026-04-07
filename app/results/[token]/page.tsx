"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  FunnelChart,
  Funnel,
  LabelList,
  Sankey,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleOff,
  Clock3,
  Gauge,
  Layers3,
  Lock,
  LucideIcon,
  Radar,
  Scale,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Globe2,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

type HeroTag = {
  label: string;
  tone?: "neutral" | "warning" | "good";
};

type KPI = {
  label: string;
  value: string;
  sub?: string;
  kind?: "base" | "calculated" | "loss";
};

type SummaryItem = {
  label: string;
  value: string;
  note?: string;
  icon?: keyof typeof ICONS;
};

type BlockInterpretation = {
  id: string;
  title: string;
  signal: string;
  interpretation: string;
  relation: string;
  risk: string;
  unknown: string;
  conclusion: string;
};

type LeverNode = {
  name: string;
  role: "primary" | "amplifies" | "unlocks" | "stabilizes" | "rejected";
  zone: string;
  reason?: string;
};

type StrategyStep = {
  horizon: "0–3 months" | "3–6 months";
  title: string;
  text: string;
};

type Dependency = {
  label: string;
  score: number;
};

type ControlMetric = {
  name: string;
  current: number;
  target: number;
  unit?: string;
  direction: "up" | "down";
};

type AlertRule = {
  label: string;
  status: "watch" | "good" | "risk";
  logic: string;
};

type ResultsPayload = {
  company: {
    name: string;
    niche: string;
    stage: string;
    country: string;
    marketTakeaway: string;
  };
  hero: {
    summary: string;
    tags: HeroTag[];
    growthLimit: {
      type: string;
      bottleneck: string;
      why: string;
    };
    primaryLever: {
      name: string;
      essence: string;
      zone: string;
    };
  };
  economics: {
    headlineKpis: KPI[];
    baseKpis: KPI[];
    calculatedKpis: KPI[];
    losses: KPI[];
    revenueWaterfall: { name: string; value: number }[];
    demandCapacity: { name: string; value: number }[];
    funnel: { value: number; name: string }[];
    economicsShift: { name: string; before: number; after: number }[];
  };
  quickFacts: SummaryItem[];
  blockInterpretation: BlockInterpretation[];
  strategy: {
    scenario: {
      type: string;
      why: string;
      marketLimits: string;
      notNow: string;
    };
    leverMap: LeverNode[];
    leverMechanics: {
      chain: Array<{
        lever: string;
        metric: string;
        economics: string;
        result: string;
      }>;
      sankey: {
        nodes: { name: string }[];
        links: { source: number; target: number; value: number }[];
      };
    };
    implementationLogic: {
      change: string;
      applicationPoint: string;
      systemMustAppear: string;
    };
    timeHorizon: StrategyStep[];
    dependencies: Dependency[];
    risks: {
      mainRisk: string;
      failCondition: string;
    };
    expectedShift: {
      decreases: string;
      grows: string;
      keyMetric: string;
    };
    strategicPriority: {
      primary: string;
      secondary: string[];
      forbiddenNow: string[];
    };
    rejectedLevers: LeverNode[];
  };
  management: {
    controlMetrics: ControlMetric[];
    alertRules: AlertRule[];
    scenarios: {
      conservative: { revenue: number; profit: number; lossReduction: number };
      balanced: { revenue: number; profit: number; lossReduction: number };
      aggressive: { revenue: number; profit: number; lossReduction: number };
    };
  };
  notAProblem: string[];
};

type ChapterKey =
  | "economics"
  | "interpretation"
  | "strategy"
  | "management";

const ICONS = {
  Target,
  TrendingUp,
  Gauge,
  Wallet,
  Users,
  Radar,
  Layers3,
  Briefcase,
  BarChart3,
  Building2,
  Settings2,
  Scale,
  Globe2,
};

const CHAPTER_TABS: Array<{
  key: ChapterKey;
  label: string;
  eyebrow: string;
  summary: string;
  tags: string[];
  icon: LucideIcon;
}> = [
  {
    key: "economics",
    label: "Unit economics and loss map",
    eyebrow: "1 chapter",
    summary: "База, расчетные метрики и прямые потери.",
    tags: ["Revenue", "Margin", "Losses"],
    icon: Wallet,
  },
  {
    key: "interpretation",
    label: "Разбор ответов по блокам",
    eyebrow: "2 chapter",
    summary: "Сигналы, ограничения и связь между блоками.",
    tags: ["Signal", "Risks", "Relations"],
    icon: Layers3,
  },
  {
    key: "strategy",
    label: "Стратегия и система рычагов",
    eyebrow: "3 chapter",
    summary: "Сценарий, механика рычага и приоритет действий.",
    tags: ["Primary lever", "Scenario", "Roadmap"],
    icon: Target,
  },
  {
    key: "management",
    label: "Control panel and strategy management tools",
    eyebrow: "4 chapter",
    summary: "Контрольные метрики, сценарии и триггеры.",
    tags: ["Control", "Scenarios", "Alerts"],
    icon: Settings2,
  },
];

const mockPayload: ResultsPayload = {
  company: {
    name: "Northwave Studio",
    niche: "DTC / designer apparel",
    stage: "Developing",
    country: "Italy",
    marketTakeaway:
      "Спрос чувствителен к доверию и качеству продукта, но рынок конкурентный, а рост без усиления конверсии и структуры будет неустойчивым.",
  },
  hero: {
    summary:
      "Основная потеря бизнеса связана не с отсутствием спроса, а с потерями на переходе от интереса к покупке. При текущей структуре команда обрабатывает поток неравномерно, а продуктовая подача и продажа не превращают уже существующий интерес в стабильную выручку.",
    tags: [
      { label: "#ConversionLoss", tone: "warning" },
      { label: "#SalesBottleneck", tone: "warning" },
      { label: "#HighCompetition", tone: "neutral" },
      { label: "#TrustDrivenDemand", tone: "neutral" },
      { label: "#ManagementOverload", tone: "warning" },
      { label: "#PremiumMidSegment", tone: "good" },
    ],
    growthLimit: {
      type: "Conversion / Funnel",
      bottleneck: "Низкая конверсия из интереса в оплату",
      why: "Экономика показывает высокий Lost Revenue на этапе сделки, рынок усиливает роль доверия и понятности выбора, а rules поддерживают lever в зоне conversion и structure.",
    },
    primaryLever: {
      name: "Rebuild of conversion system",
      essence:
        "Пересборка логики входа в продукт, выбора оффера и прохождения клиента по CJM.",
      zone: "conversion",
    },
  },
  economics: {
    headlineKpis: [
      { label: "Revenue", value: "€42,000", sub: "last month", kind: "base" },
      { label: "Profit", value: "€8,400", sub: "estimated", kind: "base" },
      { label: "Margin", value: "20%", sub: "after expenses", kind: "base" },
      { label: "Clients", value: "56", sub: "monthly", kind: "base" },
      {
        label: "Avg Check",
        value: "€750",
        sub: "calculated",
        kind: "calculated",
      },
      {
        label: "Utilization",
        value: "78%",
        sub: "team / ops",
        kind: "calculated",
      },
    ],
    baseKpis: [
      { label: "Revenue", value: "€42,000" },
      { label: "Profit", value: "€8,400" },
      { label: "Margin %", value: "20%" },
      { label: "Clients", value: "56" },
      { label: "Leads", value: "190" },
    ],
    calculatedKpis: [
      { label: "Avg Check", value: "€750" },
      { label: "Lead → Sale", value: "29.5%" },
      { label: "Gross Profit", value: "€8,400" },
      { label: "Demand / Capacity", value: "190 / 150" },
      { label: "Capacity Gap", value: "26.7%" },
    ],
    losses: [
      { label: "Lost Revenue", value: "€12,500", kind: "loss" },
      { label: "Lost Profit", value: "€2,500", kind: "loss" },
      { label: "Conversion Loss", value: "18%", kind: "loss" },
      { label: "Capacity Loss", value: "7%", kind: "loss" },
    ],
    revenueWaterfall: [
      { name: "Actual Revenue", value: 42000 },
      { name: "Lost Revenue", value: 12500 },
      { name: "Potential Revenue", value: 54500 },
    ],
    demandCapacity: [
      { name: "Demand", value: 190 },
      { name: "Capacity", value: 150 },
    ],
    funnel: [
      { name: "Leads", value: 190 },
      { name: "Qualified", value: 128 },
      { name: "Offers", value: 79 },
      { name: "Sales", value: 56 },
    ],
    economicsShift: [
      { name: "Revenue", before: 42000, after: 49800 },
      { name: "Profit", before: 8400, after: 11700 },
      { name: "Conversion", before: 29.5, after: 35.2 },
    ],
  },
  quickFacts: [
    {
      label: "Loss Type",
      value: "Conversion",
      note: "главная потеря денег сейчас",
      icon: "Target",
    },
    {
      label: "Bottleneck",
      value: "Deal stage",
      note: "интерес не превращается в оплату",
      icon: "Gauge",
    },
    {
      label: "Market Signal",
      value: "Trust + competition",
      note: "рынок требует ясного и убедительного выбора",
      icon: "Radar",
    },
    {
      label: "Model Risk",
      value: "Founder overload",
      note: "управление завязано на одном центре решений",
      icon: "Briefcase",
    },
  ],
  blockInterpretation: [
    {
      id: "positioning",
      title: "POSITIONING",
      signal:
        "Бизнес работает в B2C/DTC-модели с рационально-эмоциональным спросом и средним циклом сделки.",
      interpretation:
        "Покупка требует доверия к продукту и понятности выбора, поэтому рост зависит не только от трафика, но и от качества подачи оффера.",
      relation:
        "Это усиливает значение блока Product & Sales и объясняет чувствительность конверсии к оформлению входа в продукт.",
      risk:
        "Без явной логики выбора клиент откладывает решение или уходит к более понятному конкуренту.",
      unknown:
        "Не доказан точный ценовой сегмент и глубина различия между сегментами клиентов.",
      conclusion:
        "Ограничение роста связано с упаковкой спроса в покупку, а не только с объемом спроса.",
    },
    {
      id: "economics",
      title: "ECONOMICS",
      signal:
        "Выручка есть, маржа положительная, но разрыв между текущей и потенциальной выручкой уже заметен.",
      interpretation:
        "Экономика не находится в состоянии коллапса, но теряет деньги на неэффективном превращении потока в оплаченные сделки.",
      relation:
        "Подтверждает вывод из Clients & Flow: проблема не только в потоке, а в прохождении клиента через систему продажи.",
      risk:
        "При масштабировании трафика потери будут расти быстрее выручки.",
      unknown:
        "Не доказана точная динамика CAC и повторных продаж.",
      conclusion:
        "Главная экономическая потеря — conversion leak с прямым ударом по Lost Revenue.",
    },
    {
      id: "clients-flow",
      title: "CLIENTS & FLOW",
      signal:
        "Спрос присутствует, но его обработка ограничена и неравномерна.",
      interpretation:
        "Часть клиентов теряется либо до предложения, либо в моменте выбора, что снижает монетизацию имеющегося интереса.",
      relation:
        "Связано с перегрузом структуры и отсутствием четкого сценария прохождения по воронке.",
      risk:
        "Рост трафика без пересборки системы усилит хаос, а не выручку.",
      unknown:
        "Не доказано, на каком именно микроэтапе воронки происходит максимальный обрыв.",
      conclusion:
        "Поток нельзя считать главной проблемой; слабее работает сама система конверсии.",
    },
    {
      id: "product-sales",
      title: "PRODUCT & SALES",
      signal:
        "Продукт интересен, но вход в него и логика выбора недостаточно упрощены для быстрой оплаты.",
      interpretation:
        "Клиенту трудно быстро понять, что ему подходит и почему покупать сейчас.",
      relation:
        "Это напрямую поддерживает primary lever в зоне conversion.",
      risk:
        "Даже качественный продукт будет недомонетизироваться.",
      unknown:
        "Не доказана роль retention и повторных покупок как второго источника роста.",
      conclusion:
        "Главное ограничение монетизации сейчас — слабая конверсионная архитектура продукта и продажи.",
    },
    {
      id: "analytics-management",
      title: "ANALYTICS & MANAGEMENT",
      signal:
        "Аналитика присутствует частично, но не дает полного контроля над точками потерь.",
      interpretation:
        "Управление происходит скорее по ощущениям и общему результату, чем по этапам системы.",
      relation:
        "Это ограничивает качество управляемости primary lever и усложняет проверку гипотез.",
      risk:
        "Без контрольных метрик система не сможет удержать результат после улучшения.",
      unknown:
        "Не доказана регулярность использования аналитики в принятии решений.",
      conclusion:
        "Для роста нужен не только lever, но и слой управляемости вокруг него.",
    },
    {
      id: "structure-processes",
      title: "STRUCTURE & PROCESSES",
      signal:
        "Критические решения и узлы координации сосредоточены слишком близко к руководителю.",
      interpretation:
        "Система роста зависит от ручного управления, а не от воспроизводимого процесса.",
      relation:
        "Это усиливает conversion-проблему: хороший спрос не проходит через систему стабильно.",
      risk:
        "При росте входящего потока перегруз усилится быстрее, чем вырастет выручка.",
      unknown:
        "Не доказана глубина перегруза по конкретным ролям.",
      conclusion:
        "Операционная структура не разрушает бизнес, но ограничивает его воспроизводимый рост.",
    },
    {
      id: "strategy",
      title: "STRATEGY",
      signal:
        "Бизнесу сейчас больше нужен не expansion, а conversion-led scenario.",
      interpretation:
        "Расти трафиком раньше пересборки конверсии экономически невыгодно.",
      relation:
        "Стратегия подтверждается economics, market context и rules.",
      risk:
        "Неверная приоритизация сместит ресурсы в привлечение, а не в устранение core loss.",
      unknown:
        "Не доказан предельный эффект secondary levers без улучшения основного сценария.",
      conclusion:
        "Стратегически сначала нужно уменьшить conversion loss, а уже потом масштабировать спрос.",
    },
  ],
  strategy: {
    scenario: {
      type: "Conversion",
      why:
        "Экономика показывает основной Lost Revenue в воронке, рынок требует большей понятности и доверия, rules поддерживают lever в зоне conversion и structure, а не expansion.",
      marketLimits:
        "Высокая конкуренция и чувствительность к качеству выбора ограничивают эффективность простого увеличения трафика.",
      notNow:
        "Не имеет смысла aggressively scale acquisition до пересборки логики оффера и продажи.",
    },
    leverMap: [
      {
        name: "Rebuild of conversion system",
        role: "primary",
        zone: "conversion",
      },
      {
        name: "Offer architecture",
        role: "amplifies",
        zone: "conversion",
      },
      {
        name: "Sales process formalization",
        role: "unlocks",
        zone: "structure",
      },
      {
        name: "Decision analytics",
        role: "stabilizes",
        zone: "analytics",
      },
    ],
    leverMechanics: {
      chain: [
        {
          lever: "Rebuild of conversion system",
          metric: "Lead → Sale conversion",
          economics: "Lost Revenue decreases",
          result: "Revenue grows without proportional CAC growth",
        },
        {
          lever: "Offer architecture",
          metric: "Offer acceptance rate",
          economics: "Avg monetization per lead improves",
          result: "Profitability of existing flow rises",
        },
        {
          lever: "Sales process formalization",
          metric: "Processing speed / consistency",
          economics: "Capacity leak decreases",
          result: "More demand is converted into paid clients",
        },
      ],
      sankey: {
        nodes: [
          { name: "Primary Lever" },
          { name: "Conversion" },
          { name: "Lost Revenue" },
          { name: "Revenue" },
          { name: "Profit" },
        ],
        links: [
          { source: 0, target: 1, value: 8 },
          { source: 1, target: 2, value: 6 },
          { source: 2, target: 3, value: 5 },
          { source: 3, target: 4, value: 4 },
        ],
      },
    },
    implementationLogic: {
      change:
        "Должна измениться логика входа клиента в продукт, структура выбора оффера и воспроизводимость прохождения по воронке.",
      applicationPoint:
        "Точка приложения — вход в продукт, этап квалификации, предложение, принятие решения.",
      systemMustAppear:
        "В системе должны появиться единая логика оффера, формализованные этапы продажи и контрольные метрики на каждом узле.",
    },
    timeHorizon: [
      {
        horizon: "0–3 months",
        title: "Fast effect",
        text:
          "Снижение потерь в воронке и рост конверсии за счет пересборки сценария выбора и продажи.",
      },
      {
        horizon: "3–6 months",
        title: "System effect",
        text:
          "Закрепление процесса, снижение зависимости от ручного управления и рост воспроизводимой выручки.",
      },
    ],
    dependencies: [
      { label: "Team readiness", score: 68 },
      { label: "Analytics visibility", score: 52 },
      { label: "Offer clarity", score: 61 },
      { label: "Operational discipline", score: 57 },
    ],
    risks: {
      mainRisk:
        "Попытка усилить трафик до пересборки системы продажи приведет к росту хаоса, а не к росту прибыли.",
      failCondition:
        "Lever не сработает, если не будет зафиксирована единая логика предложения и контроль по этапам воронки.",
    },
    expectedShift: {
      decreases: "Conversion loss and part of capacity leak",
      grows: "Revenue, profit, predictability of monetization",
      keyMetric: "Lead → Sale conversion",
    },
    strategicPriority: {
      primary: "Rebuild of conversion system",
      secondary: [
        "Offer architecture",
        "Sales process formalization",
        "Decision analytics",
      ],
      forbiddenNow: [
        "Aggressive traffic scaling",
        "New market expansion",
        "Broad product-line expansion",
      ],
    },
    rejectedLevers: [
      {
        name: "CAC scaling",
        role: "rejected",
        zone: "marketing",
        reason:
          "Не влияет на корневой bottleneck и усиливает потери при текущей конверсионной системе.",
      },
      {
        name: "Retention-first scenario",
        role: "rejected",
        zone: "LTV",
        reason:
          "Может дать эффект позже, но не решает главный текущий loss source.",
      },
    ],
  },
  management: {
    controlMetrics: [
      {
        name: "Lead → Sale",
        current: 29.5,
        target: 35.2,
        unit: "%",
        direction: "up",
      },
      {
        name: "Offer Acceptance",
        current: 61,
        target: 70,
        unit: "%",
        direction: "up",
      },
      {
        name: "Processing Speed",
        current: 4.4,
        target: 3.1,
        unit: "days",
        direction: "down",
      },
      {
        name: "Utilization",
        current: 78,
        target: 84,
        unit: "%",
        direction: "up",
      },
    ],
    alertRules: [
      {
        label: "Conversion below threshold",
        status: "risk",
        logic:
          "If Lead → Sale < 30% for 2 weeks, investigate qualification and offer stage.",
      },
      {
        label: "Processing speed within target",
        status: "watch",
        logic:
          "If average processing time > 4 days, capacity leak risk increases.",
      },
      {
        label: "Offer acceptance improving",
        status: "good",
        logic:
          "If offer acceptance > 68%, scenario is moving toward planned economics.",
      },
    ],
    scenarios: {
      conservative: { revenue: 45600, profit: 9500, lossReduction: 18 },
      balanced: { revenue: 49800, profit: 11700, lossReduction: 34 },
      aggressive: { revenue: 53200, profit: 12900, lossReduction: 43 },
    },
  },
  notAProblem: [
    "Спрос как таковой не выглядит главным ограничением на текущем этапе.",
    "Маржа не идеальна, но сама по себе не объясняет основной разрыв в выручке.",
    "Рынок сложный, но не блокирующий: проблема в том, как бизнес в нем проходит путь к покупке.",
  ],
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatCompact(value: number, suffix = "") {
  if (Math.abs(value) >= 1000) {
    return `${new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)}${suffix}`;
  }
  return `${value}${suffix}`;
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(57,88,157,0.18)_0%,rgba(17,39,78,0.62)_45%,rgba(8,27,59,0.92)_100%)] backdrop-blur-xl shadow-[0_20px_90px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="mb-6 flex items-start gap-5">
      {Icon ? (
        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-[22px] border border-[#f7d237]/20 bg-[#f7d237]/8 text-[#f7d237] shadow-[0_0_0_1px_rgba(247,210,55,0.03),0_10px_30px_rgba(247,210,55,0.08)]">
          <Icon className="h-5 w-5" />
        </div>
      ) : null}
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.32em] text-[#a8b0c8]">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#c9d0e4]">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MetricCard({ item }: { item: KPI }) {
  return (
    <GlassCard className="p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-[#8f9abb]">
        {item.label}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {item.value}
      </div>
      {item.sub ? (
        <div className="mt-2 text-sm text-[#bfc7dd]">{item.sub}</div>
      ) : null}
    </GlassCard>
  );
}

function QuickFactCard({ item }: { item: SummaryItem }) {
  const Icon = item.icon ? ICONS[item.icon] : Sparkles;
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.22em] text-[#8f9abb]">
          {item.label}
        </div>
        <Icon className="h-4 w-4 text-[#f7d237]" />
      </div>
      <div className="mt-3 text-lg font-semibold text-white">{item.value}</div>
      {item.note ? (
        <div className="mt-2 text-sm leading-6 text-[#c9d0e4]">{item.note}</div>
      ) : null}
    </GlassCard>
  );
}

function Tag({ tag }: { tag: HeroTag }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.14em] uppercase",
        tag.tone === "warning" &&
          "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#f7d237]",
        tag.tone === "good" &&
          "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
        (!tag.tone || tag.tone === "neutral") &&
          "border-white/10 bg-white/5 text-[#d8dff2]",
      )}
    >
      {tag.label}
    </span>
  );
}

function InterpretationAccordion({ block }: { block: BlockInterpretation }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#8f9abb]">
            Block interpretation
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            {block.title}
          </div>
        </div>
        <div className="text-sm text-[#f7d237]">{open ? "Hide" : "Open"}</div>
      </button>

      {open ? (
        <div className="grid gap-4 border-t border-white/8 p-5 md:grid-cols-2">
          <InfoRow title="Сигнал" text={block.signal} />
          <InfoRow title="Интерпретация" text={block.interpretation} />
          <InfoRow title="Связь" text={block.relation} />
          <InfoRow title="Риск" text={block.risk} />
          <InfoRow
            title="Не доказано, требует отдельного исследования"
            text={block.unknown}
          />
          <InfoRow
            title="Промежуточный вывод"
            text={block.conclusion}
            highlight
          />
        </div>
      ) : null}
    </GlassCard>
  );
}

function InfoRow({
  title,
  text,
  highlight,
}: {
  title: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        highlight
          ? "border-[#f7d237]/20 bg-[#f7d237]/7"
          : "border-white/8 bg-white/4",
      )}
    >
      <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-[#dde4f6]">{text}</p>
    </div>
  );
}

function LeverPill({ node }: { node: LeverNode }) {
  const colors: Record<LeverNode["role"], string> = {
    primary: "border-[#f7d237]/35 bg-[#f7d237]/10 text-[#f7d237]",
    amplifies: "border-white/10 bg-white/5 text-white",
    unlocks: "border-white/10 bg-white/5 text-white",
    stabilizes: "border-white/10 bg-white/5 text-white",
    rejected: "border-red-300/20 bg-red-400/10 text-red-200",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-3", colors[node.role])}>
      <div className="text-xs uppercase tracking-[0.18em] opacity-80">
        {node.role}
      </div>
      <div className="mt-2 font-medium">{node.name}</div>
      <div className="mt-1 text-sm opacity-90">{node.zone}</div>
      {node.reason ? (
        <div className="mt-2 text-sm leading-6 opacity-90">{node.reason}</div>
      ) : null}
    </div>
  );
}

function ControlMetricCard({ metric }: { metric: ControlMetric }) {
  const progress = Math.max(
    8,
    Math.min(
      100,
      metric.direction === "up"
        ? (metric.current / metric.target) * 100
        : (metric.target / metric.current) * 100,
    ),
  );

  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            {metric.name}
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            {metric.current}
            {metric.unit || ""}
          </div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#cbd3ea]">
          target {metric.target}
          {metric.unit || ""}
        </div>
      </div>
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-[#f7d237]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 text-sm text-[#cbd3ea]">
        Direction: {metric.direction === "up" ? "increase" : "decrease"}
      </div>
    </GlassCard>
  );
}

function AlertRuleCard({ item }: { item: AlertRule }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-white">{item.label}</div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]",
            item.status === "good" && "bg-emerald-400/10 text-emerald-300",
            item.status === "watch" && "bg-white/8 text-[#d7dcef]",
            item.status === "risk" && "bg-[#f7d237]/10 text-[#f7d237]",
          )}
        >
          {item.status}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#cbd3ea]">{item.logic}</p>
    </GlassCard>
  );
}

function ChapterMenu({
  active,
  onChange,
}: {
  active: ChapterKey;
  onChange: (value: ChapterKey) => void;
}) {
  return (
    <div className="grid gap-4 lg:sticky lg:top-6">
      {CHAPTER_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "group w-full text-left transition",
              isActive ? "scale-[1.01]" : "hover:translate-x-[2px]",
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-[30px] border p-5 shadow-[0_14px_40px_rgba(0,0,0,0.2)] transition",
                isActive
                  ? "border-[#f7d237]/55 bg-[linear-gradient(180deg,#f7d237_0%,#efcb34_100%)] text-[#0b1d3a]"
                  : "border-white/10 bg-[linear-gradient(180deg,rgba(70,104,186,0.9)_0%,rgba(42,74,148,0.9)_100%)] text-white",
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border",
                    isActive
                      ? "border-[#0b1d3a]/10 bg-white/20 text-[#0b1d3a]"
                      : "border-white/10 bg-white/8 text-[#f7d237]",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      "text-[11px] uppercase tracking-[0.26em]",
                      isActive ? "text-[#0b1d3a]/70" : "text-[#c6d0ea]",
                    )}
                  >
                    {tab.eyebrow}
                  </div>

                  <div className="mt-2 text-xl font-medium leading-7">
                    {tab.label}
                  </div>

                  <div
                    className={cn(
                      "mt-3 text-sm leading-6",
                      isActive ? "text-[#0b1d3a]/85" : "text-[#dbe3f8]",
                    )}
                  >
                    {tab.summary}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tab.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]",
                          isActive
                            ? "border-[#0b1d3a]/12 bg-white/25 text-[#0b1d3a]/85"
                            : "border-white/10 bg-white/6 text-[#d7e0f5]",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "mt-1 h-5 w-5 shrink-0 transition",
                    isActive
                      ? "text-[#0b1d3a]"
                      : "text-white/70 group-hover:translate-x-0.5",
                  )}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function RevenueSnapshotResultsPage() {
  const data = mockPayload;
  const [scenario, setScenario] = useState<
    "conservative" | "balanced" | "aggressive"
  >("balanced");
  const [activeChapter, setActiveChapter] =
    useState<ChapterKey>("interpretation");

  const scenarioData = data.management.scenarios[scenario];

  const pieData = useMemo(
    () => [
      { name: "Current", value: 100 - scenarioData.lossReduction },
      { name: "Recovered", value: scenarioData.lossReduction },
    ],
    [scenarioData],
  );

  const renderEconomics = () => (
    <div className="space-y-4">
      <SectionTitle
        eyebrow="Economics"
        title="Unit economics and loss map"
        description="Сухие показатели, расчетные значения и зона прямых потерь."
        icon={Wallet}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Базовые метрики
          </div>
          <div className="mt-4 space-y-3">
            {data.economics.baseKpis.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3"
              >
                <span className="text-sm text-[#d6def2]">{item.label}</span>
                <span className="font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Расчетные метрики
          </div>
          <div className="mt-4 space-y-3">
            {data.economics.calculatedKpis.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3"
              >
                <span className="text-sm text-[#d6def2]">{item.label}</span>
                <span className="font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 lg:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Метрики потерь
          </div>
          <div className="mt-4 space-y-3">
            {data.economics.losses.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[#f7d237]/15 bg-[#f7d237]/6 px-4 py-3"
              >
                <span className="text-sm text-[#f1f3fa]">{item.label}</span>
                <span className="font-medium text-[#f7d237]">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="p-5 xl:col-span-1">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Структура выручки
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <BarChart data={data.economics.revenueWaterfall}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#9aa7c8" fontSize={12} />
                <YAxis stroke="#9aa7c8" fontSize={12} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                  fill="rgba(247,210,55,0.9)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5 xl:col-span-1">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Спрос vs мощность
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <BarChart data={data.economics.demandCapacity} layout="vertical">
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#9aa7c8" fontSize={12} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#9aa7c8"
                  fontSize={12}
                  width={80}
                />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar
                  dataKey="value"
                  radius={[0, 10, 10, 0]}
                  fill="rgba(255,255,255,0.85)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5 xl:col-span-1">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Воронка
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={data.economics.funnel} isAnimationActive>
                  <LabelList
                    position="right"
                    fill="#ffffff"
                    stroke="none"
                    dataKey="name"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderInterpretation = () => (
    <div className="space-y-4">
      <SectionTitle
        eyebrow="Interpretation"
        title="Разбор ответов по блокам"
        description="Не пересказ, а выделение сигнала, причин и ограничений по каждому блоку."
        icon={Layers3}
      />
      <div className="grid gap-4">
        {data.blockInterpretation.map((block) => (
          <InterpretationAccordion key={block.id} block={block} />
        ))}
      </div>
    </div>
  );

  const renderStrategy = () => (
    <div className="space-y-4">
      <SectionTitle
        eyebrow="Strategy"
        title="Стратегия и система рычагов"
        description="Сценарий, механика рычага, карта поддерживающих рычагов и логика системных изменений."
        icon={Target}
      />

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Стратегический сценарий
          </div>
          <div className="mt-4 text-3xl font-semibold text-white">
            {data.strategy.scenario.type}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoRow title="Why this scenario" text={data.strategy.scenario.why} />
            <InfoRow title="Market limits" text={data.strategy.scenario.marketLimits} />
            <InfoRow title="Not now" text={data.strategy.scenario.notNow} highlight />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Карта рычагов
          </div>
          <div className="mt-4 grid gap-3">
            {data.strategy.leverMap.map((node) => (
              <LeverPill key={`${node.role}-${node.name}`} node={node} />
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Механики рычагов
          </div>
          <div className="mt-4 space-y-4">
            {data.strategy.leverMechanics.chain.map((step, index) => (
              <div
                key={`${step.lever}-${index}`}
                className="rounded-3xl border border-white/8 bg-white/4 p-4"
              >
                <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
                  <MechanicBox title="Lever" value={step.lever} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Metric" value={step.metric} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Economics" value={step.economics} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Result" value={step.result} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Cause-effect diagram
          </div>
          <div className="mt-4 h-[320px] w-full">
            <ResponsiveContainer>
              <Sankey
                data={data.strategy.leverMechanics.sankey}
                nodePadding={40}
                margin={{ left: 10, right: 10, top: 20, bottom: 20 }}
                link={{ stroke: "rgba(247,210,55,0.55)" }}
              >
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="p-6 xl:col-span-2">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Implementation logic
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoRow title="What changes" text={data.strategy.implementationLogic.change} />
            <InfoRow
              title="Application point"
              text={data.strategy.implementationLogic.applicationPoint}
            />
            <InfoRow
              title="Must appear in system"
              text={data.strategy.implementationLogic.systemMustAppear}
              highlight
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Time horizon
          </div>
          <div className="mt-4 space-y-3">
            {data.strategy.timeHorizon.map((step) => (
              <div
                key={step.horizon}
                className="rounded-2xl border border-white/8 bg-white/4 p-4"
              >
                <div className="flex items-center gap-2 text-[#f7d237]">
                  <Clock3 className="h-4 w-4" />
                  <div className="text-xs uppercase tracking-[0.18em]">
                    {step.horizon}
                  </div>
                </div>
                <div className="mt-3 text-base font-medium text-white">
                  {step.title}
                </div>
                <div className="mt-2 text-sm leading-6 text-[#cfd7ee]">
                  {step.text}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Dependencies
          </div>
          <div className="mt-4 h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={data.strategy.dependencies} layout="vertical">
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="#9aa7c8"
                  fontSize={12}
                  domain={[0, 100]}
                />
                <YAxis
                  dataKey="label"
                  type="category"
                  stroke="#9aa7c8"
                  fontSize={12}
                  width={120}
                />
                <Tooltip />
                <Bar
                  dataKey="score"
                  radius={[0, 10, 10, 0]}
                  fill="rgba(247,210,55,0.9)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Risks
          </div>
          <div className="mt-4 space-y-4">
            <InfoRow title="Main risk" text={data.strategy.risks.mainRisk} />
            <InfoRow
              title="Fail condition"
              text={data.strategy.risks.failCondition}
              highlight
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Expected economic shift
          </div>
          <div className="mt-4 space-y-4">
            <InfoRow title="Decreases" text={data.strategy.expectedShift.decreases} />
            <InfoRow title="Grows" text={data.strategy.expectedShift.grows} />
            <InfoRow title="Key metric" text={data.strategy.expectedShift.keyMetric} highlight />
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Strategic priority
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <PriorityColumn
              title="Primary"
              items={[data.strategy.strategicPriority.primary]}
              accent
            />
            <PriorityColumn
              title="Secondary"
              items={data.strategy.strategicPriority.secondary}
            />
            <PriorityColumn
              title="Do not do now"
              items={data.strategy.strategicPriority.forbiddenNow}
              warning
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Rejected levers
          </div>
          <div className="mt-4 space-y-3">
            {data.strategy.rejectedLevers.map((node) => (
              <LeverPill key={node.name} node={node} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-4">
      <SectionTitle
        eyebrow="Management"
        title="Control panel and strategy management tools"
        description="Инструменты управления выбранным рычагом: контрольные метрики, сценарии и триггеры отклонения."
        icon={Settings2}
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
                Scenario switcher
              </div>
              <div className="mt-2 text-2xl font-semibold">{scenario}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["conservative", "balanced", "aggressive"] as const).map(
                (key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenario(key)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      scenario === key
                        ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#f7d237]"
                        : "border-white/10 bg-white/5 text-[#d5daeb] hover:bg-white/8",
                    )}
                  >
                    {key}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ScenarioMetric title="Revenue" value={scenarioData.revenue} prefix="€" />
            <ScenarioMetric title="Profit" value={scenarioData.profit} prefix="€" />
            <ScenarioMetric
              title="Loss Reduction"
              value={scenarioData.lossReduction}
              suffix="%"
            />
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <AreaChart data={data.economics.economicsShift}>
                  <CartesianGrid
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                  />
                  <XAxis dataKey="name" stroke="#9aa7c8" fontSize={12} />
                  <YAxis stroke="#9aa7c8" fontSize={12} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="before"
                    stroke="rgba(255,255,255,0.9)"
                    fill="rgba(255,255,255,0.12)"
                  />
                  <Area
                    type="monotone"
                    dataKey="after"
                    stroke="rgba(247,210,55,0.95)"
                    fill="rgba(247,210,55,0.22)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    stroke="none"
                  >
                    <Cell fill="rgba(255,255,255,0.14)" />
                    <Cell fill="rgba(247,210,55,0.92)" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-4">
          {data.management.controlMetrics.map((metric) => (
            <ControlMetricCard key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {data.management.alertRules.map((item) => (
          <AlertRuleCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b1d3a] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,118,187,0.22),transparent_32%),linear-gradient(180deg,rgba(4,16,38,0)_0%,rgba(4,16,38,0.12)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.8)_0.6px,transparent_0.6px)] [background-size:12px_12px]" />
        <div className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[-8rem] top-[10rem] h-[22rem] w-[22rem] rounded-full bg-[#f7d237]/10 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[-6rem] h-[20rem] w-[20rem] rounded-full bg-[#3f63bd]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-8">
          <GlassCard className="overflow-hidden p-6 md:p-8">
            <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#a5aec8]">
                  <span>Revenue Snapshot</span>
                  <span className="h-1 w-1 rounded-full bg-[#f7d237]" />
                  <span>{data.company.name}</span>
                  <span className="h-1 w-1 rounded-full bg-[#f7d237]" />
                  <span>{data.company.niche}</span>
                  <span className="h-1 w-1 rounded-full bg-[#f7d237]" />
                  <span>{data.company.country}</span>
                </div>

                <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  Рост ограничен узким местом в конверсии, а не отсутствием спроса.
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-7 text-[#d7def2] md:text-lg">
                  {data.hero.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {data.hero.tags.map((tag) => (
                    <Tag key={tag.label} tag={tag} />
                  ))}
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {data.economics.headlineKpis.map((item) => (
                    <MetricCard key={item.label} item={item} />
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <GlassCard className="p-5">
                  <div className="flex items-center gap-3 text-[#f7d237]">
                    <Lock className="h-5 w-5" />
                    <div className="text-xs uppercase tracking-[0.22em]">
                      Growth Limit
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-semibold">
                    {data.hero.growthLimit.type}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#d7def2]">
                    <span className="font-medium text-white">Bottleneck:</span>{" "}
                    {data.hero.growthLimit.bottleneck}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#c9d0e4]">
                    {data.hero.growthLimit.why}
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="flex items-center gap-3 text-[#f7d237]">
                    <Sparkles className="h-5 w-5" />
                    <div className="text-xs uppercase tracking-[0.22em]">
                      Primary Lever
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-semibold">
                    {data.hero.primaryLever.name}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#d7def2]">
                    {data.hero.primaryLever.essence}
                  </div>
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#cfd6ea]">
                    Zone: {data.hero.primaryLever.zone}
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="flex items-center gap-3 text-[#f7d237]">
                    <Globe2 className="h-5 w-5" />
                    <div className="text-xs uppercase tracking-[0.22em] text-[#8f9abb]">
                      Market adjustment
                    </div>
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#d7def2]">
                    {data.company.marketTakeaway}
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mb-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.quickFacts.map((item) => (
              <QuickFactCard key={item.label} item={item} />
            ))}
          </div>
        </section>

        <section className="mb-14">
          <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
            <ChapterMenu active={activeChapter} onChange={setActiveChapter} />

            <div className="min-w-0">
              {activeChapter === "economics" && renderEconomics()}
              {activeChapter === "interpretation" && renderInterpretation()}
              {activeChapter === "strategy" && renderStrategy()}
              {activeChapter === "management" && renderManagement()}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle
            eyebrow="Trust layer"
            title="What is not the core problem"
            description="Что модель не считает главным источником текущих потерь."
            icon={CircleOff}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {data.notAProblem.map((item) => (
              <GlassCard key={item} className="p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#f7d237]" />
                  <p className="text-base leading-8 text-[#d7def2]">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function MechanicBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#8f9abb]">
        {title}
      </div>
      <div className="mt-2 text-sm font-medium leading-6 text-white">
        {value}
      </div>
    </div>
  );
}

function PriorityColumn({
  title,
  items,
  accent,
  warning,
}: {
  title: string;
  items: string[];
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-5",
        accent && "border-[#f7d237]/20 bg-[#f7d237]/8",
        warning && "border-red-300/15 bg-red-400/8",
        !accent && !warning && "border-white/8 bg-white/4",
      )}
    >
      <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
        {title}
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenarioMetric({
  title,
  value,
  prefix,
  suffix,
}: {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
        {title}
      </div>
      <div className="mt-3 text-3xl font-semibold text-white">
        {prefix || ""}
        {formatCompact(value)}
        {suffix || ""}
      </div>
    </div>
  );
}
