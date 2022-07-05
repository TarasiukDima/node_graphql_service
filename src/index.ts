import "dotenv/config";
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql';
import { resolvers } from './resolvers';

const PORT = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  const server = new ApolloServer({
    typeDefs: await typeDefs(),
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        return { token: token };
      }
    },
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
