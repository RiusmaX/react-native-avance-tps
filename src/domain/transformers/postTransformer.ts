import { Post } from '../models/Post';

// 🔲 TODO : Implémenter le transformateur Post
// - Transformer la réponse GraphQL vers le modèle métier Post
// - Gérer les champs manquants / valeurs par défaut
// - Normaliser les tags (tableau de strings)

export function transformGQLPostToPost(gqlPost: any): Post {
  throw new Error('TODO : implémenter transformGQLPostToPost');
}

export function transformGQLPostsToPosts(gqlPosts: any[]): Post[] {
  throw new Error('TODO : implémenter transformGQLPostsToPosts');
}
