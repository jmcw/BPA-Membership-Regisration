export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://dev-boardgamers.pantheonsite.io',
  ENDPOINTS: {
    PRODUCTS: '/jsonapi/node/product?include=field_image&fields[file--file]=uri,url',
    EVENTS: '/jsonapi/node/event',
    CSRF_TOKEN: '/session/token',
    MEMBERSHIP: '/api/v1/membership',
    BADGE_LOOKUP: '/api/v1/lookup-by-badge-number'
  }
} as const;