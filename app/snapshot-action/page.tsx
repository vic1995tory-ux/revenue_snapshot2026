"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

type TeamMember = {
  id: string;
  position: string;
  responsibility: string;
  isDecisionMaker: "" | "ЛПР" | "Не ЛПР";
  participatesIn: string[];
};

type ProductItem = {
  name: string;
  value: number;
  touched: boolean;
};

type CjmStage = {
  stage: string;
  description: string;
  whatHappens: string;
  duration: string;
  clientGets: string;
  companyGets: string;
  problems: string;
};

type TeamLinkMetric = {
  speed: number;
  communication: number;
  infoQuality: number;
};

type TeamLink = {
  id: string;
  fromRole: string;
  toRole: string;
  metrics: TeamLinkMetric;
};

type TagValue = {
  selected: string[];
  custom: string[];
};

type ChannelDistributionState = {
  values: Record<string, number>;
  touched: Record<string, boolean>;
};

type StressState = {
  values: Record<string, number>;
  touched: Record<string, boolean>;
};

type StrategyGoalState = {
  profitTarget: number;
  mode: string;
  costChange: string;
  touched: boolean;
};

type SeasonalityPoint = {
  month: string;
  value: number;
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

const BUSINESS_STAGE_TAGS = ["Seed", "Startup", "Growth", "Enterprise"];

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

function textLength(s: string | undefined | null) {
  return String(s ?? "").trim().length;
}

function containsDigit(s: string | undefined | null) {
  return /\d/.test(String(s ?? ""));
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
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

function createInitialSeasonalityPoints() {
  return MONTHS.map((month) => ({ month, value: 0 }));
}

function getTagState(value: any): TagValue {
  if (Array.isArray(value)) return { selected: value, custom: [] };
  return {
    selected: value?.selected ?? [],
    custom: value?.custom ?? [],
  };
}

function getAllTagValues(value: any) {
  const state = getTagState(value);
  return [...state.selected, ...state.custom].filter(Boolean);
}

function createTeamLinksFromMembers(members: TeamMember[]): TeamLink[] {
  const roles = members
    .map((m) => m.position.trim())
    .filter(Boolean)
    .filter((role, index, arr) => arr.indexOf(role) === index);

  const next: TeamLink[] = [];
  for (let i = 0; i < roles.length; i += 1) {
    for (let j = i + 1; j < roles.length; j += 1) {
      next.push({
        id: `${roles[i]}__${roles[j]}`,
        fromRole: roles[i],
        toRole: roles[j],
        metrics: {
          speed: 0,
          communication: 0,
          infoQuality: 0,
        },
      });
    }
  }
  return next;
}

function mergeTeamLinks(prev: TeamLink[], nextBase: TeamLink[]) {
  const prevMap = new Map(prev.map((item) => [item.id, item]));
  return nextBase.map((item) => prevMap.get(item.id) ?? item);
}

const initialAnswers: Answers = {
  margin: { value: 0, note: "", touched: false },
  salesCount: "",
  revenue: "",
  kpis: { selected: [], custom: [] },
  clientProfile: "",
  demandCapacity: { demand: 0, capacity: 0, touched: { demand: false, capacity: false } },
  acquisitionChannels: { selected: [], custom: [] },
  channelEfficiency: { values: {}, touched: {} },
  topProducts: [
    { name: "", value: 0, touched: false },
    { name: "", value: 0, touched: false },
    { name: "", value: 0, touched: false },
  ],
  retention: { selected: [], custom: [] },
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
    points: createInitialSeasonalityPoints(),
    peaksReason: "",
    lowsReason: "",
  },
  positionText: { text: "", stages: [] },
  geo: { physical: "", sales: "" },
  team: [createEmptyTeamMember()],
  interaction: {
    links: [],
    note: "",
  },
  decisions: "",
  stress: {
    values: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
    touched: { Маркетинг: false, Продажи: false, Операционка: false, Управление: false },
  },
  lossZones: {
    values: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
    touched: { Маркетинг: false, Продажи: false, Операционка: false, Управление: false },
  },
  analytics: { hasAnalytics: null, tags: [], custom: [], note: "" },
  changesNeeded: "",
  implemented: "",
  goal: { profitTarget: 0, mode: "", costChange: "", touched: false },
  horizons: { m3: "", m6: "", m12: "" },
  contacts: { reportEmail: "", meetingContact: "" },
};

function getQuestionProgress(question: Question, answers: Answers): number {
  const value = answers[question.id];

  switch (question.id) {
    case "margin":
      return value?.touched ? 100 : 0;

    case "salesCount":
    case "revenue":
      return containsDigit(value) ? 100 : 0;

    case "clientProfile":
    case "changesNeeded":
    case "implemented":
    case "decisions":
      return textLength(value) >= 60 ? 100 : 0;

    case "horizons":
      return textLength(value?.m3) >= 20 && textLength(value?.m6) >= 20 && textLength(value?.m12) >= 20
        ? 100
        : 0;

    case "kpis":
    case "retention":
      return getAllTagValues(value).length > 0 ? 100 : 0;

    case "acquisitionChannels":
      return getAllTagValues(value).length > 0 ? 100 : 0;

    case "demandCapacity": {
      const touched = value?.touched ?? {};
      return touched.demand && touched.capacity ? 100 : 0;
    }

    case "channelEfficiency": {
      const selectedChannels = getAllTagValues(answers.acquisitionChannels);
      const state: ChannelDistributionState = value ?? { values: {}, touched: {} };
      if (selectedChannels.length === 0) return 0;

      const allTouched = selectedChannels.every((channel) => state.touched?.[channel]);
      const total = selectedChannels.reduce(
        (acc, channel) => acc + Number(state.values?.[channel] ?? 0),
        0
      );

      return allTouched && total === 100 ? 100 : 0;
    }

    case "topProducts": {
      const items: ProductItem[] = value ?? [];
      if (items.length !== 3) return 0;
      const allNamed = items.every((item) => textLength(item.name) > 0);
      const allTouched = items.every((item) => item.touched);
      return allNamed && allTouched ? 100 : 0;
    }

    case "cjm": {
      const stages: CjmStage[] = value?.stages ?? [];
      const ok = stages.every((stage) => {
        return (
          textLength(stage.whatHappens) >= 30 &&
          textLength(stage.duration) >= 3 &&
          textLength(stage.clientGets) >= 30 &&
          textLength(stage.companyGets) >= 30
        );
      });
      return ok ? 100 : 0;
    }

    case "seasonality": {
      const points: SeasonalityPoint[] = value?.points ?? [];
      const hasMovement = points.some((p) => Math.abs(p.value) >= 18);
      const peaksReason = textLength(value?.peaksReason) >= 30;
      const lowsReason = textLength(value?.lowsReason) >= 30;
      return hasMovement && peaksReason && lowsReason ? 100 : 0;
    }

    case "positionText":
      return textLength(value?.text) >= 60 && (value?.stages?.length ?? 0) > 0 ? 100 : 0;

    case "geo":
      return textLength(value?.physical) > 0 && textLength(value?.sales) > 0 ? 100 : 0;

    case "team": {
      const members: TeamMember[] = value ?? [];
      const ok = members.every((member) => {
        return (
          textLength(member.position) > 0 &&
          textLength(member.responsibility) > 0 &&
          member.isDecisionMaker !== "" &&
          member.participatesIn.length > 0
        );
      });
      return ok ? 100 : 0;
    }

    case "interaction": {
      const links: TeamLink[] = value?.links ?? [];
      if (links.length === 0) return 0;
      const allRated = links.every((link) => {
        return (
          link.metrics.speed >= 1 &&
          link.metrics.communication >= 1 &&
          link.metrics.infoQuality >= 1
        );
      });
      return allRated ? 100 : 0;
    }

    case "stress":
    case "lossZones": {
      const touched = value?.touched ?? {};
      return STRESS_ZONES.every((zone) => touched[zone]) ? 100 : 0;
    }

    case "analytics": {
      if (value?.hasAnalytics === false) return 100;
      if (value?.hasAnalytics === true) {
        return getAllTagValues({ selected: value.tags, custom: value.custom }).length > 0 ? 100 : 0;
      }
      return 0;
    }

    case "goal":
      return value?.touched && textLength(value?.mode) > 0 ? 100 : 0;

    case "contacts":
      return textLength(value?.reportEmail) > 0 && textLength(value?.meetingContact) > 0 ? 100 : 0;

    default:
      return 0;
  }
}

function getChapterProgress(chapter: Chapter, answers: Answers): number {
  const total = chapter.questions.length;
  const filled = chapter.questions.filter((q) => getQuestionProgress(q, answers) === 100).length;
  return Math.round((filled / total) * 100);
}

function useAutosizeTextarea(value: string) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return ref;
}

function AutoTextarea({
  value,
  onChange,
  placeholder,
  minRows = 2,
  className = "",
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  minRows?: number;
  className?: string;
}) {
  const ref = useAutosizeTextarea(value);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={minRows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
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

const compactInputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";

const textareaClass =
  "w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";

function TagField({
  label,
  value,
  baseTags,
  onChange,
}: {
  label?: string;
  value: TagValue;
  baseTags: string[];
  onChange: (next: TagValue) => void;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [customValue, setCustomValue] = useState("");

  function addCustomTag() {
    const next = customValue.trim();
    if (!next) return;
    if (value.selected.includes(next) || value.custom.includes(next)) {
      setCustomValue("");
      setIsAdding(false);
      return;
    }

    onChange({
      selected: value.selected,
      custom: [...value.custom, next],
    });
    setCustomValue("");
    setIsAdding(false);
  }

  return (
    <div className="space-y-4">
      {label ? <div className="text-sm text-white/55">{label}</div> : null}

      <div className="flex flex-wrap gap-2.5">
        {baseTags.map((tag) => {
          const active = value.selected.includes(tag);
          return (
            <button
              type="button"
              key={tag}
              onClick={() =>
                onChange({
                  selected: active
                    ? value.selected.filter((t) => t !== tag)
                    : [...value.selected, tag],
                  custom: value.custom,
                })
              }
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

        {value.custom.map((tag) => (
          <button
            type="button"
            key={`custom-${tag}`}
            onClick={() =>
              onChange({
                selected: value.selected,
                custom: value.custom.filter((t) => t !== tag),
              })
            }
            className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3.5 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
          >
            {tag} ×
          </button>
        ))}

        <button
          type="button"
          onClick={() => setIsAdding((prev) => !prev)}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white/75 transition hover:border-[#f7d237]/25 hover:bg-[#f7d237]/10 hover:text-[#fff3b2]"
        >
          +
        </button>
      </div>

      {isAdding && (
        <div className="flex flex-wrap gap-2">
          <input
            className={compactInputClass}
            placeholder="Добавить свой вариант"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="rounded-2xl border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff3b2] transition hover:bg-[#f7d237]/16"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
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
                className={compactInputClass}
                placeholder="Например: COO / Head of Sales"
                value={member.position}
                onChange={(e) => updateMember(member.id, { position: e.target.value })}
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">Главная зона ответственности</div>
              <input
                className={compactInputClass}
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

      <button
        type="button"
        onClick={addMember}
        className="flex h-[98px] w-full items-center justify-center rounded-[24px] border border-dashed border-white/16 bg-white/[0.03] text-4xl text-white/55 transition hover:border-[#f7d237]/30 hover:bg-[#f7d237]/6 hover:text-[#fff3b2]"
      >
        +
      </button>
    </div>
  );
}

function RelationStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${
              active
                ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                : "border-white/10 bg-white/[0.03] text-white/50"
            }`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

function TeamRelationsBuilder({
  value,
  teamMembers,
  onChange,
}: {
  value: { links: TeamLink[]; note: string };
  teamMembers: TeamMember[];
  onChange: (next: { links: TeamLink[]; note: string }) => void;
}) {
