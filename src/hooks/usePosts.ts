import { useQuery } from '@tanstack/react-query';
import { Platform } from 'react-native';

// Endpoint backend GraphQL (cf. 03-backend-graphql/).
// MSW intercepte ces requêtes en environnement de test.
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const ENDPOINT = `http://${HOST}:4000/graphql`;

const GET_POSTS_QUERY = `query GetPosts {
  posts {
    id
    title
    excerpt
    author { id name avatar }
    tags
    createdAt
  }
}`;

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: { id: string; name: string; avatar?: string | null };
  tags: string[];
  createdAt: string;
}

interface UsePostsResult {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
  isRefetching: boolean;
}

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_POSTS_QUERY,
      operationName: 'GetPosts',
    }),
  });

  if (!res.ok) {
    throw new Error(`Erreur ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { posts: Post[] };
    errors?: Array<{ message: string }>;
  };

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0]?.message ?? 'Erreur GraphQL');
  }

  return json.data?.posts ?? [];
}

export function usePosts(): UsePostsResult {
  const q = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return {
    posts: q.data ?? [],
    isLoading: q.isLoading,
    isError: q.isError,
    error: (q.error as Error | null) ?? null,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: () => {},
    refetch: () => {
      void q.refetch();
    },
    isRefetching: q.isRefetching,
  };
}

export default usePosts;
