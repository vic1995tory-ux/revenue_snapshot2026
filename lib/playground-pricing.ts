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

const PAYPAL_PLAYGROUND_URL = "https://www.paypal.com/ncp/payment/J573NHRDCJQZC";

function atUtcDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
}

export function getPlaygroundPricingSnapshot(now = new Date()): PlaygroundPricingSnapshot {
  const year = now.getUTCFullYear();
  const firstTierEnd = atUtcDate(year, 5, 8);
  const secondTierEnd = atUtcDate(year, 5, 16);

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
    payUrl: PAYPAL_PLAYGROUND_URL,
    tiers: [
      { label: "До 7 мая", price: 93, active: activeIndex === 0 },
      { label: "8-15 мая", price: 115, active: activeIndex === 1 },
      { label: "С 16 мая", price: 147, active: activeIndex === 2 },
    ],
  };
}
