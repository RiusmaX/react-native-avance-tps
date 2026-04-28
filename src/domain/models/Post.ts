export interface Post {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; avatar?: string };
  tags: string[];
}

export interface CreatePostInput {
  title: string;
  body: string;
  authorId: string;
}

export interface UpdatePostInput {
  id: string;
  title?: string;
  body?: string;
}
