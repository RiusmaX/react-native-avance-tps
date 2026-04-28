import { gql } from 'graphql-request';

// 🔲 TODO : Écrire les requêtes GraphQL
// - GET_POSTS : posts avec pagination (limit, offset, tag)
// - GET_POST : post par id
// - CREATE_POST : mutation createPost
// - UPDATE_POST : mutation updatePost
// - DELETE_POST : mutation deletePost

export const GET_POSTS = gql`
  # TODO: query Posts($limit: Int, $offset: Int, $tag: String) { ... }
`;

export const GET_POST = gql`
  # TODO: query Post($id: ID!) { ... }
`;

export const CREATE_POST = gql`
  # TODO: mutation CreatePost($input: CreatePostInput!) { ... }
`;

export const UPDATE_POST = gql`
  # TODO: mutation UpdatePost($id: ID!, $input: UpdatePostInput!) { ... }
`;

export const DELETE_POST = gql`
  # TODO: mutation DeletePost($id: ID!) { ... }
`;
