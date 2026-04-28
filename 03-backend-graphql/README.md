# Backend GraphQL partagé — TPs 03, 04, 06

Backend GraphQL minimal avec Yoga + SQLite pour les TPs de la formation React Native Avancé.

## Installation

```bash
cd 03-backend-graphql
npm install
```

## Seed (génération des données)

```bash
npm run seed
```

Crée 500 utilisateurs et 5000 articles dans une base SQLite locale.

## Démarrage

```bash
npm start
```

Serveur accessible sur http://localhost:4000/graphql
Interface GraphiQL : http://localhost:4000/graphql

## Schéma

```graphql
type User { id: ID!, name: String!, email: String!, avatar: String, posts: [Post!]! }
type Post { id: ID!, title: String!, excerpt: String!, body: String!, createdAt: String!, author: User!, tags: [String!]! }
type Query { users(limit: Int, offset: Int): [User!]!, user(id: ID!): User, posts(limit: Int, offset: Int, tag: String): [Post!]!, post(id: ID!): Post }
type Mutation { createPost(title: String!, body: String!, authorId: ID!): Post!, updatePost(id: ID!, title: String, body: String): Post!, deletePost(id: ID!): Boolean! }
```
