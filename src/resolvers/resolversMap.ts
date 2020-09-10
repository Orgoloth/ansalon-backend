import { merge } from 'lodash';

import usuarioResolvers from './usuario.resolvers';
import paisResolvers from './pais.resolvers';

// Resolvers
const resolvers = merge(
  usuarioResolvers,
  paisResolvers,
)

export default resolvers;
