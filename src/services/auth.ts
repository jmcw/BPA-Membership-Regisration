import { API_CONFIG } from '../config/api';

export async function getCSRFToken(): Promise<string> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CSRF_TOKEN}`);
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}