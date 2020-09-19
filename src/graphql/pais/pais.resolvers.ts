import { validateRole } from '../../helpers/validate-role';
import { authenticated } from '../../helpers/authenticated.guard';
import Pais from '../../models/pais.model';

const paisResolvers = {
  // Query: {
  //   me: authenticated((root, args, context) => context.currentUser),

  Query: {
    paisesAuth: authenticated(
      validateRole('JUGADOR')(async (obj: any, args: any, context: any, info: any) => await Pais.find())
    ),
    paises: async (obj: any, args: any, context: any, info: any) => await Pais.find(),

    async pais(obj: any, { id }: any, context: any, info: any) {
      return await Pais.findById(id);
    },
  },

  Mutation: {
    async crearPais(obj: any, { pais }: any, context: any, info: any) {
      return await Pais.create(pais);
    },
    async actualizarPais(obj: any, { id, pais }: any, context: any, info: any) {
      return await Pais.findByIdAndUpdate(id, pais, { new: true });
    },

    async borrarPais(obj: any, { id }: any, context: any, info: any) {
      return await Pais.findByIdAndRemove(id);
    },
  },
};

export default paisResolvers;
