import { API_CONFIG } from '../../config/api';
import type { Event, JsonApiEventResponse } from '../../types/event';

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/jsonapi/node/event`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonApiData: JsonApiEventResponse = await response.json();
    
    if (!jsonApiData.data || !Array.isArray(jsonApiData.data)) {
      throw new Error('Invalid API response format');
    }
    console.log(jsonApiData);
    
    return jsonApiData.data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.field_description?.processed || '',
      category: item.field_category?.target_id || 'Uncategorized',
      minPlayers: item.field_min_players?.value || 1,
      maxPlayers: item.field_max_players?.value || 4,
      duration: item.field_duration?.value || '30-60 minutes'
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}