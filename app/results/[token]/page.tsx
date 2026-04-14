"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams } from "next/navigation";

type ConfidenceLevel = "high" | "medium" | "preliminary";
type ThemeBlockId =
  | "positioning"
  | "economics"
  | "clients_flow"
  | "product_sales"
  | "analytics_management"
  | "structure_processes"
  | "strategy";

type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title: string;
  tooltip_text: string;
};

type ConfidenceUiSystem = {
  component: string;
  dots_total: number;
  dot_size_px: number;
  gap_px: number;
  hover_zone: string;
  inactive_style: string;
  levels: Record<ConfidenceLevel, ConfidenceUiLevel>;
};

type NormalizedField = {
  value: number | string;
  unit?: string;
  currency?: string;
  confidence_level?: ConfidenceLevel;
};

type PieSeriesItem = {
  label: string;
  value: number;
};

type PieChartData = {
  chart_type: string;
  title: string;
  series: PieSeriesItem[];
};

type ProductMarginChart = {
  chart_type: string;
  title: string;
  product: string;
  value: number;
  unit: string;
};

type InputNormalization = {
  reported_retained_share_after_expenses: NormalizedField;
  last_month_cash_in: NormalizedField;
  total_contract_value: NormalizedField;
  installment_count: NormalizedField;
  number_of_clients_or_sales: NormalizedField;
  lead_volume: NormalizedField;
  processing_capacity: NormalizedField;
  channel_mix_chart: PieChartData;
  product_margin_charts: ProductMarginChart[];
  core_team_size: NormalizedField;
  core_team_display: string[];
  declared_targets: string[];
  data_quality_note: string;
};

type MetricRow = {
  metric: string;
  formula: string;
  value: number | string;
  unit: string;
  confidence_level: ConfidenceLevel;
  interpretation: string;
};

type MetricTableData = {
  columns: string[];
  rows: MetricRow[];
};

type ContradictionItem = {
  issue: string;
  what_it_may_mean: string;
  usable_part: string;
};

type Contradictions = {
  contradiction_flag: boolean;
  contradiction_items: ContradictionItem[];
  impact_on_analysis: string;
};

type InterpretationItem = {
  key_value: string;
  comment: string;
};

type EconomicInterpretation = {
  current_economic_state: InterpretationItem;
  main_loss_pattern: InterpretationItem;
  scalability_risk: string;
  most_important_numeric_signal: InterpretationItem;
  reliability_of_current_margin: string;
  capacity_vs_demand_takeaway: string;
};

type EconomicsPayload = {
  confidence_ui_system: ConfidenceUiSystem;
  input_normalization: InputNormalization;
  exact_metrics_table: MetricTableData;
  inferred_metrics_table: MetricTableData;
  contradictions: Contradictions;
  economic_interpretation: EconomicInterpretation;
  missing_for_stronger_model: string[];
  confidence_note: string;
};
type PositioningRisk = {
  risk: string;
  confidence: "high" | "medium" | "preliminary";
};

type PositioningPayload = {
  business_model: {
    type: string;
    confidence: "high" | "medium" | "preliminary";
    reason: string;
  };
  business_stage: {
    stage: string;
    confidence: "high" | "medium" | "preliminary";
    reason: string;
  };
  core_offer: {
    value: string;
    client_pays_for: string;
    confidence: "high" | "medium" | "preliminary";
    reason: string;
  };
  target_client: {
    segment: string;
    logic: string;
    confidence: "high" | "medium" | "preliminary";
  };
  positioning_type: {
    type: string;
    confidence: "high" | "medium" | "preliminary";
    reason: string;
  };
  market_scope: {
    scope: string;
    note: string;
    confidence: "high" | "medium" | "preliminary";
  };
  delivery_model: {
    type: string;
    founder_dependency: string;
    confidence: "high" | "medium" | "preliminary";
    reason: string;
  };
  risks: PositioningRisk[];
  takeaway: string;
  confidence_summary: string;
};

type ThemeCard = {
  id: ThemeBlockId;
  blockNumber: string;
  title: string;
  subtitle: string;
  previewTitle?: string;
  previewText?: string;
};

const BRAND = {
  yellow: "#f7d237",
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

const POSITIONING_MOCK: PositioningPayload = {
  business_model: {
    type: "гибридный B2B сервис: стратегический консалтинг + реализация + продуктированные элементы",
    confidence: "high",
    reason:
      "Компания описывает себя как business development/консалтинг с реализацией стратегий. При этом есть отдельные офферы с повторяемой доставкой: MVP, стратсессии, автоматизации.",
  },
  business_stage: {
    stage: "ранний startup / pre-scale",
    confidence: "high",
    reason:
      "Бизнесу около полугода, команда из 2 основателей, подтвержден только 1 клиент, ключевой запрос — стабильный поток заявок.",
  },
  core_offer: {
    value:
      "помощь стартапу пройти путь от гипотезы и стратегии к рабочему решению и следующим шагам роста",
    client_pays_for:
      "не за консультацию как таковую, а за структурированное решение: стратегия, MVP или автоматизация, которые дают понятный вектор действий и внедрение",
    confidence: "high",
    reason:
      "В пути клиента ценность доводится через демо результата, а маржинальные офферы включают MVP, стратсессии и автоматизации. Значит продается не час работы, а оформленный результат.",
  },
  target_client: {
    segment:
      "seed-stage SaaS стартапы в B2B и B2C, которым нужен внешний партнер по стратегии и запуску",
    logic:
      "Фокус выбран не по прошлой базе, а по намерению: SaaS назван целевым рынком из-за роста и влияния на другие отрасли. Для такого клиента релевантны MVP, стратегические сессии и автоматизации как способы быстрее принять и реализовать решения.",
    confidence: "medium",
  },
  positioning_type: {
    type: "стратегический implementation-партнер с цифро-ориентированным подходом",
    confidence: "high",
    reason:
      "Команда подчеркивает опору на аналитику, финансовые модели, сегментацию и воронку. Одновременно заявлена не только разработка стратегии, но и ее реализация.",
  },
  market_scope: {
    scope: "ЕС и СНГ, операционная база — Тбилиси",
    note:
      "Широкая география расширяет доступ к спросу, но требует более четкого и универсального оффера, потому что цикл покупки и ожидания клиентов могут различаться по рынкам.",
    confidence: "high",
  },
  delivery_model: {
    type: "founder-led с проектными подрядчиками",
    founder_dependency:
      "высокая: оба основателя участвуют почти во всех функциях, принимают все ключевые решения и держат продажи, стратегию и операционку",
    confidence: "high",
    reason:
      "В команде 2 человека, оба ЛПР, зоны сильно пересекаются, подрядчики проектные. Это указывает на ручную доставку и зависимость от основателей.",
  },
  risks: [
    {
      risk:
        "Смешение ролей «консалтинг / strategy / MVP / автоматизации» может размывать восприятие основного результата и усложнять покупку.",
      confidence: "high",
    },
    {
      risk:
        "Фокус на seed SaaS пока заявлен стратегически, но подтвержденной клиентской базы в этом сегменте почти нет.",
      confidence: "medium",
    },
    {
      risk:
        "Позиционирование опирается на основателей, поэтому масштабирование восприятия и delivery без них пока слабо подтверждено.",
      confidence: "high",
    },
  ],
  takeaway:
    "Сейчас это ранний founder-led B2B бизнес на стыке стратегии и внедрения, который хочет занять позицию внешнего growth/implementation-партнера для seed SaaS. Основная сила — умение упаковать решение через аналитику и довести до результата; основная слабость — пока не до конца зафиксированный главный оффер и слабая подтвержденность выбранного сегмента реальными кейсами.",
  confidence_summary:
    "Высокая уверенность по модели бизнеса, стадии, географии и delivery. Средняя уверенность по целевому клиенту и глубине позиционирования в SaaS, потому что намерение сформулировано ясно, но операционно подтверждено пока ограниченно.",
};

const THEME_CARDS: ThemeCard[] = [
  {
    id: "economics",
    blockNumber: "BLOCK 2",
    title: "Economics",
    subtitle: "Margin, revenue, volume, KPI",
  },
  {
    id: "positioning",
    blockNumber: "BLOCK 3",
    title: "Positioning",
    subtitle: "Market fit, segment, value framing",
    previewTitle: "В разработке",
    previewText: "Карточка будет подключена к payload блока positioning.",
  },
  {
    id: "clients_flow",
    blockNumber: "BLOCK 4",
    title: "Clients & Flow",
    subtitle: "Demand, channels, conversion path",
    previewTitle: "В разработке",
    previewText: "Карточка будет подключена к payload блока clients_flow.",
  },
  {
    id: "product_sales",
    blockNumber: "BLOCK 5",
    title: "Product & Sales",
    subtitle: "Offer, margin mix, CJM, deal logic",
    previewTitle: "В разработке",
    previewText: "Карточка будет подключена к payload блока product_sales.",
  },
  {
    id: "analytics_management",
    blockNumber: "BLOCK 6",
    title: "Analytics & Management",
    subtitle: "Visibility, signals, decision quality",
    previewTitle: "В разработке",
    previewText:
      "Карточка будет подключена к payload блока analytics_management.",
  },
  {
    id: "structure_processes",
    blockNumber: "BLOCK 7",
    title: "Structure & Processes",
    subtitle: "Capacity, ownership, operational limits",
    previewTitle: "В разработке",
    previewText:
      "Карточка будет подключена к payload блока structure_processes.",
  },
  {
    id: "strategy",
    blockNumber: "BLOCK 8",
    title: "Strategy",
    subtitle: "Growth direction, constraints, horizon",
    previewTitle: "В разработке",
    previewText: "Карточка будет подключена к payload блока strategy.",
  },
];

const PIE_COLORS = ["#f7d237", "#7dd3fc", "#8b5cf6", "#22c55e", "#f97316"];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number, digits = 0) {
  return `${formatNumber(value, digits)}%`;
}

function formatByUnit(
  value: number | string,
  unit?: string,
  currency?: string
): string {
  if (typeof value === "string") return value;
  if (currency) return formatCurrency(value, currency);
  if (unit === "percent") return formatPercent(value, value % 1 === 0 ? 0 : 2);
  if (unit === "USD") return formatCurrency(value, "USD");
  if (unit === "x") return `${formatNumber(value, 2)}x`;
  if (unit === "п.п.") return `${formatNumber(value, 0)} п.п.`;
  if (unit === "обращений" || unit === "дней" || unit === "лида") {
    return `${formatNumber(value)} ${unit}`;
  }
  if (unit === "часа") return `${formatNumber(value, 2)} часа`;
  return String(value);
}

function fieldValueDisplay(field: NormalizedField) {
  return formatByUnit(field.value, field.unit, field.currency);
}

function reliabilityMeta(
  system: ConfidenceUiSystem,
  level: ConfidenceLevel = "preliminary"
) {
  return system.levels[level];
}

function buildPieGradient(series: PieSeriesItem[]) {
  const total = series.reduce((sum, item) => sum + item.value, 0) || 1;
  let current = 0;

  const stops = series.map((item, index) => {
    const start = (current / total) * 100;
    current += item.value;
    const end = (current / total) * 100;
    return `${PIE_COLORS[index % PIE_COLORS.length]} ${start}% ${end}%`;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

function ReliabilityDots({
  level,
  system,
  compact = false,
}: {
  level: ConfidenceLevel;
  system: ConfidenceUiSystem;
  compact?: boolean;
}) {
  const meta = reliabilityMeta(system, level);

  return (
    <div className="group relative inline-flex items-center gap-2">
      <div
        className="inline-flex items-center"
        style={{ gap: `${system.gap_px}px` }}
      >
        {Array.from({ length: system.dots_total }).map((_, index) => {
          const active = index < meta.active_dots;
          return (
            <span
              key={`${level}-${index}`}
              className={cn(
                "rounded-full transition-opacity duration-200",
                active ? "opacity-100" : "opacity-25"
              )}
              style={{
                width: compact ? system.dot_size_px - 1 : system.dot_size_px,
                height: compact ? system.dot_size_px - 1 : system.dot_size_px,
                background: BRAND.yellow,
              }}
            />
          );
        })}
      </div>

      {!compact ? (
        <span className="text-xs uppercase tracking-[0.18em] text-white/40">
          {level}
        </span>
      ) : null}

      <div className="pointer-events-none absolute left-0 top-[calc(100%+10px)] z-20 w-[240px] translate-y-1 rounded-2xl border border-white/10 bg-[#102448]/95 p-3 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-xs font-semibold text-white">
          {meta.tooltip_title}
        </div>
        <div className="mt-1 text-xs leading-5 text-white/65">
          {meta.tooltip_text}
        </div>
      </div>
    </div>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl",
        className
      )}
      style={{
        boxShadow:
          "0 24px 70px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.10),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.045),transparent_25%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mb-5">
      <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
        {title}
      </h2>
      {text ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">{text}</p>
      ) : null}
    </div>
  );
}

function HeroMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </div>
  );
}

function ThemeResultsCard({
  card,
  economics,
  onOpen,
}: {
  card: ThemeCard;
  economics: EconomicsPayload;
  onOpen: (id: ThemeBlockId) => void;
}) {
  const isEconomics = card.id === "economics";
  const missingPreview = economics.missing_for_stronger_model.slice(0, 3);

  return (
    <GlassCard className="min-h-[380px] p-7 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.04]">
          <div className="relative h-7 w-7 rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10">
            <div className="absolute inset-[5px] rounded-full border-[3px] border-transparent border-t-[#f7d237]" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
          {card.blockNumber}
        </div>
        <h3 className="mt-3 text-[44px] font-semibold leading-none text-white">
          {card.title}
        </h3>
        <p className="mt-5 text-[24px] leading-8 text-white/60">
          {card.subtitle}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {isEconomics ? (
          <>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                missing_for_stronger_model
              </div>
              <div className="mt-3 space-y-2">
                {missingPreview.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-white/74"
                  >
                    <span className="mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] text-white/42">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#fff3b2]">
                confidence_note
              </div>
              <p className="mt-3 text-sm leading-6 text-white/78">
                {economics.confidence_note}
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
              {card.previewTitle}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/68">
              {card.previewText}
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpen(card.id)}
        className="mt-8 flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-[#0b1d3a]/70 px-5 py-5 text-left transition hover:border-[#f7d237]/22 hover:bg-[#0f2446]"
      >
        <span className="text-[18px] text-white/72">
          {isEconomics ? "Открыть блок" : "Открыть позже"}
        </span>
        <span className="flex items-center gap-3 text-[22px] font-semibold text-[#f7d237]">
          <span aria-hidden>→</span>
        </span>
      </button>
    </GlassCard>
  );
}

function PositioningResultsCard({
  card,
  data,
  onOpen,
}: {
  card: ThemeCard;
  data: PositioningPayload;
  onOpen: () => void;
}) {
  return (
    <GlassCard className="min-h-[380px] p-7 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-white/[0.04]">
          <div className="relative h-7 w-7 rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10">
            <div className="absolute inset-[5px] rounded-full border-[3px] border-transparent border-t-[#f7d237]" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
          {card.blockNumber}
        </div>
        <h3 className="mt-3 text-[44px] font-semibold leading-none text-white">
          {card.title}
        </h3>
        <p className="mt-5 text-[24px] leading-8 text-white/60">
          {card.subtitle}
        </p>
      </div>

      <div className="mt-8">
        <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#fff3b2]">
            confidence_summary
          </div>
          <p className="mt-3 text-sm leading-7 text-white/78">
            {data.confidence_summary}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-8 flex w-full items-center justify-between rounded-[24px] border border-white/10 bg-[#0b1d3a]/70 px-5 py-5 text-left transition hover:border-[#f7d237]/22 hover:bg-[#0f2446]"
      >
        <span className="text-[18px] text-white/72">Открыть блок</span>
        <span className="flex items-center gap-3 text-[22px] font-semibold text-[#f7d237]">
          <span aria-hidden>→</span>
        </span>
      </button>
    </GlassCard>
  );
}

function PositioningDrawer({
  data,
  onClose,
}: {
  data: PositioningPayload;
  onClose: () => void;
}) {
  const system = ECONOMICS_MOCK.confidence_ui_system;

  return (
    <div className="flex h-full flex-col bg-[#081932]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#081932]/92 px-5 py-4 backdrop-blur-xl md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Block 3
            </div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
              Positioning
            </div>
            <div className="mt-2 text-sm text-white/58">
              Полный mock-разворот блока positioning. Структура готова под будущий payload.
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/75 transition hover:border-white/20 hover:bg-white/[0.08]"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
        <section className="mb-8">
          <SectionHead
            eyebrow="positioning overview"
            title="Confidence summary"
            text="Краткое верхнеуровневое чтение positioning-модели и степени подтвержденности выводов."
          />

          <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]">
              confidence_summary
            </div>
            <p className="mt-3 text-sm leading-7 text-white/80">
              {data.confidence_summary}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="business model"
            title={data.business_model.type}
            text={data.business_model.reason}
          />
          <ReliabilityDots level={data.business_model.confidence} system={system} />
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              business_stage
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.business_stage.stage}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {data.business_stage.reason}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.business_stage.confidence} system={system} />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              positioning_type
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.positioning_type.type}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {data.positioning_type.reason}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.positioning_type.confidence} system={system} />
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              core_offer
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.core_offer.value}
            </div>
            <div className="mt-4 rounded-[18px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#fff3b2]">
                client_pays_for
              </div>
              <div className="mt-2 text-sm leading-7 text-white/80">
                {data.core_offer.client_pays_for}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/68">
              {data.core_offer.reason}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.core_offer.confidence} system={system} />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              target_client
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.target_client.segment}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {data.target_client.logic}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.target_client.confidence} system={system} />
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              market_scope
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.market_scope.scope}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {data.market_scope.note}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.market_scope.confidence} system={system} />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              delivery_model
            </div>
            <div className="mt-3 text-[24px] font-semibold text-white">
              {data.delivery_model.type}
            </div>
            <div className="mt-4 rounded-[18px] border border-white/8 bg-white/[0.04] p-4">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">
                founder_dependency
              </div>
              <div className="mt-2 text-sm leading-7 text-white/72">
                {data.delivery_model.founder_dependency}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/68">
              {data.delivery_model.reason}
            </p>
            <div className="mt-4">
              <ReliabilityDots level={data.delivery_model.confidence} system={system} />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="risks"
            title="Positioning risks"
            text="Ключевые риски текущего позиционирования."
          />

          <div className="grid gap-4">
            {data.risks.map((item, index) => (
              <div
                key={`${item.risk}-${index}`}
                className="rounded-[24px] border border-red-400/18 bg-red-400/8 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-red-100/85">
                    risk {index + 1}
                  </div>
                  <ReliabilityDots
                    level={item.confidence}
                    system={system}
                    compact
                  />
                </div>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  {item.risk}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-6">
          <SectionHead
            eyebrow="takeaway"
            title="Positioning takeaway"
            text="Итоговая интерпретация блока."
          />
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm leading-7 text-white/72">{data.takeaway}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function InsightCard({
  title,
  value,
  text,
}: {
  title: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        {title}
      </div>
      <div className="mt-3 text-[24px] font-semibold leading-tight text-white">
        {value}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/66">{text}</p>
    </div>
  );
}

function NormalizedInputCard({
  label,
  field,
  system,
}: {
  label: string;
  field: NormalizedField;
  system: ConfidenceUiSystem;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-sm leading-6 text-white/64">{label}</div>
        {field.confidence_level ? (
          <ReliabilityDots
            level={field.confidence_level}
            system={system}
            compact
          />
        ) : null}
      </div>
      <div className="mt-4 text-2xl font-semibold text-white">
        {fieldValueDisplay(field)}
      </div>
    </div>
  );
}

function PieCard({ chart }: { chart: PieChartData }) {
  const total = chart.series.reduce((sum, item) => sum + item.value, 0);

  return (
    <GlassCard className="p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        Normalized input
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{chart.title}</div>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
        <div className="mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-full border border-white/8 bg-white/[0.02] p-5">
          <div
            className="relative h-full w-full rounded-full"
            style={{ background: buildPieGradient(chart.series) }}
          >
            <div className="absolute inset-[22%] rounded-full border border-white/10 bg-[#0b1d3a]" />
          </div>
        </div>

        <div className="space-y-3">
          {chart.series.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ background: PIE_COLORS[index % PIE_COLORS.length] }}
                />
                <span className="text-sm text-white/72">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {formatPercent(item.value)}
              </div>
            </div>
          ))}

          <div className="pt-1 text-xs uppercase tracking-[0.18em] text-white/34">
            total {formatPercent(total)}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function ProductMarginCard({ item }: { item: ProductMarginChart }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
        {item.title}
      </div>
      <div className="mt-2 text-base text-white/72">{item.product}</div>
      <div className="mt-6 h-3 rounded-full bg-white/8">
        <div
          className="h-3 rounded-full bg-[#f7d237]"
          style={{ width: `${item.value}%` }}
        />
      </div>
      <div className="mt-3 text-2xl font-semibold text-white">
        {formatPercent(item.value)}
      </div>
    </div>
  );
}

function MetricsTable({
  title,
  data,
  system,
}: {
  title: string;
  data: MetricTableData;
  system: ConfidenceUiSystem;
}) {
  return (
    <GlassCard className="overflow-hidden">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
          Table
        </div>
        <div className="mt-2 text-xl font-semibold text-white">{title}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Metric
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Formula
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Value
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Unit
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Reliability
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Interpretation
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr
                key={`${title}-${row.metric}`}
                className="border-b border-white/8 align-top last:border-b-0"
              >
                <td className="px-5 py-5 text-sm font-medium text-white">
                  {row.metric}
                </td>
                <td className="px-5 py-5 text-sm text-white/62">
                  {row.formula}
                </td>
                <td className="px-5 py-5 text-sm font-semibold text-white">
                  {formatByUnit(row.value, row.unit)}
                </td>
                <td className="px-5 py-5 text-sm text-white/52">{row.unit}</td>
                <td className="px-5 py-5 text-sm text-white/62">
                  <ReliabilityDots
                    level={row.confidence_level}
                    system={system}
                  />
                </td>
                <td className="px-5 py-5 text-sm leading-7 text-white/62">
                  {row.interpretation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function ContradictionCard({ item }: { item: ContradictionItem }) {
  return (
    <div className="rounded-[24px] border border-red-400/18 bg-red-400/8 p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-red-100/85">
        contradiction
      </div>
      <div className="mt-3 text-lg font-semibold text-white">{item.issue}</div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] border border-white/8 bg-white/[0.04] p-4">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#f7d237]">
            what_it_may_mean
          </div>
          <div className="mt-2 text-sm leading-7 text-white/70">
            {item.what_it_may_mean}
          </div>
        </div>

        <div className="rounded-[18px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-4">
          <div className="text-[11px] uppercase tracking-[0.16em] text-[#fff3b2]">
            usable_part
          </div>
          <div className="mt-2 text-sm leading-7 text-white/78">
            {item.usable_part}
          </div>
        </div>
      </div>
    </div>
  );
}

function BulletList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        {title}
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${title}-${item}`}
            className="flex gap-3 text-sm leading-7 text-white/72"
          >
            <span className="mt-[4px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] text-white/45">
              {index + 1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EconomicsDrawer({
  data,
  onClose,
}: {
  data: EconomicsPayload;
  onClose: () => void;
}) {
  const system = data.confidence_ui_system;

  return (
    <div className="flex h-full flex-col bg-[#081932]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#081932]/92 px-5 py-4 backdrop-blur-xl md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Block 2
            </div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
              Economics
            </div>
            <div className="mt-2 text-sm text-white/58">
              Полный mock-разворот блока economics. Структура готова под будущий
              payload.
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-white/75 transition hover:border-white/20 hover:bg-white/[0.08]"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 md:px-7 md:py-6">
        <section className="mb-8">
          <SectionHead
            eyebrow="economics overview"
            title="Executive signal"
            text="Верхний слой развернутой карточки. Здесь собраны ключевые сигналы, риск масштабирования и reliability-оценка."
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <InsightCard
              title="current_economic_state"
              value={data.economic_interpretation.current_economic_state.key_value}
              text={data.economic_interpretation.current_economic_state.comment}
            />
            <InsightCard
              title="main_loss_pattern"
              value={data.economic_interpretation.main_loss_pattern.key_value}
              text={data.economic_interpretation.main_loss_pattern.comment}
            />
            <InsightCard
              title="most_important_numeric_signal"
              value={
                data.economic_interpretation.most_important_numeric_signal
                  .key_value
              }
              text={data.economic_interpretation.most_important_numeric_signal.comment}
            />
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
                reliability_of_current_margin
              </div>
              <div className="mt-4">
                <ReliabilityDots level="preliminary" system={system} />
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">
                {data.economic_interpretation.reliability_of_current_margin}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
            <div className="rounded-[24px] border border-red-400/18 bg-red-400/8 p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-red-100/85">
                scalability_risk
              </div>
              <p className="mt-3 text-sm leading-7 text-white/76">
                {data.economic_interpretation.scalability_risk}
              </p>
            </div>

            <div className="rounded-[24px] border border-[#f7d237]/18 bg-[#f7d237]/8 p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#fff3b2]">
                confidence_note
              </div>
              <p className="mt-3 text-sm leading-7 text-white/78">
                {data.confidence_note}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              capacity_vs_demand_takeaway
            </div>
            <p className="mt-3 text-sm leading-7 text-white/70">
              {data.economic_interpretation.capacity_vs_demand_takeaway}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="input normalization"
            title="Normalized inputs"
            text="Этот блок повторяет все нормализованные входные данные из economics JSON, включая confidence-level, диаграмму каналов, продуктовую маржу, core team и целевые ориентиры."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <NormalizedInputCard
              label="Retained share after expenses"
              field={
                data.input_normalization.reported_retained_share_after_expenses
              }
              system={system}
            />
            <NormalizedInputCard
              label="Last month cash-in"
              field={data.input_normalization.last_month_cash_in}
              system={system}
            />
            <NormalizedInputCard
              label="Total contract value"
              field={data.input_normalization.total_contract_value}
              system={system}
            />
            <NormalizedInputCard
              label="Installment count"
              field={data.input_normalization.installment_count}
              system={system}
            />
            <NormalizedInputCard
              label="Number of clients or sales"
              field={data.input_normalization.number_of_clients_or_sales}
              system={system}
            />
            <NormalizedInputCard
              label="Lead volume"
              field={data.input_normalization.lead_volume}
              system={system}
            />
            <NormalizedInputCard
              label="Processing capacity"
              field={data.input_normalization.processing_capacity}
              system={system}
            />
            <NormalizedInputCard
              label="Core team size"
              field={data.input_normalization.core_team_size}
              system={system}
            />
          </div>

          <div className="mt-4">
            <PieCard chart={data.input_normalization.channel_mix_chart} />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {data.input_normalization.product_margin_charts.map((item) => (
              <ProductMarginCard key={item.product} item={item} />
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="core_team_display"
              items={data.input_normalization.core_team_display}
            />
            <BulletList
              title="declared_targets"
              items={data.input_normalization.declared_targets}
            />
          </div>

          <div className="mt-4 rounded-[24px] border border-cyan-300/18 bg-cyan-400/8 p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/90">
              data_quality_note
            </div>
            <p className="mt-3 text-sm leading-7 text-white/78">
              {data.input_normalization.data_quality_note}
            </p>
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="exact metrics"
            title="Exact metrics table"
            text="Точные метрики в табличном виде: metric, formula, value, unit, confidence_level, interpretation."
          />
          <MetricsTable
            title="Exact metrics"
            data={data.exact_metrics_table}
            system={system}
          />
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="inferred metrics"
            title="Inferred metrics table"
            text="Выведенные метрики в табличном виде с тем же форматом и системой reliability dots."
          />
          <MetricsTable
            title="Inferred metrics"
            data={data.inferred_metrics_table}
            system={system}
          />
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="contradictions"
            title="Model contradictions"
            text="Раздел для несостыковок и ограничений интерпретации."
          />

          <div className="grid gap-4">
            {data.contradictions.contradiction_items.map((item) => (
              <ContradictionCard key={item.issue} item={item} />
            ))}
          </div>

          <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
              impact_on_analysis
            </div>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {data.contradictions.impact_on_analysis}
            </p>
          </div>
        </section>

        <section className="pb-6">
          <SectionHead
            eyebrow="model gaps"
            title="Missing for stronger model"
            text="На отдельном экране это можно оставить в самом низу как required data for stronger confidence."
          />

          <BulletList
            title="missing_for_stronger_model"
            items={data.missing_for_stronger_model}
          />
        </section>
      </div>
    </div>
  );
}

export default function ResultsTokenPage() {
  const params = useParams();
  const token =
    typeof params?.token === "string"
      ? params.token
      : Array.isArray(params?.token)
      ? params.token[0]
      : "mock-token";

  const [activeBlock, setActiveBlock] = useState<ThemeBlockId | null>(null);
  useBodyScrollLock(Boolean(activeBlock));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveBlock(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const heroStats = useMemo(
    () => [
      {
        label: "Текущая экономика",
        value: ECONOMICS_MOCK.economic_interpretation.current_economic_state
          .key_value,
      },
      {
        label: "Главный numeric signal",
        value:
          ECONOMICS_MOCK.economic_interpretation
            .most_important_numeric_signal.key_value,
      },
      {
        label: "Main loss pattern",
        value: ECONOMICS_MOCK.economic_interpretation.main_loss_pattern.key_value,
      },
      {
        label: "Missing inputs",
        value: `${ECONOMICS_MOCK.missing_for_stronger_model.length}`,
      },
    ],
    []
  );

  const isEconomicsOpen = activeBlock === "economics";
const isPositioningOpen = activeBlock === "positioning";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07172f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,210,55,0.08),transparent_22%),radial-gradient(circle_at_top_right,rgba(125,211,252,0.06),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:120px_120px]" />

      <main className="relative mx-auto max-w-[1680px] px-4 pb-20 pt-6 md:px-6 xl:px-8">
        <GlassCard className="mb-8 p-5 md:p-6 xl:p-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-[980px]">
              <div className="text-[11px] uppercase tracking-[0.30em] text-[#f7d237]">
                Revenue Snapshot / Results
              </div>
              <h1 className="mt-4 max-w-[980px] text-[34px] font-semibold leading-tight text-white md:text-[52px]">
                Новая страница результатов с карточками тематик и drawer-раскрытием
              </h1>
              <p className="mt-5 max-w-[900px] text-base leading-8 text-white/60 md:text-lg">
                Страница пересобрана под новый карточный layout. Для economics уже
                подключен полный mock-контент из присланного JSON. На превью
                карточки выводятся только первые 3 пункта
                <span className="text-white"> missing_for_stronger_model </span>и
                <span className="text-white"> confidence_note</span>.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff3b2]">
                  token: {token}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/68">
                  mock mode
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/68">
                  drawer width: 66vw
                </span>
              </div>
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2 xl:max-w-[420px]">
              {heroStats.map((item) => (
                <HeroMetric key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Thematic results layout
            </div>
            <div className="mt-2 text-xl font-semibold text-white md:text-2xl">
              Blocks overview
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveBlock("economics")}
            className="rounded-full border border-[#f7d237]/18 bg-[#f7d237]/10 px-5 py-3 text-sm font-medium text-[#fff3b2] transition hover:bg-[#f7d237]/15"
          >
            Открыть Economics
          </button>
        </div>

<section className="grid gap-6 xl:grid-cols-2">
  {THEME_CARDS.map((card) => {
    if (card.id === "positioning") {
      return (
        <PositioningResultsCard
          key={card.id}
          card={card}
          data={POSITIONING_MOCK}
          onOpen={() => setActiveBlock("positioning")}
        />
      );
    }

    return (
      <ThemeResultsCard
        key={card.id}
        card={card}
        economics={ECONOMICS_MOCK}
        onOpen={(id) => {
          if (id === "economics") setActiveBlock(id);
        }}
      />
    );
  })}
</section>
        
      </main>

      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500",
          activeBlock
            ? "pointer-events-auto bg-black/48 backdrop-blur-[2px]"
            : "pointer-events-none bg-black/0"
        )}
        onClick={() => setActiveBlock(null)}
      />

<aside
  className={cn(
    "fixed right-0 top-0 z-50 h-screen w-full max-w-none transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[min(66.666vw,1280px)]",
    activeBlock ? "translate-x-0" : "translate-x-full"
  )}
  onClick={(event) => event.stopPropagation()}
>
  {isEconomicsOpen ? (
    <EconomicsDrawer
      data={ECONOMICS_MOCK}
      onClose={() => setActiveBlock(null)}
    />
  ) : isPositioningOpen ? (
    <PositioningDrawer
      data={POSITIONING_MOCK}
      onClose={() => setActiveBlock(null)}
    />
  ) : null}
</aside>
    </div>
  );
}
