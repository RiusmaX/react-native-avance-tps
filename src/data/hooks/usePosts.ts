import { useInfiniteQuery } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { GET_POSTS } from '../graphql/queries/posts';
import { Post } from '../../domain/models/Post';
import { transformGQLPostsToPosts } from '../../domain/transformers/postTransformer';

// 🔲 TODO : Implémenter usePosts avec useInfiniteQuery
// - Fonction fetchPosts qui appelle gqlClient.request
// - Pagination avec limit/offset (ou cursor-based)
// - Transformation des données via postTransformer
// - Filtrage optionnel par tag

interface UsePostsOptions {
  tag?: string;
  limit?: number;
}

interface PostsResponse {
  posts: {
    items: any[];
    total: number;
    hasMore: boolean;
  };
}

export function usePosts({ tag, limit = 10 }: UsePostsOptions = {}) {
  return useInfiniteQuery<PostsResponse>({
    queryKey: ['posts', { tag }],
    queryFn: async ({ pageParam }) => {
      // 🔲 TODO : Implémenter l'appel GraphQL avec pagination
      // const data = await gqlClient.request(GET_POSTS, {
      //   limit,
      //   offset: pageParam,
      //   tag: tag || undefined,
      // });
      // return data;
      throw new Error('TODO : implémenter usePosts');
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 🔲 TODO : Calculer le prochain offset
      // return lastPage.posts.hasMore ? allPages.length * limit : undefined;
      return undefined;
    },
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        items: transformGQLPostsToPosts(page.posts?.items || []),
      })),
      pageParams: data.pageParams,
    }),
  });
}
