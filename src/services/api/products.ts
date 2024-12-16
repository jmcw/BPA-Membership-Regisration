import { API_CONFIG } from '../../config/api';
import type { Product, JsonApiResponse } from '../../types/product';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonApiData: JsonApiResponse = await response.json();
    
    if (!jsonApiData.data || !Array.isArray(jsonApiData.data)) {
      throw new Error('Invalid API response format');
    }

    console.log(jsonApiData);
    return jsonApiData.data.map(item => ({
      id: item.id,
      title: item.title,
      price: item.field_price?.value || 0,
      description: item.field_description?.value || '',
      imageUrl: `${API_CONFIG.BASE_URL}/${item.field_image?.uri?.url}` || 'https://via.placeholder.com/400x300?text=No+Image'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}