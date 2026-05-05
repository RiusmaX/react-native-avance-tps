import { useInfiniteQuery } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { GET_POSTS } from '../graphql/queries/posts';
import { Post } from '../../domain/models/Post';
import { transformGQLPostsToPosts } from '../../domain/transformers/postTransformer';

interface UsePostsOptions {
  tag?: string;
  limit?: number;
}

interface PostsPage {
  posts: {
    items: unknown[];
    total: number;
    hasMore: boolean;
  };
}

/**
 * ✅ Hook de pagination infinie sur les posts.
 *
 * - clé de cache : ['posts', { tag }]
 * - pageParam = offset (incrémenté de `limit` à chaque page)
 * - getNextPageParam : retourne `undefined` quand `hasMore = false`
 *   (TanStack Query arrête alors le scroll infini)
 * - select : applique le transformer GQL → modèle métier
 */
export function usePosts({ tag, limit = 20 }: UsePostsOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['posts', { tag }] as const,
    queryFn: async ({ pageParam }) => {
      const data = await gqlClient.request<PostsPage>(GET_POSTS, {
        limit,
        offset: pageParam,
        tag: tag || undefined,
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.posts.hasMore) return undefined;
      return allPages.length * limit;
    },
    select: (data): { items: Post[]; total: number } => {
      const items = data.pages.flatMap((p) =>
        transformGQLPostsToPosts(p.posts.items)
      );
      const total = data.pages[data.pages.length - 1]?.posts.total ?? 0;
      return { items, total };
    },
    staleTime: 1000 * 60 * 5,  // 5 min — évite refetch inutile au remount
  });
}
