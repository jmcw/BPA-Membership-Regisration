import { MembershipLevel } from './membership';

export interface PersonalInfoFormProps {
  formData: {
    membershipLevel: MembershipLevel;
    firstName: string;
    lastName: string;
    companyName?: string;
    email: string;
    city: string;
    badgeCity: string;
    state: string;
    country: string;
    zip: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBack: () => void;
  onNext: () => void;
}