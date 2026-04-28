// ❌ PROBLÈME 4 : Subscription non nettoyée → fuite mémoire
// EventEmitter.addListener sans cleanup dans useEffect.
// Les listeners s'accumulent à chaque remount du composant.
import { useState, useEffect } from 'react';

// Simule un EventEmitter natif (comme NativeEventEmitter)
const EventEmitter = {
  listeners: new Map<string, Set<(...args: any[]) => void>>(),
  addListener(event: string, handler: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    return { remove: () => this.listeners.get(event)?.delete(handler) };
  },
  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach((handler) => handler(...args));
  },
};

// 500 posts mockés
function generateMockPosts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `Article ${i + 1} - Lorem ipsum dolor sit amet consectetur`,
    excerpt: `Extrait de l'article ${i + 1}... Découvrez les dernières actualités.`,
    thumbnailUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
    likes: Math.floor(Math.random() * 100),
    author: {
      name: `Auteur ${(i % 20) + 1}`,
      avatar: `https://i.pravatar.cc/150?u=${i}`,
    },
  }));
}

const mockPosts = generateMockPosts(500);

function useFeed() {
  const [posts, setPosts] = useState(mockPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // ❌ addListener sans return de cleanup
    // Quand le composant est démonté puis remonté,
    // les listeners s'accumulent → fuite mémoire + re-renders fantômes
    EventEmitter.addListener('newPost', (newPost: any) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    EventEmitter.addListener('postUpdated', (updatedPost: any) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    });

    // ❌ Pas de return () => { subscription.remove(); }
    // Les listeners ne sont JAMAIS nettoyés
  }, []);

  const refresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPosts(mockPosts);
      setIsRefreshing(false);
    }, 1000);
  };

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  return { posts, isRefreshing, refresh, likePost };
}

export default useFeed;
