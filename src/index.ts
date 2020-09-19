import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import db from './db';
import schema from './graphql/schema';
import { context } from './graphql/context';

const app = express();
const server = new ApolloServer({
  schema,
  introspection: true,
  context,
});

// Middlewares
app.use(cors());
app.use(compression());
server.applyMiddleware({ app });

const httpServer = createServer(app);
httpServer
  .listen({ port: process.env.PUERTO || 5301 })
  .on('listening', async () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PUERTO || 5301}${server.graphqlPath}`);
    try {
      await db.conectar();
    } catch (error) {
      httpServer.close(() =>
        console.log(`Cerrando servidor por error al conectar la base de datos: (${error.message})`)
      );
    }
  })
  .on('error', (error) => console.log(`Error al iniciar el servidor: (${error.message})`));
