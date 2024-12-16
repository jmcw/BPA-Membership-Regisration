import { PricingTier, PRICING_TIERS } from '../types/pricing';
import { MembershipLevel } from '../types/membership';

export function getCurrentPricingTier(): PricingTier {
  const now = new Date();
  const currentTier = PRICING_TIERS.find(
    tier => now >= tier.startDate && now <= tier.endDate
  );
  
  if (!currentTier) {
    // Default to the earliest tier if no match
    return PRICING_TIERS[0];
  }
  
  return currentTier;
}

export function getMembershipPrice(level: MembershipLevel): number {
  const currentTier = getCurrentPricingTier();
  return currentTier.prices[level];
}

export function calculateTotalPrice(
  membershipLevel: MembershipLevel,
  merchandiseTotal: number = 0,
  extraShirtCost: number = 0
): number {
  const membershipPrice = getMembershipPrice(membershipLevel);
  return membershipPrice + merchandiseTotal + extraShirtCost;
}