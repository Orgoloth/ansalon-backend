import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true,
    unique: true,
    lowercase: true,
    validate: value => {
        if (!validator.isEmail(value)) {
            throw new Error({ error: 'La direccion de email no es valida' })
        }
    } },
  clave: { type: String, required: true },
  tokens: [{ type: String }],
});

UsuarioSchema.pre('save', async function (next) {
  const user = this as any;
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
  const user = (await mongoose.model('Usuario').findOne({ correo })) as any;

  if (!user) {
    throw new Error('Credenciales incorrectas (correo)');
  }

  const isClaveMatch = await bcrypt.compare(clave, user.clave);
  if (!isClaveMatch) {
    throw new Error('Credenciales incorrectas (clave)');
  }

  return user;
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;
