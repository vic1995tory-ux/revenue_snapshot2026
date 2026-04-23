export type OnRecResultSection = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  purposeTitle: string;
  purpose: string[];
};

export type OnRecResultPageData = {
  title: string;
  subtitle: string;
  status: string;
  tokenLabel: string;
  summary: string;
  sections: OnRecResultSection[];
};
