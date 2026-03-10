"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function fmtMoney(n: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function pct(n: number) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${Math.round(n)}%`;
}

function color(delta: number, invert = false) {
  if (invert) {
    if (delta < 0) return "text-emerald-300";
    if (delta > 0) return "text-rose-300";
  } else {
    if (delta > 0) return "text-emerald-300";
    if (delta < 0) return "text-rose-300";
  }
  return "text-white/50";
}

function normalizeDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/^0+(?=\d)/, "");
}

function parseNumeric(value: string, fallback = 0) {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function getMetricFlag(
  type: "revenue" | "costs" | "profit",
  delta: number
): string {
  if (type === "revenue") {
    if (delta >= 10) return "Сильный рост";
    if (delta >= 3) return "Рост";
    if (delta <= -10) return "Сильное падение";
    if (delta <= -3) return "Снижение";
    return "Стабильно";
  }

  if (type === "costs") {
    if (delta <= -10) return "Снижение затрат";
    if (delta <= -3) return "Экономия";
    if (delta >= 10) return "Рост затрат";
    if (delta >= 3) return "Давление затрат";
    return "Стабильно";
  }

  if (delta >= 10) return "Рост маржи";
  if (delta >= 3) return "Позитивная динамика";
  if (delta <= -10) return "Просадка маржи";
  if (delta <= -3) return "Давление на маржу";
  return "Стабильно";
}

function flagTone(
  type: "revenue" | "costs" | "profit",
  delta: number
): string {
  if (type === "costs") {
    if (delta <= -3) return "flag-good";
    if (delta >= 3) return "flag-bad";
    return "flag-neutral";
  }

  if (delta >= 3) return "flag-good";
  if (delta <= -3) return "flag-bad";
  return "flag-neutral";
}

function TopMetricCard({
  title,
  value,
  delta,
  type,
  invert = false,
  large = false,
}: {
  title: string;
  value: string;
  delta: number;
  type: "revenue" | "costs" | "profit";
  invert?: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={[
        "glass-card soft-glow metric-card metric-card-main",
        large ? "metric-card-large" : "",
      ].join(" ")}
    >
      <div className="metric-head">
        <div className="text-sm text-white/55">{title}</div>
        <div className={`metric-flag ${flagTone(type, delta)}`}>
          {getMetricFlag(type, delta)}
        </div>
      </div>

      <div className="mt-3 text-[2.1rem] font-semibold tracking-tight md:text-[2rem]">
        {value}
      </div>

      <div className={`mt-2 text-sm ${color(delta, invert)}`}>{pct(delta)}</div>
    </div>
  );
}

function ModelCard({
  title,
  value,
  delta,
  invert = false,
}: {
  title: string;
  value: string | number;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="glass-card soft-glow model-card">
      <div className="text-xs text-white/55">{title}</div>
      <div className="mt-2 text-lg font-medium">{value}</div>
      <div className={`mt-2 text-sm ${color(delta, invert)}`}>{pct(delta)}</div>
    </div>
  );
}

function Row({
  label,
  delta,
  invert = false,
}: {
  label: string;
  delta: number;
  invert?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/60">{label}</span>
      <span className={color(delta, invert)}>{pct(delta)}</span>
    </div>
  );
}

function Slider({
  title,
  subtitle,
  value,
  set,
}: {
  title: string;
  subtitle: string;
  value: number;
  set: (v: number) => void;
}) {
  return (
    <div className="glass-card soft-glow slider-card">
      <div>
        <div className="text-sm font-medium leading-snug">{title}</div>
        <div className="mt-2 min-h-[38px] text-xs leading-snug text-white/42">
          {subtitle}
        </div>
      </div>

      <div className="mt-auto">
        <input
          type="range"
          min="-0.3"
          max="0.3"
          step="0.01"
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="range-input mt-4 w-full accent-[#f7d237]"
        />
        <div className="mt-2 text-xs text-white/50">
          {Math.round(value * 100)}%
        </div>
      </div>
    </div>
  );
}

function ResultDocCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="result-doc-card">
      <div className="result-doc-tab">Документ</div>
      <div className="result-doc-title">{title}</div>
      <div className="result-doc-text">{text}</div>
    </div>
  );
}

function HeroEconomyChart() {
  const base = {
    leads: 10,
    deals: 2,
    avgCheck: 6500,
    margin: 0.3,
  };

  const scenarios = [
    {
      key: "offer",
      label: "#Оффер",
      deals: 2.4,
      avgCheck: 6500,
      margin: 0.3,
      full: "Упаковка и оффер",
      deltaLabel: "+0.4 сделки",
    },
    {
      key: "price",
      label: "#СреднийЧек",
      deals: 2,
      avgCheck: 7600,
      margin: 0.3,
      full: "Средний чек",
      deltaLabel: "+$1,100 к чеку",
    },
    {
      key: "sales",
      label: "#Продажи",
      deals: 2.8,
      avgCheck: 6500,
      margin: 0.3,
      full: "Продажи",
      deltaLabel: "+0.8 сделки",
    },
    {
      key: "ops",
      label: "#Операционка",
      deals: 2,
      avgCheck: 6500,
      margin: 0.38,
      full: "Операционка",
      deltaLabel: "+8 п.п. маржи",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % scenarios.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [scenarios.length]);

  const active = scenarios[activeIndex];

  const baseRevenue = base.deals * base.avgCheck;
  const baseProfit = baseRevenue * base.margin;
  const activeRevenue = active.deals * active.avgCheck;
  const activeProfit = activeRevenue * active.margin;

  const points = [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const x = 16 + i * 56;
    const activeSets = [
      [170, 164, 156, 146, 134, 120, 106],
      [170, 166, 160, 152, 142, 128, 116],
      [170, 156, 144, 130, 116, 100, 84],
      [170, 164, 158, 148, 138, 124, 108],
    ];
    const baseSet = [170, 166, 162, 156, 150, 142, 136];
    return {
      x,
      baseY: baseSet[i],
      activeY: activeSets[activeIndex][i],
    };
  });

  const makeSmoothPath = (
    arr: { x: number; activeY?: number; baseY?: number }[],
    key: "baseY" | "activeY"
  ) => {
    return arr
      .map((p, i) => {
        if (i === 0) return `M ${p.x} ${p[key]}`;
        const prev = arr[i - 1];
        const cx = (prev.x + p.x) / 2;
        return `Q ${cx} ${prev[key]} ${p.x} ${p[key]}`;
      })
      .join(" ");
  };

  const basePath = makeSmoothPath(points, "baseY");
  const activePath = makeSmoothPath(points, "activeY");

  return (
    <aside className="glass-card hero-chart-card">
      <div className="text-sm text-white/55">Как двигается экономика</div>
      <div className="mt-2 text-2xl font-semibold text-white md:text-[2rem] md:leading-[1.1]">
        MVP-рычаги, которые меняют деньги в модели
      </div>
      <p className="mt-3 text-sm leading-7 text-white/64">
        Здесь не нужно ничего нажимать. Блок показывает логику: отдельные
        управляемые изменения перестраивают выручку и прибыль бизнеса.
      </p>

      <div className="hero-levers-inline">
        {scenarios.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.key}
              className={`hero-tag ${isActive ? "hero-tag-active" : ""}`}
            >
              {item.label}
            </div>
          );
        })}
      </div>

      <div className="hero-chart-box">
        <div className="hero-chart-metrics-row">
          <div className="hero-metric-square">
            <span>Лидов / мес</span>
            <strong>{base.leads}</strong>
          </div>
          <div className="hero-metric-square">
            <span>Сделок / мес</span>
            <strong>{active.deals.toFixed(1)}</strong>
          </div>
          <div className="hero-metric-square">
            <span>Средний чек</span>
            <strong>{fmtMoney(active.avgCheck)}</strong>
          </div>
          <div className="hero-metric-square">
            <span>Маржа</span>
            <strong>{Math.round(active.margin * 100)}%</strong>
          </div>
        </div>

        <div className="hero-chart-svg-wrap">
          <svg viewBox="0 0 390 220" className="hero-chart-svg" aria-hidden="true">
            <defs>
              <linearGradient id="chartBase" x1="0%" x2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
              </linearGradient>
              <linearGradient id="chartActive" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#f7d237" />
                <stop offset="55%" stopColor="#f4dd72" />
                <stop offset="100%" stopColor="#b08cff" />
              </linearGradient>
              <filter id="chartGlow">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="12"
                x2="378"
                y1={38 + i * 44}
                y2={38 + i * 44}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
              />
            ))}

            <path
              d={`${basePath} L 352 194 L 16 194 Z`}
              fill="rgba(255,255,255,0.03)"
            />
            <path
              d={`${activePath} L 352 194 L 16 194 Z`}
              fill="rgba(247,210,55,0.085)"
            />

            <path
              d={basePath}
              fill="none"
              stroke="url(#chartBase)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={activePath}
              fill="none"
              stroke="url(#chartActive)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#chartGlow)"
            />

            {points.map((p, idx) => (
              <circle
                key={idx}
                cx={p.x}
                cy={p.activeY}
                r="4.5"
                fill="#f7d237"
                opacity={0.96}
              />
            ))}
          </svg>
        </div>

        <div className="hero-chart-bottom">
          <div className="hero-money-card">
            <span>База</span>
            <strong>{fmtMoney(baseRevenue)}</strong>
            <small>{fmtMoney(baseProfit)} прибыли / мес</small>
          </div>

          <div className="hero-money-card hero-money-card-accent">
            <span>Активный рычаг</span>
            <strong>{fmtMoney(activeRevenue)}</strong>
            <small>{fmtMoney(activeProfit)} прибыли / мес</small>
          </div>
        </div>

        <div className="hero-chart-note">
          Сейчас подсвечен <span>{active.full}</span> — {active.deltaLabel}.
        </div>
      </div>
    </aside>
  );
}

function SnapshotStructure() {
  const topics = [
    { title: "Продукт", cls: "topic-1" },
    { title: "Трафик", cls: "topic-2" },
    { title: "Продажи", cls: "topic-3" },
    { title: "Экономика", cls: "topic-4" },
    { title: "Операционные ограничения", cls: "topic-5" },
    { title: "Цели роста", cls: "topic-6" },
  ];

  return (
    <div className="glass-card snapshot-structure-card">
      <h3 className="text-lg font-semibold text-white">Структура Revenue Snapshot</h3>

      <div className="snapshot-structure">
        <div className="snapshot-center">Revenue Snapshot</div>

        {topics.map((item) => (
          <div key={item.title} className={`snapshot-topic ${item.cls}`}>
            {item.title}
          </div>
        ))}

        <span className="snapshot-line line-1" />
        <span className="snapshot-line line-2" />
        <span className="snapshot-line line-3" />
        <span className="snapshot-line line-4" />
        <span className="snapshot-line line-5" />
        <span className="snapshot-line line-6" />
      </div>
    </div>
  );
}

export default function Home() {
  const [clientsInput, setClientsInput] = useState("20");
  const [checkInput, setCheckInput] = useState("2000");

  const clientsBase = parseNumeric(clientsInput, 0);
  const checkBase = parseNumeric(checkInput, 0);

  const [sales, setSales] = useState(0);
  const [retention, setRetention] = useState(0);
  const [upsell, setUpsell] = useState(0);
  const [opexEff, setOpexEff] = useState(0);

  const payUrl = "#";
  const tgContactUrl = "https://t.me/growth_avenue_company";
  const waContactUrl = "https://wa.me/995555163833";

  const resultScrollRef = useRef<HTMLDivElement | null>(null);

  const highlightItems = [
    "Найти утечки",
    "Увидеть главный рычаг",
    "Выбрать фокус",
  ];

  const highlightDescriptions = [
    "в экономике бизнеса",
    "усиления и роста модели",
    "вместо хаотичных гипотез",
  ];

  const stageCards = [
    {
      title: "#SeedStage",
      subtitle:
        "Работа над идеей, создание прототипа и проверка рынка.",
    },
    {
      title: "#StartupStage",
      subtitle:
        "Официальный выход на рынок, первые продажи и привлечение клиентов.",
    },
    {
      title: "#GrowthStage",
      subtitle:
        "Период стабильного увеличения выручки и расширения клиентской базы.",
    },
    {
      title: "#ExpansionStage",
      subtitle:
        "Выход на новые уровни: захват новых рынков, добавление линеек продуктов или международная экспансия.",
    },
  ];

  const resultDocs = [
    {
      title: "Executive Summary",
      text: "Краткая стратегическая картина: как сейчас устроена экономика бизнеса и где сосредоточено главное напряжение.",
    },
    {
      title: "Revenue Leaks",
      text: "Разбор участков, в которых бизнес теряет деньги: продукт, конверсия, повторные продажи, цена и операционная логика.",
    },
    {
      title: "Главное направление роста",
      text: "Определение того, какое изменение способно дать наибольший финансовый эффект без хаотичного наращивания маркетинга.",
    },
    {
      title: "Priority Actions",
      text: "Очередность действий: что усиливать в первую очередь, а что пока не является главным ограничением.",
    },
  ];

  const handleReset = () => {
    setClientsInput("20");
    setCheckInput("2000");
    setSales(0);
    setRetention(0);
    setUpsell(0);
    setOpexEff(0);
  };

  const data = useMemo(() => {
    const safeClients = Math.max(0, clientsBase);
    const safeCheck = Math.max(0, checkBase);

    const newClients = safeClients * (1 + sales * 0.6);
    const retainedRevenueLift = 1 + retention * 0.35;
    const avgCheck = safeCheck * (1 + upsell * 0.7);

    const revenue = newClients * avgCheck * retainedRevenueLift;

    const salesCost = revenue * 0.18 * (1 + sales * 0.4);
    const support = revenue * 0.06 * (1 + retention * 0.25);
    const opex = revenue * 0.35 * (1 - opexEff * 0.8);

    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return {
      clients: newClients,
      avgCheck,
      revenue,
      salesCost,
      support,
      opex,
      costs,
      profit,
    };
  }, [clientsBase, checkBase, sales, retention, upsell, opexEff]);

  const base = useMemo(() => {
    const revenue = clientsBase * checkBase;
    const salesCost = revenue * 0.18;
    const support = revenue * 0.06;
    const opex = revenue * 0.35;
    const costs = salesCost + support + opex;
    const profit = revenue - costs;

    return {
      clients: clientsBase,
      avgCheck: checkBase,
      revenue,
      salesCost,
      support,
      opex,
      costs,
      profit,
    };
  }, [clientsBase, checkBase]);

  const safeDiv = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);

  const revDelta = safeDiv(data.revenue - base.revenue, base.revenue);
  const costDelta = safeDiv(data.costs - base.costs, base.costs);
  const profitDelta = safeDiv(data.profit - base.profit, base.profit);

  const clientsDelta = safeDiv(data.clients - base.clients, base.clients);
  const avgCheckDelta = safeDiv(data.avgCheck - base.avgCheck, base.avgCheck);
  const salesCostDelta = safeDiv(
    data.salesCost - base.salesCost,
    base.salesCost
  );
  const opexSupportDelta = safeDiv(
    data.opex + data.support - (base.opex + base.support),
    base.opex + base.support
  );

  const strongestLever = useMemo(() => {
    const levers = [
      { name: "Эффективность продаж", value: Math.abs(sales * 0.6) },
      { name: "Повторные продажи", value: Math.abs(retention * 0.5) },
      { name: "Средний чек", value: Math.abs(upsell * 0.7) },
      { name: "Загрузка команды", value: Math.abs(opexEff * 0.8) },
    ];
    levers.sort((a, b) => b.value - a.value);
    return levers[0];
  }, [sales, retention, upsell, opexEff]);

  const hasInteraction =
    Math.abs(sales) > 0.001 ||
    Math.abs(retention) > 0.001 ||
    Math.abs(upsell) > 0.001 ||
    Math.abs(opexEff) > 0.001;

  const estimatedGap = Math.max(
    0,
    Math.round(
      (data.revenue - base.revenue) * 0.55 + (data.profit - base.profit) * 0.45
    )
  );

  const scrollDocs = (dir: "left" | "right") => {
    if (!resultScrollRef.current) return;
    resultScrollRef.current.scrollBy({
      left: dir === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b1d3a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="vignette" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-5 md:px-8 md:py-10">
        <header className="sticky-header mb-7 md:mb-10">
          <div className="header-row">
            <img
              src="/logo-main.svg"
              alt="Growth Avenue"
              className="logo-main shrink-0"
            />

            <div className="header-actions">
              <a
                href={tgContactUrl}
                className="contact-btn contact-btn-invert"
                target="_blank"
                rel="noreferrer"
              >
                TG
              </a>

              <a
                href={waContactUrl}
                className="contact-btn contact-btn-invert"
                target="_blank"
                rel="noreferrer"
              >
                WA
              </a>

              <a href="#how-it-works" className="ghost-link hidden md:inline-flex">
                Как это работает
              </a>

              <a href="#try" className="tg-gradient-btn tg-gradient-btn-header inline-flex">
                Попробовать Snapshot
              </a>
            </div>
          </div>
        </header>

        <section className="hero-grid mb-10 md:mb-14">
          <div className="hero-left">
            <div className="glass-pill inline-flex items-center gap-3 rounded-full px-4 py-2.5 text-xs font-semibold text-white md:px-5 md:py-3 md:text-sm">
              <span className="dot-yellow" />
              Revenue Snapshot • стратегическая диагностика экономики бизнеса
            </div>

            <h1 className="mt-5 text-3xl font-semibold leading-[1.02] tracking-tight md:mt-6 md:text-6xl">
              Revenue Snapshot
              <br />
              стратегическая
              <br />
              диагностика
              <br />
              экономики вашего
              <br />
              бизнеса
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 md:mt-5 md:text-lg">
              Узнайте, какое изменение в модели способно дать наиболее сильный
              эффект на выручку, и где сейчас скрываются главные точки потери
              денег.
            </p>

            <div className="hero-highlights-row">
              {highlightItems.map((item, index) => (
                <div key={item} className="hero-highlight-chip">
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-highlights-sub">
              {highlightDescriptions.map((item) => (
                <div key={item} className="hero-highlight-subtext">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#try" className="tg-gradient-btn inline-flex">
                Попробовать Snapshot
              </a>
              <a href="#preview" className="ghost-link ghost-link-large inline-flex">
                Посмотреть превью
              </a>
            </div>
          </div>

          <HeroEconomyChart />
        </section>

        <section id="how-it-works" className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Как это работает</div>
            <h2 className="section-title">Путь от диагностики до результата</h2>
            <p className="section-copy">
              Пользователь проходит короткий маршрут: знакомится с логикой,
              отвечает на вопросы и получает структурированный итог.
            </p>
          </div>

          <div className="journey-compact">
            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">1</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">Знакомство с инструментом</div>
              <div className="journey-compact-text">
                На посадочной пользователь видит механику модели и понимает,
                что влияет на деньги компании.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">2</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">Оплата и переход в Telegram</div>
              <div className="journey-compact-text">
                После оплаты бот собирает данные о продукте, трафике,
                продажах, экономике и операционных ограничениях.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">3</div>
              </div>
              <div className="journey-compact-title">Готовый Revenue Snapshot</div>
              <div className="journey-compact-text">
                На выходе — структурированный разбор с выводами,
                проблемными зонами и приоритетом следующих действий.
              </div>
            </div>
          </div>
        </section>

        <section id="preview" className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Интерактивное превью</div>
            <h2 className="section-title">Поиграйте с моделью до оплаты</h2>
            <p className="section-copy">
              Здесь пользователь меняет ключевые параметры и видит предварительные
              сигналы. Полный разбор открывается после оплаты.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <div>
              <section className="dashboard-grid">
                <div className="dashboard-revenue">
                  <TopMetricCard
                    title="Выручка"
                    value={fmtMoney(data.revenue)}
                    delta={revDelta}
                    type="revenue"
                    large
                  />
                </div>

                <div className="dashboard-profit">
                  <TopMetricCard
                    title="Прибыль"
                    value={fmtMoney(data.profit)}
                    delta={profitDelta}
                    type="profit"
                  />
                </div>

                <div className="dashboard-costs">
                  <TopMetricCard
                    title="Расходы"
                    value={fmtMoney(data.costs)}
                    delta={costDelta}
                    type="costs"
                    invert
                  />
                </div>
              </section>

              <div className="mt-5">
                <div className="mb-3 text-sm text-white/58">
                  Формирование экономики
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <ModelCard
                    title="Клиенты"
                    value={Math.round(data.clients)}
                    delta={clientsDelta}
                  />
                  <ModelCard
                    title="Средний чек"
                    value={fmtMoney(data.avgCheck)}
                    delta={avgCheckDelta}
                  />
                  <ModelCard
                    title="Sales cost"
                    value={fmtMoney(data.salesCost)}
                    delta={salesCostDelta}
                  />
                  <ModelCard
                    title="Opex + Support"
                    value={fmtMoney(data.opex + data.support)}
                    delta={opexSupportDelta}
                    invert
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-white/58">Рычаги управления</div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="reset-link"
                >
                  Сбросить
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <Slider
                  title="Эффективность продаж"
                  subtitle="Влияние на конверсию и поток клиентов."
                  value={sales}
                  set={setSales}
                />
                <Slider
                  title="Повторные продажи"
                  subtitle="Влияние на устойчивость выручки."
                  value={retention}
                  set={setRetention}
                />
                <Slider
                  title="Средний чек"
                  subtitle="Рост денег без роста трафика."
                  value={upsell}
                  set={setUpsell}
                />
                <Slider
                  title="Загрузка команды"
                  subtitle="Влияние на расходы и маржу."
                  value={opexEff}
                  set={setOpexEff}
                />
              </div>
            </div>

            <aside className="glass-card h-fit lg:sticky lg:top-24">
              <div className="preview-top-row">
                <div>
                  <div className="text-sm text-white/55">
                    Пример предварительного сигнала
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    Potential revenue gap detected
                  </div>
                </div>
                <div className="preview-chip">Preview</div>
              </div>

              <div className="hero-preview-box mt-5">
                <div className="text-sm text-white/55">Оценочный резерв</div>
                <div className="mt-2 text-4xl font-semibold text-[#f7d237]">
                  ≈ {fmtMoney(estimatedGap)} / мес
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Full diagnostic reveals where it comes from. На посадочной вы
                  видите только механику и возможное направление — полный разбор
                  раскрывает, за счет чего появляется этот резерв.
                </p>
              </div>

              <div className="mt-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-4">
                {hasInteraction ? (
                  <>
                    <div className="text-xs uppercase tracking-[0.14em] text-white/42">
                      Наиболее заметный рычаг
                    </div>
                    <div className="mt-2 text-base font-semibold text-white/92">
                      {strongestLever.name}
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-white/68">
                      Сейчас именно этот параметр заметнее всего влияет на общую
                      динамику модели.
                    </div>
                  </>
                ) : (
                  <div className="text-sm leading-relaxed text-white/68">
                    Подвигайте ползунки ниже, чтобы увидеть, какой рычаг
                    заметнее всего влияет на экономику модели.
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <Row label="Выручка" delta={revDelta} />
                <Row label="Расходы" delta={costDelta} invert />
                <Row label="Прибыль" delta={profitDelta} />
              </div>

              <a href={payUrl} className="tg-gradient-btn mt-5 block text-center">
                Попробовать Snapshot
              </a>
            </aside>
          </div>
        </section>

        <section className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Что вы получите</div>
            <h2 className="section-title">
              Структурированный результат, а не общие советы
            </h2>
            <p className="section-copy">
              После анализа пользователь получает понятный разбор текущей модели,
              проблемных зон и приоритета следующих действий.
            </p>
          </div>

          <div className="results-carousel-head">
            <div className="results-carousel-actions">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => scrollDocs("left")}
              >
                ←
              </button>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => scrollDocs("right")}
              >
                →
              </button>
            </div>
          </div>

          <div className="results-carousel-wrap">
            <div className="results-carousel" ref={resultScrollRef}>
              {resultDocs.map((doc) => (
                <ResultDocCard key={doc.title} title={doc.title} text={doc.text} />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Пример результата</div>
            <h2 className="section-title">
              Покажите пример Snapshot прямо на посадочной
            </h2>
            <p className="section-copy">
              Даже один хороший скриншот Notion-страницы заметно усиливает доверие.
            </p>
          </div>

          <div className="glass-card notion-mock-card">
            <div className="text-sm uppercase tracking-[0.18em] text-[#f7d237]">
              Пример выдачи
            </div>
            <div className="mt-3 text-2xl font-semibold text-white">
              Revenue Snapshot / Notion Report
            </div>

            <div className="mt-5 overflow-hidden rounded-[22px] border border-white/10 bg-[#11264b]/75">
              <img
                src="/result-preview.png"
                alt="Пример результата Revenue Snapshot"
                className="block h-auto w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Для кого этот инструмент</div>
            <h2 className="section-title">
              Подходит, если вы узнаете себя в этом
            </h2>
          </div>

          <div className="stage-grid">
            {stageCards.map((item) => (
              <div key={item.title} className="stage-card">
                <div className="stage-card-title">{item.title}</div>
                <div className="stage-card-subtitle">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="section-head">
            <div className="section-kicker">Как проходит анализ</div>
            <h2 className="section-title">
              После оплаты пользователь переходит в Telegram
            </h2>
            <p className="section-copy">
              Telegram используется как удобный интерфейс сбора данных. Ответы
              анализируются автоматически и превращаются в структурированный результат.
            </p>
          </div>

          <div className="analysis-grid">
            <SnapshotStructure />

            <div className="glass-card">
              <h3 className="text-lg font-semibold text-white">
                Что происходит дальше
              </h3>
              <p className="mt-4 text-sm leading-8 text-white/68">
                Ответы анализируются автоматически, после чего данные
                собираются в итоговый Revenue Snapshot с выводами, ключевыми
                точками потери выручки и приоритетом следующих шагов.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={tgContactUrl}
                  className="contact-btn contact-btn-invert"
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать в TG
                </a>

                <a
                  href={waContactUrl}
                  className="ghost-link ghost-link-large"
                  target="_blank"
                  rel="noreferrer"
                >
                  Связаться в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="try" className="pb-8">
          <div className="glass-card cta-card">
            <div>
              <div className="section-kicker">CTA</div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Откройте полный Revenue Snapshot
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                После оплаты пользователь переходит в Telegram, проходит
                диагностику и получает структурированный результат с финансовой
                логикой, проблемными зонами и главным направлением усиления.
              </p>
            </div>

            <div className="cta-box">
              <div className="text-sm text-white/55">Следующий шаг</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                Попробовать Snapshot
              </div>
              <a href={payUrl} className="tg-gradient-btn mt-5 inline-flex">
                Получить Revenue Snapshot
              </a>
              <div className="mt-3 text-xs text-white/45">
                Здесь можно поставить ссылку на оплату PayPal
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .glass-card {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 22px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .glass-pill {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.06)
          );
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .soft-glow {
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 40;
          margin: 0 -16px 18px;
          padding: 10px 16px 8px;
          backdrop-filter: blur(14px);
          background: linear-gradient(
            180deg,
            rgba(11, 29, 58, 0.86),
            rgba(11, 29, 58, 0.42)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 0.98fr;
          gap: 20px;
          align-items: stretch;
        }

        .hero-left,
        .hero-chart-card {
          min-height: 100%;
        }

        .hero-highlights-row {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .hero-highlight-chip {
          border-radius: 16px;
          padding: 14px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
        }

        .hero-highlights-sub {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .hero-highlight-subtext {
          font-size: 13px;
          line-height: 1.5;
          text-align: center;
          color: rgba(255, 255, 255, 0.56);
        }

        .hero-chart-card {
          display: flex;
          flex-direction: column;
        }

        .hero-levers-inline {
          display: flex;
          flex-wrap: nowrap;
          gap: 10px;
          margin-top: 18px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .hero-levers-inline::-webkit-scrollbar {
          display: none;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.68);
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition: 0.25s ease;
        }

        .hero-tag-active {
          color: #0b1d3a;
          background: #f7d237;
          border-color: rgba(247, 210, 55, 0.55);
        }

        .hero-chart-box {
          margin-top: 18px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .hero-chart-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 14px;
        }

        .hero-metric-square {
          min-height: 84px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px;
        }

        .hero-metric-square span {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.52);
        }

        .hero-metric-square strong {
          display: block;
          margin-top: 8px;
          font-size: 18px;
          line-height: 1.2;
          font-weight: 700;
          color: white;
        }

        .hero-chart-svg-wrap {
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 10px;
        }

        .hero-chart-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .hero-chart-bottom {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .hero-money-card {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          padding: 12px;
        }

        .hero-money-card span {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-money-card strong {
          display: block;
          margin-top: 8px;
          font-size: 22px;
          font-weight: 700;
          color: white;
        }

        .hero-money-card small {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.58);
        }

        .hero-money-card-accent {
          border-color: rgba(247, 210, 55, 0.22);
        }

        .hero-chart-note {
          margin-top: 10px;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.62);
        }

        .hero-chart-note span {
          color: #f7d237;
          font-weight: 700;
        }

        .section-head {
          max-width: 860px;
          margin-bottom: 18px;
        }

        .section-kicker {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f7d237;
        }

        .section-title {
          margin-top: 12px;
          font-size: 34px;
          line-height: 1.08;
          font-weight: 600;
          color: white;
        }

        .section-copy {
          margin-top: 14px;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.68);
        }

        .contact-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 9px 12px;
          font-size: 12px;
          font-weight: 700;
          transition: 0.2s ease;
          border: 1px solid transparent;
        }

        .contact-btn-invert {
          background: rgba(255, 255, 255, 0.92);
          color: #0b1d3a;
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }

        .contact-btn-invert:hover {
          background: #ffffff;
        }

        .ghost-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 11px 16px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.05);
          transition: 0.2s ease;
        }

        .ghost-link:hover {
          background: rgba(255, 255, 255, 0.09);
          color: white;
        }

        .ghost-link-large {
          padding: 14px 20px;
          font-size: 15px;
        }

        .tg-gradient-btn {
          position: relative;
          overflow: hidden;
          border-radius: 9999px;
          padding: 14px 20px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.01em;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: linear-gradient(
            90deg,
            #47b6f6 0%,
            #5da7ff 22%,
            #7c84ff 48%,
            #9c6dff 72%,
            #c25cf3 100%
          );
          background-size: 220% 220%;
          box-shadow:
            0 10px 30px rgba(71, 96, 255, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          animation: tgGradientFlow 6s ease-in-out infinite;
        }

        .tg-gradient-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.22) 25%,
            transparent 50%
          );
          transform: translateX(-130%);
          animation: tgShine 3.8s ease-in-out infinite;
        }

        .tg-gradient-btn > * {
          position: relative;
          z-index: 1;
        }

        .tg-gradient-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }

        .tg-gradient-btn-header {
          padding: 11px 16px;
          font-size: 13px;
          white-space: nowrap;
        }

        .logo-main {
          width: 216px;
          height: 60px;
          object-fit: contain;
          object-position: left center;
          display: block;
        }

        .journey-compact {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .journey-compact-card {
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          padding: 16px;
          min-height: 168px;
        }

        .journey-compact-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .journey-compact-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #f7d237;
          color: #0b1d3a;
          font-size: 16px;
          font-weight: 700;
        }

        .journey-compact-arrow {
          width: 48px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(247, 210, 55, 0.18),
            rgba(247, 210, 55, 0.95)
          );
          position: relative;
        }

        .journey-compact-arrow::after {
          content: "";
          position: absolute;
          right: -1px;
          top: 50%;
          width: 8px;
          height: 8px;
          border-top: 2px solid #f7d237;
          border-right: 2px solid #f7d237;
          transform: translateY(-50%) rotate(45deg);
        }

        .journey-compact-title {
          margin-top: 14px;
          font-size: 20px;
          line-height: 1.2;
          font-weight: 600;
          color: white;
        }

        .journey-compact-text {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.66);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .dashboard-revenue,
        .dashboard-profit,
        .dashboard-costs {
          grid-column: span 1;
        }

        .metric-card {
          min-height: 100px;
        }

        .metric-card-large {
          min-height: 100px;
        }

        .metric-card-main {
          position: relative;
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow:
            0 14px 48px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .metric-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .metric-flag {
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.01em;
          border: 1px solid transparent;
        }

        .flag-good {
          background: rgba(74, 222, 128, 0.12);
          color: rgb(167, 243, 208);
          border-color: rgba(74, 222, 128, 0.2);
        }

        .flag-bad {
          background: rgba(251, 113, 133, 0.12);
          color: rgb(253, 164, 175);
          border-color: rgba(251, 113, 133, 0.2);
        }

        .flag-neutral {
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.72);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .model-card {
          min-height: 94px;
          padding: 14px;
        }

        .slider-card {
          min-height: 136px;
          display: flex;
          flex-direction: column;
          padding: 14px;
        }

        .reset-link {
          background: transparent;
          border: 0;
          padding: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .reset-link:hover {
          color: #ffffff;
        }

        .range-input {
          cursor: pointer;
        }

        .preview-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .preview-chip {
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #0b1d3a;
          background: #f7d237;
        }

        .hero-preview-box {
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 18px;
        }

        .results-carousel-head {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 12px;
        }

        .results-carousel-actions {
          display: flex;
          gap: 8px;
        }

        .carousel-btn {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: white;
          font-size: 18px;
          transition: 0.2s ease;
        }

        .carousel-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .results-carousel-wrap {
          overflow: hidden;
        }

        .results-carousel {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(320px, 460px);
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 0 10px 0;
          scrollbar-width: none;
        }

        .results-carousel::-webkit-scrollbar {
          display: none;
        }

        .result-doc-card {
          scroll-snap-align: start;
          min-height: 280px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.11),
            rgba(255, 255, 255, 0.05)
          );
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 20px 44px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .result-doc-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          left: -20px;
          top: 24px;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.32),
            transparent 70%
          );
          filter: blur(18px);
          opacity: 0.95;
          pointer-events: none;
        }

        .result-doc-tab {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #0b1d3a;
          background: #f7d237;
        }

        .result-doc-title {
          position: relative;
          z-index: 2;
          margin-top: 22px;
          font-size: 32px;
          line-height: 1.08;
          font-weight: 600;
          color: white;
        }

        .result-doc-text {
          position: relative;
          z-index: 2;
          margin-top: 16px;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.72);
          max-width: 620px;
        }

        .stage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .stage-card {
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          padding: 18px;
          min-height: 170px;
        }

        .stage-card-title {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 14px;
          border-radius: 999px;
          background: #f7d237;
          color: #0b1d3a;
          font-size: 13px;
          font-weight: 800;
        }

        .stage-card-subtitle {
          margin-top: 16px;
          font-size: 18px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.74);
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .snapshot-structure-card {
          min-height: 430px;
        }

        .snapshot-structure {
          position: relative;
          height: 330px;
          margin-top: 22px;
        }

        .snapshot-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          min-width: 210px;
          text-align: center;
          padding: 18px 20px;
          border-radius: 24px;
          background: linear-gradient(
            180deg,
            rgba(247, 210, 55, 0.18),
            rgba(255, 255, 255, 0.05)
          );
          border: 1px solid rgba(247, 210, 55, 0.22);
          font-size: 24px;
          font-weight: 700;
          color: white;
          z-index: 4;
          box-shadow: 0 0 30px rgba(247, 210, 55, 0.08);
        }

        .snapshot-topic {
          position: absolute;
          min-width: 170px;
          text-align: center;
          padding: 12px 14px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.86);
          z-index: 3;
        }

        .topic-1 {
          left: 6%;
          top: 8%;
        }

        .topic-2 {
          right: 6%;
          top: 8%;
        }

        .topic-3 {
          left: 0%;
          top: 46%;
        }

        .topic-4 {
          right: 0%;
          top: 46%;
        }

        .topic-5 {
          left: 7%;
          bottom: 8%;
        }

        .topic-6 {
          right: 7%;
          bottom: 8%;
        }

        .snapshot-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(247, 210, 55, 0.16),
            rgba(247, 210, 55, 0.95)
          );
          border-radius: 999px;
          z-index: 2;
          transform-origin: left center;
          opacity: 0.9;
        }

        .snapshot-line::after {
          content: "";
          position: absolute;
          right: -1px;
          top: 50%;
          width: 8px;
          height: 8px;
          border-top: 2px solid #f7d237;
          border-right: 2px solid #f7d237;
          transform: translateY(-50%) rotate(45deg);
        }

        .line-1 {
          width: 112px;
          left: 34%;
          top: 28%;
          transform: rotate(-29deg);
        }

        .line-2 {
          width: 112px;
          right: 34%;
          top: 28%;
          transform: rotate(29deg);
        }

        .line-3 {
          width: 104px;
          left: 27%;
          top: 50%;
          transform: rotate(0deg);
        }

        .line-4 {
          width: 104px;
          right: 27%;
          top: 50%;
          transform: rotate(180deg);
        }

        .line-5 {
          width: 112px;
          left: 34%;
          bottom: 28%;
          transform: rotate(29deg);
        }

        .line-6 {
          width: 112px;
          right: 34%;
          bottom: 28%;
          transform: rotate(-29deg);
        }

        .cta-card {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
        }

        .cta-box {
          min-width: 280px;
          max-width: 320px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 22px;
        }

        .dot-yellow {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #f7d237;
          animation: pulseYellow 1.8s ease-in-out infinite;
          box-shadow: 0 0 12px rgba(247, 210, 55, 0.35);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          opacity: 0.18;
          mask-image: radial-gradient(circle at center, black 35%, transparent 95%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.16;
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.055) 0.6px, transparent 0.6px),
            radial-gradient(rgba(255, 255, 255, 0.035) 0.45px, transparent 0.45px),
            radial-gradient(rgba(0, 0, 0, 0.06) 0.7px, transparent 0.7px);
          background-size: 4px 4px, 6px 6px, 7px 7px;
          background-position: 0 0, 1px 2px, 2px 1px;
          mix-blend-mode: soft-light;
          filter: contrast(115%) brightness(96%);
        }

        .aurora {
          position: absolute;
          filter: blur(95px);
          opacity: 0.5;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
        }

        .aurora-1 {
          width: 42vw;
          height: 42vw;
          min-width: 420px;
          min-height: 420px;
          left: -8vw;
          top: -12vh;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.18),
            transparent 68%
          );
          animation: driftOne 16s infinite alternate ease-in-out;
        }

        .aurora-2 {
          width: 46vw;
          height: 46vw;
          min-width: 460px;
          min-height: 460px;
          right: -10vw;
          top: 4vh;
          background: radial-gradient(
            circle,
            rgba(95, 179, 179, 0.2),
            transparent 68%
          );
          animation: driftTwo 14s infinite alternate ease-in-out;
        }

        .aurora-3 {
          width: 54vw;
          height: 34vw;
          min-width: 520px;
          min-height: 300px;
          left: 10vw;
          bottom: -10vh;
          background: radial-gradient(
            circle,
            rgba(120, 120, 255, 0.12),
            transparent 70%
          );
          animation: driftThree 18s infinite alternate ease-in-out;
        }

        .aurora-4 {
          width: 30vw;
          height: 30vw;
          min-width: 280px;
          min-height: 280px;
          left: 36%;
          top: 18%;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.08),
            transparent 65%
          );
          animation: driftFour 12s infinite alternate ease-in-out;
        }

        .beam {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.14;
          transform: rotate(-18deg);
        }

        .beam-1 {
          width: 520px;
          height: 120px;
          right: -60px;
          top: 22%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(247, 210, 55, 0.28),
            transparent
          );
          animation: beamMove 10s infinite ease-in-out;
        }

        .beam-2 {
          width: 420px;
          height: 110px;
          left: -80px;
          bottom: 18%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(95, 179, 179, 0.22),
            transparent
          );
          animation: beamMoveTwo 12s infinite ease-in-out;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(42px);
          opacity: 0.14;
          will-change: transform, opacity;
        }

        .orb-1 {
          width: 220px;
          height: 220px;
          left: 10%;
          top: 42%;
          background: rgba(247, 210, 55, 0.14);
          animation: pulseOrb 9s infinite ease-in-out;
        }

        .orb-2 {
          width: 260px;
          height: 260px;
          right: 8%;
          bottom: 12%;
          background: rgba(95, 179, 179, 0.14);
          animation: pulseOrb 11s infinite ease-in-out;
          animation-delay: 1.5s;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(0, 0, 0, 0.22) 100%
          );
        }

        @keyframes pulseYellow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes driftOne {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(90px, 60px, 0) scale(1.15);
          }
        }

        @keyframes driftTwo {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-80px, 70px, 0) scale(1.12);
          }
        }

        @keyframes driftThree {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(50px, -30px, 0) scale(1.08);
          }
        }

        @keyframes driftFour {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(-45px, 35px, 0) scale(1.1);
          }
        }

        @keyframes beamMove {
          0% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.08;
          }
          50% {
            transform: translateX(-120px) rotate(-18deg);
            opacity: 0.18;
          }
          100% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.08;
          }
        }

        @keyframes beamMoveTwo {
          0% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.06;
          }
          50% {
            transform: translateX(130px) rotate(-18deg);
            opacity: 0.16;
          }
          100% {
            transform: translateX(0) rotate(-18deg);
            opacity: 0.06;
          }
        }

        @keyframes pulseOrb {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.14;
          }
          50% {
            transform: scale(1.24) translate3d(24px, -18px, 0);
            opacity: 0.22;
          }
          100% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.14;
          }
        }

        @keyframes tgGradientFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes tgShine {
          0% {
            transform: translateX(-130%);
          }
          55% {
            transform: translateX(130%);
          }
          100% {
            transform: translateX(130%);
          }
        }

        @media (max-width: 1180px) {
          .journey-compact {
            grid-template-columns: 1fr;
          }

          .journey-compact-arrow {
            display: none;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .snapshot-structure-card {
            min-height: auto;
          }

          .snapshot-structure {
            height: 420px;
          }

          .line-1,
          .line-2,
          .line-3,
          .line-4,
          .line-5,
          .line-6 {
            display: none;
          }
        }

        @media (max-width: 1023px) {
          .hero-grid,
          .cta-card {
            grid-template-columns: 1fr;
          }

          .cta-box {
            max-width: 100%;
            min-width: 100%;
          }

          .hero-highlights-row,
          .hero-highlights-sub {
            grid-template-columns: 1fr;
          }

          .hero-chart-metrics-row {
            grid-template-columns: 1fr 1fr;
          }

          .stage-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-revenue,
          .dashboard-profit,
          .dashboard-costs {
            grid-column: span 1;
          }

          .snapshot-topic {
            min-width: 140px;
            font-size: 13px;
          }
        }

        @media (max-width: 767px) {
          .sticky-header {
            top: 0;
            margin: 0 -16px 18px;
            padding: 10px 16px 8px;
          }

          .logo-main {
            width: 170px;
            height: 48px;
          }

          .header-actions {
            gap: 6px;
          }

          .contact-btn {
            min-width: 44px;
            height: 40px;
            padding: 0 12px;
            font-size: 12px;
          }

          .ghost-link {
            display: none;
          }

          .tg-gradient-btn {
            padding: 13px 16px;
            font-size: 15px;
          }

          .tg-gradient-btn-header {
            padding: 9px 12px;
            font-size: 12px;
          }

          .section-title {
            font-size: 28px;
          }

          .hero-metric-square strong {
            font-size: 16px;
          }

          .metric-card,
          .metric-card-large {
            min-height: 110px;
            padding: 16px;
            border-radius: 22px;
          }

          .metric-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .model-card {
            min-height: 90px;
            padding: 14px;
            border-radius: 18px;
          }

          .slider-card {
            min-height: 132px;
            padding: 14px;
            border-radius: 18px;
          }

          .glass-card {
            border-radius: 22px;
            padding: 16px;
          }

          .result-doc-card {
            min-height: 250px;
            padding: 20px;
          }

          .result-doc-title {
            font-size: 26px;
          }

          .result-doc-text {
            font-size: 15px;
            line-height: 1.7;
          }

          .stage-card {
            min-height: 150px;
          }

          .stage-card-subtitle {
            font-size: 16px;
            line-height: 1.7;
          }

          .snapshot-structure {
            height: 520px;
          }

          .snapshot-center {
            min-width: 170px;
            font-size: 20px;
          }

          .topic-1 {
            left: 0%;
            top: 0%;
          }

          .topic-2 {
            right: 0%;
            top: 0%;
          }

          .topic-3 {
            left: 0%;
            top: 30%;
          }

          .topic-4 {
            right: 0%;
            top: 30%;
          }

          .topic-5 {
            left: 0%;
            bottom: 4%;
          }

          .topic-6 {
            right: 0%;
            bottom: 4%;
          }

          .aurora {
            filter: blur(72px);
          }
        }
      `}</style>
    </main>
  );
}
