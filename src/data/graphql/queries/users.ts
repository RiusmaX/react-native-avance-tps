import { gql } from 'graphql-request';

// 🔲 TODO : Écrire les requêtes GraphQL pour les utilisateurs
// - GET_USERS : liste d'utilisateurs avec pagination
// - GET_USER : utilisateur par id
// - GET_USER_POSTS : posts d'un utilisateur

export const GET_USERS = gql`
  # TODO: query users avec pagination (limit, offset)
`;

export const GET_USER = gql`
  # TODO: query user par id
`;

export const GET_USER_POSTS = gql`
  # TODO: query posts d'un utilisateur avec pagination
`;
