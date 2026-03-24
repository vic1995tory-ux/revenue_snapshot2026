"use client";

import { useMemo, useState, type ReactNode } from "react";

type SectionId =
  | "economy"
  | "clients"
  | "product"
  | "positioning"
  | "structure"
  | "analytics"
  | "strategy"
  | "contact";

type MetricCard = {
  label: string;
  value: string;
  note: string;
  delta?: string;
};

type BulletBlock = {
  title: string;
  bullets: string[];
};

type ResultSection = {
  id: SectionId;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  status: "stable" | "watch" | "priority";
  quickStats: { label: string; value: string }[];
  blocks: BulletBlock[];
};

type SolutionPanel = {
  title: string;
  subtitle: string;
  lead: string;
  primaryLever: string;
  modelShift: string;
  whyNow: string;
  strategicPriorities: string[];
  jtbd: {
    objective: string;
    job: string;
    nextActions: string[];
  };
};

const topMetrics: MetricCard[] = [
  {
    label: "Economic rate",
    value: "Управляемая",
    note: "Бизнес держится на спросе, но часть выручки теряется в упаковке и обработке потока.",
    delta: "+ потенциал",
  },
  {
    label: "Main growth limit",
    value: "Конверсия + структура",
    note: "Ограничение роста сидит не только в маркетинге, а в связке продажи → обработка → повторное действие.",
    delta: "узкое место",
  },
  {
    label: "Priority horizon",
    value: "6–10 недель",
    note: "Первые сдвиги должны быть видны быстро, если собрать систему решений в один операционный контур.",
    delta: "реалистично",
  },
];

const solutionPanel: SolutionPanel = {
  title: "Solution & Practice",
  subtitle: "Решение собрано из всех блоков диагностики и показывает, куда направлять усилия в первую очередь.",
  lead:
    "Ключевая задача — не просто усилить спрос, а перестроить маршрут денег внутри бизнеса: от входящего интереса до повторного дохода и более управляемой маржи.",
  primaryLever:
    "Основной рычаг роста — связать канал привлечения, этап продажи и удержание в одну модель, где каждая заявка проходит через понятный сценарий конверсии, а не обрабатывается ситуативно.",
  modelShift:
    "Рекомендуемый сдвиг модели — уйти от фрагментарного управления блоками к системе, где продуктовая логика, продажи и операционка работают как единая revenue-механика.",
  whyNow:
    "Сейчас это особенно важно, потому что бизнес уже вкладывает время в активность и поток, но недополучает эффект из-за разрыва между спросом, упаковкой решения и последующим сопровождением клиента.",
  strategicPriorities: [
    "Собрать один приоритетный путь клиента и убрать ключевые точки трения на пути к положительному опыту.",
    "Пересобрать предложение вокруг самых маржинальных услуг и сделать их центральными в продажной логике.",
    "Зафиксировать управленческие контрольные точки: кто принимает решение, по каким данным и в какой момент.",
  ],
  jtbd: {
    objective:
      "Сделать бизнес более предсказуемым по прибыли и снять зависимость результата от ручного контроля основателя.",
    job:
      "Собрать рабочую систему, которая превращает спрос в выручку без потерь на передаче между ролями, хаотичном принятии решений и слабом удержании клиента.",
    nextActions: [
      "Определить один главный revenue-сценарий и собрать его в понятную последовательность шагов.",
      "Сократить лишние действия в продаже и усилить точку, где клиент впервые понимает ценность продукта.",
      "Разложить ответственность по команде так, чтобы основатель не оставался обязательным узлом в каждом решении.",
    ],
  },
};

const sections: ResultSection[] = [
  {
    id: "economy",
    eyebrow: "01",
    title: "Экономика",
    subtitle: "Маржа, выручка, потери и экономическая устойчивость",
    summary:
      "Экономическая картина показывает, что выручка уже создаётся, но её качество не полностью контролируется. Видна возможность поднять итоговую эффективность без кратного роста нагрузки.",
    status: "stable",
    quickStats: [
      { label: "Формат оценки", value: "Economic Rate" },
      { label: "Тип потерь", value: "Структура + конверсия" },
      { label: "Приоритет", value: "Высокий" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Экономика не выглядит критичной, но уже не даёт бизнесу легко масштабироваться на текущей конструкции.",
          "Часть потенциала остаётся на столе из-за разницы между входящим спросом и тем, как бизнес его превращает в результат.",
          "Рост выручки без корректировки внутренней модели может давать больше оборота, но не давать сопоставимого прироста прибыли.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Главное ограничение здесь — не отсутствие движения, а недосбор эффекта с уже существующего движения.",
          "Рычаг находится в качестве маршрута денег, а не только в объёме усилий команды.",
        ],
      },
    ],
  },
  {
    id: "clients",
    eyebrow: "02",
    title: "Клиенты и поток",
    subtitle: "Спрос, capacity, источники обращений и распределение потока",
    summary:
      "По этому блоку ключевой вопрос не в том, есть ли интерес, а в том, насколько управляемо бизнес способен переваривать и распределять входящий поток.",
    status: "priority",
    quickStats: [
      { label: "Сигнал", value: "Есть спрос" },
      { label: "Риск", value: "Потери при обработке" },
      { label: "Фокус", value: "Приоритизация канала" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Поток клиентов уже формируется несколькими источниками, но их реальная ценность для бизнеса неравномерна.",
          "Нагрузка на обработку почти упирается в внутренний capacity, а значит дальше начнётся либо просадка скорости, либо просадка качества.",
          "Не все каналы должны масштабироваться одинаково: нужен приоритет по марже, скорости сделки и повторному потенциалу.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Здесь важно не просто наливать больше трафика, а определить канал, который приносит наиболее управляемую выручку.",
          "Если этого не сделать, рост потока будет усиливать хаос, а не результат.",
        ],
      },
    ],
  },
  {
    id: "product",
    eyebrow: "03",
    title: "Продукт и продажи",
    subtitle: "Маржинальные предложения, CJM, retention и сезонность",
    summary:
      "В этом блоке видно, где бизнес реально зарабатывает, а где просто поддерживает активность. Главное — собрать продажи вокруг тех решений, которые дают лучший денежный эффект.",
    status: "priority",
    quickStats: [
      { label: "Рычаг", value: "Маржинальный фокус" },
      { label: "Риск", value: "Размытый путь клиента" },
      { label: "Задача", value: "Собрать ценность" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Маржинальные продукты должны определять архитектуру продаж сильнее, чем сейчас.",
          "Путь клиента требует большей связности: ценность должна становиться очевидной раньше и последовательнее.",
          "Механики удержания есть, но их нужно привязывать к логике повторной выручки, а не держать как дополнительную опцию.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Продажи должны быть выстроены вокруг самых сильных решений, а не вокруг всего каталога сразу.",
          "Чем короче и яснее путь к положительному опыту, тем лучше бизнес монетизирует уже существующий интерес.",
        ],
      },
    ],
  },
  {
    id: "positioning",
    eyebrow: "04",
    title: "Позиционирование",
    subtitle: "Как бизнес объясняет себя рынку и где находится его фокус",
    summary:
      "Позиционирование здесь должно не просто описывать компанию, а сокращать путь от первого контакта до понимания, почему клиенту стоит выбрать именно это решение.",
    status: "watch",
    quickStats: [
      { label: "Состояние", value: "Есть база" },
      { label: "Пробел", value: "Не хватает резкости" },
      { label: "Эффект", value: "Влияет на конверсию" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Бизнес считывается, но сообщение можно сделать точнее и ближе к тому, за что клиент реально готов платить.",
          "Если позиционирование остаётся слишком широким, продажа становится длиннее и дороже.",
          "География и контекст рынка должны усиливать доверие и понятность предложения, а не оставаться нейтральным описанием.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Позиционирование нужно собирать не вокруг общего описания компании, а вокруг ключевого результата для приоритетного сегмента.",
        ],
      },
    ],
  },
  {
    id: "structure",
    eyebrow: "05",
    title: "Структура и процессы",
    subtitle: "Команда, взаимодействие, напряжение и потери эффективности",
    summary:
      "Именно здесь часто прячется скрытый тормоз роста. Даже при хорошем спросе система буксует, если роли, решения и передача информации работают не как единый контур.",
    status: "priority",
    quickStats: [
      { label: "Узкое место", value: "Передача между ролями" },
      { label: "Риск", value: "Перегруз основателя" },
      { label: "Эффект", value: "Скорость и качество" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Сильнее всего на рост влияет не отсутствие людей, а качество распределения ответственности.",
          "Если основатель остаётся обязательным узлом в большом числе решений, масштаб будет упираться в его личный ресурс.",
          "Потери эффективности обычно возникают в местах, где никто не отвечает за связку между этапами, а не только за свой кусок работы.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Основная задача — убрать скрытые разрывы между ролями и превратить процесс в более предсказуемый маршрут.",
        ],
      },
    ],
  },
  {
    id: "analytics",
    eyebrow: "06",
    title: "Аналитика и управление",
    subtitle: "Какие данные используются и как на их основе принимаются решения",
    summary:
      "Этот блок показывает управленческую зрелость: бизнес уже видит часть сигналов, но пока не все решения опираются на единую систему контроля и приоритетов.",
    status: "watch",
    quickStats: [
      { label: "Сигнал", value: "Есть основа" },
      { label: "Пробел", value: "Нет единого контура" },
      { label: "Фокус", value: "Управленческие точки" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Часть решений может приниматься по ощущению, а не по зафиксированной логике критериев.",
          "Даже полезные данные не дают эффекта, если они не встроены в момент принятия решений.",
          "Важнее не количество метрик, а способность через них видеть, где именно бизнес теряет темп и деньги.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Управление станет сильнее, если зафиксировать несколько контрольных показателей и привязать к ним конкретные решения команды.",
        ],
      },
    ],
  },
  {
    id: "strategy",
    eyebrow: "07",
    title: "Стратегия",
    subtitle: "Цели по прибыли, расходам и горизонты 3 / 6 / 12 месяцев",
    summary:
      "Стратегия должна переводить желание роста в ясную последовательность фокусов по времени. Не просто цель на год, а логика движения к ней.",
    status: "stable",
    quickStats: [
      { label: "Горизонт", value: "12 месяцев" },
      { label: "Фокус", value: "Поэтапная реализация" },
      { label: "Риск", value: "Слишком широкий план" },
    ],
    blocks: [
      {
        title: "Что видно сейчас",
        bullets: [
          "Цели бизнеса можно усилить, если связать их с одним главным механизмом роста, а не держать как набор параллельных желаний.",
          "Планы на 3, 6 и 12 месяцев должны идти друг за другом, а не существовать как отдельные абстрактные горизонты.",
          "Расходы нужно рассматривать не сами по себе, а в привязке к той модели выручки, которую бизнес собирается усиливать.",
        ],
      },
      {
        title: "Краткий вывод",
        bullets: [
          "Главная задача стратегии — задать порядок изменений, чтобы каждый следующий шаг усиливал предыдущий.",
        ],
      },
    ],
  },
  {
    id: "contact",
    eyebrow: "08",
    title: "Следующий шаг",
    subtitle: "Назначение встречи и переход к разбору результатов",
    summary:
      "Этот блок переводит диагностику из статуса отчёта в статус практической работы. Здесь клиент выбирает следующий шаг и закрепляет коммуникацию.",
    status: "stable",
    quickStats: [
      { label: "Формат", value: "30 min call" },
      { label: "Цель", value: "Разбор и приоритеты" },
      { label: "Статус", value: "Готово к выбору слота" },
    ],
    blocks: [
      {
        title: "Что здесь будет",
        bullets: [
          "Выбор удобного слота для встречи с командой Growth Avenue.",
          "Короткое описание, что разберём на созвоне и какой результат клиент получит после разговора.",
          "Фиксация контакта и подтверждение следующего действия без лишних касаний.",
        ],
      },
      {
        title: "Черновик текста",
        bullets: [
          "На встрече мы покажем, где именно бизнес недобирает эффект и какой порядок действий даст наиболее быстрый рывок в управляемости и выручке.",
          "Вы сможете выбрать удобное время и перейти к практическому разбору без повторного заполнения данных.",
        ],
      },
    ],
  },
];

const slotOptions = [
  { day: "Mon", date: "31 Mar", time: "14:00" },
  { day: "Tue", date: "01 Apr", time: "15:30" },
  { day: "Wed", date: "02 Apr", time: "13:00" },
  { day: "Wed", date: "02 Apr", time: "16:30" },
];

function GlassCard({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-[18px] ${className}`}
      style={{
        boxShadow:
          "0 24px 90px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}

function StatusPill({ status }: { status: ResultSection["status"] }) {
  const map = {
    stable: {
      label: "stable",
      className: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    },
    watch: {
      label: "watch",
      className: "border-white/10 bg-white/[0.05] text-white/70",
    },
    priority: {
      label: "priority",
      className: "border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff0a8]",
    },
  } as const;

  return (
    <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] ${map[status].className}`}>
      {map[status].label}
    </span>
  );
}

function ExpandableSectionCard({
  section,
  open,
  onToggle,
}: {
  section: ResultSection;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <GlassCard className="overflow-hidden p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-white/40">
              {section.eyebrow}
            </span>
            <StatusPill status={section.status} />
          </div>

          <h3 className="text-xl font-semibold text-white md:text-2xl">{section.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#a5aeb2]">{section.subtitle}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/75 transition hover:border-[#f7d237]/25 hover:bg-[#f7d237]/10 hover:text-[#fff3b2]"
        >
          {open ? "Скрыть" : "Открыть"}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {section.quickStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/35">{stat.label}</div>
            <div className="mt-2 text-sm font-medium text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm leading-7 text-white/72">{section.summary}</p>

      {open ? (
        <div className="mt-6 space-y-4 border-t border-white/8 pt-5">
          {section.blocks.map((block) => (
            <div key={block.title} className="rounded-2xl border border-white/8 bg-black/10 p-4 md:p-5">
              <div className="text-sm font-medium text-[#fff4bf]">{block.title}</div>
              <div className="mt-3 space-y-2.5 text-sm leading-7 text-white/78">
                {block.bullets.map((bullet) => (
                  <div key={bullet} className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7d237]" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </GlassCard>
  );
}

function Ring({ progress, size = 166 }: { progress: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(247,210,55,0.95)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">readiness</div>
        <div className="mt-1 text-4xl font-semibold text-white">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}

function SlideOver({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[#061121]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[760px] overflow-y-auto border-l border-white/10 bg-[#09182f]/92 px-5 py-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:px-7">
        <div className="mx-auto max-w-[620px]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">Revenue Snapshot</div>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 hover:border-[#f7d237]/25 hover:text-[#fff0a8]"
            >
              Закрыть
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function RevenueSnapshotResultsPage() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const readiness = useMemo(() => 84, []);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(247,210,55,0.08), transparent 18%), linear-gradient(180deg, #0b1d3a 0%, #08162d 100%)",
      }}
    >
      <style jsx global>{`
        @keyframes rs-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rs-fade-up {
          animation: rs-fade-up 0.55s ease forwards;
        }
      `}</style>

      <div className="mx-auto max-w-[1520px] px-5 pb-16 pt-6 md:px-8 lg:px-10">
        <GlassCard className="mb-8 p-5 md:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="rs-fade-up">
              <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/45">
                <span className="text-[#f7d237]">●</span>
                Revenue Snapshot — Diagnostic Output
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-[#fefefe] md:text-5xl">
                Результат диагностики по структуре Snapshot Action
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#a5aeb2] md:text-base">
                Ниже собран предварительный вывод по ключевым блокам бизнеса.
                Каждая карточка отражает краткое заключение по отдельному
                направлению, а в hero-блоке вынесен общий практический вектор:
                что менять в модели и к какому job-to-be-done вести компанию.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 pt-1 text-xs text-white/45">
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Диагностических блоков: 8
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Формат: output → practice
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Статус: draft structure
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">
                  Delivery: results page
                </span>
              </div>
            </div>

            <GlassCard className="p-6 md:p-7">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">
                  Solution & practice
                </div>

                <div className="mt-6">
                  <Ring progress={readiness} size={172} />
                </div>

                <div className="mt-5 text-2xl font-semibold text-[#fefefe]">
                  Общее решение по диагностике
                </div>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#a5aeb2]">
                  Здесь собран главный рычаг роста, практический фокус и
                  сквозной JTBD, который связывает все блоки в одну систему.
                </p>

                <button
                  type="button"
                  onClick={() => setSolutionOpen(true)}
                  className="mt-6 w-full rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-5 py-3 text-sm font-medium text-[#fff0a8] transition hover:bg-[#f7d237]/14"
                >
                  Открыть solution & practice
                </button>
              </div>
            </GlassCard>
          </div>
        </GlassCard>

        <div className="mb-8 grid gap-4 lg:grid-cols-3">
          {topMetrics.map((item) => (
            <GlassCard key={item.label} className="p-5 md:p-6">
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">{item.label}</div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div className="text-2xl font-semibold text-white">{item.value}</div>
                {item.delta ? (
                  <div className="rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#fff0a8]">
                    {item.delta}
                  </div>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#a5aeb2]">{item.note}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <ExpandableSectionCard
              key={section.id}
              section={section}
              open={openSection === section.id}
              onToggle={() => setOpenSection((prev) => (prev === section.id ? null : section.id))}
            />
          ))}
        </div>
      </div>

      <SlideOver open={solutionOpen} title="Solution & Practice" onClose={() => setSolutionOpen(false)}>
        <div className="space-y-5">
          <GlassCard className="p-5 md:p-6">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">Overview</div>
            <h3 className="mt-3 text-2xl font-semibold text-white">{solutionPanel.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#a5aeb2]">{solutionPanel.subtitle}</p>
            <p className="mt-4 text-sm leading-7 text-white/78">{solutionPanel.lead}</p>
          </GlassCard>

          <GlassCard className="p-5 md:p-6">
            <div className="text-sm font-medium text-[#fff3b2]">Primary growth lever</div>
            <p className="mt-3 text-sm leading-7 text-white/78">{solutionPanel.primaryLever}</p>
          </GlassCard>

          <GlassCard className="p-5 md:p-6">
            <div className="text-sm font-medium text-[#fff3b2]">Model change recommendation</div>
            <p className="mt-3 text-sm leading-7 text-white/78">{solutionPanel.modelShift}</p>
            <div className="mt-5 text-sm font-medium text-[#fff3b2]">Why now</div>
            <p className="mt-3 text-sm leading-7 text-white/78">{solutionPanel.whyNow}</p>
          </GlassCard>

          <GlassCard className="p-5 md:p-6">
            <div className="text-sm font-medium text-[#fff3b2]">Strategic priorities</div>
            <div className="mt-4 space-y-3">
              {solutionPanel.strategicPriorities.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-7 text-white/78">
                  <div className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/35">
                    Priority {index + 1}
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 md:p-6">
            <div className="text-sm font-medium text-[#fff3b2]">JTBD</div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Strategic objective</div>
                <p className="mt-3 text-sm leading-7 text-white/78">{solutionPanel.jtbd.objective}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">Core job</div>
                <p className="mt-3 text-sm leading-7 text-white/78">{solutionPanel.jtbd.job}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">First actions</div>
              <div className="mt-3 space-y-2.5 text-sm leading-7 text-white/78">
                {solutionPanel.jtbd.nextActions.map((action) => (
                  <div key={action} className="flex gap-3">
                    <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7d237]" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 md:p-6">
            <div className="text-sm font-medium text-[#fff3b2]">Назначить встречу</div>
            <p className="mt-2 text-sm leading-7 text-[#a5aeb2]">
              Ниже — черновой блок под выбор слота. Позже сюда можно подставить живые слоты из Notion или Make.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {slotOptions.map((slot) => {
                const slotKey = `${slot.day}-${slot.date}-${slot.time}`;
                const active = selectedSlot === slotKey;

                return (
                  <button
                    type="button"
                    key={slotKey}
                    onClick={() => setSelectedSlot(slotKey)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-[#f7d237]/30 bg-[#f7d237]/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/35">{slot.day}</div>
                    <div className="mt-2 text-lg font-medium text-white">{slot.date}</div>
                    <div className="mt-1 text-sm text-[#fff0a8]">{slot.time}</div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-5 w-full rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-5 py-3 text-sm font-medium text-[#fff0a8] transition hover:bg-[#f7d237]/14"
            >
              Назначить встречу
            </button>
          </GlassCard>
        </div>
      </SlideOver>
    </div>
  );
}
