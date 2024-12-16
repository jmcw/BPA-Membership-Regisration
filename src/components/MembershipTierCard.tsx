import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MembershipTier, MembershipLevel } from '../types/membership';
import { getMembershipPrice } from '../utils/pricing';

interface MembershipTierCardProps {
  tierKey: MembershipLevel;
  tier: MembershipTier;
  isSelected: boolean;
  onSelect: (key: MembershipLevel) => void;
}

export default function MembershipTierCard({ 
  tierKey, 
  tier, 
  isSelected, 
  onSelect 
}: MembershipTierCardProps) {
  const price = getMembershipPrice(tierKey);

  return (
    <div
      className={`relative rounded-lg border p-6 cursor-pointer transition-all
        ${isSelected 
          ? 'border-[#0B56A3] ring-2 ring-[#0B56A3]' 
          : 'border-gray-300 hover:border-[#0B56A3]'}`}
      onClick={() => onSelect(tierKey)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
        <div className="flex items-center text-[#0B56A3]">
          <span className="font-bold">${price}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
      <ul className="mt-4 space-y-2">
        {tier.benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <ChevronRight className="h-4 w-4 text-[#0B56A3] mr-2" />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}