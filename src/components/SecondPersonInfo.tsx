import React from 'react';
import { US_STATES, COUNTRIES } from '../types/location';

interface SecondPersonInfoProps {
  formData: {
    secondPerson: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      badgeCity: string;
      state: string;
      country: string;
      zip: string;
    };
  };
  onChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function SecondPersonInfo({
  formData,
  onChange,
  onBack,
  onNext
}: SecondPersonInfoProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">Second Person Information</h2>
        <p className="mt-2 text-sm text-gray-500">
          Please provide information for the second person included in your vendor membership.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="secondPersonFirstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="secondPersonFirstName"
            value={formData.secondPerson.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="secondPersonLastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="secondPersonLastName"
            value={formData.secondPerson.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="secondPersonPhone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="secondPersonPhone"
            value={formData.secondPerson.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            placeholder="(123) 456-7890"
            required
          />
        </div>

        <div>
          <label htmlFor="secondPersonEmail" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="secondPersonEmail"
            value={formData.secondPerson.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="secondPersonCity" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="secondPersonCity"
            value={formData.secondPerson.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="secondPersonBadgeCity" className="block text-sm font-medium text-gray-700">
            Badge City
          </label>
          <input
            type="text"
            id="secondPersonBadgeCity"
            value={formData.secondPerson.badgeCity}
            onChange={(e) => onChange('badgeCity', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            How you would like the city presented on your physical badge
          </p>
        </div>

        <div>
          <label htmlFor="secondPersonCountry" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="secondPersonCountry"
            value={formData.secondPerson.country}
            onChange={(e) => onChange('country', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          >
            <option value="">Select a country</option>
            {COUNTRIES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {formData.secondPerson.country === 'US' && (
          <div>
            <label htmlFor="secondPersonState" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="secondPersonState"
              value={formData.secondPerson.state}
              onChange={(e) => onChange('state', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
              required
            >
              <option value="">Select a state</option>
              {US_STATES.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="secondPersonZip" className="block text-sm font-medium text-gray-700">
            {formData.secondPerson.country === 'US' ? 'ZIP Code' : 'Postal Code'}
          </label>
          <input
            type="text"
            id="secondPersonZip"
            value={formData.secondPerson.zip}
            onChange={(e) => onChange('zip', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}