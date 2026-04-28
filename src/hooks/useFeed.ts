// ✅ FIX 4 : Subscription nettoyee -> plus de fuite memoire
import { useState, useEffect } from 'react';

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

function generateMockPosts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `Article ${i + 1} - Lorem ipsum dolor sit amet consectetur`,
    excerpt: `Extrait de l'article ${i + 1}... Decouvrez les dernieres actualites.`,
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
    const sub1 = EventEmitter.addListener('newPost', (newPost: any) => {
      setPosts((prev) => [newPost, ...prev]);
    });
    const sub2 = EventEmitter.addListener('postUpdated', (updatedPost: any) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    });
    return () => {
      sub1.remove();
      sub2.remove();
    };
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
