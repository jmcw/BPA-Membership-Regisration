import { getCSRFToken } from './auth';
import { API_CONFIG } from '../config/api';
import { MembershipSubmission } from '../types/membership';

interface BadgeLookupPerson {
  id: string;
  first_name: string;
  last_name: string;
  badge_number: string;
  phone: string | null;
  address: string | null;
}

interface BadgeLookupUser {
  id: string;
  email: string;
}

interface BadgeLookupApiResponse {
  status: string;
  person: BadgeLookupPerson;
  user: BadgeLookupUser;
}

export interface BadgeLookupResponse {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  phone: string;
}

export async function lookupBadgeNumber(badgeNumber: string): Promise<BadgeLookupResponse> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BADGE_LOOKUP}/${badgeNumber}`);
    
    if (!response.ok) {
      throw new Error('Member not found');
    }
    
    const data: BadgeLookupApiResponse = await response.json();

    // Transform the API response to match our application's format
    return {
      firstName: data.person.first_name,
      lastName: data.person.last_name,
      email: data.user.email,
      city: data.person.address.city, 
      country: data.person.address.country, 
      state: data.person.address.state,
      zip: data.person.address.postal_code,
      phone: data.person.phone
    };
  } catch (error) {
    throw new Error('Member not found');
  }
}

export async function submitMembership(data: MembershipSubmission): Promise<any> {
  try {
    const token = await getCSRFToken();

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERSHIP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to submit membership');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting membership:', error);
    throw error;
  }
}