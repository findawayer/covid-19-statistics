import { useEffect, useReducer } from 'react';

/** Type of data that can be fetched from a JSON response. */
type JsonValue = 'string' | 'number' | 'boolean' | null;

/** Shallow schema of any JSON data. */
type JsonData = Record<string | number, JsonValue> | JsonValue[];

type FetchResult<T extends JsonData> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

type Action<T extends JsonData> =
  | { type: 'setLoading' }
  | { type: 'setError'; payload: Error }
  | { type: 'setData'; payload: T };

const initialResult: FetchResult<JsonData> = {
  data: null,
  error: null,
  loading: false
};

const fetchResultReducer = <T extends JsonData>(
  status: FetchResult<T>,
  action: Action<T>
): FetchResult<T> => {
  switch (action.type) {
    case 'setLoading':
      return { ...status, loading: true, error: null };

    case 'setError':
      return { ...status, loading: false, error: action.payload };

    case 'setData':
      return { ...status, loading: false, data: action.payload };

    default:
      throw new Error('Unhandled action type.');
  }
};

/**
 * Hook for
 * 1. Declarative data fetch.
 * 2. Use Cache API: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 *
 * @todo Correct type capturing :)
 */
export const useFetch = <T>(uri: string) => {
  const [{ data, error, loading }, dispatch] = useReducer(
    fetchResultReducer,
    initialResult
  );

  useEffect(() => {
    async function getData(): Promise<void> {
      // Set loading
      dispatch({ type: 'setLoading' });
      // Fetch
      const response = await fetch(uri);
      // Something went wrong x(
      if (!response.ok) {
        const error = new Error(`Request failed: ${uri}`);
        dispatch({ type: 'setError', payload: error });
        return;
      }
      // Set the retrieved data.
      const data = await response.json();
      dispatch({ type: 'setData', payload: data });
    }

    getData();
  }, [dispatch, uri]);

  return { data: data as T | null, error, loading };
};
