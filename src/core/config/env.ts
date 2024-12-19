export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  API_VERSION: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  OPEN_METEO_API: process.env.NEXT_PUBLIC_OPEN_METEO_API || 'https://api.open-meteo.com/v1'
} as const;

export const getApiUrl = (path: string) => {
  return `${env.API_URL}/api/${env.API_VERSION}${path}`;
};