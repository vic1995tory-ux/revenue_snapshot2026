import type { ResultsPageData } from "./types";

function mapConfidenceLevel(
  value?: "high" | "medium" | "preliminary",
): 1 | 2 | 3 {
  if (value === "high") return 3;
  if (value === "medium") return 2;
  return 1;
}

export const resultsPayloadMock = {
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
      },
      medium: {
        display: "● ● ○",
        active_dots: 2,
      },
      preliminary: {
        display: "● ○ ○",
        active_dots: 1,
      },
    },
  },
//Hero_начало
  hero_block: {
    companyName: "",
    summary:
      "Бизнес-девелоперская компания продает стратегию и реализацию стартапам SaaS, а главный текущий предел роста - нестабильный поток заявок.",
    sales_geography: ["ЕС", "СНГ"],
    description:
      "Компания делает консалтинг, разработку стратегий и их реализацию. Основной фокус - seed-stage SaaS в B2B и B2C.",
    growth_limit: "нестабильный поток заявок",
    roles: [
      {
        role: "CMO",
        responsibility: "маркетинг, операционка",
        decision_maker: true,
      },
      {
        role: "CSO/busdev",
        responsibility: "продажи, финансы",
        decision_maker: true,
      },
    ],
    product_margins_chart: {
      chart_type: "bar",
      title: "Маржинальность по продуктам",
      series: [
        {
          product: "разработка MVP",
          margin: 50,
          unit: "percent",
        },
        {
          product: "Страт Сессии",
          margin: 80,
          unit: "percent",
        },
        {
          product: "автоматизации для бизнеса",
          margin: 30,
          unit: "percent",
        },
      ],
    },
    clients_vs_leads_chart: {
      chart_type: "bar_compare",
      title: "Клиенты vs лиды",
      series: [
        {
          label: "Клиенты",
          value: 1,
        },
        {
          label: "Лиды",
          value: 13,
        },
      ],
      confidence_level: "preliminary",
    },
    cash_in: {
      value: 1900,
      currency: "USD",
      period: "last_month",
      confidence_level: "medium",
    },
  },

  normalized_data: {
    company: {
      name: null,
      stage: "Startup",
      business_age_months: 6,
      founded: "2025-11",
      description:
        "Бизнес-девелоперская компания, которая занимается консалтингом, созданием стратегий и реализацией стратегий.",
      physical_location: "Тбилиси",
      sales_geography: ["ЕС", "СНГ"],
      team_size_core: 2,
      uses_contractors: true,
      confidence_level: "medium",
    },

    offer: {
      business_type: "consulting_and_strategy_execution",
      main_services: [
        "разработка стратегий",
        "реализация стратегий",
        "разработка MVP",
        "стратегические сессии",
        "автоматизации для бизнеса",
      ],
      target_customers: ["seed-stage SaaS B2B", "seed-stage SaaS B2C"],
      other_experience_verticals: ["ecommerce", "edtech", "fintech"],
      most_profitable_segment: "Фокус на SaaS как на растущем рынке",
      confidence_level: "medium",
    },

    financials: {
      last_month_cash_in: 1900,
      last_month_currency: "USD",
      contract_value: 6100,
      contract_payment_structure: "разбит на 3 платежа",
      reported_margin_percent: 55,
      target_margin_at_scale_percent: 30,
      profit_last_month_estimated: 1045,
      goal_net_profit_growth_percent: 100,
      expense_limit_note:
        "Увеличить приход в 2 раза и не превышать лимит затрат, целевой остаток 30%",
      confidence_level: "preliminary",
    },

    sales: {
      last_month_clients: 1,
      client_period_note: "1 клиент на 5 месяцев",
      lead_volume: 13,
      processing_capacity: 4,
      conversion_rate: 0.0769,
      avg_check_last_month: 1900,
      demand_to_capacity: 3.25,
      unmet_demand: 9,
      confidence_level: "preliminary",
    },

    acquisition: {
      channels: [
        {
          channel: "Meta Ads",
          share_percent: 25,
        },
        {
          channel: "Рефералы",
          share_percent: 30,
        },
        {
          channel: "Холодный outreach",
          share_percent: 12,
        },
        {
          channel: "Google Ads",
          share_percent: 25,
        },
        {
          channel: "возвраты клиентов с прошлого опыта",
          share_percent: 8,
        },
      ],
      main_need_for_improvement: "стабильный поток заявок",
      confidence_level: "medium",
    },

    products: {
      product_margins: [
        {
          product: "разработка MVP",
          margin_percent: 50,
        },
        {
          product: "Страт Сессии",
          margin_percent: 80,
        },
        {
          product: "автоматизации для бизнеса",
          margin_percent: 30,
        },
      ],
      avg_margin_percent: 53.33,
      margin_spread_percent: 50,
      highest_margin_product: "Страт Сессии",
      lowest_margin_product: "автоматизации для бизнеса",
      confidence_level: "medium",
    },

    retention: {
      mechanics: [
        "Повторные продажи",
        "Пакеты услуг",
        "Подписка",
        "Апсейлы",
        "Личный менеджер",
      ],
      retention_window_days: 14,
      confidence_level: "medium",
    },

    customer_journey: {
      stages: [
        {
          stage: "Acquisition",
          duration_minutes: 60,
          problems: [
            "Непонятные формулировки",
            "Усложнённое знакомство с компанией",
          ],
        },
        {
          stage: "Activation",
          duration_minutes: 60,
          problems: ["Недопонятая ценность ведёт к возражению по цене"],
        },
        {
          stage: "Value Realization",
          duration_minutes: 30,
          problems: ["Возможны завышенные ожидания"],
        },
        {
          stage: "Conversion",
          duration_minutes: 10,
          problems: [],
        },
        {
          stage: "Retention",
          duration_minutes: 20160,
          problems: [],
        },
      ],
      cjm_time_minutes: 20320,
      confidence_level: "medium",
    },

    team: {
      roles: [
        {
          role: "CMO",
          responsibility: "маркетинг, операционка",
          decision_maker: true,
          involved_in: [
            "Продажи",
            "Разработка стратегии",
            "Финансы",
            "Продукт",
            "Сервис",
            "Партнёрства",
            "Аналитика",
            "обучение сотрудников",
          ],
        },
        {
          role: "CSO/busdev",
          responsibility: "продажи, финансы",
          decision_maker: true,
          involved_in: [
            "Маркетинг",
            "Операционка",
            "Разработка стратегии",
            "Продукт",
            "Сервис",
            "обучение сотрудников",
          ],
        },
      ],
      interaction: {
        speed_score_5: 5,
        communication_score_5: 5,
        information_quality_score_5: 5,
        comment:
          "Пока вдвоем, взаимодействие налажено, но бывают несогласованные моменты.",
      },
      decision_making: "оба основателя принимают решения",
      confidence_level: "medium",
    },

    management: {
      stress_levels: [
        {
          area: "Маркетинг",
          value: 3,
        },
        {
          area: "Продажи",
          value: -6,
        },
        {
          area: "Операционка",
          value: 7,
        },
        {
          area: "Управление",
          value: 0,
        },
        {
          area: "управление проектами",
          value: 5,
        },
      ],
      efficiency_loss_areas: [
        {
          area: "Управление",
          reason:
            "расфокус из-за большого количества зон контроля на двух людях",
        },
        {
          area: "управление проектами",
          reason:
            "сложно учитывать клиентские особенности и одновременно управлять подрядчиками",
        },
      ],
      confidence_level: "medium",
    },

    analytics_practice: {
      used: [
        "Финансовая модель",
        "Сегментация клиентов",
        "LTV / CAC",
        "Конверсии и воронка продаж",
        "Размер и рост рынка (TAM/SAM/SOM)",
      ],
      decision_style: "опора на цифры и возможности",
      confidence_level: "medium",
    },

    seasonality: {
      peaks: [
        {
          month: "Мар",
          change_percent: 46,
        },
        {
          month: "Апр",
          change_percent: 30,
        },
        {
          month: "Сен",
          change_percent: 31,
        },
        {
          month: "Окт",
          change_percent: 44,
        },
      ],
      slow_period_notes: [
        "начало года тяжелое",
        "конец года бюрократический и с меньшей готовностью принимать новые решения",
      ],
      confidence_level: "preliminary",
    },

    recent_changes: {
      implemented_last_6_months: [
        "автоматизирован брифинг",
        "создано структурированное рабочее пространство для совместной работы с клиентами",
        "общая база проекта с участием клиента",
      ],
      confidence_level: "medium",
    },

    goals: {
      "3_months": [
        "запуск нового продукта",
        "наработка базы клиентов, кто уже контактировал",
        "разработка удержания внимания",
      ],
      "6_months": ["заключение 2 новых контрактов"],
      "12_months": [
        "создание cashcow для покрытия постоянных расходов",
        "стабильные 3 проекта в работе",
      ],
      confidence_level: "medium",
    },

    contacts: {
      report_email: "vic1995tory@gmail.com",
      meeting_contact: "vic1995tory@gmail.com",
    },
  },

  charts: {
    product_margins: {
      chart_type: "bar",
      title: "Маржинальность по продуктам",
      series: [
        {
          label: "разработка MVP",
          value: 50,
          unit: "percent",
        },
        {
          label: "Страт Сессии",
          value: 80,
          unit: "percent",
        },
        {
          label: "автоматизации для бизнеса",
          value: 30,
          unit: "percent",
        },
      ],
      confidence_level: "medium",
    },

    lead_capacity: {
      chart_type: "bar_compare",
      title: "Спрос vs capacity",
      series: [
        {
          label: "Обращения",
          value: 13,
        },
        {
          label: "Capacity",
          value: 4,
        },
      ],
      confidence_level: "medium",
    },

    channel_mix: {
      chart_type: "donut",
      title: "Распределение входящего потока по каналам",
      series: [
        {
          label: "Meta Ads",
          value: 25,
        },
        {
          label: "Рефералы",
          value: 30,
        },
        {
          label: "Холодный outreach",
          value: 12,
        },
        {
          label: "Google Ads",
          value: 25,
        },
        {
          label: "возвраты клиентов с прошлого опыта",
          value: 8,
        },
      ],
      confidence_level: "medium",
    },

    seasonality_peaks: {
      chart_type: "bar",
      title: "Сезонные пики спроса",
      series: [
        {
          label: "Мар",
          value: 46,
          unit: "percent",
        },
        {
          label: "Апр",
          value: 30,
          unit: "percent",
        },
        {
          label: "Сен",
          value: 31,
          unit: "percent",
        },
        {
          label: "Окт",
          value: 44,
          unit: "percent",
        },
      ],
      confidence_level: "preliminary",
    },

    stress_map: {
      chart_type: "bar",
      title: "Где сильнее всего напряжение",
      series: [
        {
          label: "Маркетинг",
          value: 3,
        },
        {
          label: "Продажи",
          value: -6,
        },
        {
          label: "Операционка",
          value: 7,
        },
        {
          label: "Управление",
          value: 0,
        },
        {
          label: "управление проектами",
          value: 5,
        },
      ],
      confidence_level: "preliminary",
    },
  },

  tables: {
    core_metrics: {
      title: "Ключевые метрики",
      columns: ["Метрика", "Значение", "Комментарий"],
      rows: [
        ["Cash-in за прошлый месяц", "1900 USD", "фактически полученный платеж"],
        [
          "Оценка прибыли за прошлый месяц",
          "1045 USD",
          "cash-in × 55%, оценка предварительная",
        ],
        [
          "Клиенты за прошлый месяц",
          "1",
          "в данных есть оговорка: 1 клиент на 5 месяцев",
        ],
        ["Лиды", "13", "входящие обращения"],
        ["Capacity", "4", "реально обрабатываемый объем"],
        [
          "Конверсия лид → клиент",
          "7.69%",
          "1 / 13, период может не совпадать",
        ],
        ["Средний чек", "1900 USD", "по cash-in прошлого месяца"],
        ["Спрос / capacity", "3.25x", "спрос выше текущей capacity"],
        ["Необработанный спрос", "9", "13 - 4"],
        ["Средняя маржинальность продуктов", "53.33%", "по 3 основным продуктам"],
        ["Разброс маржинальности", "50 п.п.", "от 30% до 80%"],
        ["CJM time", "20320 минут", "включая retention 14 дней"],
      ],
    },

    team_roles: {
      title: "Роли команды",
      columns: ["Роль", "Ответственность", "ЛПР"],
      rows: [
        ["CMO", "маркетинг, операционка", "Да"],
        ["CSO/busdev", "продажи, финансы", "Да"],
      ],
    },

    customer_journey: {
      title: "Путь клиента",
      columns: ["Этап", "Длительность", "Основная проблема"],
      rows: [
        [
          "Acquisition",
          "до 1 часа",
          "сложные формулировки и перегруженное знакомство",
        ],
        [
          "Activation",
          "до 1 часа",
          "недопонятая ценность и реакция 'дорого'",
        ],
        ["Value Realization", "до 30 минут", "завышенные ожидания"],
        ["Conversion", "до 10 минут", ""],
        ["Retention", "14 дней", ""],
      ],
    },
  },

  summary: {
    snapshot:
      "Бизнес очень ранний: 2 основателя, 1 клиент, cash-in за прошлый месяц 1900 USD. Спрос уже есть, но главная проблема - нестабильный поток заявок и перегрузка операционки на маленькой команде.",
    current_position:
      "Компания продает консалтинг, стратегию и реализацию, в первую очередь для seed-stage SaaS. География продаж - ЕС и СНГ, база находится в Тбилиси.",
    economics:
      "Сейчас 13 обращений при capacity 4. Это значит, что спрос уже опережает текущую способность обработки.",
    primary_need:
      "Заявленная общая маржа 55%, но она пока основана на очень маленькой выборке. Самый маржинальный продукт - страт-сессии, самый слабый по марже - автоматизации.",
    confidence_level: "preliminary",
  },

  insights: {
    current_state: {
      title: "Текущее состояние",
      text:
        "Бизнес находится на ранней стадии и ещё не вышел на устойчивую модель. Есть подтверждение спроса и первый оплаченный контракт, но данных пока мало для уверенных выводов по экономике.",
      confidence_level: "medium",
    },
    main_loss: {
      title: "Главная потеря",
      text:
        "Основная потеря сейчас - не в марже, а в нестабильной системе привлечения и в ограниченной capacity команды. Часть спроса просто не может быть полноценно обработана.",
      confidence_level: "medium",
    },
    strongest_signal: {
      title: "Самый сильный сигнал",
      text:
        "Сильный сигнал - высокая маржинальность страт-сессий и наличие 13 обращений при capacity 4. Это показывает, что продукт интересен рынку, но система ещё не готова переваривать спрос стабильно.",
      confidence_level: "medium",
    },
    growth_limit: {
      title: "Что ограничивает рост",
      text:
        "Рост тормозит нестабильный входящий поток и перегрузка двух основателей, которые одновременно тянут маркетинг, продажи, финансы, операционку и клиентскую работу.",
      confidence_level: "high",
    },
    scalability_limit: {
      title: "Что мешает масштабироваться",
      text:
        "Даже при росте лидов бизнес упрётся в управление проектами и операционку. Без разгрузки основателей и стандартизации delivery масштаб будет шатким.",
      confidence_level: "medium",
    },
    data_reliability: {
      title: "Надежность данных",
      text:
        "Часть цифр полезна как ранний ориентир, но не как стабильная база. Клиентская выборка очень маленькая, а некоторые показатели могут относиться к разным периодам.",
      confidence_level: "preliminary",
    },
  },

  risks: [
    {
      risk: "Маржа 55% может быть неустойчивой",
      impact:
        "Она основана на одном клиенте и не показывает поведение модели при масштабе.",
      confidence_level: "preliminary",
    },
    {
      risk: "Непокрытый спрос",
      impact:
        "При 13 обращениях и capacity 4 бизнес уже теряет часть потенциала по обработке лидов.",
      confidence_level: "medium",
    },
    {
      risk: "Сверхзависимость от двух основателей",
      impact:
        "Критичные функции сосредоточены на двух людях, что ухудшает предсказуемость delivery и роста.",
      confidence_level: "high",
    },
    {
      risk: "Слабая ясность ценности на ранних этапах воронки",
      impact:
        "На ранних этапах воронки лиды могут уходить из-за непонятных формулировок и ощущения 'дорого'.",
      confidence_level: "medium",
    },
    {
      risk: "Неполная сопоставимость показателей",
      impact:
        "Клиенты, лиды и cash-in могут относиться к разным логикам и периодам, поэтому часть расчётов пока ориентировочная.",
      confidence_level: "preliminary",
    },
  ],

  missing_data: [
    {
      field: "company_name",
      reason: "Название компании",
    },
    {
      field: "exact_period_alignment",
      reason:
        "Сопоставимые периоды для лидов и клиентов",
    },
    {
      field: "net_profit_definition",
      reason: "Расходы за прошлый месяц и чистая прибыль за прошлый месяц",
    },
    {
      field: "monthly recurring revenue",
      reason: "Разбивка выручки и маржи по каждому продукту",
    },
    {
      field: "cac_value",
      reason: "Подтверждённый CAC в числах",
    },
    {
      field: "ltv_value",
      reason: "LTV в числах",
    },
    {
      field: "retention_rate",
      reason:
        "Retention в числах",
    },
    {
      field: "sales_cycle_average_days",
      reason:
        "Доля новых и повторных клиентов",
    },
  ],

  confidence_note:
    "Модель собрана как ранний snapshot. Основные операционные и структурные выводы выглядят надёжно, но финансовые коэффициенты и конверсия пока предварительные: бизнесу около полугода, клиентская база очень маленькая, а часть данных дана в разной логике периода.",

  economics: {
    normalized_inputs: {
      cash_in: 1900,
      revenue: 6100,
      margin_percent: 55,
      clients: 1,
      leads: 13,
      capacity: 4,
      avg_check: 1900,
      conversion_rate_percent: 7.69,
      demand_to_capacity_ratio: 3.25,
      unmet_demand: 9,
      avg_product_margin_percent: 53.33,
      margin_spread_percent: 50,
      target_margin: 30,
      goal_profit_growth: 100,
      expense_constraint:
        "целевой остаток 30%",
      confidence_level: "preliminary",
    },
    current_economic_state: {
      label: "искаженная",
      explanation:
        "Экономика ранняя и неустойчивая: 1 клиент, cash-in 1900 USD, оценка прибыли 1045 USD и заявленная маржа 55% пока не подтверждают повторяемую модель.",
    },
    main_loss_pattern: {
      label: "capacity gap",
      type: "capacity_gap",
      numeric_basis:
        "demand_to_capacity_ratio = 3.25; unmet_demand = 9",
      explanation:
        "Спрос превышает доступную обработку более чем в 3 раза, а 9 обращений остаются вне capacity, что означает прямую потерю потенциальной выручки.",
    },
    reliability_of_margin: {
      label: "ложная маржа",
      status: "misleading",
      reason:
        "Маржа основана на 1 клиенте на ранней стадии, при этом margin_spread_percent = 50 указывает на нестабильную юнит-экономику, а целевая маржа при масштабе ниже текущей: 30% против 55%.",
    },
    strongest_numeric_signal: {
      metric: "demand_to_capacity_ratio",
      value: "3.25x",
      interpretation:
        "Это главный ограничитель системы: даже при наличии спроса команда физически не может обработать поток, поэтому рост упирается в delivery и обработку, а не только в привлечение.",
    },
    economic_risk: {
      level: "high",
      trigger:
        "Рост ломается первым в capacity: непокрытый спрос уже есть, а текущая маржа не выглядит надёжной для масштабирования при ограничении расходов.",
    },
    economic_growth_limit_view: {
      type: "capacity",
      explanation:
        "Конверсия слабая (7.69%), но главный экономический предел сейчас - capacity, потому что спрос уже выше доступной обработки и unmet_demand > 0 означает потерянную выручку.",
    },
    truth_summary: {
      summary:
        "Сейчас экономика не выглядит устойчиво подтверждённой: есть cash-in 1900 USD и расчётная прибыль 1045 USD, но всё основано на одном клиенте. Деньги теряются прежде всего из-за нехватки capacity: спрос к мощности 3.25x и 9 необработанных обращений уже режут выручку. Маржа 55% выглядит завышенно-оптимистичной для масштаба, потому что разброс продуктовой маржи 50 п.п., а целевой уровень при росте - 30%. Цель +100% прибыли при ограничении по расходам конфликтует с текущей реальностью: без расширения пропускной способности рост будет экономически ограничен.",
      confidence_level: "preliminary",
    },
  },

  positioning: {
    normalized_inputs: {
      business_description:
        "Бизнес-девелоперская компания, которая занимается консалтингом, созданием стратегий и реализацией стратегий.",
      business_type: "consulting_and_strategy_execution",
      target_clients: "seed-stage SaaS B2B, seed-stage SaaS B2C",
      target_subsegments: ["seed-stage SaaS B2B", "seed-stage SaaS B2C"],
      most_profitable_segment: "Фокус на SaaS как на растущем рынке",
      products: [
        {
          name: "разработка MVP",
          margin_percent: 50,
        },
        {
          name: "Страт Сессии",
          margin_percent: 80,
        },
        {
          name: "автоматизации для бизнеса",
          margin_percent: 30,
        },
      ],
      geography: ["ЕС", "СНГ"],
      stage: "Startup",
      founder_involvement:
        "Два основателя вовлечены в продажи, стратегию, продукт и сервис, то есть участвуют в delivery напрямую.",
      clients_count: 1,
      confidence_level: "preliminary",
    },
    business_model: {
      type: "hybrid",
      explanation:
        "По факту это гибрид консалтинга и внедрения: компания продаёт стратегию и делает реализацию.",
    },
    core_offer: {
      type: "mixed",
      explanation:
        "Клиент покупает не только стратегию, а связку из диагностики, планирования и hands-on реализации.",
    },
    target_client: {
      type: "ранний SaaS-стартап seed-stage, которому нужен внешний growth/strategy partner",
      clarity: "semi_clear",
      explanation:
        "Фокус на seed-stage SaaS виден, но B2B и B2C одновременно расширяют ICP. При 1 клиенте реальный core client ещё не подтверждён.",
    },
    positioning_type: {
      type: "blurred",
      explanation:
        "Позиционирование размыто: смешаны стратегия, MVP и автоматизации, а маржинальность продуктов сильно отличается.",
    },
    positioning_risks: {
      level: "high",
      drivers: [
        "wide_segment",
        "unclear_offer",
        "founder_dependency",
        "product_mix_conflict",
      ],
      explanation:
        "Широкий сегмент SaaS B2B+B2C, разный продуктовый набор и сильная зависимость от основателей делают образ компании менее чётким. Для рынка это скорее кастомный сервис, чем узко упакованное решение.",
    },
    market_fit_view: {
      type: "not_validated",
      explanation:
        "Стадия ранняя, клиентов мало, а delivery завязан на основателей, поэтому позиционирование пока не подтверждено реальным объёмом продаж.",
    },
    truth_summary: {
      summary:
        "На деле это founder-led сервисный гибрид: компания продаёт стратегию вместе с её внедрением, а не отдельный продукт. Основной покупатель пока описан скорее гипотезой, чем подтверждённым ICP: seed-stage SaaS, но слишком широко между B2B и B2C. Набор из страт-сессий, MVP и автоматизаций размывает образ на рынке. География ЕС и СНГ добавляет сложности в сообщении и продаже, но главный фактор восприятия сейчас - ручной сервис от основателей.",
      confidence_level: "preliminary",
    },
  },

  clients_flow: {
    normalized_inputs: {
      leads: 13,
      clients: 1,
      capacity: 4,
      conversion_rate_percent: 7.69,
      demand_to_capacity_ratio: 3.25,
      unmet_demand: 9,
      channels: [
        {
          channel: "Meta Ads",
          share_percent: 25,
        },
        {
          channel: "Рефералы",
          share_percent: 30,
        },
        {
          channel: "Холодный outreach",
          share_percent: 12,
        },
        {
          channel: "Google Ads",
          share_percent: 25,
        },
        {
          channel: "возвраты клиентов с прошлого опыта",
          share_percent: 8,
        },
      ],
      seasonality_note:
        "Пики спроса приходятся на март, апрель, сентябрь и октябрь; начало года слабее, конец года замедляется из-за бюрократии.",
      cjm_durations_total_minutes: 20320,
      target_segment: "seed-stage SaaS B2B, seed-stage SaaS B2C",
      team_size: 2,
      overload_signals:
        "Потери эффективности из-за расфокуса на двоих и сложности одновременно учитывать клиентские особенности и управлять подрядчиками.",
      cash_in: 1900,
      confidence_level: "preliminary",
    },
    current_flow_state: {
      label: "перегруженный поток",
      explanation:
        "Спрос есть, но поток одновременно плохо конвертируется и превышает доступную обработку.",
    },
    main_flow_loss_pattern: {
      label: "capacity overflow",
      type: "mixed",
      stage: "processing",
      numeric_basis:
        "demand_to_capacity_ratio = 3.25; unmet_demand = 9; conversion_rate_percent = 7.69%",
      explanation:
        "Основная потеря идёт в обработке из-за перегруза, при этом до продажи есть утечка на ранних этапах воронки из-за проблем в Acquisition и Activation.",
    },
    bottleneck_type: {
      type: "capacity",
      explanation:
        "Главный лимит - обработка спроса: текущий поток в 3.25 раза выше capacity, и 9 лидов остаются непокрытыми.",
    },
    flow_stability: {
      status: "unstable",
      reason:
        "Поток ранний: 13 лидов и 1 клиент, поэтому повторяемость ещё не подтверждена; сезонные пики дополнительно искажают картину.",
    },
    channel_concentration_risk: {
      level: "low",
      dominant_channel: "Рефералы",
      explanation:
        "Доминирующий канал даёт 30%, что ниже порога концентрационного риска в 50%.",
    },
    seasonality_impact: {
      level: "medium",
      explanation:
        "Сезонность влияет на спрос: есть выраженные пики весной и осенью, поэтому текущий объём лидов нельзя считать полностью нейтральной нормой.",
    },
    strongest_numeric_signal: {
      metric: "demand_to_capacity_ratio",
      value: "3.25x",
      interpretation:
        "Это главный сигнал, потому что текущий спрос кратно выше способности команды его обработать, значит рост уже упирается в processing.",
    },
    flow_growth_limit_view: {
      type: "capacity",
      explanation:
        "Даже при наличии спроса рост ограничен тем, что команда не успевает полноценно обработать входящий поток.",
    },
    truth_summary: {
      summary:
        "Проблема не в отсутствии спроса: 13 лидов при capacity 4 показывают перегрузку обработки. Одновременно конверсия 7.69% указывает на потерю потока до продажи, особенно на этапах Acquisition и Activation. Поток пока нестабилен, потому что база очень ранняя и подтверждён только 1 клиент. Главный ограничитель роста сейчас - capacity, а не генерация лидов как таковая.",
      confidence_level: "medium",
    },
  },

  product_sales: {
    normalized_inputs: {
      products: [
        { name: "разработка MVP", margin_percent: 50 },
        { name: "Страт Сессии", margin_percent: 80 },
        { name: "автоматизации для бизнеса", margin_percent: 30 },
      ],
      cash_in: 1900,
      clients: 1,
      avg_check: 1900,
      conversion_rate_percent: 7.69,
      avg_product_margin_percent: 53.33,
      margin_spread_percent: 50,
      retention_mechanics: [
        "Повторные продажи",
        "Пакеты услуг",
        "Подписка",
        "Апсейлы",
        "Личный менеджер",
      ],
      cjm_issues:
        "Acquisition: непонятные формулировки, слишком сложное знакомство с компанией; Activation: недопонятая ценность, возражение 'дорого'; Value Realization: возможны завышенные ожидания",
      team_pressure:
        "Перегруз в операционке и проектном управлении; расфокус из-за большого количества зон контроля на двух людях; сложно учитывать клиентские особенности и одновременно управлять подрядчиками",
      strategy_goal:
        "Создание cashcow для покрытия постоянных расходов и стабильные 3 проекта в работе",
      confidence_level: "preliminary",
    },
    product_model_type: {
      type: "hybrid",
      explanation:
        "Модель сочетает консалтинг и кастомную реализацию. Продукты различаются по марже, а delivery зависит от ручной работы основателей и подрядчиков.",
    },
    core_revenue_driver: {
      type: "avg_check",
      explanation:
        "При 1 клиенте за месяц выручка держится не на объеме, а на чеке отдельной сделки и структуре контракта с частичными платежами.",
    },
    revenue_dependency_type: {
      type: "high_ticket_dependency",
      risk_level: "high",
      explanation:
        "1 клиент и avg_check 1900 означают зависимость от единичных сделок. Модель нестабильна и чувствительна к потере даже одного клиента.",
    },
    main_revenue_leak: {
      type: "positioning",
      stage: "before_sale",
      explanation:
        "Проблемы на ранних этапах CJM: непонятные формулировки, сложное первое знакомство и недопонятая ценность. Это ослабляет конверсию и усиливает реакцию 'дорого'.",
    },
    retention_layer_takeaway: {
      status: "weak",
      quality: "formal",
      explanation:
        "Механики удержания заявлены, но фактических данных по повторным продажам или retention rate нет. Поэтому retention пока нельзя считать реальным слоем выручки.",
    },
    product_scalability_view: {
      type: "not_scalable",
      constraint: "delivery",
      explanation:
        "Масштабирование упирается в ручной delivery: перегружены основатели, есть напряжение в операционке и проектном управлении. Дополнительно margin_spread 50% указывает на неустойчивую продуктовую модель.",
    },
    truth_summary: {
      summary:
        "Сейчас выручка держится на единичной сделке, а не на повторяемом потоке клиентов или работающем retention. Продажи слабее всего на ранних этапах: ценность сформулирована неясно, поэтому часть спроса теряется до сделки. Продуктовая модель пока гибридная и неустойчивая по марже, а рост ограничен delivery-нагрузкой на двух основателей. Это означает зависимость от одного клиента и от высокого чека при низкой устойчивости модели.",
      confidence_level: "preliminary",
    },
  },

  analytics_management: {
    normalized_inputs: {
      tracked_metrics: [
        "LTV / CAC",
        "Конверсии и воронка продаж",
        "Сегментация клиентов",
        "conversion_rate_percent",
        "avg_check_last_month",
        "estimated_profit_last_month",
        "reported_margin_percent",
        "demand_to_capacity_ratio",
      ],
      analytics_tools: [],
      conversion_rate_percent: 7.69,
      avg_check: 1900,
      profit_estimate: 1045,
      margin_percent: 55,
      decision_process: "оба основателя принимают решения",
      recent_changes: [
        "автоматизирован брифинг",
        "создано структурированное рабочее пространство для совместной работы с клиентами",
        "общая база проекта с участием клиента",
      ],
      founder_dependency: "высокая",
      goals:
        "Цель по прибыли к концу года: 100%; ограничение по расходам: не превышать лимит затрат, при росте удерживать затраты около 30%",
      confidence_level: "medium",
    },
    analytics_maturity_level: {
      level: "medium",
      explanation:
        "Есть ключевые метрики и аналитические практики: LTV/CAC, сегментация, воронка, конверсия, средний чек, прибыль и маржа. Но качество использования и стабильность данных не подтверждены.",
    },
    decision_model_type: {
      type: "semi_structured",
      explanation:
        "На цифры смотрят, но решения принимают оба основателя вручную, без формальной управленческой системы.",
    },
    main_management_gap: {
      type: "no_system",
      explanation:
        "Метрики есть, но формализованного контура принятия решений нет; дополнительно есть потери эффективности в управлении.",
    },
    controllability_level: {
      level: "medium",
      explanation:
        "Бизнес базово видит цифры и отдельные узкие места, но контроль держится на двух фаундерах, а наличие efficiency_losses снижает предсказуемость при росте.",
    },
    data_usage_takeaway: {
      type: "diagnostic",
      explanation:
        "Данные используются для понимания текущего состояния и проблемных зон, но явного регулярного цикла проверки гипотез и корректировки не видно.",
    },
    management_growth_limit_view: {
      type: "decision_system",
      explanation:
        "Главное ограничение масштабирования — не отсутствие цифр, а зависимость от ручных решений основателей и слабая формализация управления.",
    },
    truth_summary: {
      summary:
        "Бизнес уже видит базовые цифры: считает конверсию, средний чек, прибыль, маржу и использует LTV/CAC, сегментацию и воронку. Это дает минимально достаточную аналитическую видимость, но не доказывает сильную управленческую систему. Решения остаются у двух основателей, поэтому модель управления пока полу-ручная. При росте controllability будет ограничена не аналитикой как таковой, а отсутствием формального decision system и заметными потерями эффективности в управлении.",
      confidence_level: "medium",
    },
  },

  structure_processes: {
    normalized_inputs: {
      team_size: 2,
      roles: [
        {
          role: "CMO",
          responsibility: "маркетинг, операционка",
          decision_maker: true,
        },
        {
          role: "CSO/busdev",
          responsibility: "продажи, финансы",
          decision_maker: true,
        },
      ],
      decision_model: "оба основателя принимают решения",
      interaction_quality:
        "Высокая скорость, коммуникация и качество информации, но бывают несогласованные моменты.",
      founder_tension: "не указано",
      efficiency_losses:
        "Потери эффективности есть в управлении из-за расфокуса на двух людях и в управлении проектами из-за сложности одновременно учитывать клиентские особенности и управлять подрядчиками.",
      capacity: 4,
      demand_to_capacity_ratio: 3.25,
      unmet_demand: 9,
      growth_goal:
        "Заключение 2 новых контрактов в 6 месяцев; к 12 месяцам — стабильные 3 проекта в работе.",
      confidence_level: "medium",
    },
    operating_model_type: {
      type: "founder_centric",
      explanation:
        "Исполнение держится на двух основателях, оба участвуют в ключевых функциях и совместно принимают решения без явного разделения контуров управления.",
    },
    founder_dependency_level: {
      level: "high",
      reason:
        "Core team состоит из 2 человек, оба основателя вовлечены в множество функций и являются decision makers.",
    },
    main_process_break: {
      stage: "management",
      type: "overload",
      explanation:
        "Главный сбой в управленческом слое: слишком много зон контроля на двух людях, из-за чего проседают фокус, project management и обработка входящего спроса.",
    },
    team_scalability_limit: {
      level: "high",
      constraint: "management",
      explanation:
        "Команда не готова к росту: при ratio 3.25 и unmet demand 9 текущая структура уже перегружена, а совместное принятие решений и ручное управление создают узкое место.",
    },
    execution_risk: {
      level: "high",
      trigger:
        "При росте входящего потока первыми ломаются управленческая координация, project handoff к исполнению и скорость обработки лидов.",
    },
    structure_growth_limit_view: {
      type: "capacity",
      explanation:
        "Главное структурное ограничение — не рынок, а неспособность текущей founder-led системы переваривать объем спроса без потери качества и скорости.",
    },
    truth_summary: {
      summary:
        "Бизнес реально держится на двух основателях, которые одновременно принимают решения и закрывают почти все функции. При этом уже есть перегруз: зафиксированы потери эффективности в управлении и project management, а спрос превышает capacity. Система пока работает за счет личной вовлеченности founders, а не за счет устойчивого процесса. При росте первым ограничением станет не спрос, а управленческая и операционная пропускная способность.",
      confidence_level: "medium",
    },
  },

  strategy: {
    normalized_inputs: {
      profit_goal_percent: 100,
      expense_constraint:
        "не превысить лимит затрат, при росте удерживать затраты около 30%",
      main_need: "стабильный поток заявок",
      timeline_goals: {
        "3m":
          "запуск нового продукта; наработка базы клиентов, кто уже контактировал; разработка удержания внимания",
        "6m": "заключение 2 новых контрактов",
        "12m":
          "создание cashcow для покрытия постоянных расходов; стабильные 3 проекта в работе",
      },
      conversion_rate_percent: 7.69,
      demand_to_capacity_ratio: 3.25,
      unmet_demand: 9,
      lead_volume: 13,
      capacity: 4,
      team_size: 2,
      efficiency_losses:
        "расфокус из-за большого количества зон контроля на двух людях; сложно учитывать клиентские особенности и одновременно управлять подрядчиками",
      confidence_level: "preliminary",
    },
    strategic_posture: {
      type: "misaligned",
      explanation:
        "Цели на рост есть, но при capacity 4, unmet demand 9 и конверсии 7.69% система уже перегружена и не готова к расширению.",
    },
    primary_priority: {
      type: "capacity",
      explanation:
        "Сначала нужно убрать узкое место в обработке спроса и операционном исполнении, потому что часть входящего потока уже теряется.",
    },
    main_goal_conflict: {
      type: "resource_mismatch",
      explanation:
        "Запуск нового продукта и рост прибыли конфликтуют с командой из 2 человек, перегрузом управления и текущей нехваткой capacity.",
    },
    execution_risk: {
      level: "high",
      trigger:
        "Стратегия ломается на перегрузе двух основателей, потере необработанного спроса и отсутствии операционной базы для роста без роста затрат.",
    },
    near_term_focus: {
      focus:
        "Стабилизировать обработку текущего спроса и повысить конверсию до добавления новых инициатив.",
      explanation:
        "В ближайшие 1–2 месяца нужен один порядок действий: сначала разгрести текущий поток, затем улучшить продажу/оффер, и только потом думать о новом продукте или масштабировании маркетинга.",
    },
    strategy_feasibility_view: {
      type: "conditionally_realistic",
      explanation:
        "Цели достижимы только если первым шагом будет усиление capacity и фокуса; без этого стратегия останется декларативной и рост упрется в структуру.",
    },
    truth_summary: {
      summary:
        "Стратегически бизнес хочет расти, но сейчас ограничение не в амбиции, а в пропускной способности и исполнении. При спросе выше capacity и низкой конверсии нельзя начинать с масштабирования потока или запуска нового продукта. Реальный первый шаг — выстроить обработку текущего спроса, иначе цели на 6–12 месяцев будут срываться из-за перегруза и расфокуса.",
      confidence_level: "preliminary",
    },
  },
//solution_начало
  solution: {
    solution_summary: {
      headline: "Рост блокируется founder-led delivery, а не нехваткой спроса",
      core_logic:
        "Перегруженная операционка и ручное delivery режут обработку входящего спроса; главный рычаг - упростить продажу и стандартизировать исполнение вокруг одного повторяемого оффера, чтобы текущий поток конвертировался без перегруза founders.",
      confidence_level: "high",
    },

    primary_growth_lever: {
      lever:
        "Стандартизация одного ядра оффера и процесса обработки текущего спроса",
      reason:
        "Спрос уже выше capacity, но теряется в ручной обработке, слабой упаковке ценности и founder-dependent delivery. Рост даст не расширение привлечения, а превращение существующего спроса в управляемые сделки.",
      supported_by_blocks: [
        "structure_processes",
        "clients_flow",
        "strategy",
        "product_sales",
        "positioning",
      ],
      confidence_level: "high",
    },

    primary_constraint: {
      constraint_type: "structure",
      label: "Founder-centric delivery overload",
      reason:
        "Главный системный предел - не канал и не цена, а перегруженная структура исполнения: два основателя держат продажи, операционку и проектное управление, из-за чего спрос не переваривается и рост ломается в delivery.",
      supported_by_blocks: [
        "structure_processes",
        "clients_flow",
        "economics",
      ],
      confidence_level: "high",
    },

    revenue_loss_source: {
      loss_type: "capacity_gap",
      label: "Потеря выручки в обработке и доведении спроса до сделки",
      explanation:
        "Деньги теряются прежде всего на непокрытом спросе и слабом переводе лида в продажу: поток выше capacity, а до продажи добавляется утечка из-за сложной упаковки оффера и ранних ценовых возражений.",
      visible_or_hidden: "visible",
      supported_by_blocks: ["economics", "clients_flow", "product_sales"],
      confidence_level: "high",
    },

    model_change_recommendation: {
      current_model_problem:
        "Сейчас это размытый кастомный founder-led сервисный гибрид, завязанный на единичные high-ticket сделки и ручное исполнение.",
      proposed_model_shift:
        "Сместиться в узко упакованный сервисный продукт с одним приоритетным ICP, одним ядром оффера и стандартизированным handoff от продажи к delivery.",
      why_this_shift:
        "Текущая гибридная модель расширяет сложность продажи и исполнения одновременно. Упаковка одного повторяемого решения снижает перегрузку founders, упрощает понимание ценности и делает delivery управляемым.",
      expected_unlock:
        "Выше конверсия на текущем спросе, меньше потерь на обработке, более предсказуемая выручка и база для выхода на стабильные проекты без немедленного расширения привлечения.",
      confidence_level: "medium",
    },

    strategic_priorities: [
      {
        priority_rank: 1,
        action:
          "Сфокусировать продажу на одном оффере для одного приоритетного SaaS-сегмента и упростить формулировку ценности.",
        why_now:
          "Сейчас лиды уже есть, но ценность понимается поздно, и низкая конверсия усиливает потери на входе.",
        dependency:
          "Нужен выбор одного ядра оффера вместо смешения стратегии, MVP и автоматизаций.",
        expected_result:
          "Меньше утечки до продажи и более чистая обработка текущего спроса.",
      },
      {
        priority_rank: 2,
        action:
          "Собрать жёсткий процесс handoff: продажа -> delivery -> управление подрядчиками, с разграничением ролей founders.",
        why_now:
          "Главный сбой уже в исполнении; без разгрузки операционки любой новый контракт усиливает нестабильность.",
        dependency:
          "Требуется закрепить владельцев этапов и убрать совместное ручное удержание всех решений.",
        expected_result:
          "Снижение founder overload, рост пропускной способности и меньше потерянных лидов из-за processing.",
      },
      {
        priority_rank: 3,
        action:
          "Отложить запуск нового продукта и наращивание привлечения до стабилизации конверсии и delivery на текущем потоке.",
        why_now:
          "Дополнительный спрос или новые инициативы сейчас умножат существующие потери, а не рост.",
        dependency:
          "После стабилизации оффера и процесса обработки текущих лидов.",
        expected_result:
          "Рост станет управляемым, а следующие контракты будут усиливать, а не ломать систему.",
      },
    ],

    business_impact: {
      revenue_impact:
        "Возврат части уже существующего, но теряемого спроса в выручку.",
      profit_impact:
        "Прибыль станет менее зависимой от одной сделки и менее искажённой ручной перегрузкой.",
      flow_impact:
        "Поток станет лучше конвертироваться и меньше упираться в processing.",
      team_impact:
        "Снизится перегрузка founders и расфокус между продажами, операционкой и подрядчиками.",
      management_impact:
        "Решения станут более формализованными вокруг одного контура обработки спроса.",
      scalability_impact:
        "Появится повторяемая база для роста без мгновенного расширения команды и без запуска новых направлений.",
    },

    implementation_conditions: {
      prerequisites: [
        "Зафиксировать один приоритетный оффер и убрать вторичные направления из фокуса",
        "Разделить ownership между основателями по продаже, управлению потоком и delivery",
        "Формализовать handoff от лида к сделке и от сделки к исполнению",
      ],
      internal_constraints: [
        "Команда из 2 человек уже перегружена",
        "Текущая модель решений полу-ручная",
        "Есть конфликт между ростом и ограничением затрат",
      ],
      execution_risks: [
        "Попытка одновременно запускать новый продукт и чинить текущую систему",
        "Сохранение размытого позиционирования при высокой founder dependency",
        "Рост входящего потока раньше, чем стабилизирован processing и delivery",
      ],
      required_ownership: [
        "Один владелец контура обработки спроса",
        "Один владелец delivery и project management",
        "Совместное решение только по ключевым модельным изменениям, а не по каждому операционному шагу",
      ],
      required_visibility: [
        "Прозрачность по этапам обработки лида",
        "Прозрачность по загрузке capacity и потерям спроса",
        "Прозрачность по переходу от продажи к исполнению",
      ],
    },
  },

  //RoadMap_начало
  roadmap: {
    strategic_objective:
      "Превратить текущий входящий спрос в управляемую и повторяемую выручку через один приоритетный оффер, разгрузку founder-led delivery и формализацию процесса от лида до исполнения без расширения привлечения на первом этапе.",
    core_jtbd:
      "Собрать один рабочий контур продажи и delivery, который позволяет двум основателям обрабатывать текущий спрос без перегруза, быстрее доводить лидов до сделки и стабильно вести проекты.",

    phases: [
      {
        phase: "unlock",
        goal:
          "Снять главный операционный стоп-фактор: размытый оффер, совместное ручное принятие решений и неформализованный handoff между продажей и delivery.",
        key_actions: [
          {
            action:
              "Зафиксировать один приоритетный входной оффер для продаж на ближайший цикл и убрать вторичные направления из активного пресейла.",
            why_this_phase:
              "Без этого нельзя сократить сложность продажи и handoff.",
            confidence_level: "medium",
          },
          {
            action:
              "Назначить одного владельца контура спроса и одного владельца delivery с правом самостоятельных решений в рамках своей зоны.",
            why_this_phase:
              "Это убирает совместное принятие решений по операционным шагам и снижает перегруз на двух founders.",
            confidence_level: "high",
          },
          {
            action:
              "Собрать единый pipeline лида по этапам: входящий лид, квалификация, first call, оффер, решение, handoff в delivery, статус исполнения.",
            why_this_phase:
              "Сейчас главная потеря происходит в processing до продажи и на переходе к исполнению.",
            confidence_level: "medium",
          },
          {
            action:
              "Ввести стандартный handoff-пакет между продажей и исполнением: цель клиента, scope, обещанный результат, ограничения, следующие шаги, ответственный.",
            why_this_phase:
              "Это снижает хаос в project management и уменьшает зависимость от устных договоренностей founders.",
            confidence_level: "high",
          },
          {
            action:
              "Ограничить intake по новым лидам до реально перевариваемого объема и перевести избыточный входящий спрос в controlled follow-up очередь вместо хаотичной обработки.",
            why_this_phase:
              "При demand-to-capacity 3.25 рост без triage усиливает потери, а не выручку.",
            confidence_level: "high",
          },
        ],
        linked_constraint:
          "Founder-centric delivery overload",
        confidence_level: "high",
      },
      {
        phase: "leverage",
        goal:
          "Поднять конверсию текущего спроса за счёт упрощения продажи и сделать исполнение предсказуемым на одном повторяемом offer-led маршруте.",
        key_actions: [
          {
            action:
              "Пересобрать коммерческий сценарий вокруг одного входного предложения с понятным результатом, ограниченным scope и заранее оговоренным следующим шагом.",
            why_this_phase:
              "После стабилизации processing основной рычаг роста — не лидогенерация, а лучшая конверсия текущего спроса.",
            confidence_level: "medium",
          },
          {
            action:
              "Сократить сложность первого знакомства: единая структура первого контакта, краткая диагностика, единый формат квалификации и стандартный follow-up.",
            why_this_phase:
              "Потери фиксируются на Acquisition и Activation из-за сложного входа и непонятной ценности.",
            confidence_level: "high",
          },
          {
            action:
              "Стандартизировать delivery для входного оффера: чек-лист запуска, шаблон плана проекта, фиксированные точки согласования и набор типовых артефактов.",
            why_this_phase:
              "Без стандартизации delivery улучшенная продажа снова упрется в ту же founder dependency.",
            confidence_level: "medium",
          },
          {
            action:
              "Сформировать controlled upsell path из входного оффера в более глубокую реализацию только после прохождения первой ценности, а не продавать смешанный набор услуг с первого касания.",
            why_this_phase:
              "Это уменьшает сопротивление 'дорого' и снижает риск перегрузки кастомом до подтверждения спроса.",
            confidence_level: "medium",
          },
          {
            action:
              "Перезапустить работу по уже контактировавшей базе через единый reactivation-процесс с сегментацией по статусу и готовности к следующему шагу.",
            why_this_phase:
              "Это соответствует цели использовать уже накопленный спрос без наращивания маркетинговой нагрузки.",
            confidence_level: "medium",
          },
        ],
        linked_lever:
          "Стандартизация одного ядра оффера и процесса обработки текущего спроса",
        confidence_level: "high",
      },
      {
        phase: "scale",
        goal:
          "Сделать рост повторяемым: перевести рабочий контур в систему, снизить ручное участие founders в каждой операции и только после этого аккуратно наращивать поток.",
        key_actions: [
          {
            action:
              "Закрепить регулярный управленческий цикл: еженедельный review pipeline, загрузки capacity, статусов проектов, потерь спроса и причин отказов.",
            why_this_phase:
              "Без регулярного decision system контроль останется ручным и нестабильным.",
            confidence_level: "high",
          },
          {
            action:
              "Формализовать критерии подключения подрядчиков или частичной операционной поддержки только для стандартизированных задач внутри delivery.",
            why_this_phase:
              "Расширение capacity допустимо только после формализации процесса, иначе растут затраты и хаос.",
            confidence_level: "medium",
          },
          {
            action:
              "Отделить sales-to-delivery handoff от личного участия обоих founders через роль владельца проекта и фиксированный набор обязательных данных на запуске.",
            why_this_phase:
              "Это снижает зависимость от единичных решений и делает исполнение масштабируемым.",
            confidence_level: "high",
          },
          {
            action:
              "Собрать экономику по основному офферу отдельно: путь от лида до cash-in, валовая нагрузка на команду, реальная маржа и повторяемость апсейла.",
            why_this_phase:
              "Текущая маржа и прибыль ненадежны; для масштабирования нужна управляемая unit-логика.",
            confidence_level: "preliminary",
          },
          {
            action:
              "Вернуться к расширению каналов или новым продуктовым инициативам только после подтверждения, что основной входной оффер и delivery работают в устойчивом режиме.",
            why_this_phase:
              "Иначе бизнес снова создаст спрос, который не способен качественно переварить.",
            confidence_level: "high",
          },
        ],
        linked_system:
          "Повторяемая операционная и управленческая система с формальным ownership, handoff и контролем capacity.",
        confidence_level: "medium",
      },
    ],

    workstreams: [
      {
        name: "Demand processing redesign",
        focus:
          "Собрать единый контур обработки лидов от входа до сделки, убрать потери в processing и ввести controlled intake.",
        related_blocks: [
          "clients_flow",
          "structure_processes",
          "analytics_management",
          "strategy",
        ],
        confidence_level: "high",
      },
      {
        name: "Offer narrowing and sales standardization",
        focus:
          "Сузить продажу до одного входного оффера, упростить коммуникацию ценности и стандартизировать коммерческий диалог.",
        related_blocks: [
          "product_sales",
          "positioning",
          "clients_flow",
          "strategy",
        ],
        confidence_level: "medium",
      },
      {
        name: "Delivery systematization",
        focus:
          "Перестроить исполнение под повторяемый стандартный контур с понятным handoff и ограниченным scope.",
        related_blocks: [
          "structure_processes",
          "product_sales",
          "economics",
        ],
        confidence_level: "medium",
      },
      {
        name: "Founder ownership reset",
        focus:
          "Разделить зоны ответственности между founders и сократить число совместных операционных решений.",
        related_blocks: [
          "structure_processes",
          "analytics_management",
          "strategy",
        ],
        confidence_level: "high",
      },
      {
        name: "Management visibility and control",
        focus:
          "Ввести короткий регулярный контур управления по pipeline, capacity, выручке и загрузке команды.",
        related_blocks: [
          "analytics_management",
          "economics",
          "clients_flow",
          "structure_processes",
        ],
        confidence_level: "medium",
      },
    ],

    dependencies: [
      {
        dependency:
          "Нельзя масштабировать входящий поток до введения controlled intake и owner контуров.",
        reason:
          "Сейчас спрос уже превышает capacity; дополнительный поток увеличит утечки и founder overload.",
      },
      {
        dependency:
          "Нельзя полноценно улучшать конверсию до фиксации одного входного оффера.",
        reason:
          "Размытый набор услуг усложняет ценностное сообщение, усиливает реакцию 'дорого' и мешает повторяемому sales script.",
      },
      {
        dependency:
          "Нельзя перестраивать delivery до формализации sales-to-delivery handoff.",
        reason:
          "Иначе стандартизация исполнения будет разрушаться разными обещаниями на стадии продажи.",
      },
      {
        dependency:
          "Нельзя безопасно подключать подрядчиков или расширять capacity до описания типовых задач и правил контроля качества.",
        reason:
          "При ручной модели это повышает управленческую нагрузку вместо ее снижения.",
      },
      {
        dependency:
          "Нельзя запускать новый продукт как отдельную инициативу до стабилизации текущего processing.",
        reason:
          "Это конфликтует с ограниченной командой из 2 человек и усиливает расфокус.",
      },
      {
        dependency:
          "Нельзя считать экономику масштабируемой до раздельного учета по основному офферу.",
        reason:
          "Текущая маржа опирается на малый объем данных и смешанную продуктовую модель.",
      },
    ],

    first_priority_actions: [
      "За 1 неделю определить один приоритетный входной оффер, который остается в активной продаже, и снять вторичные услуги из фронт-коммуникации.",
      "Зафиксировать ownership: один founder отвечает за весь контур спроса и продажи, второй — за delivery и project management.",
      "Собрать единый pipeline со статусами лида, SLA реакции, причинами потерь и отдельной очередью deferred leads.",
      "Ввести обязательный handoff-шаблон между продажей и исполнением для каждого нового проекта.",
      "Провести ревизию всех открытых и недообработанных лидов, разложить их по статусам и запустить controlled follow-up вместо хаотичных касаний.",
    ],

    structural_changes: [
      {
        change:
          "Разделение ownership между founders по двум контурам: demand/sales и delivery/operations.",
        type: "roles",
        expected_effect:
          "Меньше совместных решений по мелким вопросам, быстрее реакция и ниже управленческий перегруз.",
        confidence_level: "high",
      },
      {
        change:
          "Введение единого sales-to-delivery handoff как обязательного процесса запуска проекта.",
        type: "process",
        expected_effect:
          "Снижение потерь информации, меньше сбоев в исполнении и завышенных ожиданий клиента.",
        confidence_level: "high",
      },
      {
        change:
          "Переход от mixed offer к одному входному продукту с ограниченным scope и понятным результатом.",
        type: "offer_model",
        expected_effect:
          "Проще продажа, выше повторяемость и меньше кастомной перегрузки на раннем этапе.",
        confidence_level: "medium",
      },
      {
        change:
          "Еженедельный management review по pipeline, capacity, проектам и потерям спроса.",
        type: "management_system",
        expected_effect:
          "Решения становятся регулярными и менее ad hoc.",
        confidence_level: "medium",
      },
      {
        change:
          "Подключение подрядчиков только в стандартизированные участки delivery с назначенным owner качества.",
        type: "resource_model",
        expected_effect:
          "Расширение пропускной способности без роста хаоса в координации.",
        confidence_level: "medium",
      },
    ],

    control_points: [
      {
        metric: "Скорость реакции на новый лид",
        signal:
          "Если лиды остаются без первичного статуса или ответа дольше внутреннего окна обработки, processing снова упирается в founders.",
        why_it_matters:
          "Это ранний индикатор потери уже существующего спроса.",
        confidence_level: "medium",
      },
      {
        metric: "Доля лидов, прошедших полный путь до квалификации",
        signal:
          "Если значимая часть входящего потока не доходит до квалификации, bottleneck остается в intake и triage.",
        why_it_matters:
          "Показывает, начал ли бизнес реально переваривать спрос, а не только принимать обращения.",
        confidence_level: "high",
      },
      {
        metric: "Конверсия из квалифицированного лида в сделку по входному офферу",
        signal:
          "Если конверсия не улучшается после сужения оффера, проблема остается в ценностном сообщении или в выборе оффера.",
        why_it_matters:
          "Это ключевой сигнал, работает ли leverage-фаза.",
        confidence_level: "medium",
      },
      {
        metric: "Количество проектов, запущенных через стандартный handoff",
        signal:
          "Если проекты по-прежнему стартуют через устные договоренности, delivery остается founder-led.",
        why_it_matters:
          "Показывает, стал ли переход от продажи к исполнению управляемым.",
        confidence_level: "high",
      },
      {
        metric: "Загрузка founders по операционным задачам",
        signal:
          "Если оба founders продолжают участвовать в большинстве проектных и sales-решений, структурное ограничение не снято.",
        why_it_matters:
          "Это прямой индикатор, снимается ли core constraint.",
        confidence_level: "medium",
      },
      {
        metric: "Соотношение спроса к реально обработанному объему",
        signal:
          "Если gap между входящим спросом и обработанным объемом не сокращается, рост не стал более управляемым.",
        why_it_matters:
          "Это основной показатель возврата потерянной выручки из hidden capacity loss.",
        confidence_level: "high",
      },
      {
        metric: "Стабильность cash-in по основному офферу",
        signal:
          "Если cash-in по-прежнему зависит от единичных нестандартных сделок, модель не стала повторяемой.",
        why_it_matters:
          "Без этого невозможно создать cashcow и устойчивую базу покрытий постоянных расходов.",
        confidence_level: "preliminary",
      },
      {
        metric: "Нагрузка delivery на единицу проекта",
        signal:
          "Если каждый новый проект требует такого же уровня личного участия founders, масштабирование не происходит.",
        why_it_matters:
          "Позволяет понять, становится ли delivery действительно стандартизированным.",
        confidence_level: "medium",
      },
    ],

    expected_outcomes: {
      "3_months":
        "Появляется единый приоритетный оффер, формализованный handoff и понятное распределение ownership между founders; текущий спрос обрабатывается более дисциплинированно, а потери из-за хаоса и перегруза снижаются.",
      "6_months":
        "Конверсия текущего потока становится более управляемой, delivery менее зависит от постоянного совместного участия founders, а выручка начинает меньше искажаться единичными сделками и ручными перегрузками.",
      "12_months":
        "Бизнес получает повторяемую операционную базу для стабильной работы с несколькими проектами одновременно, более предсказуемую выручку и возможность аккуратно масштабировать спрос или тестировать новые инициативы без разрушения текущей системы.",
    },
  },
  current_vs_target: {
    current_state: {
      revenue: "$1.9k cash-in за прошлый месяц; $6.1k total contract value по 1 контракту",
      profit: "около $1.0k при reported margin 55%, но база неустойчивая",
      conversion: "7.69% (1 клиент из 13 обращений)",
      capacity_load:
        "перегрузка: 13 обращений при capacity 4, загрузка около 325%, unmet demand 9",
    },
    target_state: {
      revenue:
        "в горизонте 6-12 месяцев - переход от единичных поступлений к 2-3 активным контрактам/проектам одновременно; ориентир по cash-in/выручке: рост примерно в 2x+ к текущему месячному уровню при подтверждении повторяемости",
      profit:
        "рост чистой прибыли до +100% к текущей базе возможен только при удержании profit share около 30% на масштабе, а не 55%",
      conversion:
        "рабочий диапазон 12-18% как минимально более здоровый уровень для текущего объема спроса",
      capacity_load:
        "снижение с перегруженных 325% к управляемому уровню около 75-100% активной загрузки за счет отбора, стандартизации и более ровной обработки",
    },
    gap_summary:
      "Сейчас узкое место не в верхнем уровне спроса, а в том, что при 13 обращениях система перерабатывает только 4 и закрывает 1 сделку. Главный разрыв - между имеющимся спросом и способностью команды довести его до оплаты без перегруза.",
    confidence_level: "preliminary",
  },
  expected_kpi_changes: [
    {
      metric: "conversion",
      current: "7.69%",
      expected: "12-18%",
      delta: "+4.3 to +10.3 p.p. / примерно 1.6x-2.3x",
      driver:
        "более понятная упаковка ценности, меньше потерь до продажи, более жесткая обработка входящих обращений",
      confidence_level: "preliminary",
    },
    {
      metric: "revenue",
      current:
        "$1.9k cash-in за месяц; $6.1k total contract value подтвержден только по 1 клиенту",
      expected:
        "рост cash-in примерно в 1.5x-3x в горизонте 6-12 месяцев при конверсии выше и более стабильной обработке текущего спроса",
      delta: "+50% to +200%",
      driver:
        "возврат части уже существующего, но теряемого спроса в оплаченные сделки; меньше потерь из-за capacity gap",
      confidence_level: "preliminary",
    },
    {
      metric: "capacity_load",
      current: "около 325% к доступной мощности",
      expected:
        "около 75-100% активной загрузки при управляемой очереди либо 100-125% в переходный период",
      delta: "-200 to -250 p.p.",
      driver:
        "отбор лидов, уменьшение хаотичной обработки, стандартизация передачи в работу и снижение founder-overload",
      confidence_level: "medium",
    },
  ],
  scenarios: {
    baseline: {
      description:
        "Если сохраняется текущая founder-led модель и не меняется способ обработки спроса, поток останется нестабильным.",
      expected_outcome:
        "Revenue останется волатильной и будет зависеть от 1-2 случайных сделок; conversion вероятнее останется около 6-10%; capacity load останется перегруженной зоной выше 200%.",
      risk:
        "Бизнес начнет путать наличие спроса с устойчивым ростом; любое усиление привлечения без разгрузки усилит потери и ухудшит delivery.",
    },
    improved_execution: {
      description:
        "Если улучшить управляемость продажи и снизить потери в обработке текущего спроса, то даже без резкого роста лидов система может конвертировать заметно больше денег из уже существующего потока.",
      expected_outcome:
        "Conversion может выйти в диапазон 12-18%; revenue/cash-in может вырасти примерно в 1.5x-3x; profit в absolute terms может удвоиться, даже если margin нормализуется к 30-40%.",
      upside:
        "При попадании в сезонный пик и при сохранении текущего спроса быстрый переход к стабильным 2 контрактам в течение 6 месяцев и к 3 активным проектам в течение 12 месяцев становится реалистичным.",
    },
    failure_case: {
      description:
        "Если одновременно пытаться держать широкий оффер, добавлять новый продукт и наращивать поток без изменения способа исполнения, система перегрузится еще сильнее.",
      expected_outcome:
        "Conversion может упасть ниже текущих 7.69% или остаться на том же уровне при большем хаосе; capacity load закрепится в зоне 300%+.",
      downside:
        "Рост выручки может не привести к росту profit; margin может быстро уйти к целевым 30% или ниже раньше, чем появится достаточный объем продаж.",
    },
  },
  scenario_assumptions: [
    "Текущий уровень спроса не падает ниже порядка 10-13 обращений в сопоставимый период",
    "Команда сможет работать с 2-3 проектами одновременно без критического ухудшения качества",
    "Более понятная продажа действительно поднимет conversion, а не только сократит число нецелевых разговоров",
    "Reported margin 55% не является устойчивой нормой и при масштабе снизится к более реалистичным 30-40%",
    "Сезонные пики весной и осенью действительно усиливают спрос в вашем сегменте",
  ],
  sensitivity_points: [
    "conversion",
    "capacity_load",
    "avg_check / contract size",
    "доля сложных кастомных проектов",
    "стабильность входящего спроса",
  ],
  //RoadMap_конец
} as const;

function mapChart(
  id: keyof typeof resultsPayloadMock.charts,
): ResultsPageData["evidence"]["charts"][number] {
  const chart = resultsPayloadMock.charts[id];

  return {
    id,
    title: chart.title,
    chartType: chart.chart_type,
    confidenceLevel: mapConfidenceLevel(chart.confidence_level),
    series: chart.series.map((item) => ({
      label: item.label,
      value: item.value,
      unit: "unit" in item ? item.unit : undefined,
    })),
  };
}

function mapTable(
  id: keyof typeof resultsPayloadMock.tables,
): ResultsPageData["evidence"]["tables"][number] {
  const table = resultsPayloadMock.tables[id];
  const rows = table.rows as readonly unknown[];

  return {
    id,
    title: table.title,
    columns: [...table.columns],
    rows: rows.map((row) => {
      if (Array.isArray(row)) {
        return table.columns.reduce<Record<string, string | number | boolean>>(
          (acc, column, index) => {
            acc[column] = row[index] ?? "";
            return acc;
          },
          {},
        );
      }

      return row as Record<string, string | number | boolean>;
    }),
  };
}

export const resultsMockData: ResultsPageData = {
  hero: {
    companyName: resultsPayloadMock.hero_block.companyName,
    salesGeography: resultsPayloadMock.hero_block.sales_geography.join(" + "),
    summary: resultsPayloadMock.hero_block.summary,
    description: resultsPayloadMock.hero_block.description,
    growthLimit: resultsPayloadMock.hero_block.growth_limit,
    cashIn: `${resultsPayloadMock.hero_block.cash_in.value} ${resultsPayloadMock.hero_block.cash_in.currency}`,
    confidenceLevel: 1,

    roles: resultsPayloadMock.hero_block.roles.map((item) => ({
      role: item.role,
      responsibility: item.responsibility,
    })),

    productMargins:
      resultsPayloadMock.hero_block.product_margins_chart.series.map((item) => ({
        name: item.product,
        marginPercent: item.margin,
      })),

    clientsVsLeads: {
      clients:
        resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
          (item) => item.label === "Клиенты",
        )?.value ?? 0,
      leads:
        resultsPayloadMock.hero_block.clients_vs_leads_chart.series.find(
          (item) => item.label === "Лиды",
        )?.value ?? 0,
    },

    channelMix: resultsPayloadMock.normalized_data.acquisition.channels.map(
      (item) => ({
        name: item.channel,
        value: item.share_percent,
      }),
    ),

    stage: resultsPayloadMock.normalized_data.company.stage,
    businessAgeMonths:
      resultsPayloadMock.normalized_data.company.business_age_months,
    physicalLocation:
      resultsPayloadMock.normalized_data.company.physical_location,
    teamSizeCore: resultsPayloadMock.normalized_data.company.team_size_core,
    snapshot: resultsPayloadMock.summary.snapshot,
    currentPosition: resultsPayloadMock.summary.current_position,
  },

  solution: {
    title: resultsPayloadMock.solution.solution_summary.headline,
    summary: resultsPayloadMock.solution.solution_summary.core_logic,
    confidenceLevel: 2,

    cards: [
      {
        title: "Growth Lever",
        value: resultsPayloadMock.solution.primary_growth_lever.lever,
        note: resultsPayloadMock.solution.primary_growth_lever.reason,
      },
      {
        title: "Constraint",
        value: resultsPayloadMock.solution.primary_constraint.label,
        note: resultsPayloadMock.solution.primary_constraint.reason,
      },
      {
        title: "Revenue Loss",
        value: resultsPayloadMock.solution.revenue_loss_source.label,
        note: resultsPayloadMock.solution.revenue_loss_source.explanation,
      },
      {
        title: "Model Shift",
        value:
          resultsPayloadMock.solution.model_change_recommendation
            .proposed_model_shift,
        note:
          resultsPayloadMock.solution.model_change_recommendation
            .expected_unlock,
      },
    ],

    decisionRule:
      "Не масштабировать входящий поток до стабилизации processing, ownership и delivery.",

    priorities: resultsPayloadMock.solution.strategic_priorities.map((item) => ({
      step: item.priority_rank,
      label: item.action,
      description: item.expected_result,
      priority:
        item.priority_rank === 1
          ? "high"
          : item.priority_rank === 2
            ? "medium"
            : "low",
    })),

    expectedOutcomes: [
      {
        label: "Revenue impact",
        description: resultsPayloadMock.solution.business_impact.revenue_impact,
      },
      {
        label: "Profit impact",
        description: resultsPayloadMock.solution.business_impact.profit_impact,
      },
      {
        label: "Flow impact",
        description: resultsPayloadMock.solution.business_impact.flow_impact,
      },
      {
        label: "Team impact",
        description: resultsPayloadMock.solution.business_impact.team_impact,
      },
      {
        label: "Management impact",
        description:
          resultsPayloadMock.solution.business_impact.management_impact,
      },
      {
        label: "Scalability impact",
        description:
          resultsPayloadMock.solution.business_impact.scalability_impact,
      },
    ],

    kpis: [
      {
        label: "Capacity load",
        current: "325%",
        target: "75-100%",
        change: "-200 to -250 p.p.",
      },
      {
        label: "Conversion",
        current: "7.69%",
        target: "12-18%",
        change: "1.6x-2.3x",
      },
      {
        label: "Revenue",
        current: "$1.9k cash-in",
        target: "1.5x-3x",
        change: "+50% to +200%",
      },
      {
        label: "Profit",
        current: "$1.0k estimated",
        target: "1.5x-2x absolute",
        change: "+50% to +100%+",
      },
    ],
  } as ResultsPageData["solution"],

//RoadMap_начало
roadmap: {
  phases: resultsPayloadMock.roadmap.phases.map((phase) => {
    const description =
      "linked_constraint" in phase
        ? phase.linked_constraint
        : "linked_lever" in phase
          ? phase.linked_lever
          : "linked_system" in phase
            ? phase.linked_system
            : "";

    return {
      period: phase.phase,
      title: phase.goal,
      description,
      tasks: phase.key_actions.map((item, index) => ({
        label: `Step ${index + 1}`,
        action: item.action,
        whyThisPhase: item.why_this_phase,
        confidenceLevel: mapConfidenceLevel(item.confidence_level),
      })),
    };
  }),

  controlPoints: resultsPayloadMock.roadmap.control_points.map((item) => ({
    metric: item.metric,
    signal: item.signal,
    whyItMatters: item.why_it_matters,
    confidenceLevel: mapConfidenceLevel(item.confidence_level),
  })),
},
//RoadMap_конец
  
//forecasts_начало
  forecasts: {
    revenue: {
      current: "$1.9k cash-in",
      target: "1.5x-3x",
      delta: 100,
    },
    costs: {
      current: "325% capacity load",
      target: "75-100%",
      delta: -225,
    },
    profit: {
      current: "$1.0k estimated",
      target: "1.5x-2x absolute",
      delta: 75,
    },
    assumptions: [
      "Сначала снимается bottleneck в processing и ownership.",
      "Спрос не масштабируется до стабилизации capacity и delivery.",
      "Основной входной оффер сужается и становится понятнее для продажи.",
      "Handoff между продажей и исполнением формализуется.",
      "Delivery становится более стандартизированным и меньше зависит от постоянного участия основателей.",
    ],
  },
  transition: {
    currentState: resultsPayloadMock.current_vs_target.current_state,
    targetState: resultsPayloadMock.current_vs_target.target_state,
    gapSummary: resultsPayloadMock.current_vs_target.gap_summary,
    confidenceLevel: mapConfidenceLevel(
      resultsPayloadMock.current_vs_target.confidence_level,
    ),
    kpiChanges: resultsPayloadMock.expected_kpi_changes.map((item) => ({
      metric: item.metric,
      current: item.current,
      expected: item.expected,
      delta: item.delta,
      driver: item.driver,
      confidenceLevel: mapConfidenceLevel(item.confidence_level),
    })),
  },
  scenarios: {
    items: [
      {
        name: "Baseline",
        description: resultsPayloadMock.scenarios.baseline.description,
        expectedOutcome: resultsPayloadMock.scenarios.baseline.expected_outcome,
        note: resultsPayloadMock.scenarios.baseline.risk,
      },
      {
        name: "Improved",
        description: resultsPayloadMock.scenarios.improved_execution.description,
        expectedOutcome:
          resultsPayloadMock.scenarios.improved_execution.expected_outcome,
        note: resultsPayloadMock.scenarios.improved_execution.upside,
      },
      {
        name: "Failure",
        description: resultsPayloadMock.scenarios.failure_case.description,
        expectedOutcome: resultsPayloadMock.scenarios.failure_case.expected_outcome,
        note: resultsPayloadMock.scenarios.failure_case.downside,
      },
    ],
    assumptions: [...resultsPayloadMock.scenario_assumptions],
    sensitivityPoints: [...resultsPayloadMock.sensitivity_points],
  },
  evidence: {
    charts: [
      mapChart("product_margins"),
      mapChart("lead_capacity"),
      mapChart("channel_mix"),
      mapChart("seasonality_peaks"),
      mapChart("stress_map"),
    ],
    tables: [
      mapTable("core_metrics"),
      mapTable("team_roles"),
      mapTable("customer_journey"),
    ],
  },
  reliability: {
    risks: resultsPayloadMock.risks.map((item) => ({
      risk: item.risk,
      whyItMatters: item.impact,
      confidenceLevel: mapConfidenceLevel(item.confidence_level),
    })),
    missingData: resultsPayloadMock.missing_data.map((item) => item.reason),
    confidenceNote: resultsPayloadMock.confidence_note,
  },
//UnifiedBusinessFrame_начало
  businessContext: {
    summary:
      "Unified business context assembled from current payload: company, offer, financials, sales, acquisition, products, retention, customer journey, team, management, analytics, seasonality, recent changes, goals, charts, tables, insights, risks and missing data.",

    sections: [
      {
        title: "Company",
        rows: [
          {
            label: "Name",
            value: resultsPayloadMock.normalized_data.company.name ?? "",
          },
          {
            label: "Stage",
            value: resultsPayloadMock.normalized_data.company.stage,
          },
          {
            label: "Founded",
            value: resultsPayloadMock.normalized_data.company.founded,
          },
          {
            label: "Business age",
            value: `${resultsPayloadMock.normalized_data.company.business_age_months} months`,
          },
          {
            label: "Location",
            value: resultsPayloadMock.normalized_data.company.physical_location,
          },
          {
            label: "Sales geography",
            value:
              resultsPayloadMock.normalized_data.company.sales_geography.join(
                ", ",
              ),
          },
          {
            label: "Core team",
            value: String(resultsPayloadMock.normalized_data.company.team_size_core),
          },
          {
            label: "Uses contractors",
            value: String(resultsPayloadMock.normalized_data.company.uses_contractors),
          },
        ],
      },
      {
        title: "Offer",
        rows: [
          {
            label: "Business type",
            value: resultsPayloadMock.normalized_data.offer.business_type,
          },
          {
            label: "Main services",
            value: resultsPayloadMock.normalized_data.offer.main_services.join(", "),
          },
          {
            label: "Target customers",
            value:
              resultsPayloadMock.normalized_data.offer.target_customers.join(", "),
          },
          {
            label: "Most profitable segment",
            value: resultsPayloadMock.normalized_data.offer.most_profitable_segment,
          },
        ],
      },
      {
        title: "Financials",
        rows: [
          {
            label: "Last month cash-in",
            value: `${resultsPayloadMock.normalized_data.financials.last_month_cash_in} ${resultsPayloadMock.normalized_data.financials.last_month_currency}`,
          },
          {
            label: "Contract value",
            value: `${resultsPayloadMock.normalized_data.financials.contract_value} USD`,
          },
          {
            label: "Contract payment structure",
            value:
              resultsPayloadMock.normalized_data.financials.contract_payment_structure,
          },
          {
            label: "Reported margin",
            value: `${resultsPayloadMock.normalized_data.financials.reported_margin_percent}%`,
          },
          {
            label: "Target margin at scale",
            value: `${resultsPayloadMock.normalized_data.financials.target_margin_at_scale_percent}%`,
          },
          {
            label: "Estimated profit last month",
            value: `${resultsPayloadMock.normalized_data.financials.profit_last_month_estimated} USD`,
          },
          {
            label: "Goal net profit growth",
            value: `${resultsPayloadMock.normalized_data.financials.goal_net_profit_growth_percent}%`,
          },
          {
            label: "Expense constraint",
            value: resultsPayloadMock.normalized_data.financials.expense_limit_note,
          },
        ],
      },
      {
        title: "Sales",
        rows: [
          {
            label: "Clients last month",
            value: String(resultsPayloadMock.normalized_data.sales.last_month_clients),
          },
          {
            label: "Client note",
            value: resultsPayloadMock.normalized_data.sales.client_period_note,
          },
          {
            label: "Lead volume",
            value: String(resultsPayloadMock.normalized_data.sales.lead_volume),
          },
          {
            label: "Processing capacity",
            value: String(
              resultsPayloadMock.normalized_data.sales.processing_capacity,
            ),
          },
          {
            label: "Conversion rate",
            value: `${(
              resultsPayloadMock.normalized_data.sales.conversion_rate * 100
            ).toFixed(2)}%`,
          },
          {
            label: "Average check",
            value: `${resultsPayloadMock.normalized_data.sales.avg_check_last_month} USD`,
          },
          {
            label: "Demand to capacity",
            value: `${resultsPayloadMock.normalized_data.sales.demand_to_capacity}x`,
          },
          {
            label: "Unmet demand",
            value: String(resultsPayloadMock.normalized_data.sales.unmet_demand),
          },
        ],
      },
      {
        title: "Acquisition",
        rows: [
          {
            label: "Channels",
            value: resultsPayloadMock.normalized_data.acquisition.channels
              .map((item) => `${item.channel} ${item.share_percent}%`)
              .join(", "),
          },
          {
            label: "Main need for improvement",
            value:
              resultsPayloadMock.normalized_data.acquisition.main_need_for_improvement,
          },
        ],
      },
      {
        title: "Products",
        rows: [
          {
            label: "Product margins",
            value: resultsPayloadMock.normalized_data.products.product_margins
              .map((item) => `${item.product} ${item.margin_percent}%`)
              .join(", "),
          },
          {
            label: "Average margin",
            value: `${resultsPayloadMock.normalized_data.products.avg_margin_percent}%`,
          },
          {
            label: "Margin spread",
            value: `${resultsPayloadMock.normalized_data.products.margin_spread_percent} p.p.`,
          },
          {
            label: "Highest margin product",
            value:
              resultsPayloadMock.normalized_data.products.highest_margin_product,
          },
          {
            label: "Lowest margin product",
            value:
              resultsPayloadMock.normalized_data.products.lowest_margin_product,
          },
        ],
      },
      {
        title: "Retention",
        rows: [
          {
            label: "Mechanics",
            value: resultsPayloadMock.normalized_data.retention.mechanics.join(", "),
          },
          {
            label: "Retention window",
            value: `${resultsPayloadMock.normalized_data.retention.retention_window_days} days`,
          },
        ],
      },
      {
        title: "Customer Journey",
        rows: [
          {
            label: "Total CJM time",
            value: `${resultsPayloadMock.normalized_data.customer_journey.cjm_time_minutes} minutes`,
          },
          {
            label: "Acquisition problems",
            value:
              resultsPayloadMock.normalized_data.customer_journey.stages[0]?.problems.join(
                ", ",
              ) ?? "",
          },
          {
            label: "Activation problems",
            value:
              resultsPayloadMock.normalized_data.customer_journey.stages[1]?.problems.join(
                ", ",
              ) ?? "",
          },
          {
            label: "Value realization problems",
            value:
              resultsPayloadMock.normalized_data.customer_journey.stages[2]?.problems.join(
                ", ",
              ) ?? "",
          },
        ],
      },
      {
        title: "Team",
        rows: [
          {
            label: "Decision making",
            value: resultsPayloadMock.normalized_data.team.decision_making,
          },
          {
            label: "Interaction",
            value: resultsPayloadMock.normalized_data.team.interaction.comment,
          },
          {
            label: "Roles",
            value: resultsPayloadMock.normalized_data.team.roles
              .map((item) => `${item.role}: ${item.responsibility}`)
              .join("; "),
          },
        ],
      },
      {
        title: "Management",
        rows: [
          {
            label: "Stress map",
            value: resultsPayloadMock.normalized_data.management.stress_levels
              .map((item) => `${item.area} ${item.value}`)
              .join(", "),
          },
          {
            label: "Efficiency loss areas",
            value: resultsPayloadMock.normalized_data.management.efficiency_loss_areas
              .map((item) => `${item.area}: ${item.reason}`)
              .join("; "),
          },
        ],
      },
      {
        title: "Analytics Practice",
        rows: [
          {
            label: "Used",
            value: resultsPayloadMock.normalized_data.analytics_practice.used.join(
              ", ",
            ),
          },
          {
            label: "Decision style",
            value: resultsPayloadMock.normalized_data.analytics_practice.decision_style,
          },
        ],
      },
      {
        title: "Seasonality",
        rows: [
          {
            label: "Peaks",
            value: resultsPayloadMock.normalized_data.seasonality.peaks
              .map((item) => `${item.month} +${item.change_percent}%`)
              .join(", "),
          },
          {
            label: "Slow period notes",
            value:
              resultsPayloadMock.normalized_data.seasonality.slow_period_notes.join(
                "; ",
              ),
          },
        ],
      },
      {
        title: "Recent Changes",
        rows: [
          {
            label: "Implemented last 6 months",
            value:
              resultsPayloadMock.normalized_data.recent_changes.implemented_last_6_months.join(
                ", ",
              ),
          },
        ],
      },
      {
        title: "Goals",
        rows: [
          {
            label: "3 months",
            value: resultsPayloadMock.normalized_data.goals["3_months"].join("; "),
          },
          {
            label: "6 months",
            value: resultsPayloadMock.normalized_data.goals["6_months"].join("; "),
          },
          {
            label: "12 months",
            value: resultsPayloadMock.normalized_data.goals["12_months"].join("; "),
          },
        ],
      },
      {
        title: "Contacts",
        rows: [
          {
            label: "Report email",
            value: resultsPayloadMock.normalized_data.contacts.report_email,
          },
          {
            label: "Meeting contact",
            value: resultsPayloadMock.normalized_data.contacts.meeting_contact,
          },
        ],
      },
    ],
  },
//blocks_начало
  blocks: [
    {
      id: "economics",
      title: "Economics",
      truthSummary: resultsPayloadMock.economics.truth_summary.summary,
      mainDiagnosis:
        "55% маржи и 1045 USD прибыли основаны на одном клиенте и не отражают масштабируемую модель.",
      confidenceLevel: 1,
      keySignals: [
        { label: "Cash-in", value: "1900 USD" },
        { label: "Profit", value: "1045 USD" },
        { label: "Demand / Capacity", value: "3.25x" },
        { label: "Unmet demand", value: "9" },
      ],
      explanation:
        resultsPayloadMock.economics.main_loss_pattern.explanation,
      implication:
        "Главный экономический лимит роста — capacity, а не генерация лидов.",
    },
    {
      id: "positioning",
      title: "Positioning",
      truthSummary: resultsPayloadMock.positioning.truth_summary.summary,
      mainDiagnosis:
        "Позиционирование размыто между консалтингом, стратегией, MVP-разработкой и автоматизациями.",
      confidenceLevel: 1,
      keySignals: [
        { label: "Business model", value: "hybrid" },
        {
          label: "Target segment",
          value: "seed-stage SaaS, B2B SaaS, B2C SaaS",
        },
        { label: "Clients", value: "1" },
        { label: "Positioning risk", value: "high" },
      ],
      explanation:
        resultsPayloadMock.positioning.positioning_type.explanation,
      implication:
        "Размытое позиционирование осложняет единое сообщение и снижает повторяемость продаж.",
    },
    {
      id: "clients_flow",
      title: "Clients & Flow",
      truthSummary: resultsPayloadMock.clients_flow.truth_summary.summary,
      mainDiagnosis:
        "При 13 лидах, capacity 4 и unmet demand 9 бизнес уже теряет поток в processing.",
      confidenceLevel: 1,
      keySignals: [
        { label: "Leads", value: "13" },
        { label: "Clients", value: "1" },
        { label: "Conversion", value: "7.69%" },
        { label: "Demand / Capacity", value: "3.25x" },
      ],
      explanation:
        resultsPayloadMock.clients_flow.main_flow_loss_pattern.explanation,
      implication:
        "Рост сейчас ограничен тем, что команда не успевает обработать поток и теряет часть лидов до продажи.",
    },
    {
      id: "product_sales",
      title: "Product & Sales",
      truthSummary: resultsPayloadMock.product_sales.truth_summary.summary,
      mainDiagnosis:
        "Продуктовая модель пока гибридная и неустойчивая по марже, а рост ограничен delivery-нагрузкой на двух основателей.",
      confidenceLevel: 1,
      keySignals: [
        { label: "Avg check", value: "1900 USD" },
        { label: "Avg product margin", value: "53.33%" },
        { label: "Margin spread", value: "50 p.p." },
        { label: "Revenue dependency", value: "high_ticket_dependency" },
      ],
      explanation:
        resultsPayloadMock.product_sales.main_revenue_leak.explanation,
      implication:
        "Бизнес зависит от одного клиента и высокого чека при низкой устойчивости модели.",
    },
    {
      id: "analytics_management",
      title: "Analytics & Management",
      truthSummary:
        resultsPayloadMock.analytics_management.truth_summary.summary,
      mainDiagnosis:
        "Метрики есть, но формализованного decision system нет, а потери эффективности в управлении уже заметны.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Analytics maturity", value: "medium" },
        { label: "Decision model", value: "semi_structured" },
        { label: "Controllability", value: "medium" },
        { label: "Founder dependency", value: "high" },
      ],
      explanation:
        resultsPayloadMock.analytics_management.main_management_gap.explanation,
      implication:
        "При росте controllability будет ограничена отсутствием формального decision system.",
    },
    {
      id: "structure_processes",
      title: "Structure & Processes",
      truthSummary:
        resultsPayloadMock.structure_processes.truth_summary.summary,
      mainDiagnosis:
        "Главный сбой в управленческом слое: слишком много зон контроля на двух людях.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Core team", value: "2" },
        { label: "Founder dependency", value: "high" },
        { label: "Demand / Capacity", value: "3.25x" },
        { label: "Execution risk", value: "high" },
      ],
      explanation:
        resultsPayloadMock.structure_processes.main_process_break.explanation,
      implication:
        "При росте первым ограничением станет управленческая и операционная пропускная способность.",
    },
    {
      id: "strategy",
      title: "Strategy",
      truthSummary: resultsPayloadMock.strategy.truth_summary.summary,
      mainDiagnosis:
        "Нельзя начинать с масштабирования потока или запуска нового продукта при текущем capacity bottleneck.",
      confidenceLevel: 1,
      keySignals: [
        { label: "Profit goal", value: "+100%" },
        { label: "Expense constraint", value: "затраты около 30%" },
        { label: "Demand / Capacity", value: "3.25x" },
        { label: "Execution risk", value: "high" },
      ],
      explanation:
        resultsPayloadMock.strategy.main_goal_conflict.explanation,
      implication:
        "Реальный первый шаг — выстроить обработку текущего спроса, иначе цели на 6–12 месяцев будут срываться.",
    },
  ],
//OverAllSummary_начало
  overallSummary: {
    cards: [
      {
        title: "Snapshot",
        value: resultsPayloadMock.summary.snapshot,
      },
      {
        title: "Primary Need",
        value: resultsPayloadMock.summary.primary_need,
      },
      {
        title: "Growth Limit",
        value: resultsPayloadMock.insights.growth_limit.text,
      },
    ],
  },
};
