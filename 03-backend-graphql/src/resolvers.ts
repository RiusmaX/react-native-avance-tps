import { getDb } from './db';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string;
  authorId: string;
  createdAt: string;
}

export const resolvers = {
  Query: {
    users: (_: any, { limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
      const db = getDb();
      return db.prepare('SELECT * FROM users ORDER BY name LIMIT ? OFFSET ?').all(limit, offset);
    },
    user: (_: any, { id }: { id: string }) => {
      const db = getDb();
      return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    },
    posts: (_: any, { limit = 20, offset = 0, tag }: { limit?: number; offset?: number; tag?: string }) => {
      const db = getDb();
      if (tag) {
        return db
          .prepare("SELECT * FROM posts WHERE tags LIKE ? ORDER BY createdAt DESC LIMIT ? OFFSET ?")
          .all(`%"${tag}"%`, limit, offset);
      }
      return db.prepare('SELECT * FROM posts ORDER BY createdAt DESC LIMIT ? OFFSET ?').all(limit, offset);
    },
    post: (_: any, { id }: { id: string }) => {
      const db = getDb();
      return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    },
  },
  Mutation: {
    createPost: (_: any, { title, body, authorId }: { title: string; body: string; authorId: string }) => {
      const db = getDb();
      const id = `post-${Date.now()}`;
      const excerpt = body.substring(0, 120) + '...';
      const tags = JSON.stringify(['new']);
      db.prepare(
        'INSERT INTO posts (id, title, excerpt, body, tags, authorId) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(id, title, excerpt, body, tags, authorId);
      return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    },
    updatePost: (_: any, { id, title, body }: { id: string; title?: string; body?: string }) => {
      const db = getDb();
      if (title) db.prepare('UPDATE posts SET title = ? WHERE id = ?').run(title, id);
      if (body) {
        const excerpt = body.substring(0, 120) + '...';
        db.prepare('UPDATE posts SET body = ?, excerpt = ? WHERE id = ?').run(body, excerpt, id);
      }
      return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    },
    deletePost: (_: any, { id }: { id: string }) => {
      const db = getDb();
      db.prepare('DELETE FROM posts WHERE id = ?').run(id);
      return true;
    },
  },
  User: {
    posts: (parent: User) => {
      const db = getDb();
      return db.prepare('SELECT * FROM posts WHERE authorId = ? ORDER BY createdAt DESC').all(parent.id);
    },
  },
  Post: {
    author: (parent: Post) => {
      const db = getDb();
      return db.prepare('SELECT * FROM users WHERE id = ?').get(parent.authorId);
    },
    tags: (parent: Post) => {
      return JSON.parse(parent.tags);
    },
  },
};
