import React from 'react';
import { JuniorShirtSize } from '../types/membership';

interface JuniorShirtSelectProps {
  value: JuniorShirtSize | undefined;
  onChange: (size: JuniorShirtSize) => void;
}

const SHIRT_SIZES: { value: JuniorShirtSize; label: string }[] = [
  { value: 'CS', label: "Child's Small" },
  { value: 'CM', label: "Child's Medium" },
  { value: 'CL', label: "Child's Large" },
  { value: 'AS', label: 'Adult Small' }
];

export default function JuniorShirtSelect({ value, onChange }: JuniorShirtSelectProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Your Free T-Shirt Size</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {SHIRT_SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onClick={() => onChange(size.value)}
            className={`flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium
              ${value === size.value
                ? 'border-secondary-600 bg-secondary-50 text-secondary-600'
                : 'border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}