import React, { useState } from 'react';
import { US_STATES, COUNTRIES } from '../types/location';
import { PersonalInfoFormProps } from '../types/forms';
import { validatePersonalInfo } from '../utils/validation/personalInfo';
import { FormField } from './common/FormField';

export default function PersonalInfoForm({
  formData,
  onChange,
  onBack,
  onNext
}: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const validationErrors = validatePersonalInfo(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="First Name"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={onChange}
          error={errors.firstName}
          required
        />

        <FormField
          label="Last Name"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={onChange}
          error={errors.lastName}
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          required
        />

        {(formData.membershipLevel === 'exhibitor' || formData.membershipLevel === 'vendor') && (
          <div className="sm:col-span-2">
            <FormField
              label="Company Name"
              name="companyName"
              type="text"
              value={formData.companyName || ''}
              onChange={onChange}
              error={errors.companyName}
              required
            />
          </div>
        )}

        <FormField
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={onChange}
          error={errors.city}
          required
        />

        <FormField
          label="Badge City"
          name="badgeCity"
          type="text"
          value={formData.badgeCity}
          onChange={onChange}
          error={errors.badgeCity}
          description="How you would like the city presented on your physical badge"
        />

        <FormField
          label="Country"
          name="country"
          type="select"
          value={formData.country}
          onChange={onChange}
          error={errors.country}
          required
          options={COUNTRIES.map(country => ({
            value: country.code,
            label: country.name
          }))}
        />

        {formData.country === 'US' && (
          <FormField
            label="State"
            name="state"
            type="select"
            value={formData.state}
            onChange={onChange}
            error={errors.state}
            required
            options={US_STATES.map(state => ({
              value: state.code,
              label: state.name
            }))}
          />
        )}

        <FormField
          label={formData.country === 'US' ? 'ZIP Code' : 'Postal Code'}
          name="zip"
          type="text"
          value={formData.zip}
          onChange={onChange}
          error={errors.zip}
          required
        />
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
          onClick={handleNext}
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}