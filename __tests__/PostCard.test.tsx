import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsScreen from '../src/screens/PostsScreen';
import { server } from './setup';
import { graphql, HttpResponse } from 'msw';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

// 🔲 TODO : Écrire les tests
// Le participant doit implémenter ces tests pendant le TP.

describe('PostsScreen', () => {
  // 🔲 TODO : Test 1 - la liste des posts s'affiche après chargement
  it('affiche la liste des posts après chargement réussi', async () => {
    // 1. Configurer le handler MSW pour retourner des données de test
    // 2. Rendre PostsScreen dans un QueryClientProvider
    // 3. Attendre que les posts apparaissent
    // 4. Vérifier qu'un titre de post est visible
  });

  // 🔲 TODO : Test 2 - message d'erreur si le serveur répond 500
  it("affiche un message d'erreur si le serveur répond 500", async () => {
    // 1. Surcharger le handler MSW pour retourner une erreur
    server.use(
      graphql.query('GetPosts', () => {
        return HttpResponse.json({
          errors: [{ message: 'Internal Server Error' }],
        });
      })
    );
    // 2. Vérifier que le message d'erreur est affiché
  });

  // 🔲 TODO : Bonus - skeleton ou indicateur de chargement
  it('affiche un indicateur pendant le chargement', async () => {
    // 1. Retarder la réponse MSW pour voir l'état de chargement
    // 2. Vérifier que l'ActivityIndicator est présent
  });
});
