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

type AnalyticsManagementPayload = {
  confidence_ui_system: ConfidenceUiSystem;
  input_normalization: {
    analytics_tools_used: string[];
    metrics_tracked: string[];
    unit_economics_presence: {
      value: boolean | null;
      confidence_level: ConfidenceLevel;
    };
    conversion_tracking: {
      value: boolean | null;
      confidence_level: ConfidenceLevel;
    };
    decision_making_model: {
      value: string;
      confidence_level: ConfidenceLevel;
    };
    recent_changes_last_6_months: string[];
    data_usage_level: {
      value: string;
      confidence_level: ConfidenceLevel;
    };
    cross_block_signals: {
      contradictions_present: string;
      metric_visibility_gaps: string;
      decision_dependency_on_founders: string;
    };
    data_quality_note: string;
  };
  exact_metrics_table: {
    rows: Array<{
      metric: string;
      value: number | string | boolean | null;
      comment: string;
    }>;
  };
  inferred_metrics_table: {
    rows: Array<{
      metric: string;
      value: string;
      confidence_level: ConfidenceLevel;
      comment: string;
    }>;
  };
  analytics_management_interpretation: {
    analytics_maturity_level: string;
    decision_model_type: {
      key_value: string;
      comment: string;
    };
    main_management_gap: {
      key_value: string;
      comment: string;
    };
    data_usage_takeaway: string;
    scalability_limit: string;
    most_important_signal: {
      key_value: string;
      comment: string;
    };
  };
  missing_for_stronger_model: string[];
  confidence_note: string;
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


type ProductSalesPayload = {
  confidence_ui_system: ConfidenceUiSystem;
  input_normalization: {
    product_margin_charts: Array<{
      chart_type: string;
      title: string;
      product: string;
      value: number | null;
      unit: string;
      confidence_level: ConfidenceLevel;
    }>;
    sales_model_type: {
      value: string;
      confidence_level: ConfidenceLevel;
    };
    retention_mechanics: string[];
    repeat_sales_signals: string[];
    upsell_presence: {
      value: boolean | null;
      confidence_level: ConfidenceLevel;
    };
    cross_sell_presence: {
      value: boolean | null;
      confidence_level: ConfidenceLevel;
    };
    margin_comparison_chart: {
      chart_type: string;
      series: Array<{
        product: string;
        margin: number | null;
      }>;
    };
    cjm_duration_chart: {
      chart_type: string;
      series: Array<{
        stage: string;
        duration_value: number | null;
        duration_unit: string;
      }>;
    };
    funnel_drop: {
      chart_type: string;
      stages: Array<{
        stage: string;
        relative_drop: number | null;
      }>;
    };
    cross_block_signals: {
      demand_vs_capacity: string;
      team_capacity_pressure: string;
      revenue_concentration_signal: string;
    };
    data_quality_note: string;
  };
  exact_metrics_table: MetricTableData;
  inferred_metrics_table: MetricTableData;
  product_sales_interpretation: {
    product_model_type: string;
    core_revenue_driver: InterpretationItem;
    main_revenue_leak: InterpretationItem;
    scalability_limit: string;
    most_important_numeric_signal: InterpretationItem;
    retention_layer_takeaway: string;
    conversion_visibility: string;
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

const PIE_COLORS = ["#f7d237", "#7dd3fc", "#8b5cf6", "#22c55e", "#f97316"];

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

const CLIENTS_FLOW_PAYLOAD: ClientsFlowPayload = {
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
      x_axis: ["Мар", "Апр", "Сен", "Окт", "M+1", "M+2", "M+3", "M+4", "M+5", "M+6"],
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

const PRODUCT_SALES_PAYLOAD: ProductSalesPayload = {
  "confidence_ui_system": {
    "component": "reliability_dots",
    "dots_total": 3,
    "dot_size_px": 7,
    "gap_px": 4,
    "hover_zone": "group",
    "inactive_style": "low_opacity",
    "levels": {
      "high": {
        "display": "● ● ●",
        "active_dots": 3,
        "tooltip_title": "Устойчивый показатель",
        "tooltip_text": "Можно опираться в выводах."
      },
      "medium": {
        "display": "● ● ○",
        "active_dots": 2,
        "tooltip_title": "Вероятный показатель",
        "tooltip_text": "Можно использовать с оговоркой."
      },
      "preliminary": {
        "display": "● ○ ○",
        "active_dots": 1,
        "tooltip_title": "Предварительный показатель",
        "tooltip_text": "Показывает направление, но требует подтверждения дополнительными данными."
      }
    }
  },
  "input_normalization": {
    "product_margin_charts": [
      {
        "chart_type": "single_metric",
        "title": "Маржинальность продукта",
        "product": "разработка MVP",
        "value": 50,
        "unit": "percent",
        "confidence_level": "medium"
      },
      {
        "chart_type": "single_metric",
        "title": "Маржинальность продукта",
        "product": "Страт Сессии",
        "value": 80,
        "unit": "percent",
        "confidence_level": "medium"
      },
      {
        "chart_type": "single_metric",
        "title": "Маржинальность продукта",
        "product": "автоматизации для бизнеса",
        "value": 30,
        "unit": "percent",
        "confidence_level": "medium"
      }
    ],
    "sales_model_type": {
      "value": "hybrid",
      "confidence_level": "medium"
    },
    "retention_mechanics": [
      "Повторные продажи",
      "Пакеты услуг",
      "Подписка",
      "Апсейлы",
      "Личный менеджер",
      "14-дневное сопровождение после первой оплаты"
    ],
    "repeat_sales_signals": [
      "возвраты клиентов с прошлого опыта",
      "повторные продажи как заявленная механика",
      "пакеты услуг",
      "подписка",
      "апсейлы"
    ],
    "upsell_presence": {
      "value": true,
      "confidence_level": "high"
    },
    "cross_sell_presence": {
      "value": true,
      "confidence_level": "medium"
    },
    "margin_comparison_chart": {
      "chart_type": "bar",
      "series": [
        {
          "product": "разработка MVP",
          "margin": 50
        },
        {
          "product": "Страт Сессии",
          "margin": 80
        },
        {
          "product": "автоматизации для бизнеса",
          "margin": 30
        }
      ]
    },
    "cjm_duration_chart": {
      "chart_type": "bar",
      "series": [
        {
          "stage": "Acquisition",
          "duration_value": 1,
          "duration_unit": "hour"
        },
        {
          "stage": "Activation",
          "duration_value": 1,
          "duration_unit": "hour"
        },
        {
          "stage": "Value Realization",
          "duration_value": 30,
          "duration_unit": "minute"
        },
        {
          "stage": "Conversion",
          "duration_value": 10,
          "duration_unit": "minute"
        },
        {
          "stage": "Retention",
          "duration_value": 14,
          "duration_unit": "day"
        }
      ]
    },
    "funnel_drop": {
      "chart_type": "funnel",
      "stages": [
        {
          "stage": "Acquisition",
          "relative_drop": null
        },
        {
          "stage": "Activation",
          "relative_drop": null
        },
        {
          "stage": "Value",
          "relative_drop": null
        },
        {
          "stage": "Conversion",
          "relative_drop": null
        }
      ]
    },
    "cross_block_signals": {
      "demand_vs_capacity": "Текущий входящий поток выше заявленной capacity, что указывает на потенциальное ограничение масштабирования delivery и квалификации лидов.",
      "team_capacity_pressure": "Продуктово-продажная модель опирается на основателей и проектных подрядчиков, поэтому рост продаж может усиливать ручную нагрузку.",
      "revenue_concentration_signal": "Текущая monetization опирается на один контракт, поэтому продуктовая модель пока зависима от единичных high-ticket сделок."
    },
    "data_quality_note": "Есть данные по маржинальности продуктов, CJM, каналам и capacity, но фактическая база продаж пока минимальна: 1 клиент и 1 контракт, поэтому большинство выводов о стабильности модели предварительные."
  },
  "exact_metrics_table": {
    "columns": [
      "metric",
      "formula",
      "value",
      "unit",
      "confidence_level",
      "interpretation"
    ],
    "rows": [
      {
        "metric": "listed_product_margin_average",
        "formula": "(50% + 80% + 30%) / 3",
        "value": 53.3,
        "unit": "percent",
        "confidence_level": "medium",
        "interpretation": "Средняя заявленная маржинальность продуктовой линейки выглядит рабочей, но не отражает фактический revenue mix."
      },
      {
        "metric": "listed_product_margin_spread",
        "formula": "80% - 30%",
        "value": 50,
        "unit": "percentage_points",
        "confidence_level": "medium",
        "interpretation": "Разброс маржи высокий: продуктовый микс может сильно менять итоговую прибыльность."
      },
      {
        "metric": "average_check",
        "formula": "6100 USD / 1 client",
        "value": 6100,
        "unit": "USD_per_client_contract",
        "confidence_level": "preliminary",
        "interpretation": "Текущая продажа выглядит high-ticket, но выборка недостаточна для устойчивого среднего чека."
      },
      {
        "metric": "retention_presence_flag",
        "formula": "retention mechanics stated",
        "value": 1,
        "unit": "flag",
        "confidence_level": "medium",
        "interpretation": "Retention-слой в модели предусмотрен и формально встроен после первой оплаты."
      },
      {
        "metric": "upsell_presence_flag",
        "formula": "upsell mechanic stated",
        "value": 1,
        "unit": "flag",
        "confidence_level": "high",
        "interpretation": "Апсейл заявлен как часть коммерческой модели."
      },
      {
        "metric": "cross_sell_presence_flag",
        "formula": "multi-product structure + packages/subscription stated",
        "value": 1,
        "unit": "flag",
        "confidence_level": "medium",
        "interpretation": "Есть признаки кросс-продаж между стратегией, реализацией и автоматизациями, но без фактической статистики."
      }
    ]
  },
  "inferred_metrics_table": {
    "columns": [
      "metric",
      "formula",
      "value",
      "unit",
      "confidence_level",
      "interpretation"
    ],
    "rows": [
      {
        "metric": "product_scalability",
        "formula": "qualitative inference from hybrid offer mix + capacity pressure + founder-led delivery",
        "value": "medium_to_low",
        "unit": "qualitative",
        "confidence_level": "medium",
        "interpretation": "Стратегические и MVP-услуги могут хорошо продаваться, но масштабирование ограничивается исполнением и ручным сопровождением."
      },
      {
        "metric": "margin_stability",
        "formula": "inference from 50 p.p. product margin spread + limited sales history",
        "value": "volatile",
        "unit": "qualitative",
        "confidence_level": "preliminary",
        "interpretation": "Итоговая маржа будет нестабильной, пока не закрепится продуктовый микс и частота повторных продаж."
      },
      {
        "metric": "conversion_predictability",
        "formula": "inference from metrics tracking stated but no numeric funnel provided",
        "value": "partially_visible",
        "unit": "qualitative",
        "confidence_level": "medium",
        "interpretation": "Воронка концептуально описана и KPI отслеживаются, но численно Conversion Rate пока не прозрачен."
      },
      {
        "metric": "dependency_on_high_ticket_sales",
        "formula": "inference from 1 client contract and current revenue concentration",
        "value": "high",
        "unit": "qualitative",
        "confidence_level": "preliminary",
        "interpretation": "На текущем этапе выручка продуктовой модели зависит от единичных крупных сделок."
      },
      {
        "metric": "delivery_bottleneck_impact",
        "formula": "inference from 13 leads vs 4 capacity + 2-person team",
        "value": "high",
        "unit": "qualitative",
        "confidence_level": "medium",
        "interpretation": "Даже при росте спроса часть продаж может не монетизироваться из-за ограничений обработки и delivery."
      }
    ]
  },
  "product_sales_interpretation": {
    "product_model_type": "Гибридная сервисная модель: one-off high-ticket проекты с попыткой достроить subscription/retention слой через сопровождение, пакеты и апсейлы.",
    "core_revenue_driver": {
      "key_value": "High-ticket проектная продажа с потенциальным входом через более маржинальные страт-сессии",
      "comment": "По текущим данным основная monetization приходит через крупный контракт, а самым маржинальным продуктом выглядят страт-сессии, которые могут работать как entry/offer для последующего расширения чека."
    },
    "main_revenue_leak": {
      "key_value": "Ручная delivery-нагрузка и незафиксированная численно конверсия",
      "comment": "При спросе выше capacity рост заявок не равен росту выручки; дополнительно в CJM есть риск потери на объяснении ценности и сложности формулировок."
    },
    "scalability_limit": "Главное ограничение модели — founder-led и delivery-heavy формат: продажи можно наращивать каналами, но исполнение, сопровождение и кастомизация проектов пока делают масштабирование неровным. Для целей роста без раздувания затрат модели нужен более стандартизированный продуктовый вход и повторяемый post-sale слой.",
    "most_important_numeric_signal": {
      "key_value": "13 leads при capacity 4",
      "comment": "Это сигнал не столько о нехватке спроса, сколько о том, что текущая продуктово-продажная система уже чувствительна к операционному узкому месту."
    },
    "retention_layer_takeaway": "Retention в модели заложен не как классическое долгосрочное удержание, а как короткий пост-оплатный мост в повторные услуги, апсейлы и потенциальную подписку. Это правильно для service-бизнеса, но фактическая глубина Retention пока не подтверждена данными.",
    "conversion_visibility": "Воронка описана по этапам и времени прохождения, а метрики команда заявляет как отслеживаемые, поэтому модель управляемая в теории. Но без численных переходов между стадиями Conversion Rate и точки основной просадки остаются вероятностными, а не доказанными."
  },
  "missing_for_stronger_model": [
    "Фактическая выручка по каждому продукту за период, чтобы понять реальный product mix.",
    "Conversion Rate между этапами CJM: visit → lead → meeting/demo → proposal → deal.",
    "Доля repeat sales / renewals / upsells в общей выручке.",
    "Средняя длительность сделки от лида до оплаты по фактическим кейсам, а не по ideal CJM.",
    "Сколько delivery-часов и команды требует каждый продукт, чтобы отделить маржинальный продукт от ресурсоемкого."
  ],
  "confidence_note": "Продуктовая архитектура и sales-логика читаются, но устойчивость модели пока нельзя считать доказанной из-за одной фактической сделки. Наиболее надежны выводы о типе модели, маржинальности заявленных продуктов и наличии retention-механик. Выводы о high-ticket зависимости и масштабируемости предварительны, но логически сильны."
};

const ANALYTICS_MANAGEMENT_PAYLOAD: AnalyticsManagementPayload = {
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
    analytics_tools_used: [
      "Финансовая модель",
      "Сегментация клиентов",
      "LTV / CAC",
      "Конверсии и воронка продаж",
      "TAM/SAM/SOM",
    ],
    metrics_tracked: [
      "Revenue",
      "Margin",
      "CAC",
      "Average Check",
      "Conversion to Sale",
      "Retention",
      "Team Load",
      "Cash Flow",
      "Sales Cycle Speed",
      "Project Complexity",
    ],
    unit_economics_presence: {
      value: true,
      confidence_level: "medium",
    },
    conversion_tracking: {
      value: true,
      confidence_level: "medium",
    },
    decision_making_model: {
      value: "Совместное founder-led принятие решений без выделенного owner по функции",
      confidence_level: "high",
    },
    recent_changes_last_6_months: [
      "Автоматизация брифинга",
      "Создание структурированного клиентского workspace",
      "Общий контур прозрачности по проектным данным для клиента",
    ],
    data_usage_level: {
      value: "Частично data-driven: метрики и модели заявлены, но фактическая база наблюдений пока минимальна",
      confidence_level: "medium",
    },
    cross_block_signals: {
      contradictions_present:
        "Есть слабая консистентность базы данных: заявлены LTV/CAC, retention и сезонность, но фактическая история очень короткая и клиентская база почти отсутствует для устойчивых выводов.",
      metric_visibility_gaps:
        "Воронка описана качественно, но нет количественной декомпозиции по этапам; входящий поток известен, capacity известен, но conversion по этапам не показана.",
      decision_dependency_on_founders:
        "Критически высокая: оба основателя участвуют почти во всех функциях и совместно принимают решения.",
    },
    data_quality_note:
      "Метрики и управленческий язык присутствуют, но значительная часть выводов пока опирается на раннюю стадию бизнеса и единичные наблюдения.",
  },
  exact_metrics_table: {
    rows: [
      {
        metric: "analytics_tools_count",
        value: 5,
        comment: "Перечислены 5 аналитических подходов/моделей",
      },
      {
        metric: "metrics_tracking_flag",
        value: true,
        comment: "Назван регулярный набор KPI",
      },
      {
        metric: "conversion_tracking_flag",
        value: true,
        comment: "Конверсия и воронка продаж явно указаны",
      },
      {
        metric: "unit_economics_presence_flag",
        value: true,
        comment: "Указаны CAC, LTV/CAC, маржа и продуктовая маржинальность",
      },
    ],
  },
  inferred_metrics_table: {
    rows: [
      {
        metric: "analytics_maturity",
        value: "medium",
        confidence_level: "medium",
        comment:
          "Каркас аналитики есть, но база наблюдений еще слишком мала для устойчивой модели управления.",
      },
      {
        metric: "decision_quality",
        value: "medium",
        confidence_level: "medium",
        comment:
          "Решения принимаются быстро и совместно, но без явного owner'а и с высокой загрузкой founders.",
      },
      {
        metric: "reaction_speed",
        value: "high",
        confidence_level: "medium",
        comment:
          "Небольшая команда и уже внедренные изменения за 6 месяцев указывают на высокую скорость реакции.",
      },
      {
        metric: "metric_dependency",
        value: "medium",
        confidence_level: "preliminary",
        comment:
          "Бизнес декларирует опору на цифры, но часть решений пока неизбежно строится на гипотезах из-за малого объема данных.",
      },
      {
        metric: "management_scalability",
        value: "low",
        confidence_level: "high",
        comment:
          "Управленческий контур плохо масштабируется из-за концентрации решений и контроля на двух основателях.",
      },
    ],
  },
  analytics_management_interpretation: {
    analytics_maturity_level:
      "Средний, но неустойчивый уровень: бизнес видит ключевые экономические показатели, однако пока не имеет достаточной глубины данных для надежного управленческого цикла.",
    decision_model_type: {
      key_value: "founder-led collaborative",
      comment:
        "Система принятия решений существует, но она завязана на двух фаундерах, без явного распределения ownership по аналитике, операционке и коммерческому контуру.",
    },
    main_management_gap: {
      key_value: "Недостаточная количественная прозрачность воронки и перегруз founders",
      comment:
        "Метрики названы, но нет числовой декомпозиции по этапам воронки, а управленческие решения и контроль одновременно сидят на двух людях. Это ограничивает качество приоритизации и мешает масштабируемости.",
    },
    data_usage_takeaway:
      "Бизнес скорее понимает свою экономику, чем не понимает: есть язык маржи, CAC, LTV/CAC, product-level маржинальности и cash flow. Но управляемость еще не доказана, потому что фактическая выборка мала, retention и сезонность пока не подтверждены длинным горизонтом данных, а conversion visibility неполная.",
    scalability_limit:
      "Главный предел масштабирования — отсутствие отделения операционного и аналитического управления от founders. При росте входящего потока и числа проектов текущий контур начнет терять скорость и точность решений.",
    most_important_signal: {
      key_value: "Метрики есть, но feedback loop короткий и хрупкий",
      comment:
        "Наличие KPI, финансовой модели и недавних внедрений — сильный сигнал. Но единичная клиентская база, неполная количественная воронка и высокая зависимость от founders означают, что система управления пока формируется, а не работает как устойчивая машина.",
    },
  },
  missing_for_stronger_model: [
    "Количественная воронка по этапам: visits -> leads -> calls -> offers -> deals -> repeat",
    "Фактический CAC по каналам и payback period",
    "Подтвержденный retention / repeat purchase rate на реальных когортах",
    "Юнит-экономика по каждому ключевому продукту с учетом трудозатрат команды и подрядчиков",
    "Регламент принятия решений: кто owner по маркетингу, продажам, финансам и проектному управлению",
  ],
  confidence_note:
    "Выводы по наличию аналитического каркаса достаточно надежны: метрики и модели названы явно. Выводы по качеству управления и unit-экономике ограничены ранней стадией и крайне малой выборкой клиентов. Поэтому зрелость аналитики оценена как medium, а часть управленческих выводов — preliminary.",
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
  if (unit === "percentage_points") return `${formatNumber(value, 0)} p.p.`;
  if (unit === "USD_per_client_contract") return `${formatCurrency(value, "USD")} / contract`;
  if (unit === "flag") return value === 1 ? "Yes" : value === 0 ? "No" : String(value);
  if (unit === "qualitative") return String(value);
  if (unit === "minute") return `${formatNumber(value)} min`;
  if (unit === "day") return `${formatNumber(value)} d`;
  if (unit === "hour") return `${formatNumber(value)} h`;
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

function maxSeriesValue(...collections: Array<Array<number | null>>) {
  const values = collections.flat().filter((v): v is number => typeof v === "number");
  return values.length ? Math.max(...values) : 1;
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

function ParagraphCard({
  title,
  text,
  tone = "default",
}: {
  title: string;
  text: string;
  tone?: "default" | "warning" | "accent";
}) {
  const toneClasses =
    tone === "warning"
      ? "border-red-400/18 bg-red-400/8"
      : tone === "accent"
      ? "border-[#f7d237]/18 bg-[#f7d237]/8"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={cn("rounded-[24px] border p-5", toneClasses)}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        {title}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/74">{text}</p>
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

function PieCard({
  chart,
  label = "Normalized input",
}: {
  chart: PieChartData;
  label?: string;
}) {
  const total = chart.series.reduce((sum, item) => sum + item.value, 0);

  return (
    <GlassCard className="p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        {label}
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

function ContradictionTextCard({ text }: { text: string }) {
  return (
    <div className="rounded-[24px] border border-red-400/18 bg-red-400/8 p-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-red-100/85">
        contradiction
      </div>
      <p className="mt-3 text-sm leading-7 text-white/78">{text}</p>
    </div>
  );
}

function ForecastBars({
  chart,
}: {
  chart: ClientsFlowPayload["visual_blocks"]["seasonality_revenue_percent_chart"];
}) {
  const maxRevenue = maxSeriesValue(
    chart.historical_bars_series.values,
    chart.forecast_bars_series.values
  );
  const maxPercent = maxSeriesValue(
    chart.historical_line_series.values,
    chart.forecast_line_series.values
  );

  return (
    <GlassCard className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
            visual block
          </div>
          <div className="mt-2 text-xl font-semibold text-white">
            {chart.title}
          </div>
        </div>
        <ReliabilityDots level={chart.confidence_level} system={CLIENTS_FLOW_PAYLOAD.confidence_ui_system} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5 xl:grid-cols-10">
        {chart.x_axis.map((label, index) => {
          const historicalRevenue = chart.historical_bars_series.values[index];
          const forecastRevenue = chart.forecast_bars_series.values[index];
          const historicalPercent = chart.historical_line_series.values[index];
          const forecastPercent = chart.forecast_line_series.values[index];

          const revenue = historicalRevenue ?? forecastRevenue;
          const percent = historicalPercent ?? forecastPercent;
          const isForecast = historicalRevenue == null && forecastRevenue != null;

          return (
            <div
              key={`${label}-${index}`}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="text-center text-[11px] uppercase tracking-[0.16em] text-white/46">
                {label}
              </div>

              <div className="mt-4 flex h-[150px] items-end justify-center gap-2">
                <div className="flex h-full w-10 items-end rounded-full bg-white/6 p-1">
                  <div
                    className={cn(
                      "w-full rounded-full",
                      isForecast ? "bg-[#7dd3fc]" : "bg-[#f7d237]"
                    )}
                    style={{
                      height: revenue ? `${Math.max((revenue / maxRevenue) * 100, 8)}%` : "0%",
                    }}
                  />
                </div>

                <div className="flex h-full w-6 items-end rounded-full bg-white/6 p-1">
                  <div
                    className="w-full rounded-full bg-[#8b5cf6]"
                    style={{
                      height: percent ? `${Math.max((percent / maxPercent) * 100, 8)}%` : "0%",
                    }}
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1 text-center">
                <div className="text-xs text-white/76">
                  {revenue !== null && revenue !== undefined
                    ? formatCurrency(revenue, chart.anchor_baseline.currency)
                    : "—"}
                </div>
                <div className="text-xs text-white/46">
                  {percent !== null && percent !== undefined
                    ? formatPercent(percent)
                    : "—"}
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/34">
                  {isForecast ? "forecast" : "historical"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <ParagraphCard
          title="data_completeness"
          text={chart.data_completeness}
        />
        <ParagraphCard
          title="note"
          text={chart.note}
          tone="accent"
        />
      </div>
    </GlassCard>
  );
}

function JourneyMap({
  title,
  stages,
}: {
  title: string;
  stages: ClientsFlowStage[];
}) {
  return (
    <GlassCard className="p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        visual block
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>

      <div className="mt-6 grid gap-4 xl:grid-cols-5">
        {stages.map((stage, index) => (
          <div
            key={`${stage.stage}-${index}`}
            className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
              {stage.stage}
            </div>
            <div className="mt-2 text-sm font-semibold text-white/84">
              {stage.duration}
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/38">
                  client_value
                </div>
                <div className="mt-1 text-sm leading-6 text-white/72">
                  {stage.client_value}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/38">
                  company_value
                </div>
                <div className="mt-1 text-sm leading-6 text-white/72">
                  {stage.company_value}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/38">
                  friction_point
                </div>
                <div className="mt-1 text-sm leading-6 text-white/72">
                  {stage.friction_point}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function ForecastModelCard({
  data,
}: {
  data: ClientsFlowPayload["forecast_model"];
}) {
  return (
    <GlassCard className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
            forecast model
          </div>
          <div className="mt-2 text-xl font-semibold text-white">
            {data.scenario_type}
          </div>
        </div>
        <ReliabilityDots
          level={data.confidence_level}
          system={CLIENTS_FLOW_PAYLOAD.confidence_ui_system}
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <InsightCard
          title="horizon_months"
          value={`${data.horizon_months}`}
          text="Горизонт модели."
        />
        <InsightCard
          title="baseline_value"
          value={formatCurrency(data.baseline_value, data.baseline_currency)}
          text="Базовый cash-in для расчёта сценария."
        />
        <ParagraphCard title="model_logic" text={data.model_logic} />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[860px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Month
              </th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Revenue
              </th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Seasonality
              </th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Assumption
              </th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Reliability
              </th>
            </tr>
          </thead>
          <tbody>
            {data.forecast_points.map((point) => (
              <tr
                key={point.month_label}
                className="border-b border-white/8 align-top last:border-b-0"
              >
                <td className="px-4 py-4 text-sm font-medium text-white">
                  {point.month_label}
                </td>
                <td className="px-4 py-4 text-sm text-white/72">
                  {point.modeled_revenue !== null
                    ? formatCurrency(point.modeled_revenue, data.baseline_currency)
                    : "—"}
                </td>
                <td className="px-4 py-4 text-sm text-white/72">
                  {point.seasonal_percent_assumption !== null
                    ? formatPercent(point.seasonal_percent_assumption)
                    : "—"}
                </td>
                <td className="px-4 py-4 text-sm text-white/62">
                  {point.assumption_type}
                </td>
                <td className="px-4 py-4 text-sm text-white/62">
                  <ReliabilityDots
                    level={point.confidence_level}
                    system={CLIENTS_FLOW_PAYLOAD.confidence_ui_system}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <ParagraphCard title="note" text={data.note} tone="accent" />
      </div>
    </GlassCard>
  );
}


function MiniBarChart({
  title,
  series,
  valueKey,
  labelKey,
  suffix = "%",
}: {
  title: string;
  series: Array<Record<string, string | number | null>>;
  valueKey: string;
  labelKey: string;
  suffix?: string;
}) {
  const max = Math.max(
    1,
    ...series.map((item) =>
      typeof item[valueKey] === "number" ? Number(item[valueKey]) : 0
    )
  );

  return (
    <GlassCard className="p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        chart
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>

      <div className="mt-6 space-y-4">
        {series.map((item, index) => {
          const label = String(item[labelKey] ?? "—");
          const value =
            typeof item[valueKey] === "number" ? Number(item[valueKey]) : null;

          return (
            <div key={`${title}-${label}-${index}`}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm text-white/72">{label}</span>
                <span className="text-sm font-semibold text-white">
                  {value === null ? "—" : `${formatNumber(value, value % 1 === 0 ? 0 : 1)}${suffix}`}
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/8">
                <div
                  className="h-3 rounded-full bg-[#f7d237]"
                  style={{
                    width: value === null ? "0%" : `${Math.max((value / max) * 100, 6)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function ProductSalesFunnel({
  title,
  stages,
}: {
  title: string;
  stages: Array<{ stage: string; relative_drop: number | null }>;
}) {
  return (
    <GlassCard className="p-5">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#f7d237]">
        chart
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{title}</div>

      <div className="mt-6 space-y-3">
        {stages.map((item, index) => (
          <div
            key={`${item.stage}-${index}`}
            className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/72">{item.stage}</span>
              <span className="text-sm font-semibold text-white">
                {item.relative_drop === null ? "n/a" : `${formatPercent(item.relative_drop)}`}
              </span>
            </div>
            <div className="mt-3 h-3 rounded-full bg-white/8">
              <div
                className="h-3 rounded-full bg-[#7dd3fc]"
                style={{
                  width:
                    item.relative_drop === null
                      ? "10%"
                      : `${Math.max(Math.min(item.relative_drop, 100), 8)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function SignalPill({
  label,
  value,
  level,
  system,
}: {
  label: string;
  value: string;
  level: ConfidenceLevel;
  system: ConfidenceUiSystem;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
          {label}
        </div>
        <ReliabilityDots level={level} system={system} compact />
      </div>
      <div className="mt-3 text-base font-medium text-white">
        {value}
      </div>
    </div>
  );
}

function ExactAnalyticsTable({
  title,
  rows,
}: {
  title: string;
  rows: AnalyticsManagementPayload["exact_metrics_table"]["rows"];
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
        <table className="min-w-[760px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Metric
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Value
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${title}-${row.metric}`}
                className="border-b border-white/8 align-top last:border-b-0"
              >
                <td className="px-5 py-5 text-sm font-medium text-white">
                  {row.metric}
                </td>
                <td className="px-5 py-5 text-sm font-semibold text-white">
                  {typeof row.value === "boolean"
                    ? row.value
                      ? "Yes"
                      : "No"
                    : String(row.value)}
                </td>
                <td className="px-5 py-5 text-sm leading-7 text-white/62">
                  {row.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function InferredAnalyticsTable({
  title,
  rows,
  system,
}: {
  title: string;
  rows: AnalyticsManagementPayload["inferred_metrics_table"]["rows"];
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
        <table className="min-w-[920px] w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-left">
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Metric
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Value
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Reliability
              </th>
              <th className="px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${title}-${row.metric}`}
                className="border-b border-white/8 align-top last:border-b-0"
              >
                <td className="px-5 py-5 text-sm font-medium text-white">
                  {row.metric}
                </td>
                <td className="px-5 py-5 text-sm font-semibold text-white">
                  {row.value}
                </td>
                <td className="px-5 py-5 text-sm text-white/62">
                  <ReliabilityDots level={row.confidence_level} system={system} />
                </td>
                <td className="px-5 py-5 text-sm leading-7 text-white/62">
                  {row.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
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

function ClientsFlowResultsCard({
  card,
  data,
  onOpen,
}: {
  card: ThemeCard;
  data: ClientsFlowPayload;
  onOpen: () => void;
}) {
  const missingPreview = data.missing_for_stronger_model.slice(0, 3);

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
            {data.confidence_note}
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


function ProductSalesResultsCard({
  card,
  data,
  onOpen,
}: {
  card: ThemeCard;
  data: ProductSalesPayload;
  onOpen: () => void;
}) {
  const missingPreview = data.missing_for_stronger_model.slice(0, 3);

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
            {data.confidence_note}
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
function AnalyticsManagementResultsCard({
  card,
  data,
  onOpen,
}: {
  card: ThemeCard;
  data: AnalyticsManagementPayload;
  onOpen: () => void;
}) {
  const missingPreview = data.missing_for_stronger_model.slice(0, 3);

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
            {data.confidence_note}
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
              Полный разворот блока positioning.
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
            text="Краткое верхнеуровневое чтение positioning-модели."
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
          <ParagraphCard title="business_stage" text={data.business_stage.stage} />
          <ParagraphCard title="positioning_type" text={data.positioning_type.type} />
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <ParagraphCard title="core_offer" text={data.core_offer.value} />
          <ParagraphCard title="client_pays_for" text={data.core_offer.client_pays_for} tone="accent" />
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <ParagraphCard title="target_client" text={data.target_client.segment} />
          <ParagraphCard title="target_logic" text={data.target_client.logic} />
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <ParagraphCard title="market_scope" text={data.market_scope.scope} />
          <ParagraphCard title="market_note" text={data.market_scope.note} />
        </section>

        <section className="mb-8 grid gap-4 xl:grid-cols-2">
          <ParagraphCard title="delivery_model" text={data.delivery_model.type} />
          <ParagraphCard
            title="founder_dependency"
            text={data.delivery_model.founder_dependency}
            tone="warning"
          />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="risks" title="Positioning risks" />
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
                  <ReliabilityDots level={item.confidence} system={system} compact />
                </div>
                <p className="mt-3 text-sm leading-7 text-white/78">
                  {item.risk}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-6">
          <SectionHead eyebrow="takeaway" title="Positioning takeaway" />
          <ParagraphCard title="takeaway" text={data.takeaway} />
        </section>
      </div>
    </div>
  );
}
function AnalyticsManagementDrawer({
  data,
  onClose,
}: {
  data: AnalyticsManagementPayload;
  onClose: () => void;
}) {
  const system = data.confidence_ui_system;

  return (
    <div className="flex h-full flex-col bg-[#081932]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#081932]/92 px-5 py-4 backdrop-blur-xl md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Block 6
            </div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
              Analytics & Management
            </div>
            <div className="mt-2 text-sm text-white/58">
              Полный payload-разворот блока analytics_management.
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
            eyebrow="analytics management overview"
            title="Executive signal"
            text="Ключевая интерпретация зрелости аналитики, управленческого контура и масштабируемости решений."
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <InsightCard
              title="analytics_maturity_level"
              value="Analytics maturity"
              text={data.analytics_management_interpretation.analytics_maturity_level}
            />
            <InsightCard
              title="decision_model_type"
              value={data.analytics_management_interpretation.decision_model_type.key_value}
              text={data.analytics_management_interpretation.decision_model_type.comment}
            />
            <InsightCard
              title="main_management_gap"
              value={data.analytics_management_interpretation.main_management_gap.key_value}
              text={data.analytics_management_interpretation.main_management_gap.comment}
            />
            <InsightCard
              title="most_important_signal"
              value={data.analytics_management_interpretation.most_important_signal.key_value}
              text={data.analytics_management_interpretation.most_important_signal.comment}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <ParagraphCard
              title="data_usage_takeaway"
              text={data.analytics_management_interpretation.data_usage_takeaway}
            />
            <ParagraphCard
              title="scalability_limit"
              text={data.analytics_management_interpretation.scalability_limit}
              tone="warning"
            />
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="confidence_note"
              text={data.confidence_note}
              tone="accent"
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="input normalization"
            title="Normalized inputs"
            text="Все нормализованные входы analytics_management."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SignalPill
              label="unit_economics_presence"
              value={data.input_normalization.unit_economics_presence.value ? "Yes" : "No"}
              level={data.input_normalization.unit_economics_presence.confidence_level}
              system={system}
            />
            <SignalPill
              label="conversion_tracking"
              value={data.input_normalization.conversion_tracking.value ? "Yes" : "No"}
              level={data.input_normalization.conversion_tracking.confidence_level}
              system={system}
            />
            <SignalPill
              label="decision_making_model"
              value={data.input_normalization.decision_making_model.value}
              level={data.input_normalization.decision_making_model.confidence_level}
              system={system}
            />
            <SignalPill
              label="data_usage_level"
              value={data.input_normalization.data_usage_level.value}
              level={data.input_normalization.data_usage_level.confidence_level}
              system={system}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="analytics_tools_used"
              items={data.input_normalization.analytics_tools_used}
            />
            <BulletList
              title="metrics_tracked"
              items={data.input_normalization.metrics_tracked}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="recent_changes_last_6_months"
              items={data.input_normalization.recent_changes_last_6_months}
            />
            <ParagraphCard
              title="data_quality_note"
              text={data.input_normalization.data_quality_note}
              tone="accent"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            <ParagraphCard
              title="contradictions_present"
              text={data.input_normalization.cross_block_signals.contradictions_present}
            />
            <ParagraphCard
              title="metric_visibility_gaps"
              text={data.input_normalization.cross_block_signals.metric_visibility_gaps}
            />
            <ParagraphCard
              title="decision_dependency_on_founders"
              text={data.input_normalization.cross_block_signals.decision_dependency_on_founders}
              tone="warning"
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="exact metrics" title="Exact metrics table" />
          <ExactAnalyticsTable
            title="Exact metrics"
            rows={data.exact_metrics_table.rows}
          />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="inferred metrics" title="Inferred metrics table" />
          <InferredAnalyticsTable
            title="Inferred metrics"
            rows={data.inferred_metrics_table.rows}
            system={system}
          />
        </section>

        <section className="pb-6">
          <SectionHead
            eyebrow="model gaps"
            title="Missing for stronger model"
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
              Полный разворот блока economics.
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
            text="Верхний слой ключевых сигналов."
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
              value={data.economic_interpretation.most_important_numeric_signal.key_value}
              text={data.economic_interpretation.most_important_numeric_signal.comment}
            />
            <ParagraphCard
              title="reliability_of_current_margin"
              text={data.economic_interpretation.reliability_of_current_margin}
              tone="accent"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <ParagraphCard
              title="scalability_risk"
              text={data.economic_interpretation.scalability_risk}
              tone="warning"
            />
            <ParagraphCard
              title="confidence_note"
              text={data.confidence_note}
              tone="accent"
            />
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="capacity_vs_demand_takeaway"
              text={data.economic_interpretation.capacity_vs_demand_takeaway}
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="input normalization"
            title="Normalized inputs"
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <NormalizedInputCard
              label="Retained share after expenses"
              field={data.input_normalization.reported_retained_share_after_expenses}
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

          <div className="mt-4">
            <ParagraphCard
              title="data_quality_note"
              text={data.input_normalization.data_quality_note}
              tone="accent"
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="exact metrics" title="Exact metrics table" />
          <MetricsTable title="Exact metrics" data={data.exact_metrics_table} system={system} />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="inferred metrics" title="Inferred metrics table" />
          <MetricsTable title="Inferred metrics" data={data.inferred_metrics_table} system={system} />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="contradictions" title="Model contradictions" />
          <div className="grid gap-4">
            {data.contradictions.contradiction_items.map((item) => (
              <ContradictionCard key={item.issue} item={item} />
            ))}
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="impact_on_analysis"
              text={data.contradictions.impact_on_analysis}
            />
          </div>
        </section>

        <section className="pb-6">
          <SectionHead eyebrow="model gaps" title="Missing for stronger model" />
          <BulletList
            title="missing_for_stronger_model"
            items={data.missing_for_stronger_model}
          />
        </section>
      </div>
    </div>
  );
}

function ClientsFlowDrawer({
  data,
  onClose,
}: {
  data: ClientsFlowPayload;
  onClose: () => void;
}) {
  const system = data.confidence_ui_system;

  return (
    <div className="flex h-full flex-col bg-[#081932]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#081932]/92 px-5 py-4 backdrop-blur-xl md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Block 4
            </div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
              Clients & Flow
            </div>
            <div className="mt-2 text-sm text-white/58">
              Полный payload-разворот блока clients_flow.
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
            eyebrow="clients flow overview"
            title="Executive signal"
            text="Ключевая интерпретация потока, потерь и ограничений масштабирования."
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <InsightCard
              title="current_flow_state"
              value={data.flow_interpretation.current_flow_state.key_value}
              text={data.flow_interpretation.current_flow_state.comment}
            />
            <InsightCard
              title="main_flow_loss_pattern"
              value={data.flow_interpretation.main_flow_loss_pattern.key_value}
              text={data.flow_interpretation.main_flow_loss_pattern.comment}
            />
            <InsightCard
              title="strongest_numeric_signal"
              value={data.flow_interpretation.strongest_numeric_signal.key_value}
              text={data.flow_interpretation.strongest_numeric_signal.comment}
            />
            <ParagraphCard
              title="flow_reliability"
              text={data.flow_interpretation.flow_reliability}
              tone="accent"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <ParagraphCard
              title="scalability_risk"
              text={data.flow_interpretation.scalability_risk}
              tone="warning"
            />
            <ParagraphCard
              title="confidence_note"
              text={data.confidence_note}
              tone="accent"
            />
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="capacity_vs_demand_takeaway"
              text={data.flow_interpretation.capacity_vs_demand_takeaway}
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="input normalization"
            title="Normalized inputs"
            text="Все нормализованные входы clients_flow."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <NormalizedInputCard
              label="Target segment"
              field={{
                value: data.input_normalization.target_segment.value,
                confidence_level: data.input_normalization.target_segment.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Most profitable segment if stated"
              field={{
                value: data.input_normalization.most_profitable_segment_if_stated.value,
                confidence_level:
                  data.input_normalization.most_profitable_segment_if_stated.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Lead volume"
              field={{
                value: data.input_normalization.lead_volume.value,
                confidence_level: data.input_normalization.lead_volume.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Processing capacity"
              field={{
                value: data.input_normalization.processing_capacity.value,
                confidence_level: data.input_normalization.processing_capacity.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Actual clients or sales last period"
              field={{
                value: data.input_normalization.actual_clients_or_sales_last_period.value,
                confidence_level:
                  data.input_normalization.actual_clients_or_sales_last_period.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Last month cash-in"
              field={{
                value: data.input_normalization.last_month_cash_in.value,
                currency: data.input_normalization.last_month_cash_in.currency,
                confidence_level: data.input_normalization.last_month_cash_in.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Core team size"
              field={{
                value: data.input_normalization.core_team_size.value,
                confidence_level: data.input_normalization.core_team_size.confidence_level,
              }}
              system={system}
            />
            <NormalizedInputCard
              label="Stable flow problem"
              field={{
                value: data.input_normalization.stable_flow_problem_statement.value,
                confidence_level:
                  data.input_normalization.stable_flow_problem_statement.confidence_level,
              }}
              system={system}
            />
          </div>

          <div className="mt-4">
            <PieCard
              chart={data.input_normalization.channel_mix_chart}
              label="Channel mix"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="declared_lead_sources"
              items={data.input_normalization.declared_lead_sources}
            />
            <BulletList
              title="core_team_display"
              items={data.input_normalization.core_team_display}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="seasonal_peak_months"
              items={data.input_normalization.seasonal_peak_months.map(
                (item) => `${item.month} — ${formatPercent(item.percent)}`
              )}
            />
            <BulletList
              title="seasonal_decline_months_if_numeric"
              items={
                data.input_normalization.seasonal_decline_months_if_numeric.length
                  ? data.input_normalization.seasonal_decline_months_if_numeric.map(
                      (item) => `${item.month} — ${formatPercent(item.percent)}`
                    )
                  : ["Числовые спады не указаны."]
              }
            />
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="data_quality_note"
              text={data.input_normalization.data_quality_note}
              tone="accent"
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="visual blocks"
            title="Seasonality and journey"
            text="Графические данные из payload."
          />

          <ForecastBars chart={data.visual_blocks.seasonality_revenue_percent_chart} />
          <div className="mt-4">
            <JourneyMap
              title={data.visual_blocks.mini_journey_map.title}
              stages={data.visual_blocks.mini_journey_map.stages}
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="forecast model"
            title="Scenario forecast"
          />
          <ForecastModelCard data={data.forecast_model} />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="exact metrics" title="Exact metrics table" />
          <MetricsTable
            title="Exact metrics"
            data={data.exact_metrics_table}
            system={system}
          />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="inferred metrics" title="Inferred metrics table" />
          <MetricsTable
            title="Inferred metrics"
            data={data.inferred_metrics_table}
            system={system}
          />
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="contradictions"
            title="Flow contradictions"
          />
          <div className="grid gap-4">
            {data.contradictions.contradiction_items.map((item, index) => (
              <ContradictionTextCard key={`${item}-${index}`} text={item} />
            ))}
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="impact_on_analysis"
              text={data.contradictions.impact_on_analysis}
            />
          </div>
        </section>

        <section className="pb-6">
          <SectionHead
            eyebrow="model gaps"
            title="Missing for stronger model"
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


function ProductSalesDrawer({
  data,
  onClose,
}: {
  data: ProductSalesPayload;
  onClose: () => void;
}) {
  const system = data.confidence_ui_system;

  return (
    <div className="flex h-full flex-col bg-[#081932]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#081932]/92 px-5 py-4 backdrop-blur-xl md:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#f7d237]">
              Block 5
            </div>
            <div className="mt-2 text-2xl font-semibold text-white md:text-[30px]">
              Product & Sales
            </div>
            <div className="mt-2 text-sm text-white/58">
              Полный payload-разворот блока product_sales.
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
            eyebrow="product sales overview"
            title="Executive signal"
            text="Ключевая интерпретация продуктовой модели, монетизации и ограничений масштабирования."
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <InsightCard
              title="product_model_type"
              value="Hybrid product-sales model"
              text={data.product_sales_interpretation.product_model_type}
            />
            <InsightCard
              title="core_revenue_driver"
              value={data.product_sales_interpretation.core_revenue_driver.key_value}
              text={data.product_sales_interpretation.core_revenue_driver.comment}
            />
            <InsightCard
              title="main_revenue_leak"
              value={data.product_sales_interpretation.main_revenue_leak.key_value}
              text={data.product_sales_interpretation.main_revenue_leak.comment}
            />
            <InsightCard
              title="most_important_numeric_signal"
              value={data.product_sales_interpretation.most_important_numeric_signal.key_value}
              text={data.product_sales_interpretation.most_important_numeric_signal.comment}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <ParagraphCard
              title="scalability_limit"
              text={data.product_sales_interpretation.scalability_limit}
              tone="warning"
            />
            <ParagraphCard
              title="confidence_note"
              text={data.confidence_note}
              tone="accent"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <ParagraphCard
              title="retention_layer_takeaway"
              text={data.product_sales_interpretation.retention_layer_takeaway}
            />
            <ParagraphCard
              title="conversion_visibility"
              text={data.product_sales_interpretation.conversion_visibility}
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="input normalization"
            title="Normalized inputs"
            text="Все нормализованные входы product_sales."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SignalPill
              label="sales_model_type"
              value={data.input_normalization.sales_model_type.value}
              level={data.input_normalization.sales_model_type.confidence_level}
              system={system}
            />
            <SignalPill
              label="upsell_presence"
              value={data.input_normalization.upsell_presence.value ? "Yes" : "No"}
              level={data.input_normalization.upsell_presence.confidence_level}
              system={system}
            />
            <SignalPill
              label="cross_sell_presence"
              value={data.input_normalization.cross_sell_presence.value ? "Yes" : "No"}
              level={data.input_normalization.cross_sell_presence.confidence_level}
              system={system}
            />
            <SignalPill
              label="data_readiness"
              value="Product payload connected"
              level="high"
              system={system}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {data.input_normalization.product_margin_charts.map((item) => (
              <div key={item.product} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#f7d237]">
                    {item.title}
                  </div>
                  <ReliabilityDots level={item.confidence_level} system={system} compact />
                </div>
                <div className="mt-2 text-base text-white/72">{item.product}</div>
                <div className="mt-6 h-3 rounded-full bg-white/8">
                  <div
                    className="h-3 rounded-full bg-[#f7d237]"
                    style={{ width: `${item.value ?? 0}%` }}
                  />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {item.value === null ? "—" : formatPercent(item.value)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <BulletList
              title="retention_mechanics"
              items={data.input_normalization.retention_mechanics}
            />
            <BulletList
              title="repeat_sales_signals"
              items={data.input_normalization.repeat_sales_signals}
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            <ParagraphCard
              title="demand_vs_capacity"
              text={data.input_normalization.cross_block_signals.demand_vs_capacity}
            />
            <ParagraphCard
              title="team_capacity_pressure"
              text={data.input_normalization.cross_block_signals.team_capacity_pressure}
            />
            <ParagraphCard
              title="revenue_concentration_signal"
              text={data.input_normalization.cross_block_signals.revenue_concentration_signal}
              tone="warning"
            />
          </div>

          <div className="mt-4">
            <ParagraphCard
              title="data_quality_note"
              text={data.input_normalization.data_quality_note}
              tone="accent"
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead
            eyebrow="visual blocks"
            title="Margin, CJM and funnel"
            text="Графические данные из payload блока product_sales."
          />
          <div className="grid gap-4 xl:grid-cols-2">
            <MiniBarChart
              title="Margin comparison"
              series={data.input_normalization.margin_comparison_chart.series}
              valueKey="margin"
              labelKey="product"
              suffix="%"
            />
            <MiniBarChart
              title="CJM duration"
              series={data.input_normalization.cjm_duration_chart.series}
              valueKey="duration_value"
              labelKey="stage"
              suffix=""
            />
          </div>
          <div className="mt-4">
            <ProductSalesFunnel
              title="Funnel drop visibility"
              stages={data.input_normalization.funnel_drop.stages}
            />
          </div>
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="exact metrics" title="Exact metrics table" />
          <MetricsTable
            title="Exact metrics"
            data={data.exact_metrics_table}
            system={system}
          />
        </section>

        <section className="mb-8">
          <SectionHead eyebrow="inferred metrics" title="Inferred metrics table" />
          <MetricsTable
            title="Inferred metrics"
            data={data.inferred_metrics_table}
            system={system}
          />
        </section>

        <section className="pb-6">
          <SectionHead
            eyebrow="model gaps"
            title="Missing for stronger model"
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
      label: "Analytics maturity",
      value:
        ANALYTICS_MANAGEMENT_PAYLOAD.inferred_metrics_table.rows.find(
          (row) => row.metric === "analytics_maturity"
        )?.value ?? "—",
    },
    {
      label: "Decision quality",
      value:
        ANALYTICS_MANAGEMENT_PAYLOAD.inferred_metrics_table.rows.find(
          (row) => row.metric === "decision_quality"
        )?.value ?? "—",
    },
    {
      label: "Scalability",
      value:
        ANALYTICS_MANAGEMENT_PAYLOAD.inferred_metrics_table.rows.find(
          (row) => row.metric === "management_scalability"
        )?.value ?? "—",
    },
    {
      label: "Missing inputs",
      value: `${ANALYTICS_MANAGEMENT_PAYLOAD.missing_for_stronger_model.length}`,
    },
  ],
  []
);

  const isEconomicsOpen = activeBlock === "economics";
  const isPositioningOpen = activeBlock === "positioning";
  const isClientsFlowOpen = activeBlock === "clients_flow";
  const isProductSalesOpen = activeBlock === "product_sales";
  const isAnalyticsManagementOpen = activeBlock === "analytics_management";

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
                Results page with Analytics & Management block
              </h1>
              <p className="mt-5 max-w-[900px] text-base leading-8 text-white/60 md:text-lg">
                Карточки economics, positioning и clients_flow оставлены в текущей логике, а
                блок Product & Sales собран полностью под переданный JSON payload.
                На превью карточки Product & Sales снаружи выводятся только
                <span className="text-white"> missing_for_stronger_model </span> и
                <span className="text-white"> confidence_note</span>, а внутри
                drawer — весь блок.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 px-4 py-2 text-sm text-[#fff3b2]">
                  token: {token}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/68">
                  product_sales payload ready
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
            onClick={() => setActiveBlock("product_sales")}
            className="rounded-full border border-[#f7d237]/18 bg-[#f7d237]/10 px-5 py-3 text-sm font-medium text-[#fff3b2] transition hover:bg-[#f7d237]/15"
          >
            Открыть Product & Sales
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

            if (card.id === "clients_flow") {
              return (
                <ClientsFlowResultsCard
                  key={card.id}
                  card={card}
                  data={CLIENTS_FLOW_PAYLOAD}
                  onOpen={() => setActiveBlock("clients_flow")}
                />
              );
            }

            if (card.id === "product_sales") {
              return (
                <ProductSalesResultsCard
                  key={card.id}
                  card={card}
                  data={PRODUCT_SALES_PAYLOAD}
                  onOpen={() => setActiveBlock("product_sales")}
                />
              );
            }
      if (card.id === "analytics_management") {
  return (
    <AnalyticsManagementResultsCard
      key={card.id}
      card={card}
      data={ANALYTICS_MANAGEMENT_PAYLOAD}
      onOpen={() => setActiveBlock("analytics_management")}
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
) : isClientsFlowOpen ? (
  <ClientsFlowDrawer
    data={CLIENTS_FLOW_PAYLOAD}
    onClose={() => setActiveBlock(null)}
  />
) : isProductSalesOpen ? (
  <ProductSalesDrawer
    data={PRODUCT_SALES_PAYLOAD}
    onClose={() => setActiveBlock(null)}
  />
) : isAnalyticsManagementOpen ? (
  <AnalyticsManagementDrawer
    data={ANALYTICS_MANAGEMENT_PAYLOAD}
    onClose={() => setActiveBlock(null)}
  />
) : null}
      </aside>
    </div>
  );
}
