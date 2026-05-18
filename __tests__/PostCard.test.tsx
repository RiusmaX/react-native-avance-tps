import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsScreen from '../src/screens/PostsScreen';
import { server } from './setup';
import { graphql, HttpResponse } from 'msw';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe('PostsScreen', () => {
  it('affiche la liste des posts après chargement réussi', async () => {
    renderWithProviders(<PostsScreen />);

    await waitFor(() => {
      expect(screen.getByText('Premier post de test')).toBeTruthy();
    });

    expect(screen.getByText('Second post avec du contenu')).toBeTruthy();
    expect(screen.getByText('Par Alice Dupont')).toBeTruthy();
    expect(screen.getByText('Par Bob Martin')).toBeTruthy();
  });

  it("affiche un message d'erreur si le serveur répond 500", async () => {
    server.use(
      graphql.query('GetPosts', () => {
        return HttpResponse.json(
          { errors: [{ message: 'Internal Server Error' }] },
          { status: 500 }
        );
      })
    );

    renderWithProviders(<PostsScreen />);

    await waitFor(() => {
      expect(screen.getByText('Erreur de chargement')).toBeTruthy();
    });
  });

  it('affiche un indicateur de chargement pendant le fetch', async () => {
    server.use(
      graphql.query('GetPosts', () => {
        return new Promise(() => {});
      })
    );

    renderWithProviders(<PostsScreen />);

    expect(screen.getByText('Chargement des articles...')).toBeTruthy();
  });
});
