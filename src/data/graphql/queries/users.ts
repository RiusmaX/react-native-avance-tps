import { gql } from 'graphql-request';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      avatar
      bio
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      bio
    }
  }
`;
