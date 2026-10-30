export interface PricingTier {
  id: string;
  quantity: number;
  price: number;
  popular?: boolean;
}

export const pricingTiers: PricingTier[] = [
  { id: "1", quantity: 1, price: 60 },
  { id: "5", quantity: 5, price: 250, popular: false },
  { id: "10", quantity: 10, price: 400, popular: true },
  { id: "15", quantity: 15, price: 550 },
  { id: "20", quantity: 20, price: 680 },
];
