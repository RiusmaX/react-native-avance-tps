import db from "./db";

interface PostRow {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  author_id: string;
  created_at: string;
  tags: string;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  created_at: string;
}

function mapPost(row: PostRow) {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    excerpt: row.excerpt,
    createdAt: row.created_at,
    authorId: row.author_id,
    tags: row.tags,
  };
}

function mapUser(row: UserRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar: row.avatar,
    createdAt: row.created_at,
  };
}

export const resolvers = {
  Query: {
    posts: (
      _: unknown,
      args: { limit?: number; offset?: number; tag?: string },
    ) => {
      const limit = args.limit ?? 10;
      const offset = args.offset ?? 0;

      let items: PostRow[];
      let total: number;

      if (args.tag) {
        items = db
          .prepare(
            `SELECT * FROM posts WHERE tags LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          )
          .all(`%${args.tag}%`, limit, offset) as PostRow[];

        total = (
          db
            .prepare(`SELECT COUNT(*) as count FROM posts WHERE tags LIKE ?`)
            .get(`%${args.tag}%`) as { count: number }
        ).count;
      } else {
        items = db
          .prepare(
            `SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?`,
          )
          .all(limit, offset) as PostRow[];

        total = (
          db.prepare(`SELECT COUNT(*) as count FROM posts`).get() as {
            count: number;
          }
        ).count;
      }

      return {
        items: items.map(mapPost),
        total,
        hasMore: offset + limit < total,
      };
    },

    post: (_: unknown, args: { id: string }) => {
      const post = db
        .prepare(`SELECT * FROM posts WHERE id = ?`)
        .get(args.id) as PostRow | undefined;
      return post ? mapPost(post) : null;
    },

    users: (_: unknown, args: { limit?: number; offset?: number }) => {
      const limit = args.limit ?? 10;
      const offset = args.offset ?? 0;

      const items = db
        .prepare(`SELECT * FROM users ORDER BY name ASC LIMIT ? OFFSET ?`)
        .all(limit, offset) as UserRow[];

      const total = (
        db.prepare(`SELECT COUNT(*) as count FROM users`).get() as {
          count: number;
        }
      ).count;

      return {
        items: items.map(mapUser),
        total,
        hasMore: offset + limit < total,
      };
    },

    user: (_: unknown, args: { id: string }) => {
      const user = db
        .prepare(`SELECT * FROM users WHERE id = ?`)
        .get(args.id) as UserRow | undefined;
      return user ? mapUser(user) : null;
    },

    userPosts: (
      _: unknown,
      args: { userId: string; limit?: number; offset?: number },
    ) => {
      const limit = args.limit ?? 10;
      const offset = args.offset ?? 0;

      const items = db
        .prepare(
          `SELECT * FROM posts WHERE author_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        )
        .all(args.userId, limit, offset) as PostRow[];

      const total = (
        db
          .prepare(`SELECT COUNT(*) as count FROM posts WHERE author_id = ?`)
          .get(args.userId) as { count: number }
      ).count;

      return {
        items: items.map(mapPost),
        total,
        hasMore: offset + limit < total,
      };
    },
  },

  Mutation: {
    createPost: (
      _: unknown,
      args: { input: { title: string; body: string; authorId: string } },
    ) => {
      const id = `post-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const excerpt =
        args.input.body.substring(0, 150).replace(/\n/g, " ") + "...";
      const tags = generateTags(args.input.title, args.input.body);

      db.prepare(
        `INSERT INTO posts (id, title, body, excerpt, tags, author_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        id,
        args.input.title,
        args.input.body,
        excerpt,
        tags,
        args.input.authorId,
        new Date().toISOString(),
      );

      const row = db
        .prepare(`SELECT * FROM posts WHERE id = ?`)
        .get(id) as PostRow;
      return mapPost(row);
    },

    updatePost: (
      _: unknown,
      args: { id: string; input: { title?: string; body?: string } },
    ) => {
      const existing = db
        .prepare(`SELECT * FROM posts WHERE id = ?`)
        .get(args.id) as PostRow | undefined;

      if (!existing) {
        throw new Error(`Post with id ${args.id} not found`);
      }

      const title = args.input.title ?? existing.title;
      const body = args.input.body ?? existing.body;
      const excerpt = body.substring(0, 150).replace(/\n/g, " ") + "...";

      db.prepare(
        `UPDATE posts SET title = ?, body = ?, excerpt = ? WHERE id = ?`,
      ).run(title, body, excerpt, args.id);

      const row = db
        .prepare(`SELECT * FROM posts WHERE id = ?`)
        .get(args.id) as PostRow;
      return mapPost(row);
    },

    deletePost: (_: unknown, args: { id: string }) => {
      const existing = db
        .prepare(`SELECT * FROM posts WHERE id = ?`)
        .get(args.id) as PostRow | undefined;

      if (!existing) {
        throw new Error(`Post with id ${args.id} not found`);
      }

      db.prepare(`DELETE FROM posts WHERE id = ?`).run(args.id);
      return true;
    },
  },

  Post: {
    author: (parent: { authorId: string }) => {
      const user = db
        .prepare(`SELECT * FROM users WHERE id = ?`)
        .get(parent.authorId) as UserRow | undefined;
      return user ? mapUser(user) : null;
    },
    tags: (parent: { tags: string }) => {
      return JSON.parse(parent.tags) as string[];
    },
  },
};

function generateTags(title: string, body: string): string {
  const allWords = `${title} ${body}`.toLowerCase();
  const candidates = [
    "react",
    "javascript",
    "typescript",
    "node",
    "graphql",
    "expo",
    "mobile",
    "web",
    "api",
    "database",
    "testing",
    "devops",
    "design",
    "tutorial",
    "guide",
    "beginner",
    "advanced",
  ];
  const found = candidates.filter((tag) => allWords.includes(tag));
  const mandatory = ["react", "javascript"];
  const result = [...new Set([...found, ...mandatory])].slice(0, 5);
  return JSON.stringify(result);
}
