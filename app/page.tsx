"use client";

import { useEffect, useMemo, useState } from "react";

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
}: {
  title: string;
  value: string;
  delta: number;
  type: "revenue" | "costs" | "profit";
  invert?: boolean;
}) {
  return (
    <div className="glass-card soft-glow metric-card metric-card-main">
      <div className="metric-head">
        <div className="metric-title-wrap">
          <div className="text-sm text-white/55">{title}</div>
        </div>

        <div className="metric-right-meta">
          <div className={`metric-flag ${flagTone(type, delta)}`}>
            {getMetricFlag(type, delta)}
          </div>
          <div className={`metric-delta-top ${color(delta, invert)}`}>
            {pct(delta)}
          </div>
        </div>
      </div>

      <div className="metric-main-value">{value}</div>
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
      <div className="model-head">
        <div className="text-xs text-white/55">{title}</div>
        <div className={`model-delta-top ${color(delta, invert)}`}>{pct(delta)}</div>
      </div>
      <div className="model-main-value">{value}</div>
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
  onStart,
}: {
  title: string;
  subtitle: string;
  value: number;
  set: (v: number) => void;
  onStart: () => void;
}) {
  const [started, setStarted] = useState(false);

  return (
    <div className="glass-card soft-glow slider-card">
      <div>
        <div className="text-sm font-medium leading-snug">{title}</div>
        <div className="mt-2 min-h-[36px] text-xs leading-snug text-white/42">
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
          onMouseDown={() => {
            if (!started) {
              onStart();
              setStarted(true);
            }
          }}
          onTouchStart={() => {
            if (!started) {
              onStart();
              setStarted(true);
            }
          }}
          onMouseUp={() => setStarted(false)}
          onTouchEnd={() => setStarted(false)}
          onChange={(e) => set(Number(e.target.value))}
          className="range-input mt-4 w-full accent-[#f7d237]"
        />
        <div className="mt-2 text-xs text-white/50">{Math.round(value * 100)}%</div>
      </div>
    </div>
  );
}

function HeroEconomyChart() {
  const base = {
    leads: 10,
    deals: 2,
    avgCheck: 6500,
    margin: 30,
    revenue: 13000,
    opex: 3500,
    cogs: 3900,
    grossProfit: 5600,
  };

  const drivers = [
    {
      key: "positioning",
      label: "#Позиционирование",
      full: "Позиционирование",
      deltaLabel: "+рост спроса и конверсии",
      leads: 10,
      deals: 2.4,
      avgCheck: 6500,
      margin: 48,
      revenue: 15600,
      opex: 3900,
      cogs: 4200,
      grossProfit: 7500,
    },
    {
      key: "check",
      label: "#СреднийЧек",
      full: "Средний чек",
      deltaLabel: "+$1,100 к чеку",
      leads: 10,
      deals: 2.0,
      avgCheck: 7600,
      margin: 49,
      revenue: 15200,
      opex: 3600,
      cogs: 4200,
      grossProfit: 7400,
    },
    {
      key: "sales",
      label: "#Продажи",
      full: "Продажи",
      deltaLabel: "+0.8 сделки",
      leads: 10,
      deals: 2.8,
      avgCheck: 6500,
      margin: 47,
      revenue: 18200,
      opex: 4600,
      cogs: 5100,
      grossProfit: 8500,
    },
    {
      key: "costs",
      label: "#УправлениеРасходами",
      full: "Управление расходами",
      deltaLabel: "-давление на OPEX и Margin",
      leads: 10,
      deals: 2.0,
      avgCheck: 6500,
      margin: 51,
      revenue: 13000,
      opex: 2500,
      cogs: 3900,
      grossProfit: 6600,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % drivers.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [drivers.length]);

  const active = drivers[activeIndex];

  const bars = [
    { name: "Revenue", value: active.revenue, good: true, isPercent: false },
    { name: "OPEX", value: active.opex, good: false, isPercent: false },
    { name: "COGS", value: active.cogs, good: false, isPercent: false },
    { name: "Gross Profit", value: active.grossProfit, good: true, isPercent: false },
    { name: "Margin", value: active.margin, good: true, isPercent: true },
  ];

  const maxBar = Math.max(...bars.map((b) => b.value));

  return (
    <aside className="glass-card hero-chart-card">
      <div className="text-sm text-white/55">Как двигается экономика</div>
      <div className="mt-2 text-2xl font-semibold text-white md:text-[2rem] md:leading-[1.1]">
        MVP-драйверы, которые меняют деньги в модели
      </div>
      <p className="mt-3 text-sm leading-7 text-white/64">
        Здесь не нужно ничего нажимать. Сверху меняется драйвер, а диаграмма
        показывает, какие блоки экономики он перестраивает сильнее всего.
      </p>

      <div className="hero-levers-inline">
        {drivers.map((item, index) => (
          <div
            key={item.key}
            className={`hero-tag ${index === activeIndex ? "hero-tag-active" : ""}`}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div className="hero-chart-box">
        <div className="hero-chart-metrics-row">
          <div className="hero-metric-square">
            <span>Лидов / мес</span>
            <strong>{active.leads}</strong>
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
            <strong>{active.margin}%</strong>
          </div>
        </div>

        <div className="bar-chart-wrap">
          <div className="bar-chart-grid" />
          <div className="bar-chart-columns">
            {bars.map((bar) => {
              const height = Math.max(18, (bar.value / maxBar) * 160);

              return (
                <div key={bar.name} className="bar-chart-col">
                  <div className="bar-chart-value">
                    {bar.isPercent ? `${bar.value}%` : fmtMoney(bar.value)}
                  </div>

                  <div className="bar-chart-bar-shell">
                    <div
                      className={`bar-chart-bar ${bar.good ? "bar-good" : "bar-bad"}`}
                      style={{ height: `${height}px` }}
                    />
                  </div>

                  <div className="bar-chart-label">{bar.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="hero-chart-bottom no-border-cards">
          <div className="hero-money-card hero-money-card-clean">
            <span>База</span>
            <strong>{fmtMoney(base.revenue)}</strong>
            <small>{fmtMoney(base.grossProfit)} gross profit / мес</small>
          </div>

          <div className="hero-money-card hero-money-card-clean">
            <span>Активный драйвер</span>
            <strong>{fmtMoney(active.revenue)}</strong>
            <small>{fmtMoney(active.grossProfit)} gross profit / мес</small>
          </div>
        </div>

        <div className="hero-active-note">
          <span className="hero-active-note-dot" />
          <span>
            Сейчас подсвечен <b>{active.full}</b> — {active.deltaLabel}.
          </span>
        </div>
      </div>
    </aside>
  );
}

function SnapshotStructure() {
  const topics = [
    { title: "Продукт", cls: "topic-top-left" },
    { title: "Трафик", cls: "topic-top-right" },
    { title: "Продажи", cls: "topic-middle-left" },
    { title: "Экономика", cls: "topic-middle-right" },
    { title: "Операционные ограничения", cls: "topic-bottom-left" },
    { title: "Цели роста", cls: "topic-bottom-right" },
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

        <span className="arrow arrow-1" />
        <span className="arrow arrow-2" />
        <span className="arrow arrow-3" />
        <span className="arrow arrow-4" />
        <span className="arrow arrow-5" />
        <span className="arrow arrow-6" />
      </div>
    </div>
  );
}

function ResultDocCard({
  tab,
  title,
  text,
}: {
  tab: string;
  title: string;
  text: string;
}) {
  return (
    <div className="result-doc-card result-doc-card-grid">
      <div className="result-doc-tab">{tab}</div>
      <div className="result-doc-title">{title}</div>
      <div className="result-doc-text">{text}</div>
    </div>
  );
}

function StageCard({
  stage,
  icon,
  request,
  goal,
  path,
  result,
}: {
  stage: string;
  icon: string;
  request: string;
  goal: string;
  path: string;
  result: string;
}) {
  return (
    <div className="stage-card stage-card-animated">
      <div className="stage-card-glow" />

      <div className="stage-icon">
        <img src={icon} alt={stage} />
        <div className="stage-label">
          <span>stage</span>
          <b>{stage}</b>
        </div>
      </div>

      <div className="stage-content">
        <div className="stage-row">
          <div className="stage-title">Запрос</div>
          <div className="stage-text">{request}</div>
        </div>

        <div className="stage-row">
          <div className="stage-title">Выявленная цель</div>
          <div className="stage-text">{goal}</div>
        </div>

        <div className="stage-row">
          <div className="stage-title">
            Как достичь цели в рамках текущих ресурсов
          </div>
          <div className="stage-text">{path}</div>
        </div>

        <div className="stage-row">
          <div className="stage-title">Решение</div>
          <div className="stage-text">{result}</div>
        </div>
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

  const [history, setHistory] = useState<
    Array<{
      clientsInput: string;
      checkInput: string;
      sales: number;
      retention: number;
      upsell: number;
      opexEff: number;
    }>
  >([]);

  const payUrl = "#";
  const tgContactUrl = "https://t.me/growth_avenue_company";
  const waContactUrl = "https://wa.me/995555163833";

  const resultDocs = [
    {
      tab: "Economic Rate",
      title: "Executive Summary",
      text: "Данные о вашем продукте, его маржинальности и спросе выявляют сильные и слабые стороны бизнеса и определяется главный фокус на данный момент.",
    },
    {
      tab: "Growth Limit",
      title: "Key Conclusions",
      text: "Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели.",
    },
    {
      tab: "Solution",
      title: "Strategy&Practice",
      text: "На основе проведенного анализа данных определяется первичная задача: целью по сути всегда является повышение дохода, но так как доход строится на огромном количестве факторов, то и первостепенные действия направлены на закрытие текущих точек риска. Предлагается продуктовый MVP в соответствие с ресурсами компании.",
    },
    {
      tab: "JTBD",
      title: "RoadMap",
      text: "Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP. Определение KPI для каждого из этапов в соответствие поставленным задачам и целям.",
    },
  ];

  const pushHistory = () => {
    setHistory((prev) => [
      ...prev,
      {
        clientsInput,
        checkInput,
        sales,
        retention,
        upsell,
        opexEff,
      },
    ]);
  };

  const handleUndo = () => {
    setHistory((prev) => {
      if (!prev.length) return prev;
      const last = prev[prev.length - 1];

      setClientsInput(last.clientsInput);
      setCheckInput(last.checkInput);
      setSales(last.sales);
      setRetention(last.retention);
      setUpsell(last.upsell);
      setOpexEff(last.opexEff);

      return prev.slice(0, -1);
    });
  };

  const handleReset = () => {
    pushHistory();
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
  const salesCostDelta = safeDiv(data.salesCost - base.salesCost, base.salesCost);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#041a3d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="noise-overlay-strong" />
        <div className="grain-cloud cloud-1" />
        <div className="grain-cloud cloud-2" />
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

              <a
                href="#try"
                className="tg-gradient-btn tg-gradient-btn-header inline-flex"
              >
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

            <div className="hero-highlights-row hero-highlights-row-unified">
              <div className="hero-highlight-chip hero-chip-unified">
                Упущенная выгода
              </div>
              <div className="hero-highlight-chip hero-chip-unified">
                Драйвер роста
              </div>
              <div className="hero-highlight-chip hero-chip-unified">
                Главный фокус
              </div>
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
                На посадочной пользователь видит механику модели и понимает, что
                влияет на деньги компании.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">2</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">Оплата и переход в Telegram</div>
              <div className="journey-compact-text">
                После оплаты бот собирает данные о продукте, трафике, продажах,
                экономике и операционных ограничениях.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">3</div>
              </div>
              <div className="journey-compact-title">Готовый Revenue Snapshot</div>
              <div className="journey-compact-text">
                На выходе — структурированный разбор с выводами, проблемными зонами
                и приоритетом следующих действий.
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
              сигналы. Полный разбор открывается после оплаты. Модель на этой
              странице не передает и не запоминает введенные вами данные, поэтому
              сценарий безопасен для быстрого теста.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="input-grid mb-6 gap-3">
                <label className="input-shell input-shell-highlight">
                  <span className="input-label input-label-strong">
                    Клиентов / месяц
                  </span>

                  <div className="input-wrap input-wrap-primary">
                    <span className="input-badge">ввод</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={clientsInput}
                      onFocus={pushHistory}
                      onChange={(e) =>
                        setClientsInput(normalizeDigits(e.target.value))
                      }
                      className="glass-input glass-input-primary"
                      placeholder="Например, 20"
                    />
                  </div>
                </label>

                <label className="input-shell input-shell-highlight">
                  <span className="input-label input-label-strong">
                    Средний чек
                  </span>

                  <div className="input-wrap input-wrap-primary">
                    <span className="input-badge">ввод</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={checkInput}
                      onFocus={pushHistory}
                      onChange={(e) =>
                        setCheckInput(normalizeDigits(e.target.value))
                      }
                      className="glass-input glass-input-primary"
                      placeholder="Например, 2000"
                    />
                  </div>
                </label>
              </div>

              <section className="dashboard-grid">
                <div className="dashboard-revenue">
                  <TopMetricCard
                    title="Выручка"
                    value={fmtMoney(data.revenue)}
                    delta={revDelta}
                    type="revenue"
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

                <div className="preview-actions-inline">
                  <button
                    type="button"
                    onClick={handleUndo}
                    className="reset-link"
                    disabled={!history.length}
                  >
                    Отменить действие
                  </button>

                  <button type="button" onClick={handleReset} className="reset-link">
                    Сбросить
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 xl:grid-cols-4">
                <Slider
                  title="Эффективность продаж"
                  subtitle="Влияние на конверсию и поток клиентов."
                  value={sales}
                  set={setSales}
                  onStart={pushHistory}
                />
                <Slider
                  title="Повторные продажи"
                  subtitle="Влияние на устойчивость выручки."
                  value={retention}
                  set={setRetention}
                  onStart={pushHistory}
                />
                <Slider
                  title="Средний чек"
                  subtitle="Рост денег без роста трафика."
                  value={upsell}
                  set={setUpsell}
                  onStart={pushHistory}
                />
                <Slider
                  title="Загрузка команды"
                  subtitle="Влияние на расходы и маржу."
                  value={opexEff}
                  set={setOpexEff}
                  onStart={pushHistory}
                />
              </div>
            </div>

            <aside className="glass-card h-fit lg:sticky lg:top-24">
              <div className="reserve-kicker">Оценочный резерв</div>

              <div className="hero-preview-box mt-4">
                <div className="reserve-amount">≈ {fmtMoney(estimatedGap)} / мес</div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Это только лишь механика, полный разбор раскрывает ваши реальные
                  возможности при текущей ситуации вашего бизнеса.
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
                    Подвигайте ползунки ниже, чтобы увидеть, какой рычаг заметнее
                    всего влияет на экономику модели.
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
            <h2 className="section-title">Цели Revenue Snapshot</h2>
            <p className="section-copy">
              Понять, каким должен быть первый{" "}
              <span className="accent-word">верный</span> шаг к построению новой
              стратегии для новых рубежей.
            </p>
          </div>

          <div className="results-grid-2x2">
            {resultDocs.map((doc) => (
              <ResultDocCard
                key={doc.title}
                tab={doc.tab}
                title={doc.title}
                text={doc.text}
              />
            ))}
          </div>

          <div className="results-footer-cta">
            <p className="results-footer-text">
              После получения и изучения результатов у Вас есть возможность
              назначить 30-минутную встречу с нашими C-level специалистами в сфере
              Маркетинга и Продаж для декомпозиции результатов.
            </p>

            <a href="#try" className="tg-gradient-btn inline-flex">
              Начать
            </a>
          </div>
        </section>

        <section className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Для кого этот инструмент</div>

            <h2 className="section-title">
              Revenue Snapshot проверен на таких направлениях как
            </h2>

            <div className="industries-row">
              SaaS · E-com · FinTech · EdTech · HealthTech · B2B
            </div>
          </div>

          <div className="stage-grid stage-grid-detailed">
            <div className="stage-delay-1">
              <StageCard
                stage="Seed"
                icon="/stages/seed.svg"
                request="Проверка идеи продукта"
                goal="Найти первую рабочую экономику"
                path="Как выйти на первые продажи"
                result="Понимание MVP-модели"
              />
            </div>

            <div className="stage-delay-2">
              <StageCard
                stage="Startup"
                icon="/stages/startup.svg"
                request="Рост первых продаж"
                goal="Увеличить поток клиентов"
                path="Как масштабировать спрос"
                result="Определение ключевых рычагов"
              />
            </div>

            <div className="stage-delay-3">
              <StageCard
                stage="Growth"
                icon="/stages/growth.svg"
                request="Ускорение роста"
                goal="Повысить доходность бизнеса"
                path="Оптимизация unit-экономики"
                result="Сильная экономическая модель"
              />
            </div>

            <div className="stage-delay-4">
              <StageCard
                stage="Expansion"
                icon="/stages/expansion.svg"
                request="Выход на новые рынки"
                goal="Найти новый уровень роста"
                path="Стратегия масштабирования"
                result="Новая стратегия роста"
              />
            </div>
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
              анализируются автоматически и превращаются в структурированный
              результат.
            </p>
          </div>

          <div className="analysis-grid">
            <SnapshotStructure />

            <div className="glass-card">
              <h3 className="text-lg font-semibold text-white">
                Что происходит дальше
              </h3>
              <p className="mt-4 text-sm leading-8 text-white/68">
                Ответы анализируются автоматически, после чего данные собираются в
                итоговый Revenue Snapshot с выводами, ключевыми точками потери
                выручки и приоритетом следующих шагов.
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
            rgba(4, 26, 61, 0.9),
            rgba(4, 26, 61, 0.46)
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

        .hero-chart-card {
          display: flex;
          flex-direction: column;
        }

        .hero-highlights-row {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .hero-highlights-row-unified {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.04) 0%,
              rgba(255, 255, 255, 0.06) 20%,
              rgba(247, 210, 55, 0.12) 40%,
              rgba(123, 132, 255, 0.12) 62%,
              rgba(194, 92, 243, 0.12) 84%,
              rgba(255, 255, 255, 0.05) 100%
            );
          background-size: 220% 220%;
          animation: unifiedGradientFlow 10s ease-in-out infinite;
        }

        .hero-highlight-chip {
          padding: 16px 18px;
          color: white;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          white-space: nowrap;
          line-height: 1.2;
          position: relative;
          background: transparent;
        }

        .hero-highlight-chip:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 12px;
          right: 0;
          width: 1px;
          height: calc(100% - 24px);
          background: rgba(255, 255, 255, 0.09);
        }

        .hero-chip-unified {
          backdrop-filter: blur(2px);
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
          white-space: nowrap;
        }

        .bar-chart-wrap {
          position: relative;
          margin-top: 6px;
          border-radius: 22px;
          padding: 18px 14px 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.045),
            rgba(255, 255, 255, 0.02)
          );
          overflow: hidden;
        }

        .bar-chart-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 100% 40px;
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.8)
          );
          pointer-events: none;
        }

        .bar-chart-columns {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          align-items: end;
          min-height: 240px;
        }

        .bar-chart-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          min-height: 240px;
        }

        .bar-chart-value {
          font-size: 11px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          min-height: 28px;
        }

        .bar-chart-bar-shell {
          width: 100%;
          max-width: 54px;
          height: 170px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bar-chart-bar {
          width: 100%;
          border-radius: 14px 14px 6px 6px;
          transition: height 0.8s ease, transform 0.8s ease;
          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.14),
            0 0 18px rgba(255, 255, 255, 0.04);
        }

        .bar-good {
          background: linear-gradient(
            180deg,
            rgba(247, 210, 55, 1) 0%,
            rgba(244, 221, 114, 1) 55%,
            rgba(176, 140, 255, 0.95) 100%
          );
        }

        .bar-bad {
          background: linear-gradient(
            180deg,
            rgba(95, 179, 179, 0.95) 0%,
            rgba(93, 167, 255, 0.95) 60%,
            rgba(124, 132, 255, 0.9) 100%
          );
        }

        .bar-chart-label {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.62);
          text-align: center;
          line-height: 1.35;
          min-height: 32px;
        }

        .hero-chart-bottom {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .no-border-cards {
          margin-top: 14px;
        }

        .hero-money-card {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          padding: 12px;
        }

        .hero-money-card-clean {
          border: 0;
          background: transparent;
          padding: 0;
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
          white-space: nowrap;
        }

        .hero-money-card small {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.58);
        }

        .hero-active-note {
          margin-top: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(247, 210, 55, 0.18);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 999px;
          padding: 9px 12px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 13px;
          line-height: 1.45;
        }

        .hero-active-note b {
          color: #f7d237;
        }

        .hero-active-note-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 10px rgba(247, 210, 55, 0.35);
          animation: pulseTinyYellow 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .section-head {
          max-width: 920px;
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

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .input-shell {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-shell-highlight {
          position: relative;
        }

        .input-label {
          font-size: 12px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.52);
          padding-left: 4px;
        }

        .input-label-strong {
          color: rgba(255, 255, 255, 0.82);
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap-primary::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          background: linear-gradient(
            135deg,
            rgba(247, 210, 55, 0.52),
            rgba(120, 132, 255, 0.16),
            rgba(255, 255, 255, 0.08)
          );
          opacity: 0.95;
          z-index: 0;
        }

        .input-badge {
          position: absolute;
          top: 10px;
          right: 12px;
          z-index: 3;
          border-radius: 9999px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #0b1d3a;
          background: rgba(247, 210, 55, 0.95);
          box-shadow:
            0 4px 14px rgba(247, 210, 55, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .glass-input {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.055)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 14px 16px;
          border-radius: 18px;
          backdrop-filter: blur(18px);
          color: white;
          font-size: 20px;
          font-weight: 500;
          width: 100%;
          transition: 0.25s ease;
        }

        .glass-input-primary {
          position: relative;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.075)
          );
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.2),
            0 12px 34px rgba(0, 0, 0, 0.12),
            0 0 28px rgba(247, 210, 55, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .glass-input:focus {
          outline: none;
          border-color: rgba(247, 210, 55, 0.75);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.22),
            0 0 30px rgba(247, 210, 55, 0.12),
            0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .metric-card {
          min-height: 102px;
        }

        .metric-card-main {
          position: relative;
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow:
            0 14px 48px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .metric-head,
        .model-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .metric-title-wrap {
          min-width: 0;
        }

        .metric-right-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
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

        .metric-delta-top,
        .model-delta-top {
          font-size: 15px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
        }

        .metric-main-value {
          margin-top: 16px;
          font-size: clamp(1.6rem, 2.1vw, 2.4rem);
          line-height: 1.05;
          font-weight: 700;
          white-space: nowrap;
          letter-spacing: -0.02em;
        }

        .model-main-value {
          margin-top: 14px;
          font-size: clamp(1.2rem, 1.55vw, 1.65rem);
          line-height: 1.05;
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: -0.01em;
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
          min-height: 92px;
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

        .reset-link:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .preview-actions-inline {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .range-input {
          cursor: pointer;
        }

        .reserve-kicker {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #f7d237;
        }

        .hero-preview-box {
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          padding: 18px;
        }

        .reserve-amount {
          font-size: 3rem;
          line-height: 1.02;
          font-weight: 700;
          color: #f7d237;
          text-shadow: 0 0 24px rgba(247, 210, 55, 0.14);
        }

        .accent-word {
          color: #f7d237;
          font-weight: 700;
        }

        .results-grid-2x2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 18px;
        }

        .result-doc-card-grid {
          min-height: 320px;
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

        .result-doc-card-grid::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          left: -20px;
          top: 24px;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.24),
            transparent 70%
          );
          filter: blur(18px);
          opacity: 0.9;
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
          font-size: 34px;
          line-height: 1.08;
          font-weight: 600;
          color: white;
        }

        .result-doc-text {
          position: relative;
          z-index: 2;
          margin-top: 18px;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.72);
        }

        .results-footer-cta {
          margin-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.035);
          padding: 20px 22px;
        }

        .results-footer-text {
          max-width: 860px;
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.72);
        }

        .industries-row {
          margin-top: 10px;
          font-size: 20px;
          color: #f7d237;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .stage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .stage-grid-detailed {
          margin-top: 30px;
        }

        .stage-delay-1,
        .stage-delay-2,
        .stage-delay-3,
        .stage-delay-4 {
          opacity: 0;
          transform: translateY(24px) scale(0.985);
          animation: stageReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .stage-delay-1 {
          animation-delay: 0.05s;
        }

        .stage-delay-2 {
          animation-delay: 0.16s;
        }

        .stage-delay-3 {
          animation-delay: 0.28s;
        }

        .stage-delay-4 {
          animation-delay: 0.4s;
        }

        .stage-card {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 30px;
          padding: 28px;
          border-radius: 26px;
          background:
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.09),
              rgba(255, 255, 255, 0.035)
            ),
            radial-gradient(
              circle at top left,
              rgba(124, 132, 255, 0.08),
              transparent 38%
            );
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
        }

        .stage-card-animated {
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .stage-card-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          right: -60px;
          top: -70px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.16),
            rgba(124, 132, 255, 0.08),
            transparent 72%
          );
          filter: blur(24px);
          opacity: 0;
          transform: scale(0.9);
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
          pointer-events: none;
        }

        .stage-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.04),
            transparent 30%,
            transparent 70%,
            rgba(255, 255, 255, 0.035)
          );
          opacity: 0.8;
          pointer-events: none;
        }

        .stage-card:hover {
          transform: translateY(-6px);
          border-color: rgba(247, 210, 55, 0.18);
          box-shadow:
            0 26px 54px rgba(0, 0, 0, 0.22),
            0 0 0 1px rgba(247, 210, 55, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .stage-card:hover .stage-card-glow {
          opacity: 1;
          transform: scale(1);
        }

        .stage-card:hover .stage-title {
          color: #ffe16e;
        }

        .stage-icon {
          position: relative;
          background: white;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .stage-card:hover .stage-icon {
          transform: translateY(-2px);
          box-shadow:
            0 18px 34px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.55);
        }

        .stage-icon img {
          width: 90px;
          transition: transform 0.35s ease;
        }

        .stage-card:hover .stage-icon img {
          transform: scale(1.035);
        }

        .stage-label {
          position: absolute;
          top: 16px;
          right: 16px;
          text-align: right;
          color: #0b1d3a;
        }

        .stage-label span {
          font-size: 12px;
        }

        .stage-label b {
          display: block;
          font-size: 18px;
        }

        .stage-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stage-row {
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .stage-card:hover .stage-row {
          transform: translateX(2px);
        }

        .stage-title {
          font-size: 18px;
          font-weight: 600;
          color: #f7d237;
        }

        .stage-text {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          transition: color 0.3s ease;
        }

        .stage-card:hover .stage-text {
          color: rgba(255, 255, 255, 0.84);
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .snapshot-structure-card {
          min-height: 460px;
        }

        .snapshot-structure {
          position: relative;
          height: 350px;
          margin-top: 22px;
        }

        .snapshot-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          min-width: 230px;
          text-align: center;
          padding: 18px 22px;
          border-radius: 26px;
          background: linear-gradient(
            180deg,
            rgba(247, 210, 55, 0.96),
            rgba(235, 198, 38, 0.94)
          );
          font-size: 24px;
          font-weight: 700;
          color: #0b1d3a;
          z-index: 5;
          box-shadow:
            0 0 24px rgba(247, 210, 55, 0.22),
            0 18px 40px rgba(0, 0, 0, 0.12);
        }

        .snapshot-topic {
          position: absolute;
          min-width: 185px;
          text-align: center;
          padding: 12px 14px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.86);
          z-index: 3;
        }

        .topic-top-left {
          left: 8%;
          top: 2%;
        }

        .topic-top-right {
          right: 8%;
          top: 2%;
        }

        .topic-middle-left {
          left: 0%;
          top: 36%;
        }

        .topic-middle-right {
          right: 0%;
          top: 36%;
        }

        .topic-bottom-left {
          left: 10%;
          bottom: 4%;
        }

        .topic-bottom-right {
          right: 10%;
          bottom: 4%;
        }

        .arrow {
          position: absolute;
          height: 3px;
          background: linear-gradient(
            90deg,
            rgba(247, 210, 55, 0.2),
            rgba(247, 210, 55, 0.96)
          );
          border-radius: 999px;
          z-index: 2;
          transform-origin: left center;
          opacity: 0.95;
        }

        .arrow::after {
          content: "";
          position: absolute;
          right: -2px;
          top: 50%;
          width: 10px;
          height: 10px;
          border-top: 3px solid #f7d237;
          border-right: 3px solid #f7d237;
          transform: translateY(-50%) rotate(45deg);
        }

        .arrow-1 {
          width: 126px;
          left: 49%;
          top: 31%;
          transform: rotate(-148deg);
        }

        .arrow-2 {
          width: 126px;
          left: 52%;
          top: 31%;
          transform: rotate(-32deg);
        }

        .arrow-3 {
          width: 120px;
          left: 43%;
          top: 51%;
          transform: rotate(180deg);
        }

        .arrow-4 {
          width: 120px;
          left: 57%;
          top: 51%;
          transform: rotate(0deg);
        }

        .arrow-5 {
          width: 128px;
          left: 49%;
          top: 68%;
          transform: rotate(148deg);
        }

        .arrow-6 {
          width: 128px;
          left: 52%;
          top: 68%;
          transform: rotate(32deg);
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
            linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.028) 1px,
              transparent 1px
            );
          background-size: 72px 72px;
          opacity: 0.22;
          mask-image: radial-gradient(circle at center, black 35%, transparent 95%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.18;
          background-image:
            radial-gradient(
              rgba(255, 255, 255, 0.06) 0.6px,
              transparent 0.6px
            ),
            radial-gradient(
              rgba(255, 255, 255, 0.038) 0.45px,
              transparent 0.45px
            ),
            radial-gradient(rgba(0, 0, 0, 0.06) 0.7px, transparent 0.7px);
          background-size: 4px 4px, 6px 6px, 7px 7px;
          background-position: 0 0, 1px 2px, 2px 1px;
          mix-blend-mode: soft-light;
        }

        .noise-overlay-strong {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          background-image:
            radial-gradient(
              rgba(255, 255, 255, 0.12) 0.45px,
              transparent 0.45px
            ),
            radial-gradient(
              rgba(255, 255, 255, 0.08) 0.3px,
              transparent 0.3px
            );
          background-size: 3px 3px, 5px 5px;
          background-position: 0 0, 2px 1px;
          mix-blend-mode: overlay;
          filter: contrast(120%);
        }

        .grain-cloud {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.18;
        }

        .cloud-1 {
          width: 520px;
          height: 280px;
          left: -40px;
          top: 120px;
          background: radial-gradient(
            circle,
            rgba(118, 129, 255, 0.34),
            transparent 70%
          );
        }

        .cloud-2 {
          width: 520px;
          height: 320px;
          right: -60px;
          bottom: 140px;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.22),
            transparent 72%
          );
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

        .orb-3 {
          width: 300px;
          height: 300px;
          left: 42%;
          top: 30%;
          background: rgba(124, 132, 255, 0.12);
          animation: pulseOrb 12s infinite ease-in-out;
          animation-delay: 0.6s;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 45%,
            rgba(0, 0, 0, 0.24) 100%
          );
        }

        @keyframes unifiedGradientFlow {
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

        @keyframes pulseTinyYellow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.22);
            opacity: 0.72;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes stageReveal {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
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

          .results-grid-2x2,
          .stage-grid {
            grid-template-columns: 1fr;
          }

          .results-footer-cta {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 1023px) {
          .hero-grid,
          .cta-card {
            grid-template-columns: 1fr;
          }

          .hero-chart-metrics-row {
            grid-template-columns: 1fr 1fr;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .analysis-grid {
            grid-template-columns: 1fr;
          }

          .snapshot-structure {
            height: 460px;
          }

          .arrow {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .stage-card {
            grid-template-columns: 120px 1fr;
          }

          .stage-icon img {
            width: 60px;
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

          .hero-highlights-row {
            grid-template-columns: 1fr;
          }

          .hero-highlight-chip {
            white-space: normal;
          }

          .hero-chart-metrics-row {
            grid-template-columns: 1fr 1fr;
          }

          .bar-chart-columns {
            gap: 6px;
          }

          .metric-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .glass-card {
            border-radius: 22px;
            padding: 16px;
          }

          .reserve-amount {
            font-size: 2.4rem;
          }

          .result-doc-card-grid {
            min-height: auto;
            padding: 20px;
          }

          .result-doc-title {
            font-size: 28px;
          }

          .result-doc-text {
            font-size: 15px;
            line-height: 1.7;
          }

          .results-footer-text {
            font-size: 14px;
            line-height: 1.75;
          }

          .snapshot-structure {
            height: 560px;
          }

          .snapshot-center {
            min-width: 170px;
            font-size: 20px;
          }

          .snapshot-topic {
            min-width: 150px;
            font-size: 13px;
          }

          .topic-top-left {
            left: 4%;
            top: 0%;
          }

          .topic-top-right {
            right: 4%;
            top: 0%;
          }

          .topic-middle-left {
            left: 0%;
            top: 34%;
          }

          .topic-middle-right {
            right: 0%;
            top: 34%;
          }

          .topic-bottom-left {
            left: 6%;
            bottom: 4%;
          }

          .topic-bottom-right {
            right: 6%;
            bottom: 4%;
          }

          .input-grid {
            grid-template-columns: 1fr;
          }

          .metric-main-value {
            font-size: 1.85rem;
          }

          .model-main-value {
            font-size: 1.2rem;
          }

          .metric-right-meta {
            gap: 6px;
          }

          .metric-delta-top,
          .model-delta-top {
            font-size: 13px;
          }

          .preview-actions-inline {
            gap: 10px;
            flex-wrap: wrap;
            justify-content: flex-end;
          }

          .aurora {
            filter: blur(72px);
          }
        }
      `}</style>
    </main>
  );
}
