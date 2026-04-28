import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { readFileSync } from 'fs';
import { join } from 'path';
import { resolvers } from './resolvers';

const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf-8');

const yoga = createYoga({
  schema: {
    typeDefs,
    resolvers,
  },
  graphiql: true,
});

const server = createServer(yoga);

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`🚀 Serveur GraphQL démarré sur http://localhost:${PORT}/graphql`);
  console.log(`📖 GraphiQL : http://localhost:${PORT}/graphql`);
});
