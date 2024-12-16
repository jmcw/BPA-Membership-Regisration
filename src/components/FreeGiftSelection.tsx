import React from 'react';
import { Gift, Check } from 'lucide-react';

export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | '4XL';
export type GiftOption = 'giftcard' | 'hat' | 'shirt';

interface FreeGiftSelectionProps {
  selectedGift: GiftOption | undefined;
  selectedSize: ShirtSize | null;
  onGiftSelect: (gift: GiftOption) => void;
  onSizeSelect: (size: ShirtSize) => void;
  extraCost: number;
  onNext: () => void;
  onBack: () => void;
}

const SHIRT_SIZES: { value: ShirtSize; label: string; extraCost: number }[] = [
  { value: 'S', label: 'Small', extraCost: 0 },
  { value: 'M', label: 'Medium', extraCost: 0 },
  { value: 'L', label: 'Large', extraCost: 0 },
  { value: 'XL', label: 'X-Large', extraCost: 0 },
  { value: '2XL', label: '2X-Large', extraCost: 5 },
  { value: '3XL', label: '3X-Large', extraCost: 5 },
  { value: '4XL', label: '4X-Large', extraCost: 5 },
];

export default function FreeGiftSelection({
  selectedGift,
  selectedSize,
  onGiftSelect,
  onSizeSelect,
  extraCost,
  onNext,
  onBack
}: FreeGiftSelectionProps) {
  const handleContinue = () => {
    if (!selectedGift) {
      alert('Please select a gift option');
      return;
    }
    if (selectedGift === 'shirt' && !selectedSize) {
      alert('Please select a shirt size');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Select Your Free Gift</h3>
        <Gift className="h-5 w-5 text-secondary-600" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onGiftSelect('giftcard')}
          className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all
            ${selectedGift === 'giftcard'
              ? 'border-secondary-600 bg-secondary-50 text-secondary-800'
              : 'border-gray-200 hover:border-secondary-200'
            }`}
        >
          {selectedGift === 'giftcard' && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-secondary-600" />
            </div>
          )}
          <span className="text-lg">💳</span>
          <span className="mt-2 text-sm font-medium">$30 Seven Springs Gift Card</span>
        </button>

        <button
          type="button"
          onClick={() => onGiftSelect('hat')}
          className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all
            ${selectedGift === 'hat'
              ? 'border-secondary-600 bg-secondary-50 text-secondary-800'
              : 'border-gray-200 hover:border-secondary-200'
            }`}
        >
          {selectedGift === 'hat' && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-secondary-600" />
            </div>
          )}
          <span className="text-lg">🧢</span>
          <span className="mt-2 text-sm font-medium">WBC Hat</span>
        </button>

        <button
          type="button"
          onClick={() => onGiftSelect('shirt')}
          className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all
            ${selectedGift === 'shirt'
              ? 'border-secondary-600 bg-secondary-50 text-secondary-800'
              : 'border-gray-200 hover:border-secondary-200'
            }`}
        >
          {selectedGift === 'shirt' && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-secondary-600" />
            </div>
          )}
          <span className="text-lg">👕</span>
          <span className="mt-2 text-sm font-medium">WBC Shirt</span>
        </button>
      </div>

      {selectedGift === 'shirt' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Shirt Size
          </label>
          <div className="grid grid-cols-4 gap-3">
            {SHIRT_SIZES.map((size) => (
              <button
                key={size.value}
                type="button"
                onClick={() => onSizeSelect(size.value)}
                className={`relative flex flex-col items-center p-3 rounded-lg border transition-all
                  ${selectedSize === size.value
                    ? 'border-secondary-600 bg-secondary-50 text-secondary-800'
                    : 'border-gray-200 hover:border-secondary-200'
                  }`}
              >
                {selectedSize === size.value && (
                  <div className="absolute top-1 right-1">
                    <Check className="h-4 w-4 text-secondary-600" />
                  </div>
                )}
                <span className="font-medium">{size.label}</span>
                {size.extraCost > 0 && (
                  <span className="text-xs text-secondary-600 mt-1">+${size.extraCost}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {extraCost > 0 && (
        <div className="mt-4 bg-secondary-50 p-4 rounded-md">
          <p className="text-sm text-secondary-800">
            Additional cost for selected size: ${extraCost}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}