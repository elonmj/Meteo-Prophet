'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Une erreur est survenue</h1>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Réessayer
      </button>
      <button
        onClick={() => router.push('/')}
        className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}
