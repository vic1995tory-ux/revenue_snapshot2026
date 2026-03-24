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

type TouchMap = Record<string, boolean>;

type ChannelDistribution = {
  values: Record<string, number>;
  touched: Record<string, boolean>;
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

type SeasonalityPoint = {
  month: string;
  value: number;
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

const BRAND = {
  yellow: "#f7d237",
  bg: "#0b1d3a",
  bg2: "#08162d",
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
        label:
          "Какие ключевые метрики, показатели и KPI вы регулярно отслеживаете?",
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
        label:
          "Сколько обращений вы получаете и сколько реально можете обработать?",
        type: "dualRange",
      },
      {
        id: "acquisitionChannels",
        label: "Откуда к вам обычно приходят клиенты?",
        type: "tags",
      },
      {
        id: "channelEfficiency",
        label:
          "Как распределяется входящий поток клиентов между выбранными каналами?",
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
        label:
          "Как проходит путь клиента от первого обращения до положительного опыта?",
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
        label:
          "В каком регионе вы продаёте и где физически находится ваш бизнес?",
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
        label:
          "Как выстроено взаимодействие между ролями и что изменилось за год?",
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
        label:
          "Где вы как руководитель сильнее всего ощущаете напряжение или перегруз?",
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
        label:
          "Что сейчас больше всего требует изменений или улучшений в бизнесе?",
        type: "text",
      },
      {
        id: "implemented",
        label:
          "Какие инструменты, процессы или улучшения вы внедрили за последние 6 месяцев?",
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
        label:
          "Кому отправить развёрнутый отчёт и кого пригласить на онлайн-встречу?",
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

function createInitialSeasonalityPoints(): SeasonalityPoint[] {
  return MONTHS.map((month) => ({ month, value: 0 }));
}

const initialAnswers: Answers = {
  margin: { value: 0, note: "", touched: false },
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
  positionText: { text: "", stages: [], customStages: [] },
  geo: { physical: "", sales: "" },
  team: [createEmptyTeamMember()],
  interaction: {
    links: [],
    note: "",
  },
  decisions: "",
  stress: {
    values: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
    touched: {
      Маркетинг: false,
      Продажи: false,
      Операционка: false,
      Управление: false,
    },
  },
  lossZones: {
    values: { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 },
    touched: {
      Маркетинг: false,
      Продажи: false,
      Операционка: false,
      Управление: false,
    },
  },
  analytics: { hasAnalytics: null, tags: [], custom: [], note: "" },
  changesNeeded: "",
  implemented: "",
  goal: { profitTarget: 0, mode: "", costChange: "", touched: false },
  horizons: { plan3: "", plan6: "", plan12: "" },
  contacts: { reportEmail: "", meetingContact: "" },
};

function getTagState(value: any): { selected: string[]; custom: string[] } {
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

function geoPointFromText(value: string, fallback = { x: 580, y: 170 }) {
  const text = value.toLowerCase();

  const presets = [
    {
      keys: ["тбилиси", "груз", "georgia", "tbilisi"],
      point: { x: 604, y: 149 },
    },
    { keys: ["кипр", "cyprus"], point: { x: 577, y: 184 } },
    { keys: ["герман", "berlin", "germany"], point: { x: 517, y: 124 } },
    { keys: ["поль", "poland", "warsaw"], point: { x: 545, y: 121 } },
    { keys: ["эстон", "tallinn", "estonia"], point: { x: 557, y: 92 } },
    { keys: ["латв", "riga", "latvia"], point: { x: 553, y: 104 } },
    { keys: ["литв", "vilnius", "lithuania"], point: { x: 550, y: 112 } },
    { keys: ["испан", "madrid", "spain"], point: { x: 455, y: 170 } },
    { keys: ["португал", "lisbon", "portugal"], point: { x: 430, y: 175 } },
    { keys: ["нидерл", "amsterdam", "netherlands"], point: { x: 500, y: 119 } },
    { keys: ["финля", "helsinki", "finland"], point: { x: 568, y: 84 } },
    { keys: ["серби", "belgrade", "serbia"], point: { x: 555, y: 145 } },
    { keys: ["венгр", "budapest", "hungary"], point: { x: 551, y: 136 } },
    {
      keys: ["лондон", "uk", "united kingdom", "england"],
      point: { x: 470, y: 113 },
    },
    {
      keys: ["usa", "new york", "united states", "america"],
      point: { x: 228, y: 145 },
    },
    { keys: ["канада", "canada", "toronto"], point: { x: 220, y: 105 } },
    { keys: ["браз", "brazil"], point: { x: 314, y: 279 } },
    { keys: ["дубай", "uae", "emirates"], point: { x: 625, y: 190 } },
    { keys: ["инд", "india", "delhi"], point: { x: 734, y: 189 } },
    { keys: ["сингап", "singapore"], point: { x: 815, y: 275 } },
    { keys: ["австра", "sydney", "australia"], point: { x: 930, y: 321 } },
    { keys: ["япон", "tokyo", "japan"], point: { x: 900, y: 160 } },
  ];

  for (const preset of presets) {
    if (preset.keys.some((key) => text.includes(key))) return preset.point;
  }

  return fallback;
}

function getQuestionProgress(question: Question, answers: Answers): number {
  const value = answers[question.id];

  switch (question.id) {
    case "margin":
      return value?.touched && Number(value?.value ?? 0) >= 0 ? 100 : 0;

    case "salesCount":
    case "revenue":
      return /\d/.test(String(value ?? "")) ? 100 : 0;

    case "clientProfile":
    case "changesNeeded":
    case "implemented":
    case "decisions":
      return textLength(value) > 0 ? 100 : 0;

    case "horizons":
      return textLength(value?.plan3) > 0 &&
        textLength(value?.plan6) > 0 &&
        textLength(value?.plan12) > 0
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
      const state: ChannelDistribution = value ?? { values: {}, touched: {} };
      if (selectedChannels.length === 0) return 0;
      const allTouched = selectedChannels.every(
        (channel) => state.touched?.[channel],
      );
      const total = selectedChannels.reduce(
        (acc, channel) => acc + Number(state.values?.[channel] ?? 0),
        0,
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
      const hasMovement = points.some((p) => Math.abs(p.value) >= 10);
      const peaksReason = textLength(value?.peaksReason) >= 30;
      const lowsReason = textLength(value?.lowsReason) >= 30;
      return hasMovement && peaksReason && lowsReason ? 100 : 0;
    }

    case "positionText":
      return (
        textLength(value?.text) >= 80 &&
        ((value?.stages?.length ?? 0) + (value?.customStages?.length ?? 0) > 0)
      )
        ? 100
        : 0;

    case "geo":
      return textLength(value?.physical) > 0 && textLength(value?.sales) > 0
        ? 100
        : 0;

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
      const touched: TouchMap = value?.touched ?? {};
      return STRESS_ZONES.every((zone) => touched[zone]) ? 100 : 0;
    }

    case "analytics": {
      if (value?.hasAnalytics === false) return 100;
      if (value?.hasAnalytics === true) {
        return getAllTagValues({ selected: value.tags, custom: value.custom })
          .length > 0
          ? 100
          : 0;
      }
      return 0;
    }

    case "goal":
      return value?.touched && textLength(value?.mode) > 0 ? 100 : 0;

    case "contacts":
      return textLength(value?.reportEmail) > 0 &&
        textLength(value?.meetingContact) > 0
        ? 100
        : 0;

    default:
      return 0;
  }
}

function getChapterProgress(chapter: Chapter, answers: Answers): number {
  const total = chapter.questions.length;
  const filled = chapter.questions.filter(
    (q) => getQuestionProgress(q, answers) === 100,
  ).length;
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
      <svg
        width={size}
        height={size}
        viewBox="0 0 88 88"
        className="-rotate-90"
      >
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
            filter: "drop-shadow(0 0 4px rgba(247,210,55,0.22))",
            transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-white">
          {Math.round(progress)}%
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">
          filled
        </div>
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
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow:
          "0 18px 56px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.045)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.09),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.045),transparent_24%)]" />
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
  single = false,
}: {
  label?: string;
  value: { selected: string[]; custom: string[] };
  baseTags: string[];
  onChange: (next: { selected: string[]; custom: string[] }) => void;
  single?: boolean;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const allCustom = value.custom ?? [];
  const selected = value.selected ?? [];

  function addCustomTag() {
    const next = customValue.trim();
    if (!next) return;
    if (selected.includes(next) || allCustom.includes(next)) {
      setCustomValue("");
      setIsAdding(false);
      return;
    }
    onChange({
      selected: single ? [] : selected,
      custom: single ? [next] : [...allCustom, next],
    });
    setCustomValue("");
    setIsAdding(false);
  }

  function toggleBase(tag: string) {
    const isActive = selected.includes(tag);
    onChange({
      selected: single
        ? isActive
          ? []
          : [tag]
        : isActive
          ? selected.filter((t) => t !== tag)
          : [...selected, tag],
      custom: single && !isActive ? [] : allCustom,
    });
  }

  function toggleCustom(tag: string) {
    onChange({
      selected: single ? [] : selected,
      custom: single ? [] : allCustom.filter((t) => t !== tag),
    });
  }

  return (
    <div className="space-y-4">
      {label ? <div className="text-sm text-white/55">{label}</div> : null}

      <div className="flex flex-wrap gap-2.5">
        {baseTags.map((tag) => {
          const active = selected.includes(tag);
          return (
            <button
              type="button"
              key={tag}
              onClick={() => toggleBase(tag)}
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

        {allCustom.map((tag) => (
          <button
            type="button"
            key={`custom-${tag}`}
            onClick={() => toggleCustom(tag)}
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

function GeoMapPreview({
  physical,
  sales,
}: {
  physical: string;
  sales: string;
}) {
  const physicalPoint = geoPointFromText(physical, { x: 575, y: 165 });
  const salesPoint = geoPointFromText(sales, physicalPoint);
  const salesIsWorld =
    sales.toLowerCase().includes("весь мир") ||
    sales.toLowerCase().includes("world") ||
    sales.toLowerCase().includes("global");

  const salesRadius = salesIsWorld ? 240 : 90;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#04122a] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(247,210,55,0.08),transparent_25%),radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.06),transparent_20%)]" />

      <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#001233]">
        <img
          src="/worldmap_w.svg"
          alt="world map"
          className="absolute inset-0 h-full w-full object-contain opacity-28"
        />

        <svg viewBox="0 0 1100 420" className="absolute inset-0 h-full w-full">
          <g opacity="0.1" stroke="rgba(255,255,255,0.12)">
            <line x1="80" y1="70" x2="1020" y2="70" />
            <line x1="80" y1="140" x2="1020" y2="140" />
            <line x1="80" y1="210" x2="1020" y2="210" />
            <line x1="80" y1="280" x2="1020" y2="280" />
            <line x1="80" y1="350" x2="1020" y2="350" />
          </g>

          <circle
            cx={salesPoint.x}
            cy={salesPoint.y}
            r={salesRadius}
            stroke="rgba(111,211,255,0.40)"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="rgba(111,211,255,0.07)"
          />

          <circle
            cx={physicalPoint.x}
            cy={physicalPoint.y}
            r="10"
            fill="#f7d237"
            style={{ filter: "drop-shadow(0 0 16px rgba(247,210,55,0.75))" }}
          />
          <circle
            cx={physicalPoint.x}
            cy={physicalPoint.y}
            r="22"
            fill="rgba(247,210,55,0.12)"
          />

          <g
            transform={`translate(${Math.max(physicalPoint.x - 90, 100)}, ${physicalPoint.y - 52})`}
          >
            <rect
              width="180"
              height="46"
              rx="23"
              fill="rgba(247,210,55,0.12)"
              stroke="rgba(247,210,55,0.35)"
            />
            <text
              x="90"
              y="29"
              textAnchor="middle"
              fill="#fff3b2"
              fontSize="14"
            >
              Физическая локация
            </text>
          </g>

          <g
            transform={`translate(${Math.max(salesPoint.x + 18, 120)}, ${salesPoint.y - 12})`}
          >
            <rect
              width={salesIsWorld ? "126" : "158"}
              height="44"
              rx="22"
              fill="rgba(77,194,255,0.12)"
              stroke="rgba(77,194,255,0.35)"
            />
            <text
              x={salesIsWorld ? "63" : "79"}
              y="28"
              textAnchor="middle"
              fill="#c8f3ff"
              fontSize="14"
            >
              {salesIsWorld ? "Весь мир" : "Радиус продаж"}
            </text>
          </g>
        </svg>
      </div>
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
    onChange(
      members.map((member) =>
        member.id === id ? { ...member, ...patch } : member,
      ),
    );
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
                  onChange={(e) =>
                    updateMember(member.id, { position: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="mb-2 text-sm text-white/55">
                  Главная зона ответственности
                </div>
                <input
                  className={compactInputClass}
                  placeholder="Например: рост продаж / операционка"
                  value={member.responsibility}
                  onChange={(e) =>
                    updateMember(member.id, { responsibility: e.target.value })
                  }
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
                          isDecisionMaker:
                            option as TeamMember["isDecisionMaker"],
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
              <div className="mb-2 text-sm text-white/55">
                Где принимает участие
              </div>
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
        className="flex h-[98px] w-full items-center justify-center rounded-[24px] border border-dashed border-white/16 bg-white/[0.03] text-4xl text-white/55 transition hover:border-[#f7d237]/30 hover:bg-[#f7d237]/6 hover:text-[#fff3b2]"
        aria-label="Добавить карточку"
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
            className={`h-8 w-8 rounded-full border text-xs transition ${
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
        link.id === linkId
          ? { ...link, metrics: { ...link.metrics, ...patch } }
          : link,
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
                <div className="mb-4 text-sm font-medium text-white">
                  {link.fromRole} ↔ {link.toRole}
                </div>

                <div className="grid items-start gap-4 lg:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="mb-2 min-h-[56px] text-sm text-white/55">
                      Скорость выполнения изменений
                    </div>
                    <RelationStars
                      value={link.metrics.speed}
                      onChange={(next) =>
                        updateMetric(link.id, { speed: next })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-2 min-h-[56px] text-sm text-white/55">
                      Коммуникация
                    </div>
                    <RelationStars
                      value={link.metrics.communication}
                      onChange={(next) =>
                        updateMetric(link.id, { communication: next })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-2 min-h-[56px] text-sm text-white/55">
                      Качество передаваемой информации
                    </div>
                    <RelationStars
                      value={link.metrics.infoQuality}
                      onChange={(next) =>
                        updateMetric(link.id, { infoQuality: next })
                      }
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
            minRows={3}
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

  const width = 980;
  const height = 260;
  const paddingX = 28;
  const paddingY = 24;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  function pointXY(index: number, v: number) {
    const x = paddingX + (chartWidth / 11) * index;
    const y = paddingY + chartHeight / 2 - (v / 100) * (chartHeight / 2 - 10);
    return { x, y };
  }

  function smoothPath(values: SeasonalityPoint[]) {
    const coords = values.map((p, index) => pointXY(index, p.value));
    if (coords.length === 0) return "";

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
    const nextValue = clamp(
      Math.round((relative / (chartHeight / 2 - 10)) * 100),
      -100,
      100,
    );

    const nextPoints = points.map((point, i) =>
      i === index ? { ...point, value: nextValue } : point,
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

  const peakMonths = points.filter((p) => p.value >= 25).map((p) => p.month);
  const lowMonths = points.filter((p) => p.value <= -25).map((p) => p.month);

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-teal-500/22 bg-teal-500/10 px-4 py-2 text-sm text-teal-100">
            Пики
          </div>
          <div className="rounded-2xl border border-[#f7d237]/25 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff3b2]">
            Спады
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/55">
            Двигайте точки по вертикали
          </div>
        </div>

        <div className="w-full">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="h-[260px] w-full rounded-[20px] bg-[#071733]"
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const y = paddingY + (chartHeight / 4) * i;
              return (
                <line
                  key={`grid-${i}`}
                  x1={paddingX}
                  x2={width - paddingX}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.08)"
                />
              );
            })}

            <line
              x1={paddingX}
              x2={width - paddingX}
              y1={paddingY + chartHeight / 2}
              y2={paddingY + chartHeight / 2}
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="6 6"
            />

            <path
              d={smoothPath(points)}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="3"
              style={{ filter: "drop-shadow(0 0 12px rgba(125,211,252,0.25))" }}
            />

            {points.map((point, index) => {
              const { x, y } = pointXY(index, point.value);
              const pointColor =
                point.value >= 25
                  ? "#0f766e"
                  : point.value <= -25
                    ? "#f7d237"
                    : "#ffffff";

              return (
                <g key={point.month}>
                  <line
                    x1={x}
                    x2={x}
                    y1={paddingY}
                    y2={height - paddingY}
                    stroke="rgba(255,255,255,0.03)"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="10"
                    fill={pointColor}
                    stroke="rgba(255,255,255,0.28)"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setDragIndex(index);
                    }}
                    style={{
                      cursor: "grab",
                      filter:
                        point.value >= 25
                          ? "drop-shadow(0 0 10px rgba(15,118,110,0.34))"
                          : point.value <= -25
                            ? "drop-shadow(0 0 12px rgba(247,210,55,0.42))"
                            : "drop-shadow(0 0 8px rgba(255,255,255,0.2))",
                    }}
                  />
                  <text
                    x={x}
                    y={height - 8}
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
        <div className="rounded-[24px] border border-teal-500/16 bg-teal-500/6 p-4">
          <div className="mb-2 text-lg font-medium text-teal-100">Пики</div>
          <div className="mb-3 text-sm text-white/60">
            {peakMonths.length > 0
              ? peakMonths.join(", ")
              : "Пока не выделено ярко выраженных пиков"}
          </div>
          <AutoTextarea
            className={textareaClass}
            minRows={3}
            placeholder="Что влияет и от чего зависит?"
            value={peaksReason}
            onChange={(next) =>
              onChange({ points, peaksReason: next, lowsReason })
            }
          />
        </div>

        <div className="rounded-[24px] border border-[#f7d237]/16 bg-[#f7d237]/6 p-4">
          <div className="mb-2 text-lg font-medium text-[#fff3b2]">Спады</div>
          <div className="mb-3 text-sm text-white/60">
            {lowMonths.length > 0
              ? lowMonths.join(", ")
              : "Пока не выделено ярко выраженных спадов"}
          </div>
          <AutoTextarea
            className={textareaClass}
            minRows={3}
            placeholder="Что влияет и от чего зависит?"
            value={lowsReason}
            onChange={(next) =>
              onChange({ points, peaksReason, lowsReason: next })
            }
          />
        </div>
      </div>
    </div>
  );
}

function renderInput(
  question: Question,
  answers: Answers,
  setAnswer: (key: string, value: any) => void,
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
            onChange={(e) =>
              setAnswer(question.id, {
                value: Number(e.target.value),
                note,
                touched: true,
              })
            }
            className="w-full accent-[#f7d237]"
          />

          <AutoTextarea
            placeholder="Комментарий или контекст…"
            className={textareaClass}
            minRows={2}
            value={note}
            onChange={(next) =>
              setAnswer(question.id, {
                value,
                note: next,
                touched: answers[question.id]?.touched ?? false,
              })
            }
          />
        </div>
      );
    }

    case "text": {
      if (question.id === "positionText") {
        const current = answers[question.id] ?? { text: "", stages: [] };

        return (
          <div className="space-y-4">
            <TagField
              label="Стадия бизнеса"
              value={{
                selected: current.stages ?? [],
                custom: current.customStages ?? [],
              }}
              baseTags={BUSINESS_STAGE_TAGS}
              single
              onChange={(next) =>
                setAnswer(question.id, {
                  ...current,
                  stages: next.selected,
                  customStages: next.custom,
                })
              }
            />

            <AutoTextarea
              placeholder="Опишите ваш бизнес"
              className={textareaClass}
              minRows={3}
              value={current.text ?? ""}
              onChange={(next) =>
                setAnswer(question.id, { ...current, text: next })
              }
            />
          </div>
        );
      }

      if (question.id === "horizons") {
        const current = answers[question.id] ?? initialAnswers.horizons;

        return (
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <div className="mb-2 text-sm text-white/55">План на 3 месяца</div>
              <AutoTextarea
                placeholder="Что в фокусе на 3 месяца"
                className={textareaClass}
                minRows={3}
                value={current.plan3 ?? ""}
                onChange={(next) =>
                  setAnswer(question.id, { ...current, plan3: next })
                }
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">
                План на 6 месяцев
              </div>
              <AutoTextarea
                placeholder="Что в фокусе на 6 месяцев"
                className={textareaClass}
                minRows={3}
                value={current.plan6 ?? ""}
                onChange={(next) =>
                  setAnswer(question.id, { ...current, plan6: next })
                }
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">
                План на 12 месяцев
              </div>
              <AutoTextarea
                placeholder="Что в фокусе на 12 месяцев"
                className={textareaClass}
                minRows={3}
                value={current.plan12 ?? ""}
                onChange={(next) =>
                  setAnswer(question.id, { ...current, plan12: next })
                }
              />
            </div>
          </div>
        );
      }

      return (
        <AutoTextarea
          placeholder="Введите ответ…"
          className={textareaClass}
          minRows={3}
          value={answers[question.id] ?? ""}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );
    }

    case "tags": {
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
              const allChannels = [...next.selected, ...next.custom];
              const prev: ChannelDistribution = answers.channelEfficiency ?? {
                values: {},
                touched: {},
              };

              const nextValues: Record<string, number> = {};
              const nextTouched: Record<string, boolean> = {};

              allChannels.forEach((channel) => {
                nextValues[channel] = prev.values?.[channel] ?? 0;
                nextTouched[channel] = prev.touched?.[channel] ?? false;
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
            onChange={(val) =>
              setAnswer(question.id, {
                ...current,
                demand: val,
                touched: { ...current.touched, demand: true },
              })
            }
          />

          <RangeBlock
            title="Реальная capacity"
            value={current.capacity}
            min={0}
            max={500}
            onChange={(val) =>
              setAnswer(question.id, {
                ...current,
                capacity: val,
                touched: { ...current.touched, capacity: true },
              })
            }
          />
        </div>
      );
    }

    case "channelDistribution": {
      const selectedChannels = getAllTagValues(answers.acquisitionChannels);
      const state: ChannelDistribution = answers.channelEfficiency ?? {
        values: {},
        touched: {},
      };

      if (selectedChannels.length === 0) {
        return (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
            Сначала выберите каналы в предыдущем вопросе.
          </div>
        );
      }

      const total = selectedChannels.reduce(
        (acc, channel) => acc + Number(state.values?.[channel] ?? 0),
        0,
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
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]"
              }`}
            >
              {total}%
            </div>
          </div>

          <div className="space-y-4">
            {selectedChannels.map((channel) => {
              const value = Number(state.values?.[channel] ?? 0);
              const otherTotal = selectedChannels.reduce(
                (acc, currentChannel) => {
                  if (currentChannel === channel) return acc;
                  return acc + Number(state.values?.[currentChannel] ?? 0);
                },
                0,
              );
              const maxAllowed = Math.max(0, 100 - otherTotal);

              return (
                <div
                  key={channel}
                  className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-white">
                      {channel}
                    </div>
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
                      const nextValue = Math.min(
                        Number(e.target.value),
                        maxAllowed,
                      );
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
                    Максимум сейчас: {maxAllowed}%
                  </div>
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

    case "tripleMargin": {
      const items: ProductItem[] =
        answers[question.id] ?? initialAnswers.topProducts;

      return (
        <div className="space-y-4">
          {items.map((item, i) => {
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <input
                    placeholder={`Продукт ${i + 1}`}
                    className={compactInputClass}
                    value={item.name}
                    onChange={(e) => {
                      const next = [...items];
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
                    const next = [...items];
                    next[i] = {
                      ...next[i],
                      value: Number(e.target.value),
                      touched: true,
                    };
                    setAnswer(question.id, next);
                  }}
                  className="w-full accent-[#f7d237]"
                />
              </div>
            );
          })}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
            Каждая шкала независима: укажите маржинальность каждого продукта
            отдельно.
          </div>
        </div>
      );
    }

    case "cjm": {
      const current = answers[question.id] ?? initialAnswers.cjm;

      return (
        <div className="grid gap-4 md:grid-cols-2">
          {current.stages.map((step: CjmStage, i: number) => (
            <div
              key={step.stage}
              className={`rounded-[24px] border border-white/8 bg-white/[0.04] p-4 ${
                i === current.stages.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div className="mb-4">
                <div className="text-xs uppercase tracking-[0.24em] text-white/35">
                  Stage {i + 1}
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {step.stage}
                </div>
                <div className="mt-1 text-sm text-white/50">
                  {step.description}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-2 text-sm text-white/55">
                    Что происходит
                  </div>
                  <AutoTextarea
                    placeholder="Опишите, что происходит на этом этапе"
                    className={textareaClass}
                    minRows={2}
                    value={step.whatHappens}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], whatHappens: next };
                      setAnswer(question.id, {
                        ...current,
                        stages: nextStages,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">Длительность</div>
                  <input
                    placeholder="Например: 1 день / 2 недели"
                    className={compactInputClass}
                    value={step.duration}
                    onChange={(e) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = {
                        ...nextStages[i],
                        duration: e.target.value,
                      };
                      setAnswer(question.id, {
                        ...current,
                        stages: nextStages,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">
                    Что получает клиент
                  </div>
                  <AutoTextarea
                    placeholder="Ценность для клиента на этом этапе"
                    className={textareaClass}
                    minRows={2}
                    value={step.clientGets}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], clientGets: next };
                      setAnswer(question.id, {
                        ...current,
                        stages: nextStages,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/55">
                    Что получает компания
                  </div>
                  <AutoTextarea
                    placeholder="Какой результат получает бизнес"
                    className={textareaClass}
                    minRows={2}
                    value={step.companyGets}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], companyGets: next };
                      setAnswer(question.id, {
                        ...current,
                        stages: nextStages,
                      });
                    }}
                  />
                </div>

                <div>
                  <div className="mb-2 text-sm text-white/45">
                    Проблемы (опционально)
                  </div>
                  <AutoTextarea
                    placeholder="Где здесь возникают потери, трение или замедление"
                    className={textareaClass}
                    minRows={2}
                    value={step.problems}
                    onChange={(next) => {
                      const nextStages = [...current.stages];
                      nextStages[i] = { ...nextStages[i], problems: next };
                      setAnswer(question.id, {
                        ...current,
                        stages: nextStages,
                      });
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
      return (
        <SeasonalityChart
          value={current}
          onChange={(next) => setAnswer(question.id, next)}
        />
      );
    }

    case "map": {
      const current = answers[question.id] ?? initialAnswers.geo;

      return (
        <div className="grid gap-3 md:grid-cols-2">
          <input
            className={compactInputClass}
            placeholder="Где физически находится бизнес"
            value={current.physical}
            onChange={(e) =>
              setAnswer(question.id, { ...current, physical: e.target.value })
            }
          />
          <input
            className={compactInputClass}
            placeholder="В каком регионе продаёте"
            value={current.sales}
            onChange={(e) =>
              setAnswer(question.id, { ...current, sales: e.target.value })
            }
          />
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
            <div
              key={zone}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
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
              onClick={() =>
                setAnswer(question.id, { ...current, hasAnalytics: true })
              }
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
              onClick={() =>
                setAnswer(question.id, { ...current, hasAnalytics: false })
              }
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
              <div className="mb-3 text-sm text-white/55">
                Если да — что именно вы используете?
              </div>

              <TagField
                value={{
                  selected: current.tags ?? [],
                  custom: current.custom ?? [],
                }}
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
                  placeholder="Опишите, как именно аналитика участвует в принятии решений…"
                  className={textareaClass}
                  minRows={2}
                  value={current.note ?? ""}
                  onChange={(next) =>
                    setAnswer(question.id, { ...current, note: next })
                  }
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

          <div className="space-y-3">
            <div className="text-sm text-white/50">
              Статус расходов к которому стремитесь до конца года
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {modes.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() =>
                    setAnswer(question.id, { ...current, mode: option })
                  }
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
          </div>

          <input
            className={compactInputClass}
            placeholder="Если применимо — укажите процент изменения расходов"
            value={current.costChange}
            onChange={(e) =>
              setAnswer(question.id, { ...current, costChange: e.target.value })
            }
          />
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
            onChange={(e) =>
              setAnswer(question.id, {
                ...current,
                reportEmail: e.target.value,
              })
            }
          />

          <input
            className={compactInputClass}
            placeholder="Email / имя участника онлайн-встречи"
            value={current.meetingContact}
            onChange={(e) =>
              setAnswer(question.id, {
                ...current,
                meetingContact: e.target.value,
              })
            }
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

export default function DiagnosticIntakePage() {
  const [active, setActive] = useState<Chapter | null>(null);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionProgress = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((chapter) => [
          chapter.id,
          getChapterProgress(chapter, answers),
        ]),
      ),
    [answers],
  );

  const total = useMemo(() => {
    const values = Object.values(sectionProgress) as number[];
    return values.length
      ? values.reduce((acc, v) => acc + v, 0) / values.length
      : 0;
  }, [sectionProgress]);

  const totalQuestions = useMemo(
    () => chapters.reduce((acc, chapter) => acc + chapter.questions.length, 0),
    [],
  );

  const allComplete = Math.round(total) === 100;

  function setAnswer(key: string, value: any) {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "team") {
        const links = mergeTeamLinks(
          prev.interaction?.links ?? [],
          createTeamLinksFromMembers(value ?? []),
        );
        next.interaction = {
          ...(prev.interaction ?? { note: "" }),
          links,
        };
      }

      return next;
    });
  }

  async function handleSubmit() {
    if (!allComplete || isSubmitting) return;

    try {
      setIsSubmitting(true);

      await fetch("/api/generate-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "snapshot-action",
          createdAt: new Date().toISOString(),
          progress: {
            total,
            totalQuestions,
            sectionProgress,
          },
          answers,
        }),
      });
    } catch {
      // intentionally silent for current stage
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1600);
    }
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

      <FullScreenLoader open={isSubmitting} />

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
                Каждая глава — отдельная карточка с локальной заполненностью,
                внутри — half-screen panel с адаптивным типом ввода под
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
                  Диаграмма отражает совокупный прогресс по всем разделам анкеты
                  и обновляется по мере заполнения блоков.
                </p>

                <div className="mt-5 w-full">
                  {allComplete ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105 hover:shadow-[0_0_26px_rgba(247,210,55,0.25)]"
                    >
                      Отправить вводные
                    </button>
                  ) : (
                    <div className="grid w-full grid-cols-2 gap-3 text-left">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Progress
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {Math.round(total)}%
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                          Total blocks
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {chapters.length}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {chapters.map((chapter, index) => {
            const progress = Number(sectionProgress[chapter.id]);

            return (
              <TiltCardButton
                key={chapter.id}
                onClick={() => setActive(chapter)}
              >
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
                    <div className="mt-2 text-xl font-semibold text-[#fefefe]">
                      {chapter.title}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-[#a5aeb2]">
                      {chapter.subtitle}
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {chapter.questions.slice(0, 3).map((question, i) => {
                      const isDone = getQuestionProgress(question, answers) === 100;

                      return (
                        <div
                          key={question.id}
                          className="flex items-start gap-3 text-sm text-white/60"
                        >
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition ${
                              isDone
                                ? "border-[#f7d237]/45 bg-[#f7d237] text-[#0b1d3a] shadow-[0_0_12px_rgba(247,210,55,0.18)]"
                                : "border-white/10 bg-transparent text-white/55"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className="line-clamp-2">{question.label}</span>
                        </div>
                      );
                    })}
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
                  <div className="mt-1 text-2xl font-semibold text-[#fefefe]">
                    {active.title}
                  </div>
                  <div className="mt-1 text-sm text-[#a5aeb2]">
                    {active.subtitle}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Ring
                    progress={Number(sectionProgress[active.id])}
                    size={84}
                  />
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

                      <div className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm text-[#f7d237]">
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

                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105 hover:shadow-[0_0_24px_rgba(247,210,55,0.22)]"
                >
                  Сохранить блок <span>✓</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
