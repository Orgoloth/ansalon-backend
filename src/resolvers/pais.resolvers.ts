import Pais, { IPais } from './../models/pais.model';

const paisResolvers = {
  Query: {
    async paises(_obj: any, _args: any, _context: any, _info: any) {
      return await Pais.find();
    },
  },
};

export default paisResolvers;

// extend type Query {
//   paises: [String!]!
//   pais(id: ID!): Pais!
// }

// extend type Mutation{
//   crearPais(pais: PaisInput!): Pais!
// }
