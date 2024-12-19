import logger from '../../utils/logger';
import { useCallback, useState } from 'react';

interface ErrorState {
  error: Error | null;
  context?: object;
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({ error: null });

  const handleError = useCallback((error: Error, context?: object) => {
    setErrorState({ error, context });
    logger.error('Application Error:', error, {
      ...context,
      component: 'ErrorHandler',
      timestamp: new Date().toISOString()
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({ error: null });
  }, []);

  return {
    error: errorState.error,
    errorContext: errorState.context,
    handleError,
    clearError
  };
}

// Exemple d'utilisation:
/*
const MyComponent = () => {
  const { error, handleError, clearError } = useErrorHandler();

  const handleAction = async () => {
    try {
      // Action potentiellement dangereuse
      await someAsyncOperation();
    } catch (err) {
      handleError(
        err instanceof Error ? err : new Error('Une erreur est survenue'),
        { action: 'someAsyncOperation', data: 'contextual data' }
      );
    }
  };

  if (error) {
    return <ErrorDisplay error={error} onDismiss={clearError} />;
  }

  return <div>...</div>;
};
*/
