import { merge } from 'lodash';

import usuarioResolvers from './usuario/usuario.resolvers';
import paisResolvers from './pais/pais.resolvers';

// Resolvers
const resolvers = merge(
  usuarioResolvers,
  paisResolvers,
)

export default resolvers;
