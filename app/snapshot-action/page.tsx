"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  MapPinned,
  Target,
  Users,
  Wallet,
  BarChart3,
  Workflow,
  Lightbulb,
  Mail,
  CalendarRange,
  Gauge,
} from "lucide-react";

const BRAND = {
  bg: "#0b1d3a",
  bgSoft: "#10244a",
  line: "rgba(255,255,255,0.08)",
  text: "#fefefe",
  textSoft: "#a5aeb2",
  heading: "#e0e1e3",
  yellow: "#f7d237",
};

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
  | "contact";

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
  icon: React.ComponentType<any>;
  questions: Question[];
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

const chapters: Chapter[] = [
  {
    id: "economics",
    title: "Экономика",
    subtitle: "Маржа, выручка, объём, KPI",
    icon: Wallet,
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
    icon: Users,
    questions: [
      { id: "clientProfile", label: "Кто ваши основные клиенты и какой сегмент самый прибыльный?", type: "text" },
      { id: "demandCapacity", label: "Сколько обращений вы получаете и сколько реально можете обработать?", type: "dualRange" },
      { id: "acquisitionChannels", label: "Откуда к вам обычно приходят клиенты?", type: "tags" },
      { id: "channelEfficiency", label: "Какие каналы сейчас дают результат, а какие вы уже пробовали?", type: "rangePercent" },
    ],
  },
  {
    id: "product",
    title: "Продукт и продажи",
    subtitle: "Маржинальные продукты, retention, CJM",
    icon: Target,
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
    icon: MapPinned,
    questions: [
      { id: "positionText", label: "Расскажите о вашем бизнесе: чем занимаетесь, как давно работаете и как вас воспринимают клиенты.", type: "text" },
      { id: "geo", label: "В каком регионе вы продаёте и где физически находится ваш бизнес?", type: "map" },
    ],
  },
  {
    id: "structure",
    title: "Структура и процессы",
    subtitle: "Команда, нагрузка, потери эффективности",
    icon: Workflow,
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
    icon: BarChart3,
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
    icon: Lightbulb,
    questions: [
      { id: "goal", label: "Какого результата бизнес должен достичь к концу года?", type: "strategyGoal" },
      { id: "horizons", label: "Вокруг чего вы строите планы на 3, 6 и 12 месяцев?", type: "text" },
    ],
  },
  {
    id: "contact",
    title: "Контактный блок",
    subtitle: "Кому отправить отчёт и встречу",
    icon: Mail,
    questions: [{ id: "contacts", label: "Кому отправить развёрнутый отчёт и кого пригласить на онлайн-встречу?", type: "contact" }],
  },
];

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
          className="transition-all duration-500"
          style={{ filter: "drop-shadow(0 0 10px rgba(247,210,55,0.45))" }}
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
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          background:
            "linear-gradient(90deg, rgba(247,210,55,0.95), rgba(255,231,122,0.95))",
          boxShadow: "0 0 20px rgba(247,210,55,0.35)",
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
      {children}
    </div>
  );
}

export default function DiagnosticIntakePage() {
  const [active, setActive] = useState<Chapter | null>(chapters[0]);

  const sectionProgress = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((chapter, index) => {
          const base = [42, 56, 48, 32, 28, 36, 22, 10][index] ?? 0;
          return [chapter.id, base];
        })
      ),
    []
  );

  const total = useMemo(() => {
    const values = Object.values(sectionProgress);
    return values.reduce((acc, v) => acc + v, 0) / values.length;
  }, [sectionProgress]);

  const completedSections = useMemo(
    () => Object.values(sectionProgress).filter((v) => v >= 95).length,
    [sectionProgress]
  );

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <GlassCard className="mb-8 p-5 md:p-7">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                <CircleDot className="h-3.5 w-3.5 text-[#f7d237]" />
                Revenue Snapshot — Diagnostic Intake
              </div>
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">
                Структурированная диагностическая анкета бизнеса
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                Экран построен под вашу структуру вопросов: каждая глава — отдельная карточка с локальной
                заполненностью, внутри — pop-up на половину экрана с соответствующим типом ввода.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Общий прогресс заполнения</span>
                  <span className="font-medium text-white">{Math.round(total)}%</span>
                </div>
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
                  <div className="mt-2 text-2xl font-semibold text-[#e0e1e3]">{active?.title}</div>
                  <div className="mt-2 max-w-sm text-sm leading-6 text-[#a5aeb2]">{active?.subtitle}</div>
                </div>
                <Ring progress={active ? sectionProgress[active.id] : 0} size={92} />
              </div>
              <div className="mt-6 grid gap-3 text-sm text-white/70">
                {(active?.questions ?? []).map((q, i) => (
                  <div key={q.id} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                    <span className="pr-4 text-white/72">{i + 1}. {q.label}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/35" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {chapters.map((chapter) => {
            const Icon = chapter.icon;
            const progress = sectionProgress[chapter.id];
            return (
              <motion.button
                key={chapter.id}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActive(chapter)}
                className="text-left"
              >
                <GlassCard className="h-full p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                      <Icon className="h-5 w-5 text-[#f7d237]" />
                    </div>
                    <Ring progress={progress} size={82} />
                  </div>

                  <div className="mt-6">
                    <div className="text-xl font-semibold text-[#fefefe]">{chapter.title}</div>
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

                  <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm">
                    <span className="text-white/55">Открыть блок</span>
                    <div className="flex items-center gap-2 text-[#f7d237]">
                      <span>Подробнее</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </GlassCard>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setActive(null)}
            />

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 h-screen w-full max-w-[920px] overflow-y-auto border-l border-white/10 bg-[#08162df2] backdrop-blur-3xl"
            >
              <div className="sticky top-0 z-10 border-b border-white/8 bg-[#08162dd9] px-5 py-4 backdrop-blur-2xl md:px-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/40">diagnostic chapter</div>
                    <div className="mt-1 text-2xl font-semibold text-[#fefefe]">{active.title}</div>
                    <div className="mt-1 text-sm text-[#a5aeb2]">{active.subtitle}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ring progress={sectionProgress[active.id]} size={84} />
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
                  <GlassCard key={question.id} className="p-5 md:p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">Question {index + 1}</div>
                        <h3 className="mt-2 text-lg font-medium leading-7 text-[#fefefe]">{question.label}</h3>
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm text-[#f7d237]">
                        {index + 1}
                      </div>
                    </div>
                    {renderInput(question)}
                  </GlassCard>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/8 bg-white/[0.04] px-5 py-4">
                  <div className="text-sm text-white/55">Ниже заложена логика для постепенного сохранения и валидации ответов.</div>
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-[#f7d237] px-5 py-3 text-sm font-medium text-[#0b1d3a] transition hover:brightness-105">
                    Сохранить блок
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function renderInput(question: Question) {
  switch (question.type) {
    case "rangePercent":
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>0%</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[#f7d237]">64%</span>
            <span>100%</span>
          </div>
          <input type="range" min={0} max={100} defaultValue={64} className="w-full accent-[#f7d237]" />
          <textarea placeholder="Комментарий или контекст…" className={textareaClass} rows={4} />
        </div>
      );

    case "text":
      return <textarea placeholder="Введите ответ…" className={textareaClass} rows={5} />;

    case "tags": {
      const source =
        question.id === "kpis"
          ? KPI_TAGS
          : question.id === "acquisitionChannels"
            ? FLOW_TAGS
            : question.id === "retention"
              ? RETENTION_TAGS
              : ANALYTICS_TAGS;

      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2.5">
            {source.map((tag, i) => (
              <button
                key={tag}
                className={`rounded-full border px-3.5 py-2 text-sm transition ${
                  i < 4
                    ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <input placeholder="Добавить свой тег…" className={inputClass} />
        </div>
      );
    }

    case "dualRange":
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <RangeBlock title="Обращения / заявки" value="120" />
          <RangeBlock title="Реальная capacity" value="85" />
        </div>
      );

    case "tripleMargin":
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((n, i) => (
            <div key={n} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <input placeholder={`Продукт ${n}`} className={inputClass} />
                <div className="min-w-[86px] rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-2 text-center text-sm text-[#fff3b2]">
                  {[42, 31, 22][i]}%
                </div>
              </div>
              <input type="range" min={0} max={100} defaultValue={[42, 31, 22][i]} className="w-full accent-[#f7d237]" />
            </div>
          ))}
        </div>
      );

    case "cjm":
      return (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            {[
              "Лид",
              "Контакт",
              "Сделка",
              "Положительный опыт",
            ].map((step, i) => (
              <div key={step} className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/35">Stage {i + 1}</div>
                <div className="mt-2 text-sm font-medium text-white">{step}</div>
                <input placeholder="Длительность" className={`${inputClass} mt-3`} />
              </div>
            ))}
          </div>
          <textarea placeholder="Опишите этапы подробнее…" className={textareaClass} rows={4} />
        </div>
      );

    case "seasonality":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
            {[
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
            ].map((month, i) => (
              <button
                key={month}
                className={`rounded-2xl border px-3 py-3 text-sm ${
                  i === 5 || i === 11
                    ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]"
                    : i === 1 || i === 8
                      ? "border-rose-400/20 bg-rose-400/10 text-rose-200"
                      : "border-white/10 bg-white/[0.03] text-white/70"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <textarea placeholder="Почему хорошо?" className={textareaClass} rows={4} />
            <textarea placeholder="Почему плохо?" className={textareaClass} rows={4} />
          </div>
        </div>
      );

    case "map":
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
            <input className={inputClass} placeholder="Где физически находится бизнес" />
            <input className={inputClass} placeholder="В каком регионе продаёте" />
          </div>
        </div>
      );

    case "stressRange":
      return (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Маркетинг",
            "Продажи",
            "Операционка",
            "Управление",
          ].map((zone, i) => (
            <div key={zone} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 text-sm font-medium text-white">{zone}</div>
              <div className="mb-3 flex items-center justify-between text-xs text-white/45">
                <span>-10</span>
                <span className={`${i === 2 ? "text-rose-200" : "text-[#fff3b2]"}`}>{[2, 5, 8, 4][i]}</span>
                <span>10</span>
              </div>
              <input type="range" min={-10} max={10} defaultValue={[2, 5, 8, 4][i]} className="w-full accent-[#f7d237]" />
            </div>
          ))}
        </div>
      );

    case "analyticsBranch":
      return (
        <div className="space-y-4">
          <div className="flex gap-3">
            <button className="rounded-2xl border border-[#f7d237]/30 bg-[#f7d237]/10 px-4 py-2.5 text-sm text-[#fff3b2]">Да</button>
            <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70">Нет</button>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 text-sm text-white/55">Если да — что именно вы используете?</div>
            <div className="mb-4 flex flex-wrap gap-2.5">
              {ANALYTICS_TAGS.map((tag, i) => (
                <button key={tag} className={`rounded-full border px-3.5 py-2 text-sm ${i < 3 ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>
                  {tag}
                </button>
              ))}
            </div>
            <textarea placeholder="Опишите, как именно аналитика участвует в принятии решений…" className={textareaClass} rows={4} />
          </div>
        </div>
      );

    case "strategyGoal":
      return (
        <div className="space-y-5">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center justify-between text-sm text-white/60">
              <span>Цель по чистой прибыли</span>
              <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">+35%</span>
            </div>
            <input type="range" min={0} max={100} defaultValue={35} className="w-full accent-[#f7d237]" />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              "On hold",
              "Не превысить лимит",
              "Сократить расходы",
            ].map((option, i) => (
              <button key={option} className={`rounded-2xl border px-4 py-4 text-sm ${i === 1 ? "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#fff3b2]" : "border-white/10 bg-white/[0.03] text-white/70"}`}>
                {option}
              </button>
            ))}
          </div>
          <input className={inputClass} placeholder="Если применимо — укажите процент изменения расходов" />
        </div>
      );

    case "contact":
      return (
        <div className="space-y-4">
          <input className={inputClass} placeholder="Email получателя отчёта" />
          <input className={inputClass} placeholder="Email / имя участника онлайн-встречи" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
              <div className="mb-2 flex items-center gap-2 text-white/80"><Mail className="h-4 w-4 text-[#f7d237]" /> Отправка отчёта</div>
              Автоматически после завершения диагностики.
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/60">
              <div className="mb-2 flex items-center gap-2 text-white/80"><CalendarRange className="h-4 w-4 text-[#f7d237]" /> Приглашение на встречу</div>
              Можно связать со слотами и защитой от повторного входа.
            </div>
          </div>
        </div>
      );

    default:
      return <textarea placeholder="Введите ответ…" className={textareaClass} rows={4} />;
  }
}

function RangeBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between text-sm text-white/60">
        <span>{title}</span>
        <span className="rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[#fff3b2]">{value}</span>
      </div>
      <input type="range" min={0} max={200} defaultValue={Number(value)} className="w-full accent-[#f7d237]" />
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";

const textareaClass =
  "w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#f7d237]/35 focus:bg-white/[0.05]";
