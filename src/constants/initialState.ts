import { MembershipLevel } from '../types/membership';

export interface FormData {
  previousMember: boolean;
  badgeNumber?: string;
  membershipLevel: MembershipLevel;
  firstName: string;
  lastName: string;
  companyName?: string;
  city: string;
  badgeCity: string;
  state: string;
  country: string;
  zip: string;
  email: string;
  phone: string;
  secondPerson?: {
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
  juniorRegistrations: Array<{
    firstName: string;
    lastName: string;
    shirtSize: string;
  }>;
  selectedTrialEvents: string[];
  merchandise: Record<string, number>;
  selectedGift?: 'giftcard' | 'hat' | 'shirt';
  shirtSize?: string;
  paymentMethod?: 'paypal' | 'check';
  checkMemo?: string;
}

export const initialFormData: FormData = {
  previousMember: false,
  membershipLevel: 'associate',
  firstName: '',
  lastName: '',
  city: '',
  badgeCity: '',
  state: '',
  country: 'US',
  zip: '',
  email: '',
  phone: '',
  juniorRegistrations: [],
  selectedTrialEvents: [],
  merchandise: {},
};