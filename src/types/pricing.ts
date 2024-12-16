export interface PricingTier {
  startDate: Date;
  endDate: Date;
  prices: {
    associate: number;
    sustaining: number;
    tribune: number;
    sponsor: number;
    exhibitor: number;
    vendor: number;
    junior: number;
    generalDayRate: number;
  };
}

export const PRICING_TIERS: PricingTier[] = [
  {
    // Early Bird
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-12-8'),
    prices: {
      associate: 10,
      sustaining: 100,
      tribune: 150,
      sponsor: 500,
      exhibitor: 250,
      vendor: 500,
      junior: 0,
      generalDayRate: 20
    }
  },
  {
    // Standard Pricing
    startDate: new Date('2024-12-7'),
    endDate: new Date('2024-12-8'),
    prices: {
      associate: 25,
      sustaining: 110,
      tribune: 160,
      sponsor: 500,
      exhibitor: 275,
      vendor: 550,
      junior: 0,
      generalDayRate: 30
    }
  },
  {
    // Late Pricing
   startDate: new Date('2024-12-9'),
    endDate: new Date('2024-12-12'),
    prices: {
      associate: 30,
      sustaining: 120,
      tribune: 170,
      sponsor: 500,
      exhibitor: 300,
      vendor: 600,
      junior: 0,
      generalDayRate: 30
    }
  }
];