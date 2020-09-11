import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import db from './db';

import schema from './schema';
import Usuario from './models/usuario.model';

const app = express();

// Middlewares
app.use(cors());
app.use(compression());

const server = new ApolloServer({
  schema,
  introspection: true,
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
httpServer
  .listen({ port: process.env.PUERTO || 5301 })
  .on('listening', async () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PUERTO || 5301}/graphql`);
    try {
      await db.conectar();
    } catch (error) {
      httpServer.close(() => console.log(`Cerrando servidor por error al conectar la base de datos: (${error.message})`));
    }
  })
  .on('error', (error) => console.log(`Error al iniciar el servidor: (${error.message})`));

