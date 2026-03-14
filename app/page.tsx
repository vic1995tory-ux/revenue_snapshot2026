"use client";

import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

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
          <div className={`metric-flag ${flagTone(type, delta)}`}>
            {getMetricFlag(type, delta)}
          </div>
        </div>

        <div className={`metric-delta-top ${color(delta, invert)}`}>
          {pct(delta)}
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

  const [activeIndex, setActiveIndex] = useState(0);
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
    { name: "Revenue", value: active.revenue, good: true },
    { name: "OPEX", value: active.opex, good: false },
    { name: "COGS", value: active.cogs, good: false },
    { name: "Gross Profit", value: active.grossProfit, good: true },
  ];

  const maxBar = 20000;

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
            <div className="bar-chart-scale">
              <span>$0</span>
              <span>$5 000</span>
              <span>$10 000</span>
              <span>$15 000</span>
              <span>$20 000</span>
            </div>

            <div className="bar-chart-grid" />

            <div className="bar-chart-columns bar-chart-columns-horizontal">
              {bars.map((bar) => {
                const width = Math.max(6, (bar.value / maxBar) * 100);

                return (
                  <div key={bar.name} className="bar-chart-row">
                    <div className="bar-chart-row-top">
                      <div className="bar-chart-label">{bar.name}</div>
                      <div className="bar-chart-value">
                        {fmtMoney(bar.value)}
                      </div>
                    </div>

                    <div className="bar-chart-bar-shell bar-chart-bar-shell-horizontal">
                      <div
                        className={`bar-chart-bar bar-chart-bar-horizontal ${
                          bar.good ? "bar-good" : "bar-bad"
                        } ${bar.name === "Revenue" ? "bar-revenue" : ""}`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
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
  metrics,
}: {
  stage: string;
  icon: string;
  request: string;
  goal: string;
  path: string;
  result: string;
  metrics: Array<{
    label: string;
    plan: string;
    fact: string;
  }>;
}) {
  return (
    <div className="stage-card-split">
      <div className="stage-card-top-glass">
        <div className="stage-card-top-icon">
          <img src={icon} alt={stage} className="stage-strip-icon" />
        </div>

        <div className="stage-card-top-title">
          <span>Stage</span>
          <strong>{stage}</strong>
        </div>
      </div>

      <div className="stage-card-bottom-solid">
        <div className="stage-summary-list">
          <div className="stage-summary-item">
            <div className="stage-summary-label">Growth Context</div>
            <div className="stage-summary-text">{request}</div>
          </div>

          <div className="stage-summary-item">
            <div className="stage-summary-label">Strategic Limitation</div>
            <div className="stage-summary-text">{goal}</div>
          </div>

          <div className="stage-summary-item">
            <div className="stage-summary-label">Economic Objective</div>
            <div className="stage-summary-text">{path}</div>
          </div>

          <div className="stage-summary-item">
            <div className="stage-summary-label">Key Intervention</div>
            <div className="stage-summary-text">{result}</div>
          </div>

          <div className="stage-summary-item">
            <div className="stage-summary-label">Business Impact</div>
            <div className="stage-summary-text">
              Рост числа пилотов и формирование базы кейсов для масштабирования.
            </div>
          </div>
        </div>

        <div className="stage-metrics-box">
          <div className="stage-metrics-title">План / факт (метрики)</div>

          <div className="stage-metrics-table">
            <div className="stage-metrics-head">Показатель</div>
            <div className="stage-metrics-head">План</div>
            <div className="stage-metrics-head">Факт</div>

            {metrics.map((item) => (
              <Fragment key={`${stage}-${item.label}`}>
                <div className="stage-metrics-cell stage-metrics-label">
                  {item.label}
                </div>
                <div className="stage-metrics-cell">{item.plan}</div>
                <div className="stage-metrics-cell">{item.fact}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StageCarousel() {
  const exampleMetrics = [
    { label: "Контакты клиник", plan: "40", fact: "25" },
    { label: "Назначенные встречи", plan: "15", fact: "6" },
    { label: "Запущенные пилоты", plan: "5", fact: "2" },
    { label: "Переход пилот → контракт", plan: "40%", fact: "~30%" },
    { label: "Средний цикл сделки", plan: "3 месяца", fact: "5–6 месяцев" },
  ];

  const items = [
    {
      stage: "Seed",
      icon: "/seed.svg",
      request: "Первые пилоты в клиниках подтверждают ценность продукта.",
      goal: "Длинный цикл согласований и отсутствие системного канала продаж.",
      path: "Подтвердить платёжеспособный спрос и сократить цикл сделки.",
      result:
        "Запуск стандартизированного пилотного предложения для одного сегмента клиник.",
      industries: ["industry-saas", "industry-healthtech"],
      metrics: exampleMetrics,
    },
    {
      stage: "Startup",
      icon: "/startup.svg",
      request: "Первые пилоты в клиниках подтверждают ценность продукта.",
      goal: "Длинный цикл согласований и отсутствие системного канала продаж.",
      path: "Подтвердить платёжеспособный спрос и сократить цикл сделки.",
      result:
        "Запуск стандартизированного пилотного предложения для одного сегмента клиник.",
      industries: ["industry-fintech", "industry-ecom"],
      metrics: exampleMetrics,
    },
    {
      stage: "Growth",
      icon: "/growth.svg",
      request: "Первые пилоты в клиниках подтверждают ценность продукта.",
      goal: "Длинный цикл согласований и отсутствие системного канала продаж.",
      path: "Подтвердить платёжеспособный спрос и сократить цикл сделки.",
      result:
        "Запуск стандартизированного пилотного предложения для одного сегмента клиник.",
      industries: [
        "industry-saas",
        "industry-ecom",
        "industry-fintech",
        "industry-edtech",
        "industry-healthtech",
        "industry-b2b",
      ],
      metrics: exampleMetrics,
    },
    {
      stage: "Expansion",
      icon: "/expansion.svg",
      request: "Первые пилоты в клиниках подтверждают ценность продукта.",
      goal: "Длинный цикл согласований и отсутствие системного канала продаж.",
      path: "Подтвердить платёжеспособный спрос и сократить цикл сделки.",
      result:
        "Запуск стандартизированного пилотного предложения для одного сегмента клиник.",
      industries: ["industry-b2b", "industry-edtech", "industry-ecom"],
      metrics: exampleMetrics,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const getOffset = (index: number) => {
    const total = items.length;
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const activeIndustries = new Set(items[activeIndex].industries);

  return (
    <div className="stage-carousel-wrap">
      <div className="industries-pills industries-pills-carousel">
        <span
          className={`industry-pill industry-saas ${
            activeIndustries.has("industry-saas")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          SaaS
        </span>
        <span
          className={`industry-pill industry-ecom ${
            activeIndustries.has("industry-ecom")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          E-com
        </span>
        <span
          className={`industry-pill industry-fintech ${
            activeIndustries.has("industry-fintech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          FinTech
        </span>
        <span
          className={`industry-pill industry-edtech ${
            activeIndustries.has("industry-edtech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          EdTech
        </span>
        <span
          className={`industry-pill industry-healthtech ${
            activeIndustries.has("industry-healthtech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          HealthTech
        </span>
        <span
          className={`industry-pill industry-b2b ${
            activeIndustries.has("industry-b2b")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          B2B
        </span>
      </div>

      <div className="stage-carousel-scene">
        <button
          type="button"
          className="stage-carousel-nav stage-carousel-nav-left"
          onClick={prev}
          aria-label="Предыдущая карточка"
        >
          ‹
        </button>

        <div className="stage-carousel-track">
          {items.map((item, index) => {
            const offset = getOffset(index);

            let positionClass = "stage-card-hidden";
            if (offset === 0) positionClass = "stage-card-center";
            else if (offset === -1) positionClass = "stage-card-left";
            else if (offset === 1) positionClass = "stage-card-right";
            else if (offset === 2 || offset === -2) {
              positionClass = "stage-card-back";
            }

            return (
              <div
                key={item.stage}
                className={`stage-carousel-item ${positionClass}`}
                onClick={() => setActiveIndex(index)}
              >
                <StageCard
                  stage={item.stage}
                  icon={item.icon}
                  request={item.request}
                  goal={item.goal}
                  path={item.path}
                  result={item.result}
                  metrics={item.metrics}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="stage-carousel-nav stage-carousel-nav-right"
          onClick={next}
          aria-label="Следующая карточка"
        >
          ›
        </button>
      </div>

      <div className="stage-carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`stage-carousel-dot ${
              index === activeIndex ? "stage-carousel-dot-active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function StartCard({
  title,
  icon,
  price,
  href,
}: {
  title: string;
  icon: string;
  price: string;
  href: string;
}) {
  return (
    <div className="start-card tilt-card">
      <div className="start-card-inner start-card-inner-plain tilt-inner">
        <img src={icon} alt={title} className="start-card-frame" />

        <div className="start-card-overlay start-card-overlay-plain">
          <div className="start-card-price-float">{price}</div>

          <div className="start-card-btn-row">
            <a href={href} className="start-card-btn start-card-btn-floating">
              Оплатить
            </a>
          </div>
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

              <a
                href="#how-it-works"
                className="ghost-link hidden md:inline-flex"
              >
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
          </div>

          <StageCarousel />
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

            <div className="analysis-right-card analysis-right-card-plain">
              <div className="start-cards-row">
                <StartCard
                  title="Страт сессия"
                  icon="/stratsession.svg"
                  price="$770"
                  href={tgContactUrl}
                />

                <StartCard
                  title="Snapshot"
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
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          width: 100%;
          padding-bottom: 4px;
        }

        .hero-levers-inline::-webkit-scrollbar {
          display: none;
        }

        .hero-levers-inline-float {
          margin-bottom: 12px;
        }

        .hero-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          min-height: 48px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(34, 47, 74, 0.82);
          color: rgba(255, 255, 255, 0.68);
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
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
          padding: 52px 18px 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.035),
            rgba(255, 255, 255, 0.015)
          );
          overflow: hidden;
        }

        .bar-chart-scale {
          position: absolute;
          top: 16px;
          left: 18px;
          right: 18px;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          pointer-events: none;
        }

        .bar-chart-scale span {
          font-size: 11px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.42);
        }

        .bar-chart-scale span:first-child {
          text-align: left;
        }

        .bar-chart-scale span:not(:first-child):not(:last-child) {
          text-align: center;
        }

        .bar-chart-scale span:last-child {
          text-align: right;
        }

        .bar-chart-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px
          );
          background-size: 25% 100%;
          background-position: left top;
          pointer-events: none;
          opacity: 0.65;
        }

        .bar-chart-columns {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .bar-chart-columns-horizontal {
          width: 100%;
        }

        .bar-chart-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bar-chart-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .bar-chart-label {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.78);
          text-align: left;
          line-height: 1.35;
        }

        .bar-chart-value {
          font-size: 14px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.72);
          text-align: right;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .bar-chart-bar-shell {
          width: 100%;
        }

        .bar-chart-bar-shell-horizontal {
          width: 100%;
          height: 30px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .bar-chart-bar {
          display: block;
          height: 100%;
          min-width: 8px;
          box-shadow:
            0 10px 24px rgba(0, 0, 0, 0.14),
            0 0 18px rgba(255, 255, 255, 0.04);
        }

        .bar-chart-bar-horizontal {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s ease, transform 0.8s ease;
        }

        .bar-revenue {
          transform: scaleY(1.04);
          transform-origin: left center;
        }

        .bar-good {
          background: linear-gradient(
            90deg,
            rgba(176, 140, 255, 0.95) 0%,
            rgba(244, 221, 114, 1) 48%,
            rgba(247, 210, 55, 1) 100%
          );
        }

        .bar-bad {
          background: linear-gradient(
            90deg,
            rgba(124, 132, 255, 0.9) 0%,
            rgba(93, 167, 255, 0.95) 55%,
            rgba(95, 179, 179, 0.95) 100%
          );
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
          box-shadow: 0 0 
