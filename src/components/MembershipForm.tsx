import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { MembershipLevel, MEMBERSHIP_TIERS } from '../types/membership';
import { lookupBadgeNumber } from '../services/membership';
import { useDebounce } from '../hooks/useDebounce';
import { FormData, initialFormData } from '../constants/initialState';
import MembershipTierCard from './MembershipTierCard';
import PersonalInfoForm from './PersonalInfoForm';
import SecondPersonInfo from './SecondPersonInfo';
import TrialEventVoting from './TrialEventVoting';
import MerchandiseSelection from './MerchandiseSelection';
import PaymentSection from './PaymentSection';
import FreeGiftSelection from './FreeGiftSelection';
import RegistrationSuccess from './RegistrationSuccess';
import ErrorFallback from './ErrorFallback';
import { CheckCircle2 } from 'lucide-react';

export default function MembershipForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [merchandiseTotal, setMerchandiseTotal] = useState(0);
  const [extraShirtCost, setExtraShirtCost] = useState(0);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupSuccess, setLookupSuccess] = useState<boolean>(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const debouncedBadgeNumber = useDebounce(formData.badgeNumber, 3000);

  useEffect(() => {
    const lookupBadge = async () => {
      if (debouncedBadgeNumber && formData.previousMember) {
        setIsLookingUp(true);
        setLookupError(null);
        setLookupSuccess(false);
        try {
          const memberData = await lookupBadgeNumber(debouncedBadgeNumber);
          setFormData(prev => ({
            ...prev,
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            email: memberData.email,
            city: memberData.city,
            country: memberData.country,
            state: memberData.state,
            zip: memberData.zip,
            phone: memberData.phone
          }));
          setLookupSuccess(true);
        } catch (error) {
          setLookupError('Member not found');
          setLookupSuccess(false);
        } finally {
          setIsLookingUp(false);
        }
      }
    };

    lookupBadge();
  }, [debouncedBadgeNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));

    if (name === 'previousMember' && !checked) {
      setFormData(prev => ({ ...prev, badgeNumber: '' }));
      setLookupError(null);
      setLookupSuccess(false);
    }

    if (name === 'badgeNumber' && !value) {
      setLookupError(null);
      setLookupSuccess(false);
    }
  };

  const handleBadgeBlur = async () => {
    if (formData.badgeNumber && formData.previousMember) {
      setIsLookingUp(true);
      setLookupError(null);
      setLookupSuccess(false);
      try {
        const memberData = await lookupBadgeNumber(formData.badgeNumber);
        setFormData(prev => ({
          ...prev,
          firstName: memberData.firstName,
          lastName: memberData.lastName,
          email: memberData.email,
          city: memberData.city,
          country: memberData.country,
          state: memberData.state,
          zip: memberData.zip,
          phone: memberData.phone
        }));
        setLookupSuccess(true);
      } catch (error) {
        setLookupError('Member not found');
        setLookupSuccess(false);
      } finally {
        setIsLookingUp(false);
      }
    }
  };

  const handleMembershipSelect = (key: MembershipLevel) => {
    setFormData(prev => ({
      ...prev,
      membershipLevel: key,
      secondPerson: key === 'vendor' ? {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        badgeCity: '',
        state: '',
        country: 'US',
        zip: ''
      } : undefined
    }));
  };

  const handleSecondPersonChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      secondPerson: {
        ...prev.secondPerson!,
        [field]: value
      }
    }));
  };

  const renderStep = () => {
    if (isComplete) {
      return <RegistrationSuccess />;
    }

    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Membership Selection</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="previousMember"
                  name="previousMember"
                  checked={formData.previousMember}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-[#0B56A3] focus:ring-[#0B56A3]"
                />
                <label htmlFor="previousMember" className="text-sm font-medium leading-6 text-gray-900">
                  Previous BPA member
                </label>
              </div>

              {formData.previousMember && (
                <div>
                  <label htmlFor="badgeNumber" className="block text-sm font-medium text-gray-700">
                    Badge Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="badgeNumber"
                      id="badgeNumber"
                      value={formData.badgeNumber || ''}
                      onChange={handleInputChange}
                      onBlur={handleBadgeBlur}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B56A3] focus:ring-[#0B56A3] sm:text-sm"
                    />
                    {isLookingUp && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0B56A3] border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                  {lookupError && (
                    <p className="mt-1 text-sm text-red-600">{lookupError}</p>
                  )}
                  {lookupSuccess && (
                    <div className="mt-2 flex items-center text-green-600">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      <p className="text-sm">Member found successfully</p>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(MEMBERSHIP_TIERS)
                  .filter(([_, tier]) => tier.isAvailable)
                  .map(([key, tier]) => (
                    <MembershipTierCard
                      key={key}
                      tierKey={key as MembershipLevel}
                      tier={tier}
                      isSelected={formData.membershipLevel === key}
                      onSelect={handleMembershipSelect}
                    />
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <PersonalInfoForm
            formData={formData}
            onChange={handleInputChange}
            onBack={() => setStep(1)}
            onNext={() => setStep(formData.membershipLevel === 'vendor' ? 3 : 4)}
          />
        );

      case 3:
        if (formData.membershipLevel === 'vendor') {
          return (
            <SecondPersonInfo
              formData={formData}
              onChange={handleSecondPersonChange}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          );
        }
        return setStep(4);

      case 4:
        if (formData.membershipLevel === 'sponsor') {
          return (
            <FreeGiftSelection
              selectedGift={formData.selectedGift}
              selectedSize={formData.shirtSize as any}
              onGiftSelect={(gift) => setFormData(prev => ({ ...prev, selectedGift: gift }))}
              onSizeSelect={(size) => setFormData(prev => ({ ...prev, shirtSize: size }))}
              extraCost={formData.shirtSize && ['3XL', '4XL'].includes(formData.shirtSize) ? 5 : 0}
              onBack={() => setStep(3)}
              onNext={() => setStep(5)}
            />
          );
        }
        return (
          <TrialEventVoting
            selectedEvents={formData.selectedTrialEvents}
            onSelect={(id) => {
              setFormData(prev => ({
                ...prev,
                selectedTrialEvents: prev.selectedTrialEvents.includes(id)
                  ? prev.selectedTrialEvents.filter(e => e !== id)
                  : [...prev.selectedTrialEvents, id]
              }));
            }}
            onBack={() => setStep(formData.membershipLevel === 'vendor' ? 3 : 2)}
            onNext={() => setStep(5)}
          />
        );

      case 5:
        if (formData.membershipLevel === 'tribune') {
          return (
            <FreeGiftSelection
              selectedGift={formData.selectedGift}
              selectedSize={formData.shirtSize as any}
              onGiftSelect={(gift) => setFormData(prev => ({ ...prev, selectedGift: gift }))}
              onSizeSelect={(size) => setFormData(prev => ({ ...prev, shirtSize: size }))}
              extraCost={formData.shirtSize && ['3XL', '4XL'].includes(formData.shirtSize) ? 5 : 0}
              onBack={() => setStep(4)}
              onNext={() => setStep(6)}
            />
          );
        }
        if (['sponsor', 'tribune', 'sustaining'].includes(formData.membershipLevel)) {
          return (
            <MerchandiseSelection
              selectedItems={formData.merchandise}
              onItemSelect={(id, quantity) => 
                setFormData(prev => ({
                  ...prev,
                  merchandise: { ...prev.merchandise, [id]: quantity }
                }))
              }
              onBack={() => setStep(4)}
              onNext={() => setStep(6)}
            />
          );
        }
        return setStep(6);

      case 6:
        return (
          <PaymentSection
            formData={formData}
            merchandiseTotal={merchandiseTotal}
            extraShirtCost={extraShirtCost}
            onBack={() => setStep(5)}
            onComplete={() => setIsComplete(true)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {renderStep()}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}