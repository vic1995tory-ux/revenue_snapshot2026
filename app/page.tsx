"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

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
    <div className="glass-card soft-glow glare-card metric-card metric-card-main">
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
    <div className="glass-card soft-glow glare-card model-card">
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
    <div className="glass-card soft-glow glare-card slider-card">
      <div>
        <div className="slider-title">{title}</div>
        <div className="slider-subtitle">{subtitle}</div>
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
        <div className="slider-percent">{Math.round(value * 100)}%</div>
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
      label: "Маркетинг",
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
      label: "AOV",
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
      label: "Продажи",
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
      label: "Модель расходов",
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
              className={`hero-tag ${index === activeIndex ? "hero-tag-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hero-chart-box glare-card">
          <div className="hero-chart-metrics-row">
            <div className="hero-metric-square glare-card-lite">
              <span>Лидов / мес</span>
              <strong>{active.leads}</strong>
            </div>

            <div className="hero-metric-square glare-card-lite">
              <span>Сделок / мес</span>
              <strong>{active.deals.toFixed(1)}</strong>
            </div>

            <div className="hero-metric-square glare-card-lite">
              <span>AOV</span>
              <strong>{fmtMoney(active.aov)}</strong>
            </div>

            <div className="hero-metric-square glare-card-lite">
              <span>Маржа</span>
              <strong>{active.margin}%</strong>
            </div>
          </div>

          <div className="bar-chart-wrap glare-card-lite">
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
                      <div className="bar-chart-value">{fmtMoney(bar.value)}</div>
                    </div>

                    <div className="bar-chart-bar-shell-horizontal">
                      <div
                        className={`bar-chart-bar bar-chart-bar-horizontal ${bar.good ? "bar-good" : "bar-bad"} ${bar.name === "Revenue" ? "bar-revenue" : ""}`}
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-chart-bottom">
            <div className="hero-money-card hero-money-card-clean hero-money-card-muted">
              <span>База</span>
              <strong>{fmtMoney(base.revenue)}</strong>
              <small>{fmtMoney(base.grossProfit)} gross profit / мес</small>
            </div>

            <div className="hero-money-card hero-money-card-clean hero-money-card-muted">
              <span>Активный драйвер</span>
              <strong>{fmtMoney(active.revenue)}</strong>
              <small>{fmtMoney(active.grossProfit)} gross profit / мес</small>
            </div>
          </div>

          <div className="hero-active-note glare-card-lite">
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
  const layers = [
    {
      title: "Позиционирование",
      weight: "27%",
      hint: "точка входа",
      points: ["что обещание делает понятным", "какой сегмент готов реагировать первым"],
      level: 27,
      tone: "violet",
    },
    {
      title: "Структура компании",
      weight: "27%",
      hint: "ресурсы и роли",
      points: ["кто удерживает выручку в системе", "где ручное управление тормозит рост"],
      level: 27,
      tone: "blue",
    },
    {
      title: "Экономика",
      weight: "18%",
      hint: "unit-логика",
      points: ["что происходит с маржой и cost stack", "какой рычаг даёт главный финансовый сдвиг"],
      level: 18,
      tone: "gold",
    },
    {
      title: "Клиенты",
      weight: "14%",
      hint: "спрос и поведение",
      points: ["кто приносит деньги сейчас", "где теряется конверсия по пути"],
      level: 14,
      tone: "slate",
    },
    {
      title: "Продукт",
      weight: "14%",
      hint: "ценность и упаковка",
      points: ["что продаётся легче всего", "какая версия оффера масштабируется"],
      level: 14,
      tone: "indigo",
    },
  ];

  return (
    <div className="signal-board">
      {layers.map((layer, index) => (
        <article
          key={layer.title}
          className={`signal-card signal-card-${layer.tone} signal-card-layout-${index + 1}`}
          style={{ ["--signal-weight" as any]: layer.level } as CSSProperties}
        >
          <div className="signal-card-top">
            <span className="signal-card-hint">{layer.hint}</span>
            <span className="signal-card-weight">{layer.weight}</span>
          </div>

          <div className="signal-card-title">{layer.title}</div>

          <div className="signal-card-points">
            {layer.points.map((point) => (
              <div key={point} className="signal-card-point">
                <span className="signal-card-dot" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="signal-card-bottom">
            <div className="signal-meter">
              <span style={{ width: `${layer.level * 3}%` }} />
            </div>
            <div className="signal-caption">вес слоя в гипотезе</div>
          </div>
        </article>
      ))}
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
    <div className="result-doc-card tilt-card">
      <div className="result-doc-card-inner tilt-inner glare-card">
        <div className="result-doc-top">
          <div className="result-doc-tab">{tab}</div>
        </div>
        <div className="result-doc-title">{title}</div>
        <div className="result-doc-text">{text}</div>
      </div>
    </div>
  );
}

function StartCard({
  title,
  icon,
  mobileIcon,
  price,
  href,
}: {
  title: string;
  icon: string;
  mobileIcon?: string;
  price: string;
  href: string;
  stats?: Array<{ label: string; value: string }>;
}) {
  const slug = title.toLowerCase().includes("online") ? "playground" : "onrec";

  return (
    <div className={`start-card start-card-${slug} tilt-card`}>
      <div className="start-card-media-wrap">
        <div className="start-card-inner start-card-inner-plain tilt-inner premium-glass">
          <picture>
            <source media="(max-width: 767px)" srcSet={mobileIcon ?? icon} />
            <img src={icon} alt={title} className="start-card-frame" />
          </picture>
          <div className="start-card-overlay start-card-overlay-plain">
            <div className="start-card-bottom-simple">
              <div className="start-card-price-float">{price}</div>
            </div>
          </div>
        </div>
        <a href={href} className="start-card-play start-card-play-desktop" aria-label={`Открыть ${title}`}>
          <span className="start-card-play-triangle" />
        </a>
      </div>
      <a href={href} className="start-card-play start-card-play-mobile" aria-label={`Открыть ${title}`}>
        <span className="start-card-play-triangle" />
      </a>
    </div>
  );
}

type StageItem = {
  stage: string;
  icon: string;
  industries: string[];
  setup: string;
  direction: string;
  metrics: Array<{ label: string; value: string }>;
  bars: Array<{ label: string; fact: number; plan: number }>;
};

function StageCard({ item, isFront }: { item: StageItem; isFront: boolean }) {
  return (
    <div className={`stage-card-analytics glare-card ${isFront ? "is-front" : ""}`}>
      <div className="stage-card-top-panel">
        <div className="stage-card-copy">
          <div className="stage-copy-block">
            <h4>Starting Position</h4>
            <p>{item.setup}</p>
          </div>
          <div className="stage-copy-block">
            <h4>Strategic Direction</h4>
            <p>{item.direction}</p>
          </div>
        </div>

        <div className="stage-card-heading">
          <span>Stage</span>
          <strong>{item.stage}</strong>
        </div>
      </div>

      <div className="stage-card-bottom-panel">
        <div className="stage-card-bottom-inner">
          <div className="stage-rings-grid compact-metrics-grid">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="stage-inline-metric">
                <div className="stage-ring-label">{metric.label}</div>
                <div className="stage-inline-metric-value">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="stage-bars-area">
            <div className="stage-bars-title">fact / plan</div>
            <div className="stage-bars-wrap">
              {item.bars.map((bar) => {
                const max = Math.max(bar.fact, bar.plan, 1);
                return (
                  <div className="stage-bar-group" key={bar.label}>
                    <div className="stage-bar-label">{bar.label}</div>
                    <div className="stage-bar-stack">
                      <div className="stage-bar-track">
                        <div
                          className="stage-bar-fill stage-bar-fill-fact"
                          style={{ width: `${(bar.fact / max) * 100}%` }}
                        />
                      </div>
                      <div className="stage-bar-track stage-bar-track-thin">
                        <div
                          className="stage-bar-fill stage-bar-fill-plan"
                          style={{ width: `${(bar.plan / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageCarousel() {
  const items: StageItem[] = [
    {
      stage: "Seed",
      icon: "/seed.svg",
      industries: ["industry-saas", "industry-healthtech"],
      setup:
        "Есть ранний спрос и подтверждённая ценность, но модель ещё не собрана в устойчивый контур продаж.",
      direction:
        "Snapshot помогает найти первый входной продукт и выстроить опорную логику monetization без лишнего масштаба.",
      metrics: [
        { label: "Leads", value: "25 / 40" },
        { label: "Qual leads", value: "6 / 15" },
        { label: "Demo", value: "2 / 5" },
        { label: "Deals", value: "1 / 2" },
      ],
      bars: [
        { label: "Deal cycle", fact: 5, plan: 3 },
        { label: "CAC payback", fact: 9, plan: 6 },
      ],
    },
    {
      stage: "Startup",
      icon: "/startup.svg",
      industries: ["industry-fintech", "industry-ecom"],
      setup:
        "Продукт уже продаётся, но рост держится на ручных усилиях и не превращается в предсказуемую систему.",
      direction:
        "Snapshot выделяет главный ограничитель роста и показывает, где усилие даст максимальный сдвиг в unit-экономике.",
      metrics: [
        { label: "Leads", value: "70 / 95" },
        { label: "Qual leads", value: "22 / 30" },
        { label: "Demo", value: "10 / 14" },
        { label: "Deals", value: "4 / 6" },
      ],
      bars: [
        { label: "Deal cycle", fact: 8, plan: 5 },
        { label: "Margin", fact: 37, plan: 46 },
      ],
    },
    {
      stage: "Growth",
      icon: "/growth.svg",
      industries: [
        "industry-saas",
        "industry-ecom",
        "industry-fintech",
        "industry-edtech",
        "industry-healthtech",
        "industry-b2b",
      ],
      setup:
        "Рост уже есть, но он начинает упираться в связку positioning, cost stack и качество каналов.",
      direction:
        "Snapshot помогает перераспределить фокус между продажами, маркетингом и моделью расходов без потери темпа.",
      metrics: [
        { label: "Leads", value: "180 / 230" },
        { label: "Qual leads", value: "62 / 80" },
        { label: "Demo", value: "28 / 34" },
        { label: "Deals", value: "11 / 14" },
      ],
      bars: [
        { label: "Deal cycle", fact: 11, plan: 8 },
        { label: "CAC payback", fact: 7, plan: 5 },
      ],
    },
    {
      stage: "Expansion",
      icon: "/expansion.svg",
      industries: ["industry-b2b", "industry-edtech", "industry-ecom"],
      setup:
        "Компания масштабируется, но экономика новых направлений и каналов может размывать прибыльность.",
      direction:
        "Snapshot показывает, какие элементы системы можно расширять, а где требуется удержать дисциплину модели.",
      metrics: [
        { label: "Leads", value: "340 / 420" },
        { label: "Qual leads", value: "120 / 150" },
        { label: "Demo", value: "54 / 66" },
        { label: "Deals", value: "19 / 24" },
      ],
      bars: [
        { label: "Deal cycle", fact: 14, plan: 10 },
        { label: "Margin", fact: 31, plan: 39 },
      ],
    },
  ];

  const [rotation, setRotation] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragStartRotation = useRef(0);
  const isDragging = useRef(false);
  const mobileRailRef = useRef<HTMLDivElement | null>(null);

  const itemAngle = 360 / items.length;
  const radius = 300;

  const activeIndex = useMemo(() => {
    let frontIndex = 0;
    let maxZ = -Infinity;
    items.forEach((_, index) => {
      const angle = rotation + index * itemAngle;
      const radians = (angle * Math.PI) / 180;
      const z = Math.cos(radians) * radius;
      if (z > maxZ) {
        maxZ = z;
        frontIndex = index;
      }
    });
    return frontIndex;
  }, [rotation, itemAngle]);

  const responsiveActiveIndex = typeof window !== "undefined" && window.innerWidth <= 767 ? mobileActiveIndex : activeIndex;
  const activeIndustries = new Set(items[responsiveActiveIndex].industries);

  const startDrag = (clientX: number) => {
    isDragging.current = true;
    setIsDraggingState(true);
    dragStartX.current = clientX;
    dragStartRotation.current = rotation;
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const deltaX = clientX - dragStartX.current;
    const sensitivity = 0.22;
    setRotation(dragStartRotation.current + deltaX * sensitivity);
  };

  const endDrag = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    dragStartX.current = null;
  };


  useEffect(() => {
    const rail = mobileRailRef.current;
    if (!rail) return;

    const handleScroll = () => {
      const firstSlide = rail.querySelector<HTMLElement>(".stage-carousel-mobile-slide");
      const slideWidth = (firstSlide?.offsetWidth ?? rail.clientWidth * 0.84) + 10;
      const index = Math.round(rail.scrollLeft / Math.max(slideWidth, 1));
      setMobileActiveIndex(Math.max(0, Math.min(items.length - 1, index)));
    };

    handleScroll();
    rail.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [items.length]);

  return (
    <div className="stage-carousel-wrap">
      <div className="industries-pills industries-pills-carousel">
        <div className="industries-pills-left">
          {[
            ["industry-saas", "SaaS"],
            ["industry-ecom", "E-com"],
            ["industry-fintech", "FinTech"],
            ["industry-edtech", "EdTech"],
            ["industry-healthtech", "HealthTech"],
            ["industry-b2b", "B2B"],
          ].map(([key, label]) => (
            <span
              key={key}
              className={`industry-pill ${activeIndustries.has(key) ? "industry-pill-active" : "industry-pill-dim"}`}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="stage-rotate-cue stage-rotate-cue-right" aria-hidden="true">
          <span className="stage-rotate-cue-label">drag</span>
          <svg viewBox="0 0 56 32" fill="none">
            <path d="M20 7H6M6 7l4-4M6 7l4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M36 25h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 8.5c1.8-2.6 4.1-3.9 7-3.9 4.8 0 8.2 3.6 8.2 8.1 0 1.9-.6 3.4-1.8 4.9" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
            <path d="M34 23.5c-1.7 2.6-4.1 3.9-7 3.9-4.8 0-8.2-3.6-8.2-8.1 0-1.8.6-3.4 1.8-4.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div
        className={`stage-carousel-scene ${isDraggingState ? "is-dragging" : ""}`}
        onMouseDown={(e) => startDrag(e.clientX)}
        onMouseMove={(e) => moveDrag(e.clientX)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
      >
        <div className="stage-carousel-drum">
          {items.map((item, index) => {
            const angle = rotation + index * itemAngle;
            const radians = (angle * Math.PI) / 180;
            const x = Math.sin(radians) * radius;
            const z = Math.cos(radians) * radius;
            const scale = 0.74 + ((z + radius) / (radius * 2)) * 0.24;
            const opacity = 0.34 + ((z + radius) / (radius * 2)) * 0.66;
            const blur = Math.max(0, (1 - scale) * 2);
            const rotateY = Math.sin(radians) * -10;

            return (
              <div
                key={item.stage}
                className="stage-carousel-item stage-carousel-item-free"
                style={{
                  transform: `translateX(calc(-50% + ${x}px)) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: Math.round(z + radius),
                }}
              >
                <StageCard item={item} isFront={activeIndex === index} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="stage-carousel-mobile-rail" ref={mobileRailRef}>
        {items.map((item) => (
          <div key={`${item.stage}-mobile`} className="stage-carousel-mobile-slide">
            <StageCard item={item} isFront />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [clientsInput, setClientsInput] = useState("");
  const [checkInput, setCheckInput] = useState("");
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    const onResize = () => {
      if (window.innerWidth > 860) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1023) return;

    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));
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
        const rotateY = (px - 0.5) * 8;
        const rotateX = (0.5 - py) * 8;
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
      };

      const handleLeave = () => {
        inner.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const pushHistory = () => {
    setHistory((prev) => [
      ...prev,
      { clientsInput, checkInput, sales, retention, upsell, opexEff },
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
    setClientsInput("");
    setCheckInput("");
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

    return { clients: newClients, avgCheck, revenue, salesCost, support, opex, costs, profit };
  }, [clientsBase, checkBase, sales, retention, upsell, opexEff]);

  const base = useMemo(() => {
    const revenue = clientsBase * checkBase;
    const salesCost = revenue * 0.18;
    const support = revenue * 0.06;
    const opex = revenue * 0.35;
    const costs = salesCost + support + opex;
    const profit = revenue - costs;
    return { clients: clientsBase, avgCheck: checkBase, revenue, salesCost, support, opex, costs, profit };
  }, [clientsBase, checkBase]);

  const safeDiv = (n: number, d: number) => (d === 0 ? 0 : (n / d) * 100);
  const revDelta = safeDiv(data.revenue - base.revenue, base.revenue);
  const costDelta = safeDiv(data.costs - base.costs, base.costs);
  const profitDelta = safeDiv(data.profit - base.profit, base.profit);
  const clientsDelta = safeDiv(data.clients - base.clients, base.clients);
  const avgCheckDelta = safeDiv(data.avgCheck - base.avgCheck, base.avgCheck);
  const salesCostDelta = safeDiv(data.salesCost - base.salesCost, base.salesCost);
  const opexSupportDelta = safeDiv(data.opex + data.support - (base.opex + base.support), base.opex + base.support);

  const estimatedGap = Math.max(
    0,
    Math.round((data.revenue - base.revenue) * 0.55 + (data.profit - base.profit) * 0.45)
  );

  return (
    <main className="page-shell" id="top">
      <div className="cursor-glow" style={{ transform: `translate(${cursor.x - 54}px, ${cursor.y - 54}px)` }} />

      <div className="page-background" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="aurora aurora-4" />
        <div className="vignette" />
      </div>

      <header className={`header-fixed ${mobileMenuOpen ? "header-open" : ""}`}>
        <div className="header-inner">
          <a href="#top" className="logo-link" aria-label="Growth Avenue home">
            <img src="/logo.svg" alt="Growth Avenue" className="logo-main" />
          </a>

          <button
            type="button"
            className={`header-burger ${mobileMenuOpen ? "is-open" : ""}`}
            aria-label="Открыть меню"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`header-nav ${mobileMenuOpen ? "is-open" : ""}`}>
            <a href="#how-it-works" className="header-link" onClick={() => setMobileMenuOpen(false)}>Как это работает</a>
            <a href="#preview" className="header-link" onClick={() => setMobileMenuOpen(false)}>Интерактивное превью</a>
            <a href="#results" className="header-link" onClick={() => setMobileMenuOpen(false)}>Что вы получите</a>
            <a href="#analysis" className="header-link" onClick={() => setMobileMenuOpen(false)}>Как проходит анализ</a>
          </nav>

          <div className={`header-actions ${mobileMenuOpen ? "is-open" : ""}`}>
            <a href={payUrl} className="tg-gradient-btn header-cta" onClick={() => setMobileMenuOpen(false)}>Попробовать Snapshot</a>
            <a href={tgContactUrl} className="header-pill" target="_blank" rel="noreferrer">TG</a>
            <a href={waContactUrl} className="header-pill" target="_blank" rel="noreferrer">WA</a>
          </div>
        </div>
      </header>

      <div className="content-wrap">
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

              <div className="hero-highlights-row hero-highlights-row-unified glare-card-lite">
                <div className="hero-highlight-chip">MVP</div>
                <div className="hero-highlight-chip">CashCow</div>
                <div className="hero-highlight-chip">Scaling</div>
              </div>

              <div className="hero-actions-row">
                <a href="#try" className="tg-gradient-btn inline-flex">Попробовать Snapshot</a>
                <a href="#preview" className="ghost-link ghost-link-dark inline-flex">Побаловаться</a>
              </div>
            </div>

            <HeroEconomyChart />
          </div>
        </section>

        <section id="how-it-works" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Как это работает</div>
            <h2 className="section-title">Путь от простых ответов к комплексному результату</h2>
            <p className="section-copy">
              От базовых параметров — к полной картине экономики бизнеса:
              ограничения, точки роста и сценарии развития.
            </p>
          </div>

          <div className="journey-compact">
            <div className="journey-compact-card glare-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">1</div>
                <div className="journey-compact-title">Фиксация параметров бизнеса</div>
              </div>
              <div className="journey-compact-text">Определяются ключевые показатели текущей модели: экономика, структура продаж, ресурсы и ограничения. Это формирует основу для дальнейшего анализа.</div>
            </div>

            <div className="journey-compact-card glare-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">2</div>
                <div className="journey-compact-title">Сборка аналитической<br />модели</div>
              </div>
              <div className="journey-compact-text">Инструмент структурирует данные и формирует целостную картину бизнеса: выявляет ограничения, точки роста и взаимосвязи между показателями.</div>
            </div>

            <div className="journey-compact-card glare-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">3</div>
                <div className="journey-compact-title">Результат Snapshot</div>
              </div>
              <div className="journey-compact-text">Вы получаете аналитический срез бизнеса с ключевыми выводами: приоритетной точкой роста, оценкой экономического эффекта изменений и пониманием устойчивости текущей модели.</div>
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

          <div className="preview-grid">
            <div>
              <div className="preview-input-intro">Введите ваши данные или попробуйте пример ниже</div>
              <div className="preview-example-row">
                <button type="button" className="preview-example-chip" onClick={() => { pushHistory(); setClientsInput("20"); setCheckInput("2000"); }}>
                  Пример: 20 клиентов / $2000
                </button>
                <button type="button" className="preview-example-chip" onClick={() => { pushHistory(); setClientsInput("45"); setCheckInput("1500"); }}>
                  Пример: 45 клиентов / $1500
                </button>
              </div>
              <div className="input-grid mb-6 gap-3">
                <label className="input-shell input-shell-highlight">
                  <span className="input-label input-label-strong">Клиентов / месяц</span>
                  <div className="input-wrap input-wrap-primary">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={clientsInput}
                      onFocus={pushHistory}
                      onChange={(e) => setClientsInput(normalizeDigits(e.target.value))}
                      className="glass-input glass-input-primary"
                      placeholder="например, 20"
                    />
                  </div>
                </label>

                <label className="input-shell input-shell-highlight">
                  <span className="input-label input-label-strong">Средний чек</span>
                  <div className="input-wrap input-wrap-primary">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={checkInput}
                      onFocus={pushHistory}
                      onChange={(e) => setCheckInput(normalizeDigits(e.target.value))}
                      className="glass-input glass-input-primary"
                      placeholder="например, 2000"
                    />
                  </div>
                </label>
              </div>

              <section className="dashboard-grid">
                <TopMetricCard title="Выручка" value={fmtMoney(data.revenue)} delta={revDelta} type="revenue" />
                <TopMetricCard title="Прибыль" value={fmtMoney(data.profit)} delta={profitDelta} type="profit" />
                <TopMetricCard title="Расходы" value={fmtMoney(data.costs)} delta={costDelta} type="costs" invert />
              </section>

              <div className="mt-5">
                <div className="mb-3 text-sm text-white/58">Формирование экономики</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <ModelCard title="Клиенты" value={Math.round(data.clients)} delta={clientsDelta} />
                  <ModelCard title="Средний чек" value={fmtMoney(data.avgCheck)} delta={avgCheckDelta} />
                  <ModelCard title="Sales cost" value={fmtMoney(data.salesCost)} delta={salesCostDelta} />
                  <ModelCard title="Opex + Support" value={fmtMoney(data.opex + data.support)} delta={opexSupportDelta} invert />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-white/58">Рычаги управления</div>
                <div className="preview-actions-inline">
                  <button type="button" onClick={handleUndo} className="reset-link" disabled={!history.length}>Отменить действие</button>
                  <button type="button" onClick={handleReset} className="reset-link">Сбросить</button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Slider title="Эффективность продаж" subtitle="Влияние на конверсию и поток клиентов." value={sales} set={setSales} onStart={pushHistory} />
                <Slider title="Повторные продажи" subtitle="Влияние на устойчивость выручки." value={retention} set={setRetention} onStart={pushHistory} />
                <Slider title="Средний чек" subtitle="Рост денег без роста трафика." value={upsell} set={setUpsell} onStart={pushHistory} />
                <Slider title="Загрузка команды" subtitle="Влияние на расходы и маржу." value={opexEff} set={setOpexEff} onStart={pushHistory} />
              </div>
            </div>

            <aside className="glass-card glare-card preview-side">
              <div className="reserve-kicker">Оценочный резерв</div>
              <div className="hero-preview-box mt-4 glare-card-lite">
                <div className="reserve-amount">≈ {fmtMoney(estimatedGap)} <span>/ мес</span></div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Это только механика. Полный разбор раскрывает реальные
                  возможности при текущей ситуации вашего бизнеса.
                </p>
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <Row label="Выручка" delta={revDelta} />
                <Row label="Расходы" delta={costDelta} invert />
                <Row label="Прибыль" delta={profitDelta} />
              </div>

              <a href={payUrl} className="tg-gradient-btn mt-5 block text-center">Попробовать Snapshot</a>
            </aside>
          </div>
        </section>

        <section id="results" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Что вы получите</div>
            <h2 className="section-title">Цели Revenue Snapshot</h2>
            <p className="section-copy">
              Понять, каким должен быть первый <span className="accent-word">верный</span> шаг к построению новой стратегии для новых рубежей.
            </p>
          </div>

          <div className="results-grid-2x2">
            <ResultDocCard tab="ECONOMIC RATE" title="Executive Summary" text="Данные о вашем продукте, его маржинальности и спросе выявляют сильные и слабые стороны бизнеса и определяется главный фокус на данный момент." />
            <ResultDocCard tab="GROWTH LIMIT" title="Key Conclusions" text="Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели." />
            <ResultDocCard tab="SOLUTION" title="Strategy&Practice" text="Проведённый анализ данных определяет первичную задачу: целью всегда является повышение дохода." />
            <ResultDocCard tab="JTBD" title="RoadMap" text="Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP." />
          </div>

          <div className="results-bottom-stack">
            <div className="results-roadmap-note">
              После получения и изучения результатов у Вас есть возможность назначить <span>30-минутную встречу</span> с нашими C-level специалистами в сфере Маркетинга и Продаж <span>для декомпозиции результатов</span>.
            </div>
            <a href={payUrl} className="result-doc-start-btn results-start-btn">Начать путь со Snapshot</a>
          </div>
        </section>

        <section className="mb-16 stage-hover-map">
          <div className="section-head">
            <div className="section-kicker">Для кого этот инструмент</div>
            <h2 className="section-title">Где Revenue Snapshot показал результат</h2>
          </div>
          <StageCarousel />
        </section>

        <section id="analysis" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Как проходит анализ</div>
            <h2 className="section-title analysis-section-title">Что вас ждет</h2>
            <p className="section-copy">
              Мы собираем сигналы по пяти направлениям, чтобы увидеть не просто набор ответов, а карту решений.
            </p>
          </div>

          <div className="analysis-grid">
            <SnapshotStructure />
            <div className="analysis-right-card analysis-right-card-plain">
              <div className="start-cards-row">
                <StartCard
                  title="On Rec"
                  icon="/stratsession.svg"
                  mobileIcon="/on-rec_mobile.svg"
                  price="$770"
                  href={tgContactUrl}
                />
                <StartCard
                  title="Online-playground"
                  icon="/snapshot.svg"
                  mobileIcon="/online-playground_mobile.svg"
                  price="$114"
                  href={payUrl}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="try" className="pb-8">
          <div className="glass-card glare-card cta-card">
            <div>
              <div className="section-kicker">CTA</div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Откройте полный Revenue Snapshot</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                После оплаты пользователь переходит в Telegram, проходит диагностику и получает структурированный результат с финансовой логикой, проблемными зонами и главным направлением усиления.
              </p>
            </div>

            <div className="cta-box glare-card-lite">
              <div className="text-sm text-white/55">Следующий шаг</div>
              <div className="mt-2 text-2xl font-semibold text-white">Попробовать Snapshot</div>
              <a href={payUrl} className="tg-gradient-btn mt-5 inline-flex">Получить Revenue Snapshot</a>
            </div>
          </div>
        </section>

        <footer className="page-footer">
          <div>Growth Avenue</div>
          <div className="page-footer-links">
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body {
          background: #0a1526;
          color: #fefefe;
          overflow-x: hidden;
        }
        img { max-width: 100%; }
        .page-shell {
          position: relative;
          min-height: 100vh;
          background: #0a1526;
          overflow: clip;
          color: #fefefe;
        }
        .page-background {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(circle at 18% 22%, rgba(112,134,255,0.12), transparent 26%),
            radial-gradient(circle at 82% 18%, rgba(255,255,255,0.05), transparent 22%),
            radial-gradient(circle at 62% 70%, rgba(135,97,255,0.08), transparent 22%),
            linear-gradient(130deg, #0a1526 0%, #0c1830 34%, #0a1526 68%, #121f39 100%);
          background-size: 140% 140%;
          animation: pageAmbient 26s ease-in-out infinite alternate;
        }
        .content-wrap {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          padding: 108px 20px 40px;
        }
        .content-wrap > *, .hero-grid > *, .preview-grid > *, .analysis-grid > *, .cta-card > *, .stage-card-bottom-inner > *, .journey-compact > * { min-width: 0; }
        .header-fixed {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 80;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          background: linear-gradient(180deg, rgba(4,16,39,0.92), rgba(4,16,39,0.62));
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .header-open .header-inner {
          background: rgba(4,16,39,.94);
          border-color: rgba(255,255,255,.12);
        }
        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 14px 16px 12px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
          border-radius: 0 0 22px 22px;
        }
        .logo-link { display: inline-flex; align-items: center; }
        .header-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-width: 0;
          flex-wrap: wrap;
        }
        .header-link {
          color: rgba(255,255,255,.92);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          line-height: 1;
          white-space: nowrap;
          letter-spacing: -0.02em;
          transition: opacity .2s ease, transform .2s ease, color .2s ease;
        }
        .header-link:hover { opacity: 1; color: #fff; transform: translateY(-1px); }
        .header-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex-wrap: wrap;
        }
        .header-cta {
          min-height: 40px;
          padding: 0 18px;
          font-size: 13px;
          white-space: nowrap;
        }
        .header-burger {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(11,29,58,.6);
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0;
          flex-direction: column;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }
        .header-burger span {
          width: 18px;
          height: 2px;
          border-radius: 999px;
          background: #ffffff;
          transition: transform .22s ease, opacity .22s ease;
        }
        .header-burger.is-open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .header-burger.is-open span:nth-child(2) { opacity: 0; }
        .header-burger.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .header-pill,
        .hero-highlight-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          color: #0b1d3a;
          background: linear-gradient(135deg, rgba(247,210,55,0.98), rgba(247,210,55,0.88));
          box-shadow: 0 10px 24px rgba(247, 210, 55, 0.16);
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,.78);
          background: rgba(224,225,227,.07);
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
        }
        .logo-main {
          width: 250px;
          height: 62px;
          object-fit: contain;
          object-position: left center;
          display: block;
          flex-shrink: 0;
        }
        .cursor-glow {
          position: fixed;
          left: 0;
          top: 0;
          width: 108px;
          height: 108px;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(circle, rgba(247,210,55,0.18) 0%, rgba(247,210,55,0.08) 35%, rgba(247,210,55,0.02) 62%, transparent 80%);
          filter: blur(16px);
          opacity: 0.62;
          mix-blend-mode: screen;
          transition: transform 0.08s linear;
        }
        .aurora {
          position: absolute;
          border-radius: 999px;
          filter: blur(110px);
          opacity: .26;
        }
        .aurora-1 { width: 380px; height: 380px; left: -80px; top: 40px; background: rgba(80, 127, 255, 0.22); }
        .aurora-2 { width: 300px; height: 300px; right: 5%; top: 80px; background: rgba(247, 210, 55, 0.12); }
        .aurora-3 { width: 360px; height: 360px; left: 26%; top: 36%; background: rgba(88, 114, 255, 0.16); }
        .aurora-4 { width: 300px; height: 300px; right: 10%; bottom: 12%; background: rgba(255,255,255,0.08); }
        .line-grid { display: none; }
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 42%, rgba(10,21,38,0.24) 72%, rgba(10,21,38,0.74) 100%);
        }
        .glass-card {
          position: relative;
          border-radius: 24px;
          padding: 20px;
          overflow: hidden;
          isolation: isolate;
          background: linear-gradient(180deg, rgba(224,225,227,0.055) 0%, rgba(224,225,227,0.024) 100%);
          border: 1px solid rgba(214,220,232,0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(255,255,255,0.025), 0 18px 44px rgba(0,0,0,0.16);
          backdrop-filter: blur(42px) saturate(155%);
          -webkit-backdrop-filter: blur(42px) saturate(155%);
        }
        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: .75;
          background: linear-gradient(115deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.025) 18%, rgba(255,255,255,0.01) 34%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0.012) 64%, rgba(255,255,255,0.06) 82%, rgba(255,255,255,0.02) 100%);
        }
        .glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: .12;
          mix-blend-mode: soft-light;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.22) 0 0.8px, transparent 1px),
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.16) 0 0.8px, transparent 1px),
            radial-gradient(circle at 35% 75%, rgba(255,255,255,0.18) 0 0.7px, transparent 0.9px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12) 0 0.7px, transparent 0.9px);
          background-size: 16px 16px, 19px 19px, 15px 15px, 21px 21px;
        }
        .glass-card > *,.glare-card > *,.glare-card-lite > * { position: relative; z-index: 1; }
        .soft-glow { box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04), 0 18px 50px rgba(0,0,0,0.18); }
        .glare-card::before,.glare-card-lite::before {
          content: "";
          position: absolute;
          width: 34%;
          height: 34%;
          left: 14%;
          top: 12%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.035) 38%, transparent 76%);
          filter: blur(44px);
          pointer-events: none;
          z-index: 0;
          opacity: .8;
        }
        .premium-glass { position: relative; overflow: hidden; isolation: isolate; }
        .premium-glass::before {
          content: "";
          position: absolute;
          inset: -20%;
          z-index: 0;
          pointer-events: none;
          opacity: .18;
          filter: blur(18px);
          background: repeating-linear-gradient(105deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 2px, transparent 12px, transparent 42px);
          animation: premiumGlassShift 14s linear infinite;
        }
        .premium-glass::after {
          content: "";
          position: absolute;
          inset: auto -10% -18% -10%;
          height: 42%;
          z-index: 0;
          pointer-events: none;
          filter: blur(42px);
          opacity: .95;
          mix-blend-mode: screen;
          background:
            radial-gradient(circle at 30% 40%, rgba(125,255,220,0.34) 0%, transparent 42%),
            radial-gradient(circle at 68% 50%, rgba(130,120,255,0.32) 0%, transparent 44%),
            radial-gradient(circle at 48% 44%, rgba(255,255,255,0.12) 0%, transparent 36%);
        }
        .section-head { margin-bottom: 22px; }
        .section-kicker {
          margin-bottom: 10px;
          color: #f7d237;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .section-title {
          margin: 0;
          font-size: clamp(34px, 3.8vw, 58px);
          line-height: .96;
          letter-spacing: -.055em;
          font-weight: 700;
          color: #fff;
          max-width: 760px;
          text-wrap: balance;
        }
        .analysis-section-title { max-width: 780px; }
        .section-copy {
          margin-top: 16px;
          max-width: 840px;
          color: rgba(255,255,255,.7);
          font-size: 18px;
          line-height: 1.55;
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
          z-index: 0;
          transform-origin: center;
        }
        .hero-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(4,16,39,0.24) 0%, rgba(4,16,39,0.1) 38%, rgba(4,16,39,0.04) 62%, rgba(4,16,39,0.08) 100%);
          z-index: 1;
        }
        .hero-grid { display: grid; gap: 22px; }
        .hero-grid-frame {
          grid-template-columns: minmax(0,1fr) minmax(520px,0.92fr);
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
          line-height: .9;
          letter-spacing: -.07em;
          font-weight: 700;
          color: #ffffff;
          max-width: 860px;
        }
        .hero-main-subtitle {
          margin-top: 22px;
          color: #fff;
          font-size: clamp(26px, 2vw, 34px);
          line-height: .98;
          letter-spacing: -.045em;
          font-weight: 500;
        }
        .hero-main-copy {
          max-width: 620px;
          margin-top: 22px;
          color: rgba(255,255,255,.78);
          font-size: 22px;
          line-height: 1.5;
        }
        .hero-highlights-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .hero-actions-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
        .tg-gradient-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          border-radius: 999px;
          padding: 0 20px;
          text-decoration: none;
          color: #ffffff;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.16);
          background: linear-gradient(90deg, #47b6f6 0%, #5da7ff 22%, #7c84ff 48%, #9c6dff 72%, #c25cf3 100%);
          background-size: 220% 220%;
          box-shadow: 0 10px 30px rgba(71, 96, 255, 0.22), inset 0 1px 0 rgba(255,255,255,.18);
          animation: tgGradientFlow 6s ease-in-out infinite;
        }
        .tg-gradient-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.22) 25%, transparent 50%);
          transform: translateX(-130%);
          animation: tgShine 3.8s ease-in-out infinite;
        }
        .tg-gradient-btn > * { position: relative; z-index: 1; }
        .tg-gradient-btn:hover { transform: translateY(-1px); }
        .ghost-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          border-radius: 999px;
          padding: 0 20px;
          color: #fefefe;
          text-decoration: none;
          background: rgba(224,225,227,.07);
          border: 1px solid rgba(255,255,255,.12);
        }
        .ghost-link-dark { background: rgba(11,29,58,.42); }
        .hero-chart-float { width: 100%; max-width: 620px; margin-left: auto; }
        .hero-chart-float-title {
          margin-bottom: 12px;
          color: rgba(255,255,255,.64);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .14em;
        }
        .hero-levers-inline { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .hero-tag {
          border: 1px solid rgba(255,255,255,.12);
          cursor: pointer;
          transition: background .22s ease, color .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .hero-tag-active {
          color: #0b1d3a;
          background: linear-gradient(135deg, rgba(247,210,55,0.98), rgba(247,210,55,0.88));
          border-color: rgba(247,210,55,.24);
          box-shadow: 0 0 0 1px rgba(247,210,55,.16), 0 14px 28px rgba(247,210,55,.18);
        }
        .hero-chart-box {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, rgba(224,225,227,.09) 0%, rgba(224,225,227,.06) 45%, rgba(224,225,227,.04) 100%);
          backdrop-filter: blur(26px) saturate(145%);
          -webkit-backdrop-filter: blur(26px) saturate(145%);
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(255,255,255,.05), 0 18px 50px rgba(0,0,0,.24);
        }
        .hero-chart-metrics-row { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 8px; margin-bottom: 12px; }
        .hero-metric-square {
          min-height: 78px;
          border-radius: 18px;
          padding: 12px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
        }
        .hero-metric-square span,
        .bar-chart-label,
        .bar-chart-scale span,
        .hero-money-card span,
        .hero-money-card small { color: rgba(255,255,255,.58); font-size: 12px; }
        .hero-metric-square strong,
        .hero-money-card strong { display: block; margin-top: 8px; font-size: 18px; line-height: 1.05; }
        .bar-chart-wrap {
          position: relative;
          border-radius: 24px;
          padding: 16px 14px 14px;
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.08);
        }
        .bar-chart-scale { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); margin-bottom: 18px; }
        .bar-chart-grid {
          position: absolute;
          inset: 40px 14px 14px;
          background-image: linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
          background-size: 25% 100%;
        }
        .bar-chart-columns-horizontal { display: grid; gap: 12px; position: relative; }
        .bar-chart-row-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 7px; }
        .bar-chart-value { color: rgba(255,255,255,.82); font-size: 13px; }
        .bar-chart-bar-shell-horizontal {
          height: 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.05);
          overflow: hidden;
        }
        .bar-chart-bar-horizontal { height: 100%; border-radius: inherit; transition: width .8s ease, transform .8s ease; }
        .bar-good { background: linear-gradient(90deg, rgba(244,221,114,.98), rgba(255,236,149,.98)); }
        .bar-bad { background: linear-gradient(90deg, rgba(122,149,255,.88), rgba(172,183,255,.88)); }
        .hero-chart-bottom {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 10px;
          margin-top: 12px;
          position: relative;
          z-index: 3;
        }
        .hero-money-card {
          border-radius: 18px;
          padding: 14px;
          background: rgba(8,18,40,.74);
          border: 1px solid rgba(255,255,255,.14);
          backdrop-filter: blur(18px) saturate(130%);
          -webkit-backdrop-filter: blur(18px) saturate(130%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 18px 36px rgba(0,0,0,.16);
        }
        .hero-active-note {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
          border-radius: 18px;
          padding: 12px 14px;
          background: rgba(8,18,40,.68);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.76);
          font-size: 13px;
          line-height: 1.45;
          position: relative;
          z-index: 3;
        }
        .hero-active-note-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 16px rgba(247,210,55,.42);
          animation: pulseTinyYellow 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        .hero-money-card-muted {
          border: 1px solid rgba(200,200,200,.16) !important;
          background: rgba(10,18,36,.58) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }
        .journey-compact { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
        .journey-compact-card {
          position: relative;
          min-height: 214px;
          border-radius: 28px;
          padding: 20px 20px 18px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(224,225,227,.1), rgba(224,225,227,.07));
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(18px) saturate(130%);
        }
        .journey-compact-top { display: grid; grid-template-columns: 54px minmax(0,1fr); align-items: flex-start; column-gap: 14px; margin-bottom: 14px; }
        .journey-compact-badge {
          width: 34px; height: 34px; border-radius: 999px; display: grid; place-items: center; flex-shrink: 0;
          background: transparent; color: #f7d237; font-size: 13px; font-weight: 700;
          border: 1px solid rgba(247,210,55,.34);
        }
        .journey-compact-arrow { display: none; }
        .journey-compact-title { padding-top: 2px; font-size: 22px; line-height: 1.04; letter-spacing: -.03em; font-weight: 600; max-width: 240px; }
        .journey-compact-text { margin-top: 0; padding-left: 68px; color: rgba(255,255,255,.7); line-height: 1.52; font-size: 14px; }
        .preview-grid { display: grid; grid-template-columns: minmax(0,1fr) 300px; gap: 20px; align-items: start; }
        .preview-input-intro { margin-bottom: 12px; color: rgba(255,255,255,.82); font-size: 15px; font-weight: 600; }
        .preview-example-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
        .preview-example-chip { display: inline-flex; align-items: center; min-height: 36px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); color: rgba(255,255,255,.82); font-size: 12px; font-weight: 700; cursor: pointer; transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .preview-example-chip:hover { transform: translateY(-1px); border-color: rgba(247,210,55,.28); background: rgba(247,210,55,.08); }
        .input-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); }
        .input-shell {
          display: flex; flex-direction: column; gap: 8px;
          border-radius: 22px; padding: 14px; background: rgba(224,225,227,.08); border: 1px solid rgba(255,255,255,.1);
        }
        .input-label { color: rgba(255,255,255,.62); font-size: 14px; font-weight: 600; }
        .input-wrap { border-radius: 16px; overflow: hidden; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); }
        .glass-input {
          width: 100%; height: 48px; padding: 0 14px; background: transparent; border: none; outline: none;
          color: #fff; font-size: 14px; font-weight: 600;
        }
        .glass-input::placeholder { color: rgba(255,255,255,.34); font-size: 14px; font-weight: 600; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
        .metric-card,.model-card,.slider-card { min-height: 132px; padding: 16px; }
        .metric-head,.model-head { display: flex; justify-content: space-between; gap: 10px; align-items: flex-start; }
        .metric-label,.model-label { color: rgba(255,255,255,.7); font-size: 13px; font-weight: 600; }
        .metric-flag {
          margin-top: 8px; display: inline-flex; padding: 4px 8px; border-radius: 999px; font-size: 11px; line-height: 1;
          border: 1px solid rgba(255,255,255,.08); color: rgba(255,255,255,.62); background: rgba(255,255,255,.04);
        }
        .flag-good { color: #bbf7d0; border-color: rgba(187,247,208,.18); background: rgba(34,197,94,.08); }
        .flag-bad { color: #fecdd3; border-color: rgba(251,113,133,.18); background: rgba(251,113,133,.08); }
        .metric-delta-top,.model-delta-top { font-size: 12px; font-weight: 700; }
        .metric-main-value,.model-main-value {
          margin-top: 22px;
          font-size: clamp(22px, 2vw, 30px);
          line-height: .98;
          letter-spacing: -.04em;
          font-weight: 700;
        }
        .slider-title { font-size: 14px; line-height: 1.2; font-weight: 600; }
        .slider-subtitle { margin-top: 10px; min-height: 34px; font-size: 12px; line-height: 1.45; color: rgba(255,255,255,.42); }
        .slider-percent { margin-top: 8px; font-size: 12px; color: rgba(255,255,255,.5); }
        .range-input { height: 18px; }
        .preview-actions-inline { display: flex; align-items: center; gap: 16px; }
        .reset-link {
          border: none; background: transparent; color: rgba(255,255,255,.54); cursor: pointer; padding: 0; font-size: 13px;
        }
        .reset-link:disabled { opacity: .35; cursor: not-allowed; }
        .preview-side { position: sticky; top: 100px; }
        .reserve-kicker { color: #f7d237; font-size: 13px; font-weight: 700; }
        .hero-preview-box,
        .side-note-card,
        .cta-box {
          border-radius: 20px; padding: 16px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
        }
        .reserve-amount {
          font-size: clamp(22px, 2vw, 30px);
          line-height: .98;
          letter-spacing: -.04em;
          font-weight: 700;
          color: #f7d237;
        }
        .reserve-amount span { color: rgba(255,255,255,.62); font-size: inherit; font-weight: inherit; }
        .results-grid-2x2 { display: grid; grid-template-columns: repeat(2, minmax(0, min(100%, 470px))); gap: 14px; justify-content: center; }
        .result-doc-card { min-height: 236px; perspective: 1400px; }
        .result-doc-card-inner {
          height: 100%; min-height: 236px; border-radius: 28px; padding: 20px; transform-style: preserve-3d; transition: transform .18s ease-out;
          background: linear-gradient(180deg, rgba(224,225,227,.1), rgba(224,225,227,.07)); border: 1px solid rgba(255,255,255,.12);
        }
        .result-doc-top { display: flex; justify-content: flex-start; gap: 10px; margin-bottom: 24px; }
        .result-doc-tab { display: inline-flex; align-items: center; min-height: 30px; padding: 0 12px; border-radius: 999px; background: linear-gradient(135deg, rgba(247,210,55,.98), rgba(247,210,55,.9)); border: 1px solid rgba(247,210,55,.24); color: #0b1d3a; font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
        .result-doc-title { font-size: 28px; line-height: .98; letter-spacing: -.04em; font-weight: 600; }
        .result-doc-text { margin-top: 16px; color: rgba(255,255,255,.72); font-size: 15px; line-height: 1.55; max-width: 92%; }
        .results-bottom-stack { display: flex; flex-direction: column; align-items: center; gap: 18px; margin-top: 18px; }
        .results-roadmap-note {
          max-width: 860px; text-align: center; color: rgba(255,255,255,.68); font-size: 15px; line-height: 1.65;
        }
        .results-roadmap-note span { color: #f7d237; font-weight: 600; }
        .result-doc-start-btn {
          display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 22px; border-radius: 999px;
          text-decoration: none; color: #ffffff; font-weight: 700; border: 1px solid rgba(255,255,255,.16);
          background: linear-gradient(90deg, #47b6f6 0%, #5da7ff 22%, #7c84ff 48%, #9c6dff 72%, #c25cf3 100%);
          background-size: 220% 220%; box-shadow: 0 10px 30px rgba(71,96,255,.22), inset 0 1px 0 rgba(255,255,255,.18);
          animation: tgGradientFlow 6s ease-in-out infinite;
        }
        .industries-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; align-items: center; }
        .industries-pills-carousel {
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .industries-pills-left {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .stage-rotate-cue {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          min-width: 118px;
          height: 44px;
          padding: 0 14px;
          color: rgba(255,255,255,.72);
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.11);
          background: rgba(255,255,255,.035);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .stage-rotate-cue-label {
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.54);
        }
        .stage-rotate-cue-right { margin-left: auto; }
        .stage-rotate-cue svg { width: 42px; height: 22px; }
        .industry-pill {
          display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 14px; border-radius: 999px;
          font-size: 12px; font-weight: 700; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.04); color: rgba(255,255,255,.48);
        }
        .industry-pill-active { color: #0b1d3a; background: linear-gradient(135deg, rgba(247,210,55,.98), rgba(247,210,55,.88)); border-color: rgba(247,210,55,.28); }
        .stage-carousel-scene {
          position: relative; perspective: 2200px; min-height: 550px; display: flex; flex-direction: column; align-items: center; justify-content: center;
          touch-action: pan-y; user-select: none; -webkit-user-select: none; cursor: grab; overflow: hidden;
        }
        .stage-carousel-mobile-rail { display: none; }
        .stage-carousel-scene.is-dragging { cursor: grabbing; }
        .stage-carousel-drum { position: relative; width: 100%; height: 456px; transform-style: preserve-3d; }
        .stage-carousel-item-free {
          position: absolute; top: 18px; left: 50%; width: min(580px, 50vw); transform-style: preserve-3d;
          transition: transform .04s linear, opacity .04s linear, filter .04s linear; will-change: transform, opacity, filter;
        }
        .stage-card-analytics {
          position: relative; display: flex; flex-direction: column; min-height: 354px; border-radius: 30px; overflow: hidden;
          border: 1px solid rgba(255,255,255,.11); background: linear-gradient(180deg, rgba(16,27,49,.36) 0%, rgba(11,20,38,.22) 100%);
          backdrop-filter: blur(68px) saturate(155%);
          -webkit-backdrop-filter: blur(68px) saturate(155%);
          box-shadow: 0 24px 54px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.06);
        }
        .stage-card-analytics::after { display: none; }
        .stage-card-top-panel {
          display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 18px; padding: 20px 20px 16px; min-height: 184px;
          background: linear-gradient(135deg, rgba(255,255,255,.07) 0%, rgba(255,255,255,.025) 100%);
        }
        .stage-card-copy { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
        .stage-copy-block h4 {
          margin: 0; font-size: 20px; line-height: 1.04; font-weight: 500; color: rgba(255,255,255,.96); letter-spacing: -.03em;
        }
        .stage-copy-block p { margin: 8px 0 0; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.82); }
        .stage-card-heading { display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-start; min-width: 130px; }
        .stage-card-heading span { font-size: 11px; text-transform: uppercase; letter-spacing: .16em; color: rgba(255,255,255,.5); }
        .stage-card-heading strong { margin-top: 6px; font-size: 42px; line-height: .92; letter-spacing: -.06em; }
        .stage-card-bottom-panel { position: relative; padding: 16px 18px 18px; flex: 1; }
        .stage-card-bottom-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; min-height: 100%; }
        .compact-metrics-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
        .stage-inline-metric {
          border-radius: 18px; padding: 12px; background: rgba(255,255,255,.065); border: 1px solid rgba(255,255,255,.1);
          backdrop-filter: blur(16px);
        }
        .stage-ring-label { color: rgba(255,255,255,.56); font-size: 11px; text-transform: uppercase; letter-spacing: .12em; }
        .stage-inline-metric-value { margin-top: 8px; font-size: 22px; line-height: 1; letter-spacing: -.04em; font-weight: 700; }
        .stage-bars-title { font-size: 24px; line-height: 1; letter-spacing: -.06em; font-weight: 700; }
        .stage-bars-wrap { display: grid; gap: 12px; margin-top: 14px; }
        .stage-bar-group { max-width: none; }
        .stage-bar-label { margin-bottom: 8px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.52); }
        .stage-bar-stack { display: grid; gap: 8px; }
        .stage-bar-track { height: 16px; border-radius: 999px; overflow: hidden; background: rgba(255,255,255,.06); }
        .stage-bar-track-thin { height: 10px; }
        .stage-bar-fill { height: 100%; border-radius: inherit; }
        .stage-bar-fill-fact { background: linear-gradient(90deg, rgba(247,210,55,.96), rgba(255,231,138,.96)); }
        .stage-bar-fill-plan { background: linear-gradient(90deg, rgba(130,120,255,.76), rgba(172,183,255,.82)); }
        .stage-card-watermark-icon { display: none; }
        .analysis-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: stretch;
        }
        .analysis-left-title { margin: 0; font-size: clamp(30px, 2.8vw, 44px); line-height: .98; letter-spacing: -.05em; font-weight: 700; max-width: 680px; }
        .snapshot-builder-copy { margin: 14px 0 18px; max-width: 680px; color: rgba(255,255,255,.7); font-size: 16px; line-height: 1.58; }
        .signal-board {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
            "pos pos pos struct struct struct"
            "econ econ clients clients product product";
          gap: 14px;
          align-items: stretch;
          height: 560px;
        }
        .signal-card {
          position: relative;
          min-height: 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.13);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(0,0,0,.16);
          backdrop-filter: blur(42px) saturate(145%);
          -webkit-backdrop-filter: blur(42px) saturate(145%);
        }
        .signal-card-layout-1 { grid-area: pos; }
        .signal-card-layout-2 { grid-area: struct; }
        .signal-card-layout-3 { grid-area: econ; }
        .signal-card-layout-4 { grid-area: clients; }
        .signal-card-layout-5 { grid-area: product; }
        .signal-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at 20% 18%, rgba(255,255,255,.12), transparent 28%);
          opacity: .85;
        }
        .signal-card-blue::after,
        .signal-card-violet::after,
        .signal-card-gold::after,
        .signal-card-slate::after,
        .signal-card-indigo::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          height: 1px;
          opacity: .9;
          background: linear-gradient(90deg, rgba(255,255,255,.06), rgba(255,255,255,.24), rgba(255,255,255,.06));
        }
        .signal-card-blue { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(35,88,255,.08); }
        .signal-card-violet { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(109,76,255,.08); }
        .signal-card-gold { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(247,210,55,.08); }
        .signal-card-slate { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(120,136,190,.08); }
        .signal-card-indigo { box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 18px 44px rgba(98,112,255,.08); }
        .signal-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,.54);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .14em;
        }
        .signal-card-weight {
          color: #f7d237;
          font-weight: 700;
          font-size: 12px;
        }
        .signal-card-title {
          margin-top: 10px;
          font-size: clamp(20px, 1.7vw, 28px);
          line-height: .98;
          letter-spacing: -.05em;
          font-weight: 700;
          max-width: 12ch;
        }
        .signal-card-points {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }
        .signal-card-point {
          display: grid;
          grid-template-columns: 10px 1fr;
          gap: 9px;
          align-items: start;
          color: rgba(255,255,255,.72);
          font-size: 12px;
          line-height: 1.38;
        }
        .signal-card-dot {
          width: 6px;
          height: 6px;
          margin-top: 6px;
          border-radius: 999px;
          background: #f7d237;
          box-shadow: 0 0 0 4px rgba(247,210,55,.08);
        }
        .signal-card-bottom { margin-top: 12px; }
        .signal-meter {
          height: 7px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.04);
        }
        .signal-meter span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(247,210,55,.94), rgba(145,120,255,.84));
        }
        .signal-caption {
          margin-top: 8px;
          color: rgba(255,255,255,.46);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .12em;
        }
        .analysis-right-card-plain {
          min-height: 0;
          height: auto;
          overflow: visible;
          max-width: none;
          margin-top: 6px;
        }
        .start-cards-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 540px));
          justify-content: center;
          gap: 20px;
          width: 100%;
          align-items: start;
        }
        .start-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 540px;
        }
        .start-card-media-wrap {
          display: grid;
          grid-template-columns: minmax(0,1fr) 96px;
          align-items: stretch;
          gap: 14px;
          width: 100%;
        }
        .start-card-inner {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          border: none;
          background: transparent;
          transform-style: preserve-3d;
          transition: transform .24s ease-out;
          box-shadow: none;
          min-height: 0;
          height: auto;
        }
        .start-card-inner picture {
          display: block;
          width: 100%;
        }
        .start-card-frame {
          width: 100%;
          height: auto;
          object-fit: contain;
          object-position: center;
          opacity: 1;
          border-radius: 30px;
          display: block;
        }
        .start-card-overlay {
          position: absolute;
          inset: 0;
          display: block;
          padding: 0;
          background: none;
          pointer-events: none;
        }
        .start-card-status-dot { display: none; }
        .start-card-bottom-simple {
          position: absolute;
          inset: 0;
          display: block;
        }
        .start-card-title-chip { display: none; }
        .start-card-price-float {
          position: absolute;
          line-height: .92;
          letter-spacing: -.06em;
          font-weight: 700;
          text-shadow: 0 10px 28px rgba(0,0,0,.22);
        }
        .start-card-onrec .start-card-price-float {
          right: 5.6%;
          bottom: 12.2%;
          font-size: clamp(36px, 2.8vw, 64px);
        }
        .start-card-playground .start-card-price-float {
          right: 5.8%;
          top: 18.8%;
          font-size: clamp(36px, 2.8vw, 64px);
        }
        .start-card-play {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          overflow: hidden;
          background: linear-gradient(180deg, #8a78d9 0%, #b7896d 24%, #d69a3a 56%, #f1d56b 78%, #1a1a6f 100%);
          background-size: 180% 180%;
          animation: cardPlayFlow 9s ease-in-out infinite;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 12px 30px rgba(0,0,0,.22);
          border: 1px solid rgba(255,255,255,.08);
        }
        .start-card-play-desktop {
          width: 96px;
          min-width: 96px;
          border-radius: 26px;
        }
        .start-card-play-mobile {
          display: none;
        }
        .start-card-play-triangle {
          width: 0;
          height: 0;
          border-left: 28px solid #0b1d3a;
          border-top: 18px solid transparent;
          border-bottom: 18px solid transparent;
          margin-left: 6px;
          filter: drop-shadow(0 8px 18px rgba(0,0,0,.18));
        }
        .cta-card {
          display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: 18px; align-items: center;
        }
        .footer-mini-links,.page-footer-links { display: flex; flex-wrap: wrap; gap: 14px; }
        .footer-mini-links a,.page-footer-links a { color: rgba(255,255,255,.5); text-decoration: none; font-size: 12px; }
        .page-footer {
          position: relative;
          z-index: 12;
          margin-top: 30px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,.08);
          display: flex; align-items: center; justify-content: space-between; gap: 16px; color: rgba(255,255,255,.52); font-size: 13px;
        }
        .page-footer-links { position: relative; z-index: 13; }
        .page-footer-links a { pointer-events: auto; }
        .accent-word { color: #f7d237; }
        .text-emerald-300 { color: #a7f3d0; }
        .text-rose-300 { color: #fda4af; }
        .text-white\/50 { color: rgba(255,255,255,.5); }
        @keyframes pageAmbient {
          0% { transform: translate3d(0,0,0) scale(1); filter: hue-rotate(0deg); }
          50% { transform: translate3d(0,0,0) scale(1.05); filter: hue-rotate(4deg); }
          100% { transform: translate3d(0,0,0) scale(1.02); filter: hue-rotate(-4deg); }
        }
        @keyframes premiumGlassShift {
          0% { transform: translate3d(-12px,0,0); }
          50% { transform: translate3d(14px,-6px,0); }
          100% { transform: translate3d(-12px,0,0); }
        }
        @keyframes tgGradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cardPlayFlow {
          0% { background-position: 0% 8%; }
          50% { background-position: 100% 92%; }
          100% { background-position: 0% 8%; }
        }
        @keyframes tgShine {
          0% { transform: translateX(-130%); }
          55% { transform: translateX(130%); }
          100% { transform: translateX(130%); }
        }
        @keyframes pulseTinyYellow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.22); opacity: .72; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 1280px) {
          .hero-section { min-height: 720px; }
          .hero-main-copy,.section-copy { font-size: 19px; }
          .stage-carousel-item-free { width: min(620px, 62vw); }
        }
        @media (max-width: 1180px) {
          .header-inner {
            grid-template-columns: 1fr auto;
            align-items: center;
            gap: 14px;
          }
          .header-burger { display: inline-flex; }
          .header-nav,
          .header-actions {
            display: none;
            width: 100%;
            grid-column: 1 / -1;
          }
          .header-nav.is-open,
          .header-actions.is-open {
            display: flex;
          }
          .header-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            padding: 14px 0 2px;
          }
          .header-actions {
            gap: 10px;
            padding-top: 4px;
            justify-content: flex-start;
          }
          .header-cta {
            width: 100%;
            justify-content: center;
          }
          .preview-grid,.analysis-grid,.cta-card,.hero-grid-frame { grid-template-columns: 1fr; }
          .preview-side { position: static; }
          .journey-compact,.results-grid-2x2 { grid-template-columns: 1fr; }
          .stage-carousel-item-free { width: min(680px, 78vw); }
          .signal-board { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        @media (max-width: 1023px) {
          .content-wrap { padding-top: 150px; }
          .industries-pills-carousel { align-items: flex-start; }
          .industries-pills-left { width: 100%; }
          .stage-rotate-cue-right { margin-left: 0; }
          .hero-section { min-height: auto; padding: 24px 18px; }
          .hero-chart-metrics-row,.dashboard-grid,.input-grid,.hero-chart-bottom { grid-template-columns: 1fr 1fr; }
          .start-cards-row {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
          .start-card-media-wrap { grid-template-columns: minmax(0,1fr) 86px; gap: 12px; }
          .stage-carousel-scene { min-height: 520px; }
          .stage-carousel-drum { height: 440px; }
          .stage-carousel-item-free { width: min(700px, 82vw); }
          .stage-card-top-panel,.stage-card-bottom-inner { grid-template-columns: 1fr; }
          .stage-card-heading { align-items: flex-start; }
        }
        @media (max-width: 767px) {
          .cursor-glow,
          .page-background,
          .glass-card::before,
          .glass-card::after,
          .glare-card::before,
          .glare-card-lite::before,
          .premium-glass::before,
          .premium-glass::after { display: none !important; }
          .content-wrap {
            width: 100%;
            max-width: 100%;
            padding: 138px 14px 28px;
          }
          .header-fixed {
            left: 0;
            right: 0;
            width: 100%;
            background: rgba(4,16,39,.94);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .header-inner {
            width: 100%;
            max-width: 100%;
            padding: 12px 14px;
            border-radius: 0;
          }
          .logo-link { min-width: 0; }
          .logo-main { width: 168px; height: auto; }
          .header-nav,
          .header-actions {
            width: 100%;
            max-width: 100%;
          }
          .header-link { font-size: 14px; }
          .header-actions {
            gap: 10px;
            padding-top: 8px;
            justify-content: flex-start;
          }
          .header-pill { min-width: 52px; }
          .header-cta {
            width: 100%;
            justify-content: center;
          }
          .section-head { margin-bottom: 18px; }
          .section-title { font-size: clamp(30px, 10vw, 42px); }
          .section-copy { font-size: 15px; line-height: 1.5; }
          .hero-section {
            min-height: auto;
            padding: 14px;
            border-radius: 28px;
            overflow: hidden;
          }
          .hero-section::before,
          .hero-section::after { display: none; }
          .hero-grid { gap: 14px; }
          .hero-left {
            position: relative;
            overflow: hidden;
            border-radius: 24px;
            padding: 18px 14px 18px;
            background: linear-gradient(180deg, rgba(11,29,58,.84) 0%, rgba(11,29,58,.58) 100%);
            border: 1px solid rgba(255,255,255,.08);
          }
         .hero-left::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(180deg, rgba(4,16,39,.10) 0%, rgba(4,16,39,.16) 42%, rgba(4,16,39,.52) 100%),
    url("/hero_mobile.svg");
  background-repeat: no-repeat;
  background-size: cover, cover;
  background-position: center, center;
  opacity: .92;
  z-index: 0;
}
          .hero-left > * { position: relative; z-index: 1; }
          .hero-main-title { font-size: clamp(46px, 15vw, 72px); }
          .hero-main-subtitle { margin-top: 14px; font-size: 22px; }
          .hero-main-copy { margin-top: 16px; font-size: 16px; line-height: 1.45; max-width: 100%; }
          .hero-highlights-row { margin-top: 18px; gap: 8px; }
          .hero-highlight-chip { min-height: 30px; padding: 0 12px; font-size: 11px; }
          .hero-actions-row { margin-top: 18px; gap: 10px; }
          .hero-chart-float-title { margin-bottom: 10px; font-size: 11px; }
          .hero-levers-inline {
            display: grid;
            grid-template-columns: repeat(2, minmax(0,1fr));
            gap: 8px;
            margin-bottom: 10px;
          }
          .hero-tag { width: 100%; min-height: 38px; padding: 0 10px; font-size: 12px; }
          .hero-chart-box { padding: 12px; border-radius: 22px; }
          .hero-chart-metrics-row { display: none; }
          .bar-chart-scale span:nth-child(2),
          .bar-chart-scale span:nth-child(4) { display: none; }
          .bar-chart-scale { grid-template-columns: repeat(3, minmax(0,1fr)); gap: 6px; }
          .bar-chart-scale span { font-size: 11px; }
          .bar-chart-grid { inset: 38px 14px 14px; background-size: 50% 100%; }
          .hero-chart-bottom { grid-template-columns: 1fr; gap: 8px; }
          .hero-money-card { padding: 12px; }
          .journey-compact { grid-template-columns: 1fr; gap: 12px; }
          .journey-compact-card { min-height: unset; padding: 18px 16px 16px; border-radius: 22px; }
          .journey-compact-top { grid-template-columns: 42px minmax(0,1fr); column-gap: 10px; margin-bottom: 10px; }
          .journey-compact-title { max-width: none; font-size: 18px; }
          .journey-compact-text { padding-left: 52px; font-size: 13px; line-height: 1.48; }
          .preview-grid { grid-template-columns: 1fr; gap: 14px; }
          .preview-input-intro { font-size: 14px; }
          .preview-example-row { gap: 8px; }
          .preview-example-chip { width: 100%; justify-content: center; min-height: 46px; padding: 0 16px; border: 1px solid rgba(247,210,55,.52); color: #0b1d3a; background: linear-gradient(135deg, rgba(247,210,55,1), rgba(255,229,122,.98)); box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 10px 24px rgba(247,210,55,.22); font-weight: 800; }
          .hero-chart-metrics-row,.dashboard-grid,.input-grid,.hero-chart-bottom,.compact-metrics-grid { grid-template-columns: 1fr; }
          .input-shell { padding: 12px; border-radius: 18px; }
          .glass-input { height: 46px; }
          .dashboard-grid { gap: 10px; }
          .metric-card,.model-card,.slider-card { min-height: auto; padding: 14px; border-radius: 20px; }
          .metric-main-value,.model-main-value,.reserve-amount { font-size: 22px; }
          .preview-side { position: static; padding: 16px; border-radius: 22px; }
          .preview-actions-inline { gap: 12px; }
          .preview-grid .mt-5 .grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .preview-grid .mt-6 + .mt-3 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0,1fr));
            gap: 10px;
          }
          .results-grid-2x2 { grid-template-columns: 1fr; gap: 12px; }
          .result-doc-card, .result-doc-card-inner { min-height: unset; }
          .result-doc-card-inner { padding: 18px; border-radius: 22px; }
          .result-doc-title { font-size: 22px; }
          .result-doc-text { max-width: 100%; font-size: 14px; }
          .industries-pills-carousel { gap: 12px; }
          .industries-pills-left {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, minmax(0,1fr));
            gap: 8px;
          }
          .industry-pill { min-height: 32px; padding: 0 8px; font-size: 11px; }
          .stage-rotate-cue,
          .stage-carousel-scene { display: none; }
          .stage-carousel-mobile-rail {
            display: flex;
            gap: 10px;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 2px 0 10px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .stage-carousel-mobile-rail::-webkit-scrollbar { display: none; }
          .stage-carousel-mobile-slide {
            flex: 0 0 84%;
            min-width: 84%;
            width: 84%;
            scroll-snap-align: start;
          }
          .stage-card-analytics { min-height: auto; border-radius: 22px; width: 100%; }
          .stage-card-top-panel { padding: 14px; min-height: auto; gap: 10px; }
          .stage-copy-block { display: grid; gap: 6px; }
          .stage-copy-block h4 { font-size: 14px; }
          .stage-copy-block p { font-size: 11px; line-height: 1.4; }
          .stage-card-heading { min-width: 0; align-items: flex-start; }
          .stage-card-heading span { font-size: 10px; }
          .stage-card-heading strong { font-size: 28px; }
          .stage-card-bottom-panel { padding: 12px; }
          .stage-card-bottom-inner { grid-template-columns: 1fr; gap: 10px; }
          .compact-metrics-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; }
          .stage-inline-metric { padding: 7px 8px; border-radius: 14px; min-height: 0; }
          .stage-ring-label { font-size: 9px; letter-spacing: .08em; }
          .stage-inline-metric-value { margin-top: 4px; font-size: 14px; }
          .stage-bars-title { font-size: 16px; }
          .stage-bars-wrap { margin-top: 10px; gap: 10px; }
          .stage-bar-label { margin-bottom: 6px; font-size: 10px; }
          .stage-bar-track { height: 12px; }
          .stage-bar-track-thin { height: 8px; }
          .analysis-grid { grid-template-columns: 1fr; gap: 18px; }
          .signal-board {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: none;
            height: auto;
            gap: 12px;
          }
          .signal-card,
          .signal-card-layout-1,
          .signal-card-layout-2,
          .signal-card-layout-3,
          .signal-card-layout-4,
          .signal-card-layout-5 {
            grid-area: auto;
          }
          .signal-card {
            min-height: unset;
            height: auto;
            padding: 16px;
            border-radius: 22px;
          }
          .signal-card-title { font-size: 22px; max-width: 100%; }
          .signal-card-points { gap: 8px; }
          .signal-card-point { font-size: 13px; }
          .analysis-right-card-plain { height: auto; }
          .start-cards-row { grid-template-columns: 1fr; gap: 16px; }
          .start-card { flex: none; gap: 10px; }
          .start-card-media-wrap {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .start-card-inner {
            min-height: 0;
            border-radius: 24px;
            border: none;
            background: transparent;
            box-shadow: none;
            overflow: hidden;
          }
          .start-card-frame {
            display: block;
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: center;
            border-radius: 24px;
          }
          .start-card-overlay {
            background: none;
          }
          .start-card-title-chip { display: none; }
          .start-card-onrec .start-card-price-float {
            right: 4.6%;
            bottom: 10.2%;
            top: auto;
            font-size: clamp(32px, 10.4vw, 58px);
          }
          .start-card-playground .start-card-price-float {
            right: 5%;
            top: 20%;
            bottom: auto;
            font-size: clamp(32px, 10.4vw, 58px);
          }
          .start-card-play-desktop { display: none; }
          .start-card-play-mobile {
            display: flex;
            width: 100%;
            min-height: 104px;
            border-radius: 24px;
          }
          .start-card-play-triangle {
            border-left-width: 28px;
            border-top-width: 18px;
            border-bottom-width: 18px;
            margin-left: 6px;
          }
          .hero-chart-float { max-width: 100%; }
          .hero-chart-box,
          .hero-metric-square,
          .bar-chart-wrap,
          .hero-money-card,
          .hero-active-note,
          .journey-compact-card,
          .input-shell,
          .metric-card,
          .model-card,
          .slider-card,
          .preview-side,
          .stage-card-analytics,
          .signal-card,
          .result-doc-card-inner,
          .start-card-inner,
          .cta-card,
          .cta-box {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            box-shadow: 0 10px 28px rgba(0,0,0,.16), inset 0 1px 0 rgba(255,255,255,.06);
          }
          .bar-chart-bar-horizontal,
          .hero-active-note,
          .hero-tag,
          .tg-gradient-btn,
          .ghost-link,
          .preview-example-chip { will-change: auto; }
          .range-input {
            height: 24px;
            accent-color: #f7d237;
          }
          .range-input::-webkit-slider-runnable-track {
            height: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,.14);
          }
          .range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 22px;
            height: 22px;
            margin-top: -8px;
            border-radius: 999px;
            background: #f7d237;
            border: 2px solid #fff;
            box-shadow: 0 6px 18px rgba(247,210,55,.28);
          }
          .range-input::-moz-range-track {
            height: 6px;
            border-radius: 999px;
            background: rgba(255,255,255,.14);
          }
          .range-input::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 999px;
            background: #f7d237;
            border: 2px solid #fff;
            box-shadow: 0 6px 18px rgba(247,210,55,.28);
          }
          .stage-rings-grid.compact-metrics-grid {
            grid-template-columns: repeat(2, minmax(0,1fr));
            gap: 8px;
          }
          .stage-ring-label { font-size: 10px; }
          .start-card-inner {
            min-height: 0;
            border-radius: 22px;
            background: transparent;
          }
          .start-card-frame {
            border-radius: 22px;
          }
          .start-card-overlay {
            background: none;
          }
          .analysis-grid,
          .preview-grid,
          .results-grid-2x2,
          .journey-compact,
          .dashboard-grid,
          .input-grid,
          .compact-metrics-grid { width: 100%; max-width: 100%; }
          .cta-card { grid-template-columns: 1fr; gap: 14px; }
          .page-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
