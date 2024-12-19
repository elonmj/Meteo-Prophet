'use client';

import { WeatherError } from '@/core/types/error';

interface ErrorDisplayProps {
  message?: string;
  error?: WeatherError | Error;
  retry?: () => void;
}

export function ErrorDisplay({ message, error, retry }: ErrorDisplayProps) {
  const displayMessage = message || error?.message || "Une erreur s'est produite";

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-red-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold mb-2">{displayMessage}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
}

export function MainErrorFallback() {
  return (
    <div 
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Une erreur est survenue</h2>
      <button 
        onClick={() => window.location.assign(window.location.origin)}
        className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Actualiser
      </button>
    </div>
  );
}
