"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

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
          <div className="metric-label">{title}</div>
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
        <div className="model-label">{title}</div>
        <div className={`model-delta-top ${color(delta, invert)}`}>
          {pct(delta)}
        </div>
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
        <div className="mt-2 text-xs text-white/50">
          {Math.round(value * 100)}%
        </div>
      </div>
    </div>
  );
}

function HeroEconomyChart() {
  const base = {
    leads: 10,
    deals: 2.0,
    aov: 3200,
    margin: 40,
    revenue: 13000,
    opex: 3500,
    cogs: 3900,
    grossProfit: 5600,
  };

  const drivers = [
   {
  key: "marketing",
  label: "#Маркетинг",
  full: "Маркетинг",
  deltaLabel: "+30% лидов и рост спроса",
  leads: 13,
  deals: 2.4,
  aov: 3200,
  margin: 42,
  revenue: 14800,
  opex: 3200,
  cogs: 3600,
  grossProfit: 6200,
},
    {
      key: "aov",
      label: "#AOV",
      full: "AOV",
      deltaLabel: "+рост среднего заказа",
      leads: 10,
      deals: 2.0,
      aov: 4100,
      margin: 44,
      revenue: 15200,
      opex: 3300,
      cogs: 3900,
      grossProfit: 6700,
    },
    {
      key: "sales",
      label: "#Продажи",
      full: "Продажи",
      deltaLabel: "+0.8 сделки",
      leads: 10,
      deals: 2.8,
      aov: 3200,
      margin: 45,
      revenue: 18200,
      opex: 4600,
      cogs: 5100,
      grossProfit: 8500,
    },
    {
      key: "costs",
      label: "#Модель расходов",
      full: "Модель расходов",
      deltaLabel: "−давление на OPEX и Margin",
      leads: 10,
      deals: 2.0,
      aov: 3200,
      margin: 51,
      revenue: 13000,
      opex: 2500,
      cogs: 3900,
      grossProfit: 6600,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(3);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % drivers.length);
    }, 3400);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [drivers.length]);

  const setDriver = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % drivers.length);
    }, 3400);
  };

  const active = drivers[activeIndex];

  const bars = [
    { name: "Revenue", value: active.revenue, good: true, isPercent: false },
    { name: "OPEX", value: active.opex, good: false, isPercent: false },
    { name: "COGS", value: active.cogs, good: false, isPercent: false },
    {
      name: "Gross Profit",
      value: active.grossProfit,
      good: true,
      isPercent: false,
    },
    { name: "Margin", value: active.margin, good: true, isPercent: true },
  ];

  const maxBar = Math.max(...bars.map((b) => b.value));

  return (
    <div className="hero-visual-shell">
      <div className="hero-chart-float">
        <div className="hero-chart-float-title">MVP-Drivers</div>

        <div className="hero-levers-inline hero-levers-inline-float">
          {drivers.map((item, index) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setDriver(index)}
              className={`hero-tag ${
                index === activeIndex ? "hero-tag-active" : ""
              }`}
            >
              {item.label}
            </button>
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
              <span>AOV</span>
              <strong>{fmtMoney(active.aov)}</strong>
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
               const baseHeight = (bar.value / maxBar) * 130;
const height = Math.max(
  16,
  bar.name === "Revenue" ? baseHeight * 1.12 : baseHeight
);

                return (
                  <div key={bar.name} className="bar-chart-col">
                    <div className="bar-chart-value">
                      {bar.isPercent ? `${bar.value}%` : fmtMoney(bar.value)}
                    </div>

                    <div className="bar-chart-bar-shell">
                      <div
                        className={`bar-chart-bar ${
                          bar.good ? "bar-good" : "bar-bad"
                        }`}
                        style={{ height: `${height}px` }}
                      />
                    </div>

                    <div className="bar-chart-label">{bar.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-chart-bottom">
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
      </div>
    </div>
  );
}

function SnapshotStructure() {
  return (
    <div className="glass-card snapshot-structure-card">
      <h3 className="analysis-left-title">Из чего состоит Revenue Snapshot</h3>

      <p className="snapshot-builder-copy">
        ваши данные под защищенными протоколами обрабатываются инструментом для
        формирования стратегических решений вашего бизнеса
      </p>

      <div className="snapshot-builder">
        <div className="builder-block builder-block-1">Продукт</div>
        <div className="builder-block builder-block-2">Клиенты</div>
        <div className="builder-block builder-block-3">Экономика</div>
        <div className="builder-block builder-block-4">Структура компании</div>
        <div className="builder-block builder-block-5">Позиционирование</div>
      </div>
    </div>
  );
}

function ResultDocCard({
  tab,
  title,
  text,
  cta,
}: {
  tab: string;
  title: string;
  text: string;
  cta?: ReactNode;
}) {
  return (
    <div className="result-doc-card tilt-card">
      <div className="result-doc-card-inner tilt-inner">
        <div className="result-doc-top">
          <div className="result-doc-tab">{tab}</div>
          {cta ? <div className="result-doc-cta">{cta}</div> : null}
        </div>

        <div className="result-doc-title">{title}</div>
        <div className="result-doc-text">{text}</div>
      </div>
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
    <div className="stage-card stage-card-figure">
      <div className="stage-top-strip">
        <div className="stage-top-strip-icon">
          <img src={icon} alt={stage} className="stage-strip-icon" />
        </div>

        <div className="stage-top-strip-label">
          <span>stage</span>
          <strong>{stage}</strong>
        </div>
      </div>

      <div className="stage-card-content stage-card-content-full">
        <div className="stage-line-block">
          <div className="stage-line-title">Запрос</div>
          <div className="stage-line-text">{request}</div>
        </div>

        <div className="stage-line-block">
          <div className="stage-line-title">Выявленная цель</div>
          <div className="stage-line-text">{goal}</div>
        </div>

        <div className="stage-line-block">
          <div className="stage-line-title">
            Как достичь цели в рамках текущих ресурсов
          </div>
          <div className="stage-line-text">{path}</div>
        </div>

        <div className="stage-line-block">
          <div className="stage-line-title">Решение</div>
          <div className="stage-line-text">{result}</div>
        </div>
      </div>
    </div>
  );
}

function StartCard({
  title,
  subtitle,
  icon,
  price,
  href,
}: {
  title: string;
  subtitle: string;
  icon: string;
  price: string;
  href: string;
}) {
  return (
    <a href={href} className="start-card tilt-card">
      <div className="start-card-inner tilt-inner">
        <img src={icon} alt={title} className="start-card-frame" />

        <div className="start-card-overlay">
          <div className="start-card-overlay-top">
            <div>
              <div className="start-card-title">{title}</div>
              <div className="start-card-subtitle">{subtitle}</div>
            </div>
          </div>

          <div className="start-card-overlay-bottom">
            <div className="start-card-price">{price}</div>
            <span className="start-card-btn">Начать</span>
          </div>
        </div>
      </div>
    </a>
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

  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const frameRef = useRef<number | null>(null);

  const payUrl = "#";
  const tgContactUrl = "https://t.me/growth_avenue_company";
  const waContactUrl = "https://wa.me/995555163833";

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setCursor({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const tiltCards = Array.from(
      document.querySelectorAll<HTMLElement>(".tilt-card")
    );

    const cleanups: Array<() => void> = [];

    tiltCards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>(".tilt-inner");
      if (!inner) return;

      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = x / rect.width;
        const py = y / rect.height;

        const rotateY = (px - 0.5) * 12;
        const rotateX = (0.5 - py) * 12;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
      };

      const handleLeave = () => {
        inner.style.transform =
          "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050f28] text-[#fefefe]">
      <div
        className="cursor-glow"
        style={{
          transform: `translate(${cursor.x - 90}px, ${cursor.y - 90}px)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="line-grid" />
        <div className="vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 md:px-8 md:py-10">
        <header className="sticky-header mb-7 md:mb-10">
          <div className="header-row">
            <img src="/logo.svg" alt="Growth Avenue" className="logo-main" />

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

        <section className="hero-section mb-16">
          <div className="hero-grid hero-grid-frame">
            <div className="hero-left">
              <h1 className="hero-main-title">Revenue Snapshot</h1>

              <div className="hero-main-subtitle">
                стратегическая диагностика
                <br />
                экономики вашего бизнеса
              </div>

              <p className="hero-main-copy">
                Узнайте, какое изменение в модели способно дать наиболее сильный
                эффект на выручку, и где сейчас скрываются главные точки потери
                денег.
              </p>

              <div className="hero-highlights-row hero-highlights-row-unified">
                <div className="hero-highlight-chip">MVP</div>
                <div className="hero-highlight-chip">CashCow</div>
                <div className="hero-highlight-chip">Scaling</div>
              </div>

              <div className="hero-actions">
                <a href="#try" className="tg-gradient-btn inline-flex">
                  Попробовать Snapshot
                </a>
                <a
                  href="#preview"
                  className="ghost-link ghost-link-large inline-flex"
                >
                  Посмотреть превью
                </a>
              </div>
            </div>

            <HeroEconomyChart />
          </div>
        </section>

        <section id="how-it-works" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Как это работает</div>
            <h2 className="section-title">
              Путь от простых ответов к комплексному результату
            </h2>
            <p className="section-copy">
              От базовых параметров — к полной картине экономики бизнеса:
              ограничения, точки роста и сценарии развития.
            </p>
          </div>

          <div className="journey-compact">
            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">1</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">
                Фиксация параметров бизнеса
              </div>
              <div className="journey-compact-text">
                Определяются ключевые показатели текущей модели: экономика,
                структура продаж, ресурсы и ограничения. Это формирует основу для
                дальнейшего анализа.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">2</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">
                Сборка аналитической модели
              </div>
              <div className="journey-compact-text">
                Инструмент структурирует данные и формирует целостную картину
                бизнеса: выявляет ограничения, точки роста и взаимосвязи между
                показателями.
              </div>
            </div>

            <div className="journey-compact-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">3</div>
              </div>
              <div className="journey-compact-title">Результат Snapshot</div>
              <div className="journey-compact-text">
                Вы получаете аналитический срез бизнеса с ключевыми выводами:
                приоритетной точкой роста, оценкой экономического эффекта
                изменений и пониманием устойчивости текущей модели.
              </div>
            </div>
          </div>
        </section>

        <section id="preview" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Интерактивное превью</div>
            <h2 className="section-title">Поиграйте с моделью до оплаты</h2>
            <p className="section-copy">
              Здесь пользователь меняет ключевые параметры и видит
              предварительные сигналы. Полный разбор открывается после оплаты.
              Модель на этой странице не передает и не запоминает введенные вами
              данные, поэтому сценарий безопасен для быстрого теста.
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
                <TopMetricCard
                  title="Выручка"
                  value={fmtMoney(data.revenue)}
                  delta={revDelta}
                  type="revenue"
                />
                <TopMetricCard
                  title="Прибыль"
                  value={fmtMoney(data.profit)}
                  delta={profitDelta}
                  type="profit"
                />
                <TopMetricCard
                  title="Расходы"
                  value={fmtMoney(data.costs)}
                  delta={costDelta}
                  type="costs"
                  invert
                />
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

                  <button
                    type="button"
                    onClick={handleReset}
                    className="reset-link"
                  >
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
                <div className="reserve-amount">
                  ≈ {fmtMoney(estimatedGap)} / мес
                </div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Это только механика. Полный разбор раскрывает реальные
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

        <section className="mb-16">
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
            <ResultDocCard
              tab="ECONOMIC RATE"
              title="Executive Summary"
              text="Данные о вашем продукте, его маржинальности и спросе выявляют сильные и слабые стороны бизнеса и определяется главный фокус на данный момент."
            />

            <ResultDocCard
              tab="GROWTH LIMIT"
              title="Key Conclusions"
              text="Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели."
            />

            <ResultDocCard
              tab="SOLUTION"
              title="Strategy&Practice"
              text="Проведённый анализ данных определяет первичную задачу: целью всегда является повышение дохода."
            />

            <ResultDocCard
              tab="JTBD"
              title="RoadMap"
              text="Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP."
              cta={
                <a href={payUrl} className="result-doc-start-btn">
                  Начать
                </a>
              }
            />
          </div>

          <div className="results-roadmap-note">
            После получения и изучения результатов у Вас есть возможность
            назначить <span>30-минутную встречу</span> с нашими C-level
            специалистами в сфере Маркетинга и Продаж{" "}
            <span>для декомпозиции результатов</span>.
          </div>
        </section>

        <section className="mb-16 stage-hover-map">
          <div className="section-head">
            <div className="section-kicker">Для кого этот инструмент</div>

            <h2 className="section-title">
              Где Revenue Snapshot показал результат
            </h2>

            <div className="industries-pills">
              <span className="industry-pill industry-saas">SaaS</span>
              <span className="industry-pill industry-ecom">E-com</span>
              <span className="industry-pill industry-fintech">FinTech</span>
              <span className="industry-pill industry-edtech">EdTech</span>
              <span className="industry-pill industry-healthtech">
                HealthTech
              </span>
              <span className="industry-pill industry-b2b">B2B</span>
            </div>
          </div>

          <div className="stage-grid stage-grid-detailed">
            <div className="stage-delay-1 stage-linked-card stage-seed">
              <StageCard
                stage="Seed"
                icon="/seed.svg"
                request="Проверка идеи продукта"
                goal="Найти первую рабочую экономику"
                path="Как выйти на первые продажи"
                result="Понимание MVP-модели"
              />
            </div>

            <div className="stage-delay-2 stage-linked-card stage-startup">
              <StageCard
                stage="Startup"
                icon="/startup.svg"
                request="Рост первых продаж"
                goal="Увеличить поток клиентов"
                path="Как масштабировать спрос"
                result="Определение ключевых рычагов"
              />
            </div>

            <div className="stage-delay-3 stage-linked-card stage-growth">
              <StageCard
                stage="Growth"
                icon="/growth.svg"
                request="Ускорение роста"
                goal="Повысить доходность бизнеса"
                path="Оптимизация unit-экономики"
                result="Сильная экономическая модель"
              />
            </div>

            <div className="stage-delay-4 stage-linked-card stage-expansion">
              <StageCard
                stage="Expansion"
                icon="/expansion.svg"
                request="Выход на новые рынки"
                goal="Найти новый уровень роста"
                path="Стратегия масштабирования"
                result="Новая стратегия роста"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
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

            <div className="glass-card analysis-right-card">
              <h3 className="analysis-right-title">
                Выберите удобный формат для старта
              </h3>

              <p className="analysis-right-copy">
                Вы можете начать либо со стратегической сессии, либо сразу со
                Snapshot. Оба формата встроены в один процесс и дают понятную
                точку входа.
              </p>

              <div className="start-cards-row">
                <StartCard
                  title="Страт сессия"
                  subtitle="быстрый вход через созвон"
                  icon="/stratsession.svg"
                  price="$770"
                  href={tgContactUrl}
                />

                <StartCard
                  title="Snapshot"
                  subtitle="сразу через инструмент"
                  icon="/snapshot.svg"
                  price="$114"
                  href={payUrl}
                />
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
                Здесь можно поставить ссылку на оплату
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #050f28;
        }

        .cursor-glow {
          position: fixed;
          left: 0;
          top: 0;
          width: 180px;
          height: 180px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.12) 0%,
            rgba(247, 210, 55, 0.07) 32%,
            rgba(247, 210, 55, 0.02) 58%,
            transparent 78%
          );
          filter: blur(24px);
          opacity: 0.45;
          mix-blend-mode: screen;
          transition: transform 0.08s linear;
        }

        .glass-card {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 28px;
          padding: 22px;
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .soft-glow {
          box-shadow:
            0 10px 40px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(255, 255, 255, 0.02);
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 50;
          margin: 0 -16px 18px;
          padding: 12px 16px 10px;
          backdrop-filter: blur(18px);
          background: linear-gradient(
            180deg,
            rgba(5, 15, 40, 0.92),
            rgba(5, 15, 40, 0.62)
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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

        .logo-main {
          width: 216px;
          height: 54px;
          object-fit: contain;
          object-position: left center;
          display: block;
          flex-shrink: 0;
        }

        .hero-section {
          position: relative;
          border-radius: 36px;
          overflow: hidden;
          padding: 34px 28px 30px;
          min-height: 860px;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("/hero.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 1;
          z-index: 0;
        }

        .hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(5, 15, 40, 0.18) 0%,
            rgba(5, 15, 40, 0.07) 38%,
            rgba(5, 15, 40, 0.02) 62%,
            rgba(5, 15, 40, 0.04) 100%
          );
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          gap: 22px;
        }

        .hero-grid-frame {
          grid-template-columns: minmax(0, 1fr) minmax(520px, 0.92fr);
          align-items: start;
          position: relative;
          z-index: 2;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          padding: 4px 6px 8px;
        }

        .hero-main-title {
          margin: 0;
          font-size: clamp(62px, 6.4vw, 110px);
          line-height: 0.9;
          letter-spacing: -0.07em;
          font-weight: 700;
          color: #ffffff;
          max-width: 860px;
        }

        .hero-main-subtitle {
          margin-top: 18px;
          font-size: clamp(32px, 3vw, 56px);
          line-height: 1.04;
          letter-spacing: -0.04em;
          font-weight: 700;
          color: #ffffff;
          max-width: 900px;
        }

        .hero-main-copy {
          margin-top: 30px;
          max-width: 760px;
          font-size: 22px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.76);
        }

        .hero-highlights-row {
          margin-top: 34px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          max-width: 760px;
        }

        .hero-highlights-row-unified {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.08),
            rgba(123, 132, 255, 0.08),
            rgba(255, 255, 255, 0.08)
          );
          backdrop-filter: blur(14px);
        }

        .hero-highlight-chip {
          padding: 20px 18px;
          color: white;
          font-size: 22px;
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
          top: 14px;
          right: 0;
          width: 1px;
          height: calc(100% - 28px);
          background: rgba(255, 255, 255, 0.09);
        }

        .hero-actions {
          margin-top: auto;
          padding-top: 34px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
        }

        .hero-visual-shell {
          position: relative;
          min-height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }

        .hero-chart-float {
          position: relative;
          width: min(760px, 100%);
          margin-left: auto;
          padding-top: 8px;
        }

        .hero-chart-float-title {
          font-size: 32px;
          line-height: 1;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 14px;
          text-align: right;
          padding-right: 8px;
        }

        .hero-levers-inline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow: hidden;
  padding-bottom: 4px;
}

        .hero-levers-inline::-webkit-scrollbar {
          display: none;
        }

        .hero-levers-inline-float {
          margin-bottom: 12px;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          min-width: max-content;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(34, 47, 74, 0.82);
          color: rgba(255, 255, 255, 0.68);
          font-size: 14px;
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
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(36, 49, 76, 0.88);
          padding: 14px;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .hero-chart-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }

        .hero-metric-square {
          min-height: 86px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 12px;
        }

        .hero-metric-square span {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.52);
        }

        .hero-metric-square strong {
          display: block;
          margin-top: 10px;
          font-size: 22px;
          line-height: 1.1;
          font-weight: 700;
          color: white;
          white-space: nowrap;
        }

        .bar-chart-wrap {
          position: relative;
          margin-top: 4px;
          border-radius: 24px;
          padding: 18px 14px 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.035),
            rgba(255, 255, 255, 0.015)
          );
          overflow: hidden;
        }

        .bar-chart-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px
          );
          background-size: 100% 44px;
          pointer-events: none;
        }

        .bar-chart-columns {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          align-items: end;
          min-height: 250px;
        }

        .bar-chart-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          min-height: 250px;
        }

        .bar-chart-value {
          font-size: 12px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          min-height: 28px;
        }

        .bar-chart-bar-shell {
          width: 100%;
          max-width: 74px;
          height: 140px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bar-chart-bar {
          width: 100%;
          border-radius: 16px 16px 8px 8px;
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
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.68);
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
          padding: 10px 14px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 14px;
          line-height: 1.45;
        }

        .hero-active-note b {
          color: #f7d237;
        }

        .hero-active-note-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 10px rgba(247, 210, 55, 0.35);
          animation: pulseTinyYellow 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .section-head {
          max-width: 1080px;
          margin-bottom: 18px;
        }

        .section-kicker {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f7d237;
        }

        .section-title {
          margin-top: 12px;
          font-size: clamp(36px, 4vw, 62px);
          line-height: 1.04;
          font-weight: 700;
          color: white;
        }

        .section-copy {
          margin-top: 14px;
          font-size: 22px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.68);
          max-width: 1160px;
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
          padding: 16px 22px;
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

        .journey-compact {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .journey-compact-card {
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.07),
            rgba(255, 255, 255, 0.03)
          );
          padding: 20px;
          min-height: 230px;
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
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: #f7d237;
          color: #0b1d3a;
          font-size: 18px;
          font-weight: 700;
        }

        .journey-compact-arrow {
          width: 52px;
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
          margin-top: 16px;
          font-size: 24px;
          line-height: 1.15;
          font-weight: 600;
          color: white;
        }

        .journey-compact-text {
          margin-top: 12px;
          font-size: 16px;
          line-height: 1.75;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .metric-card {
          min-height: 116px;
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
          flex: 1;
        }

        .metric-label,
        .model-label {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.58);
          line-height: 1.2;
          padding-top: 2px;
        }

        .metric-right-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .metric-flag {
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.01em;
          border: 1px solid transparent;
          line-height: 1;
        }

        .metric-delta-top,
        .model-delta-top {
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          padding-top: 2px;
        }

        .metric-main-value {
          margin-top: 20px;
          font-size: clamp(2rem, 2.8vw, 3.2rem);
          line-height: 1.02;
          font-weight: 700;
          white-space: nowrap;
          letter-spacing: -0.03em;
        }

        .model-main-value {
          margin-top: 14px;
          font-size: clamp(1.2rem, 1.6vw, 1.8rem);
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
          min-height: 96px;
          padding: 14px;
        }

        .slider-card {
          min-height: 148px;
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
          gap: 22px;
          margin-top: 24px;
        }

        .tilt-card {
          perspective: 1400px;
        }

        .tilt-inner {
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
          will-change: transform;
        }

        .result-doc-card {
          min-height: 320px;
        }

        .result-doc-card-inner {
          min-height: 320px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.045)
          );
          padding: 26px;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 20px 44px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .result-doc-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .result-doc-cta {
          display: flex;
          align-items: center;
        }

        .result-doc-start-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 110px;
          padding: 11px 16px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #47b6f6 0%,
            #7c84ff 55%,
            #c25cf3 100%
          );
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          box-shadow:
            0 10px 24px rgba(85, 104, 255, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
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
          margin-top: 26px;
          font-size: clamp(34px, 3vw, 56px);
          line-height: 1.04;
          font-weight: 600;
          color: white;
          letter-spacing: -0.04em;
        }

        .result-doc-text {
          position: relative;
          z-index: 2;
          margin-top: 20px;
          font-size: 17px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.72);
        }

        .results-roadmap-note {
          margin-top: 18px;
          font-size: 18px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.72);
          max-width: 980px;
        }

        .results-roadmap-note span {
          color: #f7d237;
          font-weight: 700;
        }

        .industries-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 18px;
          margin-bottom: 6px;
        }

        .industry-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 56px;
          padding: 0 24px;
          border-radius: 999px;
          background: #f7d237;
          color: #0b1d3a;
          font-size: 18px;
          font-weight: 800;
          line-height: 1;
          border: 1px solid rgba(247, 210, 55, 0.45);
          box-shadow:
            0 10px 24px rgba(247, 210, 55, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.36);
          transition:
            opacity 0.28s ease,
            transform 0.28s ease,
            filter 0.28s ease,
            box-shadow 0.28s ease;
        }

        .stage-hover-map:hover .industry-pill {
          opacity: 0.24;
          filter: saturate(0.8);
          transform: scale(0.985);
        }

        .stage-hover-map:has(.stage-seed:hover) .industry-saas,
        .stage-hover-map:has(.stage-seed:hover) .industry-healthtech,
        .stage-hover-map:has(.stage-startup:hover) .industry-fintech,
        .stage-hover-map:has(.stage-startup:hover) .industry-ecom,
        .stage-hover-map:has(.stage-expansion:hover) .industry-b2b,
        .stage-hover-map:has(.stage-expansion:hover) .industry-edtech,
        .stage-hover-map:has(.stage-expansion:hover) .industry-ecom,
        .stage-hover-map:has(.stage-growth:hover) .industry-pill {
          opacity: 1;
          filter: saturate(1);
          transform: scale(1);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.2),
            0 12px 28px rgba(247, 210, 55, 0.18),
            0 0 24px rgba(247, 210, 55, 0.14);
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

        .stage-card-figure {
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.045)
          );
          padding: 28px;
          box-shadow:
            0 18px 44px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          min-height: 390px;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            box-shadow 0.35s ease;
        }

        .stage-card-figure:hover {
          transform: translateY(-4px);
          border-color: rgba(247, 210, 55, 0.18);
          box-shadow:
            0 22px 50px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(247, 210, 55, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .stage-top-strip {
          position: relative;
          z-index: 2;
          min-height: 112px;
          border-radius: 32px;
          padding: 20px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.12),
            rgba(255, 255, 255, 0.07)
          );
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .stage-top-strip-icon {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stage-strip-icon {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }

        .stage-top-strip-label {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          min-width: 0;
        }

        .stage-top-strip-label span {
          font-size: 18px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.86);
        }

        .stage-top-strip-label strong {
          margin-top: 8px;
          font-size: clamp(36px, 4vw, 64px);
          line-height: 0.9;
          font-weight: 300;
          color: #ffffff;
          letter-spacing: -0.04em;
        }

        .stage-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
        }

        .stage-card-content-full {
          padding-right: 8px;
        }

        .stage-line-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stage-line-title {
          font-size: 18px;
          line-height: 1.35;
          font-weight: 800;
          color: #f7d237;
        }

        .stage-line-text {
          font-size: 18px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.76);
        }

        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: start;
        }

        .snapshot-structure-card {
          min-height: 520px;
        }

        .analysis-left-title {
          font-size: 22px;
          line-height: 1.25;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .snapshot-builder-copy {
          margin-top: 12px;
          max-width: 860px;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.68);
        }

        .snapshot-builder {
          margin-top: 26px;
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          grid-template-rows: 120px 138px 120px;
          gap: 14px;
          min-height: 392px;
        }

        .builder-block {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.085),
            rgba(255, 255, 255, 0.045)
          );
          color: rgba(255, 255, 255, 0.92);
          text-align: center;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .builder-block-1 {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          font-size: 28px;
        }

        .builder-block-2 {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          font-size: 28px;
        }

        .builder-block-3 {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          justify-content: flex-start;
          padding-left: 34px;
          font-size: clamp(54px, 5vw, 82px);
          letter-spacing: -0.05em;
          font-weight: 300;
        }

        .builder-block-4 {
          grid-column: 2 / 3;
          grid-row: 2 / 4;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: clamp(38px, 4.2vw, 70px);
          letter-spacing: -0.05em;
          font-weight: 300;
          gap: 8px;
        }

        .builder-block-5 {
          grid-column: 1 / 2;
          grid-row: 3 / 4;
          justify-content: flex-start;
          padding-left: 28px;
          font-size: 28px;
        }

        .analysis-right-card {
          min-height: 520px;
        }

        .analysis-right-title {
          font-size: 22px;
          line-height: 1.25;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .analysis-right-copy {
          margin-top: 16px;
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.7);
          max-width: 680px;
        }

        .start-cards-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          margin-top: 24px;
        }

        .start-card {
          display: block;
        }

        .start-card-inner {
          position: relative;
          min-height: 220px;
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 20px 48px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .start-card-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .start-card-overlay {
          position: relative;
          z-index: 2;
          min-height: 220px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(
            90deg,
            rgba(5, 15, 40, 0.26),
            rgba(5, 15, 40, 0.08)
          );
        }

        .start-card-overlay-top,
        .start-card-overlay-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .start-card-title {
          font-size: 30px;
          line-height: 1;
          font-weight: 700;
          color: #ffffff;
        }

        .start-card-subtitle {
          margin-top: 8px;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.78);
        }

        .start-card-price {
          font-size: 40px;
          line-height: 1;
          font-weight: 700;
          color: #f7d237;
          text-shadow: 0 0 18px rgba(247, 210, 55, 0.12);
        }

        .start-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 132px;
          padding: 14px 18px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #47b6f6 0%,
            #7c84ff 55%,
            #c25cf3 100%
          );
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          box-shadow:
            0 10px 24px rgba(85, 104, 255, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.16);
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

        .line-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.045) 1px,
            transparent 1px
          );
          background-size: 100% 76px;
          opacity: 0.2;
          pointer-events: none;
        }

        .aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.55;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
        }

        .aurora-1 {
          width: 34vw;
          height: 34vw;
          min-width: 320px;
          min-height: 320px;
          left: -6vw;
          top: -8vh;
          background: radial-gradient(
            circle,
            rgba(106, 160, 255, 0.2),
            rgba(106, 160, 255, 0.08) 42%,
            transparent 72%
          );
          animation: driftOne 16s infinite alternate ease-in-out;
        }

        .aurora-2 {
          width: 30vw;
          height: 30vw;
          min-width: 280px;
          min-height: 280px;
          right: 4vw;
          top: 6vh;
          background: radial-gradient(
            circle,
            rgba(247, 210, 55, 0.16),
            rgba(247, 210, 55, 0.05) 42%,
            transparent 72%
          );
          animation: driftTwo 18s infinite alternate ease-in-out;
        }

        .aurora-3 {
          width: 38vw;
          height: 38vw;
          min-width: 360px;
          min-height: 360px;
          left: 18vw;
          bottom: -10vh;
          background: radial-gradient(
            circle,
            rgba(124, 132, 255, 0.16),
            rgba(124, 132, 255, 0.05) 44%,
            transparent 74%
          );
          animation: driftThree 20s infinite alternate ease-in-out;
        }

        .aurora-4 {
          width: 24vw;
          height: 24vw;
          min-width: 220px;
          min-height: 220px;
          right: 18vw;
          bottom: 12vh;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.03) 38%,
            transparent 72%
          );
          animation: driftFour 15s infinite alternate ease-in-out;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 48%,
            rgba(0, 0, 0, 0.18) 100%
          );
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
            transform: translate3d(-50px, 42px, 0) scale(1.1);
          }
        }

        @media (max-width: 1280px) {
          .hero-section {
            min-height: 680px;
          }

          .hero-main-title {
            font-size: clamp(48px, 5.5vw, 78px);
          }

          .hero-main-copy,
          .section-copy {
            font-size: 20px;
          }
        }

        @media (max-width: 1180px) {
          .journey-compact {
            grid-template-columns: 1fr;
          }

          .journey-compact-arrow {
            display: none;
          }

          .analysis-grid,
          .results-grid-2x2,
          .stage-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1023px) {
          .hero-section {
            min-height: auto;
            padding: 26px 18px 24px;
          }

          .hero-grid-frame,
          .cta-card {
            grid-template-columns: 1fr;
          }

          .hero-chart-float {
            width: 100%;
          }

          .hero-actions {
            padding-top: 24px;
          }

          .hero-chart-metrics-row,
          .dashboard-grid {
            grid-template-columns: 1fr 1fr;
          }

          .snapshot-builder {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          .builder-block-1,
          .builder-block-2,
          .builder-block-3,
          .builder-block-4,
          .builder-block-5 {
            grid-column: auto;
            grid-row: auto;
          }

          .builder-block-4 {
            writing-mode: horizontal-tb;
            text-orientation: initial;
            transform: none;
            min-height: 120px;
            font-size: 42px;
          }

          .start-cards-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .cursor-glow {
            display: none;
          }

          .sticky-header {
            top: 0;
            margin: 0 -16px 18px;
            padding: 10px 16px 8px;
          }

          .logo-main {
            width: 150px;
            height: 42px;
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

          .hero-main-title {
            font-size: 52px;
          }

          .hero-main-copy,
          .section-copy {
            font-size: 17px;
          }

          .section-title {
            font-size: 34px;
          }

          .hero-highlights-row {
            grid-template-columns: 1fr;
          }

          .hero-highlight-chip {
            white-space: normal;
            font-size: 18px;
          }

          .hero-chart-metrics-row,
          .input-grid,
          .dashboard-grid,
          .results-grid-2x2 {
            grid-template-columns: 1fr;
          }

          .bar-chart-columns {
            gap: 6px;
          }

          .metric-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .metric-right-meta {
            width: 100%;
            justify-content: space-between;
          }

          .glass-card {
            border-radius: 22px;
            padding: 16px;
          }

          .reserve-amount {
            font-size: 2.4rem;
          }

          .metric-main-value {
            font-size: 1.85rem;
          }

          .model-main-value {
            font-size: 1.2rem;
          }

          .preview-actions-inline {
            gap: 10px;
            flex-wrap: wrap;
            justify-content: flex-end;
          }

          .industry-pill {
            min-height: 48px;
            padding: 0 16px;
            font-size: 15px;
          }

          .stage-top-strip {
            min-height: 92px;
            padding: 16px 18px;
          }

          .stage-top-strip-icon {
            width: 54px;
            height: 54px;
          }

          .stage-strip-icon {
            width: 46px;
            height: 46px;
          }

          .stage-top-strip-label span {
            font-size: 14px;
          }

          .stage-top-strip-label strong {
            font-size: 34px;
          }

          .stage-line-title {
            font-size: 16px;
          }

          .stage-line-text {
            font-size: 16px;
          }

          .builder-block-3 {
            min-height: 110px;
            padding-left: 20px;
            font-size: 46px;
          }

          .builder-block-1,
          .builder-block-2,
          .builder-block-5 {
            min-height: 66px;
            font-size: 20px;
          }

          .start-card-inner,
          .start-card-overlay {
            min-height: 190px;
          }

          .start-card-title {
            font-size: 24px;
          }

          .start-card-price {
            font-size: 30px;
          }

          .result-doc-start-btn {
            min-width: 92px;
            padding: 10px 14px;
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}
