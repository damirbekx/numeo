import axiosInstance from "@api/axiosInstance";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

interface UseGetOptions<TData, TError = unknown> {
  endpoint: string;
  queryParams?: Record<string, string | number | boolean | undefined | null>;
  queryKey?: readonly unknown[];
  options?: Omit<
    UseQueryOptions<TData, TError, TData, readonly unknown[]>,
    "queryKey" | "queryFn"
  >;
}

export const useGet = <TData = unknown, TError = unknown>({
  endpoint,
  queryParams,
  queryKey,
  options,
}: UseGetOptions<TData, TError>) => {
  const fetcher = async (): Promise<TData> => {
    let url = endpoint;
    const searchParams = new URLSearchParams();

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    const response = await axiosInstance.get<TData>(url);
    return response.data;
  };

  return useQuery({
    queryKey: queryKey || [endpoint, queryParams],
    queryFn: fetcher,
    ...options,
  });
};
