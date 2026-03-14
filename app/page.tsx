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
      key: "positioning",
      label: "#Позиционирование",
      full: "Позиционирование",
      deltaLabel: "+рост спроса и конверсии",
      leads: 10,
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
      label: "#УправлениеРасходами",
      full: "Управление расходами",
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
                const height = Math.max(16, (bar.value / maxBar) * 130);

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
