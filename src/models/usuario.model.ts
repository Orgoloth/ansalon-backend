import { Schema, Document, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUsuario extends Document {
  nombre: string;
  correo: string;
  clave: string;
  tokens: string[];
}

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email incorrecto'],
  },
  clave: { type: String, required: true },
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
      exp: expiry.getTime() / 1000,
    },
    process.env.JWT_KEY || 'jwt_fallback'
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UsuarioSchema.statics.findByCredentials = async (correo: string, clave: string) => {
  const user = (await model('Usuario').findOne({ correo })) as any;

  if (!user) {
    throw new Error('Credenciales incorrectas (correo)');
  }

  const isClaveMatch = await bcrypt.compare(clave, user.clave);
  if (!isClaveMatch) {
    throw new Error('Credenciales incorrectas (clave)');
  }

  return user;
};

const Usuario = model('Usuario', UsuarioSchema);

export default Usuario;
