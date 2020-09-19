import 'graphql-import-node';

import baseTypeDefs from './base.graphql';
import usuarioTypeDefs from './usuario/usuario.graphql';
import paisTypeDefs from './pais/pais.graphql';

const typeDefs = [baseTypeDefs, usuarioTypeDefs, paisTypeDefs];

export default typeDefs;
