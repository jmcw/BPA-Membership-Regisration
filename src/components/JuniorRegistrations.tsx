import React from 'react';
import { Trash2, User } from 'lucide-react';
import { JuniorRegistration, JuniorShirtSize } from '../types/membership';

interface JuniorRegistrationsProps {
  juniorRegistrations: JuniorRegistration[];
  onChange: (registrations: JuniorRegistration[]) => void;
}

const SHIRT_SIZES: { value: JuniorShirtSize; label: string }[] = [
  { value: 'CS', label: "Child's Small" },
  { value: 'CM', label: "Child's Medium" },
  { value: 'CL', label: "Child's Large" },
  { value: 'AS', label: 'Adult Small' }
];

export default function JuniorRegistrations({
  juniorRegistrations,
  onChange
}: JuniorRegistrationsProps) {
  const handleFirstNameChange = (index: number, firstName: string) => {
    const updated = [...juniorRegistrations];
    updated[index] = { ...updated[index], firstName };
    onChange(updated);
  };

  const handleLastNameChange = (index: number, lastName: string) => {
    const updated = [...juniorRegistrations];
    updated[index] = { ...updated[index], lastName };
    onChange(updated);
  };

  const handleSizeChange = (index: number, shirtSize: JuniorShirtSize) => {
    const updated = [...juniorRegistrations];
    updated[index] = { ...updated[index], shirtSize };
    onChange(updated);
  };

  const removeJunior = (index: number) => {
    const updated = juniorRegistrations.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {juniorRegistrations.map((junior, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-[#0B56A3]" />
              <span className="text-sm font-medium text-gray-900">Junior Registration #{index + 1}</span>
            </div>
            <button
              type="button"
              onClick={() => removeJunior(index)}
              className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
              <span className="sr-only">Remove Junior Registration #{index + 1}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor={`junior-first-name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id={`junior-first-name-${index}`}
                value={junior.firstName}
                onChange={(e) => handleFirstNameChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`junior-last-name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id={`junior-last-name-${index}`}
                value={junior.lastName}
                onChange={(e) => handleLastNameChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
                placeholder="Enter last name"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`junior-shirt-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Free T-Shirt Size
              </label>
              <select
                id={`junior-shirt-${index}`}
                value={junior.shirtSize}
                onChange={(e) => handleSizeChange(index, e.target.value as JuniorShirtSize)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
                required
              >
                {SHIRT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      {juniorRegistrations.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No junior registrations added yet. Click the "Add Junior Registration" button above to add one.
        </p>
      )}
    </div>
  );
}