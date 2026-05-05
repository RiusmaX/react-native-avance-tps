import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../utils/apiHelper';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
}

interface UseUserProfileResult {
  user: User | undefined;
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * ✅ Hook unique qui orchestre 2 queries :
 *   - profil utilisateur
 *   - posts de l'utilisateur (déclenché seulement si user.id est défini)
 *
 * Avantages vs legacy :
 *   - Plus de setState callback hell
 *   - Plus de cache local fait main (TanStack gère)
 *   - Re-fetch automatique sur changement de userId
 *   - Erreurs typées (Error au lieu de string)
 */
export function useUserProfile(userId: string): UseUserProfileResult {
  const userQuery = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchApi<User>(`/api/user/${userId}`),
    enabled: !!userId,
  });

  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['user', userId, 'posts'],
    queryFn: () => fetchApi<Post[]>(`/api/user/${userId}/posts`),
    enabled: !!userQuery.data?.id,
  });

  return {
    user: userQuery.data,
    posts: postsQuery.data ?? [],
    isLoading: userQuery.isLoading || (!!userQuery.data && postsQuery.isLoading),
    error: userQuery.error ?? postsQuery.error,
    refetch: () => {
      userQuery.refetch();
      postsQuery.refetch();
    },
  };
}
