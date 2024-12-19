export interface WeatherError extends Error {
  name: string;
  message: string;
  code?: string;
  status?: number;
}

export type ErrorDisplayType = WeatherError | Error;
