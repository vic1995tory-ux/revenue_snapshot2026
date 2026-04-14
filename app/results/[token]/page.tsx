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
  value: number | string | null;
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
  value: number | string | null;
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
  confidence: ConfidenceLevel;
};

type PositioningPayload = {
  business_model: {
    type: string;
    confidence: ConfidenceLevel;
    reason: string;
  };
  business_stage: {
    stage: string;
    confidence: ConfidenceLevel;
    reason: string;
  };
  core_offer: {
    value: string;
    client_pays_for: string;
    confidence: ConfidenceLevel;
    reason: string;
  };
  target_client: {
    segment: string;
    logic: string;
    confidence: ConfidenceLevel;
  };
  positioning_type: {
    type: string;
    confidence: ConfidenceLevel;
    reason: string;
  };
  market_scope: {
    scope: string;
    note: string;
    confidence: ConfidenceLevel;
  };
  delivery_model: {
    type: string;
    founder_dependency: string;
    confidence: ConfidenceLevel;
    reason: string;
  };
  risks: PositioningRisk[];
  takeaway: string;
  confidence_summary: string;
};

type ClientsFlowStage = {
  stage: string;
  duration: string;
  client_value: string;
  company_value: string;
  friction_point: string;
};

type ClientsFlowChartSeries = {
  name: string;
  unit: string;
  values: Array<number | null>;
};

type ClientsFlowForecastPoint = {
  month_label: string;
  modeled_revenue: number | null;
  seasonal_percent_assumption: number | null;
  assumption_type:
    | "neutral_carry_forward"
    | "factual_peak_reference"
    | "qualitative_decline_inference";
  confidence_level: ConfidenceLevel;
};

type ClientsFlowPayload = {
  confidence_ui_system: ConfidenceUiSystem;
  input_normalization: {
    target_segment: {
      value: string;
      confidence_level: ConfidenceLevel;
    };
    most_profitable_segment_if_stated: {
      value: string;
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
    actual_clients_or_sales_last_period: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    last_month_cash_in: {
      value: number;
      currency: string;
      confidence_level: ConfidenceLevel;
    };
    stable_flow_problem_statement: {
      value: string;
      confidence_level: ConfidenceLevel;
    };
    channel_mix_chart: PieChartData & {
      confidence_level: ConfidenceLevel;
    };
    declared_lead_sources: string[];
    seasonal_peak_months: Array<{
      month: string;
      percent: number;
    }>;
    seasonal_decline_months_if_numeric: Array<{
      month: string;
      percent: number;
    }>;
    core_team_size: {
      value: number;
      confidence_level: ConfidenceLevel;
    };
    core_team_display: string[];
    data_quality_note: string;
  };
  visual_blocks: {
    seasonality_revenue_percent_chart: {
      chart_type: string;
      title: string;
      anchor_baseline: {
        value: number;
        currency: string;
        confidence_level: ConfidenceLevel;
      };
      anchor_month_status:
        | "known_peak"
        | "known_decline"
        | "known_neutral"
        | "inferred"
        | "unknown";
      x_axis: string[];
      historical_bars_series: ClientsFlowChartSeries;
      forecast_bars_series: ClientsFlowChartSeries;
      historical_line_series: ClientsFlowChartSeries;
      forecast_line_series: ClientsFlowChartSeries;
      left_axis_unit: string;
      right_axis_unit: string;
      data_completeness: string;
      confidence_level: ConfidenceLevel;
      note: string;
    };
    mini_journey_map: {
      title: string;
      stages: ClientsFlowStage[];
    };
  };
  forecast_model: {
    horizon_months: number;
    baseline_value: number;
    baseline_currency: string;
    scenario_type: string;
    forecast_points: ClientsFlowForecastPoint[];
    model_logic: string;
    confidence_level: ConfidenceLevel;
    note: string;
  };
  exact_metrics_table: MetricTableData;
  inferred_metrics_table: MetricTableData;
  contradictions: {
    contradiction_flag: boolean;
    contradiction_items: string[];
    impact_on_analysis: string;
  };
  flow_interpretation: {
    current_flow_state: InterpretationItem;
    main_flow_loss_pattern: InterpretationItem;
    scalability_risk: string;
    strongest_numeric_signal: InterpretationItem;
    flow_reliability: string;
    capacity_vs_demand_takeaway: string;
  };
  missing_for_stronger_model: string[];
  confidence_note: string;
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

const CLIENTS_FLOW_MOCK: ClientsFlowPayload = {
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
    target_segment: {
      value: "Стартапы уровня seed в SaaS, B2B и B2C; продажи в ЕС и СНГ",
      confidence_level: "high",
    },
    most_profitable_segment_if_stated: {
      value: "Не указан отдельно; стратегический фокус заявлен на SaaS",
      confidence_level: "preliminary",
    },
    lead_volume: {
      value: 13,
      confidence_level: "high",
    },
    processing_capacity: {
      value: 4,
      confidence_level: "high",
    },
    actual_clients_or_sales_last_period: {
      value: 1,
      confidence_level: "medium",
    },
    last_month_cash_in: {
      value: 1900,
      currency: "USD",
      confidence_level: "high",
    },
    stable_flow_problem_statement: {
      value:
        "Главная зона изменений — стабильный поток заявок; текущий поток формально мультиканальный, но не воспринимается как устойчивый",
      confidence_level: "high",
    },
    channel_mix_chart: {
      chart_type: "pie",
      title: "Channel Mix входящего потока",
      series: [
        { label: "Рефералы", value: 30 },
        { label: "Meta Ads", value: 25 },
        { label: "Google Ads", value: 25 },
        { label: "Холодный outreach", value: 12 },
        { label: "Возвраты клиентов с прошлого опыта", value: 8 },
      ],
      confidence_level: "high",
    },
    declared_lead_sources: [
      "Meta Ads",
      "Рефералы",
      "Холодный outreach",
      "Google Ads",
      "Возвраты клиентов с прошлого опыта",
    ],
    seasonal_peak_months: [
      { month: "Мар", percent: 46 },
      { month: "Апр", percent: 30 },
      { month: "Сен", percent: 31 },
      { month: "Окт", percent: 44 },
    ],
    seasonal_decline_months_if_numeric: [],
    core_team_size: {
      value: 2,
      confidence_level: "high",
    },
    core_team_display: [
      "2 основателя: CMO и CSO/busdev",
      "Есть проектные подрядчики",
      "Оба вовлечены в маркетинг, продажи и операционку",
    ],
    data_quality_note:
      "Данные по входящему потоку и каналам заданы явно, но статистическая база очень мала: за прошлый месяц указан 1 клиент, бизнесу около полугода, числовых спадов сезонности нет, период сопоставимости продаж и лидов не полностью подтвержден.",
  },
  visual_blocks: {
    seasonality_revenue_percent_chart: {
      chart_type: "bar_line_combo",
      title: "Сезонность спроса и preliminary-модель Revenue на 6 месяцев",
      anchor_baseline: {
        value: 1900,
        currency: "USD",
        confidence_level: "high",
      },
      anchor_month_status: "unknown",
      x_axis: [
        "Мар",
        "Апр",
        "Сен",
        "Окт",
        "M+1",
        "M+2",
        "M+3",
        "M+4",
        "M+5",
        "M+6",
      ],
      historical_bars_series: {
        name: "Revenue_historical",
        unit: "USD",
        values: [null, null, null, null, null, null, null, null, null, null],
      },
      forecast_bars_series: {
        name: "Revenue_forecast",
        unit: "USD",
        values: [null, null, null, null, 1900, 1900, 2774, 2470, 1900, 1900],
      },
      historical_line_series: {
        name: "seasonal_percent_historical",
        unit: "percent",
        values: [46, 30, 31, 44, null, null, null, null, null, null],
      },
      forecast_line_series: {
        name: "seasonal_percent_forecast",
        unit: "percent",
        values: [null, null, null, null, 0, 0, 46, 30, 0, 0],
      },
      left_axis_unit: "USD",
      right_axis_unit: "percent",
      data_completeness:
        "Фактические monthly Revenue по месяцам отсутствуют; есть один baseline cash-in и отдельные сезонные пики в процентах",
      confidence_level: "preliminary",
      note:
        "График Revenue — это не история, а сценарная модель от одного известного cash-in 1900 USD. Базовый месяц не привязан надежно к пику, спаду или нейтральному периоду, поэтому прогноз ориентировочный.",
    },
    mini_journey_map: {
      title: "Mini Journey Map до оплаты",
      stages: [
        {
          stage: "Acquisition",
          duration: "до 1 часа",
          client_value: "Узнаёт решение своей боли через оффер",
          company_value: "Получает первично прогретый лид",
          friction_point: "Сложные формулировки могут отталкивать часть ЦА",
        },
        {
          stage: "Activation",
          duration: "до 1 часа",
          client_value: "Понимает варианты решения задачи",
          company_value: "Лид переходит к выбору формата, а не к вопросу да/нет",
          friction_point: "Недопонятая ценность ведёт к возражению «дорого»",
        },
        {
          stage: "Value Realization",
          duration: "до 30 минут",
          client_value: "Видит демо и окончательно считывает ценность",
          company_value: "Получает горячего клиента с высоким намерением",
          friction_point: "Риск завышенных ожиданий",
        },
        {
          stage: "Conversion",
          duration: "до 10 минут",
          client_value: "Быстро оплачивает понятный инструмент",
          company_value: "Фиксирует доверие и выручку",
          friction_point: "Явный фрикшен не указан",
        },
        {
          stage: "Retention",
          duration: "14 дней",
          client_value: "Получает разбор результатов и поддержку",
          company_value: "Создаёт базу для повторной продажи и делегирования работ",
          friction_point: "Явный фрикшен не указан",
        },
      ],
    },
  },
  forecast_model: {
    horizon_months: 6,
    baseline_value: 1900,
    baseline_currency: "USD",
    scenario_type:
      "Сценарная seasonal-baseline модель с нейтральным carry-forward вне явно названных пиков",
    forecast_points: [
      {
        month_label: "M+1",
        modeled_revenue: 1900,
        seasonal_percent_assumption: 0,
        assumption_type: "neutral_carry_forward",
        confidence_level: "preliminary",
      },
      {
        month_label: "M+2",
        modeled_revenue: 1900,
        seasonal_percent_assumption: 0,
        assumption_type: "neutral_carry_forward",
        confidence_level: "preliminary",
      },
      {
        month_label: "M+3",
        modeled_revenue: 2774,
        seasonal_percent_assumption: 46,
        assumption_type: "factual_peak_reference",
        confidence_level: "preliminary",
      },
      {
        month_label: "M+4",
        modeled_revenue: 2470,
        seasonal_percent_assumption: 30,
        assumption_type: "factual_peak_reference",
        confidence_level: "preliminary",
      },
      {
        month_label: "M+5",
        modeled_revenue: 1900,
        seasonal_percent_assumption: 0,
        assumption_type: "neutral_carry_forward",
        confidence_level: "preliminary",
      },
      {
        month_label: "M+6",
        modeled_revenue: 1900,
        seasonal_percent_assumption: 0,
        assumption_type: "neutral_carry_forward",
        confidence_level: "preliminary",
      },
    ],
    model_logic:
      "База = cash-in прошлого месяца 1900 USD. Для ближайших 6 месяцев применён нейтральный carry-forward, кроме месяцев, которые в сезонных сигналах описаны как пики с числовыми значениями. Числовые спады не заданы, поэтому вниз модель не калибруется.",
    confidence_level: "preliminary",
    note:
      "Это ориентир по направлению, а не прогноз-факт. Базовый месяц неизвестно относится ли к пику, спаду или нейтральному спросу; исторический ряд выручки по месяцам отсутствует.",
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
        metric: "Спрос / пропускная способность (Demand / Capacity)",
        formula: "lead_volume / processing_capacity = 13 / 4",
        value: 3.25,
        unit: "x",
        confidence_level: "high",
        interpretation:
          "Номинальный входящий спрос выше заявленной возможности обработки в 3.25 раза.",
      },
      {
        metric: "Покрытие спроса capacity",
        formula: "processing_capacity / lead_volume = 4 / 13",
        value: 0.308,
        unit: "share",
        confidence_level: "high",
        interpretation:
          "Команда может обработать около 30.8% текущего объёма обращений.",
      },
      {
        metric: "Необработанный спрос",
        formula: "max(lead_volume - processing_capacity, 0) = max(13 - 4, 0)",
        value: 9,
        unit: "лидов",
        confidence_level: "high",
        interpretation:
          "При равномерном качестве лидов до 9 обращений остаются вне capacity.",
      },
      {
        metric: "Доля необработанного спроса",
        formula: "unmet_demand_count / lead_volume = 9 / 13",
        value: 0.692,
        unit: "share",
        confidence_level: "high",
        interpretation:
          "Потенциально теряется около 69.2% входящего потока на этапе обработки.",
      },
      {
        metric: "Доля топ-2 каналов",
        formula: "30% + 25%",
        value: 55,
        unit: "percent",
        confidence_level: "high",
        interpretation:
          "Больше половины потока сосредоточено в двух каналах.",
      },
      {
        metric: "Доля топ-3 каналов",
        formula: "30% + 25% + 25%",
        value: 80,
        unit: "percent",
        confidence_level: "high",
        interpretation:
          "80% потока завязано на трёх источниках; диверсификация есть, но распределение не полностью равномерное.",
      },
      {
        metric: "Максимальный сезонный пик",
        formula: "max(46%, 30%, 31%, 44%)",
        value: 46,
        unit: "percent",
        confidence_level: "high",
        interpretation:
          "Самый сильный зафиксированный пик спроса заявлен на март.",
      },
      {
        metric: "Максимальный сезонный спад",
        formula: "max(abs(seasonal_decline_percentages))",
        value: null,
        unit: "percent",
        confidence_level: "preliminary",
        interpretation:
          "Числовые значения спадов не заданы; есть только качественное описание слабого начала и конца года.",
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
        metric: "Ограничение capacity",
        formula: "если Demand / Capacity > 1, то поток ограничен обработкой",
        value: "Сильное",
        unit: "качественная оценка",
        confidence_level: "high",
        interpretation:
          "При 13 обращениях и capacity 4 узкое место находится в обработке, а не только в генерации спроса.",
      },
      {
        metric: "Нестабильность потока при мультиканальности",
        formula: "declared_multi_channel + stable_flow_problem_statement",
        value: "Есть",
        unit: "флаг",
        confidence_level: "medium",
        interpretation:
          "Несмотря на 5 источников, бизнес сам называет стабильный поток заявок главной проблемой; качество и повторяемость потока не подтверждены.",
      },
      {
        metric: "Founder-dependent lead handling",
        formula:
          "core_team_size = 2 + founders involved in sales/marketing/operations",
        value: "Высокая зависимость",
        unit: "качественная оценка",
        confidence_level: "high",
        interpretation:
          "Оба основателя одновременно ведут маркетинг, продажи, финансы и операционку, что повышает риск просадки обработки лидов.",
      },
      {
        metric: "Слабая статистическая база",
        formula: "1 sale last period + startup stage + ~6 months in market",
        value: "Очень узкая выборка",
        unit: "качественная оценка",
        confidence_level: "high",
        interpretation:
          "Текущее состояние потока нельзя считать устойчиво измеренным по одной продаже и одному месяцу cash-in.",
      },
      {
        metric: "Риск сезонной волатильности",
        formula: "declared_peaks_numeric + declines_qualitative_only",
        value: "Средний",
        unit: "качественная оценка",
        confidence_level: "medium",
        interpretation:
          "Пики описаны численно, но спады — только словами; это усиливает неопределённость при планировании загрузки и выручки.",
      },
      {
        metric: "Разрыв между целями и текущей системой потока",
        formula: "growth_goals vs current_capacity + 1 active client",
        value: "Существенный",
        unit: "качественная оценка",
        confidence_level: "high",
        interpretation:
          "Цели по 2 новым контрактам за 6 месяцев и 3 стабильным проектам в работе за 12 месяцев опираются на поток, который пока не выглядит устойчиво масштабируемым.",
      },
    ],
  },
  contradictions: {
    contradiction_flag: true,
    contradiction_items: [
      "Формально есть 5 каналов привлечения, но ключевой запрос бизнеса — именно стабильный поток заявок.",
      "Номинально обращений 13 при capacity 4, но за прошлый месяц зафиксирован только 1 клиент, что не позволяет понять, сколько спроса реально качественное.",
      "Заявлены выраженные сезонные пики, но бизнесу около полугода и исторического ряда monthly Revenue нет.",
      "Фокус сегмента — seed SaaS, но накопленный опыт описан шире: ecom, edtech, fintech; это размывает точную картину message-to-demand fit.",
    ],
    impact_on_analysis:
      "Выводы по потоку надёжны в части перегруза capacity и структуры каналов, но слабее в части качества лидов, сезонной амплитуды и истинной конверсии. Поэтому выводы о масштабировании и сезонной модели нужно читать как вероятностные, а не как статистически устойчивые.",
  },
  flow_interpretation: {
    current_flow_state: {
      key_value: "Спрос выше capacity, но поток статистически хрупкий",
      comment:
        "13 обращений при capacity 4 создают перегруз, однако база наблюдений слишком мала для устойчивых выводов по качеству и конверсии.",
    },
    main_flow_loss_pattern: {
      key_value: "Потеря на обработке и упаковке ценности",
      comment:
        "Основной риск — часть лидов не проходит из-за нехватки ресурса и сложной коммуникации оффера до оплаты.",
    },
    scalability_risk:
      "Высокий: текущая структура потока завязана на двух основателях, при этом операционка и проектное управление уже перегружены, а цели на 6–12 месяцев требуют более устойчивой и воспроизводимой обработки входящего спроса.",
    strongest_numeric_signal: {
      key_value: "69.2% потенциально вне capacity",
      comment:
        "Это самый сильный индикатор реального лимита потока: даже при наличии входящих лидов команда успевает покрыть только около 30.8% объёма.",
    },
    flow_reliability:
      "Ниже средней: по структуре каналов и capacity картина ясна, но по конверсии, качеству лидов и сезонной амплитуде выборка слишком мала.",
    capacity_vs_demand_takeaway:
      "Сейчас бизнес ограничен не только генерацией спроса, а в первую очередь способностью качественно обработать уже приходящие обращения. При этом субъективное ощущение нехватки стабильного потока может частично объясняться тем, что номинальный поток не равен стабильному потоку качественных сделок.",
  },
  missing_for_stronger_model: [
    "Помесячная история лидов и продаж минимум за 6–12 месяцев",
    "Сопоставимая конверсия лид → клиент за один и тот же период",
    "Разделение лидов на валовые и квалифицированные",
    "Фактическое время и доля потерь на каждом этапе до оплаты",
    "Помесячный cash-in или выручка по месяцам для проверки сезонности",
  ],
  confidence_note:
    "Самые надёжные выводы касаются перегруза capacity и структуры каналов. Самые слабые зоны — истинная конверсия, качество лидов и сезонная амплитуда. Прогноз Revenue построен как preliminary-сценарий от одного cash-in baseline.",
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
  },
  {
    id: "clients_flow",
    blockNumber: "BLOCK 4",
    title: "Clients & Flow",
    subtitle: "Demand, channels, conversion path",
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
  value: number | string | null,
  unit?: string,
  currency?: string
): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (currency) return formatCurrency(value, currency);
  if (unit === "percent") return formatPercent(value, value % 1 === 0 ? 0 : 2);
  if (unit === "share") return formatPercent(value * 100, 1);
  if (unit === "USD") return formatCurrency(value, "USD");
  if (unit === "x") return `${formatNumber(value, 2)}x`;
  if (unit === "п.п.") return `${formatNumber(value, 0)} п.п.`;
  if (
    unit === "обращений" ||
    unit === "дней" ||
    unit === "лида" ||
    unit === "лидов"
  ) {
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
