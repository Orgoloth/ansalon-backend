import { Schema, Document, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUsuario extends Document {
  nombre: string;
  correo: string;
  clave: string;
  roles: string[];
  tokens: string[];
  generateAuthToken(): Promise<string>;
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email incorrecto'],
  },
  clave: { type: String, required: true },
  roles: [{ type: String }],
  tokens: [{ type: String }],
});

UsuarioSchema.pre<IUsuario>('save', async function (next) {
  const user = this;
  if (user.isModified('clave')) {
    user.clave = await bcrypt.hash(user.clave, 8);
  }
  next();
});

UsuarioSchema.methods.generateAuthToken = async function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  const user = this;
  const token = jwt.sign(
    {
      _id: this._id,
      correo: this.correo,
      nombre: this.nombre,
      roles: this.roles,
      exp: expiry.getTime() / 1000,
    },
    process.env.JWT_KEY || 'jwt_fallback'
  );
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

UsuarioSchema.statics.findByCredentials = async (correo: string, clave: string) => {
  const user = (await model('Usuario').findOne({ correo })) as any;

  if (!user) {
    throw new Error('Credenciales incorrectas (DEBUG: correo)');
  }

  const isClaveMatch = await bcrypt.compare(clave, user.clave);
  if (!isClaveMatch) {
    throw new Error('Credenciales incorrectas (DEBUG: clave)');
  }

  return user;
};

UsuarioSchema.statics.findByToken = async (token: string) => {
  const payload: any = jwt.decode(token);
  const usuario = (await model('Usuario').findById(payload._id)) as IUsuario;
  if (usuario.tokens.includes(token)) {
    return usuario;
  }
};

const Usuario = model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
