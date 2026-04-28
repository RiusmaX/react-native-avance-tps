import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { GET_POST } from '../graphql/queries/posts';
import { transformGQLPostToPost } from '../../domain/transformers/postTransformer';
import { Post } from '../../domain/models/Post';

// 🔲 TODO : Implémenter le hook usePost
// - useQuery pour récupérer un post par son id
// - Transformer la réponse GraphQL vers le modèle Post
// - Gérer les états loading / error

export function usePost(id: string) {
  return useQuery<Post>({
    queryKey: ['post', id],
    queryFn: async () => {
      const data = await gqlClient.request(GET_POST, { id });
      return transformGQLPostToPost(data.post);
    },
    enabled: !!id,
  });
}
