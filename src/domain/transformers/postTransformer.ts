import { Post } from '../models/Post';

interface GQLPost {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
}

/**
 * Transforme un objet Post provenant de GraphQL en modèle domaine Post.
 */
export function transformGQLPostToPost(gqlPost: GQLPost): Post {
  return {
    id: gqlPost.id,
    title: gqlPost.title,
    excerpt: gqlPost.excerpt,
    body: gqlPost.body,
    createdAt: gqlPost.createdAt,
    author: {
      id: gqlPost.author.id,
      name: gqlPost.author.name,
      avatar: gqlPost.author.avatar,
    },
    tags: gqlPost.tags ?? [],
  };
}

/**
 * Transforme un tableau de posts GraphQL en tableau de posts domaine.
 */
export function transformGQLPostsToPosts(gqlPosts: GQLPost[]): Post[] {
  return gqlPosts.map(transformGQLPostToPost);
}
