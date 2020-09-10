import 'graphql-import-node';

import baseTypeDefs from './schema.graphql';
import usuarioTypeDefs from './usuario.graphql';
import paisTypeDefs from './pais.graphql';

const typeDefs = [baseTypeDefs, usuarioTypeDefs, paisTypeDefs];

export default typeDefs;
