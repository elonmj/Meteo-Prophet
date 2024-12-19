import {api} from '@/core/libs/apiClients';
import {useCallback, useState} from 'react';

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

export function useMutation<TData = unknown, TVariables = unknown>(
  endpoint: string,
  method: HttpMethod,
  options: UseMutationOptions<TData, TVariables> = {},
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables?: TVariables) => {
      setIsLoading(true);
      setError(null);
      try {
        let result;
        switch (method) {
          case 'POST':
            result = await api.post<TData>(endpoint, variables);
            break;
          case 'PUT':
            result = await api.put<TData>(endpoint, variables);
            break;
          case 'PATCH':
            result = await api.patch<TData>(endpoint, variables);
            break;
          case 'DELETE':
            result = await api.delete<TData>(endpoint);
            break;
        }
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        options.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, method, options],
  );

  return {mutate, data, isLoading, error};
}

// Exemple d'utilisation :
// const { mutate, isLoading, error } = useMutation<User, { name: string, email: string }>('/api/users', 'POST');
//
// // Dans un gestionnaire d'événements :
// const handleSubmit = async (userData) => {
//   try {
//     const newUser = await mutate(userData);
//     console.log('Nouvel utilisateur créé:', newUser);
//   } catch (error) {
//     console.error('Erreur lors de la création de l'utilisateur:', error);
//   }
// };
