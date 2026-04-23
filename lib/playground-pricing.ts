export type PlaygroundPricingTier = {
  label: string;
  price: number;
  active: boolean;
};

export type PlaygroundPricingSnapshot = {
  releaseLabel: string;
  title: string;
  description: string;
  currentPrice: number;
  currentPriceLabel: string;
  buttonLabel: string;
  payUrl: string;
  tiers: PlaygroundPricingTier[];
};

const WA_PLAYGROUND_URL =
  "https://wa.me/995555163833?text=%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%D1%82%D1%8C%20Online%20Playground";

function atUtcDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export function getPlaygroundPricingSnapshot(now = new Date()): PlaygroundPricingSnapshot {
  const year = now.getUTCFullYear();
  const firstTierEnd = atUtcDate(year, 5, 8);
  const secondTierEnd = atUtcDate(year, 5, 18);

  let currentPrice = 147;
  let activeIndex = 2;

  if (now < firstTierEnd) {
    currentPrice = 93;
    activeIndex = 0;
  } else if (now < secondTierEnd) {
    currentPrice = 115;
    activeIndex = 1;
  }

  return {
    releaseLabel: "Релиз 18 мая",
    title: "Online Playground preorder",
    description:
      "Предзаказ полного доступа к Revenue Snapshot с личным кабинетом и спецпредложениями.",
    currentPrice,
    currentPriceLabel: `$${currentPrice}`,
    buttonLabel: "Оплатить",
    payUrl: WA_PLAYGROUND_URL,
    tiers: [
      { label: "До 7 мая", price: 93, active: activeIndex === 0 },
      { label: "8-15 мая", price: 115, active: activeIndex === 1 },
      { label: "С 18 мая", price: 147, active: activeIndex === 2 },
    ],
  };
}
