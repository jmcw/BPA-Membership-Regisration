import React from 'react';
import { Calendar } from 'lucide-react';

const AVAILABLE_DAYS = [
  { id: 1, name: 'Monday', date: 'July 22' },
  { id: 2, name: 'Tuesday', date: 'July 23' },
  { id: 3, name: 'Wednesday', date: 'July 24' },
  { id: 4, name: 'Thursday', date: 'July 25' },
  { id: 5, name: 'Friday', date: 'July 26' },
  { id: 6, name: 'Saturday', date: 'July 27' },
  { id: 7, name: 'Sunday', date: 'July 28' }
] as const;

interface DaysSelectionProps {
  selectedDays: number[];
  onChange: (days: number[]) => void;
  maxDays?: number;
}

export default function DaysSelection({ selectedDays, onChange, maxDays }: DaysSelectionProps) {
  const handleDayToggle = (dayId: number) => {
    const newSelection = selectedDays.includes(dayId)
      ? selectedDays.filter(id => id !== dayId)
      : [...selectedDays, dayId].sort((a, b) => a - b);

    if (!maxDays || newSelection.length <= maxDays) {
      onChange(newSelection);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Select Attendance Days</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Selected: {selectedDays.length} {maxDays ? `/ ${maxDays}` : ''} days</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AVAILABLE_DAYS.map(day => {
          const isSelected = selectedDays.includes(day.id);
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => handleDayToggle(day.id)}
              className={`flex items-center justify-between rounded-lg border p-4 transition-all
                ${isSelected
                  ? 'border-secondary-600 bg-secondary-50 text-secondary-600 ring-1 ring-secondary-600'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-secondary-300 hover:bg-secondary-50'
                }`}
            >
              <div className="flex flex-col">
                <span className="font-medium">{day.name}</span>
                <span className="text-sm text-gray-500">{day.date}</span>
              </div>
              <div className={`h-5 w-5 rounded-full border ${
                isSelected
                  ? 'border-secondary-600 bg-secondary-600'
                  : 'border-gray-300 bg-white'
              }`}>
                {isSelected && (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {maxDays && selectedDays.length === maxDays && (
        <p className="text-sm text-amber-600">
          Maximum {maxDays} days can be selected
        </p>
      )}
    </div>
  );
}