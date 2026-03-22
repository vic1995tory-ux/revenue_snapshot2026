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

const BRAND = {
  yellow: "#f7d237",
};

const KPI_TAGS = ["Выручка", "Маржа", "ROMI", "CAC", "LTV", "Средний чек", "Конверсия в продажу", "Retention", "NPS", "Скорость сделки", "Загрузка команды", "Cash Flow"];
const FLOW_TAGS = ["Instagram", "Meta Ads", "Google Ads", "SEO", "Рефералы", "Партнёрства", "Холодный outreach", "Telegram", "YouTube", "Marketplace"];
const RETENTION_TAGS = ["Повторные продажи", "Подписка", "Комьюнити", "Email nurturing", "Личный менеджер", "Апсейлы", "Пакеты услуг", "Реферальная программа"];
const ANALYTICS_TAGS = ["Рынок", "Ниша", "Сегменты", "Каналы", "Продажи", "Юнит-экономика", "Retention", "Команда"];
const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const CJM_STAGES = [
  "Acquisition",
  "Activation",
  "Value Realization",
  "Conversion",
  "Retention",
] as const;

const CJM_STAGE_DESCRIPTIONS: Record<(typeof CJM_STAGES)[number], string> = {
  Acquisition: "Первый контакт клиента с вами",
  Activation: "Момент, когда клиент начинает взаимодействовать (первое действие)",
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
      { id: "margin", label: "Какая часть выручки остаётся после всех расходов?", type: "rangePercent" },
      { id: "salesCount", label: "Сколько клиентов или продаж у вас было за прошлый месяц?", type: "text" },
      { id: "revenue", label: "Какая выручка была у вас за прошлый месяц?", type: "text" },
      { id: "kpis", label: "Какие ключевые метрики, показатели и KPI вы регулярно отслеживаете?", type: "tags" },
    ],
  },
  {
    id: "flow",
    title: "Клиенты и поток",
    subtitle: "Сегмент, спрос, capacity, каналы",
    icon: "◎",
    questions: [
      { id: "clientProfile", label: "Кто ваши основные клиенты и какой сегмент самый прибыльный?", type: "text" },
      { id: "demandCapacity", label: "Сколько обращений вы получаете и сколько реально можете обработать?", type: "dualRange" },
      { id: "acquisitionChannels", label: "Откуда к вам обычно приходят клиенты?", type: "tags" },
{ id: "channelEfficiency", label: "Как распределяется входящий поток клиентов между выбранными каналами?", type: "channelDistribution" },
    ],
  },
  {
    id: "product",
    title: "Продукт и продажи",
    subtitle: "Маржинальные продукты, retention, CJM",
    icon: "◈",
    questions: [
      { id: "topProducts", label: "Какие 1–3 продукта или услуги самые маржинальные?", type: "tripleMargin" },
      { id: "retention", label: "Какими механиками вы удерживаете клиентов?", type: "tags" },
      { id: "cjm", label: "Как проходит путь клиента от первого обращения до положительного опыта?", type: "cjm" },
      { id: "seasonality", label: "Есть ли пики и спады продаж и чем они объясняются?", type: "seasonality" },
    ],
  },
  {
    id: "positioning",
    title: "Позиционирование",
    subtitle: "Описание бизнеса и география",
    icon: "◌",
    questions: [
      { id: "positionText", label: "Расскажите о вашем бизнесе: чем занимаетесь, как давно работаете и как вас воспринимают клиенты.", type: "text" },
      { id: "geo", label: "В каком регионе вы продаёте и где физически находится ваш бизнес?", type: "map" },
    ],
  },
  {
    id: "structure",
    title: "Структура и процессы",
    subtitle: "Команда, нагрузка, потери эффективности",
    icon: "▣",
    questions: [
      { id: "team", label: "Как устроена команда: роли, зоны ответственности, перегруз?", type: "text" },
      { id: "interaction", label: "Как выстроено взаимодействие между ролями и что изменилось за год?", type: "text" },
      { id: "decisions", label: "Кто и как принимает решения о внедрении новых решений, подрядчиков или инструментов?", type: "text" },
      { id: "stress", label: "Где вы как руководитель сильнее всего ощущаете напряжение или перегруз?", type: "stressRange" },
      { id: "lossZones", label: "В каких зонах бизнеса теряется эффективность?", type: "stressRange" },
    ],
  },
  {
    id: "analytics",
    title: "Аналитика и управление",
    subtitle: "Решения, изменения, data maturity",
    icon: "▤",
    questions: [
      { id: "analytics", label: "Какую аналитику по рынку, нише или сегментам вы используете при принятии решений?", type: "analyticsBranch" },
      { id: "changesNeeded", label: "Что сейчас больше всего требует изменений или улучшений в бизнесе?", type: "text" },
      { id: "implemented", label: "Какие инструменты, процессы или улучшения вы внедрили за последние 6 месяцев?", type: "text" },
    ],
  },
  {
    id: "strategy",
    title: "Стратегия",
    subtitle: "Цели, расходы, горизонты 3/6/12",
    icon: "✦",
    questions: [
      { id: "goal", label: "Какого результата бизнес должен достичь к концу года?", type: "strategyGoal" },
      { id: "horizons", label: "Вокруг чего вы строите планы на 3, 6 и 12 месяцев?", type: "text" },
    ],
  },
  {
    id: "contact",
    title: "Контактный блок",
    subtitle: "Кому отправить отчёт и встречу",
    icon: "✉",
    questions: [{ id: "contacts", label: "Кому отправить развёрнутый отчёт и кого пригласить на онлайн-встречу?", type: "contact" }],
  },
];

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
  team: "",
  interaction: "",
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

    if ("peak" in value && "low" in value) {
      return (
        (value.peak?.length ?? 0) > 0 ||
        (value.low?.length ?? 0) > 0 ||
        String(value.goodReason ?? "").trim().length > 0 ||
        String(value.badReason ?? "").trim().length > 0
      );
    }

    if ("stages" in value && Array.isArray(value.stages)) {
      return value.stages.some((stage: any) =>
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
function Ring({ progress, size = 110 }: { progress: number; size?: number }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" className="-rotate-90">
        <circle cx="44" cy="44" r={normalizedRadius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="transparent" />
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
          style={{ filter: "drop-shadow(0 0 10px rgba(247,210,55,0.45))", transition: "all 0.35s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-white">{Math.round(progress)}%</div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">filled</div>
      </div>
    </div>
  );
}

function SectionProgress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, rgba(247,210,55,0.95), rgba(255,231,122,0.95))",
          boxShadow: "0 0 20px rgba(247,210,55,0.35)",
          transition: "width 0.35s ease",
        }}
      />
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl ${className}`}
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_26%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function RangeBlock({ title, value, min, max, onChange }: { title: string; value: number; min: number; max: number; onChange: (val: number) => void }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-white/60">
        <span>{title}</span>
        <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[#f7d237]" />
    </div>
  );
}

const inputClass = "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";
const textareaClass = "w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";
type SeasonalityRange = {
  id: string;
  start: number;
  end: number;
  reason: string;
};

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

function removeOverlappingRanges(
  ranges: SeasonalityRange[],
  start: number,
  end: number
) {
  const normalized = normalizeRange(start, end);
  return ranges.filter(
    (range) => range.end < normalized.start || range.start > normalized.end
  );
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

  function updateReason(
    type: "peak" | "low",
    id: string,
    reason: string
  ) {
    if (type === "peak") {
      onChange({
        ...value,
        peakRanges: peakRanges.map((range) =>
          range.id === id ? { ...range, reason } : range
        ),
      });
    } else {
      onChange({
        ...value,
        lowRanges: lowRanges.map((range) =>
          range.id === id ? { ...range, reason } : range
        ),
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
            className={`rounded-2xl border px-3 py-4 text-sm transition select-none ${monthClass(
              index
            )}`}
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
              <div key={range.id} className="rounded-[24px] border border-emerald-300/20 bg-emerald-400/8 p-4">
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
              <div key={range.id} className="rounded-[24px] border border-[#f7d237]/20 bg-[#f7d237]/8 p-4">
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
function renderInput(question: Question, answers: Answers, setAnswer: (key: string, value: any) => void) {
  switch (question.type) {
    case "rangePercent": {
      const value = answers[question.id]?.value ?? 0;
      const note = answers[question.id]?.note ?? "";
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>0%</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[#f7d237]">{value}%</span>
            <span>100%</span>
          </div>
          <input type="range" min={0} max={100} value={value} onChange={(e) => setAnswer(question.id, { value: Number(e.target.value), note })} className="w-full accent-[#f7d237]" />
          <textarea placeholder="Комментарий или контекст…" className={textareaClass} rows={4} value={note} onChange={(e) => setAnswer(question.id, { value, note: e.target.value })} />
        </div>
      );
    }

    case "text":
      return <textarea placeholder="Введите ответ…" className={textareaClass} rows={5} value={answers[question.id] ?? ""} onChange={(e) => setAnswer(question.id, e.target.value)} />;

    case "tags": {
      const source = question.id === "kpis" ? KPI_TAGS : question.id === "acquisitionChannels" ? FLOW_TAGS : question.id === "retention" ? RETENTION_TAGS : ANALYTICS_TAGS;
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
                  className={`rounded-full border px-3.5 py-2 text-sm transition ${active ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]"}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    case "dualRange": {
      const current = answers[question.id] ?? { demand: 0, capacity: 0 };
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <RangeBlock title="Обращения / заявки" value={current.demand} min={0} max={500} onChange={(val) => setAnswer(question.id, { ...current, demand: val })} />
          <RangeBlock title="Реальная capacity" value={current.capacity} min={0} max={500} onChange={(val) => setAnswer(question.id, { ...current, capacity: val })} />
        </div>
      );
    }

    case "tripleMargin": {
      const products = answers[question.id] ?? [{ name: "", value: 0 }, { name: "", value: 0 }, { name: "", value: 0 }];
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
                <div className="min-w-[86px] rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-2 text-center text-sm text-[#fff3b2]">{item.value}%</div>
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
    <div className="space-y-4">
      {current.stages.map((step: any, i: number) => (
        <div key={step.stage} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5">
          <div className="mb-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-[0.24em] text-white/35">
              Stage {i + 1}
            </div>
            <div className="text-base font-medium text-white">{step.stage}</div>
            <div className="text-sm text-white/50">{step.description}</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
                rows={4}
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
                rows={4}
                value={step.companyGets}
                onChange={(e) => {
                  const nextStages = [...current.stages];
                  nextStages[i] = { ...nextStages[i], companyGets: e.target.value };
                  setAnswer(question.id, { ...current, stages: nextStages });
                }}
              />
            </div>
          </div>

          <div className="mt-4">
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
      ))}
    </div>
  );
}
case "seasonality": {
  const current = answers[question.id] ?? {
    peakRanges: [],
    lowRanges: [],
  };

  return (
    <SeasonalityCalendar
      value={current}
      onChange={(next) => setAnswer(question.id, next)}
    />
  );
}

    case "map": {
      const current = answers[question.id] ?? { physical: "", sales: "" };
      return (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(247,210,55,0.14),transparent_25%),radial-gradient(circle_at_70%_65%,rgba(87,179,179,0.10),transparent_22%)]" />
            <div className="relative h-[260px] rounded-[20px] border border-white/10 bg-[#091224]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 260" fill="none">
                <path d="M60 170C145 132 145 90 230 98C318 106 336 182 430 158C499 140 530 80 568 70" stroke="rgba(247,210,55,0.95)" strokeWidth="2.2" strokeDasharray="5 7" />
                <circle cx="230" cy="98" r="5" fill="#f7d237" />
                <circle cx="430" cy="158" r="5" fill="#f7d237" />
                <circle cx="568" cy="70" r="5" fill="#f7d237" />
              </svg>
              <div className="absolute left-[35%] top-[34%] rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10 px-3 py-1.5 text-xs text-[#fff3b2]">Физическая локация</div>
              <div className="absolute left-[67%] top-[58%] rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-100">Регион продаж</div>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input className={inputClass} placeholder="Где физически находится бизнес" value={current.physical} onChange={(e) => setAnswer(question.id, { ...current, physical: e.target.value })} />
            <input className={inputClass} placeholder="В каком регионе продаёте" value={current.sales} onChange={(e) => setAnswer(question.id, { ...current, sales: e.target.value })} />
          </div>
        </div>
      );
    }

    case "stressRange": {
      const current = answers[question.id] ?? { Маркетинг: 0, Продажи: 0, Операционка: 0, Управление: 0 };
      return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STRESS_ZONES.map((zone) => (
            <div key={zone} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm font-medium text-white">{zone}</div>
              <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                <span>-10</span>
                <span className={current[zone] >= 7 ? "text-rose-200" : "text-[#fff3b2]"}>{current[zone]}</span>
                <span>10</span>
              </div>
              <input type="range" min={-10} max={10} value={current[zone]} onChange={(e) => setAnswer(question.id, { ...current, [zone]: Number(e.target.value) })} className="w-full accent-[#f7d237]" />
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
            <button type="button" onClick={() => setAnswer(question.id, { ...current, hasAnalytics: true })} className={`rounded-2xl border px-4 py-2.5 text-sm ${current.hasAnalytics === true ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>Да</button>
            <button type="button" onClick={() => setAnswer(question.id, { ...current, hasAnalytics: false })} className={`rounded-2xl border px-4 py-2.5 text-sm ${current.hasAnalytics === false ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>Нет</button>
          </div>
          {current.hasAnalytics === true && (
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm text-white/55">Если да — что именно вы используете?</div>
              <div className="mb-4 flex flex-wrap gap-2.5">
                {ANALYTICS_TAGS.map((tag) => {
                  const active = current.tags.includes(tag);
                  return (
                    <button type="button" key={tag} onClick={() => setAnswer(question.id, { ...current, tags: active ? current.tags.filter((t: string) => t !== tag) : [...current.tags, tag] })} className={`rounded-full border px-3.5 py-2 text-sm ${active ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>{tag}</button>
                  );
                })}
              </div>
              <textarea placeholder="Опишите, как именно аналитика участвует в принятии решений…" className={textareaClass} rows={4} value={current.note} onChange={(e) => setAnswer(question.id, { ...current, note: e.target.value })} />
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
              <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">+{current.profitTarget}%</span>
            </div>
            <input type="range" min={0} max={100} value={current.profitTarget} onChange={(e) => setAnswer(question.id, { ...current, profitTarget: Number(e.target.value) })} className="w-full accent-[#f7d237]" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {modes.map((option) => (
              <button type="button" key={option} onClick={() => setAnswer(question.id, { ...current, mode: option })} className={`rounded-2xl border px-4 py-4 text-sm ${current.mode === option ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>{option}</button>
            ))}
          </div>
          <input className={inputClass} placeholder="Если применимо — укажите процент изменения расходов" value={current.costChange} onChange={(e) => setAnswer(question.id, { ...current, costChange: e.target.value })} />
        </div>
      );
    }

    case "contact": {
      const current = answers[question.id] ?? { reportEmail: "", meetingContact: "" };
      return (
        <div className="space-y-4">
          <input className={inputClass} placeholder="Email получателя отчёта" value={current.reportEmail} onChange={(e) => setAnswer(question.id, { ...current, reportEmail: e.target.value })} />
          <input className={inputClass} placeholder="Email / имя участника онлайн-встречи" value={current.meetingContact} onChange={(e) => setAnswer(question.id, { ...current, meetingContact: e.target.value })} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60"><div className="mb-2 flex items-center gap-2 text-white/80"><span className="text-[#f7d237]">✉</span> Отправка отчёта</div>Автоматически после завершения диагностики.</div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60"><div className="mb-2 flex items-center gap-2 text-white/80"><span className="text-[#f7d237]">◷</span> Приглашение на встречу</div>Можно связать со слотами и защитой от повторного входа.</div>
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

  const sectionProgress = useMemo(() => Object.fromEntries(chapters.map((chapter) => [chapter.id, getChapterProgress(chapter, answers)])), [answers]);
  const total = useMemo(() => {
    const values = Object.values(sectionProgress) as number[];
    return values.length ? values.reduce((acc, v) => acc + v, 0) / values.length : 0;
  }, [sectionProgress]);

  const previewChapter = active ?? chapters[0];
  const previewProgress = Number(sectionProgress[previewChapter.id] || 0);
  const completedSections = useMemo(() => Object.values(sectionProgress).filter((v) => Number(v) >= 100).length, [sectionProgress]);

  function setAnswer(key: string, value: any) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)" }}>
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <GlassCard className="mb-8 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45"><span className="text-[#f7d237]">●</span>Revenue Snapshot — Diagnostic Intake</div>
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">Структурированная диагностическая анкета бизнеса</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">Экран построен под вашу структуру вопросов: каждая глава — отдельная карточка с локальной заполненностью, внутри — pop-up на половину экрана с соответствующим типом ввода.</p>
              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between text-sm text-white/70"><span>Общий прогресс заполнения</span><span className="font-medium text-white">{Math.round(total)}%</span></div>
                <SectionProgress value={total} />
                <div className="flex flex-wrap gap-3 pt-2 text-xs text-white/45">
                  <span className="rounded-full border border-white/10 px-3 py-1.5">Глав: {chapters.length}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">Полностью завершено: {completedSections}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1.5">Формат: card → half-screen modal</span>
                </div>
              </div>
            </div>

            <GlassCard className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.26em] text-white/40">Current focus</div>
                  <div className="mt-2 text-2xl font-semibold text-[#e0e1e3]">{previewChapter.title}</div>
                  <div className="mt-2 max-w-sm text-sm leading-6 text-[#a5aeb2]">{previewChapter.subtitle}</div>
                </div>
                <Ring progress={previewProgress} size={92} />
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/70">
                {previewChapter.questions.map((q, i) => (
                  <div key={q.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <span className="pr-4 text-white/72">{i + 1}. {q.label}</span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/55">{getQuestionProgress(q, answers)}%</span>
                  </div>
                ))}
              </div>
              {previewProgress === 100 && <button className="mt-5 w-full rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-semibold text-[#0b1d3a] transition hover:brightness-105">Готово</button>}
            </GlassCard>
          </div>
        </GlassCard>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {chapters.map((chapter) => {
            const progress = Number(sectionProgress[chapter.id]);
            return (
              <button key={chapter.id} onClick={() => setActive(chapter)} className="translate-y-0 text-left transition duration-300 hover:-translate-y-1.5">
                <GlassCard className="h-full p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-[#f7d237]">{chapter.icon}</div>
                    <Ring progress={progress} size={82} />
                  </div>
                  <div className="mt-6">
                    <div className="text-xl font-semibold text-[#fefefe]">{chapter.title}</div>
                    <div className="mt-2 text-sm leading-6 text-[#a5aeb2]">{chapter.subtitle}</div>
                  </div>
                  <div className="mt-6 space-y-2.5">
                    {chapter.questions.slice(0, 3).map((question, i) => (
                      <div key={question.id} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[10px]">{i + 1}</span>
                        <span className="line-clamp-2">{question.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm"><span className="text-white/55">Открыть блок</span><div className="flex items-center gap-2 text-[#f7d237]"><span>{progress}%</span><span>→</span></div></div>
                </GlassCard>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-[920px] overflow-y-auto border-l border-white/10 bg-[#08162df2] backdrop-blur-3xl">
            <div className="sticky top-0 z-10 border-b border-white/8 bg-[#08162dd9] px-5 py-4 backdrop-blur-2xl md:px-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">diagnostic chapter</div>
                  <div className="mt-1 text-2xl font-semibold text-[#fefefe]">{active.title}</div>
                  <div className="mt-1 text-sm text-[#a5aeb2]">{active.subtitle}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Ring progress={Number(sectionProgress[active.id])} size={84} />
                  <button onClick={() => setActive(null)} className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/[0.05] hover:text-white">Закрыть</button>
                </div>
              </div>
            </div>
            <div className="space-y-5 px-5 py-5 md:px-7 md:py-7">
              {active.questions.map((question, index) => (
                <GlassCard key={question.id} className="p-5 md:p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">Question {index + 1}</div>
                      <h3 className="mt-2 text-lg font-medium leading-7 text-[#fefefe]">{question.label}</h3>
                    </div>
                    <div className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-2 text-sm text-[#f7d237]">{getQuestionProgress(question, answers)}%</div>
                  </div>
                  {renderInput(question, answers, setAnswer)}
                </GlassCard>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/8 bg-white/[0.04] px-5 py-4">
                <div className="text-sm text-white/55">Прогресс этого блока: {Number(sectionProgress[active.id])}%</div>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105">Сохранить блок<span>✓</span></button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
