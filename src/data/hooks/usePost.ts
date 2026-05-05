import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { GET_POST } from '../graphql/queries/posts';
import { transformGQLPostToPost } from '../../domain/transformers/postTransformer';
import { Post } from '../../domain/models/Post';

interface PostResponse {
  post: unknown | null;
}

/**
 * ✅ Hook de récupération d'un post par id.
 *
 * - enabled: !!id  → la query ne se déclenche pas tant que l'id est vide
 * - staleTime hérité du QueryClient global
 * - le transformer normalise le post côté domaine
 */
export function usePost(id: string) {
  return useQuery<Post>({
    queryKey: ['post', id] as const,
    queryFn: async () => {
      const data = await gqlClient.request<PostResponse>(GET_POST, { id });
      if (!data.post) throw new Error('Post introuvable');
      return transformGQLPostToPost(data.post);
    },
    enabled: !!id,
  });
}
