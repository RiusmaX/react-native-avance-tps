import { Platform } from 'react-native';
import { GraphQLClient } from 'graphql-request';

// ✅ Endpoint GraphQL — backend local Yoga (cf. 03-backend-graphql/)
// Sur Android Emulator, `localhost` pointe vers l'émulateur lui-même.
// Il faut utiliser 10.0.2.2 pour atteindre la machine hôte.
// En prod, externaliser dans une variable d'environnement (Constants.expoConfig.extra).
const HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const ENDPOINT = `http://${HOST}:4000/graphql`;

export const gqlClient = new GraphQLClient(ENDPOINT, {
  headers: {
    // 'Authorization': `Bearer ${token}`, // si auth requise
  },
});
