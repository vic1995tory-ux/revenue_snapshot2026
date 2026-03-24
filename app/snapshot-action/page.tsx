"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type InputType =
  | "rangePercent"
  | "text"
  | "tags"
  | "dualRange"
  | "tripleMargin"
  | "cjm"
  | "seasonality"
  | "teamRoles"
  | "teamRelations"
  | "stressRange"
  | "analyticsBranch"
  | "strategyGoal"
  | "strategyHorizons"
  | "contact";

type Question = {
  id: string;
  label: string;
  type: InputType;
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

type ProductItem = {
  name: string;
  value: number;
  touched: boolean;
};

type SeasonalityPoint = {
  month: string;
  value: number;
};

type ChannelDistribution = {
  values: Record<string, number>;
  touched: Record<string, boolean>;
};

const BRAND = {
  yellow: "#f7d237",
  greenDark: "#1f7a67",
};

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

const CJM_STAGES = [
  {
    stage: "Acquisition",
    description: "Первый контакт клиента с вами",
  },
  {
    stage: "Activation",
    description: "Момент, когда клиент начинает взаимодействие",
  },
  {
    stage: "Value Realization",
    description: "Когда клиент понимает ценность вашего продукта",
  },
  {
    stage: "Conversion",
    description: "Этап оплаты или принятия решения о покупке",
  },
  {
    stage: "Retention",
    description: "Повторное взаимодействие или продолжение работы",
  },
] as const;

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
        type: "tags",
      },
    ],
  },
  {
    id: "product",
    title: "Продукт и продажи",
    subtitle: "Маржинальность, retention, CJM",
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
        type: "text",
      },
    ],
  },
  {
    id: "structure",
    title: "Структура и процессы",
    subtitle: "Команда, связи, нагрузка",
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
        type: "teamRelations",
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
    subtitle: "Data maturity и улучшения",
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
    subtitle: "Цели, расходы, горизонты",
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
        type: "strategyHorizons",
      },
    ],
  },
  {
    id: "contact",
    title: "Контактный блок",
    subtitle: "Кому отправить отчёт",
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

function hasDigit(input: string) {
  return /\d/.test(input);
}

function cleanTextLength(value: string | undefined | null) {
  return String(value ?? "").trim().length;
}

function clamp(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
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

function createInitialSeasonalityPoints(): SeasonalityPoint[] {
  return MONTHS.map((month) => ({ month, value: 0 }));
}

const initialAnswers: Answers = {
  margin: { value: 0, touched: false, note: "" },
  salesCount: "",
  revenue: "",
  kpis: { selected: [], custom: [] },
  clientProfile: "",
  demandCapacity: {
    demand: 0,
    capacity: 0,
    touched: { demand: false, capacity: false },
  },
  acquisitionChannels: { selected: [], custom: [] },
  channelEfficiency: {
    values: {},
    touched: {},
  },
  topProducts: [
    { name: "", value: 0, touched: false },
    { name: "", value: 0, touched: false },
    { name: "", value: 0, touched: false },
  ] as ProductItem[],
  retention: { selected: [], custom: [] },
  cjm: {
    stages: CJM_STAGES.map((item) => ({
      stage: item.stage,
      description: item.description,
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
  positionText: {
    stages: [],
    customStages: [],
    text: "",
  },
  geo: {
    physical: "",
    sales: "",
  },
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
  analytics: {
    hasAnalytics: null,
    tags: [],
    custom: [],
    note: "",
  },
  changesNeeded: "",
  implemented: "",
  goal: {
    profitTarget: 0,
    mode: "",
    costChange: "",
    touched: false,
  },
  horizons: {
    m3: "",
    m6: "",
    m12: "",
  },
  contacts: {
    reportEmail: "",
    meetingContact: "",
  },
};

function getTagState(value: any): { selected: string[]; custom: string[] } {
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
    .map((member) => member.position.trim())
    .filter(Boolean)
    .filter((role, index, arr) => arr.indexOf(role) === index);

  const result: TeamLink[] = [];

  for (let i = 0; i < roles.length; i += 1) {
    for (let j = i + 1; j < roles.length; j += 1) {
      result.push({
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

  return result;
}

function mergeTeamLinks(prev: TeamLink[], nextBase: TeamLink[]) {
  const prevMap = new Map(prev.map((item) => [item.id, item]));
  return nextBase.map((item) => prevMap.get(item.id) ?? item);
}

function getQuestionProgress(question: Question, answers: Answers): number {
  const value = answers[question.id];

  switch (question.id) {
    case "margin":
      return value?.touched ? 100 : 0;

    case "salesCount":
    case "revenue":
      return hasDigit(String(value ?? "")) ? 100 : 0;

    case "positionText":
      return cleanTextLength(value?.text) >= 80 && getAllTagValues(value).length > 0 ? 100 : 0;

    case "geo":
      return cleanTextLength(value?.physical) > 0 && cleanTextLength(value?.sales) > 0 ? 100 : 0;

    case "clientProfile":
    case "decisions":
    case "changesNeeded":
    case "implemented":
      return cleanTextLength(value) > 0 ? 100 : 0;

    case "kpis":
    case "retention":
    case "acquisitionChannels":
      return getAllTagValues(value).length > 0 ? 100 : 0;

    case "demandCapacity":
      return value?.touched?.demand && value?.touched?.capacity ? 100 : 0;

    case "channelEfficiency": {
      const selectedChannels = getAllTagValues(answers.acquisitionChannels);
      const state: ChannelDistribution = value ?? { values: {}, touched: {} };
      if (selectedChannels.length === 0) return 0;
      const touchedAll = selectedChannels.every((channel) => state.touched?.[channel]);
      const total = selectedChannels.reduce(
        (acc, channel) => acc + Number(state.values?.[channel] ?? 0),
        0
      );
      return touchedAll && total === 100 ? 100 : 0;
    }

    case "topProducts": {
      const items: ProductItem[] = value ?? [];
      const allNamed = items.length === 3 && items.every((item) => cleanTextLength(item.name) > 0);
      const allTouched = items.length === 3 && items.every((item) => item.touched);
      return allNamed && allTouched ? 100 : 0;
    }

    case "cjm": {
      const stages = value?.stages ?? [];
      const ok = stages.every((stage: any) => {
        return (
          cleanTextLength(stage.whatHappens) > 0 &&
          cleanTextLength(stage.duration) > 0 &&
          cleanTextLength(stage.clientGets) > 0 &&
          cleanTextLength(stage.companyGets) > 0
        );
      });
      return ok ? 100 : 0;
    }

    case "seasonality": {
      const hasMovement = (value?.points ?? []).some((p: SeasonalityPoint) => Math.abs(p.value) >= 10);
      return hasMovement && cleanTextLength(value?.peaksReason) > 0 && cleanTextLength(value?.lowsReason) > 0
        ? 100
        : 0;
    }

    case "team": {
      const members: TeamMember[] = value ?? [];
      const ok = members.every((member) => {
        return (
          cleanTextLength(member.position) > 0 &&
          cleanTextLength(member.responsibility) > 0 &&
          member.isDecisionMaker !== "" &&
          member.participatesIn.length > 0
        );
      });
      return ok ? 100 : 0;
    }

    case "interaction": {
      const links: TeamLink[] = value?.links ?? [];
      if (!links.length) return 0;
      const aligned = links.every(
        (link) =>
          link.metrics.speed >= 1 &&
          link.metrics.communication >= 1 &&
          link.metrics.infoQuality >= 1
      );
      return aligned ? 100 : 0;
    }

    case "stress":
    case "lossZones":
      return STRESS_ZONES.every((zone) => value?.touched?.[zone]) ? 100 : 0;

    case "analytics":
      if (value?.hasAnalytics === false) return 100;
      if (value?.hasAnalytics === true) {
        return getAllTagValues({ selected: value.tags, custom: value.custom }).length > 0 ? 100 : 0;
      }
      return 0;

    case "goal":
      return value?.touched && cleanTextLength(value?.mode) > 0 ? 100 : 0;

    case "horizons":
      return cleanTextLength(value?.m3) > 0 && cleanTextLength(value?.m6) > 0 && cleanTextLength(value?.m12) > 0
        ? 100
        : 0;

    case "contacts":
      return cleanTextLength(value?.reportEmail) > 0 && cleanTextLength(value?.meetingContact) > 0 ? 100 : 0;

    default:
      return cleanTextLength(value) > 0 ? 100 : 0;
  }
}

function getChapterProgress(chapter: Chapter, answers: Answers): number {
  const total = chapter.questions.length;
  const filled = chapter.questions.filter((question) => getQuestionProgress(question, answers) === 100).length;
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
      rows={minRows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";

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
  value: { selected: string[]; custom: string[] };
  baseTags: string[];
  onChange: (next: { selected: string[]; custom: string[] }) => void;
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

  function toggleBase(tag: string) {
    onChange({
      selected: value.selected.includes(tag)
        ? value.selected.filter((item) => item !== tag)
        : [...value.selected, tag],
      custom: value.custom,
    });
  }

  function removeCustom(tag: string) {
    onChange({
      selected: value.selected,
      custom: value.custom.filter((item) => item !== tag),
    });
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
              onClick={() => toggleBase(tag)}
              className={`rounded-full border px-3.5 py-2 text-sm transition ${
                active
                  ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2] shadow-[0_0_18px_rgba(247,210,55,0.15)]"
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
            onClick={() => removeCustom(tag)}
            className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3.5 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/15"
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
            value={customValue}
            placeholder="Добавить свой вариант"
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
                          ? member.participatesIn.filter((item) => item !== tag)
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
        className="flex h-[92px] w-full items-center justify-center rounded-[24px] border border-dashed border-white/16 bg-white/[0.03] text-4xl text-white/55 transition hover:border-[#f7d237]/30 hover:bg-[#f7d237]/6 hover:text-[#fff3b2]"
      >
        +
      </button>
    </div>
  );
}

function RelationScale({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="mt-3 flex min-h-[60px] items-end gap-3">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border text-xl transition ${
              active
                ? "border-[#f7d237]/40 bg-[#f7d237]/10 text-[#fff3b2]"
                : "border-white/12 bg-white/[0.03] text-white/65"
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
  const generatedBase = createTeamLinksFromMembers(teamMembers);
  const links = mergeTeamLinks(value?.links ?? [], generatedBase);
  const note = value?.note ?? "";

  useEffect(() => {
    const currentIds = (value?.links ?? []).map((item) => item.id).join("|");
    const nextIds = links.map((item) => item.id).join("|");
    if (currentIds !== nextIds) {
      onChange({ links, note });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamMembers]);

  function updateMetric(linkId: string, patch: Partial<TeamLinkMetric>) {
    onChange({
      links: links.map((link) =>
        link.id === linkId ? { ...link, metrics: { ...link.metrics, ...patch } } : link
      ),
      note,
    });
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5">
        <div className="mb-3 text-sm uppercase tracking-[0.22em] text-white/35">
          Связки между ролями
        </div>

        {links.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/45">
            Сначала заполните роли в вопросе выше.
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="mb-5 text-sm font-medium text-white">
                  {link.fromRole} ↔ {link.toRole}
                </div>

                <div className="grid items-end gap-6 lg:grid-cols-3">
                  <div className="flex h-full flex-col justify-between">
                    <div className="min-h-[72px] text-sm leading-7 text-white/60">
                      Скорость выполнения изменений
                    </div>
                    <RelationScale
                      value={link.metrics.speed}
                      onChange={(next) => updateMetric(link.id, { speed: next })}
                    />
                  </div>

                  <div className="flex h-full flex-col justify-between">
                    <div className="min-h-[72px] text-sm leading-7 text-white/60">Коммуникация</div>
                    <RelationScale
                      value={link.metrics.communication}
                      onChange={(next) => updateMetric(link.id, { communication: next })}
                    />
                  </div>

                  <div className="flex h-full flex-col justify-between">
                    <div className="min-h-[72px] text-sm leading-7 text-white/60">
                      Качество передаваемой информации
                    </div>
                    <RelationScale
                      value={link.metrics.infoQuality}
                      onChange={(next) => updateMetric(link.id, { infoQuality: next })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <div className="mb-2 text-sm text-white/55">Комментарий</div>
          <AutoTextarea
            className={textareaClass}
            minRows={2}
            placeholder="Опишите, как именно выстроено взаимодействие между ролями и что изменилось за год"
            value={note}
            onChange={(next) => onChange({ links, note: next })}
          />
        </div>
      </div>
    </div>
  );
}

function SeasonalityChart({
  value,
  onChange,
}: {
  value: {
    points: SeasonalityPoint[];
    peaksReason: string;
    lowsReason: string;
  };
  onChange: (next: {
    points: SeasonalityPoint[];
    peaksReason: string;
    lowsReason: string;
  }) => void;
}) {
  const points = value?.points ?? createInitialSeasonalityPoints();
  const peaksReason = value?.peaksReason ?? "";
  const lowsReason = value?.lowsReason ?? "";

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const width = 1000;
  const height = 250;
  const paddingX = 55;
  const paddingY = 32;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  function pointXY(index: number, val: number) {
    const x = paddingX + (chartWidth / (points.length - 1)) * index;
    const y = paddingY + chartHeight / 2 - (val / 100) * (chartHeight / 2 - 8);
    return { x, y };
  }

  function smoothPath(items: SeasonalityPoint[]) {
    const coords = items.map((item, index) => pointXY(index, item.value));
    if (!coords.length) return "";
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i += 1) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  }

  function updatePoint(index: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const localY = clientY - rect.top;
    const center = paddingY + chartHeight / 2;
    const relative = center - localY;
    const nextValue = clamp(Math.round((relative / (chartHeight / 2 - 8)) * 100), -100, 100);

    const nextPoints = points.map((point, i) =>
      i === index ? { ...point, value: nextValue } : point
    );

    onChange({
      points: nextPoints,
      peaksReason,
      lowsReason,
    });
  }

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (dragIndex === null) return;
      updatePoint(dragIndex, e.clientY);
    }

    function handleUp() {
      setDragIndex(null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragIndex, points, peaksReason, lowsReason]);

  const peakMonths = points.filter((point) => point.value >= 25).map((point) => point.month);
  const lowMonths = points.filter((point) => point.value <= -25).map((point) => point.month);

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-[#2a8b74]/35 bg-[#1d5b4d]/18 px-4 py-2 text-sm text-[#d7fff0]">
            Пики
          </div>
          <div className="rounded-2xl border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff3b2]">
            Спады
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/55">
            Двигайте точки по вертикали
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] bg-[#051a47]">
          <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="h-[290px] w-full">
            {[0, 1, 2, 3].map((i) => {
              const y = paddingY + (chartHeight / 3) * i;
              return (
                <line
                  key={`h-${i}`}
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                />
              );
            })}

            {points.map((_, i) => {
              const x = paddingX + (chartWidth / (points.length - 1)) * i;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  x2={x}
                  y1={paddingY}
                  y2={height - paddingY}
                  stroke="rgba(255,255,255,0.04)"
                />
              );
            })}

            <line
              x1={paddingX}
              x2={width - paddingX}
              y1={paddingY + chartHeight / 2}
              y2={paddingY + chartHeight / 2}
              stroke="rgba(255,255,255,0.22)"
              strokeDasharray="6 6"
            />

            <path
              d={smoothPath(points)}
              fill="none"
              stroke="#7fd2ff"
              strokeWidth="4"
              style={{ filter: "drop-shadow(0 0 10px rgba(127,210,255,0.25))" }}
            />

            {points.map((point, index) => {
              const { x, y } = pointXY(index, point.value);
              const pointColor =
                point.value >= 25
                  ? "#38c89a"
                  : point.value <= -25
                    ? "#f0cb2c"
                    : "#f3f3f3";

              const glow =
                point.value >= 25
                  ? "drop-shadow(0 0 14px rgba(56,200,154,0.28))"
                  : point.value <= -25
                    ? "drop-shadow(0 0 14px rgba(240,203,44,0.28))"
                    : "drop-shadow(0 0 10px rgba(255,255,255,0.2))";

              return (
                <g key={point.month}>
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill={pointColor}
                    stroke="rgba(255,255,255,0.22)"
                    style={{ cursor: "grab", filter: glow }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragIndex(index);
                    }}
                  />
                  <text
                    x={x}
                    y={height - 10}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="13"
                  >
                    {point.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[#2a8b74]/28 bg-[linear-gradient(180deg,rgba(23,73,63,0.32),rgba(23,73,63,0.14))] p-4">
          <div className="mb-2 text-lg font-medium text-[#d7fff0]">Пики</div>
          <div className="mb-3 text-sm text-white/60">
            {peakMonths.length ? peakMonths.join(", ") : "Пока не выделено выраженных пиков"}
          </div>
          <AutoTextarea
            className={textareaClass}
            minRows={2}
            placeholder="Что влияет и от чего зависит?"
            value={peaksReason}
            onChange={(next) =>
              onChange({
                points,
                peaksReason: next,
                lowsReason,
              })
            }
          />
        </div>

        <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/[0.04] p-4">
          <div className="mb-2 text-lg font-medium text-[#fff3b2]">Спады</div>
          <div className="mb-3 text-sm text-white/60">
            {lowMonths.length ? lowMonths.join(", ") : "Пока не выделено выраженных спадов"}
          </div>
          <AutoTextarea
            className={textareaClass}
            minRows={2}
            placeholder="Что влияет и от чего зависит?"
            value={lowsReason}
            onChange={(next) =>
              onChange({
                points,
                peaksReason,
                lowsReason: next,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

function FullScreenLoader({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#071325]/92 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[560px] px-6">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 p-3">
            <div className="h-full w-full animate-spin rounded-full border-2 border-[#f7d237]/25 border-t-[#f7d237]" />
          </div>

          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">
              Revenue Snapshot
            </div>
            <div className="mt-3 text-2xl font-semibold text-white">
              Отправляем вводные на генерацию
            </div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Пожалуйста, не закрывайте страницу
            </p>
            <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
              <div className="h-2 w-full animate-pulse bg-[linear-gradient(90deg,rgba(247,210,55,0.15),rgba(247,210,55,0.9),rgba(247,210,55,0.15))]" />
            </div>
          </div>
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
      const current = answers[question.id] ?? { value: 0, touched: false, note: "" };

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>0%</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[#f7d237]">
              {current.value}%
            </span>
            <span>100%</span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={current.value}
            onChange={(e) =>
              setAnswer(question.id, {
                ...current,
                value: Number(e.target.value),
                touched: true,
              })
            }
            className="w-full accent-[#f7d237]"
          />

          <AutoTextarea
            minRows={2}
            className={textareaClass}
            placeholder="Комментарий или контекст…"
            value={current.note}
            onChange={(next) =>
              setAnswer(question.id, {
                ...current,
                note: next,
              })
            }
          />
        </div>
      );
    }

    case "text": {
      if (question.id === "positionText") {
        const current = answers[question.id] ?? { stages: [], customStages: [], text: "" };

        return (
          <div className="space-y-4">
            <TagField
              label="Стадия бизнеса"
              value={{
                selected: current.stages ?? [],
                custom: current.customStages ?? [],
              }}
              baseTags={BUSINESS_STAGE_TAGS}
              onChange={(next) =>
                setAnswer(question.id, {
                  stages: next.selected,
                  customStages: next.custom,
                  text: current.text ?? "",
                })
              }
            />

            <AutoTextarea
              minRows={2}
              className={textareaClass}
              placeholder="Опишите ваш бизнес"
              value={current.text ?? ""}
              onChange={(next) =>
                setAnswer(question.id, {
                  ...current,
                  text: next,
                })
              }
            />
          </div>
        );
      }

      if (question.id === "geo") {
        const current = answers[question.id] ?? { physical: "", sales: "" };

        return (
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className={compactInputClass}
              placeholder="Где физически находится бизнес"
              value={current.physical}
              onChange={(e) => setAnswer(question.id, { ...current, physical: e.target.value })}
            />
            <input
              className={compactInputClass}
              placeholder="В каком регионе продаёте"
              value={current.sales}
              onChange={(e) => setAnswer(question.id, { ...current, sales: e.target.value })}
            />
          </div>
        );
      }

      return (
        <AutoTextarea
          minRows={2}
          className={textareaClass}
          placeholder="Введите ответ…"
          value={answers[question.id] ?? ""}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );
    }

    case "tags": {
      if (question.id === "channelEfficiency") {
        const selectedChannels = getAllTagValues(answers.acquisitionChannels);
        const state: ChannelDistribution = answers.channelEfficiency ?? {
          values: {},
          touched: {},
        };

        if (!selectedChannels.length) {
          return (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
              Сначала выберите каналы в предыдущем вопросе.
            </div>
          );
        }

        const total = selectedChannels.reduce(
          (acc, channel) => acc + Number(state.values?.[channel] ?? 0),
          0
        );

        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <div className="text-sm text-white/60">
                Распределите входящий поток клиентов между выбранными каналами
              </div>
              <div
                className={`rounded-full px-3 py-1 text-sm ${
                  total === 100
                    ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                    : "border border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]"
                }`}
              >
                {total}%
              </div>
            </div>

            <div className="space-y-4">
              {selectedChannels.map((channel) => {
                const value = Number(state.values?.[channel] ?? 0);
                const remainingWithoutCurrent = selectedChannels.reduce((acc, currentChannel) => {
                  if (currentChannel === channel) return acc;
                  return acc + Number(state.values?.[currentChannel] ?? 0);
                }, 0);

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
                        const requested = Number(e.target.value);
                        const allowed = Math.max(0, 100 - remainingWithoutCurrent);
                        const nextValue = Math.min(requested, allowed);

                        setAnswer("channelEfficiency", {
                          values: {
                            ...state.values,
                            [channel]: nextValue,
                          },
                          touched: {
                            ...state.touched,
                            [channel]: true,
                          },
                        });
                      }}
                      className="w-full accent-[#f7d237]"
                    />

                    <div className="mt-2 text-xs text-white/35">
                      Можно добавить ещё: {Math.max(0, 100 - remainingWithoutCurrent)}%
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                total === 100
                  ? "border-emerald-400/18 bg-emerald-400/10 text-emerald-100"
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

      const source =
        question.id === "kpis"
          ? KPI_TAGS
          : question.id === "acquisitionChannels"
            ? FLOW_TAGS
            : question.id === "retention"
              ? RETENTION_TAGS
              : ANALYTICS_TAGS;

      const state = getTagState(answers[question.id]);

      return (
        <TagField
          value={state}
          baseTags={source}
          onChange={(next) => {
            setAnswer(question.id, next);

            if (question.id === "acquisitionChannels") {
              const channels = [...next.selected, ...next.custom];
              const prevState: ChannelDistribution = answers.channelEfficiency ?? {
                values: {},
                touched: {},
              };

              const nextValues: Record<string, number> = {};
              const nextTouched: Record<string, boolean> = {};

              channels.forEach((channel) => {
                nextValues[channel] = prevState.values?.[channel] ?? 0;
                nextTouched[channel] = prevState.touched?.[channel] ?? false;
              });

              setAnswer("channelEfficiency", {
                values: nextValues,
                touched: nextTouched,
              });
            }
          }}
        />
      );
    }

    case "dualRange": {
      const current = answers[question.id] ?? {
        demand: 0,
        capacity: 0,
        touched: { demand: false, capacity: false },
      };

      return (
        <div className="grid gap-5 md:grid-cols-2">
          <RangeBlock
            title="Обращения / заявки"
            value={current.demand}
            min={0}
            max={500}
            onChange={(value) =>
              setAnswer(question.id, {
                ...current,
                demand: value,
                touched: { ...current.touched, demand: true },
              })
            }
          />

          <RangeBlock
            title="Реальная capacity"
            value={current.capacity}
            min={0}
            max={500}
            onChange={(value) =>
              setAnswer(question.id, {
                ...current,
                capacity: value,
                touched: { ...current.touched, capacity: true },
              })
            }
          />
        </div>
      );
    }

    case "tripleMargin": {
      const items: ProductItem[] = answers[question.id] ?? initialAnswers.topProducts;

      return (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <input
                  className={compactInputClass}
                  placeholder={`Продукт ${index + 1}`}
                  value={item.name}
                  onChange={(e) => {
                    const next = [...items];
                    next[index] = { ...next[index], name: e.target.value };
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
                  const next = [...items];
                  next[index] = {
                    ...next[index],
                    value: Number(e.target.value),
                    touched: true,
                  };
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
      const current = answers[question.id] ?? initialAnswers.cjm;

      return (
        <div className="grid gap-4 md:grid-cols-2">
          {current.stages.map((step: any, index: number) => (
            <div
              key={step.stage}
              className={`rounded-[24px] border border-white/8 bg-white/[0.04] p-4 ${
                index === current.stages.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-4">
                <div className="text-xs uppercase tracking-[0.24em] text-white/35">
                  Stage {index + 1}
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">{step.stage}</div>
                <div className="mt-1 text-sm text-white/50">{step.description}</div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-2 text-sm text-white/55">Что происходит</div>
                  <AutoTextarea
                    minRows={2}
                    className={textareaClass}
                    placeholder="Опишите, что происходит на этом этапе"
                    value={step.whatHappens}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[index] = { ...nextStages[index], whatHappens: next };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Длительность</div>
                  <input
                    className={compactInputClass}
                    placeholder="Например: 1 день / 2 недели"
                    value={step.duration}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[index] = { ...nextStages[index], duration: e.target.value };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Что получает клиент</div>
                  <AutoTextarea
                    minRows={2}
                    className={textareaClass}
                    placeholder="Ценность для клиента"
                    value={step.clientGets}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[index] = { ...nextStages[index], clientGets: next };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Что получает компания</div>
                  <AutoTextarea
                    minRows={2}
                    className={textareaClass}
                    placeholder="Результат для бизнеса"
                    value={step.companyGets}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[index] = { ...nextStages[index], companyGets: next };
                      setAnswer(question.id, { ...current, stages: nextStages });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/45">Проблемы (опционально)</div>
                  <AutoTextarea
                    minRows={2}
                    className={textareaClass}
                    placeholder="Где здесь возникают потери"
                    value={step.problems}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[index] = { ...nextStages[index], problems: next };
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
      const current = answers[question.id] ?? initialAnswers.seasonality;
      return <SeasonalityChart value={current} onChange={(next) => setAnswer(question.id, next)} />;
    }

    case "teamRoles":
      return (
        <TeamMembersBuilder
          value={answers[question.id] ?? [createEmptyTeamMember()]}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );

    case "teamRelations":
      return (
        <TeamRelationsBuilder
          value={answers[question.id] ?? { links: [], note: "" }}
          teamMembers={answers.team ?? []}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );

    case "stressRange": {
      const current = answers[question.id] ?? initialAnswers[question.id];

      return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STRESS_ZONES.map((zone) => (
            <div key={zone} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm font-medium text-white">{zone}</div>
              <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                <span>-10</span>
                <span className="text-[#fff3b2]">{current.values[zone]}</span>
                <span>10</span>
              </div>
              <input
                type="range"
                min={-10}
                max={10}
                value={current.values[zone]}
                onChange={(e) =>
                  setAnswer(question.id, {
                    values: {
                      ...current.values,
                      [zone]: Number(e.target.value),
                    },
                    touched: {
                      ...current.touched,
                      [zone]: true,
                    },
                  })
                }
                className="w-full accent-[#f7d237]"
              />
            </div>
          ))}
        </div>
      );
    }

    case "analyticsBranch": {
      const current = answers[question.id] ?? initialAnswers.analytics;

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

              <TagField
                value={{ selected: current.tags ?? [], custom: current.custom ?? [] }}
                baseTags={ANALYTICS_TAGS}
                onChange={(next) =>
                  setAnswer(question.id, {
                    ...current,
                    tags: next.selected,
                    custom: next.custom,
                  })
                }
              />

              <div className="mt-4">
                <AutoTextarea
                  minRows={2}
                  className={textareaClass}
                  placeholder="Как аналитика участвует в принятии решений"
                  value={current.note ?? ""}
                  onChange={(next) => setAnswer(question.id, { ...current, note: next })}
                />
              </div>
            </div>
          )}
        </div>
      );
    }

    case "strategyGoal": {
      const current = answers[question.id] ?? initialAnswers.goal;
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
                setAnswer(question.id, {
                  ...current,
                  profitTarget: Number(e.target.value),
                  touched: true,
                })
              }
              className="w-full accent-[#f7d237]"
            />
          </div>

          <div className="text-sm text-white/50">
            Статус расходов к которому стремитесь до конца года
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {modes.map((option) => (
              <button
                key={option}
                type="button"
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
            className={compactInputClass}
            placeholder="Если применимо — укажите процент изменения расходов"
            value={current.costChange}
            onChange={(e) => setAnswer(question.id, { ...current, costChange: e.target.value })}
          />
        </div>
      );
    }

    case "strategyHorizons": {
      const current = answers[question.id] ?? initialAnswers.horizons;

      return (
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="mb-2 text-sm text-white/55">План на 3 месяца</div>
            <AutoTextarea
              minRows={2}
              className={textareaClass}
              placeholder="Опишите фокус на 3 месяца"
              value={current.m3 ?? ""}
              onChange={(next) => setAnswer(question.id, { ...current, m3: next })}
            />
          </div>

          <div>
            <div className="mb-2 text-sm text-white/55">План на 6 месяцев</div>
            <AutoTextarea
              minRows={2}
              className={textareaClass}
              placeholder="Опишите фокус на 6 месяцев"
              value={current.m6 ?? ""}
              onChange={(next) => setAnswer(question.id, { ...current, m6: next })}
            />
          </div>

          <div>
            <div className="mb-2 text-sm text-white/55">План на 12 месяцев</div>
            <AutoTextarea
              minRows={2}
              className={textareaClass}
              placeholder="Опишите фокус на 12 месяцев"
              value={current.m12 ?? ""}
              onChange={(next) => setAnswer(question.id, { ...current, m12: next })}
            />
          </div>
        </div>
      );
    }

    case "contact": {
      const current = answers[question.id] ?? initialAnswers.contacts;

      return (
        <div className="space-y-4">
          <input
            className={compactInputClass}
            placeholder="Email получателя отчёта"
            value={current.reportEmail}
            onChange={(e) => setAnswer(question.id, { ...current, reportEmail: e.target.value })}
          />
          <input
            className={compactInputClass}
            placeholder="Email / имя участника онлайн-встречи"
            value={current.meetingContact}
            onChange={(e) => setAnswer(question.id, { ...current, meetingContact: e.target.value })}
          />
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionProgress = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((chapter) => [chapter.id, getChapterProgress(chapter, answers)])
      ),
    [answers]
  );

  const total = useMemo(() => {
    const values = Object.values(sectionProgress) as number[];
    return values.length ? values.reduce((acc, value) => acc + value, 0) / values.length : 0;
  }, [sectionProgress]);

  const totalQuestions = useMemo(
    () => chapters.reduce((acc, chapter) => acc + chapter.questions.length, 0),
    []
  );

  const allComplete = Math.round(total)
