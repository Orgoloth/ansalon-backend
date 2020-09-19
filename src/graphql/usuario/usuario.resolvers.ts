import { IUsuario } from './../../models/usuario.model';
import Usuario from '../../models/usuario.model';

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
    async crearUsuario(obj: any, { usuario }: any, context: any, info: any) {
      const nuevoUsuario = (await Usuario.create(usuario)) as IUsuario;
      await nuevoUsuario.generateAuthToken();
      return nuevoUsuario;
    },
    async actualizarUsuario(obj: any, { id, usuario }: any, context: any, info: any) {
      return await Usuario.findByIdAndUpdate(id, usuario, { new: true });
    },

    async borrarUsuario(obj: any, { id }: any, context: any, info: any) {
      return await Usuario.findByIdAndRemove(id);
    },
  },
};

export default usuarioResolvers;
