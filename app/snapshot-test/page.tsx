"use client";

import { useEffect, useMemo, useState } from "react";

type ConfidenceLevel = "high" | "medium" | "preliminary";

type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title: string;
  tooltip_text: string;
};

type MetricRow = {
  metric: string;
  formula: string;
  value: number | string;
  unit: string;
  confidence_level: ConfidenceLevel;
  interpretation: string;
};

type ContradictionItem = {
  issue: string;
  what_it_may_mean: string;
  usable_part: string;
};

type EconomicsPayload = {
  confidence_ui_system: {
    component: string;
    dots_total: number;
    dot_size_px: number;
    gap_px: number;
    hover_zone: string;
    inactive_style: string;
    levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
  };
  input_normalization: {
    reported_retained_share_after_expenses: {
      value: number;
      unit: string;
      confidence_level: ConfidenceLevel;
    };
    last_month_cash_in: {
      value: number;
      currency: string;
      confidence_level: ConfidenceLevel;
    };
    total_contract_value: {
      value: number;
      currency: string;
      confidence_level: ConfidenceLevel;
    };
    installment_count: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    number_of_clients_or_sales: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    lead_volume: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    processing_capacity: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    channel_mix_chart: {
      chart_type: string;
      title: string;
      series: Array<{
        label: string;
        value: number;
      }>;
    };
    product_margin_charts: Array<{
      chart_type: string;
      title: string;
      product: string;
      value: number;
      unit: string;
    }>;
    core_team_size: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    core_team_display: string[];
    declared_targets: string[];
    data_quality_note: string;
  };
  exact_metrics_table: {
    columns: string[];
    rows: MetricRow[];
  };
  inferred_metrics_table: {
    columns: string[];
    rows: MetricRow[];
  };
  contradictions: {
    contradiction_flag: boolean;
    contradiction_items: ContradictionItem[];
    impact_on_analysis: string;
  };
  economic_interpretation: {
    current_economic_state: {
      key_value: string;
      comment: string;
    };
    main_loss_pattern: {
      key_value: string;
      comment: string;
    };
    scalability_risk: string;
    most_important_numeric_signal: {
      key_value: string;
      comment: string;
    };
    reliability_of_current_margin: string;
    capacity_vs_demand_takeaway: string;
  };
  missing_for_stronger_model: string[];
  confidence_note: string;
};

const ECONOMICS_MOCK: EconomicsPayload = {
  confidence_ui_system: {
    component: "reliability_dots",
    dots_total: 3,
    dot_size_px: 7,
    gap_px: 4,
    hover_zone: "group",
    inactive_style: "low_opacity",
    levels: {
      high: {
        display: "● ● ●",
        active_dots: 3,
        tooltip_title: "Устойчивый показатель",
        tooltip_text: "Можно опираться в выводах.",
      },
      medium: {
        display: "● ● ○",
        active_dots: 2,
        tooltip_title: "Вероятный показатель",
        tooltip_text: "Можно использовать с оговоркой.",
      },
      preliminary: {
        display: "● ○ ○",
        active_dots: 1,
        tooltip_title: "Предварительный показатель",
        tooltip_text:
          "Показывает направление, но требует подтверждения дополнительными данными.",
      },
    },
  },
  input_normalization: {
    reported_retained_share_after_expenses: {
      value: 55,
      unit: "percent",
      confidence_level: "preliminary",
    },
    last_month_cash_in: {
      value: 1900,
      currency: "USD",
      confidence_level: "medium",
    },
    total_contract_value: {
      value: 6100,
      currency: "USD",
      confidence_level: "high",
    },
    installment_count: {
      value: 3,
      confidence_level: "medium",
    },
    number_of_clients_or_sales: {
      value: 1,
      confidence_level: "medium",
    },
    lead_volume: {
      value: 13,
      confidence_level: "medium",
    },
    processing_capacity: {
      value: 4,
      confidence_level: "medium",
    },
    channel_mix_chart: {
      chart_type: "pie",
      title: "Распределение входящего потока по каналам",
      series: [
        { label: "Meta Ads", value: 25 },
        { label: "Рефералы", value: 30 },
        { label: "Холодный outreach", value: 12 },
        { label: "Google Ads", value: 25 },
        { label: "Возвраты клиентов с прошлого опыта", value: 8 },
      ],
    },
    product_margin_charts: [
      {
        chart_type: "single_metric",
        title: "Маржинальность продукта",
        product: "Разработка MVP",
        value: 50,
        unit: "percent",
      },
      {
        chart_type: "single_metric",
        title: "Маржинальность продукта",
        product: "Страт сессии",
        value: 80,
        unit: "percent",
      },
      {
        chart_type: "single_metric",
        title: "Маржинальность продукта",
        product: "Автоматизации для бизнеса",
        value: 30,
        unit: "percent",
      },
    ],
    core_team_size: {
      value: 2,
      confidence_level: "high",
    },
    core_team_display: ["CMO // маркетинг", "CSO / busdev // продажи"],
    declared_targets: [
      "Цель по Чистая прибыль (Net Profit): +100% к концу года",
      "Увеличить приход в 2 раза",
      "Не превысить лимит затрат 30% от прихода",
      "Через 6 месяцев заключить 2 новых контракта",
      "Через 12 месяцев иметь стабильные 3 проекта в работе",
    ],
    data_quality_note:
      "Экономика построена на одном клиенте и одном месяце cash-in; часть сигналов описывает факт, часть — целевую модель при масштабе.",
  },
  exact_metrics_table: {
    columns: [
      "metric",
      "formula",
      "value",
      "unit",
      "confidence_level",
      "interpretation",
    ],
    rows: [
      {
        metric: "Реализованная прибыль за прошлый месяц",
        formula: "1900 × 55%",
        value: 1045,
        unit: "USD",
        confidence_level: "preliminary",
        interpretation:
          "Только ориентир: база из одного клиента, а 55% сам пользователь считает ранним сигналом.",
      },
      {
        metric: "Реализованные затраты за прошлый месяц",
        formula: "1900 − 1045",
        value: 855,
        unit: "USD",
        confidence_level: "preliminary",
        interpretation:
          "Расчет зеркалит заявленную retained share и наследует ее низкую устойчивость.",
      },
      {
        metric: "Средний cash-in на клиента за прошлый месяц",
        formula: "1900 / 1",
        value: 1900,
        unit: "USD",
        confidence_level: "medium",
        interpretation:
          "Это не Average Check по контракту, а только фактически полученный платеж в месяце.",
      },
      {
        metric: "Demand / Capacity",
        formula: "13 / 4",
        value: 3.25,
        unit: "x",
        confidence_level: "medium",
        interpretation:
          "Спрос по обращениям превышает текущую пропускную способность более чем в 3 раза.",
      },
      {
        metric: "Покрытие спроса пропускной способностью",
        formula: "4 / 13",
        value: 30.77,
        unit: "percent",
        confidence_level: "medium",
        interpretation:
          "Команда способна обработать около трети текущего входящего потока.",
      },
      {
        metric: "Необработанный спрос",
        formula: "max(13 − 4, 0)",
        value: 9,
        unit: "обращений",
        confidence_level: "medium",
        interpretation:
          "Есть прямой числовой разрыв между входящим потоком и возможностью его отработки.",
      },
      {
        metric: "Средняя заявленная маржинальность продуктовой линейки",
        formula: "(50% + 80% + 30%) / 3",
        value: 53.33,
        unit: "percent",
        confidence_level: "medium",
        interpretation:
          "Потенциал маржи выглядит сильным, но mix продаж по продуктам не раскрыт.",
      },
      {
        metric: "Разброс маржинальности между продуктами",
        formula: "80% − 30%",
        value: 50,
        unit: "п.п.",
        confidence_level: "medium",
        interpretation:
          "Экономика сильно зависит от того, какие именно продукты формируют выручку.",
      },
    ],
  },
  inferred_metrics_table: {
    columns: [
      "metric",
      "formula",
      "value",
      "unit",
      "confidence_level",
      "interpretation",
    ],
    rows: [
      {
        metric: "Оценка cash-in как доли контракта в прошлом месяце",
        formula: "1900 / 6100",
        value: 31.15,
        unit: "percent",
        confidence_level: "medium",
        interpretation:
          "В прошлом месяце признана только часть контрактной стоимости; месячная выручка недосказывает полный объем сделки.",
      },
      {
        metric:
          "Ориентир полного валового результата по контракту при 55% retained share",
        formula: "6100 × 55%",
        value: 3355,
        unit: "USD",
        confidence_level: "preliminary",
        interpretation:
          "Чисто модельный ориентир; нельзя принимать как факт без подтверждения затрат по всему циклу проекта.",
      },
      {
        metric: "Суммарное время до оплаты по CJM",
        formula: "1 ч + 1 ч + 30 мин + 10 мин",
        value: 2.67,
        unit: "часа",
        confidence_level: "medium",
        interpretation:
          "Цикл до оплаты короткий, значит ограничение сейчас выглядит не во времени сделки, а в обработке и организации.",
      },
      {
        metric: "Retention window",
        formula: "из ответа напрямую",
        value: 14,
        unit: "дней",
        confidence_level: "medium",
        interpretation:
          "Окно удержания короткое; без фактической доли повторных продаж вклад в LTV пока не подтвержден.",
      },
      {
        metric: "Средний сезонный uplift в пиковые месяцы",
        formula: "(46% + 30% + 31% + 44%) / 4",
        value: 37.75,
        unit: "percent",
        confidence_level: "preliminary",
        interpretation:
          "Сезонность выраженная, но историческая база бизнеса всего около полугода, поэтому использовать как твердый прогноз рано.",
      },
      {
        metric: "Оценка лидов по ключевому каналу — рефералы",
        formula: "13 × 30%",
        value: 3.9,
        unit: "лида",
        confidence_level: "preliminary",
        interpretation:
          "Рефералы — крупнейший канал в mix, что повышает зависимость от не полностью управляемого источника спроса.",
      },
    ],
  },
  contradictions: {
    contradiction_flag: true,
    contradiction_items: [
      {
        issue: "Текущая retained share 55% против целевой 30% при масштабе",
        what_it_may_mean:
          "Либо текущая единичная сделка аномально выгодна, либо масштабирование потребует существенного роста затрат.",
        usable_part:
          "55% можно использовать только как наблюдение текущего кейса; 30% — как ориентир плановой модели.",
      },
      {
        issue:
          "Цель по расходам: не превысить 30% затрат от прихода не совпадает с целью оставлять 30%",
        what_it_may_mean:
          "Если затраты = 30% от прихода, то retained share до прочих корректировок была бы около 70%, а не 30%.",
        usable_part:
          "Формулировка про лимит затрат требует уточнения состава затрат: это все расходы, только переменные или только операционные.",
      },
      {
        issue:
          "Прошлый месяц: 1 клиент на 5 месяцев и одновременно cash-in 1900 USD при контракте 6100 USD",
        what_it_may_mean:
          "Деньги, выручка и полная стоимость сделки относятся к разным временным основаниям.",
        usable_part:
          "Для анализа месяца корректно использовать 1900 USD cash-in; для экономической ценности сделки — 6100 USD контракт.",
      },
    ],
    impact_on_analysis:
      "Главное ограничение анализа — несопоставимость текущей маржи, целевой маржи и лимита расходов. Поэтому планирование от 55% как от устойчивой базы некорректно.",
  },
  economic_interpretation: {
    current_economic_state: {
      key_value: "ранняя экономика на 1 клиенте",
      comment:
        "Деньги уже приходят, но статистическая база слишком узкая для надежного вывода о Margin и масштабируемости.",
    },
    main_loss_pattern: {
      key_value: "дефицит пропускной способности",
      comment:
        "Самый явный текущий разрыв — 13 обращений при capacity 4, то есть часть спроса не может быть обработана.",
    },
    scalability_risk:
      "Высокий риск, что текущая маржа не масштабируется: команда из 2 человек уже перегружена операционкой и проектным управлением, а целевая модель по расходам противоречиво сформулирована.",
    most_important_numeric_signal: {
      key_value: "Demand / Capacity = 3.25x",
      comment:
        "Это самый сильный числовой индикатор реального лимита роста: ограничение сейчас в пропускной способности, а не в отсутствии обращений.",
    },
    reliability_of_current_margin:
      "Низкая для планирования. 55% основаны на одном клиенте и сами обозначены как ранний сигнал; использовать можно только как верхнюю границу текущего кейса, не как стабильную норму.",
    capacity_vs_demand_takeaway:
      "Бизнес сейчас выглядит ограниченным не спросом, а способностью качественно обработать и довести поток до результата. При этом стабильность самого потока тоже не доказана, потому что основатель прямо указывает потребность в стабильных заявках.",
  },
  missing_for_stronger_model: [
    "Фактическая конверсия из 13 обращений в созвон, оффер и оплату",
    "Структура затрат: переменные, постоянные, подрядчики, зарплаты основателей",
    "Фактическое распределение выручки по продуктам, чтобы связать product mix с общей Margin",
    "Доля повторных продаж, апсейлов и подписки в выручке",
    "Помесячная история cash-in минимум за 6–12 месяцев для проверки сезонности и устойчивости спроса",
  ],
  confidence_note:
    "Картина экономики полезна как стартовая, но опирается на очень малую выборку. Самый надежный вывод сейчас — разрыв между спросом и пропускной способностью. Выводы по марже и масштабированию предварительные.",
};

const PIE_COLORS = [
  "#f7d237",
  "rgba(247,210,55,0.78)",
  "rgba(247,210,55,0.58)",
  "rgba(247,210,55,0.4)",
  "rgba(247,210,55,0.25)",
];

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMetricValue(value: number | string, unit: string) {
  if (typeof value === "string") return value;

  if (unit === "USD") return formatCurrency(value, "USD");
  if (unit === "percent") return `${formatCompactNumber(value)}%`;
  if (unit === "x") return `${formatCompactNumber(value)}x`;
  if (unit === "п.п.") return `${formatCompactNumber(value)} п.п.`;
  if (unit === "часа") return `${formatCompactNumber(value)} ч`;
  if (unit === "дней") return `${formatCompactNumber(value)} дн`;
  return `${formatCompactNumber(value)} ${unit}`.trim();
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

function ReliabilityDots({
  level,
  levels,
  withLabel = false,
}: {
  level: ConfidenceLevel;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
  withLabel?: boolean;
}) {
  const current = levels[level];

  return (
    <div className="group relative inline-flex items-center gap-2">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <span
            key={idx}
            className={`h-[7px] w-[7px] rounded-full transition-opacity ${
              idx < current.active_dots ? "opacity-100" : "opacity-20"
            }`}
            style={{ backgroundColor: "#f7d237" }}
          />
        ))}
      </div>

      {withLabel ? (
        <span className="text-xs text-white/55">{current.tooltip_title}</span>
      ) : null}

      <div className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-[220px] rounded-2xl border border-white/10 bg-[#07152f]/95 p-3 opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="text-xs font-medium text-white">{current.tooltip_title}</div>
        <div className="mt-1 text-xs leading-5 text-white/65">
          {current.tooltip_text}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-4">
      <div className="text-[11px] uppercase tracking-[0.26em] text-white/35">
        {eyebrow}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>
      {text ? <p className="mt-2 text-sm leading-6 text-white/60">{text}</p> : null}
    </div>
  );
}

function KeyInsightCard({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
        {title}
      </div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  confidenceLevel,
  levels,
}: {
  label: string;
  value: string;
  confidenceLevel: ConfidenceLevel;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">
          {label}
        </div>
        <ReliabilityDots level={confidenceLevel} levels={levels} />
      </div>
      <div className="text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function DonutChart({
  title,
  data,
}: {
  title: string;
  data: Array<{ label: string; value: number }>;
}) {
  const total = useMemo(
    () => data.reduce((acc, item) => acc + item.value, 0),
    [data]
  );

  let startAngle = 0;

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-sm font-medium text-white">{title}</div>

      <div className="mt-5 grid gap-5 md:grid-cols-[180px_1fr] md:items-center">
        <div className="mx-auto h-[180px] w-[180px]">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="16"
            />
            {data.map((item, index) => {
              const angle = (item.value / total) * 360;
              const path = describeArc(60, 60, 42, startAngle, startAngle + angle);
              const node = (
                <path
                  key={item.label}
                  d={path}
                  fill="none"
                  stroke={PIE_COLORS[index % PIE_COLORS.length]}
                  strokeWidth="16"
                  strokeLinecap="butt"
                />
              );
              startAngle += angle;
              return node;
            })}
            <circle cx="60" cy="60" r="28" fill="#0b1d3a" />
            <text
              x="60"
              y="56"
              textAnchor="middle"
              className="fill-white text-[10px] font-medium"
            >
              Mix
            </text>
            <text
              x="60"
              y="68"
              textAnchor="middle"
              className="fill-white/60 text-[7px]"
            >
              100%
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                />
                <span className="text-sm text-white/75">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-white">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductMarginCard({
  product,
  value,
}: {
  product: string;
  value: number;
}) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">
        Маржинальность продукта
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-[74px] w-[74px] shrink-0">
          <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="none"
              stroke="#f7d237"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
            {value}%
          </div>
        </div>

        <div>
          <div className="text-base font-medium text-white">{product}</div>
          <div className="mt-1 text-sm text-white/55">
            Отдельная диаграмма под продукт.
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricTable({
  title,
  rows,
  levels,
}: {
  title: string;
  rows: MetricRow[];
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="text-base font-medium text-white">{title}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Metric
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Formula
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Value
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Unit
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Confidence
              </th>
              <th className="px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-white/35">
                Interpretation
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.metric}-${row.formula}`}
                className="border-b border-white/8 align-top last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-white">
                  {row.metric}
                </td>
                <td className="px-5 py-4 text-sm text-white/65">{row.formula}</td>
                <td className="px-5 py-4 text-sm text-white">
                  {formatMetricValue(row.value, row.unit)}
                </td>
                <td className="px-5 py-4 text-sm text-white/65">{row.unit}</td>
                <td className="px-5 py-4 text-sm text-white/65">
                  <ReliabilityDots level={row.confidence_level} levels={levels} />
                </td>
                <td className="px-5 py-4 text-sm leading-6 text-white/65">
                  {row.interpretation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContradictionCard({ item }: { item: ContradictionItem }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-sm font-medium text-white">{item.issue}</div>

      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">
          Что это может значить
        </div>
        <p className="mt-2 text-sm leading-6 text-white/65">
          {item.what_it_may_mean}
        </p>
      </div>

      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">
          Что можно использовать
        </div>
        <p className="mt-2 text-sm leading-6 text-white/65">{item.usable_part}</p>
      </div>
    </div>
  );
}

export default function EconomicsInsightCard() {
  const [isOpen, setIsOpen] = useState(false);
  const data = ECONOMICS_MOCK;
  const previewMissing = data.missing_for_stronger_model.slice(0, 2);
  const hiddenMissingCount = Math.max(
    data.missing_for_stronger_model.length - previewMissing.length,
    0
  );

  const confidenceLevels = data.confidence_ui_system.levels;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <article
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,210,55,0.08),transparent_22%),linear-gradient(180deg,#10254b_0%,#0b1d3a_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8"
        style={{
          backdropFilter: "blur(22px)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -left-8 bottom-8 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.035]">
            <div className="relative h-8 w-8 rounded-full border border-[#f7d237]/35">
              <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#f7d237] border-r-transparent border-t-transparent" />
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                reliability
              </div>
              <div className="mt-2 flex justify-end">
                <ReliabilityDots
                  level="preliminary"
                  levels={confidenceLevels}
                  withLabel={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10">
          <div className="text-[11px] uppercase tracking-[0.32em] text-white/35">
            BLOCK 2
          </div>
          <h3 className="mt-3 text-[40px] font-semibold leading-none text-white">
            Economics
          </h3>
          <p className="mt-4 text-xl text-white/65">Margin, revenue, volume, KPI</p>
        </div>

        <div className="relative mt-8 space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              Confidence note
            </div>
            <p className="mt-3 max-h-[84px] overflow-hidden text-sm leading-7 text-white/72">
              {data.confidence_note}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              Missing for stronger model
            </div>
            <div className="mt-3 space-y-3">
              {previewMissing.map((item, index) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 text-xs text-white/55">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}

              {hiddenMissingCount > 0 ? (
                <div className="pl-9 text-sm text-[#f7d237]">
                  +{hiddenMissingCount} additional points
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative mt-8 flex w-full items-center justify-between rounded-[28px] border border-white/10 bg-[#0a1a35]/80 px-6 py-5 text-left transition-all duration-300 hover:border-[#f7d237]/25 hover:bg-[#0d2142]"
        >
          <span className="text-[32px] leading-none text-white/12">→</span>
          <span className="text-lg text-white/72">Открыть блок</span>
          <span className="text-lg font-medium text-[#f7d237]">Economics</span>
        </button>
      </article>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? "pointer-events-auto bg-black/45 backdrop-blur-[6px]" : "pointer-events-none bg-black/0"
        }`}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default"
        />

        <aside
          className={`absolute right-0 top-0 h-screen w-full overflow-hidden border-l border-white/10 bg-[linear-gradient(180deg,#0d2142_0%,#091731_100%)] shadow-[-32px_0_80px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[72vw] lg:w-[50vw] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-white/10 px-6 py-5 md:px-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                    BLOCK 2
                  </div>
                  <div className="mt-2 text-3xl font-semibold text-white">
                    Economics
                  </div>
                  <p className="mt-2 max-w-[720px] text-sm leading-6 text-white/60">
                    Slide-over карточка со всей информацией economics по фиксированной
                    JSON-структуре.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/70 transition-colors hover:border-[#f7d237]/25 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <div className="space-y-8">
                <section>
                  <SectionHeader
                    eyebrow="overview"
                    title="Ключевая интерпретация"
                    text="Основные сигналы, которые должны быть видны сразу после открытия."
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <KeyInsightCard
                      title="Текущее экономическое состояние"
                      value={data.economic_interpretation.current_economic_state.key_value}
                      text={data.economic_interpretation.current_economic_state.comment}
                    />
                    <KeyInsightCard
                      title="Основной паттерн потери денег"
                      value={data.economic_interpretation.main_loss_pattern.key_value}
                      text={data.economic_interpretation.main_loss_pattern.comment}
                    />
                    <KeyInsightCard
                      title="Самый сильный числовой сигнал"
                      value={
                        data.economic_interpretation.most_important_numeric_signal.key_value
                      }
                      text={
                        data.economic_interpretation.most_important_numeric_signal.comment
                      }
                    />
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Риск масштабирования
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {data.economic_interpretation.scalability_risk}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-4">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-[#fff1ad]">
                      Надежность текущей маржи
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {data.economic_interpretation.reliability_of_current_margin}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {data.economic_interpretation.capacity_vs_demand_takeaway}
                    </p>
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="confidence system"
                    title="Система reliability dots"
                    text="Эта же логика используется для метрик и таблиц внутри карточки."
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    {(
                      Object.keys(confidenceLevels) as Array<keyof typeof confidenceLevels>
                    ).map((level) => (
                      <div
                        key={level}
                        className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                          {level}
                        </div>
                        <div className="mt-3">
                          <ReliabilityDots
                            level={level}
                            levels={confidenceLevels}
                            withLabel
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="input normalization"
                    title="Нормализация входных данных"
                    text="Все ключевые нормализованные сигналы из economics payload."
                  />

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <MiniMetric
                      label="Retained share after expenses"
                      value={`${data.input_normalization.reported_retained_share_after_expenses.value}%`}
                      confidenceLevel={
                        data.input_normalization
                          .reported_retained_share_after_expenses.confidence_level
                      }
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Last month cash-in"
                      value={formatCurrency(
                        data.input_normalization.last_month_cash_in.value,
                        data.input_normalization.last_month_cash_in.currency
                      )}
                      confidenceLevel={data.input_normalization.last_month_cash_in.confidence_level}
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Total contract value"
                      value={formatCurrency(
                        data.input_normalization.total_contract_value.value,
                        data.input_normalization.total_contract_value.currency
                      )}
                      confidenceLevel={
                        data.input_normalization.total_contract_value.confidence_level
                      }
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Installment count"
                      value={String(data.input_normalization.installment_count.value)}
                      confidenceLevel={data.input_normalization.installment_count.confidence_level}
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Clients or sales"
                      value={String(data.input_normalization.number_of_clients_or_sales.value)}
                      confidenceLevel={
                        data.input_normalization.number_of_clients_or_sales
                          .confidence_level
                      }
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Lead volume"
                      value={String(data.input_normalization.lead_volume.value)}
                      confidenceLevel={data.input_normalization.lead_volume.confidence_level}
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Processing capacity"
                      value={String(data.input_normalization.processing_capacity.value)}
                      confidenceLevel={
                        data.input_normalization.processing_capacity.confidence_level
                      }
                      levels={confidenceLevels}
                    />
                    <MiniMetric
                      label="Core team size"
                      value={String(data.input_normalization.core_team_size.value)}
                      confidenceLevel={data.input_normalization.core_team_size.confidence_level}
                      levels={confidenceLevels}
                    />
                  </div>

                  <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                      Data quality note
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {data.input_normalization.data_quality_note}
                    </p>
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="channels"
                    title="Распределение входящего потока по каналам"
                  />
                  <DonutChart
                    title={data.input_normalization.channel_mix_chart.title}
                    data={data.input_normalization.channel_mix_chart.series}
                  />
                </section>

                <section>
                  <SectionHeader
                    eyebrow="products"
                    title="Маржинальность продуктового списка"
                    text="Три отдельные диаграммы под каждый продукт."
                  />

                  <div className="grid gap-4 md:grid-cols-3">
                    {data.input_normalization.product_margin_charts.map((item) => (
                      <ProductMarginCard
                        key={item.product}
                        product={item.product}
                        value={item.value}
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="team and targets"
                    title="Core team и declared targets"
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Core team
                      </div>
                      <div className="mt-4 space-y-3">
                        {data.input_normalization.core_team_display.map((member) => (
                          <div
                            key={member}
                            className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/72"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                        Declared targets
                      </div>
                      <div className="mt-4 space-y-3">
                        {data.input_normalization.declared_targets.map((target, idx) => (
                          <div key={target} className="flex gap-3 text-sm leading-6 text-white/72">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-white/55">
                              {idx + 1}
                            </span>
                            <span>{target}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="tables"
                    title="Точные метрики"
                  />
                  <MetricTable
                    title="Exact metrics table"
                    rows={data.exact_metrics_table.rows}
                    levels={confidenceLevels}
                  />
                </section>

                <section>
                  <SectionHeader
                    eyebrow="tables"
                    title="Выведенные метрики"
                  />
                  <MetricTable
                    title="Inferred metrics table"
                    rows={data.inferred_metrics_table.rows}
                    levels={confidenceLevels}
                  />
                </section>

                <section>
                  <SectionHeader
                    eyebrow="contradictions"
                    title="Противоречия модели"
                  />

                  {data.contradictions.contradiction_flag ? (
                    <div className="grid gap-4">
                      {data.contradictions.contradiction_items.map((item) => (
                        <ContradictionCard key={item.issue} item={item} />
                      ))}

                      <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5">
                        <div className="text-[11px] uppercase tracking-[0.22em] text-[#fff1ad]">
                          Impact on analysis
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/75">
                          {data.contradictions.impact_on_analysis}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-sm text-white/65">
                      Противоречий не обнаружено.
                    </div>
                  )}
                </section>

                <section>
                  <SectionHeader
                    eyebrow="model gaps"
                    title="Missing for stronger model"
                  />

                  <div className="grid gap-4">
                    {data.missing_for_stronger_model.map((item, idx) => (
                      <div
                        key={item}
                        className="flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-[#f7d237]">
                          {idx + 1}
                        </div>
                        <div className="text-sm leading-6 text-white/72">{item}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader
                    eyebrow="confidence"
                    title="Confidence note"
                  />

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm leading-7 text-white/72">
                      {data.confidence_note}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
