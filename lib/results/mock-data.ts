import type { ResultsPageData } from "./types";

export const resultsPayloadMock = {
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

  clients_flow: {
    normalized_inputs: {
      leads: 13,
      clients: 1,
      capacity: 4,
      conversion_rate_percent: 7.69,
      demand_to_capacity_ratio: 3.25,
      unmet_demand: 9,
      channels: [
        { channel: "Meta Ads", share_percent: 25 },
        { channel: "Рефералы", share_percent: 30 },
        { channel: "Холодный outreach", share_percent: 12 },
        { channel: "Google Ads", share_percent: 25 },
        { channel: "возвраты клиентов с прошлого опыта", share_percent: 8 },
      ],
      seasonality_note:
        "Пики: Мар +46%, Апр +30%, Сен +31%, Окт +44%. Медленные периоды: начало года тяжелое, конец года бюрократический и с меньшей готовностью принимать новые решения.",
      cjm_durations_total_minutes: 20320,
      target_segment: "seed-stage SaaS, B2B SaaS, B2C SaaS",
      team_size: 2,
      overload_signals:
        "Потери эффективности из-за расфокуса двух людей и сложности проектного управления; напряжение выше в операционке и управлении проектами.",
      cash_in: 1900,
      confidence_level: "preliminary",
    },
    current_flow_state: {
      label: "узкий поток",
      explanation:
        "Проблема смешанная: лиды есть, но поток нестабилен, конверсия низкая, а текущая capacity сильно ниже входящего спроса.",
    },
    main_flow_loss_pattern: {
      label: "перегрузка воронки",
      type: "mixed",
      stage: "processing",
      numeric_basis:
        "demand_to_capacity_ratio = 3.25, unmet_demand = 9, conversion_rate_percent = 7.69%",
      explanation:
        "Основной разрыв в processing: команда может обработать только 4 из 13 лидов. Дополнительно есть leakage до сделки: конверсия ниже 10%, а в Acquisition и Activation зафиксированы проблемы с формулировкой ценности и сложным входом.",
    },
    bottleneck_type: {
      type: "capacity",
      explanation:
        "Главное ограничение — processing capacity: спрос превышает capacity в 3.25 раза, и 9 лидов остаются вне обработки.",
    },
    flow_stability: {
      status: "unstable",
      reason:
        "Ранний этап, 1 клиент и 13 лидов дают низкую повторяемость; сезонность и малый объем наблюдений делают поток скорее случайным, чем стабильным.",
    },
    channel_concentration_risk: {
      level: "low",
      dominant_channel: "Рефералы",
      explanation:
        "Крупнейший канал дает 30%, ни один канал не превышает 50%, явной зависимости от одного источника нет.",
    },
    seasonality_impact: {
      level: "medium",
      explanation:
        "Сезонные пики и тяжелые периоды есть, но при таком малом объеме данных они скорее искажают интерпретацию, чем объясняют весь разрыв в потоке.",
    },
    strongest_numeric_signal: {
      metric: "demand_to_capacity_ratio",
      value: "3.25x",
      interpretation:
        "Это главный сигнал: входящий спрос уже существенно выше текущей способности обработки, поэтому рост упирается не только в привлечение, но и в capacity.",
    },
    flow_growth_limit_view: {
      type: "capacity",
      explanation:
        "Даже при наличии спроса рост сейчас ограничен тем, что команда не успевает обработать поток и теряет часть лидов до продажи.",
    },
    truth_summary: {
      summary:
        "Поток ломается не из-за полного отсутствия спроса, а из-за сочетания низкой конверсии и сильной перегрузки обработки. При 13 лидах, capacity 4 и unmet demand 9 бизнес уже теряет поток в processing, а conversion rate 7.69% подтверждает дополнительную потерю на пути к сделке. Канальная зависимость пока низкая, но сам поток еще нестабилен из-за ранней стадии и малого числа клиентов. Сезонность есть, но она не отменяет факт текущего capacity bottleneck.",
      confidence_level: "preliminary",
    },
  },

  positioning: {
    normalized_inputs: {
      business_description:
        "Бизнес-девелоперская компания, занимается консалтингом, созданием и реализацией стратегий.",
      business_type: "консалтинг и бизнес-девелопмент",
      target_clients: "seed-stage SaaS, B2B SaaS, B2C SaaS",
      target_subsegments: ["seed-stage SaaS", "B2B SaaS", "B2C SaaS"],
      most_profitable_segment: "фокус на SaaS как растущий рынок",
      products: [
        { name: "разработка MVP", margin_percent: 50 },
        { name: "Страт Сессии", margin_percent: 80 },
        { name: "автоматизации для бизнеса", margin_percent: 30 },
      ],
      geography: ["ЕС", "СНГ"],
      stage: "Startup",
      founder_involvement:
        "Оба основателя вовлечены в продажи, разработку стратегии, продукт и сервис; delivery founder-led.",
      clients_count: 1,
      confidence_level: "preliminary",
    },
    business_model: {
      type: "hybrid",
      explanation:
        "Модель сочетает консалтинг и реализацию: компания продает стратегические сессии, разработку стратегий, MVP и автоматизации. По факту это сервисный hybrid, а не продуктовая модель.",
    },
    core_offer: {
      type: "mixed",
      explanation:
        "Клиент покупает не только стратегию, но и внедрение/сборку: от стратегической проработки до запуска MVP и автоматизаций.",
    },
    target_client: {
      type: "SaaS-клиент ранней стадии",
      clarity: "semi_clear",
      explanation:
        "Базовый фокус на SaaS виден, но внутри него сегмент слишком широкий: одновременно seed-stage, B2B SaaS и B2C SaaS. При 1 клиенте реальный core client еще не подтвержден.",
    },
    positioning_type: {
      type: "blurred",
      explanation:
        "Позиционирование размыто между консалтингом, стратегией, MVP-разработкой и автоматизациями. Разные типы услуг и сильный разброс маржи усиливают blur.",
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
        "Широкий SaaS-сегмент, смешение стратегии и реализации, founder-led delivery и набор продуктов с разной экономикой делают позиционирование слабее и менее однозначным для рынка.",
    },
    market_fit_view: {
      type: "not_validated",
      explanation:
        "Бизнес на ранней стадии и с 1 клиентом за период. При таком объеме данных позиционирование еще не подтверждено реальными повторяемыми продажами.",
    },
    truth_summary: {
      summary:
        "На практике это founder-led сервисный hybrid: компания продает стратегию плюс hands-on реализацию, а не узкий продукт. Реальный клиентский запрос — получить внешнюю команду, которая и думает, и делает. Фокус на SaaS есть, но внутри он слишком широкий, а при 1 клиенте позиционирование пока не валидировано. География ЕС + СНГ расширяет рынок, но усложняет единое сообщение и продажи.",
      confidence_level: "preliminary",
    },
  },

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
        "не превысить лимит затрат, при росте удерживать затраты около 30%",
      confidence_level: "preliminary",
    },
    current_economic_state: {
      label: "искаженная",
      explanation:
        "Экономика ранняя и нестабильная: 1 клиент, cash-in 1900 USD, оценка прибыли 1045 USD и маржа 55% пока не подтверждены повторяемостью.",
    },
    main_loss_pattern: {
      label: "capacity gap",
      type: "capacity_gap",
      numeric_basis:
        "demand_to_capacity_ratio = 3.25, unmet_demand = 9, leads = 13, capacity = 4",
      explanation:
        "Спрос уже превышает текущую capacity более чем в 3 раза, и 9 обращений остаются вне обработки, что означает прямую потерю потенциальной выручки.",
    },
    reliability_of_margin: {
      label: "ложная маржа",
      status: "misleading",
      reason:
        "Маржа опирается на 1 клиента на ранней стадии, при этом разброс продуктовой маржи 50 п.п. (>30), а целевая маржа на масштабе 30% сильно ниже текущих 55%.",
    },
    strongest_numeric_signal: {
      metric: "demand_to_capacity_ratio",
      value: "3.25x",
      interpretation:
        "Это главный ограничитель системы: даже при наличии спроса бизнес физически не может обработать поток, поэтому рост упирается в capacity раньше, чем в генерацию лидов.",
    },
    economic_risk: {
      level: "high",
      trigger:
        "При любом росте входящего потока первым ломается capacity, а текущая маржа не компенсирует потерю необработанного спроса и не подтверждена на масштабе.",
    },
    economic_growth_limit_view: {
      type: "capacity",
      explanation:
        "Экономический предел роста сейчас задается capacity, потому что спрос есть, но часть его уже теряется из-за нехватки ресурса на обработку и исполнение.",
    },
    truth_summary: {
      summary:
        "Текущая экономика не является устойчивой нормой: 55% маржи и 1045 USD прибыли основаны на одном клиенте и потому не отражают масштабируемую модель. Деньги теряются не из-за отсутствия спроса, а из-за неспособности обработать весь поток: при 13 лидах и capacity 4 бизнес недозабирает выручку. Цель +100% прибыли конфликтует с ограничением расходов около 30%, потому что для роста нужно расширять capacity, а это почти наверняка снизит текущую маржу к целевым 30%. Главный экономический лимит роста — capacity.",
      confidence_level: "preliminary",
    },
  },

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

  hero_block: {
    companyName: "",
    summary:
      "Бизнес-девелоперская и консалтинговая компания для seed-stage SaaS, сейчас рост ограничен нестабильным потоком заявок и маленькой командой.",
    sales_geography: ["ЕС", "СНГ"],
    description:
      "Компания помогает клиентам с разработкой и реализацией стратегий, а также с запуском MVP и бизнес-автоматизаций. Сейчас бизнес на ранней стадии, работает около полугода с двумя основателями и проектными подрядчиками.",
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
      title: "Маржинальность продуктов",
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
        "Бизнес-девелоперская компания, занимается консалтингом, созданием и реализацией стратегий.",
      physical_location: "Тбилиси",
      sales_geography: ["ЕС", "СНГ"],
      team_size_core: 2,
      uses_contractors: true,
      confidence_level: "medium",
    },
    offer: {
      business_type: "консалтинг и бизнес-девелопмент",
      main_services: [
        "разработка стратегий",
        "реализация стратегий",
        "разработка MVP",
        "стратегические сессии",
        "автоматизации для бизнеса",
      ],
      target_customers: ["seed-stage SaaS", "B2B SaaS", "B2C SaaS"],
      other_experience_verticals: ["ecommerce", "edtech", "fintech"],
      most_profitable_segment: "фокус на SaaS как растущий рынок",
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
        "не превысить лимит затрат, при росте удерживать затраты около 30%",
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
        { channel: "Meta Ads", share_percent: 25 },
        { channel: "Рефералы", share_percent: 30 },
        { channel: "Холодный outreach", share_percent: 12 },
        { channel: "Google Ads", share_percent: 25 },
        { channel: "возвраты клиентов с прошлого опыта", share_percent: 8 },
      ],
      main_need_for_improvement: "стабильный поток заявок",
      confidence_level: "medium",
    },
    products: {
      product_margins: [
        { product: "разработка MVP", margin_percent: 50 },
        { product: "Страт Сессии", margin_percent: 80 },
        { product: "автоматизации для бизнеса", margin_percent: 30 },
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
            "непонятные формулировки",
            "слишком сложное знакомство с компанией",
          ],
        },
        {
          stage: "Activation",
          duration_minutes: 60,
          problems: ["недопонятая ценность", "возражение 'дорого'"],
        },
        {
          stage: "Value Realization",
          duration_minutes: 30,
          problems: ["возможны завышенные ожидания"],
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
        { area: "Маркетинг", value: 3 },
        { area: "Продажи", value: -6 },
        { area: "Операционка", value: 7 },
        { area: "Управление", value: 0 },
        { area: "управление проектами", value: 5 },
      ],
      efficiency_loss_areas: [
        {
          area: "Управление",
          reason: "расфокус из-за большого количества зон контроля на двух людях",
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
        { month: "Мар", change_percent: 46 },
        { month: "Апр", change_percent: 30 },
        { month: "Сен", change_percent: 31 },
        { month: "Окт", change_percent: 44 },
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
        { label: "разработка MVP", value: 50, unit: "percent" },
        { label: "Страт Сессии", value: 80, unit: "percent" },
        { label: "автоматизации для бизнеса", value: 30, unit: "percent" },
      ],
      confidence_level: "medium",
    },
    lead_capacity: {
      chart_type: "bar_compare",
      title: "Спрос vs capacity",
      series: [
        { label: "Обращения", value: 13 },
        { label: "Capacity", value: 4 },
      ],
      confidence_level: "medium",
    },
    channel_mix: {
      chart_type: "donut",
      title: "Распределение входящего потока по каналам",
      series: [
        { label: "Meta Ads", value: 25 },
        { label: "Рефералы", value: 30 },
        { label: "Холодный outreach", value: 12 },
        { label: "Google Ads", value: 25 },
        { label: "возвраты клиентов с прошлого опыта", value: 8 },
      ],
      confidence_level: "medium",
    },
    seasonality_peaks: {
      chart_type: "bar",
      title: "Сезонные пики спроса",
      series: [
        { label: "Мар", value: 46, unit: "percent" },
        { label: "Апр", value: 30, unit: "percent" },
        { label: "Сен", value: 31, unit: "percent" },
        { label: "Окт", value: 44, unit: "percent" },
      ],
      confidence_level: "preliminary",
    },
    stress_map: {
      chart_type: "bar",
      title: "Где сильнее всего напряжение",
      series: [
        { label: "Маркетинг", value: 3 },
        { label: "Продажи", value: -6 },
        { label: "Операционка", value: 7 },
        { label: "Управление", value: 0 },
        { label: "управление проектами", value: 5 },
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
        [
          "Средняя маржинальность продуктов",
          "53.33%",
          "по 3 основным продуктам",
        ],
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
        ["Activation", "до 1 часа", "недопонятая ценность и реакция 'дорого'"],
        ["Value Realization", "до 30 минут", "завышенные ожидания"],
        ["Conversion", "до 10 минут", ""],
        ["Retention", "14 дней", ""],
      ],
    },
  },

  summary: {
    snapshot:
      "Бизнес очень ранний: полгода на рынке, 2 основателя, 1 клиент и 1900 USD cash-in за прошлый месяц.",
    current_position:
      "Спрос уже есть, но команда может обработать только часть входящего потока.",
    economics:
      "На текущем уровне заявлена маржа 55%, но она еще неустойчива из-за малого объема данных.",
    primary_need:
      "Сейчас важнее всего сделать стабильный и предсказуемый поток заявок без перегруза команды.",
    confidence_level: "preliminary",
  },

  insights: {
    current_state: {
      title: "Текущее состояние",
      text:
        "Компания на старте. Есть понятный фокус на SaaS, сильная вовлеченность двух основателей и первые валидные деньги, но база данных пока очень маленькая.",
      confidence_level: "medium",
    },
    main_loss: {
      title: "Главная потеря",
      text:
        "Основная потеря сейчас в том, что при 13 обращениях команда реально может обработать только 4. Это значит, что часть спроса не превращается в продажи.",
      confidence_level: "medium",
    },
    strongest_signal: {
      title: "Самый сильный сигнал",
      text:
        "Самый сильный сигнал — высокий интерес рынка относительно текущей capacity и наличие продукта с высокой маржой: стратегические сессии дают 80%.",
      confidence_level: "medium",
    },
    growth_limit: {
      title: "Что ограничивает рост",
      text:
        "Рост ограничивают нестабильный поток заявок, перегруз двух основателей и узкое место в операционке и проектном управлении.",
      confidence_level: "medium",
    },
    scalability_limit: {
      title: "Что мешает масштабироваться",
      text:
        "Если поток лидов вырастет, текущая модель упрется в людей. Сейчас слишком много функций держится на двух основателях, поэтому масштаб может быстро ухудшить качество и скорость.",
      confidence_level: "medium",
    },
    data_reliability: {
      title: "Надежность данных",
      text:
        "Выводы пока предварительные. В бизнесе был только один клиент, а часть метрик относится к разным периодам, поэтому экономику и конверсию лучше считать как ранний ориентир, а не как стабильную норму.",
      confidence_level: "preliminary",
    },
  },

  risks: [
    {
      risk: "Слишком мало исторических данных",
      impact:
        "Маржа, конверсия и средний чек могут сильно меняться от одного клиента.",
      confidence_level: "preliminary",
    },
    {
      risk: "Перегруз основателей",
      impact:
        "Скорость и качество работы могут просесть при росте числа проектов.",
      confidence_level: "medium",
    },
    {
      risk: "Потеря части спроса",
      impact:
        "При capacity 4 и 13 обращениях бизнес уже недозабирает потенциальные сделки.",
      confidence_level: "medium",
    },
    {
      risk: "Сложная коммуникация ценности",
      impact:
        "На ранних этапах воронки лиды могут уходить из-за непонятных формулировок и ощущения 'дорого'.",
      confidence_level: "medium",
    },
    {
      risk: "Завышенные ожидания после демо",
      impact:
        "Это может ухудшить удовлетворенность и повторные продажи, если ожидания не совпадут с результатом.",
      confidence_level: "medium",
    },
  ],

  missing_data: [
    {
      field: "company_name",
      reason: "название компании не указано",
    },
    {
      field: "exact_period_alignment",
      reason: "неясно, относятся ли лиды, клиенты и cash-in к одному и тому же месяцу",
    },
    {
      field: "net_profit_definition",
      reason: "указана маржа 55%, но не раскрыт точный состав расходов",
    },
    {
      field: "monthly recurring revenue",
      reason: "нет данных о регулярной выручке",
    },
    {
      field: "cac_value",
      reason: "CAC отслеживается, но числовое значение не дано",
    },
    {
      field: "ltv_value",
      reason: "LTV/CAC используется, но числовые значения не даны",
    },
    {
      field: "retention_rate",
      reason: "есть механики удержания, но нет фактической метрики удержания",
    },
    {
      field: "sales_cycle_average_days",
      reason: "есть этапы CJM, но нет единого замера реального цикла сделки по клиентам",
    },
  ],

  confidence_note:
    "Общая достоверность: preliminary. Бизнес очень ранний, данных мало, а часть цифр относится к разным срезам. Модель полезна как стартовая карта бизнеса, но не как финальная управленческая норма.",

  solution: {
    solution_summary: {
      headline: "Рост блокирует founder-led capacity, а не спрос",
      core_logic:
        "Пока управление, обработка лидов и delivery завязаны на двух основателях, бизнес теряет уже существующий спрос. Главный путь роста — не привлекать больше лидов, а перевести модель из ручного гибрида в более собранный и управляемый сервис с предсказуемой обработкой и продажей.",
      confidence_level: "medium",
    },
    primary_growth_lever: {
      lever:
        "Разгрузить founder-led processing и delivery через фокусную, более стандартизированную сервисную модель",
      reason:
        "Спрос уже есть, но он не конвертируется и не обрабатывается из-за перегруженной структуры, слабой управляемости и ручного исполнения.",
      supported_by_blocks: [
        "structure_processes",
        "clients_flow",
        "strategy",
        "product_sales",
      ],
      confidence_level: "medium",
    },
    primary_constraint: {
      constraint_type: "structure",
      label: "Founder-centric управленческая и операционная перегрузка",
      reason:
        "Ключевой лимит роста находится в структуре: два основателя держат решения, обработку спроса и delivery, из-за чего система не переваривает текущий объем входящего спроса.",
      supported_by_blocks: [
        "structure_processes",
        "clients_flow",
        "strategy",
        "analytics_management",
      ],
      confidence_level: "medium",
    },
    revenue_loss_source: {
      loss_type: "hidden_capacity_loss",
      label: "Потеря выручки в processing до продажи и в handoff к исполнению",
      explanation:
        "Деньги теряются в первую очередь на необработанном спросе; дополнительно размытое ценностное сообщение ослабляет конверсию еще до сделки.",
      visible_or_hidden: "visible",
      supported_by_blocks: ["economics", "clients_flow", "product_sales"],
      confidence_level: "medium",
    },
    model_change_recommendation: {
      current_model_problem:
        "Гибрид «стратегия + кастомная реализация» держится на ручном участии основателей, размывает оффер и плохо масштабируется по delivery и управлению.",
      proposed_model_shift:
        "Сместиться из founder-led гибридного кастома в более узкий, стандартизированный сервисный оффер вокруг одного понятного входного предложения с ограниченным контуром реализации.",
      why_this_shift:
        "Это уменьшает управленческую сложность, упрощает продажу ценности, снижает расфокус и делает обработку спроса более предсказуемой.",
      expected_unlock:
        "Больше обработанного спроса, выше управляемость, меньше зависимости от единичных сделок и более реалистичная база для 3 стабильных проектов.",
      confidence_level: "medium",
    },
    strategic_priorities: [
      {
        priority_rank: 1,
        action:
          "Собрать один управляемый контур обработки спроса: четкий owner, единый handoff от лида к продаже и далее к исполнению",
        why_now:
          "Пока ломается processing, любой дополнительный рост усиливает потери, а не выручку.",
        dependency:
          "Требует явного разделения зон ответственности между основателями.",
        expected_result:
          "Меньше необработанных лидов, быстрее реакция на входящий спрос, ниже операционный хаос.",
      },
      {
        priority_rank: 2,
        action:
          "Сузить и упростить оффер: продавать один понятный входной продукт вместо смешанного набора услуг",
        why_now:
          "После стабилизации потока следующий основной разрыв — слабая понятность ценности и реакция «дорого».",
        dependency:
          "Опирается на уже собранный процесс обработки и на выбор приоритетного сервисного формата.",
        expected_result:
          "Проще продажа, меньше потерь до сделки, выше повторяемость коммерческого диалога.",
      },
      {
        priority_rank: 3,
        action:
          "Перестроить delivery под стандартизируемое исполнение, а не под постоянное ручное участие основателей",
        why_now:
          "Без этого даже улучшенная продажа снова упрется в ту же capacity и перегруз управления.",
        dependency:
          "Нужны стабильный оффер и формализованный handoff между продажей и исполнением.",
        expected_result:
          "Более устойчивая загрузка, меньше founder dependency, реальная база для роста без срыва качества.",
      },
    ],
    business_impact: {
      revenue_impact:
        "Возврат части уже существующего, но теряемого спроса в выручку.",
      profit_impact:
        "Прибыль станет менее иллюзорной и ближе к масштабируемой модели, даже если маржа снизится к более реалистичному уровню.",
      flow_impact:
        "Поток станет менее рваным за счет лучшей обработки и меньшего leakage до сделки.",
      team_impact:
        "Снизится расфокус двух основателей и нагрузка на ручную координацию.",
      management_impact:
        "Решения станут менее ad hoc и более исполнимыми в регулярном контуре.",
      scalability_impact:
        "Бизнес сможет расти через процесс и оффер, а не только через личное усилие founders.",
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

  roadmap: {
    strategic_objective:
      "Перевести бизнес из founder-led ручной модели в управляемый сервисный контур, который способен стабильно обрабатывать текущий спрос, продавать один понятный входной оффер и исполнять проекты без постоянного операционного участия обоих основателей.",
    core_jtbd:
      "Собрать предсказуемую систему от лида до delivery, чтобы не терять уже существующий спрос из-за перегруза founders, размытого оффера и слабого handoff между продажей и исполнением.",
    phases: [
      {
        phase: "unlock",
        goal:
          "Снять главный bottleneck в processing и управлении: ввести единый контур обработки спроса, разделить ownership и ограничить ручное участие обоих founders в каждом этапе.",
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
          "Founder-centric управленческая и операционная перегрузка; перегруз processing при спросе выше capacity.",
        confidence_level: "medium",
      },
      {
        phase: "leverage",
        goal:
          "Повысить конвертацию уже существующего спроса через упрощение продажи, более ясное ценностное сообщение и стандартизированный объём delivery.",
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
          "Рост конверсии и обработанной выручки за счет более понятного входного оффера и меньшего leakage до сделки.",
        confidence_level: "medium",
      },
      {
        phase: "scale",
        goal:
          "Сделать рост повторяемым: закрепить систему управления, делегирования и контроля загрузки, чтобы держать стабильный поток проектов без возврата к founder-led хаосу.",
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
        related_blocks: ["structure_processes", "product_sales", "economics"],
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
        expected_effect: "Решения становятся регулярными и менее ad hoc.",
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
        "Спрос перестает теряться хаотично: появляется единый owner контуров, прозрачный pipeline, controlled intake и более предсказуемый handoff от продажи к исполнению.",
      "6_months":
        "Продажа становится проще и повторяемее за счет одного входного оффера, сокращается leakage до сделки, а delivery выдерживает несколько параллельных проектов с меньшей founder dependency.",
      "12_months":
        "Бизнес переходит к более стабильной сервисной модели: выручка меньше зависит от единичных кастомных сделок, загрузка становится управляемой, а рост опирается на процесс и оффер, а не на ручное усилие founders.",
    },
  },
} as const;

export const resultsMockData: ResultsPageData = {
  hero: {
    companyName: resultsPayloadMock.hero_block.companyName || "N/A",
    salesGeography: resultsPayloadMock.hero_block.sales_geography.join(" + "),
    summary: resultsPayloadMock.hero_block.summary,
    description: resultsPayloadMock.hero_block.description,
    growthLimit: resultsPayloadMock.hero_block.growth_limit,
    cashIn: `$${resultsPayloadMock.hero_block.cash_in.value.toLocaleString()}`,
    confidenceLevel: 2,
    roles: resultsPayloadMock.hero_block.roles.map((item) => ({
      role: item.role,
      responsibility: item.responsibility,
    })),
    productMargins: resultsPayloadMock.hero_block.product_margins_chart.series.map(
      (item) => ({
        name: item.product,
        marginPercent: item.margin,
      }),
    ),
  },

  solution: {
    title: resultsPayloadMock.solution.solution_summary.headline,
    summary: resultsPayloadMock.solution.solution_summary.core_logic,
    confidenceLevel: 2,
    cards: [
      {
        title: "Primary growth lever",
        value: resultsPayloadMock.solution.primary_growth_lever.lever,
        note: resultsPayloadMock.solution.primary_growth_lever.reason,
      },
      {
        title: "Primary constraint",
        value: resultsPayloadMock.solution.primary_constraint.label,
        note: resultsPayloadMock.solution.primary_constraint.reason,
      },
      {
        title: "Revenue loss source",
        value: resultsPayloadMock.solution.revenue_loss_source.label,
        note: resultsPayloadMock.solution.revenue_loss_source.explanation,
      },
      {
        title: "Model shift",
        value: resultsPayloadMock.solution.model_change_recommendation.proposed_model_shift,
        note: resultsPayloadMock.solution.model_change_recommendation.expected_unlock,
      },
    ],
  },

  roadmap: {
    phases: resultsPayloadMock.roadmap.phases.map((phase) => ({
      period: phase.phase,
      title: phase.goal,
      description: phase.linked_constraint ?? phase.linked_lever ?? phase.linked_system,
      tasks: phase.key_actions.map((action) => action.action),
    })),
  },

  forecasts: {
    revenue: {
      current: `$${resultsPayloadMock.normalized_data.financials.last_month_cash_in.toLocaleString()}`,
      target: "$3,800",
      delta: 100,
    },
    costs: {
      current: "$855",
      target: "$1,140",
      delta: 33,
    },
    profit: {
      current: `$${resultsPayloadMock.normalized_data.financials.profit_last_month_estimated.toLocaleString()}`,
      target: "$2,090",
      delta: 100,
    },
    assumptions: [
      "Сначала стабилизируется processing и снижается hidden capacity loss",
      "Конверсия растет за счет более ясного входного оффера и более простого первого касания",
      "Рост идет через управляемый delivery, а не через хаотичное увеличение входящего потока",
      "Часть уже существующего спроса возвращается в выручку после устранения bottleneck по capacity",
      "Текущая маржа 55% со временем нормализуется ближе к целевой 30% на масштабе",
    ],
  },

  businessContext: {
    summary:
      "Полный нормализованный бизнес-контекст, charts, tables, risks и missing data, на которых основаны выводы страницы.",
    sections: [
      {
        title: "Company",
        rows: [
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
            value: resultsPayloadMock.normalized_data.company.sales_geography.join(
              ", ",
            ),
          },
          {
            label: "Core team",
            value: String(resultsPayloadMock.normalized_data.company.team_size_core),
          },
          {
            label: "Contractors",
            value: resultsPayloadMock.normalized_data.company.uses_contractors
              ? "Yes"
              : "No",
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
            value: resultsPayloadMock.normalized_data.offer.target_customers.join(", "),
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
            label: "Cash-in last month",
            value: `${resultsPayloadMock.normalized_data.financials.last_month_cash_in} ${resultsPayloadMock.normalized_data.financials.last_month_currency}`,
          },
          {
            label: "Contract value",
            value: `$${resultsPayloadMock.normalized_data.financials.contract_value}`,
          },
          {
            label: "Payment structure",
            value: resultsPayloadMock.normalized_data.financials.contract_payment_structure,
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
            label: "Estimated profit",
            value: `$${resultsPayloadMock.normalized_data.financials.profit_last_month_estimated}`,
          },
          {
            label: "Net profit growth goal",
            value: `+${resultsPayloadMock.normalized_data.financials.goal_net_profit_growth_percent}%`,
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
            label: "Leads",
            value: String(resultsPayloadMock.normalized_data.sales.lead_volume),
          },
          {
            label: "Capacity",
            value: String(resultsPayloadMock.normalized_data.sales.processing_capacity),
          },
          {
            label: "Conversion rate",
            value: `${(resultsPayloadMock.normalized_data.sales.conversion_rate * 100).toFixed(2)}%`,
          },
          {
            label: "Avg check",
            value: `$${resultsPayloadMock.normalized_data.sales.avg_check_last_month}`,
          },
          {
            label: "Demand / capacity",
            value: `${resultsPayloadMock.normalized_data.sales.demand_to_capacity}x`,
          },
          {
            label: "Unmet demand",
            value: String(resultsPayloadMock.normalized_data.sales.unmet_demand),
          },
        ],
      },
      {
        title: "Products",
        rows: [
          {
            label: "Product margins",
            value: resultsPayloadMock.normalized_data.products.product_margins
              .map((item) => `${item.product}: ${item.margin_percent}%`)
              .join(" • "),
          },
          {
            label: "Average product margin",
            value: `${resultsPayloadMock.normalized_data.products.avg_margin_percent}%`,
          },
          {
            label: "Margin spread",
            value: `${resultsPayloadMock.normalized_data.products.margin_spread_percent} p.p.`,
          },
          {
            label: "Highest margin product",
            value: resultsPayloadMock.normalized_data.products.highest_margin_product,
          },
          {
            label: "Lowest margin product",
            value: resultsPayloadMock.normalized_data.products.lowest_margin_product,
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
            label: "Stages",
            value: resultsPayloadMock.normalized_data.customer_journey.stages
              .map((stage) => stage.stage)
              .join(", "),
          },
          {
            label: "CJM total time",
            value: `${resultsPayloadMock.normalized_data.customer_journey.cjm_time_minutes} minutes`,
          },
        ],
      },
      {
        title: "Team & Management",
        rows: [
          {
            label: "Roles",
            value: resultsPayloadMock.normalized_data.team.roles
              .map((item) => `${item.role}: ${item.responsibility}`)
              .join(" • "),
          },
          {
            label: "Decision making",
            value: resultsPayloadMock.normalized_data.team.decision_making,
          },
          {
            label: "Interaction comment",
            value: resultsPayloadMock.normalized_data.team.interaction.comment,
          },
          {
            label: "Stress map",
            value: resultsPayloadMock.normalized_data.management.stress_levels
              .map((item) => `${item.area}: ${item.value}`)
              .join(" • "),
          },
          {
            label: "Efficiency losses",
            value: resultsPayloadMock.normalized_data.management.efficiency_loss_areas
              .map((item) => `${item.area}: ${item.reason}`)
              .join(" • "),
          },
        ],
      },
      {
        title: "Analytics",
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
              .join(" • "),
          },
          {
            label: "Slow periods",
            value: resultsPayloadMock.normalized_data.seasonality.slow_period_notes.join(
              " • ",
            ),
          },
        ],
      },
      {
        title: "Recent changes",
        rows: resultsPayloadMock.normalized_data.recent_changes.implemented_last_6_months.map(
          (item) => ({
            label: "Change",
            value: item,
          }),
        ),
      },
      {
        title: "Goals",
        rows: [
          {
            label: "3 months",
            value: resultsPayloadMock.normalized_data.goals["3_months"].join(" • "),
          },
          {
            label: "6 months",
            value: resultsPayloadMock.normalized_data.goals["6_months"].join(" • "),
          },
          {
            label: "12 months",
            value: resultsPayloadMock.normalized_data.goals["12_months"].join(" • "),
          },
        ],
      },
      {
        title: "Missing data",
        rows: resultsPayloadMock.missing_data.map((item) => ({
          label: item.field,
          value: item.reason,
        })),
      },
      {
        title: "Risks",
        rows: resultsPayloadMock.risks.map((item) => ({
          label: item.risk,
          value: item.impact,
        })),
      },
    ],
  },

  blocks: [
    {
      id: "strategy",
      title: "Strategy",
      truthSummary: resultsPayloadMock.strategy.truth_summary.summary,
      mainDiagnosis: resultsPayloadMock.strategy.strategic_posture.explanation,
      confidenceLevel: 1,
      keySignals: [
        {
          label: "Profit goal",
          value: `+${resultsPayloadMock.strategy.normalized_inputs.profit_goal_percent}%`,
        },
        {
          label: "Demand / Capacity",
          value: `${resultsPayloadMock.strategy.normalized_inputs.demand_to_capacity_ratio}x`,
        },
        {
          label: "Unmet demand",
          value: String(resultsPayloadMock.strategy.normalized_inputs.unmet_demand),
        },
      ],
      explanation: resultsPayloadMock.strategy.near_term_focus.explanation,
      implication: resultsPayloadMock.strategy.strategy_feasibility_view.explanation,
    },
    {
      id: "structure_processes",
      title: "Structure & Processes",
      truthSummary: resultsPayloadMock.structure_processes.truth_summary.summary,
      mainDiagnosis:
        resultsPayloadMock.structure_processes.main_process_break.explanation,
      confidenceLevel: 2,
      keySignals: [
        {
          label: "Team size",
          value: String(resultsPayloadMock.structure_processes.normalized_inputs.team_size),
        },
        {
          label: "Dependency",
          value: resultsPayloadMock.structure_processes.founder_dependency_level.level,
        },
        {
          label: "Demand / Capacity",
          value: `${resultsPayloadMock.structure_processes.normalized_inputs.demand_to_capacity_ratio}x`,
        },
      ],
      explanation:
        resultsPayloadMock.structure_processes.team_scalability_limit.explanation,
      implication:
        resultsPayloadMock.structure_processes.structure_growth_limit_view.explanation,
    },
    {
      id: "analytics_management",
      title: "Analytics & Management",
      truthSummary: resultsPayloadMock.analytics_management.truth_summary.summary,
      mainDiagnosis:
        resultsPayloadMock.analytics_management.main_management_gap.explanation,
      confidenceLevel: 2,
      keySignals: [
        {
          label: "Analytics maturity",
          value: resultsPayloadMock.analytics_management.analytics_maturity_level.level,
        },
        {
          label: "Controllability",
          value: resultsPayloadMock.analytics_management.controllability_level.level,
        },
        {
          label: "Decision model",
          value: resultsPayloadMock.analytics_management.decision_model_type.type,
        },
      ],
      explanation:
        resultsPayloadMock.analytics_management.data_usage_takeaway.explanation,
      implication:
        resultsPayloadMock.analytics_management.management_growth_limit_view.explanation,
    },
    {
      id: "product_sales",
      title: "Product & Sales",
      truthSummary: resultsPayloadMock.product_sales.truth_summary.summary,
      mainDiagnosis:
        resultsPayloadMock.product_sales.main_revenue_leak.explanation,
      confidenceLevel: 1,
      keySignals: [
        {
          label: "Core driver",
          value: resultsPayloadMock.product_sales.core_revenue_driver.type,
        },
        {
          label: "Highest margin",
          value: "Страт Сессии 80%",
        },
        {
          label: "Revenue dependency",
          value: resultsPayloadMock.product_sales.revenue_dependency_type.type,
        },
      ],
      explanation:
        resultsPayloadMock.product_sales.retention_layer_takeaway.explanation,
      implication:
        resultsPayloadMock.product_sales.product_scalability_view.explanation,
    },
    {
      id: "clients_flow",
      title: "Clients & Flow",
      truthSummary: resultsPayloadMock.clients_flow.truth_summary.summary,
      mainDiagnosis:
        resultsPayloadMock.clients_flow.main_flow_loss_pattern.explanation,
      confidenceLevel: 1,
      keySignals: [
        {
          label: "Leads",
          value: String(resultsPayloadMock.clients_flow.normalized_inputs.leads),
        },
        {
          label: "Capacity",
          value: String(resultsPayloadMock.clients_flow.normalized_inputs.capacity),
        },
        {
          label: "Demand / Capacity",
          value: `${resultsPayloadMock.clients_flow.normalized_inputs.demand_to_capacity_ratio}x`,
        },
      ],
      explanation: resultsPayloadMock.clients_flow.flow_stability.reason,
      implication:
        resultsPayloadMock.clients_flow.flow_growth_limit_view.explanation,
    },
    {
      id: "positioning",
      title: "Positioning",
      truthSummary: resultsPayloadMock.positioning.truth_summary.summary,
      mainDiagnosis: resultsPayloadMock.positioning.positioning_type.explanation,
      confidenceLevel: 1,
      keySignals: [
        {
          label: "Business model",
          value: resultsPayloadMock.positioning.business_model.type,
        },
        {
          label: "Target",
          value: resultsPayloadMock.positioning.target_client.type,
        },
        {
          label: "Geography",
          value: resultsPayloadMock.positioning.normalized_inputs.geography.join(
            " + ",
          ),
        },
      ],
      explanation: resultsPayloadMock.positioning.target_client.explanation,
      implication: resultsPayloadMock.positioning.market_fit_view.explanation,
    },
    {
      id: "economics",
      title: "Economics",
      truthSummary: resultsPayloadMock.economics.truth_summary.summary,
      mainDiagnosis: resultsPayloadMock.economics.main_loss_pattern.explanation,
      confidenceLevel: 1,
      keySignals: [
        {
          label: "Cash-in",
          value: `$${resultsPayloadMock.economics.normalized_inputs.cash_in}`,
        },
        {
          label: "Margin",
          value: `${resultsPayloadMock.economics.normalized_inputs.margin_percent}%`,
        },
        {
          label: "Demand / Capacity",
          value: `${resultsPayloadMock.economics.normalized_inputs.demand_to_capacity_ratio}x`,
        },
      ],
      explanation: resultsPayloadMock.economics.reliability_of_margin.reason,
      implication:
        resultsPayloadMock.economics.economic_growth_limit_view.explanation,
    },
  ],

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
