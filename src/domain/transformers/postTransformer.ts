import { Post } from '../models/Post';

/**
 * ✅ Transforme un post brut GraphQL en modèle métier Post.
 * Sépare le schéma de la couche de présentation pour limiter l'impact
 * des évolutions du schéma GraphQL.
 */
export function transformGQLPostToPost(gqlPost: unknown): Post {
  if (!gqlPost || typeof gqlPost !== 'object') {
    throw new Error('Post GraphQL invalide');
  }

  const raw = gqlPost as Record<string, unknown>;
  const author = (raw.author ?? {}) as Record<string, unknown>;

  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    excerpt: String(raw.excerpt ?? ''),
    body: String(raw.body ?? ''),
    createdAt: String(raw.createdAt ?? ''),
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    author: {
      id: String(author.id ?? ''),
      name: String(author.name ?? 'Anonyme'),
      avatar: typeof author.avatar === 'string' ? author.avatar : undefined,
    },
  };
}

/**
 * ✅ Transforme un tableau de posts GraphQL en modèles métier.
 * Filtre les éléments invalides (résilience aux erreurs serveur partielles).
 */
export function transformGQLPostsToPosts(gqlPosts: unknown[]): Post[] {
  if (!Array.isArray(gqlPosts)) return [];
  return gqlPosts.flatMap((p) => {
    try {
      return [transformGQLPostToPost(p)];
    } catch {
      return [];
    }
  });
}
