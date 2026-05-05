import { gql } from 'graphql-request';

// ✅ Fragment réutilisable
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    excerpt
    body
    createdAt
    tags
    author {
      id
      name
      avatar
    }
  }
`;

// ✅ Liste paginée — variables limit / offset / tag
export const GET_POSTS = gql`
  ${POST_FIELDS}
  query Posts($limit: Int, $offset: Int, $tag: String) {
    posts(limit: $limit, offset: $offset, tag: $tag) {
      items {
        ...PostFields
      }
      total
      hasMore
    }
  }
`;

// ✅ Post unique
export const GET_POST = gql`
  ${POST_FIELDS}
  query Post($id: ID!) {
    post(id: $id) {
      ...PostFields
    }
  }
`;

// ✅ Mutation création
export const CREATE_POST = gql`
  ${POST_FIELDS}
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
`;

// ✅ Mutation mise à jour
export const UPDATE_POST = gql`
  ${POST_FIELDS}
  mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      ...PostFields
    }
  }
`;

// ✅ Mutation suppression
export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
