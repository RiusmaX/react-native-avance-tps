import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUserProfile } from '../src/hooks/useUserProfile';

const mockUser = {
  id: '42',
  name: 'Alice Martin',
  email: 'alice@example.com',
  avatar: 'https://example.com/a.jpg',
  bio: 'React Native dev',
  createdAt: '2024-01-15T00:00:00Z',
  status: 'active' as const,
};

const mockPosts = [
  { id: 'p1', title: 'Post 1', excerpt: 'Excerpt 1' },
  { id: 'p2', title: 'Post 2', excerpt: 'Excerpt 2' },
];

// ✅ Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn((url: RequestInfo | URL) => {
    const u = String(url);
    if (u.endsWith('/api/user/42')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      } as Response);
    }
    if (u.endsWith('/api/user/42/posts')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      } as Response);
    }
    return Promise.resolve({ ok: false, status: 404, statusText: 'Not Found' } as Response);
  }) as unknown as typeof fetch;
});

afterEach(() => {
  jest.resetAllMocks();
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client }, children);
};

describe('useUserProfile', () => {
  it("charge le profil et les posts pour un userId valide", async () => {
    const { result } = renderHook(() => useUserProfile('42'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.user).toEqual(mockUser));
    await waitFor(() => expect(result.current.posts).toEqual(mockPosts));
    expect(result.current.error).toBeNull();
  });

  it("ne déclenche pas la query si userId est vide", () => {
    const { result } = renderHook(() => useUserProfile(''), { wrapper });
    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('expose une erreur quand le serveur répond 404', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useUserProfile('999'), { wrapper });

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.user).toBeUndefined();
  });
});
