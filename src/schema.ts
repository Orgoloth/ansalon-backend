import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typedefs/typedefsMap';
import resolvers from './resolvers/resolversMap';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
