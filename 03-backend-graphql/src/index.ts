import { createYoga, createSchema } from 'graphql-yoga';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolvers } from './resolvers';

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf-8');

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  cors: {
    origin: '*',
    credentials: true,
  },
});

const server = createServer(yoga);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Serveur GraphQL prêt sur http://localhost:${PORT}/graphql`);
  console.log(`📝 Playground : http://localhost:${PORT}/graphql`);
});
```Maintenant je dois réécrire le fichier `resolvers.ts` avec `getDb()` importé correctement.
