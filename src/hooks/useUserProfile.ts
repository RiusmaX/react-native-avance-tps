/**
 * useUserProfile — Hook de récupération du profil utilisateur
 *
 * Extrait la logique métier du composant UserProfile.
 * Utilise TanStack Query pour la gestion du cache et des états.
 */

import { useQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  posts?: Array<{ id: string; title: string }>;
  joinDate?: string;
  bio?: string;
}

interface UserApiResponse {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
}

async function fetchUserProfile(userId: string): Promise<User> {
  if (!userId) throw new Error('userId est requis');

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }

  const data: UserApiResponse = await response.json();

  return {
    id: String(data.id),
    name: data.name ?? 'Inconnu',
    email: data.email ?? '',
    bio: data.company?.name ? `Développeur chez ${data.company.name}` : undefined,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    posts: [],
  };
}

export function useUserProfile(userId: string) {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
}
