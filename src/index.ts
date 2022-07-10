import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import depthLimit from 'graphql-depth-limit';
import { typeDefs } from './graphql';
import { resolvers } from './resolvers';
import { services } from './services';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs: await typeDefs(),
    resolvers,
    validationRules: [depthLimit(5)],
    context: async ({ req }) => ({ token: req.headers.authorization || '' }),
    dataSources: () => ({ ...services }),
  });

  server
    .listen({
      port: PORT,
    })
    .then(({ url }) => {
      console.log(`
        🔉  Listening on port ${PORT}
        🚀  Server ready at ${url}/graphql
      `);
    })
    .catch((err) => {
      console.error(err);
    });
};

startServer();
