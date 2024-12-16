export type MembershipLevel = 
  | 'associate'
  | 'sustaining'
  | 'tribune'
  | 'sponsor'
  | 'exhibitor'
  | 'vendor';

export type JuniorShirtSize = 'CS' | 'CM' | 'CL' | 'AS';

export type PaymentMethod = 'paypal' | 'check';

export interface JuniorRegistration {
  firstName: string;
  lastName: string;
  shirtSize: JuniorShirtSize;
}

export interface MembershipTier {
  name: string;
  price: number;
  description: string;
  benefits: string[];
  isAvailable: boolean;
}

export interface SecondPerson {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  badgeCity: string;
  state: string;
  country: string;
  zip: string;
}

export interface MembershipSubmission {
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
  secondPerson?: SecondPerson;
  juniorRegistrations: JuniorRegistration[];
  selectedTrialEvents: string[];
  merchandise: Record<string, number>;
  selectedGift?: 'giftcard' | 'hat' | 'shirt';
  shirtSize?: string;
  paymentMethod: PaymentMethod;
  checkMemo?: string;
  paypalTransactionId?: string;
  total: number;
}

export const MEMBERSHIP_TIERS: Record<MembershipLevel, MembershipTier> = {
  associate: {
    name: 'Associate',
    price: 10,
    description: 'Access to Play By eMail (PBeM) tournaments',
    benefits: [
      'PBeM tournament access',
      'Trial Event voting',
      'Voting on Board of Directors'
    ],
    isAvailable: true
  },
  sustaining: {
    name: 'Sustaining',
    price: 100,
    description: 'Full access to WBC with voting rights',
    benefits: [
      'All 9 days of WBC',
      'Trial Event voting',
      'Voting on Board of Directors',
      'Host demos or seminars',
      'Purchase WBC merchandise'
    ],
    isAvailable: true
  },
  tribune: {
    name: 'Tribune',
    price: 150,
    description: 'Premium transferable membership',
    benefits: [
      'Transferable membership',
      'All 9 days of WBC',
      'Trial Event voting',
      'Voting on Board of Directors',
      'Host demos or seminars',
      'Free WBC merchandise',
      'Purchase WBC merchandise',
    ],
    isAvailable: true
  },
  sponsor: {
    name: 'Sponsor',
    price: 500,
    description: 'Premium membership with event creation rights',
    benefits: [
      'Transferable membership',
      'All 9 days of WBC',
      'Trial Event voting',
      'Voting on Board of Directors',
      'Host demos or seminars',
      'Add WBC events',
      'Free WBC merchandise',
      'Purchase WBC merchandise'
    ],
    isAvailable: true
  },
  exhibitor: {
    name: 'Exhibitor',
    price: 250,
    description: 'Demonstration table in Gaming Hall',
    benefits: [
      'All 9 days of WBC',
      'Demo table access',
      'Company banner display',
      'Trial Event voting',
      'Voting on Board of Directors'
    ],
    isAvailable: true
  },
  vendor: {
    name: 'Vendor',
    price: 500,
    description: 'Full vendor booth with sales rights',
    benefits: [
      'All 9 days of WBC',
      'Access for 2 people',
      '10x10 vendor booth',
      'Company banner display',
      'Trial Event voting',
      'Voting on Board of Directors',
      'Add WBC events'
    ],
    isAvailable: true
  }
};