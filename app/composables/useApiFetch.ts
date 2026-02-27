import { useRuntimeConfig, useCookie } from "#app";

export function useApiFetch<T>(url: string, options: any = {}): Promise<T> {
  const config = useRuntimeConfig();

  return $fetch<T>(url, {
    baseURL: config.public.baseURL,
    ...options,
  });
}
