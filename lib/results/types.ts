export type ConfidenceLevel = 1 | 2 | 3;

export type KeyValueRow = {
  label: string;
  value: string;
};

export type ChartPoint = {
  name: string;
  value: number;
};

export type HeroData = {
  companyName: string;
  salesGeography: string;
  summary: string;
  description: string;
  growthLimit: string;
  cashIn: string;
  confidenceLevel: ConfidenceLevel;

  roles: Array<{
    role: string;
    responsibility: string;
  }>;

  productMargins: Array<{
    name: string;
    marginPercent: number;
  }>;

  clientsVsLeads?: {
    clients: number;
    leads: number;
  };

  demandVsCapacity?: {
    demand: number;
    capacity: number;
  };

  channelMix?: Array<{
    name: string;
    value: number;
  }>;

  stage?: string;
  location?: string;
  teamSize?: number;
  businessAgeMonths?: number;
  snapshot?: string;
  currentPosition?: string;
  confidenceNote?: string;
};

export type SolutionCard = {
  title: string;
  value: string;
  note?: string;
};

export type SolutionPriority = {
  title: string;
  value: string;
  note?: string;
};

export type SolutionImpact = {
  label: string;
  value: string;
};

export type SolutionData = {
  title: string;
  summary: string;
  confidenceLevel: ConfidenceLevel;

  cards: SolutionCard[];

  lever?: {
    title: string;
    value: string;
    note?: string;
  };

  constraint?: {
    title: string;
    value: string;
    note?: string;
  };

  revenueLoss?: {
    title: string;
    value: string;
    note?: string;
  };

  modelShift?: {
    title: string;
    value: string;
    note?: string;
  };

  priorities?: SolutionPriority[];

  impacts?: SolutionImpact[];

  prerequisites?: string[];
  risks?: string[];
};

export type RoadmapPhase = {
  period: string;
  title: string;
  description: string;
  tasks: string[];
};

export type RoadmapWorkstream = {
  name: string;
  focus: string;
  relatedBlocks?: string[];
  confidenceLevel?: ConfidenceLevel;
};

export type RoadmapDependency = {
  dependency: string;
  reason: string;
};

export type RoadmapStructuralChange = {
  change: string;
  type: string;
  expectedEffect: string;
  confidenceLevel?: ConfidenceLevel;
};

export type RoadmapControlPoint = {
  metric: string;
  signal: string;
  whyItMatters: string;
  confidenceLevel?: ConfidenceLevel;
};

export type RoadmapData = {
  phases: RoadmapPhase[];

  strategicObjective?: string;
  coreJtbd?: string;

  workstreams?: RoadmapWorkstream[];
  dependencies?: RoadmapDependency[];
  firstPriorityActions?: string[];
  structuralChanges?: RoadmapStructuralChange[];
  controlPoints?: RoadmapControlPoint[];

  expectedOutcomes?: {
    threeMonths?: string;
    sixMonths?: string;
    twelveMonths?: string;
  };
};

export type ForecastMetric = {
  current: string;
  target: string;
  delta: number;
};

export type ForecastScenarioCard = {
  title: string;
  current?: string;
  target?: string;
  note?: string;
};

export type ForecastsData = {
  revenue: ForecastMetric;
  costs: ForecastMetric;
  profit: ForecastMetric;
  assumptions: string[];

  capacityGap?: string;
  unmetDemand?: string;
  constraints?: string[];
  scenarioCards?: ForecastScenarioCard[];
};

export type BusinessContextSection = {
  title: string;
  rows: KeyValueRow[];
};

export type BusinessContextChart = {
  title: string;
  points: ChartPoint[];
};

export type BusinessContextTable = {
  title: string;
  columns: string[];
  rows: string[][];
};

export type BusinessContextRisk = {
  title: string;
  impact: string;
};

export type BusinessContextMissingData = {
  field: string;
  reason: string;
};

export type BusinessContextData = {
  summary: string;
  sections: BusinessContextSection[];

  charts?: BusinessContextChart[];
  tables?: BusinessContextTable[];
  risks?: BusinessContextRisk[];
  missingData?: BusinessContextMissingData[];
};

export type AnalyticalBlockData = {
  id: string;
  title: string;
  truthSummary: string;
  mainDiagnosis: string;
  confidenceLevel: ConfidenceLevel;

  keySignals: Array<{
    label: string;
    value: string;
  }>;

  explanation: string;
  implication: string;

  normalizedInputs?: KeyValueRow[];
  extraCards?: Array<{
    title: string;
    value: string;
    note?: string;
  }>;
};

export type OverallSummaryCard = {
  title: string;
  value: string;
};

export type OverallInsight = {
  title: string;
  text: string;
  confidenceLevel?: ConfidenceLevel;
};

export type OverallRisk = {
  risk: string;
  impact: string;
  confidenceLevel?: ConfidenceLevel;
};

export type OverallWeakData = {
  field: string;
  reason: string;
};

export type OverallSummaryData = {
  cards: OverallSummaryCard[];

  insights?: OverallInsight[];
  risks?: OverallRisk[];
  weakData?: OverallWeakData[];
  confidenceNote?: string;
};

export type ResultsPageData = {
  hero: HeroData;
  solution: SolutionData;
  roadmap: RoadmapData;
  forecasts: ForecastsData;
  businessContext: BusinessContextData;
  blocks: AnalyticalBlockData[];
  overallSummary: OverallSummaryData;
};
