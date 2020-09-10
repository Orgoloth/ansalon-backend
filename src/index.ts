import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import db from './db';

import schema from './schema';
import Usuario from './models/usuario.model';

db.conectar();

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

httpServer.listen({ port: process.env.PUERTO || 5301 }, () => {
  console.log(`Escuchando en http://localhost:${process.env.PUERTO || 5301}/graphql`);
});

const newUser = new Usuario({ nombre: 'Prueba1', correo: 'correo@prueba.com', clave: '123' });
newUser.save();
