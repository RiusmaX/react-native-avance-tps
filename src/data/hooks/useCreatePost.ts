import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { CREATE_POST } from '../graphql/queries/posts';
import { CreatePostInput, Post } from '../../domain/models/Post';
import { transformGQLPostToPost } from '../../domain/transformers/postTransformer';

interface CreatePostResponse {
  createPost: unknown;
}

interface PreviousPostsContext {
  previous?: unknown;
}

/**
 * ✅ Mutation de création + invalidation du cache.
 *
 * Trois variantes possibles :
 *
 *   1. Simple : invalidateQueries après onSuccess (implémenté ici)
 *   2. Optimistic update : ajoute le post au cache AVANT la réponse serveur
 *      → meilleure UX mais code plus complexe (cf. bonus en bas du fichier)
 *   3. setQueryData manuel : insère directement le post retourné dans la 1ʳᵉ page
 *      → évite le refetch mais doit gérer la cohérence
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostInput, PreviousPostsContext>({
    mutationFn: async (input) => {
      const data = await gqlClient.request<CreatePostResponse>(CREATE_POST, {
        input,
      });
      return transformGQLPostToPost(data.createPost);
    },

    // 🏆 BONUS — Optimistic update
    onMutate: async (input) => {
      // 1. Annuler les refetch en cours pour éviter qu'ils écrasent notre maj
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // 2. Snapshot du cache courant pour rollback en cas d'erreur
      const previous = queryClient.getQueryData(['posts', { tag: undefined }]);

      // 3. Insérer un post optimiste dans le cache
      const optimisticPost: Post = {
        id: `tmp-${Date.now()}`,
        title: input.title,
        excerpt: input.body.slice(0, 120),
        body: input.body,
        createdAt: new Date().toISOString(),
        tags: [],
        author: { id: input.authorId, name: 'Vous', avatar: undefined },
      };

      queryClient.setQueryData(
        ['posts', { tag: undefined }],
        (old: any) => {
          if (!old?.pages?.length) return old;
          const newPages = [...old.pages];
          const firstPage = newPages[0];
          newPages[0] = {
            ...firstPage,
            posts: {
              ...firstPage.posts,
              items: [optimisticPost, ...firstPage.posts.items],
              total: firstPage.posts.total + 1,
            },
          };
          return { ...old, pages: newPages };
        }
      );

      return { previous };
    },

    onError: (_err, _input, context) => {
      // Rollback
      if (context?.previous !== undefined) {
        queryClient.setQueryData(['posts', { tag: undefined }], context.previous);
      }
    },

    onSettled: () => {
      // Refetch pour s'aligner sur le serveur (gère succès et erreur)
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
