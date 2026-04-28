import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '../graphql/client';
import { CREATE_POST } from '../graphql/queries/posts';
import { CreatePostInput, Post } from '../../domain/models/Post';

// 🔲 TODO : Implémenter le hook useCreatePost
// - Utiliser useMutation avec CREATE_POST
// - Invalider la query 'posts' après succès
// - Typer correctement les variables et le retour

interface CreatePostResponse {
  createPost: Post;
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: async (input: CreatePostInput) => {
      const data = await gqlClient.request<CreatePostResponse>(CREATE_POST, {
        input,
      });
      return data.createPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
