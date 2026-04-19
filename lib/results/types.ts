export type ConfidenceLevel = 1 | 2 | 3;

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
    description?: string;
  }>;

  clientsVsLeads?: {
    clients: number;
    leads: number;
  };

  channelMix?: Array<{
    name: string;
    value: number;
  }>;

  stage?: string;
  businessAgeMonths?: number;
  physicalLocation?: string;
  teamSizeCore?: number;

  snapshot?: string;
  currentPosition?: string;
};

export type SolutionCard = {
  title: string;
  value: string;
  note?: string;
};

export type SolutionPriorityItem = {
  step: number;
  label: string;
  description: string;
  priority: "high" | "medium" | "low";
};

export type SolutionKPI = {
  label: string;
  current?: string;
  target?: string;
  change?: string;
};

export type SolutionData = {
  title: string;
  summary: string;
  confidenceLevel: ConfidenceLevel;

  cards: SolutionCard[];

  decisionRule?: string;
  whyNow?: string;
  whyNotNow?: string;

  priorities?: SolutionPriorityItem[];

  expectedOutcomes?: Array<{
    label: string;
    description: string;
  }>;

  kpis?: SolutionKPI[];
};

export type RoadmapTask = {
  label: string;
  action: string;
  whyThisPhase?: string;
  confidenceLevel?: ConfidenceLevel;
};

export type RoadmapData = {
  phases: Array<{
    period: string;
    title: string;
    description: string;
    tasks: RoadmapTask[];
  }>;

  controlPoints?: Array<{
    metric: string;
    signal: string;
    whyItMatters: string;
    confidenceLevel?: ConfidenceLevel;
  }>;
};

export type ForecastMetric = {
  current: string;
  target: string;
  delta: number;
};

export type ForecastsData = {
  revenue: ForecastMetric;
  costs: ForecastMetric;
  profit: ForecastMetric;
  assumptions: string[];
};

export type BusinessContextData = {
  summary: string;

  sections: Array<{
    title: string;

    rows: Array<{
      label: string;
      value: string;
    }>;
  }>;
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
};

export type OverallSummaryData = {
  cards: Array<{
    title: string;
    value: string;
  }>;
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
