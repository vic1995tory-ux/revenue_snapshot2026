"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type SimpleMetric = {
  id?: string;
  label: string;
  value: string | number;
  note?: string;
  kind?: "loss" | "normal";
};

type HeroTag = {
  id?: string;
  label: string;
  tone?: "yellow" | "cyan" | "red" | string;
};

type InterpretationBlock = {
  id: string;
  title: string;
  signal?: string;
  interpretation?: string;
  dependencies?: string;
  risk?: string;
  unknown?: string;
  conclusion?: string;
};

type LeverSystemItem = {
  id?: string;
  name: string;
  role?: string;
  zone?: string;
  text?: string;
};

type LeverMechanic = {
  lever: string;
  affected_metric?: string;
  economic_shift?: string;
  business_result?: string;
};

type RoadmapPhase = {
  phase: string;
  objective?: string;
  why_this_phase_now?: string;
  key_actions?: string[];
  expected_intermediate_result?: string;
  dependencies?: string[];
  owner_logic?: string;
  control_points?: string[];
  risk_if_not_done?: string;
};

type ControlMetric = {
  name: string;
  why_it_matters?: string;
  current_if_known?: string;
  target_if_inferable?: string;
  direction?: string;
  review_frequency?: string;
};

type AlertRule = {
  label: string;
  trigger_logic?: string;
  interpretation?: string;
  required_action?: string;
};

type OperatingScenario = {
  name?: string;
  logic?: string;
  expected_effect?: string;
};

type UncertaintyLayer = {
  confirmed?: string[];
  hypotheses?: string[];
  requires_research?: string[];
};

type ResultsPayload = {
  company?: {
    name?: string;
    niche?: string;
    stage?: string;
    geography?: string;
  };
  hero?: {
    eyebrow?: string[];
    headline?: string;
    summary?: string;
    tags?: HeroTag[];
    metrics?: Array<{
      id?: string;
      label: string;
      value: string | number;
      note?: string;
    }>;
    growth_limit?: {
      title?: string;
      bottleneck?: string;
      explanation?: string;
    };
    primary_lever?: {
      title?: string;
      description?: string;
      zone?: string;
    };
    market_adjustment?: {
      title?: string;
      text?: string;
    };
  };
  analytics?: {
    baseKpis?: SimpleMetric[];
    calculatedKpis?: SimpleMetric[];
    losses?: SimpleMetric[];
    revenueWaterfall?: Array<{ name: string; value: number }>;
    demandCapacity?: Array<{ name: string; value: number }>;
  };
  interpretation?: {
    title?: string;
    intro?: string;
    blocks?: InterpretationBlock[];
  };
  solution?: {
    strategic_scenario?: {
      type?: string;
      why_this_scenario?: string;
      market_limits?: string;
      not_now?: string[];
    };
    primary_growth_lever?: {
      name?: string;
      essence?: string;
      zone?: string;
      why_this_lever?: string;
      model_change_recommendation?: string;
    };
    lever_system?: LeverSystemItem[];
    lever_mechanics?: LeverMechanic[];
    implementation_logic?: {
      what_must_change?: string;
      application_points?: string[];
      what_system_must_appear?: string[];
      implementation_conditions?: string[];
      core_dependencies?: string[];
      main_risks?: string[];
      fail_conditions?: string[];
    };
    strategic_priorities?: {
      priority_1?: string;
      priority_2?: string;
      priority_3?: string;
      forbidden_now?: string[];
    };
    expected_business_shift?: {
      what_decreases?: string[];
      what_grows?: string[];
      key_metric_of_success?: string;
      near_term_effect?: string;
      medium_term_effect?: string;
    };
  };
  roadmap?: {
    title?: string;
    intro?: string;
    phases?: RoadmapPhase[];
    control_metrics?: ControlMetric[];
    alert_rules?: AlertRule[];
    decision_signals?: string[];
    operating_scenarios?: OperatingScenario[];
    uncertainty_layer?: UncertaintyLayer;
  };
};

type NormalizedResults = ResultsPayload & {
  analytics: {
    baseKpis: SimpleMetric[];
    calculatedKpis: SimpleMetric[];
    losses: SimpleMetric[];
    revenueWaterfall: Array<{ name: string; value: number }>;
    demandCapacity: Array<{ name: string; value: number }>;
  };
  uplift: {
    currentMarginPct: number;
    targetMarginPct: number;
    currentProfit: number;
    targetProfit: number;
    extraProfitNeeded: number;
    revenueRecoveryNeeded: number;
    lostRevenueShareNeeded: number;
    avgCheck: number;
    leads: number;
    clients: number;
    extraClientsNeeded: number;
    currentConversionPct: number;
    targetConversionPct: number;
    conversionDeltaPct: number;
  };
};

const BRAND = {
  yellow: "#f7d237",
};

const FALLBACK_RESULTS: ResultsPayload = {
  company: {
    name: "growth.avenue",
    niche: "консалтинг + реализация (B2B услуги)",
    stage: "ранняя стадия",
    geography: "ЕС и СНГ",
  },
  hero: {
    eyebrow: [
      "Стартап (6 месяцев), B2B консалтинг + реализация стратегий, фокус на SaaS, 1 клиент, проектная модель с элементами подписки",
      "Бизнес не упирается в поток — он упирается в неспособность конвертировать существующий спрос из-за сложного оффера и перегруженной системы исполнения",
    ],
    headline:
      "Бизнес теряет рост не из-за недостатка спроса, а из-за неспособности упаковать и продать ценность в понятной и масштабируемой форме",
    summary:
      "Бизнес не упирается в поток — он упирается в неспособность конвертировать существующий спрос из-за сложного оффера и перегруженной системы исполнения",
    tags: [{ id: "main_loss_type", label: "conversion_loss", tone: "yellow" }],
    metrics: [
      {
        id: "revenue",
        label: "revenue",
        value: "1900",
        note: "разовая, не повторяющаяся",
      },
      {
        id: "conversion",
        label: "conversion",
        value: "0.0769",
        note: "низкая конверсия при наличии спроса",
      },
      {
        id: "clients",
        label: "clients",
        value: "1",
        note: "1 контракт ($6100)",
      },
    ],
    growth_limit: {
      title: "growth_limit",
      bottleneck: "product_sales (упаковка и донесение ценности)",
      explanation: "низкая конверсия из-за слабой упаковки ценности",
    },
    primary_lever: {
      title: "productized_offer + conversion_system",
      description:
        "Превращение сложного консалтинга в стандартизированный, понятный и ограниченный по объему продукт с четким результатом и быстрым time-to-value",
      zone: "product_sales",
    },
    market_adjustment: {
      title: "market_limits",
      text: "Малые и средние рынки ЕС с высокой ценовой чувствительностью требуют четкой ценности и предсказуемого результата; сложные кастомные продажи снижают доверие и конверсию.",
    },
  },
  analytics: {
    baseKpis: [
      { label: "Revenue", value: "€42,000" },
      { label: "Profit", value: "€8,400" },
      { label: "Margin %", value: "20%" },
      { label: "Clients", value: "56" },
      { label: "Leads", value: "190" },
    ],
    calculatedKpis: [
      { label: "Avg Check", value: "€750" },
      { label: "Lead → Sale", value: "29.5%" },
      { label: "Gross Profit", value: "€8,400" },
      { label: "Demand / Capacity", value: "190 / 150" },
      { label: "Capacity Gap", value: "26.7%" },
    ],
    losses: [
      { label: "Lost Revenue", value: "€12,500", kind: "loss" },
      { label: "Lost Profit", value: "€2,500", kind: "loss" },
      { label: "Conversion Loss", value: "18%", kind: "loss" },
      { label: "Capacity Loss", value: "7%", kind: "loss" },
    ],
    revenueWaterfall: [
      { name: "Фактическая выручка", value: 42000 },
      { name: "Потерянная выручка", value: 12500 },
      { name: "Потенциальная выручка", value: 54500 },
    ],
    demandCapacity: [
      { name: "Спрос", value: 190 },
      { name: "Мощность", value: 150 },
    ],
  },
  interpretation: {
    title: "diagnostic interpretation",
    intro:
      "Бизнес не упирается в поток — он упирается в неспособность конвертировать существующий спрос из-за сложного оффера и перегруженной системы исполнения",
    blocks: [
      {
        id: "positioning",
        title: "positioning",
        signal:
          "Стартап (6 месяцев), B2B консалтинг + реализация стратегий, фокус на SaaS, 1 клиент, проектная модель с элементами подписки",
        interpretation:
          "Бизнес находится на стадии поиска повторяемой модели и product-market fit. Фокус на SaaS логичен, но не подтвержден реальными кейсами. Проектная модель снижает масштабируемость и делает выручку нестабильной.",
        dependencies:
          "Связано с экономикой (нестабильная выручка) и sales/offer (сложность и перегруз ценности)",
        risk:
          "Разрыв между целевым сегментом (SaaS) и фактическим опытом может снижать конверсию и доверие",
        unknown:
          "Нет подтверждения, что именно SaaS сегмент уже приносит сделки",
        conclusion:
          "Ранняя стадия с незафиксированным позиционированием и ограниченной масштабируемостью из-за проектной модели",
      },
      {
        id: "economics",
        title: "economics",
        signal:
          "1 контракт ($6100), фактический платеж за месяц $1900, заявленная маржа 55% при крайне малой выборке",
        interpretation:
          "Экономика невалидна: основана на одном клиенте. Высокая маржа не подтверждена на масштабе. Выручка нестабильна и не повторяется.",
        dependencies:
          "Сильно зависит от product-sales (оффер и конверсия) и структуры (2 человека)",
        risk:
          "Иллюзия прибыльности может привести к преждевременному масштабированию",
        unknown:
          "Невозможно оценить CAC, LTV, реальную прибыльность и повторяемость",
        conclusion: "Экономика ранняя, неподтвержденная и нестабильная",
      },
      {
        id: "clients_flow",
        title: "clients_flow",
        signal:
          "13 лидов при capacity 4, фактически 1 клиент → низкая конверсия",
        interpretation:
          "Проблема не в количестве лидов, а в их конверсии и качестве/обработке. Есть избыточный спрос относительно текущих возможностей.",
        dependencies:
          "Связано с product-sales (непонятная ценность, сложный оффер)",
        risk:
          "Потеря теплого спроса из-за слабой упаковки и перегрузки команды",
        unknown: "Нет разбивки по этапам конверсии и качеству каналов",
        conclusion:
          "Поток не является корневой проблемой; основной провал — в конверсии",
      },
      {
        id: "product_sales",
        title: "product_sales",
        signal:
          "Сложный CJM, перегруженные формулировки, проблема 'дорого', один оффер с вариациями, демо вызывает интерес",
        interpretation:
          "Основная потеря происходит на уровне донесения ценности и упаковки оффера. Сложность снижает конверсию, несмотря на наличие интереса.",
        dependencies: "Напрямую влияет на конверсию и экономику",
        risk:
          "Перегрев клиента (завышенные ожидания) + недопонимание ценности → отказ",
        unknown: "Нет данных по фактическому retention и повторным продажам",
        conclusion:
          "Product-sales слой является ключевым источником потерь (conversion loss)",
      },
      {
        id: "structure_processes",
        title: "structure_processes",
        signal:
          "2 фаундера перегружены всеми функциями, включая продажи, маркетинг и delivery",
        interpretation:
          "Ограничение роста — в пропускной способности команды и распылении фокуса",
        dependencies:
          "Связано с capacity и conversion (невозможно качественно обрабатывать поток)",
        risk: "Рост приведет к деградации качества и потере клиентов",
        unknown: "Нет четкой операционной системы масштабирования",
        conclusion: "Система исполнения — узкое место",
      },
    ],
  },
  solution: {
    strategic_scenario: {
      type: "conversion-first productization",
      why_this_scenario:
        "Спрос уже есть, но не конвертируется из-за перегруженного оффера и отсутствия стандартизации. Экономика не подтверждена, значит масштабирование невозможно до стабилизации конверсии и repeatability.",
      market_limits:
        "Малые и средние рынки ЕС с высокой ценовой чувствительностью требуют четкой ценности и предсказуемого результата; сложные кастомные продажи снижают доверие и конверсию.",
      not_now: [
        "масштабирование трафика",
        "расширение линейки услуг",
        "найм без стандартизации продукта",
        "переход в премиум-сегмент без доказанной ценности",
      ],
    },
    primary_growth_lever: {
      name: "productized_offer + conversion_system",
      essence:
        "Превращение сложного консалтинга в стандартизированный, понятный и ограниченный по объему продукт с четким результатом и быстрым time-to-value",
      zone: "product_sales",
      why_this_lever:
        "Основная потеря — в конверсии. Упрощение и стандартизация напрямую увеличат conversion rate и сделают экономику повторяемой.",
      model_change_recommendation:
        "Переход от кастомных проектов к 1–2 продуктам (diagnostic + implementation sprint) с фиксированным scope, сроками и результатом",
    },
    lever_system: [
      {
        id: "primary",
        name: "productized_offer + conversion_system",
        role: "primary",
        zone: "product_sales",
        text: "Превращение сложного консалтинга в стандартизированный, понятный и ограниченный по объему продукт с четким результатом и быстрым time-to-value",
      },
      {
        id: "amplifies",
        name: "positioning (узкая ниша SaaS с четким ICP)",
        role: "amplifies",
        zone: "n/a",
        text: "positioning (узкая ниша SaaS с четким ICP)",
      },
      {
        id: "amplifies_2",
        name: "sales_process (скрипты, этапы, квалификация)",
        role: "amplifies",
        zone: "n/a",
        text: "sales_process (скрипты, этапы, квалификация)",
      },
      {
        id: "unlocks",
        name: "offer_simplification (разделение на entry и core продукт)",
        role: "unlocks",
        zone: "n/a",
        text: "offer_simplification (разделение на entry и core продукт)",
      },
      {
        id: "stabilizes",
        name: "retention_ltv (подписка после результата)",
        role: "stabilizes",
        zone: "n/a",
        text: "retention_ltv (подписка после результата)",
      },
      {
        id: "rejected",
        name: "acquisition_scaling",
        role: "rejected_now",
        zone: "marketing",
        text: "усилит текущие потери при низкой конверсии",
      },
    ],
    lever_mechanics: [
      {
        lever: "productized_offer",
        affected_metric: "conversion_rate",
        economic_shift:
          "снижение стоимости привлечения на клиента за счет роста конверсии",
        business_result: "рост выручки без увеличения лидов",
      },
      {
        lever: "offer_simplification",
        affected_metric: "sales_cycle_length",
        economic_shift: "ускорение оборота денежных средств",
        business_result: "более быстрый cashflow и снижение потерь лидов",
      },
      {
        lever: "capacity_structuring",
        affected_metric: "delivery_throughput",
        economic_shift: "рост выручки на ту же команду",
        business_result: "масштабируемость без найма",
      },
    ],
    implementation_logic: {
      what_must_change:
        "Сложный кастомный оффер → стандартизированные продукты с ограниченным scope и предсказуемым результатом",
      application_points: [
        "коммерческое предложение",
        "демо и презентация",
        "скрипты продаж",
        "delivery-процесс",
      ],
      what_system_must_appear: [
        "2-ступенчатый продукт (diagnostic → implementation)",
        "CRM с этапами воронки",
        "шаблоны delivery",
        "календарь capacity (слоты)",
      ],
      implementation_conditions: [
        "жесткое ограничение кастомизации",
        "выбор одного ICP",
        "декомпозиция текущего опыта в шаблоны",
      ],
      core_dependencies: [
        "готовность отказаться от универсальности",
        "дисциплина в продажах",
        "фокус фаундеров",
      ],
      main_risks: [
        "переупрощение без реальной ценности",
        "сопротивление клиентов к стандартному формату",
        "несоответствие результата ожиданиям",
      ],
      fail_conditions: [
        "сохранение кастомных продаж",
        "отсутствие четкого ICP",
        "игнорирование обратной связи от сделок",
      ],
    },
    strategic_priorities: {
      priority_1: "упаковка и упрощение оффера",
      priority_2: "рост конверсии через sales system",
      priority_3: "стандартизация delivery",
      forbidden_now: [
        "масштабирование маркетинга",
        "усложнение продукта",
        "расширение ICP",
      ],
    },
    expected_business_shift: {
      what_decreases: [
        "потери лидов",
        "длина сделки",
        "нагрузка на фаундеров",
      ],
      what_grows: [
        "конверсия",
        "предсказуемость выручки",
        "пропускная способность",
      ],
      key_metric_of_success: "conversion_rate",
      near_term_effect: "рост сделок без увеличения трафика",
      medium_term_effect: "появление repeatable revenue модели",
    },
  },
  roadmap: {
    title: "roadmap",
    intro:
      "Спрос уже есть, но не конвертируется из-за перегруженного оффера и отсутствия стандартизации.",
    phases: [
      {
        phase: "0–30 days",
        objective: "зафиксировать продукт и упростить оффер",
        why_this_phase_now: "без этого невозможно улучшить конверсию",
        key_actions: [
          "выбрать узкий ICP (SaaS сегмент)",
          "собрать 1 основной продукт (diagnostic)",
          "описать результат, срок, формат",
          "упростить презентацию до 1 сценария",
          "ввести базовую CRM",
        ],
        expected_intermediate_result:
          "понятный оффер и улучшение первых звонков",
        dependencies: ["фокус фаундеров", "наличие текущих лидов"],
        owner_logic: "фаундеры напрямую",
        control_points: [
          "рост конверсии в звонок→сделка",
          "снижение времени сделки",
        ],
        risk_if_not_done: "дальнейшая потеря лидов",
      },
    ],
    control_metrics: [
      {
        name: "conversion_rate",
        why_it_matters: "ключевой ограничитель роста",
        current_if_known: "0.0769",
        target_if_inferable: "0.2",
        direction: "up",
        review_frequency: "weekly",
      },
    ],
    alert_rules: [
      {
        label: "low_conversion",
        trigger_logic: "conversion_rate < 10%",
        interpretation: "оффер не работает",
        required_action: "перепаковка оффера",
      },
    ],
    decision_signals: [
      "рост конверсии без роста трафика → можно масштабировать",
      "стабильные повторные сделки → ввод retention",
      "перегруз delivery → нужна делегация",
    ],
    operating_scenarios: [
      {
        name: "conservative",
        logic: "фокус только на конверсии без роста",
        expected_effect: "медленная стабилизация",
      },
    ],
    uncertainty_layer: {
      confirmed: [
        "низкая конверсия",
        "избыточный поток лидов",
        "перегруженный оффер",
      ],
      hypotheses: [
        "стандартизация увеличит конверсию до 20%+",
        "SaaS сегмент даст лучшую конверсию",
      ],
      requires_research: [
        "реальный LTV",
        "этапы воронки",
        "эффективность сегментов",
      ],
    },
  },
};

function numberFrom(value: unknown): number {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "")
    .replace(/\s/g, "")
    .replace(/€/g, "")
    .replace(/\$/g, "")
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function percentFrom(value: unknown): number {
  const raw = String(value ?? "");
  const parsed = numberFrom(value);
  if (raw.includes("%")) return parsed;
  if (parsed > 0 && parsed <= 1) return parsed * 100;
  return parsed;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits).replace(/\.0$/, "")}%`;
}

function formatInt(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeLabel(label: string) {
  return label.replace(/\s+/g, " ").trim().toLowerCase();
}

function getMetricValue(items: SimpleMetric[] = [], label: string) {
  const found = items.find(
    (item) => normalizeLabel(item.label) === normalizeLabel(label)
  );
  return found?.value ?? "";
}

function toneClasses(tone?: string) {
  if (tone === "red") {
    return "border-red-400/25 bg-red-400/10 text-red-100";
  }
  if (tone === "cyan") {
    return "border-cyan-300/25 bg-cyan-400/10 text-cyan-100";
  }
  return "border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]";
}

function metricDisplay(label: string, value: string | number) {
  const l = normalizeLabel(label);

  if (
    l.includes("revenue") ||
    l.includes("profit") ||
    l.includes("check") ||
    l.includes("gross")
  ) {
    return formatCurrency(numberFrom(value));
  }

  if (
    l.includes("margin") ||
    l.includes("conversion") ||
    l.includes("loss") ||
    l.includes("lead → sale") ||
    l.includes("lead->sale") ||
    l.includes("capacity gap")
  ) {
    return formatPercent(percentFrom(value));
  }

  return formatInt(numberFrom(value));
}

function buildUplift(analytics: NormalizedResults["analytics"]) {
  const revenue = numberFrom(getMetricValue(analytics.baseKpis, "Revenue"));
  const profit = numberFrom(getMetricValue(analytics.baseKpis, "Profit"));
  const marginPct =
    percentFrom(getMetricValue(analytics.baseKpis, "Margin %")) ||
    (revenue > 0 ? (profit / revenue) * 100 : 0);

  const leads = numberFrom(getMetricValue(analytics.baseKpis, "Leads"));
  const clients = numberFrom(getMetricValue(analytics.baseKpis, "Clients"));
  const avgCheck =
    numberFrom(getMetricValue(analytics.calculatedKpis, "Avg Check")) ||
    (clients > 0 ? revenue / clients : 0);

  const currentConversionPct =
    percentFrom(getMetricValue(analytics.calculatedKpis, "Lead → Sale")) ||
    (leads > 0 ? (clients / leads) * 100 : 0);

  const lostRevenue = numberFrom(
    getMetricValue(analytics.losses, "Lost Revenue")
  );

  const targetMarginPct = marginPct + 3;
  const targetProfit = revenue * (targetMarginPct / 100);
  const extraProfitNeeded = Math.max(0, targetProfit - profit);
  const revenueRecoveryNeeded =
    marginPct > 0 ? extraProfitNeeded / (marginPct / 100) : extraProfitNeeded;
  const lostRevenueShareNeeded =
    lostRevenue > 0 ? (revenueRecoveryNeeded / lostRevenue) * 100 : 0;
  const extraClientsNeeded =
    avgCheck > 0 ? Math.ceil(revenueRecoveryNeeded / avgCheck) : 0;
  const targetConversionPct =
    leads > 0
      ? ((clients + extraClientsNeeded) / leads) * 100
      : currentConversionPct;
  const conversionDeltaPct = targetConversionPct - currentConversionPct;

  return {
    currentMarginPct: marginPct,
    targetMarginPct,
    currentProfit: profit,
    targetProfit,
    extraProfitNeeded,
    revenueRecoveryNeeded,
    lostRevenueShareNeeded,
    avgCheck,
    leads,
    clients,
    extraClientsNeeded,
    currentConversionPct,
    targetConversionPct,
    conversionDeltaPct,
  };
}

function normalizeResults(
  raw: ResultsPayload | null | undefined
): NormalizedResults {
  const merged: ResultsPayload = {
    ...FALLBACK_RESULTS,
    ...raw,
    company: {
      ...FALLBACK_RESULTS.company,
      ...raw?.company,
    },
    hero: {
      ...FALLBACK_RESULTS.hero,
      ...raw?.hero,
    },
    analytics: {
      ...FALLBACK_RESULTS.analytics,
      ...raw?.analytics,
    },
    interpretation: {
      ...FALLBACK_RESULTS.interpretation,
      ...raw?.interpretation,
    },
    solution: {
      ...FALLBACK_RESULTS.solution,
      ...raw?.solution,
      strategic_scenario: {
        ...FALLBACK_RESULTS.solution?.strategic_scenario,
        ...raw?.solution?.strategic_scenario,
      },
      primary_growth_lever: {
        ...FALLBACK_RESULTS.solution?.primary_growth_lever,
        ...raw?.solution?.primary_growth_lever,
      },
      implementation_logic: {
        ...FALLBACK_RESULTS.solution?.implementation_logic,
        ...raw?.solution?.implementation_logic,
      },
      strategic_priorities: {
        ...FALLBACK_RESULTS.solution?.strategic_priorities,
        ...raw?.solution?.strategic_priorities,
      },
      expected_business_shift: {
        ...FALLBACK_RESULTS.solution?.expected_business_shift,
        ...raw?.solution?.expected_business_shift,
      },
    },
    roadmap: {
      ...FALLBACK_RESULTS.roadmap,
      ...raw?.roadmap,
      uncertainty_layer: {
        ...FALLBACK_RESULTS.roadmap?.uncertainty_layer,
        ...raw?.roadmap?.uncertainty_layer,
      },
    },
  };

  const analytics = {
    baseKpis: merged.analytics?.baseKpis ?? FALLBACK_RESULTS.analytics!.baseKpis!,
    calculatedKpis:
      merged.analytics?.calculatedKpis ??
      FALLBACK_RESULTS.analytics!.calculatedKpis!,
    losses: merged.analytics?.losses ?? FALLBACK_RESULTS.analytics!.losses!,
    revenueWaterfall:
      merged.analytics?.revenueWaterfall ??
      FALLBACK_RESULTS.analytics!.revenueWaterfall!,
    demandCapacity:
      merged.analytics?.demandCapacity ??
      FALLBACK_RESULTS.analytics!.demandCapacity!,
  };

  return {
    ...merged,
    analytics,
    uplift: buildUplift(analytics),
  };
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl ${className}`}
      style={{
        boxShadow:
          "0 18px 56px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.045)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,55,0.09),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.045),transparent_24%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Ring({ progress, size = 110 }: { progress: number; size?: number }) {
  const radius = 44;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 88 88" className="-rotate-90">
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.045)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="44"
          cy="44"
          r={normalizedRadius}
          stroke={BRAND.yellow}
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: "drop-shadow(0 0 4px rgba(247,210,55,0.22))",
            transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-semibold text-white">
          {Math.round(progress)}%
        </div>
        <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">
          score
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
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
      <div className="text-[11px] uppercase tracking-[0.28em] text-white/38">
        {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#a5aeb2]">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  tone = "default",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "default" | "loss" | "accent";
}) {
  const toneClass =
    tone === "loss"
      ? "border-red-400/20 bg-red-400/10"
      : tone === "accent"
      ? "border-[#f7d237]/25 bg-[#f7d237]/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={`rounded-[24px] border p-4 ${toneClass}`}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {note ? (
        <div className="mt-2 text-sm leading-6 text-white/55">{note}</div>
      ) : null}
    </div>
  );
}

function MetricChip({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "accent" | "danger" | "cyan";
}) {
  const cls =
    tone === "accent"
      ? "border-[#f7d237]/25 bg-[#f7d237]/10 text-[#fff3b2]"
      : tone === "danger"
      ? "border-red-400/20 bg-red-400/10 text-red-100"
      : tone === "cyan"
      ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-100"
      : "border-white/10 bg-white/[0.04] text-white/70";

  return (
    <span className={`rounded-full border px-3 py-1.5 text-sm ${cls}`}>
      {label}
    </span>
  );
}

function InfoList({
  title,
  items,
  tone = "default",
}: {
  title: string;
  items?: string[];
  tone?: "default" | "danger" | "accent" | "cyan";
}) {
  if (!items || items.length === 0) return null;

  const cls =
    tone === "danger"
      ? "border-red-400/20 bg-red-400/10"
      : tone === "accent"
      ? "border-[#f7d237]/25 bg-[#f7d237]/10"
      : tone === "cyan"
      ? "border-cyan-300/20 bg-cyan-400/10"
      : "border-white/10 bg-white/[0.03]";

  return (
    <div className={`rounded-[24px] border p-4 ${cls}`}>
      <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
        {title}
      </div>
      <div className="space-y-2 text-sm leading-7 text-white/75">
        {items.map((item) => (
          <div key={item}>— {item}</div>
        ))}
      </div>
    </div>
  );
}

function BarsChart({
  title,
  data,
  formatter = (n: number) => formatInt(n),
  barClassName = "bg-[#f7d237]",
}: {
  title: string;
  data: Array<{ name: string; value: number }>;
  formatter?: (n: number) => string;
  barClassName?: string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="mb-5 text-lg font-medium text-white">{title}</div>
      <div className="space-y-4">
        {data.map((item) => {
          const width = `${(item.value / max) * 100}%`;
          return (
            <div key={item.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <div className="text-sm text-white/70">{item.name}</div>
                <div className="text-sm font-medium text-white">
                  {formatter(item.value)}
                </div>
              </div>
              <div className="h-3 rounded-full bg-white/8">
                <div
                  className={`h-3 rounded-full ${barClassName}`}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function TableList({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  const colsClass =
    headers.length === 3
      ? "md:grid-cols-3"
      : headers.length === 4
      ? "md:grid-cols-4"
      : headers.length === 5
      ? "md:grid-cols-5"
      : "md:grid-cols-4";

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
      <div
        className={`grid border-b border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-white/45 ${colsClass}`}
      >
        {headers.map((header) => (
          <div key={header} className="py-1">
            {header}
          </div>
        ))}
      </div>

      {rows.map((row, idx) => (
        <div
          key={`${row[0]}-${idx}`}
          className={`grid gap-2 border-b border-white/8 px-4 py-4 text-sm text-white/75 last:border-b-0 ${colsClass}`}
        >
          {row.map((cell, cellIdx) => (
            <div key={`${idx}-${cellIdx}`}>{cell || "—"}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <GlassCard className="w-full max-w-[560px] p-8">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-[#f7d237]/20 bg-[#f7d237]/10 p-3">
          <div className="h-full w-full animate-spin rounded-full border-2 border-[#f7d237]/25 border-t-[#f7d237]" />
        </div>
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">
            Revenue Snapshot
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            Загружаем результаты
          </div>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Получаем payload по token и собираем страницу.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

function SolutionSection({ data }: { data: ResultsPayload["solution"] }) {
  if (!data) return null;

  const scenario = data.strategic_scenario;
  const lever = data.primary_growth_lever;
  const leverSystem = data.lever_system ?? [];
  const leverMechanics = data.lever_mechanics ?? [];
  const implementation = data.implementation_logic;
  const priorities = data.strategic_priorities;
  const shift = data.expected_business_shift;

  return (
    <section className="mb-8">
      <SectionTitle
        eyebrow="solution"
        title="Strategic solution"
        text="Основной сценарий, главный рычаг роста, система усиливающих рычагов и логика внедрения."
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Strategic scenario
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            {scenario?.type || "—"}
          </div>

          {scenario?.why_this_scenario ? (
            <p className="mt-4 text-sm leading-7 text-white/70">
              {scenario.why_this_scenario}
            </p>
          ) : null}

          {scenario?.market_limits ? (
            <div className="mt-4 rounded-[20px] border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm leading-7 text-cyan-100">
              {scenario.market_limits}
            </div>
          ) : null}

          {scenario?.not_now?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {scenario.not_now.map((item) => (
                <MetricChip key={item} label={item} tone="danger" />
              ))}
            </div>
          ) : null}
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Primary growth lever
          </div>

          <div className="mt-2 text-2xl font
