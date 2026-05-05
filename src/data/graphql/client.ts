import { GraphQLClient } from 'graphql-request';

// ✅ Endpoint GraphQL — backend local Yoga (cf. 03-backend-graphql/)
// En prod, externaliser dans une variable d'environnement (Constants.expoConfig.extra)
const ENDPOINT = 'http://localhost:4000/graphql';

export const gqlClient = new GraphQLClient(ENDPOINT, {
  headers: {
    // 'Authorization': `Bearer ${token}`, // si auth requise
  },
});
