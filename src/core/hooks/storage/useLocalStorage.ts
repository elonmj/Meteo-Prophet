import {useCallback, useState} from 'react';
import {useErrorHandler} from '../error/useError';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const {handleError} = useErrorHandler();

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      handleError(
        err instanceof Error ? err : new Error('An error occurred while reading from localStorage'),
      );
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        handleError(
          err instanceof Error ? err : new Error('An error occurred while writing to localStorage'),
        );
      }
    },
    [key, handleError],
  );

  return [storedValue, setValue] as const;
}
