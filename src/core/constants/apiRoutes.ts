export const API_ROUTES = {
  weather: {
    forecast: '/api/weather/forecast',
    historical: '/api/weather/historical',
    locations: '/api/weather/locations',
    statistics: '/api/weather/statistics'
  },
  regions: {
    base: '/api/regions',
    byId: (id: string) => `/api/regions/${id}`,
    statistics: (id: string) => `/api/regions/${id}/statistics`
  }
};