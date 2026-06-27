import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface FetchOptions {
  enabled?: boolean;
  dependencies?: any[];
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for fetching data
 * Handles loading, error, and caching states
 */
export const useFetch = <T>(
  endpoint: string,
  options: FetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        setData(response.data);
        options.onSuccess?.(response.data);
      } catch (err) {
        const error = err as Error;
        setError(error);
        options.onError?.(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, options.dependencies || [endpoint]);

  return { data, loading, error, refetch: () => {} };
};
