"use client";

import { useMemo, useState } from "react";

type InputType =
  | "rangePercent"
  | "text"
  | "tags"
  | "dualRange"
  | "tripleMargin"
  | "cjm"
  | "seasonality"
  | "map"
  | "teamRoles"
  | "departmentRelations"
  | "stressRange"
  | "analyticsBranch"
  | "strategyGoal"
  | "contact"
  | "channelDistribution";

type Question = {
  id: string;
  label: string;
  type: InputType;
  hint?: string;
};

type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  questions: Question[];
};

type Answers = Record<string, any>;

type SeasonalityRange = {
  id: string;
  start: number;
  end: number;
  reason: string;
};

type TeamMember = {
  id: string;
  position: string;
  responsibility: string;
  isDecisionMaker: "" | "ЛПР" | "Не ЛПР";
  participatesIn: string[];
};

type DepartmentItem = {
  id: string;
  name: string;
  isDefault: boolean;
};

type DepartmentRelation = {
  id: string;
  fromId: string;
  toId: string;
  status: "" | "red" | "yellow" | "green";
};

const BRAND = {
  yellow: "#f7d237",
};

const KPI_TAGS = [
  "Выручка",
  "Маржа",
  "ROMI",
  "CAC",
  "LTV",
  "Средний чек",
  "Конверсия в продажу",
  "Retention",
  "NPS",
  "Скорость сделки",
  "Загрузка команды",
  "Cash Flow",
];

const FLOW_TAGS = [
  "Instagram",
  "Meta Ads",
  "Google Ads",
  "SEO",
  "Рефералы",
  "Партнёрства",
  "Холодный outreach",
  "Telegram",
  "YouTube",
  "Marketplace",
];

const RETENTION_TAGS = [
  "Повторные продажи",
  "Подписка",
  "Комьюнити",
  "Email nurturing",
  "Личный менеджер",
  "Апсейлы",
  "Пакеты услуг",
  "Реферальная программа",
];

const ANALYTICS_TAGS = [
  "Рынок",
  "Ниша",
  "Сегменты",
  "Каналы",
  "Продажи",
  "Юнит-экономика",
  "Retention",
  "Команда",
];

const TEAM_PARTICIPATION_TAGS = [
  "Маркетинг",
  "Продажи",
  "Операционка",
  "Разработка стратегии",
  "Финансы",
  "Кадры",
  "Продукт",
  "Сервис",
  "Партнёрства",
  "Аналитика",
];

const MONTHS = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

const CJM_STAGES = [
  "Acquisition",
  "Activation",
  "Value Realization",
  "Conversion",
  "Retention",
] as const;

const CJM_STAGE_DESCRIPTIONS: Record<(typeof CJM_STAGES)[number], string> = {
  Acquisition: "Первый контакт клиента с вами",
  Activation: "Момент, когда клиент начинает взаимодействие (первое действие)",
  "Value Realization": "Когда клиент понимает ценность вашего продукта",
  Conversion: "Этап оплаты или принятия решения о покупке",
  Retention: "Повторное взаимодействие или продолжение работы с вами",
};

const STRESS_ZONES = ["Маркетинг", "Продажи", "Операционка", "Управление"];

const chapters: Chapter[] = [
  {
    id: "economics",
    title: "Экономика",
    subtitle: "Маржа, выручка, объём, KPI",
    icon: "◔",
    questions: [
      {
        id: "margin",
        label: "Какая часть выручки остаётся после всех расходов?",
        type: "rangePercent",
      },
      {
        id: "salesCount",
        label: "Сколько клиентов или продаж у вас было за прошлый месяц?",
        type: "text",
      },
      {
        id: "revenue",
        label: "Какая выручка была у вас за прошлый месяц?",
        type: "text",
      },
      {
        id: "kpis",
        label: "Какие ключевые метрики, показатели и KPI вы регулярно отслеживаете?",
        type: "tags",
      },
    ],
  },
  {
    id: "flow",
    title: "Клиенты и поток",
    subtitle: "Сегмент, спрос, capacity, каналы",
    icon: "◎",
    questions: [
      {
        id: "clientProfile",
        label: "Кто ваши основные клиенты и какой сегмент самый прибыльный?",
        type: "text",
      },
      {
        id: "demandCapacity",
        label: "Сколько обращений вы получаете и сколько реально можете обработать?",
        type: "dualRange",
      },
      {
        id: "acquisitionChannels",
        label: "Откуда к вам обычно приходят клиенты?",
        type: "tags",
      },
      {
        id: "channelEfficiency",
        label: "Как распределяется входящий поток клиентов между выбранными каналами?",
        type: "channelDistribution",
      },
    ],
  },
  {
    id: "product",
    title: "Продукт и продажи",
    subtitle: "Маржинальные продукты, retention, CJM",
    icon: "◈",
    questions: [
      {
        id: "topProducts",
        label: "Какие 1–3 продукта или услуги самые маржинальные?",
        type: "tripleMargin",
      },
      {
        id: "retention",
        label: "Какими механиками вы удерживаете клиентов?",
        type: "tags",
      },
      {
        id: "cjm",
        label: "Как проходит путь клиента от первого обращения до положительного опыта?",
        type: "cjm",
      },
      {
        id: "seasonality",
        label: "Есть ли пики и спады продаж и чем они объясняются?",
        type: "seasonality",
      },
    ],
  },
  {
    id: "positioning",
    title: "Позиционирование",
    subtitle: "Описание бизнеса и география",
    icon: "◌",
    questions: [
      {
        id: "positionText",
        label:
          "Расскажите о вашем бизнесе: чем занимаетесь, как давно работаете и как вас воспринимают клиенты.",
        type: "text",
      },
      {
        id: "geo",
        label: "В каком регионе вы продаёте и где физически находится ваш бизнес?",
        type: "map",
      },
    ],
  },
  {
    id: "structure",
    title: "Структура и процессы",
    subtitle: "Команда, нагрузка, потери эффективности",
    icon: "▣",
    questions: [
      {
        id: "team",
        label: "Как устроена команда: роли, зоны ответственности, перегруз?",
        type: "teamRoles",
      },
      {
        id: "interaction",
        label: "Как выстроено взаимодействие между ролями и что изменилось за год?",
        type: "departmentRelations",
      },
      {
        id: "decisions",
        label:
          "Кто и как принимает решения о внедрении новых решений, подрядчиков или инструментов?",
        type: "text",
      },
      {
        id: "stress",
        label: "Где вы как руководитель сильнее всего ощущаете напряжение или перегруз?",
        type: "stressRange",
      },
      {
        id: "lossZones",
        label: "В каких зонах бизнеса теряется эффективность?",
        type: "stressRange",
      },
    ],
  },
  {
    id: "analytics",
    title: "Аналитика и управление",
    subtitle: "Решения, изменения, data maturity",
    icon: "▤",
    questions: [
      {
        id: "analytics",
        label:
          "Какую аналитику по рынку, нише или сегментам вы используете при принятии решений?",
        type: "analyticsBranch",
      },
      {
        id: "changesNeeded",
        label: "Что сейчас больше всего требует изменений или улучшений в бизнесе?",
        type: "text",
      },
      {
        id: "implemented",
        label: "Какие инструменты, процессы или улучшения вы внедрили за последние 6 месяцев?",
        type: "text",
      },
    ],
  },
  {
    id: "strategy",
    title: "Стратегия",
    subtitle: "Цели, расходы, горизонты 3/6/12",
    icon: "✦",
    questions: [
      {
        id: "goal",
        label: "Какого результата бизнес должен достичь к концу года?",
        type: "strategyGoal",
      },
      {
        id: "horizons",
        label: "Вокруг чего вы строите планы на 3, 6 и 12 месяцев?",
        type: "text",
      },
    ],
  },
  {
    id: "contact",
    title: "Контактный блок",
    subtitle: "Кому отправить отчёт и встречу",
    icon: "✉",
    questions: [
      {
        id: "contacts",
        label: "Кому отправить развёрнутый отчёт и кого пригласить на онлайн-встречу?",
        type: "contact",
      },
    ],
  },
];

function makeId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptyTeamMember(): TeamMember {
  return {
    id: makeId("member"),
    position: "",
    responsibility: "",
    isDecisionMaker: "",
    participatesIn: [],
  };
}

function createDefaultDepartments(): DepartmentItem[] {
  return [
    { id: makeId("dept"), name: "Продажи", isDefault: true },
    { id: makeId("dept"), name: "Маркетинг", isDefault: true },
    { id: makeId("dept"), name: "Разработка", isDefault: true },
  ];
}

function normalizeDepartmentRelations(
  departments: DepartmentItem[],
  currentRelations: DepartmentRelation[]
): DepartmentRelation[] {
  const next: DepartmentRelation[] = [];
  const currentMap = new Map<string, DepartmentRelation>();

  currentRelations.forEach((rel) => {
    currentMap.set(rel.id, rel);
  });

  for (let i = 0; i < departments.length; i += 1) {
    for (let j = i + 1; j < departments.length; j += 1) {
      const fromId = departments[i].id;
      const toId = departments[j].id;
      const id = `${fromId}__${toId}`;
      next.push(
        currentMap.get(id) ?? {
          id,
          fromId,
          toId,
          status: "",
        }
      );
    }
  }

  return next;
}

const initialDepartments = createDefaultDepartments();

const initialAnswers: Answers = {
  margin: { value: 0, note: "" },
  salesCount: "",
  revenue: "",
  kpis: [],
  clientProfile: "",
  demandCapacity: { demand: 0, capacity: 0 },
  acquisitionChannels: [],
  channelEfficiency: {},
  topProducts: [
    { name: "", value: 0 },
    { name: "", value: 0 },
    { name: "", value: 0 },
  ],
  retention: [],
  cjm: {
    stages: CJM_STAGES.map((stage) => ({
      stage,
      description: CJM_STAGE_DESCRIPTIONS[stage],
      whatHappens: "",
      duration: "",
      clientGets: "",
      companyGets: "",
      problems: "",
    })),
  },
  seasonality: {
    peakRanges: [],
    lowRanges: [],
  },
  positionText: "",
  geo: { physical: "", sales: "" },
  team: [createEmptyTeamMember()],
  interaction: {
    departments: initialDepartments,
    relations: normalizeDepartmentRelations(initialDepartments, []),
    note: "",
  },
  decisions: "",
  stress: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
  lossZones: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
  analytics: { hasAnalytics: null, tags: [], note: "" },
  changesNeeded: "",
  implemented: "",
  goal: { profitTarget: 0, mode: "", costChange: "" },
  horizons: "",
  contacts: { reportEmail: "", meetingContact: "" },
};

function isFilled(value: any): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return value > 0;
  if (typeof value === "boolean") return true;

  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    return value.some((item) => isFilled(item));
  }

  if (value && typeof value === "object") {
    if ("value" in value && "note" in value) {
      return Number(value.value) > 0 || String(value.note ?? "").trim().length > 0;
    }

    if ("demand" in value && "capacity" in value) {
      return Number(value.demand) > 0 || Number(value.capacity) > 0;
    }

    if ("reportEmail" in value || "meetingContact" in value) {
      return (
        String(value.reportEmail ?? "").trim().length > 0 &&
        String(value.meetingContact ?? "").trim().length > 0
      );
    }

    if ("physical" in value || "sales" in value) {
      return (
        String(value.physical ?? "").trim().length > 0 &&
        String(value.sales ?? "").trim().length > 0
      );
    }

    if ("hasAnalytics" in value) {
      if (value.hasAnalytics === false) return true;
      if (value.hasAnalytics === true) {
        return (value.tags?.length ?? 0) > 0 || String(value.note ?? "").trim().length > 0;
      }
      return false;
    }

    if ("profitTarget" in value && "mode" in value) {
      return (
        Number(value.profitTarget) > 0 ||
        String(value.mode ?? "").trim().length > 0 ||
        String(value.costChange ?? "").trim().length > 0
      );
    }

    if ("peakRanges" in value && "lowRanges" in value) {
      return (value.peakRanges?.length ?? 0) > 0 || (value.lowRanges?.length ?? 0) > 0;
    }

    if ("departments" in value && "relations" in value && "note" in value) {
      const hasCustomDept = (value.departments ?? []).some(
        (d: DepartmentItem) => !d.isDefault && String(d.name ?? "").trim().length > 0
      );
      const hasRelation = (value.relations ?? []).some((r: DepartmentRelation) => r.status !== "");
      const hasNote = String(value.note ?? "").trim().length > 0;
      return hasCustomDept || hasRelation || hasNote;
    }

    if ("stages" in value && Array.isArray(value.stages)) {
      return value.stages.some(
        (stage: any) =>
          String(stage.whatHappens ?? "").trim().length > 0 ||
          String(stage.duration ?? "").trim().length > 0 ||
          String(stage.clientGets ?? "").trim().length > 0 ||
          String(stage.companyGets ?? "").trim().length > 0 ||
          String(stage.problems ?? "").trim().length > 0
      );
    }

    return Object.values(value).some((v) => isFilled(v));
  }

  return false;
}

function normalizeChannelDistribution(
  selectedChannels: string[],
  currentDistribution: Record<string, number>
) {
  const next: Record<string, number> = {};
  selectedChannels.forEach((channel) => {
    next[channel] = Number(currentDistribution?.[channel] ?? 0);
  });
  return next;
}

function sumDistribution(distribution: Record<string, number>) {
  return Object.values(distribution).reduce((acc, value) => acc + Number(value || 0), 0);
}

function getQuestionProgress(question: Question, answers: Answers): number {
  if (question.id === "channelEfficiency") {
    const selectedChannels: string[] = answers.acquisitionChannels ?? [];
    const distribution = normalizeChannelDistribution(
      selectedChannels,
      answers.channelEfficiency ?? {}
    );
    const total = sumDistribution(distribution);

    if (selectedChannels.length === 0) return 0;
    return total === 100 ? 100 : 0;
  }

  return isFilled(answers[question.id]) ? 100 : 0;
}

function getChapterProgress(chapter: Chapter, answers: Answers): number {
  const total = chapter.questions.length;
  const filled = chapter.questions.filter((q) => getQuestionProgress(q, answers) === 100).length;
  return Math.round((filled / total) * 100);
}

function Ring({ progress, size = 110 }: { progress: number; size?: number }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke={BRAND.yellow}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: "drop-shadow(0 0 10px rgba(247,210,55,0.45))",
            transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-white">{Math.round(progress)}%</div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">filled</div>
      </div>
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow: "0 24px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_26%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function TiltCardButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [style, setStyle] = useState({
    transform:
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
  });

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * 8;
    const rotateX = (0.5 - py) * 8;

    setStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.006)`,
    });
  }

  function reset() {
    setStyle({
      transform:
        "perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
    });
  }

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      className="group block w-full text-left"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function RangeBlock({
  title,
  value,
  min,
  max,
  onChange,
}: {
  title: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-white/60">
        <span>{title}</span>
        <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#f7d237]"
      />
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";
const textareaClass =
  "w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";

function normalizeRange(start: number, end: number) {
  return {
    start: Math.min(start, end),
    end: Math.max(start, end),
  };
}

function createRange(start: number, end: number): SeasonalityRange {
  const normalized = normalizeRange(start, end);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    start: normalized.start,
    end: normalized.end,
    reason: "",
  };
}

function rangeLabel(start: number, end: number) {
  const normalized = normalizeRange(start, end);
  if (normalized.start === normalized.end) return MONTHS[normalized.start];
  return `${MONTHS[normalized.start]} — ${MONTHS[normalized.end]}`;
}

function monthIsInsideRanges(monthIndex: number, ranges: SeasonalityRange[]) {
  return ranges.some((range) => monthIndex >= range.start && monthIndex <= range.end);
}

function removeOverlappingRanges(ranges: SeasonalityRange[], start: number, end: number) {
  const normalized = normalizeRange(start, end);
  return ranges.filter((range) => range.end < normalized.start || range.start > normalized.end);
}

function SeasonalityCalendar({
  value,
  onChange,
}: {
  value: {
    peakRanges: SeasonalityRange[];
    lowRanges: SeasonalityRange[];
  };
  onChange: (next: { peakRanges: SeasonalityRange[]; lowRanges: SeasonalityRange[] }) => void;
}) {
  const [activeMode, setActiveMode] = useState<"peak" | "low">("peak");
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragCurrent, setDragCurrent] = useState<number | null>(null);

  const peakRanges = value?.peakRanges ?? [];
  const lowRanges = value?.lowRanges ?? [];

  function finishSelection(endIndex: number) {
    if (dragStart === null) return;

    const nextRange = createRange(dragStart, endIndex);

    if (activeMode === "peak") {
      const cleanedPeak = removeOverlappingRanges(peakRanges, nextRange.start, nextRange.end);
      const cleanedLow = removeOverlappingRanges(lowRanges, nextRange.start, nextRange.end);

      onChange({
        peakRanges: [...cleanedPeak, nextRange].sort((a, b) => a.start - b.start),
        lowRanges: cleanedLow.sort((a, b) => a.start - b.start),
      });
    } else {
      const cleanedPeak = removeOverlappingRanges(peakRanges, nextRange.start, nextRange.end);
      const cleanedLow = removeOverlappingRanges(lowRanges, nextRange.start, nextRange.end);

      onChange({
        peakRanges: cleanedPeak.sort((a, b) => a.start - b.start),
        lowRanges: [...cleanedLow, nextRange].sort((a, b) => a.start - b.start),
      });
    }

    setDragging(false);
    setDragStart(null);
    setDragCurrent(null);
  }

  function monthIsPreviewed(index: number) {
    if (!dragging || dragStart === null || dragCurrent === null) return false;
    const normalized = normalizeRange(dragStart, dragCurrent);
    return index >= normalized.start && index <= normalized.end;
  }

  function monthClass(index: number) {
    const inPeak = monthIsInsideRanges(index, peakRanges);
    const inLow = monthIsInsideRanges(index, lowRanges);
    const preview = monthIsPreviewed(index);

    if (preview && activeMode === "peak") {
      return "border-emerald-300/40 bg-emerald-400/18 text-emerald-100 shadow-[0_0_22px_rgba(74,222,128,0.28)]";
    }

    if (preview && activeMode === "low") {
      return "border-[#f7d237]/40 bg-[#f7d237]/16 text-[#fff3b2] shadow-[0_0_22px_rgba(247,210,55,0.24)]";
    }

    if (inPeak) {
      return "border-emerald-300/35 bg-emerald-400/14 text-emerald-100 shadow-[0_0_18px_rgba(74,222,128,0.18)]";
    }

    if (inLow) {
      return "border-[#f7d237]/35 bg-[#f7d237]/14 text-[#fff3b2] shadow-[0_0_18px_rgba(247,210,55,0.16)]";
    }

    return "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]";
  }

  function updateReason(type: "peak" | "low", id: string, reason: string) {
    if (type === "peak") {
      onChange({
        ...value,
        peakRanges: peakRanges.map((range) => (range.id === id ? { ...range, reason } : range)),
      });
    } else {
      onChange({
        ...value,
        lowRanges: lowRanges.map((range) => (range.id === id ? { ...range, reason } : range)),
      });
    }
  }

  function removeRange(type: "peak" | "low", id: string) {
    if (type === "peak") {
      onChange({
        ...value,
        peakRanges: peakRanges.filter((range) => range.id !== id),
      });
    } else {
      onChange({
        ...value,
        lowRanges: lowRanges.filter((range) => range.id !== id),
      });
    }
  }

  return (
    <div
      className="space-y-5"
      onMouseUp={() => {
        if (dragging && dragCurrent !== null) finishSelection(dragCurrent);
      }}
      onMouseLeave={() => {
        if (dragging && dragCurrent !== null) finishSelection(dragCurrent);
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveMode("peak")}
          className={`rounded-2xl border px-4 py-2.5 text-sm transition ${
            activeMode === "peak"
              ? "border-emerald-300/35 bg-emerald-400/14 text-emerald-100 shadow-[0_0_18px_rgba(74,222,128,0.18)]"
              : "border-white/10 bg-white/[0.03] text-white/70"
          }`}
        >
          Пики — неоново-зелёный
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("low")}
          className={`rounded-2xl border px-4 py-2.5 text-sm transition ${
            activeMode === "low"
              ? "border-[#f7d237]/35 bg-[#f7d237]/14 text-[#fff3b2] shadow-[0_0_18px_rgba(247,210,55,0.16)]"
              : "border-white/10 bg-white/[0.03] text-white/70"
          }`}
        >
          Спады — неоново-жёлтый
        </button>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/55">
          Зажмите левую кнопку мыши и проведите по месяцам
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
        {MONTHS.map((month, index) => (
          <button
            key={month}
            type="button"
            onMouseDown={() => {
              setDragging(true);
              setDragStart(index);
              setDragCurrent(index);
            }}
            onMouseEnter={() => {
              if (dragging) setDragCurrent(index);
            }}
            onMouseUp={() => finishSelection(index)}
            className={`select-none rounded-2xl border px-3 py-4 text-sm transition ${monthClass(index)}`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="text-sm font-medium text-emerald-100">Выделенные пики</div>

          {peakRanges.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/45">
              Пока не выбрано ни одного периода.
            </div>
          ) : (
            peakRanges.map((range) => (
              <div
                key={range.id}
                className="rounded-[24px] border border-emerald-300/20 bg-emerald-400/8 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="rounded-full border border-emerald-300/25 bg-emerald-400/12 px-3 py-1 text-sm text-emerald-100">
                    {rangeLabel(range.start, range.end)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRange("peak", range.id)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Удалить
                  </button>
                </div>

                <textarea
                  placeholder="Почему хорошо?"
                  className={textareaClass}
                  rows={4}
                  value={range.reason}
                  onChange={(e) => updateReason("peak", range.id, e.target.value)}
                />
              </div>
            ))
          )}
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium text-[#fff3b2]">Выделенные спады</div>

          {lowRanges.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/45">
              Пока не выбрано ни одного периода.
            </div>
          ) : (
            lowRanges.map((range) => (
              <div
                key={range.id}
                className="rounded-[24px] border border-[#f7d237]/20 bg-[#f7d237]/8 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/12 px-3 py-1 text-sm text-[#fff3b2]">
                    {rangeLabel(range.start, range.end)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRange("low", range.id)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Удалить
                  </button>
                </div>

                <textarea
                  placeholder="Почему плохо?"
                  className={textareaClass}
                  rows={4}
                  value={range.reason}
                  onChange={(e) => updateReason("low", range.id, e.target.value)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function geoPointFromText(value: string, fallback = { x: 580, y: 170 }) {
  const text = value.toLowerCase();

  const presets = [
    { keys: ["тбилиси", "груз", "georgia", "tbilisi"], point: { x: 605, y: 150 } },
    { keys: ["кипр", "cyprus"], point: { x: 575, y: 185 } },
    { keys: ["герман", "berlin", "germany"], point: { x: 520, y: 125 } },
    { keys: ["поль", "poland", "warsaw"], point: { x: 545, y: 120 } },
    { keys: ["эстон", "tallinn", "estonia"], point: { x: 555, y: 92 } },
    { keys: ["латв", "riga", "latvia"], point: { x: 550, y: 105 } },
    { keys: ["литв", "vilnius", "lithuania"], point: { x: 548, y: 112 } },
    { keys: ["испан", "madrid", "spain"], point: { x: 455, y: 170 } },
    { keys: ["португал", "lisbon", "portugal"], point: { x: 430, y: 175 } },
    { keys: ["нидерл", "amsterdam", "netherlands"], point: { x: 500, y: 120 } },
    { keys: ["финля", "helsinki", "finland"], point: { x: 565, y: 82 } },
    { keys: ["серби", "belgrade", "serbia"], point: { x: 555, y: 145 } },
    { keys: ["венгр", "budapest", "hungary"], point: { x: 550, y: 135 } },
    { keys: ["лондон", "uk", "united kingdom", "england"], point: { x: 470, y: 112 } },
    { keys: ["нью", "usa", "united states", "america"], point: { x: 230, y: 145 } },
    { keys: ["канада", "canada", "toronto"], point: { x: 220, y: 105 } },
    { keys: ["браз", "brazil"], point: { x: 315, y: 280 } },
    { keys: ["дубай", "uae", "emirates"], point: { x: 625, y: 190 } },
    { keys: ["инд", "india", "delhi"], point: { x: 735, y: 190 } },
    { keys: ["сингап", "singapore"], point: { x: 815, y: 275 } },
    { keys: ["австра", "sydney", "australia"], point: { x: 930, y: 320 } },
    { keys: ["япон", "tokyo", "japan"], point: { x: 900, y: 160 } },
  ];

  for (const preset of presets) {
    if (preset.keys.some((key) => text.includes(key))) return preset.point;
  }

  return fallback;
}

function GeoMapPreview({
  physical,
  sales,
}: {
  physical: string;
  sales: string;
}) {
  const physicalPoint = geoPointFromText(physical, { x: 580, y: 170 });
  const salesIsWorld =
    sales.toLowerCase().includes("весь мир") ||
    sales.toLowerCase().includes("world") ||
    sales.toLowerCase().includes("global");

  const salesPoint = geoPointFromText(sales, physicalPoint);

  const radius = salesIsWorld ? 260 : 85;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#04122a] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,210,55,0.08),transparent_25%),radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.06),transparent_20%)]" />
      <svg
        viewBox="0 0 1100 420"
        className="relative h-[320px] w-full rounded-[24px] bg-[#001233]"
        fill="none"
      >
        <g opacity="0.38" stroke="rgba(255,255,255,0.18)" strokeWidth="2">
          <path d="M118 120C157 95 197 88 232 94C268 101 289 110 313 128C336 145 354 172 346 194C335 220 297 232 273 254C248 277 242 309 227 328" />
          <path d="M430 92C465 77 511 79 553 84C596 89 637 105 657 126C676 147 678 172 662 192C645 212 611 221 579 219C547 217 521 206 490 201C459 196 422 196 407 179C391 161 396 121 430 92Z" />
          <path d="M515 229C535 225 558 231 576 245C595 259 606 281 601 301C595 321 574 339 548 345C523 351 492 344 478 326C464 308 468 279 481 258C494 238 494 234 515 229Z" />
          <path d="M716 109C752 98 798 100 845 109C892 117 939 132 961 157C983 181 980 214 961 237C942 260 907 274 870 271C834 268 795 247 772 232C749 217 742 206 718 204C695 202 654 210 634 198C614 185 614 152 638 131C661 111 680 120 716 109Z" />
          <path d="M849 294C871 279 902 275 928 282C954 289 974 307 977 326C980 345 967 365 945 375C923 384 893 383 870 374C847 365 830 347 829 328C828 310 827 309 849 294Z" />
          <path d="M688 246C707 241 729 245 745 256C760 268 767 288 761 305C755 321 736 333 716 335C696 337 674 330 663 316C652 301 652 280 659 266C666 252 669 251 688 246Z" />
        </g>

        <g opacity="0.18" stroke="rgba(255,255,255,0.08)">
          <line x1="80" y1="70" x2="1020" y2="70" />
          <line x1="80" y1="140" x2="1020" y2="140" />
          <line x1="80" y1="210" x2="1020" y2="210" />
          <line x1="80" y1="280" x2="1020" y2="280" />
          <line x1="80" y1="350" x2="1020" y2="350" />
        </g>

        <circle
          cx={salesPoint.x}
          cy={salesPoint.y}
          r={radius}
          stroke={salesIsWorld ? "rgba(111,211,255,0.45)" : "rgba(111,211,255,0.34)"}
          strokeWidth="2"
          strokeDasharray="7 9"
          fill={salesIsWorld ? "rgba(111,211,255,0.06)" : "rgba(111,211,255,0.08)"}
        />

        <circle
          cx={physicalPoint.x}
          cy={physicalPoint.y}
          r="9"
          fill="#f7d237"
          style={{ filter: "drop-shadow(0 0 16px rgba(247,210,55,0.75))" }}
        />
        <circle cx={physicalPoint.x} cy={physicalPoint.y} r="18" fill="rgba(247,210,55,0.12)" />

        <g transform={`translate(${Math.max(physicalPoint.x - 72, 100)}, ${physicalPoint.y - 54})`}>
          <rect
            width="160"
            height="44"
            rx="22"
            fill="rgba(247,210,55,0.12)"
            stroke="rgba(247,210,55,0.35)"
          />
          <text x="80" y="28" textAnchor="middle" fill="#fff3b2" fontSize="14">
            Физическая локация
          </text>
        </g>

        <g transform={`translate(${Math.max(salesPoint.x + 14, 90)}, ${salesPoint.y - 12})`}>
          <rect
            width={salesIsWorld ? "120" : "150"}
            height="44"
            rx="22"
            fill="rgba(77,194,255,0.12)"
            stroke="rgba(77,194,255,0.32)"
          />
          <text x={salesIsWorld ? "60" : "75"} y="28" textAnchor="middle" fill="#c8f3ff" fontSize="14">
            {salesIsWorld ? "Весь мир" : "Радиус продаж"}
          </text>
        </g>
      </svg>
    </div>
  );
}

function TeamMembersBuilder({
  value,
  onChange,
}: {
  value: TeamMember[];
  onChange: (next: TeamMember[]) => void;
}) {
  const members = value ?? [createEmptyTeamMember()];

  function updateMember(id: string, patch: Partial<TeamMember>) {
    onChange(members.map((member) => (member.id === id ? { ...member, ...patch } : member)));
  }

  function addMember() {
    onChange([...members, createEmptyTeamMember()]);
  }

  function removeMember(id: string) {
    if (members.length === 1) return;
    onChange(members.filter((member) => member.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1fr_90px]">
        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-sm uppercase tracking-[0.22em] text-white/35">
                  Карточка участника {index + 1}
                </div>
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Удалить
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-sm text-white/55">Должность</div>
                  <input
                    className={inputClass}
                    placeholder="Например: COO / Head of Sales"
                    value={member.position}
                    onChange={(e) => updateMember(member.id, { position: e.target.value })}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Главная зона ответственности</div>
                  <input
                    className={inputClass}
                    placeholder="Например: рост продаж / операционка"
                    value={member.responsibility}
                    onChange={(e) => updateMember(member.id, { responsibility: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm text-white/55">ЛПР / не ЛПР</div>
                <div className="flex flex-wrap gap-2.5">
                  {["ЛПР", "Не ЛПР"].map((option) => {
                    const active = member.isDecisionMaker === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          updateMember(member.id, {
                            isDecisionMaker: option as TeamMember["isDecisionMaker"],
                          })
                        }
                        className={`rounded-full border px-3.5 py-2 text-sm transition ${
                          active
                            ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                            : "border-white/10 bg-white/[0.03] text-white/70"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 text-sm text-white/55">Где принимает участие</div>
                <div className="flex flex-wrap gap-2.5">
                  {TEAM_PARTICIPATION_TAGS.map((tag) => {
                    const active = member.participatesIn.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          updateMember(member.id, {
                            participatesIn: active
                              ? member.participatesIn.filter((t) => t !== tag)
                              : [...member.participatesIn, tag],
                          })
                        }
                        className={`rounded-full border px-3.5 py-2 text-sm transition ${
                          active
                            ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                            : "border-white/10 bg-white/[0.03] text-white/70"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addMember}
          className="flex min-h-[120px] items-center justify-center rounded-[24px] border border-dashed border-white/16 bg-white/[0.03] text-4xl text-white/55 transition hover:border-[#f7d237]/30 hover:bg-[#f7d237]/6 hover:text-[#fff3b2] xl:sticky xl:top-0"
          aria-label="Добавить карточку"
        >
          +
        </button>
      </div>
    </div>
  );
}

function DepartmentRelationsBuilder({
  value,
  onChange,
}: {
  value: {
    departments: DepartmentItem[];
    relations: DepartmentRelation[];
    note: string;
  };
  onChange: (next: {
    departments: DepartmentItem[];
    relations: DepartmentRelation[];
    note: string;
  }) => void;
}) {
  const departments: DepartmentItem[] = value?.departments ?? createDefaultDepartments();
  const relations: DepartmentRelation[] = normalizeDepartmentRelations(
    departments,
    value?.relations ?? []
  );
  const note = value?.note ?? "";

  function commit(nextDepartments: DepartmentItem[], nextRelations: DepartmentRelation[], nextNote = note) {
    onChange({
      departments: nextDepartments,
      relations: normalizeDepartmentRelations(nextDepartments, nextRelations),
      note: nextNote,
    });
  }

  function addDepartment() {
    const nextDepartments = [...departments, { id: makeId("dept"), name: "", isDefault: false }];
    commit(nextDepartments, relations);
  }

  function updateDepartment(id: string, name: string) {
    const nextDepartments = departments.map((dept) => (dept.id === id ? { ...dept, name } : dept));
    commit(nextDepartments, relations);
  }

  function removeDepartment(id: string) {
    if (departments.length <= 3) return;
    const nextDepartments = departments.filter((dept) => dept.id !== id);
    const nextRelations = relations.filter((rel) => rel.fromId !== id && rel.toId !== id);
    commit(nextDepartments, nextRelations);
  }

  function setRelationStatus(id: string, status: DepartmentRelation["status"]) {
    const nextRelations = relations.map((rel) => (rel.id === id ? { ...rel, status } : rel));
    commit(departments, nextRelations);
  }

  function getDeptName(id: string) {
    return departments.find((dept) => dept.id === id)?.name || "Без названия";
  }

  const relationColors = {
    red: "bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.45)]",
    yellow: "bg-[#f7d237] shadow-[0_0_14px_rgba(247,210,55,0.45)]",
    green: "bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.45)]",
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[1fr_90px]">
        <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5">
          <div className="mb-3 text-sm uppercase tracking-[0.22em] text-white/35">Отделы</div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/45">
                    {dept.isDefault ? "Дефолтный отдел" : "Пользовательский отдел"}
                  </div>
                  {!dept.isDefault && (
                    <button
                      type="button"
                      onClick={() => removeDepartment(dept.id)}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/60"
                    >
                      ×
                    </button>
                  )}
                </div>
                <input
                  className={inputClass}
                  placeholder="Название отдела"
                  value={dept.name}
                  onChange={(e) => updateDepartment(dept.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={addDepartment}
          className="flex min-h-[120px] items-center justify-center rounded-[24px] border border-dashed border-white/16 bg-white/[0.03] text-4xl text-white/55 transition hover:border-[#f7d237]/30 hover:bg-[#f7d237]/6 hover:text-[#fff3b2]"
          aria-label="Добавить отдел"
        >
          +
        </button>
      </div>

      <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5">
        <div className="mb-3 text-sm uppercase tracking-[0.22em] text-white/35">
          Взаимосвязи между отделами
        </div>

        <div className="space-y-3">
          {relations.map((relation) => (
            <div
              key={relation.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="text-sm text-white">
                {getDeptName(relation.fromId)} ↔ {getDeptName(relation.toId)}
              </div>

              <div className="flex items-center gap-2.5">
                {(["red", "yellow", "green"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setRelationStatus(relation.id, status)}
                    className={`h-6 w-6 rounded-full border ${
                      relation.status === status
                        ? "border-white/70"
                        : "border-white/15"
                    } ${relationColors[status]}`}
                    aria-label={status}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="mb-2 text-sm text-white/55">Комментарий</div>
          <textarea
            className={textareaClass}
            rows={5}
            placeholder="Опишите, как именно выстроено взаимодействие между отделами и что изменилось за год"
            value={note}
            onChange={(e) => commit(departments, relations, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function renderInput(
  question: Question,
  answers: Answers,
  setAnswer: (key: string, value: any) => void
) {
  switch (question.type) {
    case "rangePercent": {
      const value = answers[question.id]?.value ?? 0;
      const note = answers[question.id]?.note ?? "";
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>0%</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[#f7d237]">
              {value}%
            </span>
            <span>100%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setAnswer(question.id, { value: Number(e.target.value), note })}
            className="w-full accent-[#f7d237]"
          />
          <textarea
            placeholder="Комментарий или контекст…"
            className={textareaClass}
            rows={4}
            value={note}
            onChange={(e) => setAnswer(question.id, { value, note: e.target.value })}
          />
        </div>
      );
    }

    case "text":
      return (
        <textarea
          placeholder="Введите ответ…"
          className={textareaClass}
          rows={5}
          value={answers[question.id] ?? ""}
          onChange={(e) => setAnswer(question.id, e.target.value)}
        />
      );

    case "tags": {
      const source =
        question.id === "kpis"
          ? KPI_TAGS
          : question.id === "acquisitionChannels"
            ? FLOW_TAGS
            : question.id === "retention"
              ? RETENTION_TAGS
              : ANALYTICS_TAGS;

      const selected: string[] = answers[question.id] ?? [];

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {source.map((tag) => {
              const active = selected.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    const nextSelected = active
                      ? selected.filter((t) => t !== tag)
                      : [...selected, tag];

                    setAnswer(question.id, nextSelected);

                    if (question.id === "acquisitionChannels") {
                      const currentDistribution = answers.channelEfficiency ?? {};
                      const nextDistribution = normalizeChannelDistribution(
                        nextSelected,
                        currentDistribution
                      );
                      setAnswer("channelEfficiency", nextDistribution);
                    }
                  }}
                  className={`rounded-full border px-3.5 py-2 text-sm transition ${
                    active
                      ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2] shadow-[0_0_20px_rgba(247,210,55,0.18)]"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case "channelDistribution": {
      const selectedChannels: string[] = answers.acquisitionChannels ?? [];
      const distribution = normalizeChannelDistribution(
        selectedChannels,
        answers.channelEfficiency ?? {}
      );
      const total = sumDistribution(distribution);

      if (selectedChannels.length === 0) {
        return (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
            Сначала выберите каналы в предыдущем вопросе.
          </div>
        );
      }

      return (
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="text-sm text-white/60">
              Распределите входящий поток клиентов между выбранными каналами
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm ${
                total === 100
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]"
              }`}
            >
              {total}%
            </div>
          </div>

          <div className="space-y-4">
            {selectedChannels.map((channel) => {
              const value = distribution[channel] ?? 0;
              return (
                <div
                  key={channel}
                  className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-white">{channel}</div>
                    <div className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-sm text-[#fff3b2]">
                      {value}%
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={value}
                    onChange={(e) => {
                      const nextValue = Number(e.target.value);
                      setAnswer("channelEfficiency", {
                        ...distribution,
                        [channel]: nextValue,
                      });
                    }}
                    className="w-full accent-[#f7d237]"
                  />
                </div>
              );
            })}
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              total === 100
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                : "border-white/10 bg-white/[0.03] text-white/55"
            }`}
          >
            {total === 100
              ? "Распределение заполнено корректно."
              : `Сейчас сумма составляет ${total}%. Нужно довести до 100%.`}
          </div>
        </div>
      );
    }

    case "dualRange": {
      const current = answers[question.id] ?? { demand: 0, capacity: 0 };
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <RangeBlock
            title="Обращения / заявки"
            value={current.demand}
            min={0}
            max={500}
            onChange={(val) => setAnswer(question.id, { ...current, demand: val })}
          />
          <RangeBlock
            title="Реальная capacity"
            value={current.capacity}
            min={0}
            max={500}
            onChange={(val) => setAnswer(question.id, { ...current, capacity: val })}
          />
        </div>
      );
    }

    case "tripleMargin": {
      const products = answers[question.id] ?? [
        { name: "", value: 0 },
        { name: "", value: 0 },
        { name: "", value: 0 },
      ];

      return (
        <div className="space-y-4">
          {products.map((item: any, i: number) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <input
                  placeholder={`Продукт ${i + 1}`}
                  className={inputClass}
                  value={item.name}
                  onChange={(e) => {
                    const next = [...products];
                    next[i] = { ...next[i], name: e.target.value };
                    setAnswer(question.id, next);
                  }}
                />
                <div className="min-w-[86px] rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-2 text-center text-sm text-[#fff3b2]">
                  {item.value}%
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={item.value}
                onChange={(e) => {
                  const next = [...products];
                  next[i] = { ...next[i], value: Number(e.target.value) };
                  setAnswer(question.id, next);
                }}
                className="w-full accent-[#f7d237]"
              />
            </div>
          ))}
        </div>
      );
    }

    case "cjm": {
      const current =
        answers[question.id] ?? {
          stages: CJM_STAGES.map((stage) => ({
            stage,
            description: CJM_STAGE_DESCRIPTIONS[stage],
            whatHappens: "",
            duration: "",
            clientGets: "",
            companyGets: "",
            problems: "",
          })),
        };

      return (
        <div className="grid gap-4 md:grid-cols-2">
          {current.stages.map((step: any, i: number) => (
            <div
              key={step.stage}
              className={`rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5 ${
                i === current.stages.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-4">
                <div className="text-xs uppercase tracking-[0.24em] text-white/35">Stage {i + 1}</div>
                <div className="mt-1 text-2xl font-semibold text-white">{step.stage}</div>
                <div className="mt-1 text-sm text-white/50">{step.description}</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-white/55">Что происходит</div>
                  <textarea
                    placeholder="Опишите, что происходит на этом этапе"
                    className={textareaClass}
                    rows={4}
                    value={step.whatHappens}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], whatHappens: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Длительность</div>
                  <input
                    placeholder="Например: 1 день / 2 недели"
                    className={inputClass}
                    value={step.duration}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], duration: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Что получает клиент</div>
                  <textarea
                    placeholder="Ценность для клиента на этом этапе"
                    className={textareaClass}
                    rows={3}
                    value={step.clientGets}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], clientGets: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Что получает компания</div>
                  <textarea
                    placeholder="Какой результат получает бизнес"
                    className={textareaClass}
                    rows={3}
                    value={step.companyGets}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], companyGets: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/45">Проблемы (опционально)</div>
                  <textarea
                    placeholder="Где здесь возникают потери, трение или замедление"
                    className={textareaClass}
                    rows={3}
                    value={step.problems}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], problems: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    case "seasonality": {
      const current = answers[question.id] ?? {
        peakRanges: [],
        lowRanges: [],
      };

      return <SeasonalityCalendar value={current} onChange={(next) => setAnswer(question.id, next)} />;
    }

    case "map": {
      const current = answers[question.id] ?? { physical: "", sales: "" };

      return (
        <div className="space-y-4">
          <GeoMapPreview physical={current.physical} sales={current.sales} />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className={inputClass}
              placeholder="Где физически находится бизнес"
              value={current.physical}
              onChange={(e) => setAnswer(question.id, { ...current, physical: e.target.value })}
            />
            <input
              className={inputClass}
              placeholder="В каком регионе продаёте / например: Европа / весь мир"
              value={current.sales}
              onChange={(e) => setAnswer(question.id, { ...current, sales: e.target.value })}
            />
          </div>
        </div>
      );
    }

    case "teamRoles":
      return (
        <TeamMembersBuilder
          value={answers[question.id] ?? [createEmptyTeamMember()]}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );

    case "departmentRelations":
      return (
        <DepartmentRelationsBuilder
          value={
            answers[question.id] ?? {
              departments: createDefaultDepartments(),
              relations: [],
              note: "",
            }
          }
          onChange={(next) => setAnswer(question.id, next)}
        />
      );

    case "stressRange": {
      const current = answers[question.id] ?? {
        Маркетинг: 0,
        Продажи: 0,
        Операционка: 0,
        Управление: 0,
      };

      return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STRESS_ZONES.map((zone) => (
            <div key={zone} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm font-medium text-white">{zone}</div>
              <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                <span>-10</span>
                <span className={current[zone] >= 7 ? "text-rose-200" : "text-[#fff3b2]"}>
                  {current[zone]}
                </span>
                <span>10</span>
              </div>
              <input
                type="range"
                min={-10}
                max={10}
                value={current[zone]}
                onChange={(e) =>
                  setAnswer(question.id, { ...current, [zone]: Number(e.target.value) })
                }
                className="w-full accent-[#f7d237]"
              />
            </div>
          ))}
        </div>
      );
    }

    case "analyticsBranch": {
      const current = answers[question.id] ?? { hasAnalytics: null, tags: [], note: "" };
      return (
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAnswer(question.id, { ...current, hasAnalytics: true })}
              className={`rounded-2xl border px-4 py-2.5 text-sm ${
                current.hasAnalytics === true
                  ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                  : "border-white/10 bg-white/[0.03] text-white/70"
              }`}
            >
              Да
            </button>
            <button
              type="button"
              onClick={() => setAnswer(question.id, { ...current, hasAnalytics: false })}
              className={`rounded-2xl border px-4 py-2.5 text-sm ${
                current.hasAnalytics === false
                  ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                  : "border-white/10 bg-white/[0.03] text-white/70"
              }`}
            >
              Нет
            </button>
          </div>
          {current.hasAnalytics === true && (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm text-white/55">Если да — что именно вы используете?</div>
              <div className="mb-4 flex flex-wrap gap-2.5">
                {ANALYTICS_TAGS.map((tag) => {
                  const active = current.tags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() =>
                        setAnswer(question.id, {
                          ...current,
                          tags: active
                            ? current.tags.filter((t: string) => t !== tag)
                            : [...current.tags, tag],
                        })
                      }
                      className={`rounded-full border px-3.5 py-2 text-sm ${
                        active
                          ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                          : "border-white/10 bg-white/[0.03] text-white/70"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <textarea
                placeholder="Опишите, как именно аналитика участвует в принятии решений…"
                className={textareaClass}
                rows={4}
                value={current.note}
                onChange={(e) => setAnswer(question.id, { ...current, note: e.target.value })}
              />
            </div>
          )}
        </div>
      );
    }

    case "strategyGoal": {
      const current = answers[question.id] ?? { profitTarget: 0, mode: "", costChange: "" };
      const modes = ["On hold", "Не превысить лимит", "Сократить расходы"];

      return (
        <div className="space-y-5">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between text-sm text-white/60">
              <span>Цель по чистой прибыли</span>
              <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">
                +{current.profitTarget}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={current.profitTarget}
              onChange={(e) =>
                setAnswer(question.id, { ...current, profitTarget: Number(e.target.value) })
              }
              className="w-full accent-[#f7d237]"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {modes.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => setAnswer(question.id, { ...current, mode: option })}
                className={`rounded-2xl border px-4 py-4 text-sm ${
                  current.mode === option
                    ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                    : "border-white/10 bg-white/[0.03] text-white/70"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <input
            className={inputClass}
            placeholder="Если применимо — укажите процент изменения расходов"
            value={current.costChange}
            onChange={(e) => setAnswer(question.id, { ...current, costChange: e.target.value })}
          />
        </div>
      );
    }

    case "contact": {
      const current = answers[question.id] ?? { reportEmail: "", meetingContact: "" };
      return (
        <div className="space-y-4">
          <input
            className={inputClass}
            placeholder="Email получателя отчёта"
            value={current.reportEmail}
            onChange={(e) => setAnswer(question.id, { ...current, reportEmail: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Email / имя участника онлайн-встречи"
            value={current.meetingContact}
            onChange={(e) => setAnswer(question.id, { ...current, meetingContact: e.target.value })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
              <div className="mb-2 flex items-center gap-2 text-white/80">
                <span className="text-[#f7d237]">✉</span> Отправка отчёта
              </div>
              Автоматически после завершения диагностики.
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
              <div className="mb-2 flex items-center gap-2 text-white/80">
                <span className="text-[#f7d237]">◷</span> Приглашение на встречу
              </div>
              Можно связать со слотами и защитой от повторного входа.
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

export default function DiagnosticIntakePage() {
  const [active, setActive] = useState<Chapter | null>(null);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const sectionProgress = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((chapter) => [chapter.id, getChapterProgress(chapter, answers)])
      ),
    [answers]
  );

  const total = useMemo(() => {
    const values = Object.values(sectionProgress) as number[];
    return values.length ? values.reduce((acc, v) => acc + v, 0) / values.length : 0;
  }, [sectionProgress]);

  const completedSections = useMemo(
    () => Object.values(sectionProgress).filter((v) => Number(v) >= 100).length,
    [sectionProgress]
  );

  const totalQuestions = useMemo(
    () => chapters.reduce((acc, chapter) => acc + chapter.questions.length, 0),
    []
  );

  function setAnswer(key: string, value: any) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)",
      }}
    >
      <style jsx global>{`
        @keyframes rs-overlay-in {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        @keyframes rs-panel-in {
          from {
            opacity: 0;
            transform: translateX(42px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes rs-fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <GlassCard className="mb-8 p-5 md:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                <span className="text-[#f7d237]">●</span>
                Revenue Snapshot — Diagnostic Intake
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">
                Структурированная диагностическая анкета бизнеса
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                Экран построен под вашу структуру вопросов: каждая глава — отдельная карточка с
                локальной заполненностью, внутри — half-screen modal с адаптивным типом ввода под
                конкретный вопрос.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 pt-1 text-xs text-white/45">
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Блоков: {chapters.length}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Вопросов: {totalQuestions}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Полностью завершено: {completedSections}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Формат: card → half-screen modal
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Логика: adaptive input flow
                </span>
              </div>
            </div>

            <GlassCard className="p-6 md:p-7">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                  Overall completion
                </div>

                <div className="mt-6">
                  <Ring progress={total} size={172} />
                </div>

                <div className="mt-5 text-2xl font-semibold text-[#fefefe]">
                  Общая заполненность анкеты
                </div>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#a5aeb2]">
                  Диаграмма отражает совокупный прогресс по всем разделам анкеты и обновляется по
                  мере заполнения блоков.
                </p>

                <div className="mt-5 grid w-full grid-cols-2 gap-3 text-left">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Sections done
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">{completedSections}</div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Total blocks
                    </div>
                    <div className="mt-1 text-lg font-semibold text-white">{chapters.length}</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {chapters.map((chapter, index) => {
            const progress = Number(sectionProgress[chapter.id]);

            return (
              <TiltCardButton key={chapter.id} onClick={() => setActive(chapter)}>
                <GlassCard className="h-full p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-[#f7d237] shadow-[0_0_30px_rgba(247,210,55,0.10)]">
                      {chapter.icon}
                    </div>
                    <Ring progress={progress} size={82} />
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/32">
                      Block {index + 1}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-[#fefefe]">{chapter.title}</div>
                    <div className="mt-2 text-sm leading-6 text-[#a5aeb2]">{chapter.subtitle}</div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {chapter.questions.slice(0, 3).map((question, i) => (
                      <div key={question.id} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px]">
                          {i + 1}
                        </span>
                        <span className="line-clamp-2">{question.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm transition duration-300 group-hover:border-[#f7d237]/20 group-hover:bg-[#f7d237]/[0.04]">
                    <span className="text-white/55">Открыть блок</span>
                    <div className="flex items-center gap-2 text-[#f7d237]">
                      <span>{progress}%</span>
                      <span>→</span>
                    </div>
                  </div>
                </GlassCard>
              </TiltCardButton>
            );
          })}
        </div>
      </div>

      {active && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            style={{
              animation: "rs-overlay-in 280ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onClick={() => setActive(null)}
          />
          <div
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-[980px] overflow-y-auto border-l border-white/10 bg-[#08162df2] backdrop-blur-3xl"
            style={{
              animation: "rs-panel-in 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="sticky top-0 z-10 border-b border-white/8 bg-[#08162dd9] px-5 py-4 backdrop-blur-2xl md:px-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                    diagnostic chapter
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-[#fefefe]">{active.title}</div>
                  <div className="mt-1 text-sm text-[#a5aeb2]">{active.subtitle}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Ring progress={Number(sectionProgress[active.id])} size={84} />
                  <button
                    onClick={() => setActive(null)}
                    className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-5 px-5 py-5 md:px-7 md:py-7">
              {active.questions.map((question, index) => (
                <div
                  key={question.id}
                  style={{
                    animation: `rs-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) ${
                      40 + index * 40
                    }ms both`,
                  }}
                >
                  <GlassCard className="p-5 md:p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                          Question {index + 1}
                        </div>
                        <h3 className="mt-2 text-lg font-medium leading-7 text-[#fefefe]">
                          {question.label}
                        </h3>
                      </div>
                      <div className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-2 text-sm text-[#f7d237]">
                        {getQuestionProgress(question, answers)}%
                      </div>
                    </div>
                    {renderInput(question, answers, setAnswer)}
                  </GlassCard>
                </div>
              ))}

              <div
                className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/8 bg-white/[0.04] px-5 py-4"
                style={{
                  animation: `rs-fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) ${
                    80 + active.questions.length * 40
                  }ms both`,
                }}
              >
                <div className="text-sm text-white/55">
                  Прогресс этого блока: {Number(sectionProgress[active.id])}%
                </div>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105">
                  Сохранить блок<span>✓</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
