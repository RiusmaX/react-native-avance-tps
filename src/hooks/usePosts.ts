import { useState, useCallback, useRef, useMemo } from 'react';

// Types
interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: { name: string; avatar?: string };
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

// Données mockées
const MOCK_POSTS: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: `post-${i + 1}`,
  title: `Article de démonstration n°${i + 1}`,
  excerpt: `Ceci est l'extrait de l'article ${i + 1}...`,
  author: { name: `Auteur ${(i % 10) + 1}` },
  tags: [`tag${(i % 5) + 1}`, `tag${(i % 3) + 6}`],
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

const PAGE_SIZE = 10;

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const hasNextPage = (page + 1) * PAGE_SIZE < MOCK_POSTS.length;

  // Simulation de chargement initial
  useState(() => {
    setTimeout(() => {
      setPosts(MOCK_POSTS.slice(0, PAGE_SIZE));
      setIsLoading(false);
      setPage(0);
    }, 800);
  });

  const fetchNextPage = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage) return;
    setIsFetchingNextPage(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      setPosts((prev) => [...prev, ...MOCK_POSTS.slice(start, end)]);
      setPage(nextPage);
      setIsFetchingNextPage(false);
    }, 600);
  }, [page, hasNextPage, isFetchingNextPage]);

  const refetch = useCallback(() => {
    setIsRefetching(true);
    setTimeout(() => {
      setPosts(MOCK_POSTS.slice(0, PAGE_SIZE));
      setPage(0);
      setIsRefetching(false);
    }, 800);
  }, []);

  return {
    posts,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  };
}

export default usePosts;
