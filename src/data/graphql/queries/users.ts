import { gql } from 'graphql-request';

// ✅ Fragment User
export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    email
    avatar
    createdAt
  }
`;

// ✅ Liste paginée d'utilisateurs
export const GET_USERS = gql`
  ${USER_FIELDS}
  query Users($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      items {
        ...UserFields
      }
      total
      hasMore
    }
  }
`;

// ✅ Utilisateur par id
export const GET_USER = gql`
  ${USER_FIELDS}
  query User($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
`;

// ✅ Posts d'un utilisateur, paginés
export const GET_USER_POSTS = gql`
  query UserPosts($userId: ID!, $limit: Int, $offset: Int) {
    userPosts(userId: $userId, limit: $limit, offset: $offset) {
      items {
        id
        title
        excerpt
        createdAt
        tags
      }
      total
      hasMore
    }
  }
`;
