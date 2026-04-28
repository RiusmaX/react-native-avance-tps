import { setupServer } from 'msw/native';
import { graphql, HttpResponse } from 'msw';

// 🔲 TODO : Compléter les handlers MSW
// Pour le moment, les handlers retournent des données vides.
// À remplir par le participant pendant le TP.

export const server = setupServer(
  // Handler pour la requête GetPosts
  graphql.query('GetPosts', () => {
    // 🔲 TODO : retourner des posts de test
    // Exemple :
    // return HttpResponse.json({
    //   data: {
    //     posts: [
    //       { id: '1', title: 'Post de test', excerpt: 'Contenu...', author: { name: 'Alice' }, tags: ['test'] },
    //     ],
    //   },
    // });
    return HttpResponse.json({ data: { posts: [] } });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
