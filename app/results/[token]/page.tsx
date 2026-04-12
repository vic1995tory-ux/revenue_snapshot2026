"use client";

import { useMemo, useState } from "react";

type Tone = "yellow" | "green" | "gray";

type HeroTag = {
  id: string;
  label: string;
  tone?: Tone;
};

type HeroMetric = {
  id: string;
  label: string;
  value: string;
  note?: string;
};

type InterpretationBlock = {
  id: string;
  title: string;
  signal: string;
  interpretation: string;
  dependencies: string;
  risk: string;
  unknown: string;
  conclusion: string;
  extra?: Record<string, string | number | null>;
};

type LeverRole = "primary" | "amplifies" | "unlocks" | "stabilizes" | "rejected_now";

type LeverCard = {
  id: string;
  name: string;
  role: LeverRole;
  zone: string;
  text: string;
};

type RoadmapPhase = {
  phase: string;
  objective: string;
  why_this_phase_now: string;
  key_actions: string[];
  expected_intermediate_result: string;
  dependencies: string[];
  owner_logic: string;
  control_points: string[];
  risk_if_not_done: string;
};

type ControlMetric = {
  name: string;
  why_it_matters: string;
  current_if_known: string;
  target_if_inferable: string;
  direction: "up" | "down" | "stable";
  review_frequency: string;
};

type AlertRule = {
  label: string;
  trigger_logic: string;
  interpretation: string;
  required_action: string;
};

type ScenarioCard = {
  name: string;
  logic: string;
  expected_effect: string;
};

type PagePayload = {
  company: {
    name: string;
    niche: string;
    stage: string;
    geography: string;
  };
  hero: {
    eyebrow: string[];
    headline: string;
    summary: string;
    tags: HeroTag[];
    metrics: HeroMetric[];
    growth_limit: {
      title: string;
      bottleneck: string;
      explanation: string;
    };
    primary_lever: {
      title: string;
      description: string;
      zone: string;
    };
    market_adjustment: {
      title: string;
      text: string;
    };
  };
  interpretation: {
    title: string;
    intro: string;
    blocks: InterpretationBlock[];
  };
  solution: {
    strategic_scenario: {
      type: string;
      why_this_scenario: string;
      market_limits: string;
      not_now: string[];
    };
    primary_growth_lever: {
      name: string;
      essence: string;
      zone: string;
      why_this_lever: string;
      model_change_recommendation: string;
    };
    lever_system: LeverCard[];
    lever_mechanics: {
      lever: string;
      affected_metric: string;
      economic_shift: string;
      business_result: string;
    }[];
    implementation_logic: {
      what_must_change: string;
      application_points: string[];
      what_system_must_appear: string[];
      implementation_conditions: string[];
      core_dependencies: string[];
      main_risks: string[];
      fail_conditions: string[];
    };
    strategic_priorities: {
      priority_1: string;
      priority_2: string;
      priority_3: string;
      forbidden_now: string[];
    };
    expected_business_shift: {
      what_decreases: string[];
      what_grows: string[];
      key_metric_of_success: string;
      near_term_effect: string;
      medium_term_effect: string;
    };
  };
  roadmap: {
    title: string;
    intro: string;
    phases: RoadmapPhase[];
    control_metrics: ControlMetric[];
    alert_rules: AlertRule[];
    decision_signals: string[];
    operating_scenarios: ScenarioCard[];
    uncertainty_layer: {
      confirmed: string[];
      hypotheses: string[];
      requires_research: string[];
    };
  };
};

const payload: PagePayload = {
  company: {
    name: "Growth Avenue",
    niche: "Consulting / SaaS Strategy",
    stage: "Early stage",
    geography: "EU + CIS",
  },
  hero: {
    eyebrow: ["Revenue Snapshot", "Growth Avenue", "Consulting / SaaS Strategy", "EU + CIS"],
    headline: "Рост ограничен не отсутствием спроса, а слабой упаковкой ценности и низкой конверсией в оплату.",
    summary:
      "Бизнес получает входящий интерес, но не превращает его в устойчивую выручку. Ограничение лежит в зоне value proposition, productized offer и логики продажи: спрос уже есть, но он плохо монетизируется из-за сложного оффера, размытого позиционирования и ручной модели исполнения.",
    tags: [
      { id: "1", label: "#conversionloss", tone: "yellow" },
      { id: "2", label: "#unclearvalue", tone: "yellow" },
      { id: "3", label: "#founderoverload", tone: "yellow" },
      { id: "4", label: "#pricesensitive", tone: "gray" },
      { id: "5", label: "#earlystage", tone: "gray" },
      { id: "6", label: "#offerpackaging", tone: "green" },
    ],
    metrics: [
      { id: "revenue", label: "Revenue", value: "$1,900", note: "received" },
      { id: "margin", label: "Margin", value: "55%", note: "self-reported" },
      { id: "clients", label: "Clients", value: "1", note: "confirmed" },
      { id: "demand", label: "Demand", value: "13", note: "incoming leads" },
      { id: "capacity", label: "Capacity", value: "4", note: "processable" },
      { id: "conversion", label: "Conversion", value: "7.7%", note: "lead to sale" },
    ],
    growth_limit: {
      title: "Conversion / Offer clarity",
      bottleneck: "Неясное и перегруженное value proposition",
      explanation:
        "Поток уже присутствует, но не конвертируется из-за сложности оффера, слабой стандартизации и высокой зависимости от ручного объяснения ценности. Рынок усиливает этот эффект, потому что чувствителен к цене и требует простого, доказуемого решения.",
    },
    primary_lever: {
      title: "Productized offer + value simplification",
      description:
        "Переход от кастомного и размыто описанного консалтинга к узкому, стандартизированному предложению с фиксированным результатом, scope и понятной ценностью.",
      zone: "Product / Sales",
    },
    market_adjustment: {
      title: "Market adjustment",
      text:
        "Высокая ценовая чувствительность и конкуренция снижают шансы сложного широкого предложения. Рынок лучше реагирует на ясный ICP, короткое объяснение ценности и четкую фиксацию результата.",
    },
  },
  interpretation: {
    title: "Интерпретация ответов",
    intro:
      "Ниже — поблочная интерпретация диагностики. Каждая карточка показывает ключевой сигнал и открывает выезжающую слева панель с разбором: что означает сигнал, с чем он связан, какой создает риск и что пока не доказано.",
    blocks: [
      {
        id: "positioning",
        title: "Positioning",
        signal: "Ранняя стадия, широкий спектр услуг, попытка сфокусироваться на SaaS без четкого ICP.",
        interpretation:
          "Позиционирование пока не зафиксировано. Бизнес выглядит как гибрид консалтинга и реализации, а продуктовая линейка остается слишком широкой для быстрой и понятной продажи.",
        dependencies:
          "На price-sensitive рынке это напрямую ухудшает конверсию и удлиняет цикл сделки.",
        risk: "Размытое позиционирование снижает понятность выбора и делает продажу зависимой от ручного объяснения.",
        unknown: "Нет данных о четком ICP, среднем чеке по сегментам и длине сделки.",
        conclusion: "Бизнес находится на стадии поиска устойчивой ниши и четкой упаковки предложения.",
      },
      {
        id: "economics",
        title: "Economics",
        signal: "1 клиент, $1,900 получено, маржа 55% заявлена, но экономика невалидирована.",
        interpretation:
          "Одна сделка не подтверждает устойчивость модели. Положительный сигнал есть, но он не дает права считать экономику проверенной или повторяемой.",
        dependencies:
          "Будущая прибыльность зависит от способности масштабировать delivery без падения маржи.",
        risk: "При росте проектов маржа может резко просесть из-за перегруза и ручной модели исполнения.",
        unknown: "CAC, реальная прибыль, повторяемость продаж и качество unit-экономики.",
        conclusion: "Экономика гипотетически положительная, но не проверена и нестабильна.",
        extra: { revenue: 1900, clients: 1, conversion: 0.0769 },
      },
      {
        id: "clients_flow",
        title: "Clients & Flow",
        signal: "13 обращений при capacity 4, но только 1 клиент.",
        interpretation:
          "Дефицита спроса нет. Главная проблема не в объеме входящего потока, а в том, что этот поток плохо монетизируется и проходит через систему неравномерно.",
        dependencies:
          "Это усиливает важность качества оффера и структуры продажи.",
        risk: "Рост входящего потока без пересборки конверсии лишь усилит перегруз и хаос.",
        unknown: "Качество лидов и распределение конверсии по каналам.",
        conclusion: "Поток есть, но он плохо монетизируется.",
      },
      {
        id: "product_sales",
        title: "Product & Sales",
        signal: "Сложный CJM, перегруженные формулировки и слабое донесение ценности.",
        interpretation:
          "Конверсия падает не из-за отсутствия интереса, а потому что оффер трудно быстро понять и сравнить. Клиенту неочевидно, что именно он получает и почему покупать сейчас.",
        dependencies:
          "Этот блок напрямую связан с positioning и определяет primary lever.",
        risk: "Теплые лиды теряются на этапе понимания ценности.",
        unknown: "Реальная конверсия по этапам CJM и роль retention как следующего рычага.",
        conclusion: "Главная утечка происходит на уровне оффера и объяснения ценности.",
      },
      {
        id: "analytics_management",
        title: "Analytics & Management",
        signal: "Метрики декларированы, но данных для полноценного управления пока недостаточно.",
        interpretation:
          "Аналитика существует скорее как намерение. Пока она не стала устойчивым инструментом контроля и проверки гипотез.",
        dependencies:
          "Это ограничивает способность быстро валидировать изменения в конверсии и оффере.",
        risk: "Ложные выводы на маленькой выборке и неустойчивые управленческие решения.",
        unknown: "Регулярность использования данных в принятии решений.",
        conclusion: "Аналитика есть, но пока не является реальным контуром управления.",
      },
      {
        id: "structure_processes",
        title: "Structure & Processes",
        signal: "2 founders, высокая перегрузка, участие почти во всех функциях.",
        interpretation:
          "Операционная система завязана на founders и плохо масштабируется. Даже при наличии спроса рост быстро упирается в ручное управление и низкую воспроизводимость delivery.",
        dependencies:
          "Это усиливает проблему product_sales и ограничивает capacity.",
        risk: "Даже улучшенный оффер будет сложно масштабировать без стандартизации и разгрузки.",
        unknown: "Степень формализации процессов и глубина делегирования.",
        conclusion: "Операционная система — ключевое ограничение масштабирования.",
      },
      {
        id: "strategy",
        title: "Strategy",
        signal: "Желание усилить acquisition при слабой монетизации текущего спроса.",
        interpretation:
          "Фокус смещен в верх воронки, хотя главная проблема находится ниже — в конверсии, упаковке ценности и стандартизации продажи.",
        dependencies:
          "Подтверждается economics, clients_flow и product_sales.",
        risk: "Рост трафика усилит потери и перегруз без роста качественной выручки.",
        unknown: "Насколько быстро можно упростить продукт и зафиксировать ICP.",
        conclusion: "Нужен сдвиг из acquisition в conversion-first scenario.",
      },
    ],
  },
  solution: {
    strategic_scenario: {
      type: "Conversion-first validation and packaging",
      why_this_scenario:
        "Спрос уже присутствует, но не монетизируется из-за слабого value proposition и перегруженной модели. Приоритет — не рост трафика, а доказательство конверсионной и юнит-логики через упрощение и стандартизацию оффера.",
      market_limits:
        "Рынок требует четкого, простого и доказуемого предложения. Широкие и сложные услуги проигрывают узким и понятным продуктам.",
      not_now: [
        "Масштабирование acquisition",
        "Расширение линейки услуг",
        "Найм без стандартизации delivery",
        "Усложнение CJM и многоступенчатые прогревы",
      ],
    },
    primary_growth_lever: {
      name: "Productized offer + value simplification",
      essence:
        "Переход от кастомного консалтинга к 1–2 четким продуктам с понятным ICP, фиксированным scope, сроком и ожидаемым результатом.",
      zone: "product_sales",
      why_this_lever:
        "Основная потеря происходит в конверсии. Экономика подтверждает наличие спроса, но низкую монетизацию. На price-sensitive рынке именно ясность ценности и простота решения определяют оплату.",
      model_change_recommendation:
        "Уйти от модели «широкий консалтинг + реализация» к узкому, легко объяснимому продукту: audit + roadmap / conversion fix sprint с фиксированным результатом и ограниченным scope.",
    },
    lever_system: [
      {
        id: "l1",
        name: "Productized offer + value simplification",
        role: "primary",
        zone: "product_sales",
        text: "Главный рычаг. Устраняет core bottleneck и делает ценность понятной в течение первых касаний.",
      },
      {
        id: "l2",
        name: "Narrow ICP positioning",
        role: "amplifies",
        zone: "positioning",
        text: "Усиливает продажу, потому что сужает контекст и убирает лишнюю сложность из сообщения.",
      },
      {
        id: "l3",
        name: "Structured sales process",
        role: "unlocks",
        zone: "sales",
        text: "Позволяет новой логике оффера работать повторяемо, а не только усилиями founders.",
      },
      {
        id: "l4",
        name: "Delivery standardization",
        role: "stabilizes",
        zone: "operations",
        text: "Не дает росту качества продажи разрушиться после первой волны сделок.",
      },
      {
        id: "l5",
        name: "Traffic scaling",
        role: "rejected_now",
        zone: "acquisition",
        text: "Сейчас усилит потери, потому что существующий спрос еще не проходит через систему монетизации стабильно.",
      },
    ],
    lever_mechanics: [
      {
        lever: "Упрощение оффера до одного понятного результата",
        affected_metric: "Conversion rate",
        economic_shift: "Рост доли оплаченных лидов без увеличения CAC",
        business_result: "Рост выручки при том же объеме входящего спроса",
      },
      {
        lever: "Productization с фиксированным scope и ценой",
        affected_metric: "Sales cycle length + close rate",
        economic_shift: "Снижение длины сделки и рост предсказуемости дохода",
        business_result: "Более быстрый оборот и более контролируемая загрузка capacity",
      },
      {
        lever: "Сегментация ICP",
        affected_metric: "Lead quality",
        economic_shift: "Снижение потерь на нерелевантных лидах",
        business_result: "Рост эффективной конверсии и снижение операционной перегрузки",
      },
    ],
    implementation_logic: {
      what_must_change:
        "Модель должна перейти от широкой и кастомной продажи к узкому, стандартизированному и легко объяснимому продукту с четким ICP.",
      application_points: [
        "Коммерческое предложение",
        "Первичный контакт / discovery call",
        "Сайт / презентация",
        "Структура услуги",
        "Процесс продажи",
      ],
      what_system_must_appear: [
        "1–2 четко описанных продукта",
        "Единый sales script",
        "Шаблон delivery",
        "Система квалификации лидов",
      ],
      implementation_conditions: [
        "Готовность отказаться от части текущих направлений",
        "Фокус на одном сегменте",
        "Быстрое тестирование вместо идеализации upfront",
      ],
      core_dependencies: [
        "Выбор ICP",
        "Способность формализовать экспертизу",
        "Время founders на переработку оффера",
      ],
      main_risks: [
        "Перегрузка детализацией вместо упрощения",
        "Сохранение кастомной продажи под видом продукта",
        "Выбор слишком широкого ICP",
      ],
      fail_conditions: [
        "Оффер нельзя объяснить за 30 секунд",
        "Каждая сделка требует сильной кастомизации",
        "Конверсия не растет после 5–10 попыток продаж",
      ],
    },
    strategic_priorities: {
      priority_1: "Жесткое упрощение и фиксация value proposition",
      priority_2: "Создание productized offer",
      priority_3: "Стандартизация продаж и delivery",
      forbidden_now: [
        "Рост трафика",
        "Добавление новых услуг",
        "Масштабирование команды",
      ],
    },
    expected_business_shift: {
      what_decreases: ["Потери лидов", "Длина сделки", "Операционная перегрузка"],
      what_grows: ["Конверсия", "Предсказуемость выручки", "Эффективность использования лидов"],
      key_metric_of_success: "Conversion rate из лида в оплату",
      near_term_effect: "Рост выручки без увеличения трафика",
      medium_term_effect: "Появление валидированной и масштабируемой модели",
    },
  },
  roadmap: {
    title: "Roadmap внедрения",
    intro:
      "Порядок фаз строится не от красивой презентации, а от логики устранения bottleneck. Сначала — понятный оффер и проверка реакции рынка. Затем — стандартизация продажи и delivery. Только потом — база для масштабирования.",
    phases: [
      {
        phase: "0–30 days",
        objective: "Сформировать и протестировать 1 продуктовый оффер",
        why_this_phase_now: "Без четкого оффера невозможно улучшить конверсию и проверить, на что рынок действительно реагирует.",
        key_actions: [
          "Выбрать узкий ICP на основе текущих лидов",
          "Сформулировать 1 главную проблему и обещаемый результат",
          "Собрать productized offer: scope, сроки, цена",
          "Переписать pitch и материалы",
          "Провести 5–10 продаж по новому сценарию",
        ],
        expected_intermediate_result: "Появляется воспроизводимая реакция рынка на конкретный оффер.",
        dependencies: ["Доступ к лидам", "Время founders"],
        owner_logic: "Founders лично, без делегирования ключевой логики оффера на этом этапе.",
        control_points: [
          "Понятность оффера за 30 секунд",
          "Конверсия из лида в созвон",
          "Конверсия из созвона в оплату",
        ],
        risk_if_not_done: "Сохранится текущая потеря лидов и размытая продажа.",
      },
      {
        phase: "30–90 days",
        objective: "Стандартизировать продажи и delivery",
        why_this_phase_now: "После первичного подтверждения нужно закрепить воспроизводимость и убрать ручной хаос из процесса.",
        key_actions: [
          "Зафиксировать sales process и этапы",
          "Внедрить квалификацию лидов",
          "Создать шаблоны delivery",
          "Ограничить вариативность проекта",
          "Начать учитывать unit-экономику по проектам",
        ],
        expected_intermediate_result: "Сделки становятся повторяемее, загрузка — предсказуемее.",
        dependencies: ["Валидированный оффер"],
        owner_logic: "Founder + постепенная делегация части процессов.",
        control_points: ["Время сделки", "Доля закрытых сделок", "Фактическая маржа по проектам"],
        risk_if_not_done: "Рост клиентов усилит хаос вместо усиления модели.",
      },
      {
        phase: "3–6 months",
        objective: "Доказать экономику и подготовить базу для масштабирования",
        why_this_phase_now: "Только после стабилизации можно безопасно думать о росте спроса и расширении системы.",
        key_actions: [
          "Накопить 10–20 сделок",
          "Проанализировать конверсию и маржу",
          "Доработать позиционирование",
          "Подготовить кейсы",
          "Частично делегировать delivery",
        ],
        expected_intermediate_result: "Появляется подтвержденная модель с понятной экономикой.",
        dependencies: ["Стабильный поток лидов", "Работающий процесс продаж"],
        owner_logic: "Founders + первые исполнители.",
        control_points: ["LTV/CAC если возможно", "Средний чек", "Загрузка capacity"],
        risk_if_not_done: "Масштабирование останется небезопасным и основанным на гипотезах.",
      },
    ],
    control_metrics: [
      {
        name: "Lead-to-sale conversion",
        why_it_matters: "Главный индикатор устранения текущей утечки",
        current_if_known: "7.7%",
        target_if_inferable: "20%",
        direction: "up",
        review_frequency: "weekly",
      },
      {
        name: "Sales cycle length",
        why_it_matters: "Показывает, стал ли оффер проще для покупки",
        current_if_known: "n/a",
        target_if_inferable: "-30% to -50%",
        direction: "down",
        review_frequency: "weekly",
      },
      {
        name: "Project margin (real)",
        why_it_matters: "Подтверждает, что productization не разрушает экономику",
        current_if_known: "n/a",
        target_if_inferable: ">= 40%",
        direction: "up",
        review_frequency: "per project",
      },
    ],
    alert_rules: [
      {
        label: "Low conversion",
        trigger_logic: "Conversion < 10% после 10+ лидов",
        interpretation: "Оффер не работает или ценность все еще не считывается",
        required_action: "Пересобрать value proposition и сузить ICP",
      },
      {
        label: "Overcustomization",
        trigger_logic: "80%+ сделок требуют кастомных условий",
        interpretation: "Нет реальной продуктовой модели",
        required_action: "Жестко ограничить scope и формат продукта",
      },
    ],
    decision_signals: [
      "Рост конверсии без увеличения трафика",
      "Снижение времени сделки",
      "Повторяемость запросов от похожих клиентов",
    ],
    operating_scenarios: [
      {
        name: "Conservative",
        logic: "Медленное тестирование одного оффера",
        expected_effect: "Низкий риск, медленный рост",
      },
      {
        name: "Balanced",
        logic: "Параллельное тестирование 1–2 офферов с быстрым отбором",
        expected_effect: "Оптимальный баланс скорости и риска",
      },
      {
        name: "Aggressive",
        logic: "Жесткий пивот каждые 5–7 сделок",
        expected_effect: "Быстрое нахождение PMF, высокий риск потери фокуса",
      },
    ],
    uncertainty_layer: {
      confirmed: [
        "Наличие спроса при низкой конверсии",
        "Размытое позиционирование",
        "Перегруз founders",
        "Отсутствие валидированной экономики",
      ],
      hypotheses: [
        "Упрощение оффера кратно увеличит конверсию",
        "Узкий ICP улучшит качество лидов",
        "Productization сохранит маржу",
      ],
      requires_research: [
        "Реальный CAC",
        "Распределение конверсии по этапам CJM",
        "Маржинальность при масштабировании",
        "Оптимальный ICP",
      ],
    },
  },
};

function toneClass(tone?: Tone) {
  if (tone === "yellow") return "border-[#f7d237]/30 bg-[#f7d237]/10 text-[#f7d237]";
  if (tone === "green") return "border-[#18d4a4]/30 bg-[#18d4a4]/10 text-[#7ef0d2]";
  return "border-white/12 bg-white/5 text-[#c3cae1]";
}

function roleClass(role: LeverRole) {
  if (role === "primary") return "border-[#f7d237]/30 bg-[#f7d237]/10";
  if (role === "rejected_now") return "border-[#7c89b9]/18 bg-white/4";
  return "border-white/10 bg-white/4";
}

function roleLabel(role: LeverRole) {
  if (role === "primary") return "primary";
  if (role === "amplifies") return "amplifies";
  if (role === "unlocks") return "unlocks";
  if (role === "stabilizes") return "stabilizes";
  return "rejected now";
}

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mb-8 max-w-4xl">
      <div className="mb-3 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">{kicker}</div>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-[#b9c3df] md:text-lg">{text}</p> : null}
    </div>
  );
}

function MetricCard({ item }: { item: HeroMetric }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.52),rgba(4,17,45,0.82))] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#97a5ca]">{item.label}</div>
      <div className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white">{item.value}</div>
      {item.note ? <div className="mt-3 text-lg text-[#ccd3e9]">{item.note}</div> : null}
    </div>
  );
}

function SideCard({ label, title, text, extra }: { label: string; title: string; text: string; extra?: string }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.52),rgba(4,17,45,0.84))] p-7 shadow-[0_18px_70px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">{label}</div>
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-[38px] md:leading-[1.03]">{title}</h3>
      <p className="mt-5 text-lg leading-8 text-[#c9d2eb]">{text}</p>
      {extra ? <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.28em] text-[#d1d9ee]">{extra}</div> : null}
    </div>
  );
}

function InterpretationTile({ block, onOpen }: { block: InterpretationBlock; onOpen: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(block.id)}
      className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.4),rgba(4,17,45,0.82))] p-6 text-left transition duration-500 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#97a5ca]">Block</div>
      <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{block.title}</div>
      <p className="mt-5 line-clamp-4 text-base leading-7 text-[#ccd3e9]">{block.conclusion}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#ecf0fb] transition group-hover:translate-x-1">
        Открыть разбор <span aria-hidden>→</span>
      </div>
    </button>
  );
}

function OverlayPanel({ block, onClose }: { block: InterpretationBlock | null; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#04112d]/55 backdrop-blur-sm transition-opacity duration-300 ${block ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-full max-w-[34vw] min-w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(10,28,66,0.98),rgba(4,14,37,0.98))] shadow-[0_24px_100px_rgba(0,0,0,0.45)] transition-transform duration-500 ${block ? "translate-x-0" : "-translate-x-full"}`}
      >
        {block ? (
          <div className="flex h-full flex-col overflow-y-auto p-7 md:p-9">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#97a5ca]">Interpretation block</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">{block.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-6">
              {[
                ["Signal", block.signal],
                ["Interpretation", block.interpretation],
                ["Dependencies", block.dependencies],
                ["Risk", block.risk],
                ["Unknown", block.unknown],
                ["Conclusion", block.conclusion],
              ].map(([label, text]) => (
                <div key={label} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">{label}</div>
                  <p className="mt-3 text-lg leading-8 text-[#d6ddf1]">{text}</p>
                </div>
              ))}

              {block.extra ? (
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Extra data</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(block.extra).map(([key, value]) => (
                      <div key={key} className="rounded-2xl border border-white/10 bg-[#081834] p-4">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">{key}</div>
                        <div className="mt-2 text-lg text-white">{value === null ? "n/a" : String(value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}

function SolutionCard({ title, text, items }: { title: string; text?: string; items?: string[] }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">{title}</div>
      {text ? <p className="mt-4 text-lg leading-8 text-[#ccd3e9]">{text}</p> : null}
      {items?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#dbe2f3]">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RoadmapPhaseCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.86))] p-6 md:p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="text-[12px] uppercase tracking-[0.3em] text-[#f7d237]">{phase.phase}</div>
      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{phase.objective}</h3>
      <p className="mt-5 text-lg leading-8 text-[#d6ddf1]">{phase.why_this_phase_now}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <div className="text-[12px] uppercase tracking-[0.26em] text-[#97a5ca]">Key actions</div>
          <ul className="mt-3 space-y-3 text-[#d6ddf1]">
            {phase.key_actions.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[12px] uppercase tracking-[0.26em] text-[#97a5ca]">Control points</div>
          <ul className="mt-3 space-y-3 text-[#d6ddf1]">
            {phase.control_points.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Expected result</div>
          <div className="mt-3 text-base leading-7 text-white">{phase.expected_intermediate_result}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Dependencies</div>
          <div className="mt-3 text-base leading-7 text-white">{phase.dependencies.join(" · ")}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Owner logic</div>
          <div className="mt-3 text-base leading-7 text-white">{phase.owner_logic}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Risk if not done</div>
          <div className="mt-3 text-base leading-7 text-white">{phase.risk_if_not_done}</div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPageV2MapperReady() {
  const data = payload;
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const activeBlock = useMemo(
    () => data.interpretation.blocks.find((block) => block.id === activeBlockId) ?? null,
    [activeBlockId, data.interpretation.blocks]
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071734] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,82,170,0.34),transparent_34%),linear-gradient(180deg,#0b1d3a_0%,#071734_55%,#041127_100%)]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-screen" />
        <div className="absolute left-[-10%] top-[10%] h-[480px] w-[480px] rounded-full bg-[#1f58c7]/15 blur-3xl" />
        <div className="absolute right-[-5%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#133e8e]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1560px] px-4 pb-24 pt-8 md:px-8 md:pb-32 md:pt-10">
        <section className="rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,41,95,0.72),rgba(4,17,45,0.86))] px-5 py-6 shadow-[0_30px_120px_rgba(0,0,0,0.24)] md:px-10 md:py-10">
          <div className="grid gap-8 xl:grid-cols-[1.55fr_0.95fr]">
            <div>
              <div className="mb-8 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.34em] text-[#aeb8d7]">
                {data.hero.eyebrow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    {index > 0 ? <span className="text-[#f7d237]">•</span> : null}
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white md:text-[80px]">
                {data.hero.headline}
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-[#d3dbf0] md:text-[22px]">{data.hero.summary}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {data.hero.tags.map((tag) => (
                  <span key={tag.id} className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.26em] ${toneClass(tag.tone)}`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {data.hero.metrics.map((item) => (
                  <MetricCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:pl-2">
              <SideCard
                label="Growth limit"
                title={data.hero.growth_limit.title}
                text={`Bottleneck: ${data.hero.growth_limit.bottleneck}. ${data.hero.growth_limit.explanation}`}
              />
              <SideCard
                label="Primary lever"
                title={data.hero.primary_lever.title}
                text={data.hero.primary_lever.description}
                extra={`Zone: ${data.hero.primary_lever.zone}`}
              />
              <SideCard
                label="Market adjustment"
                title={data.hero.market_adjustment.title}
                text={data.hero.market_adjustment.text}
              />
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle kicker="Interpretation" title={data.interpretation.title} text={data.interpretation.intro} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.interpretation.blocks.map((block) => (
              <InterpretationTile key={block.id} block={block} onOpen={setActiveBlockId} />
            ))}
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Solution"
            title="Решение"
            text="Эта секция строится уже на финальном mapper-output третьего модуля: strategic scenario, primary lever, lever system, implementation logic, priorities и expected business shift."
          />

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <SolutionCard
                title="Strategic scenario"
                text={`${data.solution.strategic_scenario.type}. ${data.solution.strategic_scenario.why_this_scenario}`}
                items={data.solution.strategic_scenario.not_now}
              />
              <SolutionCard
                title="Primary growth lever"
                text={`${data.solution.primary_growth_lever.name}. ${data.solution.primary_growth_lever.essence}`}
                items={[`Zone: ${data.solution.primary_growth_lever.zone}`]}
              />
              <SolutionCard title="Why this lever" text={data.solution.primary_growth_lever.why_this_lever} />
              <SolutionCard title="Model change recommendation" text={data.solution.primary_growth_lever.model_change_recommendation} />
              <SolutionCard
                title="Strategic priorities"
                items={[
                  data.solution.strategic_priorities.priority_1,
                  data.solution.strategic_priorities.priority_2,
                  data.solution.strategic_priorities.priority_3,
                ]}
              />
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Lever system</div>
                <div className="mt-5 space-y-4">
                  {data.solution.lever_system.map((lever) => (
                    <div key={lever.id} className={`rounded-[22px] border p-5 ${roleClass(lever.role)}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xl font-semibold text-white">{lever.name}</div>
                        <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#d5ddf1]">
                          {roleLabel(lever.role)}
                        </div>
                      </div>
                      <div className="mt-2 text-sm uppercase tracking-[0.18em] text-[#9aabd0]">{lever.zone}</div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">{lever.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Lever mechanics</div>
                <div className="mt-5 space-y-4">
                  {data.solution.lever_mechanics.map((item) => (
                    <div key={`${item.lever}-${item.affected_metric}`} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-lg font-semibold text-white">{item.lever}</div>
                      <div className="mt-2 text-sm text-[#9aa8ce]">{item.affected_metric}</div>
                      <p className="mt-3 text-base leading-7 text-[#d4dbef]">{item.economic_shift}</p>
                      <p className="mt-2 text-base leading-7 text-[#bac5df]">{item.business_result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Implementation logic</div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SolutionCard title="What must change" text={data.solution.implementation_logic.what_must_change} />
                <SolutionCard title="What system must appear" items={data.solution.implementation_logic.what_system_must_appear} />
                <SolutionCard title="Application points" items={data.solution.implementation_logic.application_points} />
                <SolutionCard title="Implementation conditions" items={data.solution.implementation_logic.implementation_conditions} />
                <SolutionCard title="Core dependencies" items={data.solution.implementation_logic.core_dependencies} />
                <SolutionCard title="Main risks & fail conditions" items={[...data.solution.implementation_logic.main_risks, ...data.solution.implementation_logic.fail_conditions]} />
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Expected business shift</div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <SolutionCard title="What decreases" items={data.solution.expected_business_shift.what_decreases} />
                <SolutionCard title="What grows" items={data.solution.expected_business_shift.what_grows} />
                <SolutionCard title="Key metric of success" text={data.solution.expected_business_shift.key_metric_of_success} />
                <SolutionCard title="Near-term effect" text={data.solution.expected_business_shift.near_term_effect} />
                <SolutionCard title="Medium-term effect" text={data.solution.expected_business_shift.medium_term_effect} />
                <SolutionCard title="Forbidden now" items={data.solution.strategic_priorities.forbidden_now} />
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle kicker="Roadmap" title={data.roadmap.title} text={data.roadmap.intro} />

          <div className="space-y-5">
            {data.roadmap.phases.map((phase) => (
              <RoadmapPhaseCard key={phase.phase} phase={phase} />
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Control metrics</div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.control_metrics.map((metric) => (
                    <div key={metric.name} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-lg font-semibold text-white">{metric.name}</div>
                          <p className="mt-2 text-base leading-7 text-[#c6d0eb]">{metric.why_it_matters}</p>
                        </div>
                        <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#d5ddf1]">
                          {metric.direction}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Current</div>
                          <div className="mt-2 text-base text-white">{metric.current_if_known}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Target</div>
                          <div className="mt-2 text-base text-white">{metric.target_if_inferable}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#97a5ca]">Review</div>
                          <div className="mt-2 text-base text-white">{metric.review_frequency}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Alert rules</div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.alert_rules.map((rule) => (
                    <div key={rule.label} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-lg font-semibold text-white">{rule.label}</div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">{rule.trigger_logic}</p>
                      <p className="mt-2 text-base leading-7 text-[#b8c3df]">{rule.interpretation}</p>
                      <div className="mt-4 rounded-2xl border border-[#f7d237]/20 bg-[#f7d237]/8 p-4 text-base leading-7 text-[#f4e3a2]">
                        {rule.required_action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Decision signals</div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {data.roadmap.decision_signals.map((item) => (
                    <span key={item} className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#dbe2f3]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Operating scenarios</div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.operating_scenarios.map((item) => (
                    <div key={item.name} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-lg font-semibold text-white">{item.name}</div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">{item.logic}</p>
                      <p className="mt-2 text-base leading-7 text-[#b8c3df]">{item.expected_effect}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,50,114,0.46),rgba(4,17,45,0.84))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Uncertainty layer</div>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <SolutionCard title="Confirmed" items={data.roadmap.uncertainty_layer.confirmed} />
                  <SolutionCard title="Hypotheses" items={data.roadmap.uncertainty_layer.hypotheses} />
                  <SolutionCard title="Requires research" items={data.roadmap.uncertainty_layer.requires_research} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <OverlayPanel block={activeBlock} onClose={() => setActiveBlockId(null)} />
    </main>
  );
}
