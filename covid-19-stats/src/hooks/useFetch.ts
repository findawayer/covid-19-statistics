import { useEffect, useReducer, useRef } from 'react';

import { readCache, writeCache } from '../utils';

/** Type of data that can be fetched from a JSON response. */
type JsonValue = string | number | boolean | null;
type JsonObject = Record<string | number, JsonValue>;
type JsonArrayOfObject = JsonObject[];

/** Shallow schema of any JSON data. */
type JsonData = JsonObject | JsonArrayOfObject;

/** Return value of `useFetch` hook. */
type FetchResult = {
  data: JsonData | null;
  loading: boolean;
  error: Error | null;
};

/** Default return value of `useFetch` hook. */
const initialResult: FetchResult = {
  data: null,
  loading: true,
  error: null
};

/** Action for fetchResultReducer */
type Action =
  | { type: 'setLoading' }
  | { type: 'setError'; payload: Error }
  | { type: 'setData'; payload: JsonData };

/** Update `fetchResult` object based on the action type. */
const fetchResultReducer = (
  status: FetchResult,
  action: Action
): FetchResult => {
  switch (action.type) {
    case 'setError':
      return { ...status, loading: false, error: action.payload };

    case 'setData':
      return { ...status, loading: false, data: action.payload };

    default:
      throw new Error('Unhandled action type.');
  }
};

type UseFetchOptions = {
  cacheKey?: string;
  cacheMaxAge?: number;
};

/**
 * Hook for
 * 1. Declarative data fetch.
 * 2. Use Cache API: https://developer.mozilla.org/en-US/docs/Web/API/Cache
 *
 * @todo Correct type capturing :)
 */
export const useFetch = <T extends JsonData>(
  uri: string,
  { cacheKey, cacheMaxAge }: UseFetchOptions = {}
) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    fetchResultReducer,
    initialResult
  );
  const cacheRef = useRef({
    key: cacheKey,
    timestamp: 0
  });

  // Fetch data.
  useEffect(() => {
    async function getData(): Promise<void> {
      // Validate cache.
      const hasCache = cacheRef.current.key && cacheMaxAge;
      const cacheIsValid =
        Date.now() - cacheRef.current.timestamp < (cacheMaxAge || 0);
      // Try to find previously cached response.
      const request = new Request(uri);
      const cachedResponse =
        hasCache && cacheIsValid
          ? await readCache(cacheRef.current.key!, request)
          : null;
      // Otherwise, fetch new data.
      const response = cachedResponse ?? (await fetch(request));
      // Something went wrong x(
      if (!response.ok) {
        const error = new Error(`Request failed: ${uri}`);
        dispatch({ type: 'setError', payload: error });
        return;
      }
      // Cache the data.
      if (hasCache && !cacheIsValid) {
        writeCache(cacheRef.current.key!, request, response.clone());
      }
      // Set the retrieved data.
      const data = await response.json();
      dispatch({ type: 'setData', payload: data });
    }

    getData();
  }, [cacheMaxAge, dispatch, uri]);

  return { data: data as T | null, loading, error };
};
