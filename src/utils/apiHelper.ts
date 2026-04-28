/**
 * apiHelper — Fonctions utilitaires pour les appels API
 * Migration de JS vers TypeScript strict.
 * @deprecated Utiliser TanStack Query pour les nouveaux appels
 */

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string>;
}

export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const queryString = options.params
    ? '?' + new URLSearchParams(options.params).toString()
    : '';
  const url = `${API_BASE_URL}${endpoint}${queryString}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function postApi<T = unknown>(
  endpoint: string,
  data: unknown
): Promise<T> {
  return fetchApi<T>(endpoint, { method: 'POST', body: data });
}

export interface UserData {
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

export type ProcessedUserData = UserData & {
  fullName: string;
  isActive: boolean;
};

export function processUserData(user: UserData): ProcessedUserData {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user data: expected an object');
  }
  return {
    ...user,
    fullName: `${user.name} (${user.email})`,
    isActive: user.status === 'active',
  };
}
