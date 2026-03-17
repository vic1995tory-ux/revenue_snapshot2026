"use client";

import {
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

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

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
                      <div className="bar-chart-value">
                        {fmtMoney(bar.value)}
                      </div>
                    </div>

                    <div className="bar-chart-bar-shell-horizontal">
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
  return (
    <div className="glass-card glare-card snapshot-structure-card">
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
  className = "",
}: {
  tab: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`results-drum-card tilt-card ${className}`}>
      <div className="results-drum-card-inner tilt-inner glare-card">
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
      <div className="start-card-inner start-card-inner-plain tilt-inner premium-glass">
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

function PrettyRing({
  label,
  fact,
  plan,
}: {
  label: string;
  fact: number;
  plan: number;
}) {
  const percent = Math.max(
    0,
    Math.min(100, plan > 0 ? (fact / plan) * 100 : 0)
  );
  const angle = (percent / 100) * 360;

  return (
    <div className="stage-kpi-ring-card pretty-ring-card">
      <div className="stage-kpi-label pretty-ring-label">
        {label} {fact}/{plan}
      </div>

      <div
        className="stage-kpi-ring pretty-ring-shell"
        style={{
          background: `conic-gradient(
            #f7d237 0deg,
            #ffd85f ${Math.max(1, angle * 0.58)}deg,
            #9b6cff ${angle}deg,
            rgba(255,255,255,0.12) ${angle}deg,
            rgba(255,255,255,0.12) 360deg
          )`,
        }}
      >
        <div className="stage-kpi-ring-inner pretty-ring-inner">
          <span>{Math.round(percent)}%</span>
        </div>
      </div>
    </div>
  );
}

function PrettyCompareBar({
  label,
  fact,
  plan,
}: {
  label: string;
  fact: number;
  plan: number;
}) {
  const max = Math.max(fact, plan, 1);
  const factWidth = Math.max(8, (fact / max) * 100);
  const planWidth = Math.max(8, (plan / max) * 100);

  return (
    <div className="stage-compare-block">
      <div className="stage-compare-title">
        {label} {fact}/{plan}
      </div>

      <div className="stage-compare-row">
        <div className="stage-compare-track">
          <div
            className="stage-compare-fill stage-compare-fill-fact"
            style={{ width: `${factWidth}%` }}
          />
        </div>
        <span className="stage-compare-caption">fact</span>
      </div>

      <div className="stage-compare-row">
        <div className="stage-compare-track">
          <div
            className="stage-compare-fill stage-compare-fill-plan"
            style={{ width: `${planWidth}%` }}
          />
        </div>
        <span className="stage-compare-caption">plan</span>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  topTitle,
  topText,
  directionTitle,
  directionText,
  metrics,
  cycle,
}: {
  stage: string;
  topTitle: string;
  topText: string;
  directionTitle: string;
  directionText: string;
  metrics: Array<{
    label: string;
    fact: number;
    plan: number;
  }>;
  cycle: {
    fact: number;
    plan: number;
  };
}) {
  return (
    <div className="stage-card-portrait glare-card">
      <div className="stage-card-portrait-top">
        <div className="stage-card-portrait-stage">
          <span>Stage</span>
          <strong>{stage}</strong>
        </div>

        <div className="stage-card-copy-stack">
          <div className="stage-copy-group">
            <h4>{topTitle}</h4>
            <p>{topText}</p>
          </div>

          <div className="stage-copy-group">
            <h4>{directionTitle}</h4>
            <p>{directionText}</p>
          </div>
        </div>
      </div>

      <div className="stage-card-portrait-bottom">
        <div className="stage-card-bottom-head">fact/plan</div>

        <div className="stage-kpi-grid">
          {metrics.map((item) => (
            <PrettyRing
              key={item.label}
              label={item.label}
              fact={item.fact}
              plan={item.plan}
            />
          ))}
        </div>

        <PrettyCompareBar
          label="deal cycle"
          fact={cycle.fact}
          plan={cycle.plan}
        />
      </div>
    </div>
  );
}

function StageCarousel() {
  const items = [
    {
      stage: "Seed",
      industries: ["industry-saas", "industry-healthtech"],
      topTitle: "Starting Position",
      topText:
        "Клиники готовы тестировать продукт, что подтверждает рыночную потребность, однако цикл сделки остаётся длинным.",
      directionTitle: "Strategic Direction",
      directionText:
        "Разработана гипотеза по внедрению структурированного пилотного формата как основного входного продукта для ускорения продаж.",
      metrics: [
        { label: "leads", fact: 25, plan: 40 },
        { label: "qual leads", fact: 6, plan: 15 },
        { label: "demo", fact: 2, plan: 5 },
        { label: "deals", fact: 1, plan: 2 },
      ],
      cycle: { fact: 5, plan: 3 },
    },
    {
      stage: "Startup",
      industries: ["industry-fintech", "industry-ecom"],
      topTitle: "Starting Position",
      topText:
        "Первые тестовые продажи подтверждают интерес рынка, но система лидогенерации ещё нестабильна и прогнозируемость выручки ограничена.",
      directionTitle: "Strategic Direction",
      directionText:
        "Фокус смещён на формирование повторяемой модели привлечения и укрепление воронки до уровня управляемого спроса.",
      metrics: [
        { label: "leads", fact: 42, plan: 60 },
        { label: "qual leads", fact: 11, plan: 20 },
        { label: "demo", fact: 5, plan: 8 },
        { label: "deals", fact: 2, plan: 4 },
      ],
      cycle: { fact: 4, plan: 3 },
    },
    {
      stage: "Growth",
      industries: [
        "industry-saas",
        "industry-ecom",
        "industry-fintech",
        "industry-edtech",
        "industry-healthtech",
        "industry-b2b",
      ],
      topTitle: "Starting Position",
      topText:
        "Спрос уже подтверждён, но дальнейший рост упирается в структуру продаж, скорость команды и приоритизацию точек масштабирования.",
      directionTitle: "Strategic Direction",
      directionText:
        "Приоритетом становится декомпозиция ограничений в revenue-модели и выбор одного драйвера, способного дать измеримый экономический эффект.",
      metrics: [
        { label: "leads", fact: 68, plan: 90 },
        { label: "qual leads", fact: 21, plan: 30 },
        { label: "demo", fact: 10, plan: 14 },
        { label: "deals", fact: 6, plan: 8 },
      ],
      cycle: { fact: 3, plan: 2 },
    },
    {
      stage: "Expansion",
      industries: ["industry-b2b", "industry-edtech", "industry-ecom"],
      topTitle: "Starting Position",
      topText:
        "Бизнес вышел на устойчивую базу и масштабирование требует уже не отдельных гипотез, а согласованной архитектуры каналов и unit-экономики.",
      directionTitle: "Strategic Direction",
      directionText:
        "Ключевая задача — укрепить управляемость масштабирования, сократить потери на переходе между стадиями воронки и повысить эффективность расширения.",
      metrics: [
        { label: "leads", fact: 120, plan: 150 },
        { label: "qual leads", fact: 36, plan: 50 },
        { label: "demo", fact: 16, plan: 22 },
        { label: "deals", fact: 9, plan: 12 },
      ],
      cycle: { fact: 3, plan: 2 },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndustries = new Set(items[activeIndex].industries);

  return (
    <div className="stage-carousel-flat-wrap">
      <div className="industries-pills industries-pills-carousel">
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-saas")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          SaaS
        </span>
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-ecom")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          E-com
        </span>
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-fintech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          FinTech
        </span>
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-edtech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          EdTech
        </span>
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-healthtech")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          HealthTech
        </span>
        <span
          className={`industry-pill ${
            activeIndustries.has("industry-b2b")
              ? "industry-pill-active"
              : "industry-pill-dim"
          }`}
        >
          B2B
        </span>
      </div>

      <div className="stage-tabs-row">
        {items.map((item, index) => (
          <button
            key={item.stage}
            type="button"
            className={`stage-tab-btn ${
              index === activeIndex ? "stage-tab-btn-active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            {item.stage}
          </button>
        ))}
      </div>

      <div className="stage-card-center">
        <StageCard
          stage={items[activeIndex].stage}
          topTitle={items[activeIndex].topTitle}
          topText={items[activeIndex].topText}
          directionTitle={items[activeIndex].directionTitle}
          directionText={items[activeIndex].directionText}
          metrics={items[activeIndex].metrics}
          cycle={items[activeIndex].cycle}
        />
      </div>
    </div>
  );
}

function GoalsDrumCarousel({
  payUrl,
}: {
  payUrl: string;
}) {
  const items = [
    {
      tab: "ECONOMIC RATE",
      title: "Executive Summary",
      text: "Данные о вашем продукте, его маржинальности и спросе выявляют сильные и слабые стороны бизнеса и определяют главный фокус на данный момент.",
    },
    {
      tab: "GROWTH LIMIT",
      title: "Key Conclusions",
      text: "Ключевые выводы из фактов о компании определяют, как достичь текущей цели бизнеса. Формируется управленческий вывод об экономической модели.",
    },
    {
      tab: "SOLUTION",
      title: "Strategy&Practice",
      text: "Проведённый анализ данных определяет первичную задачу: целью всегда является повышение дохода.",
    },
    {
      tab: "JTBD",
      title: "RoadMap",
      text: "Тезисный план действий на следующие 6 месяцев по запуску конкретного MVP.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % items.length);
    }, 3400);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [items.length]);

  const restart = (index: number) => {
    setActiveIndex(index);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setActiveIndex((v) => (v + 1) % items.length);
    }, 3400);
  };

  return (
    <div className="goals-drum-wrap">
      <div className="goals-drum-tabs">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`goals-drum-tab ${
              index === activeIndex ? "goals-drum-tab-active" : ""
            }`}
            onClick={() => restart(index)}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div className="goals-drum-scene">
        <div
          className="goals-drum"
          style={{
            transform: `rotateY(${-activeIndex * 90}deg)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className="goals-drum-face"
              style={{
                transform: `rotateY(${index * 90}deg) translateZ(300px)`,
              }}
            >
              <ResultDocCard
                tab={item.tab}
                title={item.title}
                text={item.text}
              />
            </div>
          ))}
        </div>

        <a href={payUrl} className="results-center-play" aria-label="Начать">
          <span className="results-center-play-inner">
            <svg
              viewBox="0 0 24 24"
              className="results-center-play-icon"
              aria-hidden="true"
            >
              <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
            </svg>
          </span>
        </a>
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

        const rotateY = (px - 0.5) * 9;
        const rotateX = (0.5 - py) * 9;

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
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
    <main className="relative min-h-screen overflow-hidden bg-[#041027] text-[#fefefe]">
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

              <div className="hero-highlights-row hero-highlights-row-unified glare-card-lite">
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
                  className="ghost-link ghost-link-large ghost-link-dark inline-flex"
                >
                  Побаловаться
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
            <div className="journey-compact-card glare-card">
              <div className="journey-compact-top">
                <div className="journey-compact-badge">1</div>
                <div className="journey-compact-arrow" />
              </div>
              <div className="journey-compact-title">
                Фиксация параметров бизнеса
              </div>
              <div className="journey-compact-text">
                Определяются ключевые показатели текущей модели: экономика,
                структура продаж, ресурсы и ограничения. Это формирует основу
                для дальнейшего анализа.
              </div>
            </div>

            <div className="journey-compact-card glare-card">
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

            <div className="journey-compact-card glare-card">
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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
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

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
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

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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

            <aside className="glass-card glare-card h-fit lg:sticky lg:top-24">
              <div className="reserve-kicker">Оценочный резерв</div>

              <div className="hero-preview-box mt-4 glare-card-lite">
                <div className="reserve-amount">
                  ≈ {fmtMoney(estimatedGap)} / мес
                </div>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  Это только механика. Полный разбор раскрывает реальные
                  возможности при текущей ситуации вашего бизнеса.
                </p>
              </div>

              <div className="side-note-card mt-4 glare-card-lite">
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

              <a
                href={payUrl}
                className="tg-gradient-btn mt-5 block text-center"
              >
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

          <GoalsDrumCarousel payUrl={payUrl} />

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
          <div className="glass-card glare-card cta-card">
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

            <div className="cta-box glare-card-lite">
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
          background: #041027;
        }

        img {
          max-width: 100%;
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
            rgba(247, 210, 55, 0.11) 0%,
            rgba(247, 210, 55, 0.06) 34%,
            rgba(247, 210, 55, 0.015) 60%,
            transparent 78%
          );
          filter: blur(24px);
          opacity: 0.4;
          mix-blend-mode: screen;
          transition: transform 0.08s linear;
        }

        .glass-card {
          position: relative;
          border-radius: 24px;
          padding: 22px;
          overflow: hidden;
          isolation: isolate;
          background: linear-gradient(
            180deg,
            rgba(224, 225, 227, 0.12) 0%,
            rgba(224, 225, 227, 0.08) 100%
          );
          border: 1px solid rgba(200, 200, 200, 0.15);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            0 18px 44px rgba(0, 0, 0, 0.16);
          backdrop-filter: blur(18px) saturate(135%);
          -webkit-backdrop-filter: blur(18px) saturate(135%);
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.75;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.025) 18%,
            rgba(255, 255, 255, 0.01) 34%,
            rgba(255, 255, 255, 0.05) 48%,
            rgba(255, 255, 255, 0.012) 64%,
            rgba(255, 255, 255, 0.06) 82%,
            rgba(255, 255, 255, 0.02) 100%
          );
        }

        .glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.12;
          mix-blend-mode: soft-light;
          background-image:
            radial-gradient(
              circle at 20% 20%,
              rgba(255, 255, 255, 0.22) 0 0.8px,
              transparent 1px
            ),
            radial-gradient(
              circle at 70% 30%,
              rgba(255, 255, 255, 0.16) 0 0.8px,
              transparent 1px
            ),
            radial-gradient(
              circle at 35% 75%,
              rgba(255, 255, 255, 0.18) 0 0.7px,
              transparent 0.9px
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(255, 255, 255, 0.12) 0 0.7px,
              transparent 0.9px
            );
          background-size: 16px 16px, 19px 19px, 15px 15px, 21px 21px;
        }

        .glass-card > * {
          position: relative;
          z-index: 1;
        }

        .soft-glow {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            0 18px 50px rgba(0, 0, 0, 0.18);
        }

        .glare-card::before,
        .glare-card-lite::before {
          content: "";
          position: absolute;
          width: 34%;
          height: 34%;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.11) 0%,
            rgba(255, 255, 255, 0.05) 38%,
            transparent 76%
          );
          filter: blur(34px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.8;
        }

        .glare-card > *,
        .glare-card-lite > * {
          position: relative;
          z-index: 1;
        }

        .premium-glass {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .premium-glass::before {
          content: "";
          position: absolute;
          inset: -20%;
          z-index: 0;
          pointer-events: none;
          opacity: 0.18;
          filter: blur(18px);
          background: repeating-linear-gradient(
            105deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 2px,
            transparent 12px,
            transparent 42px
          );
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
          opacity: 0.95;
          mix-blend-mode: screen;
          background:
            radial-gradient(
              circle at 30% 40%,
              rgba(125, 255, 220, 0.34) 0%,
              transparent 42%
            ),
            radial-gradient(
              circle at 68% 50%,
              rgba(130, 120, 255, 0.32) 0%,
              transparent 44%
            ),
            radial-gradient(
              circle at 48% 44%,
              rgba(255, 255, 255, 0.12) 0%,
              transparent 36%
            );
        }

        .journey-compact-card:nth-child(1)::before,
        .metric-card:nth-child(1)::before,
        .model-card:nth-child(1)::before,
        .slider-card:nth-child(1)::before,
        .hero-chart-box::before,
        .snapshot-structure-card::before,
        .cta-card::before {
          left: 14%;
          top: 10%;
        }

        .journey-compact-card:nth-child(2)::before,
        .metric-card:nth-child(2)::before,
        .model-card:nth-child(2)::before,
        .slider-card:nth-child(2)::before {
          left: 58%;
          top: 16%;
        }

        .journey-compact-card:nth-child(3)::before,
        .metric-card:nth-child(3)::before,
        .model-card:nth-child(3)::before,
        .slider-card:nth-child(3)::before {
          left: 66%;
          top: 42%;
        }

        .hero-preview-box::before,
        .side-note-card::before,
        .cta-box::before {
          left: 22%;
          top: 52%;
        }

        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 50;
          margin: 0 -16px 18px;
          padding: 12px 16px 10px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          background: linear-gradient(
            180deg,
            rgba(4, 16, 39, 0.94),
            rgba(4, 16, 39, 0.7)
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
          flex-wrap: wrap;
          justify-content: flex-end;
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
            rgba(4, 16, 39, 0.24) 0%,
            rgba(4, 16, 39, 0.1) 38%,
            rgba(4, 16, 39, 0.04) 62%,
            rgba(4, 16, 39, 0.08) 100%
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
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.1) 0%,
            rgba(224, 225, 227, 0.07) 50%,
            rgba(224, 225, 227, 0.05) 100%
          );
          backdrop-filter: blur(24px) saturate(135%);
          -webkit-backdrop-filter: blur(24px) saturate(135%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 18px 40px rgba(0, 0, 0, 0.18);
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
          min-width: 0;
        }

        .hero-chart-float {
          position: relative;
          width: min(760px, 100%);
          margin-left: auto;
          padding-top: 8px;
          min-width: 0;
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
          gap: 8px;
          width: 100%;
          padding-bottom: 4px;
        }

        .hero-levers-inline-float {
          margin-bottom: 12px;
          justify-content: flex-end;
        }

        .hero-tag {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: auto;
          min-width: fit-content;
          min-height: 48px;
          padding: 10px 22px;
          border-radius: 999px;
          white-space: nowrap;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.1) 0%,
            rgba(224, 225, 227, 0.065) 48%,
            rgba(224, 225, 227, 0.05) 100%
          );
          backdrop-filter: blur(24px) saturate(145%);
          -webkit-backdrop-filter: blur(24px) saturate(145%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            0 12px 24px rgba(0, 0, 0, 0.18);
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          transition: 0.25s ease;
        }

        .hero-tag::before {
          content: "";
          position: absolute;
          width: 34%;
          height: 60%;
          left: 12%;
          top: 10%;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.04) 38%,
            transparent 76%
          );
          filter: blur(18px);
          pointer-events: none;
        }

        .hero-tag-active {
          color: #0b1d3a;
          background: linear-gradient(
            135deg,
            rgba(247, 210, 55, 0.96) 0%,
            rgba(247, 210, 55, 0.9) 100%
          );
          border-color: rgba(247, 210, 55, 0.55);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.18),
            0 12px 28px rgba(247, 210, 55, 0.2);
        }

        .hero-tag-active::before {
          content: "";
          position: absolute;
          width: 34%;
          height: 60%;
          left: 12%;
          top: 10%;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.07) 38%,
            transparent 76%
          );
          filter: blur(18px);
          pointer-events: none;
        }

        .hero-chart-box {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.09) 0%,
            rgba(224, 225, 227, 0.06) 45%,
            rgba(224, 225, 227, 0.04) 100%
          );
          backdrop-filter: blur(26px) saturate(145%);
          -webkit-backdrop-filter: blur(26px) saturate(145%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            inset 0 -1px 0 rgba(255, 255, 255, 0.05),
            0 18px 50px rgba(0, 0, 0, 0.24);
          min-width: 0;
        }

        .hero-chart-metrics-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }

        .hero-metric-square {
          position: relative;
          min-height: 86px;
          border-radius: 18px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.07) 0%,
            rgba(255, 255, 255, 0.045) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .hero-metric-square span {
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.58);
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
          overflow: hidden;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.03) 100%
          );
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 12px 30px rgba(0, 0, 0, 0.12);
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
          min-width: 0;
        }

        .bar-chart-row-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-width: 0;
        }

        .bar-chart-label {
          font-size: 14px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.82);
          text-align: left;
          line-height: 1.35;
          min-width: 0;
        }

        .bar-chart-value {
          font-size: 14px;
          line-height: 1.3;
          color: rgba(255, 255, 255, 0.76);
          text-align: right;
          white-space: nowrap;
          flex-shrink: 0;
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
            #c4a8ff 0%,
            #8b5cf6 50%,
            #4c1d95 100%
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
          border-radius: 999px;
          padding: 10px 14px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
          line-height: 1.45;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.055);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 10px 24px rgba(0, 0, 0, 0.12);
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
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: 0.2s ease;
        }

        .ghost-link-dark {
          background: rgba(15, 24, 48, 0.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 12px 24px rgba(0, 0, 0, 0.18);
        }

        .ghost-link:hover {
          background: rgba(22, 33, 60, 0.9);
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
          isolation: isolate;
          position: relative;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.08) 0%,
            rgba(224, 225, 227, 0.055) 100%
          );
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          padding: 20px;
          min-height: 230px;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 18px 32px rgba(0, 0, 0, 0.16);
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
          color: rgba(255, 255, 255, 0.7);
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .input-shell {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
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
            rgba(247, 210, 55, 0.42),
            rgba(120, 132, 255, 0.14),
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
            rgba(17, 29, 58, 0.9),
            rgba(24, 39, 72, 0.78)
          );
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 14px 16px;
          border-radius: 18px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          color: white;
          font-size: 20px;
          font-weight: 500;
          width: 100%;
          transition: 0.25s ease;
        }

        .glass-input-primary {
          position: relative;
          z-index: 1;
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.18),
            0 12px 34px rgba(0, 0, 0, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
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
            0 10px 30px rgba(0, 0, 0, 0.12);
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .metric-label,
        .model-label {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.2;
          padding-top: 2px;
        }

        .metric-flag {
          margin-top: 8px;
          flex-shrink: 0;
          border-radius: 9999px;
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.01em;
          border: 1px solid transparent;
          line-height: 1;
          max-width: 100%;
        }

        .metric-delta-top,
        .model-delta-top {
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          padding-top: 2px;
          flex-shrink: 0;
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

        .hero-preview-box,
        .side-note-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.065) 0%,
            rgba(255, 255, 255, 0.035) 100%
          );
          padding: 18px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .reserve-amount {
          font-size: 3rem;
          line-height: 1.02;
          font-weight: 700;
          color: #f7d237;
          text-shadow: 0 0 24px rgba(247, 210, 55, 0.14);
          overflow-wrap: anywhere;
        }

        .accent-word {
          color: #f7d237;
          font-weight: 700;
        }

        .tilt-card {
          perspective: 1400px;
        }

        .tilt-inner {
          transform-style: preserve-3d;
          transition: transform 0.18s ease-out;
          will-change: transform;
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

        .goals-drum-wrap {
          margin-top: 26px;
        }

        .goals-drum-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 18px;
        }

        .goals-drum-tab {
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.74);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          transition: 0.22s ease;
        }

        .goals-drum-tab-active {
          background: #f7d237;
          color: #0b1d3a;
          border-color: rgba(247, 210, 55, 0.48);
          box-shadow:
            0 10px 24px rgba(247, 210, 55, 0.18),
            0 0 22px rgba(247, 210, 55, 0.12);
        }

        .goals-drum-scene {
          position: relative;
          height: 560px;
          perspective: 1800px;
          perspective-origin: center center;
          overflow: hidden;
        }

        .goals-drum {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%);
          transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .goals-drum-face {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 434px;
          height: 224px;
          margin-left: -217px;
          margin-top: -112px;
          transform-style: preserve-3d;
        }

        .results-drum-card {
          width: 100%;
          height: 100%;
        }

        .results-drum-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 28px;
          padding: 22px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.09) 0%,
            rgba(224, 225, 227, 0.06) 100%
          );
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.16),
            0 20px 44px rgba(0, 0, 0, 0.16);
        }

        .result-doc-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
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
          margin-top: 20px;
          font-size: clamp(26px, 2.2vw, 38px);
          line-height: 1.04;
          font-weight: 600;
          color: white;
          letter-spacing: -0.04em;
        }

        .result-doc-text {
          position: relative;
          z-index: 2;
          margin-top: 14px;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
        }

        .results-center-play {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          background: transparent;
          box-shadow: none;
          padding: 0;
          z-index: 40;
        }

        .results-center-play-inner {
          width: 110px;
          height: 110px;
          border-radius: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #47b6f6 0%,
            #7c84ff 46%,
            #c25cf3 100%
          );
          box-shadow:
            0 18px 48px rgba(120, 100, 255, 0.35),
            0 0 80px rgba(120, 100, 255, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .results-center-play:hover .results-center-play-inner {
          transform: scale(1.08);
          box-shadow:
            0 24px 60px rgba(120, 100, 255, 0.45),
            0 0 100px rgba(120, 100, 255, 0.35);
        }

        .results-center-play-icon {
          width: 28px;
          height: 28px;
          color: white;
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

        .industry-pill-dim {
          opacity: 0.22;
          filter: saturate(0.7);
          transform: scale(0.985);
        }

        .industry-pill-active {
          opacity: 1;
          filter: saturate(1);
          transform: scale(1);
          box-shadow:
            0 0 0 1px rgba(247, 210, 55, 0.2),
            0 12px 28px rgba(247, 210, 55, 0.18),
            0 0 24px rgba(247, 210, 55, 0.14);
        }

        .industries-pills-carousel {
          justify-content: center;
          margin-bottom: 22px;
        }

        .stage-carousel-flat-wrap {
          margin-top: 24px;
        }

        .stage-tabs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 22px;
        }

        .stage-tab-btn {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.72);
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          transition: 0.22s ease;
        }

        .stage-tab-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .stage-tab-btn-active {
          background: #f7d237;
          color: #0b1d3a;
          border-color: rgba(247, 210, 55, 0.46);
          box-shadow:
            0 10px 24px rgba(247, 210, 55, 0.16),
            0 0 18px rgba(247, 210, 55, 0.12);
        }

        .stage-card-center {
          display: flex;
          justify-content: center;
        }

        .stage-card-portrait {
          width: min(504px, 100%);
          aspect-ratio: 4 / 5;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            0 24px 54px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          background: #081536;
          display: grid;
          grid-template-rows: 58% 42%;
        }

        .stage-card-portrait-top {
          position: relative;
          padding: 22px 20px 18px;
          background: linear-gradient(
            135deg,
            rgba(224, 225, 227, 0.7) 0%,
            rgba(145, 154, 179, 0.7) 45%,
            rgba(70, 86, 126, 0.7) 100%
          );
          backdrop-filter: blur(18px) saturate(120%);
          -webkit-backdrop-filter: blur(18px) saturate(120%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .stage-card-portrait-top::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.03) 22%,
            rgba(255, 255, 255, 0.01) 52%,
            rgba(255, 255, 255, 0.08) 100%
          );
          pointer-events: none;
        }

        .stage-card-portrait-top > * {
          position: relative;
          z-index: 1;
        }

        .stage-card-portrait-stage {
          position: absolute;
          top: 20px;
          right: 20px;
          text-align: right;
        }

        .stage-card-portrait-stage span {
          display: block;
          font-size: 12px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.88);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .stage-card-portrait-stage strong {
          display: block;
          margin-top: 8px;
          font-size: clamp(40px, 5vw, 66px);
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: -0.08em;
          font-weight: 700;
        }

        .stage-card-copy-stack {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 18px;
          padding-right: 144px;
          padding-top: 84px;
        }

        .stage-copy-group h4 {
          margin: 0;
          font-size: 20px;
          line-height: 1.08;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.98);
          letter-spacing: -0.03em;
        }

        .stage-copy-group p {
          margin: 8px 0 0;
          font-size: 14px;
          line-height: 1.58;
          color: rgba(255, 255, 255, 0.92);
        }

        .stage-card-portrait-bottom {
          position: relative;
          padding: 18px 18px 18px;
          background:
            radial-gradient(
              circle at 18% 82%,
              rgba(31, 94, 255, 0.38) 0%,
              transparent 28%
            ),
            radial-gradient(
              circle at 72% 32%,
              rgba(255, 166, 120, 0.34) 0%,
              transparent 30%
            ),
            radial-gradient(
              circle at 82% 78%,
              rgba(199, 78, 255, 0.28) 0%,
              transparent 24%
            ),
            linear-gradient(
              135deg,
              #051884 0%,
              #0a1763 22%,
              #241385 52%,
              #7139a2 100%
            );
          opacity: 1;
        }

        .stage-card-bottom-head {
          position: absolute;
          top: 16px;
          right: 18px;
          font-size: clamp(22px, 3vw, 38px);
          line-height: 0.95;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.98);
          letter-spacing: -0.06em;
        }

        .stage-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 16px;
          width: 52%;
          padding-top: 12px;
        }

        .stage-kpi-ring-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stage-kpi-label {
          font-size: 12px;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.96);
        }

        .pretty-ring-shell {
          width: 72px;
          height: 72px;
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.18),
            0 0 20px rgba(139, 92, 246, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .pretty-ring-inner {
          width: 48px;
          height: 48px;
          background: rgba(9, 22, 70, 0.84);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .stage-kpi-ring-inner span {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .stage-compare-block {
          position: absolute;
          right: 18px;
          bottom: 18px;
          width: 44%;
        }

        .stage-compare-title {
          margin-bottom: 10px;
          font-size: 13px;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.96);
        }

        .stage-compare-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
        }

        .stage-compare-row + .stage-compare-row {
          margin-top: 12px;
        }

        .stage-compare-track {
          height: 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .stage-compare-fill {
          height: 100%;
          border-radius: 999px;
        }

        .stage-compare-fill-fact {
          background: linear-gradient(
            90deg,
            #f7d237 0%,
            #ffd85f 56%,
            #ffb347 100%
          );
          box-shadow: 0 0 18px rgba(247, 210, 55, 0.18);
        }

        .stage-compare-fill-plan {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(220, 214, 235, 0.86) 100%
          );
        }

        .stage-compare-caption {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.72);
          min-width: 28px;
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
            135deg,
            rgba(224, 225, 227, 0.08) 0%,
            rgba(224, 225, 227, 0.05) 100%
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

        .analysis-right-card-plain {
          background: transparent;
          backdrop-filter: none;
          border: 0;
          box-shadow: none;
          padding: 0;
        }

        .start-cards-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
          margin-top: 0;
        }

        .start-card-inner {
          position: relative;
          border-radius: 0;
          overflow: visible;
          box-shadow: none;
          background: transparent;
          min-height: auto;
        }

        .start-card-inner-plain {
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .start-card-frame {
          position: relative;
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          object-position: center;
        }

        .start-card-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .start-card-overlay-plain {
          background: none;
        }

        .start-card-price-float {
          position: absolute;
          top: 18.33%;
          right: 6.02%;
          font-size: 42px;
          line-height: 1;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);
          white-space: nowrap;
        }

        .start-card-btn-row {
          position: absolute;
          left: 4.54%;
          bottom: 23.06%;
        }

        .start-card-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          color: #fff;
          font-weight: 700;
          text-decoration: none;
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
          transition: transform 0.2s ease, filter 0.2s ease;
          pointer-events: auto;
        }

        .start-card-btn::before {
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

        .start-card-btn > * {
          position: relative;
          z-index: 1;
        }

        .start-card-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }

        .start-card-btn-floating {
          min-width: 0;
          padding: 12px 20px;
          font-size: 14px;
          line-height: 1;
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
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.035) 100%
          );
          padding: 22px;
        }

        .line-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
            rgba(255, 255, 255, 0.04) 1px,
            transparent 1px
          );
          background-size: 100% 76px;
          opacity: 0.16;
          pointer-events: none;
        }

        .aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.44;
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
            rgba(106, 160, 255, 0.16),
            rgba(106, 160, 255, 0.06) 42%,
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
            rgba(247, 210, 55, 0.11),
            rgba(247, 210, 55, 0.035) 42%,
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
            rgba(124, 132, 255, 0.12),
            rgba(124, 132, 255, 0.04) 44%,
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
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.02) 38%,
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
            rgba(0, 0, 0, 0.22) 100%
          );
        }

        @keyframes premiumGlassShift {
          0% {
            transform: translate3d(-12px, 0, 0);
          }
          50% {
            transform: translate3d(14px, -6px, 0);
          }
          100% {
            transform: translate3d(-12px, 0, 0);
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

          .goals-drum-face {
            width: 404px;
            height: 208px;
            margin-left: -202px;
            margin-top: -104px;
          }

          .goals-drum-face {
            transform-style: preserve-3d;
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

          .goals-drum-scene {
            height: 500px;
          }

          .goals-drum-face {
            width: 380px;
            height: 194px;
            margin-left: -190px;
            margin-top: -97px;
          }

          .results-center-play-inner {
            width: 96px;
            height: 96px;
            border-radius: 24px;
          }

          .stage-card-portrait {
            width: min(430px, 100%);
            border-radius: 28px;
          }

          .stage-card-copy-stack {
            padding-right: 124px;
            padding-top: 72px;
          }

          .stage-card-portrait-stage strong {
            font-size: 54px;
          }

          .stage-copy-group h4 {
            font-size: 18px;
          }

          .stage-copy-group p {
            font-size: 13px;
          }

          .pretty-ring-shell {
            width: 64px;
            height: 64px;
          }

          .pretty-ring-inner {
            width: 42px;
            height: 42px;
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

          .header-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }

          .logo-main {
            width: 150px;
            height: 42px;
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
            padding: 10px 14px;
            font-size: 12px;
            margin-left: auto;
          }

          .hero-main-title {
            font-size: 52px;
          }

          .hero-main-subtitle {
            font-size: 28px;
          }

          .hero-main-copy,
          .section-copy {
            font-size: 17px;
            line-height: 1.65;
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

          .hero-highlight-chip:not(:last-child)::after {
            display: none;
          }

          .hero-chart-metrics-row,
          .input-grid,
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .hero-levers-inline-float {
            justify-content: flex-start;
          }

          .hero-chart-float-title {
            text-align: left;
            font-size: 24px;
            padding-right: 0;
          }

          .hero-tag {
            font-size: 11px;
            min-height: 42px;
            padding: 10px 16px;
          }

          .bar-chart-wrap {
            padding: 48px 14px 14px;
          }

          .bar-chart-columns {
            gap: 10px;
          }

          .bar-chart-row-top {
            gap: 8px;
            align-items: flex-start;
            flex-direction: column;
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
            font-size: 2.2rem;
          }

          .metric-main-value {
            font-size: 1.85rem;
            white-space: normal;
          }

          .model-main-value {
            font-size: 1.2rem;
            white-space: normal;
          }

          .preview-actions-inline {
            gap: 10px;
            flex-wrap: wrap;
            justify-content: flex-start;
          }

          .industry-pill {
            min-height: 44px;
            padding: 0 14px;
            font-size: 14px;
          }

          .industries-pills-carousel {
            justify-content: flex-start;
          }

          .goals-drum-tabs {
            justify-content: flex-start;
          }

          .goals-drum-scene {
            height: 380px;
            overflow: visible;
          }

          .goals-drum {
            transform: none !important;
            position: static;
            width: 100%;
            height: auto;
          }

          .goals-drum-face {
            position: relative;
            left: auto;
            top: auto;
            margin: 0 auto;
            width: 100%;
            max-width: 305px;
            height: 172px;
            transform: none !important;
          }

          .goals-drum-face:not(:first-child) {
            display: none;
          }

          .results-center-play {
            position: relative;
            left: auto;
            top: auto;
            transform: none;
            margin: 18px auto 0;
          }

          .results-center-play-inner {
            width: 82px;
            height: 82px;
            border-radius: 20px;
          }

          .results-center-play-icon {
            width: 22px;
            height: 22px;
          }

          .result-doc-title {
            font-size: 24px;
          }

          .result-doc-text {
            font-size: 13px;
            line-height: 1.55;
          }

          .stage-tabs-row {
            justify-content: flex-start;
          }

          .stage-card-portrait {
            width: min(352px, 100%);
            aspect-ratio: auto;
            min-height: 448px;
            grid-template-rows: auto auto;
            border-radius: 24px;
          }

          .stage-card-portrait-top {
            padding: 16px 14px 16px;
          }

          .stage-card-portrait-stage {
            position: static;
            text-align: left;
            margin-bottom: 14px;
          }

          .stage-card-portrait-stage strong {
            font-size: 38px;
          }

          .stage-card-copy-stack {
            padding-right: 0;
            padding-top: 0;
            gap: 14px;
          }

          .stage-copy-group h4 {
            font-size: 16px;
          }

          .stage-copy-group p {
            font-size: 12px;
            line-height: 1.52;
          }

          .stage-card-portrait-bottom {
            padding: 16px 14px 16px;
          }

          .stage-card-bottom-head {
            position: static;
            margin-bottom: 14px;
            font-size: 28px;
          }

          .stage-kpi-grid {
            width: 100%;
            gap: 12px 12px;
            padding-top: 0;
          }

          .pretty-ring-shell {
            width: 58px;
            height: 58px;
          }

          .pretty-ring-inner {
            width: 38px;
            height: 38px;
          }

          .stage-kpi-ring-inner span {
            font-size: 11px;
          }

          .stage-compare-block {
            position: static;
            width: 100%;
            margin-top: 18px;
          }

          .builder-block-3 {
            min-height: 110px;
            padding-left: 0;
            font-size: 46px;
            justify-content: center;
          }

          .builder-block-1,
          .builder-block-2,
          .builder-block-5 {
            min-height: 66px;
            font-size: 20px;
          }

          .builder-block-4 {
            font-size: 28px;
            min-height: 88px;
          }

          .start-card-inner,
          .start-card-overlay {
            min-height: 190px;
          }

          .start-card-price-float {
            font-size: 30px;
          }

          .cta-box {
            min-width: 0;
            max-width: none;
            width: 100%;
          }

          .hero-chart-bottom {
            grid-template-columns: 1fr;
          }

          .hero-money-card strong {
            white-space: normal;
          }

          .hero-active-note {
            border-radius: 18px;
            display: flex;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 18px 14px 18px;
            border-radius: 28px;
          }

          .hero-main-title {
            font-size: 42px;
            line-height: 0.92;
          }

          .hero-main-subtitle {
            margin-top: 14px;
            font-size: 22px;
          }

          .hero-main-copy {
            margin-top: 18px;
            font-size: 15px;
          }

          .hero-actions {
            gap: 10px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-copy {
            font-size: 15px;
          }

          .journey-compact-title {
            font-size: 20px;
          }

          .journey-compact-text {
            font-size: 14px;
            line-height: 1.65;
          }

          .glass-input {
            font-size: 18px;
            padding: 13px 14px;
          }

          .metric-delta-top,
          .model-delta-top {
            font-size: 16px;
          }

          .metric-label,
          .model-label {
            font-size: 14px;
          }

          .metric-flag {
            font-size: 10px;
            padding: 5px 8px;
          }

          .reserve-amount {
            font-size: 1.9rem;
          }

          .results-roadmap-note {
            font-size: 15px;
            line-height: 1.7;
          }

          .analysis-left-title {
            font-size: 18px;
          }

          .snapshot-builder-copy {
            font-size: 14px;
            line-height: 1.6;
          }

          .start-card-price-float {
            font-size: 24px;
          }

          .start-card-btn-floating {
            padding: 10px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}
