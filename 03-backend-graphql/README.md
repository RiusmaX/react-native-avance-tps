# TP-03 : Backend GraphQL (Yoga + SQLite)

Backend GraphQL partagé pour les TPs avancés React Native.

## Stack

- **Runtime** : Node.js 20+
- **Serveur** : [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server) (v5)
- **Base de données** : SQLite via `better-sqlite3`
- **Schema** : GraphQL SDL (schema-first)

## Installation

```bash
cd 03-backend-graphql
npm install
```

## Seed la base de données

```bash
npm run seed
```

Génère 500 utilisateurs et 5000 articles.

## Démarrer le serveur

```bash
npm run dev
```

Le serveur tourne sur `http://localhost:4000/graphql`.

## Schéma

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  avatar: String
  posts(limit: Int, offset: Int): PostConnection!
}

type Post {
  id: ID!
  title: String!
  excerpt: String!
  body: String!
  createdAt: String!
  author: User!
  tags: [String!]!
}

type PostConnection {
  items: [Post!]!
  total: Int!
  hasMore: Boolean!
}

type Query {
  posts(limit: Int, offset: Int, tag: String): PostConnection!
  post(id: ID!): Post
  users(limit: Int, offset: Int): UserConnection!
  user(id: ID!): User
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
  updatePost(id: ID!, input: UpdatePostInput!): Post!
  deletePost(id: ID!): Boolean!
}
```

## Endpoints

| Query | Description |
|-------|-------------|
| `posts(limit, offset, tag)` | Posts paginés, filtre par tag optionnel |
| `post(id)` | Post par ID |
| `users(limit, offset)` | Utilisateurs paginés |
| `user(id)` | Utilisateur par ID |

| Mutation | Description |
|----------|-------------|
| `createPost(input)` | Créer un article |
| `updatePost(id, input)` | Modifier un article |
| `deletePost(id)` | Supprimer un article |