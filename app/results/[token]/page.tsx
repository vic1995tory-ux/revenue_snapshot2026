"use client";

import { useMemo, useState } from "react";

// Mocked page for Revenue Snapshot results
// Single-file prototype focused on structure and data contract

type MetricCard = {
  id: string;
  label: string;
  value: string;
  note?: string;
};

type HeroTag = {
  id: string;
  label: string;
  tone?: "yellow" | "blue" | "green" | "gray";
};

type InsightBlock = {
  id: string;
  title: string;
  subtitle: string;
  status?: string;
  shortSummary: string;
  strengths: string[];
  risks: string[];
  interpretation: string;
  evidence?: string[];
  recommendations?: string[];
  metrics?: { label: string; value: string }[];
  tags?: string[];
};

type LeverItem = {
  name: string;
  role: "amplifies" | "unlocks" | "stabilizes" | "rejected_now";
  reason?: string;
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
  current_if_known?: string | null;
  target_if_inferable?: string | null;
  direction: "up" | "down" | "stable";
  review_frequency: string;
};

type AlertRule = {
  label: string;
  trigger_logic: string;
  interpretation: string;
  required_action: string;
};

type ResultsPayload = {
  company: {
    name: string;
    project: string;
    segment: string;
    country: string;
    score?: number;
    expires_at?: string;
  };
  hero: {
    eyebrow: string[];
    headline: string;
    summary: string;
    tags: HeroTag[];
    metrics: MetricCard[];
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
    blocks: InsightBlock[];
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
    supporting_levers: LeverItem[];
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
  };
};

const MOCK_DATA: ResultsPayload = {
  company: {
    name: "Northwave Studio",
    project: "Revenue Snapshot",
    segment: "DTC / Designer Apparel",
    country: "Italy",
    score: 67,
    expires_at: "2027-04-12",
  },
  hero: {
    eyebrow: ["Revenue Snapshot", "Northwave Studio", "DTC / Designer Apparel", "Italy"],
    headline: "Рост ограничен узким местом в конверсии, а не отсутствием спроса.",
    summary:
      "Основная потеря бизнеса связана не с дефицитом интереса, а с потерями на переходе от запроса к оплате. При текущей структуре команда обрабатывает спрос неравномерно, а подача продукта и продажа не превращают уже существующий интерес в стабильную выручку.",
    tags: [
      { id: "1", label: "#conversionloss", tone: "yellow" },
      { id: "2", label: "#salesbottleneck", tone: "yellow" },
      { id: "3", label: "#highcompetition", tone: "gray" },
      { id: "4", label: "#trustdrivendemand", tone: "gray" },
      { id: "5", label: "#managementoverload", tone: "yellow" },
      { id: "6", label: "#premiummidsegment", tone: "green" },
    ],
    metrics: [
      { id: "revenue", label: "Revenue", value: "€42,000", note: "last month" },
      { id: "profit", label: "Profit", value: "€8,400", note: "estimated" },
      { id: "margin", label: "Margin", value: "20%", note: "after expenses" },
      { id: "clients", label: "Clients", value: "56", note: "monthly" },
      { id: "avg_check", label: "Avg check", value: "€750", note: "calculated" },
      { id: "utilization", label: "Utilization", value: "78%", note: "team / ops" },
    ],
    growth_limit: {
      title: "Conversion / Funnel",
      bottleneck: "Низкая конверсия из интереса в оплату",
      explanation:
        "Экономика показывает высокий lost revenue на этапе сделки, рынок усиливает роль доверия и понятности выбора, а структура команды усиливает потерю между запросом и покупкой.",
    },
    primary_lever: {
      title: "Rebuild of conversion system",
      description: "Пересборка логики входа в продукт, выбора оффера и прохождения клиента по CJM.",
      zone: "Conversion",
    },
    market_adjustment: {
      title: "Market adjustment",
      text: "Спрос чувствителен к доверию и качеству продукта, но рынок конкурентный, а рост без усиления конверсии и структуры будет неустойчивым.",
    },
  },
  interpretation: {
    title: "Интерпретация ответов",
    intro:
      "Ниже — поблочная интерпретация диагностики. Каждая карточка показывает краткий вывод. По клику открывается левая overlay-панель с развернутой интерпретацией, сигналами, рисками и операционными выводами.",
    blocks: [
      {
        id: "economics",
        title: "Экономика",
        subtitle: "Маржа, выручка, потери",
        status: "Требует подтверждения",
        shortSummary: "Маржа не выглядит критически низкой, но повторяемость выручки и предсказуемость потока недостаточно подтверждены.",
        strengths: ["Есть базовая выручка", "Есть пространство для роста маржи через конверсию"],
        risks: ["Слабая повторяемость потока", "Неполный контур unit-экономики"],
        interpretation:
          "Экономика не указывает на отсутствие рынка. Ограничение возникает на переходе из интереса в оплату и усиливается неравномерностью обработки заявок. При таком профиле рост трафика без пересборки конверсии увеличивает шум, а не прибыль.",
        evidence: ["Высокий разрыв между спросом и оплатой", "Часть показателей подтверждена косвенно"],
        recommendations: ["Собрать полный воронкообразующий набор метрик", "Отделить спрос от обработанной возможности сделки"],
        metrics: [
          { label: "Revenue", value: "€42,000" },
          { label: "Profit", value: "€8,400" },
          { label: "Margin", value: "20%" },
        ],
        tags: ["#economics", "#margin", "#quality_check"],
      },
      {
        id: "clients_flow",
        title: "Клиенты и поток",
        subtitle: "Спрос, сегменты, каналы",
        status: "Основной резерв",
        shortSummary: "Спрос есть, но переход из интереса к покупке рвется из-за слабой логики маршрутизации и неоднородного качества входа.",
        strengths: ["Есть интерес к продукту", "Есть несколько точек входа"],
        risks: ["Неравномерная квалификация лидов", "Непрозрачный путь до покупки"],
        interpretation:
          "Проблема не в полном отсутствии входящего потока. Основная потеря — в том, что существующий спрос не упакован в понятный путь выбора и не получает достаточного доверительного усиления до оплаты.",
        tags: ["#flow", "#conversion", "#demand"],
      },
      {
        id: "product_sales",
        title: "Продукт и продажи",
        subtitle: "Оффер, путь клиента, продажа",
        status: "Ключевой блок",
        shortSummary: "Подача продукта и логика продажи не делают выбор очевидным для клиента и не сокращают путь к оплате.",
        strengths: ["Есть продуктовая база", "Есть потенциал офферной сегментации"],
        risks: ["Слишком сложный вход", "Недостаточно ясный выбор"],
        interpretation:
          "Ключевой рычаг лежит в пересборке входа в продукт: оффер, аргументация выбора, последовательность касаний, сокращение участков, где клиент зависает между интересом и решением.",
        tags: ["#offer", "#sales_logic", "#cjm"],
      },
      {
        id: "positioning",
        title: "Позиционирование",
        subtitle: "Сигнал рынку",
        status: "Частично подтверждено",
        shortSummary: "Позиционирование не проигрывает по качеству, но недостаточно жестко связывает продукт, аудиторию и причину покупки.",
        strengths: ["Есть премиальный сигнал"],
        risks: ["Недостаточная ясность выбора", "Конкурентный шум"],
        interpretation:
          "Для конкурентного рынка одного качественного образа недостаточно. Нужна более жесткая сборка: кто именно покупает, по какому признаку выбирает и почему платит сейчас.",
        tags: ["#positioning", "#market_signal"],
      },
      {
        id: "structure_processes",
        title: "Структура и процессы",
        subtitle: "Команда, перегруз, handoff",
        status: "Ограничивает масштабирование",
        shortSummary: "Решение зависит не только от оффера, но и от того, как команда проводит клиента через стадии без провалов и ручного хаоса.",
        strengths: ["Гибкость команды"],
        risks: ["Management overload", "Слабые handoff between roles"],
        interpretation:
          "Даже сильный оффер не сработает устойчиво без минимально оформленной системы: кто принимает запрос, кто квалифицирует, кто закрывает, где фиксируются причины отказа и где теряется скорость.",
        tags: ["#ops", "#handoff", "#management"],
      },
      {
        id: "analytics_management",
        title: "Аналитика и управление",
        subtitle: "Контур решений",
        status: "Недостаточная глубина",
        shortSummary: "Управление строится скорее на ощущении потока, чем на фиксированном наборе контрольных метрик по конверсии и потере выручки.",
        strengths: ["Есть управленческая вовлеченность"],
        risks: ["Нет жесткого control layer", "Слабая связь решений с метриками"],
        interpretation:
          "Без операционного контура контроля даже верно выбранный рычаг быстро превращается в набор разовых действий. Поэтому решение должно включать не только изменения, но и правила управления ими.",
        tags: ["#metrics", "#alerts", "#control"],
      },
      {
        id: "strategy",
        title: "Стратегия",
        subtitle: "Приоритет и последовательность",
        status: "Требует фокуса",
        shortSummary: "Бизнесу нужен не общий рост, а последовательный сценарий: сначала усилить конверсию, потом масштабировать спрос.",
        strengths: ["Понятна точка приложения усилия"],
        risks: ["Раннее масштабирование", "Размытый список приоритетов"],
        interpretation:
          "Главная стратегическая ошибка здесь — пытаться усиливать верх воронки раньше, чем собрана логика преобразования интереса в покупку. Приоритет должен быть выстроен от bottleneck, а не от доступных активностей.",
        tags: ["#priority", "#sequence", "#growth_limit"],
      },
    ],
  },
  solution: {
    strategic_scenario: {
      type: "Conversion-led stabilization before demand scaling",
      why_this_scenario:
        "Экономика и структура показывают, что рост трафика до пересборки конверсии усилит потери, а не создаст устойчивый прирост прибыли.",
      market_limits:
        "Конкурентный рынок усиливает требования к ясности выбора, доверию и скорости принятия решения.",
      not_now: ["Агрессивное наращивание трафика", "Расширение ассортимента без пересборки входа", "Новые каналы без новой логики оффера"],
    },
    primary_growth_lever: {
      name: "Rebuild of conversion system",
      essence: "Пересобрать путь клиента от первого интереса до оплаты: оффер, аргументацию, маршрут выбора, handoff и точки потери.",
      zone: "Conversion",
      why_this_lever:
        "Именно здесь сосредоточен основной loss source, и этот рычаг влияет одновременно на выручку, предсказуемость потока и качество масштабирования.",
      model_change_recommendation:
        "Перевести модель из режима реактивной продажи в режим управляемой конверсии: единая логика входа, сегментация оффера, явные стадии CJM и операционный контроль потерь.",
    },
    supporting_levers: [
      { name: "Offer segmentation", role: "amplifies" },
      { name: "Lead qualification logic", role: "unlocks" },
      { name: "Sales handoff discipline", role: "stabilizes" },
      { name: "Paid traffic expansion", role: "rejected_now", reason: "Усилит потери до ремонта conversion layer" },
    ],
    lever_mechanics: [
      {
        lever: "Rebuild of conversion system",
        affected_metric: "Lead-to-payment conversion",
        economic_shift: "Снижает lost revenue на стадии сделки",
        business_result: "Рост предсказуемой выручки без пропорционального роста хаоса",
      },
      {
        lever: "Offer segmentation",
        affected_metric: "Decision speed / win rate",
        economic_shift: "Увеличивает долю релевантных предложений",
        business_result: "Более быстрый выбор и выше доля оплат",
      },
      {
        lever: "Sales handoff discipline",
        affected_metric: "Processing consistency",
        economic_shift: "Снижает неоперационную потерю спроса",
        business_result: "Меньше провалов между командой и клиентом",
      },
    ],
    implementation_logic: {
      what_must_change:
        "Должна появиться единая система прохождения клиента: от захвата интереса до оплаты, со встроенной логикой сегментации, аргументации и контроля потерь.",
      application_points: ["Входящие лиды", "Оффер и product entry", "Скрипт выбора", "Handoff между ролями", "Фиксация причин отказа"],
      what_system_must_appear: ["Единая funnel map", "Lead routing rules", "Offer matrix", "Conversion control dashboard"],
      implementation_conditions: ["Согласованный owner решения", "Единый язык стадий сделки", "Минимальный набор обязательных метрик"],
      core_dependencies: ["Дисциплина фиксации лидов", "Доступность причин отказа", "Стабильный handoff между ролями"],
      main_risks: ["Изменения останутся только в тексте оффера", "Команда не начнет фиксировать потери", "Трафик начнут усиливать раньше времени"],
      fail_conditions: ["Нет owner у воронки", "Нет еженедельного review control metrics", "Нет различия между спросом и квалифицированной возможностью"],
    },
    strategic_priorities: {
      priority_1: "Собрать управляемую conversion system",
      priority_2: "Уточнить сегментацию оффера и выбор клиента",
      priority_3: "Только после стабилизации — масштабировать верх воронки",
      forbidden_now: ["Покупать рост спроса без пересборки конверсии", "Расширять продукт без логики выбора", "Усложнять коммуникацию вместо упрощения маршрута"],
    },
    expected_business_shift: {
      what_decreases: ["Потери на стадии выбора", "Непредсказуемость обработки потока", "Управленческий шум"],
      what_grows: ["Конверсия в оплату", "Предсказуемость выручки", "Управляемость funnel"],
      key_metric_of_success: "Lead-to-payment conversion",
      near_term_effect: "Выравнивание обработки спроса и снижение ручных потерь",
      medium_term_effect: "Более устойчивый рост выручки и более безопасное масштабирование спроса",
    },
  },
  roadmap: {
    title: "Roadmap внедрения",
    intro:
      "Порядок фаз строится от ремонта bottleneck к последующему масштабированию. Каждая фаза должна снижать конкретный тип потери, а не просто добавлять активность.",
    phases: [
      {
        phase: "0–30 days",
        objective: "Собрать базовую карту конверсии и снять хаос на входе",
        why_this_phase_now: "Без фиксации точек потери нельзя управлять причиной lost revenue.",
        key_actions: [
          "Описать фактический путь клиента от первого касания до оплаты",
          "Выделить 3–5 главных точек потери",
          "Ввести единый owner логики воронки",
          "Собрать обязательный набор conversion metrics",
        ],
        expected_intermediate_result: "Появляется управляемая модель текущей воронки и список ключевых разрывов.",
        dependencies: ["Доступ к данным по заявкам", "Участие основателя / sales owner"],
        owner_logic: "Owner должен контролировать не трафик в целом, а переходы между стадиями.",
        control_points: ["Есть funnel map", "Есть fixed stage definitions", "Есть first alert rules"],
        risk_if_not_done: "Команда продолжит путать спрос с конверсией и лечить не тот слой модели.",
      },
      {
        phase: "30–90 days",
        objective: "Пересобрать оффер, маршрут выбора и handoff",
        why_this_phase_now: "После фиксации точки потерь можно менять логику прохождения клиента, а не действовать вслепую.",
        key_actions: [
          "Собрать offer matrix по сегментам",
          "Сократить лишние шаги до оплаты",
          "Встроить квалификацию лидов и routing rules",
          "Закрепить дисциплину handoff между ролями",
        ],
        expected_intermediate_result: "Улучшается ясность выбора, скорость сделки и доля оплаченных запросов.",
        dependencies: ["Сегментация аудиторий", "Принятие новой логики командой"],
        owner_logic: "В этой фазе owner следит за связкой product entry + conversion discipline.",
        control_points: ["Снижается drop-off на ключевом этапе", "Появляется повторяемость обработки", "Причины отказа фиксируются стабильно"],
        risk_if_not_done: "Оффер останется расплывчатым, а конверсия продолжит зависеть от ручного усилия команды.",
      },
      {
        phase: "3–6 months",
        objective: "Закрепить систему управления и перейти к безопасному масштабированию спроса",
        why_this_phase_now: "Масштабирование оправдано только после стабилизации conversion layer.",
        key_actions: [
          "Закрепить weekly review по control metrics",
          "Настроить alert-driven operating rhythm",
          "Тестировать усиление верхней части воронки на стабилизированной базе",
          "Распределить ownership между growth, product и operations",
        ],
        expected_intermediate_result: "Бизнес получает более устойчивую выручку и готовность к controlled scaling.",
        dependencies: ["Стабильные conversion metrics", "Сохранение дисциплины процессов"],
        owner_logic: "Owner переходит от ручного тушения провалов к управлению системой.",
        control_points: ["Держится целевая конверсия", "Нет перегруза команды", "Рост спроса не ухудшает win rate"],
        risk_if_not_done: "Даже улучшенная логика не станет частью операционной модели и откатится к хаосу.",
      },
    ],
    control_metrics: [
      {
        name: "Lead-to-payment conversion",
        why_it_matters: "Главный индикатор того, устраняется ли bottleneck.",
        current_if_known: "7.8%",
        target_if_inferable: "12–15%",
        direction: "up",
        review_frequency: "weekly",
      },
      {
        name: "Drop-off on decision stage",
        why_it_matters: "Показывает, теряется ли клиент в момент выбора.",
        current_if_known: null,
        target_if_inferable: "down",
        direction: "down",
        review_frequency: "weekly",
      },
      {
        name: "Qualified lead share",
        why_it_matters: "Показывает качество входа и работу routing logic.",
        current_if_known: null,
        target_if_inferable: "up",
        direction: "up",
        review_frequency: "weekly",
      },
    ],
    alert_rules: [
      {
        label: "Conversion stagnation",
        trigger_logic: "2 недели без улучшения lead-to-payment conversion после внедрения новой логики",
        interpretation: "Рычаг внедрен поверхностно или bottleneck выбран неполно",
        required_action: "Проверить stage map, offer clarity и фактические причины отказа",
      },
      {
        label: "Processing overload",
        trigger_logic: "Рост входа сопровождается падением скорости обработки и качества handoff",
        interpretation: "Система не выдерживает текущий поток",
        required_action: "Ограничить scale-up, пересобрать routing и ownership",
      },
      {
        label: "False demand growth",
        trigger_logic: "Трафик растет, а оплаченные сделки не растут пропорционально",
        interpretation: "Рост верхней воронки не превращается в выручку",
        required_action: "Вернуться к conversion layer и stop non-core acquisition expansion",
      },
    ],
  },
};

function toneClass(tone?: HeroTag["tone"]) {
  if (tone === "yellow") return "border-[#f7d237]/35 bg-[#f7d237]/10 text-[#f7d237]";
  if (tone === "green") return "border-[#11d3a3]/30 bg-[#11d3a3]/10 text-[#74f3d3]";
  if (tone === "blue") return "border-white/20 bg-white/10 text-white";
  return "border-white/12 bg-white/5 text-[#b9c3df]";
}

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <div className="mb-3 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">{kicker}</div>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-[#b7c1df] md:text-lg">{text}</p> : null}
    </div>
  );
}

function MetricTile({ item }: { item: MetricCard }) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,52,118,0.55),rgba(2,14,40,0.75))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#93a0c7]">{item.label}</div>
      <div className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white">{item.value}</div>
      {item.note ? <div className="mt-3 text-lg text-[#c6d0eb]">{item.note}</div> : null}
    </div>
  );
}

function RightInfoCard({ label, title, text, extra }: { label: string; title: string; text: string; extra?: string }) {
  return (
    <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,52,118,0.54),rgba(3,17,44,0.82))] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.24)] transition duration-500 hover:-translate-y-1 hover:border-white/20">
      <div className="mb-5 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">{label}</div>
      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white md:text-[42px] md:leading-[1.02]">{title}</h3>
      <p className="mt-5 text-lg leading-8 text-[#c6d0eb]">{text}</p>
      {extra ? (
        <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.3em] text-[#c8d1ee]">
          {extra}
        </div>
      ) : null}
    </div>
  );
}

function InterpretationCard({ block, onOpen }: { block: InsightBlock; onOpen: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(block.id)}
      className="group text-left rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,52,118,0.46),rgba(2,14,40,0.78))] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(22,58,129,0.62),rgba(3,18,47,0.92))]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] uppercase tracking-[0.28em] text-[#93a0c7]">{block.subtitle}</div>
          <div className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">{block.title}</div>
        </div>
        {block.status ? (
          <div className="shrink-0 rounded-full border border-[#f7d237]/25 bg-[#f7d237]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#f7d237]">
            {block.status}
          </div>
        ) : null}
      </div>
      <p className="mt-5 line-clamp-4 text-base leading-7 text-[#c6d0eb]">{block.shortSummary}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#dfe5f4] transition group-hover:translate-x-1">
        Открыть интерпретацию
        <span aria-hidden>→</span>
      </div>
    </button>
  );
}

function SolutionCard({ title, text, items }: { title: string; text?: string; items?: string[] }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,47,108,0.5),rgba(2,14,40,0.82))] p-6">
      <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">{title}</div>
      {text ? <p className="mt-4 text-lg leading-8 text-[#c6d0eb]">{text}</p> : null}
      {items?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {items.map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-[#d8def0]">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function OverlayDrawer({ block, onClose }: { block: InsightBlock | null; onClose: () => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#04112d]/55 backdrop-blur-sm transition-opacity duration-300 ${block ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-full max-w-[34vw] min-w-[320px] border-r border-white/10 bg-[linear-gradient(180deg,rgba(9,29,69,0.98),rgba(3,12,34,0.98))] shadow-[0_24px_100px_rgba(0,0,0,0.45)] transition-transform duration-500 ${block ? "translate-x-0" : "-translate-x-full"}`}
      >
        {block ? (
          <div className="flex h-full flex-col overflow-y-auto p-7 md:p-9">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#93a0c7]">{block.subtitle}</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">{block.title}</h3>
                {block.status ? <div className="mt-4 text-sm text-[#f7d237]">{block.status}</div> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-8">
              <section>
                <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Краткий вывод</div>
                <p className="mt-3 text-lg leading-8 text-[#d5dcf0]">{block.shortSummary}</p>
              </section>

              <section>
                <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Интерпретация</div>
                <p className="mt-3 text-lg leading-8 text-[#d5dcf0]">{block.interpretation}</p>
              </section>

              {block.metrics?.length ? (
                <section>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Метрики</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {block.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs uppercase tracking-[0.24em] text-[#95a3c8]">{metric.label}</div>
                        <div className="mt-2 text-2xl font-semibold text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {!!block.strengths.length && (
                <section>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Сильные стороны</div>
                  <ul className="mt-4 space-y-3 text-[#d5dcf0]">
                    {block.strengths.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {!!block.risks.length && (
                <section>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Риски</div>
                  <ul className="mt-4 space-y-3 text-[#d5dcf0]">
                    {block.risks.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {block.evidence?.length ? (
                <section>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Evidence</div>
                  <ul className="mt-4 space-y-3 text-[#d5dcf0]">
                    {block.evidence.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {block.recommendations?.length ? (
                <section>
                  <div className="text-[12px] uppercase tracking-[0.28em] text-[#f7d237]">Что учитывать</div>
                  <ul className="mt-4 space-y-3 text-[#d5dcf0]">
                    {block.recommendations.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}

export default function ResultsPageMock() {
  const data = MOCK_DATA;
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

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white md:text-[86px]">
                {data.hero.headline}
              </h1>

              <p className="mt-8 max-w-4xl text-xl leading-9 text-[#d3dbf0] md:text-[22px]">
                {data.hero.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {data.hero.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.26em] ${toneClass(tag.tone)}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {data.hero.metrics.map((item) => (
                  <MetricTile key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 xl:pl-2">
              <RightInfoCard
                label="Growth limit"
                title={data.hero.growth_limit.title}
                text={`Bottleneck: ${data.hero.growth_limit.bottleneck}. ${data.hero.growth_limit.explanation}`}
              />
              <RightInfoCard
                label="Primary lever"
                title={data.hero.primary_lever.title}
                text={data.hero.primary_lever.description}
                extra={`Zone: ${data.hero.primary_lever.zone}`}
              />
              <RightInfoCard
                label="Market adjustment"
                title={data.hero.market_adjustment.title}
                text={data.hero.market_adjustment.text}
              />
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Interpretation"
            title={data.interpretation.title}
            text={data.interpretation.intro}
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.interpretation.blocks.map((block) => (
              <InterpretationCard key={block.id} block={block} onOpen={setActiveBlockId} />
            ))}
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Solution"
            title="Решение"
            text="Стратегический слой не зависит от UI страницы. Он должен приходить как отдельный блок из OpenAI-модуля: сценарий, primary lever, supporting system, implementation logic и expected shift."
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
              <SolutionCard
                title="Model change recommendation"
                text={data.solution.primary_growth_lever.model_change_recommendation}
              />
              <SolutionCard
                title="Strategic priorities"
                items={[
                  data.solution.strategic_priorities.priority_1,
                  data.solution.strategic_priorities.priority_2,
                  data.solution.strategic_priorities.priority_3,
                ]}
              />
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,52,118,0.42),rgba(2,14,40,0.8))] p-6 md:p-7">
              <div className="text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Lever system</div>
              <div className="mt-6 space-y-4">
                {data.solution.supporting_levers.map((lever) => (
                  <div key={`${lever.name}-${lever.role}`} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xl font-semibold text-white">{lever.name}</div>
                      <div className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#c9d2ec]">
                        {lever.role}
                      </div>
                    </div>
                    {lever.reason ? <p className="mt-3 text-base leading-7 text-[#c6d0eb]">{lever.reason}</p> : null}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-[12px] uppercase tracking-[0.34em] text-[#f7d237]">Lever mechanics</div>
              <div className="mt-5 space-y-4">
                {data.solution.lever_mechanics.map((item) => (
                  <div key={`${item.lever}-${item.affected_metric}`} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <div className="text-lg font-semibold text-white">{item.lever}</div>
                    <div className="mt-2 text-sm text-[#97a5ca]">{item.affected_metric}</div>
                    <p className="mt-3 text-base leading-7 text-[#d4dbef]">{item.economic_shift}</p>
                    <p className="mt-2 text-base leading-7 text-[#b8c3df]">{item.business_result}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 md:pt-28">
          <SectionTitle
            kicker="Roadmap"
            title={data.roadmap.title}
            text={data.roadmap.intro}
          />

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              {data.roadmap.phases.map((phase) => (
                <div
                  key={phase.phase}
                  className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,51,116,0.45),rgba(3,14,38,0.82))] p-6 md:p-7 transition duration-500 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.3em] text-[#f7d237]">{phase.phase}</div>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{phase.objective}</h3>
                    </div>
                  </div>

                  <p className="mt-5 text-lg leading-8 text-[#d5dcf0]">{phase.why_this_phase_now}</p>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.26em] text-[#93a0c7]">Key actions</div>
                      <ul className="mt-3 space-y-3 text-[#d5dcf0]">
                        {phase.key_actions.map((item) => (
                          <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.26em] text-[#93a0c7]">Control points</div>
                      <ul className="mt-3 space-y-3 text-[#d5dcf0]">
                        {phase.control_points.map((item) => (
                          <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Expected result</div>
                      <div className="mt-3 text-base leading-7 text-white">{phase.expected_intermediate_result}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Dependencies</div>
                      <div className="mt-3 text-base leading-7 text-white">{phase.dependencies.join(" · ")}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Risk if not done</div>
                      <div className="mt-3 text-base leading-7 text-white">{phase.risk_if_not_done}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,51,116,0.45),rgba(3,14,38,0.82))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#f7d237]">Control metrics</div>
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
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Current</div>
                          <div className="mt-2 text-base text-white">{metric.current_if_known ?? "n/a"}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Target</div>
                          <div className="mt-2 text-base text-white">{metric.target_if_inferable ?? "n/a"}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-[#091a3a] p-4">
                          <div className="text-[11px] uppercase tracking-[0.24em] text-[#93a0c7]">Review</div>
                          <div className="mt-2 text-base text-white">{metric.review_frequency}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,51,116,0.45),rgba(3,14,38,0.82))] p-6 md:p-7">
                <div className="text-[12px] uppercase tracking-[0.3em] text-[#f7d237]">Alert rules</div>
                <div className="mt-5 space-y-4">
                  {data.roadmap.alert_rules.map((rule) => (
                    <div key={rule.label} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                      <div className="text-lg font-semibold text-white">{rule.label}</div>
                      <p className="mt-3 text-base leading-7 text-[#d5dcf0]">{rule.trigger_logic}</p>
                      <p className="mt-2 text-base leading-7 text-[#b7c3df]">{rule.interpretation}</p>
                      <div className="mt-4 rounded-2xl border border-[#f7d237]/20 bg-[#f7d237]/8 p-4 text-base leading-7 text-[#f4e3a2]">
                        {rule.required_action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <OverlayDrawer block={activeBlock} onClose={() => setActiveBlockId(null)} />
    </main>
  );
}
