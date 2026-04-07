"use client";

import {
  ResponsiveContainer,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

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
    label: "Юнит-экономика и карта потерь",
    eyebrow: "Глава 1",
    summary: "База, расчетные метрики и прямые потери.",
    tags: ["Выручка", "Маржа", "Потери"],
    icon: Wallet,
  },
  {
    key: "interpretation",
    label: "Разбор ответов по блокам",
    eyebrow: "Глава 2",
    summary: "Сигналы, ограничения и связь между блоками.",
    tags: ["Сигналы", "Риски", "Связи"],
    icon: Layers3,
  },
  {
    key: "strategy",
    label: "Стратегия и система рычагов",
    eyebrow: "Глава 3",
    summary: "Сценарий, механика рычага и приоритет действий.",
    tags: ["Главный рычаг", "Сценарий", "План"],
    icon: Target,
  },
  {
    key: "management",
    label: "Панель контроля и управления стратегией",
    eyebrow: "Глава 4",
    summary: "Контрольные метрики, сценарии и триггеры.",
    tags: ["Контроль", "Сценарии", "Сигналы"],
    icon: Settings2,
  },
];

const mockPayload: ResultsPayload = {
  company: {
    name: "Northwave Studio",
    niche: "DTC / дизайнерская одежда",
    stage: "Развивающийся",
    country: "Италия",
    marketTakeaway:
      "Спрос чувствителен к доверию и качеству продукта, но рынок конкурентный, а рост без усиления конверсии и структуры будет неустойчивым.",
  },
  hero: {
    summary:
      "Основная потеря бизнеса связана не с отсутствием спроса, а с потерями на переходе от интереса к покупке. При текущей структуре команда обрабатывает поток неравномерно, а продуктовая подача и продажа не превращают уже существующий интерес в стабильную выручку.",
    tags: [
      { label: "#ПотериКонверсии", tone: "warning" },
      { label: "#УзкоеМестоПродаж", tone: "warning" },
      { label: "#ВысокаяКонкуренция", tone: "neutral" },
      { label: "#СпросЧерезДоверие", tone: "neutral" },
      { label: "#ПерегрузУправления", tone: "warning" },
      { label: "#СреднеПремиальныйСегмент", tone: "good" },
    ],
    growthLimit: {
      type: "Конверсия / воронка",
      bottleneck: "Низкая конверсия из интереса в оплату",
      why: "Экономика показывает высокий Lost Revenue на этапе сделки, рынок усиливает роль доверия и понятности выбора, а rules поддерживают lever в зоне conversion и structure.",
    },
    primaryLever: {
      name: "Пересборка системы конверсии",
      essence:
        "Пересборка логики входа в продукт, выбора оффера и прохождения клиента по CJM.",
      zone: "конверсия",
    },
  },
  economics: {
    headlineKpis: [
      { label: "Выручка", value: "€42,000", sub: "за прошлый месяц", kind: "base" },
      { label: "Прибыль", value: "€8,400", sub: "оценочно", kind: "base" },
      { label: "Маржа", value: "20%", sub: "после расходов", kind: "base" },
      { label: "Клиенты", value: "56", sub: "в месяц", kind: "base" },
      {
        label: "Средний чек",
        value: "€750",
        sub: "расчетно",
        kind: "calculated",
      },
      {
        label: "Загрузка",
        value: "78%",
        sub: "команда / операции",
        kind: "calculated",
      },
    ],
    baseKpis: [
      { label: "Выручка", value: "€42,000" },
      { label: "Прибыль", value: "€8,400" },
      { label: "Маржа %", value: "20%" },
      { label: "Клиенты", value: "56" },
      { label: "Лиды", value: "190" },
    ],
    calculatedKpis: [
      { label: "Средний чек", value: "€750" },
      { label: "Лид → продажа", value: "29.5%" },
      { label: "Валовая прибыль", value: "€8,400" },
      { label: "Спрос / мощность", value: "190 / 150" },
      { label: "Разрыв мощности", value: "26.7%" },
    ],
    losses: [
      { label: "Потерянная выручка", value: "€12,500", kind: "loss" },
      { label: "Потерянная прибыль", value: "€2,500", kind: "loss" },
      { label: "Потери конверсии", value: "18%", kind: "loss" },
      { label: "Потери мощности", value: "7%", kind: "loss" },
    ],
    revenueWaterfall: [
      { name: "Фактическая выручка", value: 42000 },
      { name: "Потерянная выручка", value: 12500 },
      { name: "Потенциальная выручка", value: 54500 },
    ],
    demandCapacity: [
      { name: "Спрос", value: 190 },
      { name: "Мощность", value: 150 },
    ],
    funnel: [
      { name: "Лиды", value: 190 },
      { name: "Квалифицированные", value: 128 },
      { name: "Предложения", value: 79 },
      { name: "Продажи", value: 56 },
    ],
    economicsShift: [
      { name: "Выручка", before: 42000, after: 49800 },
      { name: "Прибыль", before: 8400, after: 11700 },
      { name: "Конверсия", before: 29.5, after: 35.2 },
    ],
  },
  quickFacts: [
    {
      label: "Тип потери",
      value: "Конверсия",
      note: "главная потеря денег сейчас",
      icon: "Target",
    },
    {
      label: "Узкое место",
      value: "Этап сделки",
      note: "интерес не превращается в оплату",
      icon: "Gauge",
    },
    {
      label: "Сигнал рынка",
      value: "Доверие + конкуренция",
      note: "рынок требует ясного и убедительного выбора",
      icon: "Radar",
    },
    {
      label: "Риск модели",
      value: "Перегруз руководителя",
      note: "управление завязано на одном центре решений",
      icon: "Briefcase",
    },
  ],
  blockInterpretation: [
    {
      id: "positioning",
      title: "ПОЗИЦИОНИРОВАНИЕ",
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
      title: "ЭКОНОМИКА",
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
      title: "КЛИЕНТЫ И ПОТОК",
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
      title: "ПРОДУКТ И ПРОДАЖИ",
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
      title: "АНАЛИТИКА И УПРАВЛЕНИЕ",
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
      title: "СТРУКТУРА И ПРОЦЕССЫ",
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
      title: "СТРАТЕГИЯ",
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
      type: "Конверсионный",
      why:
        "Экономика показывает основной Lost Revenue в воронке, рынок требует большей понятности и доверия, rules поддерживают lever в зоне conversion и structure, а не expansion.",
      marketLimits:
        "Высокая конкуренция и чувствительность к качеству выбора ограничивают эффективность простого увеличения трафика.",
      notNow:
        "Не имеет смысла aggressively scale acquisition до пересборки логики оффера и продажи.",
    },
    leverMap: [
      {
        name: "Пересборка системы конверсии",
        role: "primary",
        zone: "конверсия",
      },
      {
        name: "Архитектура оффера",
        role: "amplifies",
        zone: "конверсия",
      },
      {
        name: "Формализация продаж",
        role: "unlocks",
        zone: "структура",
      },
      {
        name: "Аналитика решений",
        role: "stabilizes",
        zone: "аналитика",
      },
    ],
    leverMechanics: {
      chain: [
        {
          lever: "Rebuild of conversion system",
          metric: "Конверсия лид → продажа",
          economics: "Снижается потерянная выручка",
          result: "Выручка растет без пропорционального роста CAC",
        },
        {
          lever: "Архитектура оффера",
          metric: "Доля принятых офферов",
          economics: "Растет монетизация каждого лида",
          result: "Повышается прибыльность текущего потока",
        },
        {
          lever: "Формализация продаж",
          metric: "Скорость / стабильность обработки",
          economics: "Снижаются потери мощности",
          result: "Большая часть спроса превращается в платящих клиентов",
        },
      ],
      sankey: {
        nodes: [
          { name: "Главный рычаг" },
          { name: "Конверсия" },
          { name: "Потерянная выручка" },
          { name: "Выручка" },
          { name: "Прибыль" },
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
        title: "Быстрый эффект",
        text:
          "Снижение потерь в воронке и рост конверсии за счет пересборки сценария выбора и продажи.",
      },
      {
        horizon: "3–6 months",
        title: "Системный эффект",
        text:
          "Закрепление процесса, снижение зависимости от ручного управления и рост воспроизводимой выручки.",
      },
    ],
    dependencies: [
      { label: "Готовность команды", score: 68 },
      { label: "Прозрачность аналитики", score: 52 },
      { label: "Ясность оффера", score: 61 },
      { label: "Операционная дисциплина", score: 57 },
    ],
    risks: {
      mainRisk:
        "Попытка усилить трафик до пересборки системы продажи приведет к росту хаоса, а не к росту прибыли.",
      failCondition:
        "Lever не сработает, если не будет зафиксирована единая логика предложения и контроль по этапам воронки.",
    },
    expectedShift: {
      decreases: "Потери конверсии и часть потерь мощности",
      grows: "Выручка, прибыль и предсказуемость монетизации",
      keyMetric: "Конверсия лид → продажа",
    },
    strategicPriority: {
      primary: "Пересборка системы конверсии",
      secondary: [
        "Архитектура оффера",
        "Формализация продаж",
        "Аналитика решений",
      ],
      forbiddenNow: [
        "Агрессивное масштабирование трафика",
        "Выход на новые рынки",
        "Широкое расширение продуктовой линейки",
      ],
    },
    rejectedLevers: [
      {
        name: "Масштабирование CAC",
        role: "rejected",
        zone: "маркетинг",
        reason:
          "Не влияет на корневой bottleneck и усиливает потери при текущей конверсионной системе.",
      },
      {
        name: "Сценарий через удержание",
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
        name: "Принятие оффера",
        current: 61,
        target: 70,
        unit: "%",
        direction: "up",
      },
      {
        name: "Скорость обработки",
        current: 4.4,
        target: 3.1,
        unit: "дн.",
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
        label: "Конверсия ниже порога",
        status: "risk",
        logic:
          "Если конверсия лид → продажа держится ниже 30% две недели, проверьте квалификацию и этап оффера.",
      },
      {
        label: "Скорость обработки в целевом диапазоне",
        status: "watch",
        logic:
          "Если среднее время обработки выше 4 дней, растет риск потерь мощности.",
      },
      {
        label: "Принятие оффера растет",
        status: "good",
        logic:
          "Если принятие оффера выше 68%, сценарий движется к плановой экономике.",
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
    return `${new Intl.NumberFormat("ru-RU", {
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
        "rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(39,70,132,0.22)_0%,rgba(11,33,74,0.62)_45%,rgba(5,23,55,0.96)_100%)] shadow-[0_20px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
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
        <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-[22px] border border-[#f7d237]/20 bg-[#f7d237]/8 text-[#f7d237] shadow-[0_10px_30px_rgba(247,210,55,0.08)]">
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
            Разбор блока
          </div>
          <div className="mt-2 text-lg font-semibold text-white">
            {block.title}
          </div>
        </div>
        <div className="text-sm text-[#f7d237]">{open ? "Скрыть" : "Открыть"}</div>
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

  const roleLabel: Record<LeverNode["role"], string> = {
    primary: "основной",
    amplifies: "усиливает",
    unlocks: "разблокирует",
    stabilizes: "стабилизирует",
    rejected: "отклонено",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-3", colors[node.role])}>
      <div className="text-xs uppercase tracking-[0.18em] opacity-80">
        {roleLabel[node.role]}
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
          цель {metric.target}
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
        Направление: {metric.direction === "up" ? "рост" : "снижение"}
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

function ChapterCarousel({
  active,
  onChange,
}: {
  active: ChapterKey;
  onChange: (value: ChapterKey) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollTrack("left")}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Назад"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => scrollTrack("right")}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Вперед"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CHAPTER_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className="min-w-[320px] max-w-[320px] flex-shrink-0 snap-start text-left"
            >
              <div
                className={cn(
                  "h-full rounded-[34px] border p-8 transition",
                  isActive
                    ? "border-[#f7d237]/55 bg-[linear-gradient(180deg,#f7d237_0%,#efcb34_100%)] text-[#0b1d3a] shadow-[0_18px_50px_rgba(247,210,55,0.22)]"
                    : "border-white/10 bg-[linear-gradient(180deg,rgba(70,104,186,0.88)_0%,rgba(42,74,148,0.88)_100%)] text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-[24px] border",
                      isActive
                        ? "border-[#0b1d3a]/12 bg-white/20 text-[#0b1d3a]"
                        : "border-white/10 bg-white/8 text-[#f7d237]",
                    )}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  <ChevronRight
                    className={cn(
                      "mt-1 h-8 w-8 shrink-0",
                      isActive ? "text-[#0b1d3a]" : "text-white/70",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "mt-6 text-[11px] uppercase tracking-[0.3em]",
                    isActive ? "text-[#0b1d3a]/70" : "text-[#c6d0ea]",
                  )}
                >
                  {tab.eyebrow}
                </div>

                <div className="mt-3 text-[28px] font-medium leading-[1.25]">
                  {tab.label}
                </div>

                <div
                  className={cn(
                    "mt-8 text-[18px] leading-8",
                    isActive ? "text-[#0b1d3a]/85" : "text-[#dbe3f8]",
                  )}
                >
                  {tab.summary}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {tab.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border px-5 py-2 text-[11px] uppercase tracking-[0.18em]",
                        isActive
                          ? "border-[#0b1d3a]/12 bg-white/20 text-[#0b1d3a]/85"
                          : "border-white/10 bg-white/6 text-[#d7e0f5]",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
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
      { name: "Текущая зона", value: 100 - scenarioData.lossReduction },
      { name: "Возвращено", value: scenarioData.lossReduction },
    ],
    [scenarioData],
  );

  const renderEconomics = () => (
    <div className="space-y-4">
      <SectionTitle
        eyebrow="ЭКОНОМИКА"
        title="Юнит-экономика и карта потерь"
        description="Сухие показатели, расчетные значения и зона прямых потерь."
        icon={Wallet}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="p-5 lg:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            БАЗОВЫЕ МЕТРИКИ
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
            РАСЧЕТНЫЕ МЕТРИКИ
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
            МЕТРИКИ ПОТЕРЬ
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

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1.15fr]">
        <div className="grid gap-4">
          <GlassCard className="p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
              СТРУКТУРА ВЫРУЧКИ
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer>
                <BarChart
                  data={data.economics.revenueWaterfall}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
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
                    width={130}
                  />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar
                    dataKey="value"
                    radius={[0, 10, 10, 0]}
                    fill="rgba(247,210,55,0.9)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
              СПРОС VS МОЩНОСТЬ
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer>
                <BarChart
                  data={data.economics.demandCapacity}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
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
                    width={120}
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
        </div>

        <GlassCard className="p-5 xl:col-span-1">
          <div className="mb-4 text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            ВОРОНКА
          </div>
          <div className="h-[584px] w-full">
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
        eyebrow="ИНТЕРПРЕТАЦИЯ"
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
        eyebrow="СТРАТЕГИЯ"
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
            <InfoRow title="Почему этот сценарий" text={data.strategy.scenario.why} />
            <InfoRow title="Ограничения рынка" text={data.strategy.scenario.marketLimits} />
            <InfoRow title="Не сейчас" text={data.strategy.scenario.notNow} highlight />
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
                  <MechanicBox title="Рычаг" value={step.lever} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Метрика" value={step.metric} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Экономика" value={step.economics} />
                  <ArrowRight className="mx-auto h-4 w-4 text-[#f7d237]" />
                  <MechanicBox title="Результат" value={step.result} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Причинно-следственная схема
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
            Логика внедрения
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoRow title="Что меняется" text={data.strategy.implementationLogic.change} />
            <InfoRow
              title="Точка приложения"
              text={data.strategy.implementationLogic.applicationPoint}
            />
            <InfoRow
              title="Что должно появиться в системе"
              text={data.strategy.implementationLogic.systemMustAppear}
              highlight
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Горизонт реализации
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
            Зависимости
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
            Риски
          </div>
          <div className="mt-4 space-y-4">
            <InfoRow title="Главный риск" text={data.strategy.risks.mainRisk} />
            <InfoRow
              title="Условие сбоя"
              text={data.strategy.risks.failCondition}
              highlight
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 xl:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Ожидаемый экономический сдвиг
          </div>
          <div className="mt-4 space-y-4">
            <InfoRow title="Снижается" text={data.strategy.expectedShift.decreases} />
            <InfoRow title="Растет" text={data.strategy.expectedShift.grows} />
            <InfoRow title="Ключевая метрика" text={data.strategy.expectedShift.keyMetric} highlight />
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Стратегический приоритет
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <PriorityColumn
              title="Основное"
              items={[data.strategy.strategicPriority.primary]}
              accent
            />
            <PriorityColumn
              title="Следом"
              items={data.strategy.strategicPriority.secondary}
            />
            <PriorityColumn
              title="Не делать сейчас"
              items={data.strategy.strategicPriority.forbiddenNow}
              warning
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
            Отклоненные рычаги
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
        eyebrow="УПРАВЛЕНИЕ"
        title="Панель контроля и управления стратегией"
        description="Инструменты управления выбранным рычагом: контрольные метрики, сценарии и триггеры отклонения."
        icon={Settings2}
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[#8f9abb]">
                Переключатель сценария
              </div>
              <div className="mt-2 text-2xl font-semibold">{scenario === "conservative" ? "консервативный" : scenario === "balanced" ? "сбалансированный" : "агрессивный"}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["conservative", "balanced", "aggressive"] as const).map(
                (key) => (
                  <button
                    key={key === "conservative" ? "консервативный" : key === "balanced" ? "сбалансированный" : "агрессивный"}
                    type="button"
                    onClick={() => setScenario(key)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition",
                      scenario === key
                        ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#f7d237]"
                        : "border-white/10 bg-white/5 text-[#d5daeb] hover:bg-white/8",
                    )}
                  >
                    {key === "conservative" ? "консервативный" : key === "balanced" ? "сбалансированный" : "агрессивный"}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ScenarioMetric title="Выручка" value={scenarioData.revenue} prefix="€" />
            <ScenarioMetric title="Прибыль" value={scenarioData.profit} prefix="€" />
            <ScenarioMetric
              title="Снижение потерь"
              value={scenarioData.lossReduction}
              suffix="%"
            />
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <BarChart
                  data={data.economics.economicsShift}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                >
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
                    width={90}
                  />
                  <Tooltip />
                  <Bar dataKey="before" fill="rgba(255,255,255,0.24)" radius={[0, 10, 10, 0]} />
                  <Bar dataKey="after" fill="rgba(247,210,55,0.92)" radius={[0, 10, 10, 0]} />
                </BarChart>
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
    <>
      <main className="results-shell min-h-screen overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,124,194,0.18),transparent_28%),radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_22%),linear-gradient(180deg,rgba(4,16,38,0)_0%,rgba(4,16,38,0.18)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
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
                      Ограничение роста
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-semibold">
                    {data.hero.growthLimit.type}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#d7def2]">
                    <span className="font-medium text-white">Узкое место:</span>{" "}
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
                      Главный рычаг
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-semibold">
                    {data.hero.primaryLever.name}
                  </div>
                  <div className="mt-3 text-sm leading-6 text-[#d7def2]">
                    {data.hero.primaryLever.essence}
                  </div>
                  <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#cfd6ea]">
                    Зона: {data.hero.primaryLever.zone}
                  </div>
                </GlassCard>

                <GlassCard className="p-5">
                  <div className="flex items-center gap-3 text-[#f7d237]">
                    <Globe2 className="h-5 w-5" />
                    <div className="text-xs uppercase tracking-[0.22em] text-[#8f9abb]">
                      Корректировка по рынку
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
          <ChapterCarousel active={activeChapter} onChange={setActiveChapter} />

          <div className="min-w-0">
            {activeChapter === "economics" && renderEconomics()}
            {activeChapter === "interpretation" && renderInterpretation()}
            {activeChapter === "strategy" && renderStrategy()}
            {activeChapter === "management" && renderManagement()}
          </div>
        </section>

        <section className="mb-8">
          <SectionTitle
            eyebrow="Слой доверия"
            title="Что не является корневой проблемой"
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

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body {
          background: #0a1526;
          color: #fefefe;
        }
        .results-shell {
          position: relative;
          min-height: 100vh;
          background:
            radial-gradient(circle at 18% 16%, rgba(112,134,255,0.14), transparent 24%),
            radial-gradient(circle at 84% 14%, rgba(255,255,255,0.05), transparent 18%),
            radial-gradient(circle at 72% 72%, rgba(135,97,255,0.08), transparent 20%),
            linear-gradient(130deg, #0a1526 0%, #0c1830 36%, #0a1526 68%, #121f39 100%);
        }
        .results-shell::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(circle at 20% 22%, rgba(80,127,255,0.12), transparent 26%),
            radial-gradient(circle at 82% 18%, rgba(247,210,55,0.08), transparent 22%),
            radial-gradient(circle at 62% 70%, rgba(135,97,255,0.07), transparent 22%);
          filter: blur(6px);
        }
      `}</style>
    </>
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
