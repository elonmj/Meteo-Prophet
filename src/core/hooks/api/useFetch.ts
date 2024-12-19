// This hook can be used to Get requests

import {api} from '@/core/libs/apiClients';
import {useCallback, useState} from 'react';

interface UseFetchOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useFetch<T>(endpoint: string, options: UseFetchOptions<T> = {}) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.get<T>(endpoint);
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      options.onError?.(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, options]);

  return {data, isLoading, error, fetchData};
}

// Utilisation :
// const { data, isLoading, error, fetchData } = useFetch<User[]>('/api/users');
