type ConfidenceLevel = "high" | "medium" | "preliminary";

type ConfidenceUiLevel = {
  display: string;
  active_dots: number;
  tooltip_title: string;
  tooltip_text: string;
};

type EconomicsMetricRow = {
  metric: string;
  formula: string;
  value: number | string;
  unit: string;
  confidence_level: ConfidenceLevel;
  interpretation: string;
};

type EconomicsContradictionItem = {
  issue: string;
  what_it_may_mean: string;
  usable_part: string;
};

type EconomicsCardPayload = {
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
    rows: EconomicsMetricRow[];
  };
  inferred_metrics_table: {
    columns: string[];
    rows: EconomicsMetricRow[];
  };
  contradictions: {
    contradiction_flag: boolean;
    contradiction_items: EconomicsContradictionItem[];
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

const ECONOMICS_CARD_MOCK: EconomicsCardPayload = {
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
      "Низкая для планирования. 55% основаны на одном клиенте и сами обозначены как ранним сигналом; использовать можно только как верхнюю границу текущего кейса, не как стабильную норму.",
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
