import { GraphQLClient } from 'graphql-request';

// 🔲 TODO : Configurer l'URL du backend
export const gqlClient = new GraphQLClient('http://localhost:4000/graphql');
