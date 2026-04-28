import { setupServer } from 'msw/native';
import { graphql, HttpResponse } from 'msw';

const mockPosts = [
  {
    id: '1',
    title: 'Premier post de test',
    excerpt: 'Ceci est un extrait de test pour vérifier le bon fonctionnement de MSW.',
    body: 'Contenu complet du post de test.',
    createdAt: '2025-05-01T10:00:00Z',
    author: { id: 'u1', name: 'Alice Dupont', avatar: null },
    tags: ['react', 'testing'],
  },
  {
    id: '2',
    title: 'Second post avec du contenu',
    excerpt: 'Encore un extrait pour valider le rendu de la liste.',
    body: 'Contenu du second post.',
    createdAt: '2025-05-02T14:30:00Z',
    author: { id: 'u2', name: 'Bob Martin', avatar: null },
    tags: ['javascript', 'msw'],
  },
];

export const server = setupServer(
  graphql.query('GetPosts', () => {
    return HttpResponse.json({
      data: { posts: mockPosts },
    });
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
