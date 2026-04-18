import type { ResultsPageData } from "./types";

export const resultsMockData: ResultsPageData = {
  hero: {
    companyName: "Growth Avenue",
    salesGeography: "EU + CIS",
    summary: "Бизнес узнается по введенным данным: спрос есть, но модель роста пока держится не на системе, а на ручном управлении и ограниченной пропускной способности.",
    description: "Основной риск находится не в отсутствии спроса, а в том, что текущая модель не переводит спрос в устойчивую прибыльную динамику.",
    growthLimit: "Стабильный поток заявок и перевод спроса в систему",
    cashIn: "$1,900",
    confidenceLevel: 2,
    roles: [
      { role: "CMO", responsibility: "marketing" },
      { role: "CSO", responsibility: "sales / busdev" },
    ],
    productMargins: [
      { name: "Strategy Sessions", marginPercent: 80 },
      { name: "MVP", marginPercent: 50 },
      { name: "Automations", marginPercent: 30 },
    ],
  },

  solution: {
    title: "Главный фокус — выстроить устойчивую систему привлечения без давления на экономику",
    summary: "Приоритет не в резком масштабировании, а в сборке предсказуемой модели спроса, конверсии и удержания.",
    confidenceLevel: 2,
    cards: [
      { title: "Main bottleneck", value: "нестабильный поток лидов" },
      { title: "Primary lever", value: "система acquisition + qualification" },
      { title: "Why now", value: "спрос уже выше capacity" },
    ],
  },

  roadmap: {
    phases: [
      {
        period: "0–3 months",
        title: "Собрать управляемый поток",
        description: "Выстроить каналы, базу контактов и базовую систему qualification.",
        tasks: ["channel focus", "lead routing", "base CRM logic"],
      },
      {
        period: "3–6 months",
        title: "Усилить продажи",
        description: "Стабилизировать конверсию и довести до новых контрактов.",
        tasks: ["offer logic", "sales process", "conversion checkpoints"],
      },
      {
        period: "6–12 months",
        title: "Собрать cash cow",
        description: "Закрепить повторяемую модель и устойчивую прибыльность.",
        tasks: ["retention", "upsell", "margin control"],
      },
    ],
  },

  forecasts: {
    revenue: { current: "$1,900", target: "$3,800", delta: 100 },
    costs: { current: "$855", target: "$1,140", delta: 33 },
    profit: { current: "$1,045", target: "$2,660", delta: 154 },
    assumptions: [
      "lead flow becomes more stable",
      "conversion improves without sharp CAC pressure",
      "repeat / package mechanics are activated",
    ],
  },

  businessContext: {
    summary: "Нормализованные данные бизнеса и ключевые факты, на которых основаны выводы страницы.",
    sections: [
      {
        title: "Economics",
        rows: [
          { label: "Cash-in last month", value: "$1,900" },
          { label: "Margin", value: "55%" },
          { label: "Goal", value: "+100% net profit" },
        ],
      },
      {
        title: "Flow",
        rows: [
          { label: "Leads", value: "13" },
          { label: "Capacity", value: "4" },
          { label: "Demand / Capacity", value: "3.25x" },
        ],
      },
    ],
  },

  blocks: [
    {
      id: "strategy",
      title: "Strategy",
      truthSummary: "Цель достижима, но не через агрессивное масштабирование.",
      mainDiagnosis: "Стратегическая логика должна идти от стабилизации потока и управляемой прибыльности.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Profit goal", value: "+100%" },
        { label: "Expense constraint", value: "around 30%" },
      ],
      explanation: "При высокой нагрузке на capacity масштабирование без системы приведет к операционному давлению.",
      implication: "Сначала нужна управляемость потока, затем ускорение роста.",
    },
    {
      id: "structure_processes",
      title: "Structure & Processes",
      truthSummary: "Рост держится на founders.",
      mainDiagnosis: "Операционная модель пока слишком зависима от ручного участия.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Founders", value: "2" },
        { label: "Dependency", value: "high" },
      ],
      explanation: "Без делегирования и process design рост будет упираться в людей.",
      implication: "Нужно разгружать принятие решений и повторяющиеся операции.",
    },
    {
      id: "analytics_management",
      title: "Analytics & Management",
      truthSummary: "Аналитическая база уже сильнее средней ранней стадии.",
      mainDiagnosis: "Есть хорошая база метрик, но не все решения завязаны на системный контур управления.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Tracked metrics", value: "LTV/CAC, conversions" },
        { label: "Maturity", value: "medium" },
      ],
      explanation: "Метрики есть, но им нужен более жесткий управленческий ритм.",
      implication: "Это повышает controllability роста.",
    },
    {
      id: "product_sales",
      title: "Product & Sales",
      truthSummary: "Продуктовая модель может давать больше денег с клиента.",
      mainDiagnosis: "Сильные маржинальные продукты есть, но модель монетизации еще не собрана в устойчивую систему.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Highest margin", value: "Strategy Sessions 80%" },
        { label: "Retention layer", value: "packages / upsells" },
      ],
      explanation: "Рост LTV возможен, но требует продуктовой упаковки и маршрута повторной продажи.",
      implication: "Без этого бизнес остается слишком зависимым от нового спроса.",
    },
    {
      id: "clients_flow",
      title: "Clients & Flow",
      truthSummary: "Спрос выше capacity, но поток нестабилен.",
      mainDiagnosis: "Проблема не только в объеме лидов, а в предсказуемости и пропускной способности.",
      confidenceLevel: 3,
      keySignals: [
        { label: "Leads", value: "13" },
        { label: "Capacity", value: "4" },
      ],
      explanation: "При demand-to-capacity 3.25x бизнес уже сталкивается с фильтрацией и потерей части спроса.",
      implication: "Нужны routing, qualification и приоритет каналов.",
    },
    {
      id: "positioning",
      title: "Positioning",
      truthSummary: "Позиционирование понятное, но его нужно сильнее собирать вокруг наиболее выгодного сегмента.",
      mainDiagnosis: "Текущий рынок и продукт допускают рост, если точнее зафиксировать core offer.",
      confidenceLevel: 2,
      keySignals: [
        { label: "Target", value: "seed-stage SaaS" },
        { label: "Geography", value: "EU + CIS" },
      ],
      explanation: "Сильнее сегментированное сообщение снизит шум и повысит качество спроса.",
      implication: "Это влияет и на CAC, и на конверсию.",
    },
    {
      id: "economics",
      title: "Economics",
      truthSummary: "Экономика живая, но еще не устойчивая.",
      mainDiagnosis: "Бизнес уже показывает маржу, но пока рано считать модель масштабируемой без системного потока.",
      confidenceLevel: 3,
      keySignals: [
        { label: "Margin", value: "55%" },
        { label: "Cash-in", value: "$1,900" },
      ],
      explanation: "Разовая прибыльность еще не равна устойчивой экономике роста.",
      implication: "Важно удержать чистоту модели при масштабировании.",
    },
  ],

  overallSummary: {
    cards: [
      { title: "Economic Rate", value: "потенциал есть, но модель неустойчива" },
      { title: "Growth Limit", value: "нестабильный входящий поток + founder dependency" },
      { title: "Priority", value: "собрать управляемую систему спроса и продаж" },
    ],
  },
};
