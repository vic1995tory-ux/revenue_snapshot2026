"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const [activeIndex, setActiveIndex] = useState(3);
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
        <div className="hero-chart-float-title">Drivers</div>

        <div className="hero-levers-inline hero-levers-inline-float">
          {drivers.map((item, index) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveIndex(index)}
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

function AttentionIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.25 18 16.1a1.2 1.2 0 0 1-1.04 1.8H3.04A1.2 1.2 0 0 1 2 16.1l8-13.85Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7v4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="10" cy="14.25" r="0.95" fill="currentColor" />
    </svg>
  );
}

function ChipIcon({ kind }: { kind: "team" | "chat" | "solo" | "online" | "custom" | "rate" | "swot" | "segment" | "practice" | "jtbd" | "brief" }) {
  if (kind === "team") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13.2" cy="7.6" r="1.8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.8 14c.7-2.1 2.3-3.2 4.7-3.2 2.4 0 4 1.1 4.7 3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "chat") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5.6A2.6 2.6 0 0 1 6.6 3h6.8A2.6 2.6 0 0 1 16 5.6v4.1a2.6 2.6 0 0 1-2.6 2.6H9l-3.3 2.7v-2.7H6.6A2.6 2.6 0 0 1 4 9.7V5.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "solo") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="6.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.4 15c.75-2.25 2.28-3.37 4.6-3.37 2.33 0 3.86 1.12 4.6 3.37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "online") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7.1 16h5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "rate") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 14.8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 12.5V9.2M10 12.5V6.3M14 12.5V7.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "swot") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="13" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 3.8v12.4M3.8 10h12.4" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    );
  }
  if (kind === "segment") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 10V3.5A6.5 6.5 0 1 1 3.5 10H10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11.2 3.7a6.35 6.35 0 0 1 5.1 5.1h-5.1V3.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "practice") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M5 10.4 8.1 13.5 15 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "jtbd") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M4 5.5h12M4 10h8M4 14.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "brief") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M6 4.5h8a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 15V6A1.5 1.5 0 0 1 6 4.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 8h6M7 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.2 8 14l8-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagList({
  items,
  variant = "soft",
  icon = "custom",
}: {
  items: string[];
  variant?: "soft" | "yellow" | "icon-solid";
  icon?: React.ComponentProps<typeof ChipIcon>["kind"];
}) {
  return (
    <div className={`tariff-tag-list tariff-tag-list-${variant}`}>
      {items.map((item) => (
        <div key={item} className={`tariff-tag tariff-tag-${variant}`}>
          <span className="tariff-tag-icon"><ChipIcon kind={icon} /></span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}


function TariffColumn({
  title,
  sections,
  disclaimer,
}: {
  title: string;
  sections: Array<{
    label: string;
    items?: string[];
    notes?: string[];
    render?: "list" | "tags" | "icon-tags" | "yellow-tags";
    iconKind?: React.ComponentProps<typeof ChipIcon>["kind"];
  }>;
  disclaimer?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];

  return (
    <article className="tariff-column">
      <div className="tariff-column-head">
        <div className="tariff-column-title">{title}</div>
        {disclaimer?.length ? (
          <button
            type="button"
            className="tariff-attention"
            aria-label="Show disclaimer"
            aria-expanded={open}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen((v) => !v)}
          >
            <AttentionIcon />
            <span className="tariff-attention-label">disclaimer</span>
            <span className={`tariff-disclaimer-pop ${open ? "is-open" : ""}`}>
              {disclaimer.map((note) => (
                <span key={note} className="tariff-disclaimer-line">{note}</span>
              ))}
            </span>
          </button>
        ) : null}
      </div>

      <div className="tariff-panel-layout">
        <div className="tariff-panel-nav" role="tablist" aria-label={`${title} sections`}>
          {sections.map((section, index) => (
            <button
              key={section.label}
              type="button"
              role="tab"
              aria-selected={activeSectionIndex === index}
              className={`tariff-panel-tab ${activeSectionIndex === index ? "is-active" : ""}`}
              onClick={() => setActiveSectionIndex(index)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="tariff-panel-content" role="tabpanel">
          <div className="tariff-panel-content-title">{activeSection.label}</div>

          {activeSection.items?.length ? (
            activeSection.render === "tags" ? (
              <TagList items={activeSection.items} variant="soft" icon={activeSection.iconKind ?? "custom"} />
            ) : activeSection.render === "icon-tags" ? (
              <TagList items={activeSection.items} variant="icon-solid" icon={activeSection.iconKind ?? "custom"} />
            ) : activeSection.render === "yellow-tags" ? (
              <TagList items={activeSection.items} variant="yellow" icon={activeSection.iconKind ?? "custom"} />
            ) : (
              <div className="tariff-check-list tariff-check-list-panel">
                {activeSection.items.map((item) => (
                  <div key={item} className="tariff-check-item">
                    <span className="tariff-check-mark"><ChipIcon kind={activeSection.iconKind ?? "custom"} /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )
          ) : null}

          {activeSection.notes?.length ? (
            <div className="tariff-note-list tariff-note-list-panel">
              {activeSection.notes.map((note) => (
                <div key={note} className="tariff-note-item">
                  <span className="tariff-note-bullet">•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}


function TariffDetailsComparison() {
  const playgroundDisclaimer = [
    "Инструмент не заменяет глубокую операционную работу.",
    "Рекомендации требуют адаптации под конкретный бизнес.",
  ];

  const onRecDisclaimer = [
    "Результат формируется на основе совместной работы и предоставленной информации.",
    "Выводы учитывают контекст, но не заменяют полную трансформацию бизнеса.",
    "Рекомендации требуют внедрения и управленческих решений.",
  ];

  const playgroundSections = [
    {
      label: "Input Data",
      render: "tags" as const,
      iconKind: "custom" as const,
      items: [
        "Сбор данных",
        "Позиционирование",
        "Экономика бизнеса",
        "Клиенты и поток",
        "Продукт и продажи",
        "Структура и процессы",
        "Аналитика и управление",
        "Стратегия",
      ],
    },
    {
      label: "Format",
      render: "icon-tags" as const,
      iconKind: "solo" as const,
      items: ["Самостоятельное прохождение", "Онлайн-интерфейс", "Личный кабинет на 365 дней"],
    },
    {
      label: "Economic model",
      iconKind: "rate" as const,
      items: [
        "Сборка модели на основе введенных данных",
        "Оценка текущей эффективности",
        "Выявление возможных точек потерь",
      ],
    },
    {
      label: "Leverages",
      iconKind: "rate" as const,
      items: [
        "Определение потенциальных драйверов роста",
        "Приоритизация по предполагаемому влиянию",
        "Связка с текущей бизнес-моделью",
      ],
    },
    {
      label: "Final Results",
      render: "yellow-tags" as const,
      iconKind: "jtbd" as const,
      items: [
        "Economic Rate",
        "Growth Limit",
        "Solution",
        "JTBD",
      ],
      notes: [
        "Оценка модели на основе вводных.",
        "Главный фактор, сдерживающий рост.",
        "Приоритетные рычаги роста и логика изменений.",
      ],
    },
    {
      label: "Decompose",
      iconKind: "chat" as const,
      items: [
        "Онлайн-встреча 60 минут",
        "Обсуждение результатов и допущений",
        "Пояснение логики выводов",
        "Ответы на вопросы",
      ],
    },
  ];

  const onRecSections = [
    {
      label: "Input Data",
      render: "tags" as const,
      iconKind: "custom" as const,
      items: [
        "Персональный сбор данных",
        "Позиционирование",
        "Экономика бизнеса",
        "Клиенты и поток",
        "Продукт и продажи",
        "Структура и процессы",
        "Аналитика и управление",
        "Стратегия",
      ],
    },
    {
      label: "Format",
      render: "icon-tags" as const,
      iconKind: "team" as const,
      items: ["Работа с участием команды", "Онлайн-коммуникация", "Индивидуальная проработка"],
    },
    {
      label: "Economic model",
      iconKind: "rate" as const,
      items: [
        "Сборка модели на основе интервью и уточнений",
        "Углубленная оценка эффективности",
        "Выявление точек потерь с учетом контекста",
      ],
    },
    {
      label: "Leverages",
      iconKind: "rate" as const,
      items: [
        "Определение ключевых драйверов роста",
        "Приоритизация с учетом реальной операционной ситуации",
        "Связка с текущими ограничениями бизнеса",
      ],
    },
    {
      label: "Final Results",
      render: "yellow-tags" as const,
      iconKind: "swot" as const,
      items: [
        "Economic Rate",
        "Growth Limit",
        "Solution",
        "JTBD",
        "SWOT-анализ",
        "Сегментация и позиционирование",
        "Best practices",
      ],
      notes: [
        "Результат собирается командой самостоятельно на основе брифа и уточнений.",
        "Дополнительно включаются SWOT-анализ, сегментация и позиционирование под сегменты.",
      ],
    },
    {
      label: "Decompose",
      iconKind: "chat" as const,
      items: [
        "Связь во время подготовки результата",
        "Дополнительные уточнения в процессе",
        "Разбор выводов и логики решений",
        "Ответы на вопросы команды клиента",
      ],
    },
  ];

  return (
    <div className="tariff-comparison-grid">
      <TariffColumn
        title="ONLINE PLAYGROUND"
        sections={playgroundSections}
        disclaimer={playgroundDisclaimer}
      />
      <TariffColumn
        title="ON REC"
        sections={onRecSections}
        disclaimer={onRecDisclaimer}
      />
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

type OverlayBox = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
};

type PaymentState = "idle" | "waiting" | "success" | "timeout";

function StartCard({
  title,
  icon,
  mobileIcon,
  price,
  href,
  priceDesktop,
  priceMobile,
  buttonDesktop,
  buttonMobile,
  onPay,
}: {
  title: string;
  icon: string;
  mobileIcon?: string;
  price: string;
  href: string;
  priceDesktop: OverlayBox;
  priceMobile?: OverlayBox;
  buttonDesktop: OverlayBox;
  buttonMobile?: OverlayBox;
  onPay?: (url: string) => void;
  stats?: Array<{ label: string; value: string }>;
}) {
  const ctaLabel = title === "On Rec" ? "Оплатить" : "Оплатить";

  const styleVars = {
    ["--price-top" as any]: priceDesktop.top ?? "auto",
    ["--price-right" as any]: priceDesktop.right ?? "auto",
    ["--price-bottom" as any]: priceDesktop.bottom ?? "auto",
    ["--price-left" as any]: priceDesktop.left ?? "auto",
    ["--button-top" as any]: buttonDesktop.top ?? "auto",
    ["--button-right" as any]: buttonDesktop.right ?? "auto",
    ["--button-bottom" as any]: buttonDesktop.bottom ?? "auto",
    ["--button-left" as any]: buttonDesktop.left ?? "auto",
    ["--button-width" as any]: buttonDesktop.width ?? "auto",
    ["--price-top-mobile" as any]: priceMobile?.top ?? priceDesktop.top ?? "auto",
    ["--price-right-mobile" as any]: priceMobile?.right ?? priceDesktop.right ?? "auto",
    ["--price-bottom-mobile" as any]: priceMobile?.bottom ?? priceDesktop.bottom ?? "auto",
    ["--price-left-mobile" as any]: priceMobile?.left ?? priceDesktop.left ?? "auto",
    ["--button-top-mobile" as any]: buttonMobile?.top ?? buttonDesktop.top ?? "auto",
    ["--button-right-mobile" as any]: buttonMobile?.right ?? buttonDesktop.right ?? "auto",
    ["--button-bottom-mobile" as any]: buttonMobile?.bottom ?? buttonDesktop.bottom ?? "auto",
    ["--button-left-mobile" as any]: buttonMobile?.left ?? buttonDesktop.left ?? "auto",
    ["--button-width-mobile" as any]: buttonMobile?.width ?? buttonDesktop.width ?? "auto",
  } as CSSProperties;

  return (
    <div className="start-card tilt-card" style={styleVars}>
      <div className="start-card-inner start-card-inner-plain tilt-inner premium-glass">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileIcon ?? icon} />
          <img src={icon} alt={title} className="start-card-frame" />
        </picture>
        <div className="start-card-overlay start-card-overlay-plain">
          <div className="start-card-bottom-simple">
            <div className="start-card-price-float">{price}</div>
            <a
              href={href}
              className="start-card-btn start-card-btn-floating"
              onClick={(e) => {
                if (!onPay) return;
                e.preventDefault();
                onPay(href);
              }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

type StageItem = {
  niche: string;
  stage: string;
  summary: string;
  focus: string;
  metrics: Array<{ label: string; value: string }>;
  bars: Array<{ label: string; fact: number; plan: number }>;
};


function StageCarousel() {
  const items = [
    {
      niche: "SaaS",
      stage: "Early Stage",
      lever: "Сборка первой устойчивой модели",
      roadmap: "Сначала фиксируется факт экономики, затем приоритет и короткий RoadMap по усилению.",
      zones: ["Leads", "Qual Leads"],
      result: ["Cycle", "Payback"],
    },
    {
      niche: "HealthTech",
      stage: "Growth",
      lever: "Ускорение сделки без давления на маржу",
      roadmap: "Snapshot собирает логику роста, выделяет ограничение и дает последовательность решений.",
      zones: ["Sales", "Retention"],
      result: ["CAC", "Margin"],
    },
    {
      niche: "B2B",
      stage: "Startup",
      lever: "Сокращение ручного управления ростом",
      roadmap: "Результат показывает, где теряется скорость роста и какой сценарий дает наибольший эффект.",
      zones: ["Pipeline", "Offer"],
      result: ["Cycle", "Profit"],
    },
    {
      niche: "FinTech",
      stage: "Growth",
      lever: "Пересборка экономики привлечения",
      roadmap: "Фокус смещается на каналы, payback и точку, которая реально тормозит масштабирование.",
      zones: ["CAC", "Quality"],
      result: ["Payback", "Scale"],
    },
    {
      niche: "EdTech",
      stage: "Expansion",
      lever: "Рост без потери качества экономики",
      roadmap: "Система показывает, как сохранить маржу и где нужна смена приоритета роста.",
      zones: ["Offer", "Retention"],
      result: ["Margin", "Load"],
    },
    {
      niche: "E-com",
      stage: "Expansion",
      lever: "Усиление прибыльности через модель",
      roadmap: "Snapshot отделяет видимый рост от полезного роста и расставляет экономические приоритеты.",
      zones: ["AOV", "Costs"],
      result: ["Profit", "Structure"],
    },
  ];

  const visibleCount = 3;
  const extendedItems = [...items, ...items.slice(0, visibleCount)];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (activeIndex >= items.length) {
      setActiveIndex(activeIndex % items.length);
    }
  };

  return (
    <div className="stage-scheme-wrap">
      <div className="stage-scheme-nav">
        <button
          type="button"
          className="stage-scheme-arrow"
          onClick={goToPrev}
          aria-label="Предыдущая карточка"
        >
          ←
        </button>
        <button
          type="button"
          className="stage-scheme-arrow"
          onClick={goToNext}
          aria-label="Следующая карточка"
        >
          →
        </button>
      </div>

      <div className="stage-scheme-viewport">
        <div
          className={`stage-scheme-track ${!isAnimating && activeIndex >= items.length ? "is-resetting" : ""}`}
          style={{ transform: `translate3d(-${activeIndex * (100 / visibleCount)}%, 0, 0)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, i) => (
            <div key={`${item.niche}-${i}`} className="stage-scheme-slide">
              <article className="stage-scheme-card">
                <div className="stage-scheme-kicker">Ниша</div>
                <div className="stage-scheme-title">{item.niche}</div>
                <div className="stage-scheme-stage">{item.stage}</div>

                <div className="stage-scheme-lever-label">Выявленный рычаг</div>
                <div className="stage-scheme-lever">{item.lever}</div>
                <p className="stage-scheme-roadmap">{item.roadmap}</p>

                <div className="stage-scheme-bottom">
                  <div className="stage-scheme-group">
                    <div className="stage-scheme-label">зоны влияния</div>
                    <div className="stage-scheme-tags">
                      {item.zones.map((tag) => (
                        <span key={tag} className="stage-scheme-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="stage-scheme-group">
                    <div className="stage-scheme-label">результат</div>
                    <div className="stage-scheme-tags">
                      {item.result.map((tag) => (
                        <span key={tag} className="stage-scheme-tag stage-scheme-tag-result">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const journeySectionRef = useRef<HTMLElement | null>(null);
  const [journeyActiveIndex, setJourneyActiveIndex] = useState(0);
  const journeySteps: Array<{
    number: string;
    title: string;
    text: string;
    linkLabel?: string;
    linkHref?: string;
  }> = [
    {
      number: "01",
      title: "Выбор формата",
      text: "Online Playground — самостоятельный формат. On Rec — формат с участием команды.",
      linkLabel: "Начать",
      linkHref: "#tariffs",
    },
    {
      number: "02",
      title: "Сбор данных",
      text: "Фиксируем экономику, клиентов, продукт, процессы и стратегию бизнеса.",
    },
    {
      number: "03",
      title: "Генерация результата",
      text: "Система собирает Revenue Snapshot и формирует единую аналитическую модель.",
    },
    {
      number: "04",
      title: "Изучение текущих возможностей",
      text: "Показываем точки потерь, ограничение роста и главный рычаг усиления.",
    },
    {
      number: "05",
      title: "60-минутная декомпозиция",
      text: "Результат можно разобрать с C-level специалистами по маркетингу и продажам.",
    },
    {
      number: "06",
      title: "Личный кабинет и бонусы",
      text: "3 запуска, разные бизнесы, интерактивные результаты, PDF и спецусловия на новые инструменты.",
    },
  ];
  const payUrl = "https://www.paypal.com/ncp/payment/J573NHRDCJQZC";
  const onRecUrl = "https://www.paypal.com/ncp/payment/GQLFG3CYUHM82";
  const loginUrl = "https://revenue-snapshot2026.vercel.app/cabinet-login";
  const tgContactUrl = "https://t.me/growth_avenue_company";
  const waContactUrl = "https://wa.me/995555163833";
  const router = useRouter();
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [paymentStartedAt, setPaymentStartedAt] = useState<number | null>(null);

  const faqItems = [
    {
      q: "Что такое Revenue Snapshot?",
      a: `Revenue Snapshot — это результат стратегической диагностики экономики бизнеса.

Он показывает:
• где теряется выручка
• какое ограничение сдерживает рост
• какой рычаг даст наибольший экономический эффект
• какие направления изменений приоритетны сейчас`,
    },
    {
      q: "Что я получу в итоге?",
      a: `Вы получаете структурированный аналитический результат, который включает:
• экономическую картину бизнеса
• точки потерь и ограничения роста
• приоритетные рычаги роста
• направления действий и логику изменений`,
    },
    {
      q: "Чем Online Playground отличается от On Rec?",
      a: `Разница не в результате, а в формате прохождения.

Online Playground:
• вы проходите диагностику самостоятельно
• система собирает результат на основе ваших ответов
• подходит для быстрого самостоятельного прохождения

On Rec:
• диагностика проходит с участием команды
• данные собираются и уточняются вместе с нами
• в процессе возможны дополнительные вопросы
• результат дополняется более глубокой проработкой контекста`,
    },
    {
      q: "Что происходит после оплаты?",
      a: `После оплаты вы переходите к следующему этапу:
• завершаете регистрацию
• получаете доступ к личному кабинету
• выбираете момент для прохождения
• затем получаете Revenue Snapshot в выбранном формате`,
    },
    {
      q: "На основании чего строится результат?",
      a: `Результат формируется на основе сочетания:
• экономических моделей и формул
• структурированной логики интерпретации бизнес-данных
• AI-модуля, который выявляет зависимости, ограничения и точки роста

AI не придумывает выводы произвольно — он работает в рамках заданной логики анализа.`,
    },
    {
      q: "Насколько точным будет результат?",
      a: `Точность результата зависит от качества и полноты исходных данных.

Чем точнее вводные, тем точнее выводы, приоритизация и рекомендации.`,
    },
    {
      q: "Какие данные нужны для прохождения?",
      a: `Минимально потребуется:
• выручка за последний период
• количество клиентов или продаж
• средний чек
• общее понимание структуры расходов
• понимание каналов привлечения клиентов

Дополнительные данные повышают точность результата, но не являются обязательными на старте.`,
    },
    {
      q: "Нужно ли готовиться заранее?",
      a: `Нет, специальная подготовка не требуется.

Вы можете пройти диагностику постепенно и вернуться к заполнению позже, если часть данных нужно уточнить.`,
    },
    {
      q: "Что будет, если я укажу данные примерно?",
      a: `Результат сохранит аналитическую логику, но станет менее точным в деталях.

Вы всё равно увидите ключевые зависимости и направления усиления модели.`,
    },
    {
      q: "Это предварительная оценка или полноценная замена консультации?",
      a: `Revenue Snapshot закрывает задачу диагностики и определения ключевых решений без классического консультационного процесса.

То есть в части диагностики это полноценный продукт, а не просто предварительная оценка.`,
    },
    {
      q: "Это про выручку или про прибыль?",
      a: `Анализ строится через выручку, затраты, ограничения и операционную модель бизнеса.

Но конечная цель Revenue Snapshot — не просто рост оборота, а усиление прибыльности бизнеса.`,
    },
    {
      q: "Что такое основной рычаг роста?",
      a: `Это фактор, изменение которого даст наибольший экономический эффект при текущей модели бизнеса.

Он определяется через анализ ограничений, влияния параметров на экономику и потенциала изменения.`,
    },
    {
      q: "Сколько раз можно воспользоваться Revenue Snapshot?",
      a: `В рамках текущего доступа доступно 3 полноценных результата.

Все результаты сохраняются в личном кабинете и остаются доступными для повторного просмотра.`,
    },
    {
      q: "Сохраняются ли мои данные?",
      a: `Да, данные сохраняются исключительно для формирования и предоставления результата.

Они не используются публично или в кейсах без вашего предварительного согласия.`,
    },
  ];


  const handlePay = (paypalUrl: string) => {
    window.open(paypalUrl, "_blank", "noopener,noreferrer");
    setPaymentState("waiting");
    setPaymentStartedAt(Date.now());
  };

  const handlePaymentSuccess = (delay = 1500) => {
    setPaymentState("success");
    window.setTimeout(() => {
      router.push("/thank-you");
    }, delay);
  };

  const checkPayment = () => {
    const flag = localStorage.getItem("rs_payment_completed");

    if (flag) {
      handlePaymentSuccess(1000);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!faqOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFaqOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [faqOpen]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "rs_payment_completed" && e.newValue) {
        handlePaymentSuccess(1500);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [router]);

  useEffect(() => {
    if (paymentState !== "waiting") return;

    const timer = window.setTimeout(() => {
      setPaymentState("timeout");
    }, 4 * 60 * 1000);

    return () => window.clearTimeout(timer);
  }, [paymentState]);

  useEffect(() => {
    const handleJourneyScroll = () => {
      const section = journeySectionRef.current;
      if (!section || window.innerWidth <= 1180) {
        setJourneyActiveIndex(0);
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionHeight = Math.max(section.offsetHeight - window.innerHeight, 1);
      const rawProgress = (window.innerHeight * 0.2 - rect.top) / sectionHeight;
      const progress = Math.min(Math.max(rawProgress, 0), 0.9999);
      const nextIndex = Math.min(
        journeySteps.length - 1,
        Math.floor(progress * journeySteps.length)
      );

      setJourneyActiveIndex(nextIndex);
    };

    handleJourneyScroll();
    window.addEventListener("scroll", handleJourneyScroll, { passive: true });
    window.addEventListener("resize", handleJourneyScroll);

    return () => {
      window.removeEventListener("scroll", handleJourneyScroll);
      window.removeEventListener("resize", handleJourneyScroll);
    };
  }, [journeySteps.length]);

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
            <button
              type="button"
              className="header-faq-btn"
              onClick={() => {
                setFaqOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              FAQ
            </button>
            <a href={loginUrl} className="header-login-btn" onClick={() => setMobileMenuOpen(false)}>Profile</a>
            <a href="#tariffs" className="tg-gradient-btn header-cta" onClick={() => setMobileMenuOpen(false)}>Начать</a>
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
                Revenue Snapshot — это данные, которые отвечают на острые вопросы бизнеса.
                Не общие выводы, а конкретные расчёты и приоритеты.
              </div>

              <p className="hero-main-copy">
                Система фиксирует ограничения роста, показывает точки потерь и
                собирает управленческую последовательность решений на основе экономики бизнеса.
              </p>

              <div className="hero-highlights-row hero-highlights-row-unified glare-card-lite">
                <div className="hero-highlight-chip">ECONOMIC RATE</div>
                <div className="hero-highlight-chip">GROWTH LIMIT</div>
                <div className="hero-highlight-chip">SOLUTION</div>
                <div className="hero-highlight-chip">JTBD</div>
              </div>

              <div className="hero-actions-row">
                <a href="#tariffs" className="tg-gradient-btn inline-flex">Начать</a>
                <a href="#preview" className="ghost-link ghost-link-dark inline-flex">Попробовать демо</a>
              </div>
            </div>

            <HeroEconomyChart />
          </div>
        </section>

        <section id="how-it-works" className="mb-16 journey-scroll-shell" ref={journeySectionRef}>
          <div className="journey-scroll-sticky">
            <div className="section-head">
              <div className="section-kicker">Как это работает</div>
              <h2 className="section-title">Путь от базовых параметров к полной картине экономики бизнеса</h2>
              <p className="section-copy">
                Revenue Snapshot показывает путь клиента: от выбора формата прохождения до доступа к результатам и возможностям личного кабинета.
              </p>
            </div>

            <div className="journey-scroll-grid">
              {journeySteps.map((step, index) => (
                <article
                  key={step.number}
                  className={`journey-stage-card ${index <= journeyActiveIndex ? "is-active" : "is-muted"}`}
                >
                  <div className="journey-stage-number">{step.number}</div>
                  <div className="journey-stage-title">{step.title}</div>
                  <div className="journey-stage-text">{step.text}</div>
                  {step.linkHref ? (
                    <a href={step.linkHref} className="journey-stage-link">
                      {step.linkLabel}
                    </a>
                  ) : null}
                </article>
              ))}
            </div>

            <div className="journey-progress-wrap" aria-hidden="true">
              <div
                className="journey-progress-fill"
                style={{ width: `${((journeyActiveIndex + 1) / journeySteps.length) * 100}%` }}
              />
              <div className="journey-progress-dots">
                {journeySteps.map((step, index) => (
                  <span
                    key={step.number}
                    className={`journey-progress-dot ${index <= journeyActiveIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
            </div>

            <div className="journey-demo-bridge">
              <div className="journey-demo-copy">
                Чтобы понять логику модели до полного анализа — попробуйте упрощённую демо-версию ниже.
              </div>
              <a href="#preview" className="ghost-link ghost-link-dark inline-flex">Попробовать демо</a>
            </div>
          </div>
        </section>

        <section id="preview" className="mb-16">
          <div className="section-head">
            <div className="section-kicker">Интерактивное превью</div>
            <h2 className="section-title">Посмотрите, как меняется экономика при разных сценариях
</h2>
            <p className="section-copy">
Это предварительная симуляция логики бизнеса.
Она помогает увидеть, какие параметры сильнее всего влияют на результат, но не заменяет полный анализ.
Полный Snapshot показывает, где именно находится ваше ограничение роста, почему оно возникает и какой шаг даст наибольший экономический эффект.
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

              <button type="button" className="tg-gradient-btn mt-5 block w-full text-center" onClick={() => handlePay(payUrl)}>Попробовать Snapshot</button>
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
            <button type="button" className="result-doc-start-btn results-start-btn" onClick={() => handlePay(payUrl)}>Начать</button>
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
          <div id="tariffs" />
          <div className="section-head">
            <div className="section-kicker">Как проходит анализ</div>
            <h2 className="section-title analysis-section-title">С чего начать?</h2>
            <p className="section-copy">
              Вам предоставляется <span className="accent-word">Личный кабинет на 365 дней</span>, где хранятся ваши результаты, и будут добавляться <span className="accent-word">инструменты по спец условиям</span>
            </p>
          </div>

          <div className="analysis-single-column">
            <div className="analysis-right-card analysis-right-card-plain analysis-right-card-full">
              <div className="start-cards-row start-cards-row-horizontal">
                <StartCard
                  title="Online-playground"
                  icon="/online_playground_desc.svg"
                  mobileIcon="/online-playground_mobile.svg"
                  price="$114"
                  href={payUrl}
                  priceDesktop={{ top: "18%", right: "6.6%" }}
                  priceMobile={{ top: "18.5%", right: "8.5%" }}
                  buttonDesktop={{ left: "5.8%", bottom: "24.6%", width: "35%" }}
                  buttonMobile={{ left: "6.4%", bottom: "11.2%", width: "48%" }}
                  onPay={handlePay}
                />
                <StartCard
                  title="On Rec"
                  icon="/onrec_desc.svg"
                  mobileIcon="/on-rec_mobile.svg"
                  price="$770"
                  href={onRecUrl}
      priceDesktop={{ top: "18%", right: "6.6%" }}
                  priceMobile={{ top: "18.5%", right: "8.5%" }}
                  buttonDesktop={{ left: "5.8%", bottom: "24.6%", width: "35%" }}
                  buttonMobile={{ left: "6.4%", bottom: "11.2%", width: "48%" }}
                  onPay={handlePay}
                />
              </div>
              <TariffDetailsComparison />
            </div>
          </div>
        </section>

        <section id="try" className="pb-8">
          <div className="glass-card glare-card cta-card cta-card-single">
            <div>
              <div className="section-kicker">CTA</div>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Revenue Snapshot – платформа детальной диагностики бизнеса</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                После оплаты пользователь попадает внутрь нашей платформы, проходит диагностику и получает структурированный результат с финансовой логикой, проблемными зонами и главным направлением усиления.
              </p>
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


      {paymentState !== "idle" && (
        <div className="payment-overlay-root" role="dialog" aria-modal="true" aria-label="Ожидание оплаты">
          <div className="payment-overlay-backdrop" />
          <div className="payment-overlay-card">
            <div className="payment-overlay-status-row">
              <div className={`payment-status-pill ${paymentState === "success" ? "is-success" : paymentState === "timeout" ? "is-timeout" : "is-waiting"}`}>
                <span className="payment-status-dot" />
                <span>
                  {paymentState === "success"
                    ? "Подтверждено"
                    : paymentState === "timeout"
                      ? "Ожидание истекло"
                      : "Ожидание"}
                </span>
              </div>
            </div>

            {paymentState === "waiting" && (
              <>
                <h2 className="payment-overlay-title">Открыто окно оплаты</h2>
                <p className="payment-overlay-copy">
                  Завершите оплату в новой вкладке. После этого вы автоматически продолжите.
                </p>
                <div className="payment-overlay-note">
                  Ожидаем подтверждение оплаты… Это занимает обычно до 10–30 секунд.
                  {paymentStartedAt ? "" : ""}
                </div>
                <div className="payment-overlay-actions">
                  <button type="button" className="payment-overlay-btn payment-overlay-btn-primary" onClick={checkPayment}>
                    Я уже оплатил
                  </button>
                  <button type="button" className="payment-overlay-btn payment-overlay-btn-secondary" onClick={() => setPaymentState("idle")}>
                    Отменить
                  </button>
                </div>
              </>
            )}

            {paymentState === "success" && (
              <>
                <h2 className="payment-overlay-title">Оплата подтверждена</h2>
                <p className="payment-overlay-copy">Перенаправляем...</p>
              </>
            )}

            {paymentState === "timeout" && (
              <>
                <h2 className="payment-overlay-title">Время ожидания истекло</h2>
                <p className="payment-overlay-copy">
                  Если оплата уже завершена, нажмите «Я уже оплатил». Иначе вернитесь и попробуйте снова.
                </p>
                <div className="payment-overlay-actions">
                  <button type="button" className="payment-overlay-btn payment-overlay-btn-primary" onClick={checkPayment}>
                    Я уже оплатил
                  </button>
                  <button type="button" className="payment-overlay-btn payment-overlay-btn-secondary" onClick={() => setPaymentState("idle")}>
                    Отменить
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {faqOpen && (
        <div className="faq-modal-root" role="dialog" aria-modal="true" aria-label="FAQ">
          <button
            type="button"
            className="faq-backdrop"
            aria-label="Закрыть FAQ"
            onClick={() => setFaqOpen(false)}
          />
          <div className="faq-modal-card">
            <div className="faq-modal-head">
              <div>
                <div className="faq-modal-kicker">FAQ</div>
                <h3 className="faq-modal-title">Частые вопросы</h3>
              </div>
              <button type="button" className="faq-close-btn" onClick={() => setFaqOpen(false)}>
                ✕
              </button>
            </div>

            <div className="faq-modal-list">
              {faqItems.map((item) => (
                <div key={item.q} className="faq-item">
                  <div className="faq-item-q">{item.q}</div>
                  <div className="faq-item-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
          animation: none;
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
        .header-faq-btn,
        .header-login-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          padding: 0 16px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }
        .header-faq-btn { cursor: pointer; }
        .header-faq-btn:hover,
        .header-login-btn:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,.09);
        }
        .faq-modal-root {
          position: fixed;
          inset: 0;
          z-index: 120;
          display: grid;
          place-items: center;
          padding: 20px;
        }
        .faq-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(3,10,22,.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 0;
          cursor: pointer;
        }
        .faq-modal-card {
          position: relative;
          z-index: 1;
          width: min(760px, 100%);
          max-height: min(82vh, 860px);
          overflow: auto;
          border-radius: 28px;
          padding: 24px;
          background: linear-gradient(180deg, rgba(16,27,49,.92), rgba(11,20,38,.88));
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 30px 80px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .faq-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 18px;
        }
        .faq-modal-kicker {
          color: #f7d237;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .faq-modal-title {
          margin: 8px 0 0;
          font-size: clamp(28px, 4vw, 42px);
          line-height: .95;
          letter-spacing: -.05em;
          font-weight: 700;
        }
        .faq-close-btn {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
          color: #fff;
          cursor: pointer;
          font-size: 18px;
          line-height: 1;
        }
        .faq-modal-list { display: grid; gap: 12px; }
        .faq-item {
          border-radius: 20px;
          padding: 16px 18px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
        }
        .faq-item-q { font-size: 16px; font-weight: 700; color: #fff; }
        .faq-item-a {
          margin-top: 8px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.55;
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
          animation: none;
        }
        .tg-gradient-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.22) 25%, transparent 50%);
          transform: translateX(-130%);
          animation: none;
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
          animation: none;
          flex-shrink: 0;
        }
        .hero-money-card-muted {
          border: 1px solid rgba(200,200,200,.16) !important;
          background: rgba(10,18,36,.58) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.06);
        }
        .journey-scroll-shell {
          position: relative;
          min-height: 250vh;
        }
        .journey-scroll-sticky {
          position: sticky;
          top: 92px;
          padding-bottom: 12px;
          overflow: hidden;
        }
        .journey-scroll-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0;
          margin-top: 18px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .journey-stage-card {
          position: relative;
          min-height: 252px;
          padding: 16px 24px 24px;
          border-left: 1px solid rgba(255,255,255,.08);
          border-top: 1px solid rgba(255,255,255,.08);
          transition: opacity .38s ease, filter .38s ease, transform .38s ease;
        }
        .journey-stage-card:nth-child(-n+3) {
          border-top: none;
        }
        .journey-stage-card:nth-child(3n+1) {
          border-left: none;
        }
        .journey-stage-card.is-muted {
          opacity: .24;
          filter: blur(8px);
          transform: translateY(10px);
        }
        .journey-stage-card.is-active {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }
        .journey-stage-number {
          color: rgba(255,255,255,.72);
          font-size: clamp(34px, 2.8vw, 56px);
          line-height: .9;
          letter-spacing: -.05em;
          font-weight: 500;
        }
        .journey-stage-title {
          margin-top: 52px;
          color: #ffffff;
          font-size: clamp(20px, 2vw, 34px);
          line-height: .96;
          letter-spacing: -.05em;
          font-weight: 600;
          max-width: 260px;
        }
        .journey-stage-text {
          margin-top: 14px;
          max-width: 286px;
          color: rgba(255,255,255,.68);
          font-size: 15px;
          line-height: 1.5;
        }
        .journey-stage-link {
          display: inline-flex;
          align-items: center;
          margin-top: 16px;
          color: #f7d237;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
        }
        .journey-progress-wrap {
          position: relative;
          height: 26px;
          margin-top: -2px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .journey-progress-wrap::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 11px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
        }
        .journey-progress-fill {
          position: absolute;
          left: 0;
          top: 11px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(130,120,255,.95), rgba(188,125,255,.95));
          box-shadow: 0 0 26px rgba(130,120,255,.5);
          transition: width .32s ease;
        }
        .journey-progress-dots {
          position: relative;
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          height: 100%;
        }
        .journey-progress-dot {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #3f325f;
          border: 3px solid #6e5fa2;
          justify-self: center;
          align-self: center;
          box-shadow: 0 0 0 6px rgba(111,96,166,.08);
          transition: background .24s ease, border-color .24s ease, box-shadow .24s ease;
        }
        .journey-progress-dot.is-active {
          background: #8d79e6;
          border-color: #5e4f98;
          box-shadow: 0 0 0 6px rgba(141,121,230,.18);
        }
        .journey-demo-bridge {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 18px;
          padding: 0 2px;
        }
        .journey-demo-copy {
          max-width: 760px;
          color: rgba(255,255,255,.68);
          font-size: 16px;
          line-height: 1.45;
        }
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
          animation: none;
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
        .industry-pill-selected { box-shadow: 0 0 0 2px rgba(247,210,55,.18), 0 14px 30px rgba(247,210,55,.16); }
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
          border: 1px solid rgba(255,255,255,.11); background: linear-gradient(180deg, rgba(16,27,49,.46) 0%, rgba(11,20,38,.34) 100%);
          backdrop-filter: blur(68px) saturate(155%);
          -webkit-backdrop-filter: blur(68px) saturate(155%);
          box-shadow: 0 24px 54px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.06);
        }
        .stage-card-analytics.is-front {
          background: linear-gradient(180deg, rgba(16,27,49,.72) 0%, rgba(11,20,38,.58) 100%);
          border-color: rgba(255,255,255,.18);
          box-shadow: 0 30px 70px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.1);
        }
        .stage-card-analytics.is-front .stage-card-top-panel {
          background: linear-gradient(135deg, rgba(255,255,255,.11) 0%, rgba(255,255,255,.05) 100%);
        }
        .stage-carousel-item.is-industry-match {
          opacity: 1 !important;
        }
        .stage-carousel-item.is-industry-match .stage-card-analytics {
          border-color: rgba(247,210,55,.22);
          box-shadow: 0 24px 60px rgba(247,210,55,.08), 0 24px 54px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .stage-carousel-item.is-industry-dim {
          opacity: .2 !important;
        }
        .stage-carousel-mobile-slide.is-industry-match .stage-card-analytics {
          border-color: rgba(247,210,55,.22);
          box-shadow: 0 24px 60px rgba(247,210,55,.08), 0 24px 54px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .stage-carousel-mobile-slide.is-industry-dim {
          opacity: .48;
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
        .stage-lite-wrap {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .stage-lite-card {
          border-radius: 30px;
          padding: 24px;
          background: linear-gradient(180deg, rgba(16,27,49,.58), rgba(11,20,38,.42));
          border: 1px solid rgba(255,255,255,.12);
          transition: opacity .3s ease, transform .3s ease;
        }
        .stage-lite-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .stage-lite-kicker {
          color: rgba(255,255,255,.56);
          font-size: 12px;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .stage-lite-title {
          margin: 8px 0 0;
          font-size: clamp(44px, 5vw, 64px);
          line-height: .95;
          letter-spacing: -.05em;
        }
        .stage-lite-stage-chip {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          margin-top: 14px;
          padding: 0 14px;
          border-radius: 999px;
          background: rgba(247,210,55,.12);
          border: 1px solid rgba(247,210,55,.24);
          color: #f7d237;
          font-size: 12px;
          font-weight: 700;
        }
        .stage-lite-nav {
          display: flex;
          gap: 10px;
        }
        .stage-lite-arrow {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.05);
          color: #fff;
        }
        .stage-lite-copy-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 16px;
          margin-top: 22px;
        }
        .stage-lite-copy-card {
          border-radius: 22px;
          padding: 18px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
        }
        .stage-lite-copy-title {
          margin-bottom: 8px;
          font-size: 20px;
          line-height: 1;
          font-weight: 700;
        }
        .stage-lite-copy-card p {
          margin: 0;
          color: rgba(255,255,255,.74);
          font-size: 15px;
          line-height: 1.55;
        }
        .stage-lite-bottom {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 18px;
          margin-top: 18px;
        }
        .stage-lite-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 12px;
        }
        .stage-lite-metric {
          border-radius: 18px;
          padding: 14px;
          background: rgba(255,255,255,.055);
          border: 1px solid rgba(255,255,255,.08);
        }
        .stage-lite-metric-label {
          color: rgba(255,255,255,.56);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .stage-lite-metric-value {
          margin-top: 8px;
          font-size: 24px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -.04em;
        }
        .stage-lite-bars-title {
          font-size: 24px;
          line-height: 1;
          letter-spacing: -.05em;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .stage-lite-bar-group + .stage-lite-bar-group {
          margin-top: 12px;
        }
        .stage-lite-bar-label {
          margin-bottom: 8px;
          color: rgba(255,255,255,.56);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .stage-lite-bar-track {
          height: 16px;
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          overflow: hidden;
        }
        .stage-lite-bar-track-thin {
          height: 10px;
          margin-top: 8px;
        }
        .stage-lite-bar-fill {
          height: 100%;
          border-radius: inherit;
        }
        .stage-lite-bar-fill-fact {
          background: linear-gradient(90deg, rgba(247,210,55,.96), rgba(255,231,138,.96));
        }
        .stage-lite-bar-fill-plan {
          background: linear-gradient(90deg, rgba(130,120,255,.76), rgba(172,183,255,.82));
        }

        .stage-scheme-wrap {
          position: relative;
          border-radius: 0;
          padding: 0;
          background: transparent;
          border: none;
          overflow: visible;
        }
        .stage-scheme-nav {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 16px;
        }
        .stage-scheme-arrow {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.05);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .stage-scheme-arrow:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.18);
        }
        .stage-scheme-viewport {
          overflow: hidden;
        }
        .stage-scheme-track {
          display: flex;
          width: 100%;
          transition: transform .72s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .stage-scheme-track.is-resetting {
          transition: none;
        }
        .stage-scheme-slide {
          flex: 0 0 33.333333%;
          min-width: 33.333333%;
        }
        .stage-scheme-card {
          position: relative;
          padding: 18px 20px 20px;
          border-top: 1px solid rgba(255,255,255,.08);
          border-left: 1px solid rgba(255,255,255,.08);
          background:
            radial-gradient(circle at 30% 20%, rgba(130,120,255,.10), transparent 34%),
            linear-gradient(180deg, rgba(16,27,49,.38), rgba(11,20,38,.18));
          transition: opacity .32s ease, filter .32s ease, transform .32s ease;
        }
        .stage-scheme-card:first-child {
          border-left: none;
        }
        .stage-scheme-kicker {
          color: rgba(255,255,255,.56);
          font-size: 12px;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .stage-scheme-title {
          margin-top: 10px;
          font-size: clamp(34px, 4vw, 54px);
          line-height: .94;
          letter-spacing: -.05em;
          font-weight: 600;
        }
        .stage-scheme-stage {
          margin-top: 8px;
          color: rgba(255,255,255,.72);
          font-size: 18px;
          line-height: 1.15;
          letter-spacing: -.03em;
        }
        .stage-scheme-lever-label {
          margin-top: 18px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.15;
          letter-spacing: -.02em;
          font-weight: 500;
        }
        .stage-scheme-lever {
          margin-top: 6px;
          color: #ffffff;
          font-size: 22px;
          line-height: 1.05;
          letter-spacing: -.03em;
          font-weight: 600;
          max-width: 320px;
        }
        .stage-scheme-roadmap {
          margin: 6px 0 0;
          max-width: 300px;
          color: rgba(255,255,255,.72);
          font-size: 14px;
          line-height: 1.5;
        }
        .stage-scheme-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 26px;
          align-items: end;
        }
        .stage-scheme-label {
          margin-bottom: 8px;
          color: rgba(255,255,255,.82);
          font-size: 13px;
          letter-spacing: .08em;
          text-transform: lowercase;
        }
        .stage-scheme-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .stage-scheme-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          min-width: 86px;
          padding: 0 14px;
          border-radius: 10px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.10);
          color: rgba(255,255,255,.88);
          font-size: 13px;
          font-weight: 600;
        }
        .stage-scheme-tag-result {
          background: rgba(247,210,55,.16);
          border-color: rgba(247,210,55,.24);
          color: #fff2b2;
        }

        .analysis-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .analysis-single-column {
          display: block;
        }
        .analysis-left-title { margin: 0; font-size: clamp(30px, 2.8vw, 44px); line-height: .98; letter-spacing: -.05em; font-weight: 700; max-width: 680px; }
        .snapshot-builder-copy { margin: 14px 0 18px; max-width: 680px; color: rgba(255,255,255,.7); font-size: 16px; line-height: 1.58; }
        .analysis-right-card-plain {
          min-height: 100%;
          height: auto;
          overflow: visible;
          max-width: none;
        }
        .analysis-right-card-full {
          width: 100%;
        }
        .start-cards-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
          align-items: start;
        }
        .start-cards-row-top {
          margin-bottom: 0;
        }
        .start-cards-row-horizontal {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          align-items: start;
        }
        .start-card {
          flex: 1 1 0;
          position: relative;
          z-index: 2;
        }
        .start-card-inner {
          position: relative;
          border-radius: 32px;
          overflow: visible;
          border: none;
          background: transparent;
          transform-style: preserve-3d;
          transition: transform .18s ease-out;
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
          border-radius: 32px;
          display: block;
          position: relative;
          z-index: 2;
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
          top: var(--price-top, auto);
          right: var(--price-right, auto);
          bottom: var(--price-bottom, auto);
          left: var(--price-left, auto);
          font-size: clamp(52px, 4.3vw, 92px);
          line-height: .92;
          letter-spacing: -.06em;
          font-weight: 700;
          text-shadow: 0 10px 28px rgba(0,0,0,.22);
        }
        .start-card-btn {
          position: absolute;
          top: var(--button-top, auto);
          right: var(--button-right, auto);
          bottom: var(--button-bottom, auto);
          left: var(--button-left, auto);
          width: var(--button-width, auto);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          text-decoration: none;
          color: #ffffff;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.16);
          background: linear-gradient(90deg, #47b6f6 0%, #5da7ff 22%, #7c84ff 48%, #9c6dff 72%, #c25cf3 100%);
          background-size: 220% 220%;
          box-shadow: 0 10px 30px rgba(71,96,255,.22), inset 0 1px 0 rgba(255,255,255,.18);
          animation: none;
          pointer-events: auto;
          white-space: nowrap;
        }
        .tariff-comparison-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
          margin-top: 20px;
          align-items: start;
        }
        .tariff-column {
          position: relative;
          border-radius: 28px;
          padding: 20px 18px;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.025));
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 18px 42px rgba(0,0,0,.14);
          backdrop-filter: blur(28px) saturate(135%);
          -webkit-backdrop-filter: blur(28px) saturate(135%);
        }
        .tariff-column-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        .tariff-column-title {
          color: #f7d237;
          font-size: 18px;
          line-height: 1;
          letter-spacing: -.03em;
          font-weight: 800;
        }
        .tariff-attention {
          position: relative;
          flex: none;
          min-height: 34px;
          padding: 0 12px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(247,210,55,.35);
          background: rgba(247,210,55,.08);
          color: #f7d237;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .tariff-attention svg { width: 16px; height: 16px; }
        .tariff-attention-label {
          margin-left: 6px;
          font-size: 11px;
          line-height: 1;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .tariff-disclaimer-pop {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: min(280px, 72vw);
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(7,15,32,.97);
          border: 1px solid rgba(247,210,55,.24);
          box-shadow: 0 18px 34px rgba(0,0,0,.38);
          color: rgba(255,255,255,.84);
          font-size: 12px;
          line-height: 1.5;
          text-align: left;
          opacity: 0;
          visibility: hidden;
          transform: translateY(6px);
          transition: .18s ease;
          z-index: 20;
          pointer-events: none;
        }
        .tariff-disclaimer-pop.is-open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .tariff-disclaimer-line { display: block; }
        .tariff-disclaimer-line + .tariff-disclaimer-line { margin-top: 6px; }
        .tariff-column-sections {
          display: grid;
          gap: 18px;
        }
        .tariff-section {
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,.08);
        }
        .tariff-section:first-child {
          padding-top: 0;
          border-top: none;
        }
        .tariff-section-label {
          margin-bottom: 12px;
          color: #ffffff;
          font-size: 16px;
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: -.01em;
        }
        .tariff-check-list,
        .tariff-note-list {
          display: grid;
          gap: 8px;
        }
        .tariff-check-item,
        .tariff-note-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 12px;
          align-items: start;
          color: rgba(255,255,255,.8);
          font-size: 14px;
          line-height: 1.55;
        }
        .tariff-check-mark {
          color: #f7d237;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .tariff-check-mark svg,
        .tariff-tag-icon svg { width: 16px; height: 16px; }
        .tariff-note-bullet {
          color: rgba(255,255,255,.56);
          line-height: 1.2;
        }
        .tariff-tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tariff-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          padding: 8px 13px;
          border-radius: 999px;
          font-size: 13px;
          line-height: 1.3;
        }
        .tariff-tag-icon {
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }
        .tariff-tag-soft {
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.82);
        }
        .tariff-tag-soft .tariff-tag-icon { color: #f7d237; }
        .tariff-tag-icon-solid {
          background: rgba(247,210,55,.08);
          border: 1px solid rgba(247,210,55,.22);
          color: #fff4bf;
        }
        .tariff-tag-icon-solid .tariff-tag-icon { color: #f7d237; }
        .tariff-tag-yellow {
          background: rgba(247,210,55,.96);
          border: 1px solid rgba(247,210,55,1);
          color: #1a2133;
          font-weight: 600;
        }
        .tariff-tag-yellow .tariff-tag-icon { color: #1a2133; }

        .tariff-panel-layout {
          display: grid;
          grid-template-columns: 224px minmax(0, 1fr);
          gap: 28px;
          align-items: stretch;
          min-height: 520px;
        }
        .tariff-panel-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 2px 0;
        }
        .tariff-panel-tab {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          min-height: 46px;
          width: fit-content;
          max-width: 100%;
          padding: 0 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(224,225,227,.92);
          color: #25314e;
          font-size: 13px;
          line-height: 1.15;
          font-weight: 500;
          letter-spacing: .02em;
          transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s ease, box-shadow .2s ease;
          text-align: left;
        }
        .tariff-panel-tab:hover {
          transform: translateY(-1px);
        }
        .tariff-panel-tab.is-active {
          background: linear-gradient(135deg, rgba(247,210,55,.98), rgba(247,210,55,.9));
          border-color: rgba(247,210,55,.3);
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(247,210,55,.12);
        }
        .tariff-panel-content {
          min-width: 0;
          border-left: 1px solid rgba(255,255,255,.12);
          padding: 2px 0 2px 28px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 18px;
        }
        .tariff-panel-content-title {
          color: #ffffff;
          font-size: clamp(22px, 2vw, 30px);
          line-height: 1.16;
          letter-spacing: .01em;
          font-weight: 500;
          max-width: 520px;
          white-space: pre-line;
        }
        .tariff-check-list-panel,
        .tariff-note-list-panel {
          max-width: 760px;
        }
        .tariff-panel-content .tariff-check-list {
          gap: 14px;
        }
        .tariff-panel-content .tariff-check-item,
        .tariff-panel-content .tariff-note-item {
          font-size: 15px;
          line-height: 1.65;
        }
        .tariff-panel-content .tariff-tag-list {
          gap: 12px;
        }
        .tariff-panel-content .tariff-tag {
          min-height: 40px;
          padding: 9px 15px;
          font-size: 13px;
        }

        .cta-card {
          display: grid;
          grid-template-columns: minmax(0,1fr);
          gap: 18px;
          align-items: center;
        }
        .cta-card-single {
          padding-right: 28px;
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

        .payment-overlay-root {
          position: fixed;
          inset: 0;
          z-index: 140;
          display: grid;
          place-items: center;
          padding: 20px;
        }
        .payment-overlay-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(3,10,22,.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .payment-overlay-card {
          position: relative;
          z-index: 1;
          width: min(560px, 100%);
          border-radius: 28px;
          padding: 24px;
          background: linear-gradient(180deg, rgba(16,27,49,.94), rgba(11,20,38,.92));
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: 0 30px 80px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .payment-overlay-status-row {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 18px;
        }
        .payment-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.84);
        }
        .payment-status-pill.is-waiting {
          border-color: rgba(247,210,55,.26);
          background: rgba(247,210,55,.1);
          color: #fff2b2;
        }
        .payment-status-pill.is-success {
          border-color: rgba(110,231,183,.24);
          background: rgba(16,185,129,.12);
          color: #bbf7d0;
        }
        .payment-status-pill.is-timeout {
          border-color: rgba(251,113,133,.24);
          background: rgba(244,63,94,.12);
          color: #fecdd3;
        }
        .payment-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: currentColor;
          box-shadow: 0 0 14px currentColor;
          flex: none;
        }
        .payment-overlay-title {
          margin: 0;
          font-size: clamp(28px, 4vw, 42px);
          line-height: .98;
          letter-spacing: -.05em;
          font-weight: 700;
          color: #fff;
        }
        .payment-overlay-copy {
          margin-top: 12px;
          color: rgba(255,255,255,.76);
          font-size: 16px;
          line-height: 1.55;
        }
        .payment-overlay-note {
          margin-top: 16px;
          border-radius: 18px;
          padding: 14px 16px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08);
          color: rgba(255,255,255,.68);
          font-size: 14px;
          line-height: 1.5;
        }
        .payment-overlay-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .payment-overlay-btn {
          min-height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .payment-overlay-btn:hover {
          transform: translateY(-1px);
        }
        .payment-overlay-btn-primary {
          border: 1px solid rgba(255,255,255,.16);
          color: #ffffff;
          background: linear-gradient(90deg, #47b6f6 0%, #5da7ff 22%, #7c84ff 48%, #9c6dff 72%, #c25cf3 100%);
          background-size: 220% 220%;
          box-shadow: 0 10px 30px rgba(71,96,255,.22), inset 0 1px 0 rgba(255,255,255,.18);
          animation: none;
        }
        .payment-overlay-btn-secondary {
          color: #ffffff;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }
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
          .preview-grid,.cta-card,.hero-grid-frame { grid-template-columns: 1fr; }
          .hero-chart-float { display: none; }
          .stage-scheme-grid { grid-template-columns: 1fr; }
          .stage-scheme-card { border-left: none; }
          .stage-scheme-card + .stage-scheme-card { border-top: 1px solid rgba(255,255,255,.08); }
          .stage-scheme-bottom { grid-template-columns: 1fr; }
          .start-cards-row-horizontal { grid-template-columns: 1fr; }
          .preview-side { position: static; }
          .journey-compact,.results-grid-2x2,.tariff-comparison-grid { grid-template-columns: 1fr; }
          .journey-scroll-grid { grid-template-columns: 1fr; }
          .journey-stage-card { min-height: 0; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,.08); }
          .journey-stage-card:last-child { border-bottom: none; }
          .stage-lite-copy-grid, .stage-lite-bottom { grid-template-columns: 1fr; }
          .journey-scroll-shell {
            min-height: auto;
          }
          .journey-scroll-sticky {
            position: static;
          }
          .journey-scroll-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            border-bottom: none;
          }
          .journey-stage-card {
            min-height: 0;
            padding: 20px 18px 20px;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 24px;
            background: linear-gradient(180deg, rgba(224,225,227,.09), rgba(224,225,227,.05));
            opacity: 1 !important;
            filter: none !important;
            transform: none !important;
          }
          .journey-stage-card:first-child {
            border-left: 1px solid rgba(255,255,255,.1);
          }
          .journey-stage-title {
            margin-top: 28px;
            max-width: none;
            font-size: 28px;
          }
          .journey-stage-text {
            max-width: none;
          }
          .journey-progress-wrap {
            margin-top: 16px;
          }
          .journey-demo-bridge {
            flex-direction: column;
            align-items: flex-start;
          }
          .journey-scroll-shell {
            min-height: auto;
          }
          .journey-scroll-sticky {
            position: static;
            overflow: visible;
          }
          .journey-scroll-grid,
          .journey-scroll-grid.journey-scroll-grid-shifted {
            transform: none;
          }
          .stage-carousel-item-free { width: min(680px, 78vw); }
          .analysis-right-card-plain { height: auto; }
          .start-cards-row { gap: 14px; }
          .tariff-comparison-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 14px;
          }
          .tariff-column {
            padding: 16px 14px;
            border-radius: 22px;
          }
          .tariff-column-head {
            margin-bottom: 12px;
          }
          .tariff-column-title {
            font-size: 16px;
          }
          .tariff-attention {
            width: 30px;
            height: 30px;
          }
          .tariff-section {
            padding-top: 12px;
          }
          .tariff-section-label {
            font-size: 13px;
          }
          .tariff-check-item,
          .tariff-note-item {
            font-size: 12px;
            line-height: 1.45;
          }
          .start-card { flex: none; }
          .start-card-inner {
            min-height: 0;
            border-radius: 24px;
            border: none;
            background: transparent;
            box-shadow: none;
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
          .start-card-price-float {
            top: var(--price-top-mobile, var(--price-top, auto));
            right: var(--price-right-mobile, var(--price-right, auto));
            bottom: var(--price-bottom-mobile, var(--price-bottom, auto));
            left: var(--price-left-mobile, var(--price-left, auto));
            font-size: clamp(28px, 10vw, 40px);
          }
          .start-card-btn {
            top: var(--button-top-mobile, var(--button-top, auto));
            right: var(--button-right-mobile, var(--button-right, auto));
            bottom: var(--button-bottom-mobile, var(--button-bottom, auto));
            left: var(--button-left-mobile, var(--button-left, auto));
            width: var(--button-width-mobile, var(--button-width, auto));
            min-height: 38px;
            padding: 0 14px;
            font-size: 12px;
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
          .stage-lite-copy-grid,
          .stage-lite-bottom { grid-template-columns: 1fr; }
          .stage-lite-title { font-size: clamp(34px, 12vw, 52px); }
          .analysis-grid,
          .preview-grid,
          .results-grid-2x2,
          .journey-compact,
          .dashboard-grid,
          .input-grid,
          .compact-metrics-grid { width: 100%; max-width: 100%; }
          .cta-card { grid-template-columns: 1fr; gap: 14px; }

          .tariff-panel-layout {
            grid-template-columns: 1fr;
            gap: 14px;
            min-height: 0;
          }
          .tariff-panel-nav {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
            padding: 0;
          }
          .tariff-panel-tab {
            min-height: 38px;
            padding: 0 13px;
            border-radius: 13px;
            font-size: 12px;
          }
          .tariff-panel-content {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,.12);
            padding: 14px 0 0;
            gap: 14px;
          }
          .tariff-panel-content-title {
            font-size: 22px;
            max-width: none;
          }
          .tariff-panel-content .tariff-check-item,
          .tariff-panel-content .tariff-note-item {
            font-size: 13px;
            line-height: 1.55;
          }

          .page-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
