import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typedefsMap';
import resolvers from './resolversMap';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
