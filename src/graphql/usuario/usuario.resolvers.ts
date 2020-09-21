import { IUsuario } from './../../models/usuario.model';
import Usuario from '../../models/usuario.model';
import { authenticated } from '../../helpers/authenticated.guard';
import { validateRole } from '../../helpers/validate-role';

const usuarioResolvers = {
  Query: {
    async usuarios(obj: any, args: any, context: any, info: any) {
      return await Usuario.find();
    },
    async usuario(obj: any, { id }: any, context: any, info: any) {
      return await Usuario.findById(id);
    },
  },

  Mutation: {
    crearUsuario: async (obj: any, { usuario }: any, context: any, info: any) => {
      const nuevoUsuario = (await Usuario.create(usuario)) as IUsuario;
      await nuevoUsuario.generateAuthToken();
      return nuevoUsuario;
    },

    actualizarUsuario: authenticated(
      async (obj: any, { id, usuario }: any, context: any, info: any) =>
        await Usuario.findByIdAndUpdate(id, usuario, { new: true })
    ),

    borrarUsuario: authenticated(
      async (obj: any, { id }: any, context: any, info: any) => await Usuario.findByIdAndRemove(id)
    ),

    registrar: async (obj: any, { usuario }: any, context: any, info: any) => {
      try {
        const nuevoUsuario = (await Usuario.create(usuario)) as IUsuario;
        return await nuevoUsuario.generateAuthToken();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    entrar: async (obj: any, { correo, clave }: any, context: any, info: any) => {
      try {
        const nuevoUsuario = (await Usuario.schema.statics.findByCredentials(correo, clave)) as IUsuario;
        return await nuevoUsuario.generateAuthToken();
      } catch (error) {
        throw new Error(error);
      }
    },

    salirTodo: authenticated(async (obj: any, args: any, context: any, info: any) => {
      try {
        const currentUser = context.currentUser as IUsuario;
        currentUser.tokens = [];
        await currentUser.save();
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  },
};

export default usuarioResolvers;
