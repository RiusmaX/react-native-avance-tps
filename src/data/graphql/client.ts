import { GraphQLClient } from 'graphql-request';

const API_URL = process.env.EXPO_PUBLIC_GRAPHQL_API_URL || 'http://localhost:4000/graphql';

export const gqlClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
