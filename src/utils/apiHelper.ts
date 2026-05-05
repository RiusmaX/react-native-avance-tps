// ✅ Migré en TypeScript strict :
//   - Types génériques sur la réponse
//   - Plus de retour text|json mixé : on impose JSON
//   - Erreurs HTTP transformées en Error
//   - Plus de mutation des paramètres

const API_BASE_URL = 'https://api.example.com';

export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const response = await fetch(API_BASE_URL + endpoint, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new ApiError(
      `Requête échouée (${response.status} ${response.statusText})`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export function postApi<T>(endpoint: string, data: unknown): Promise<T> {
  return fetchApi<T>(endpoint, { method: 'POST', body: data });
}

// ✅ Plus de mutation : retourne un nouvel objet
export interface UserWithDerived {
  fullName: string;
  isActive: boolean;
}

export function deriveUserFields<U extends { name: string; email: string; status: string }>(
  user: U
): U & UserWithDerived {
  return {
    ...user,
    fullName: `${user.name} (${user.email})`,
    isActive: user.status === 'active',
  };
}
