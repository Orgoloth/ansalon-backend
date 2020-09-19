import Usuario, { IUsuario } from '../models/usuario.model';

export async function tradeTokenForUser(token: string): Promise<IUsuario> {
  return new Promise<IUsuario>((resolve, reject) => {

    const usuario = Usuario.schema.statics.findByToken(token);

    resolve(usuario);
  });
}
