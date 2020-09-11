import { Schema, Document, model } from 'mongoose';

export interface IPais extends Document {
  nombre: string;
  descripcion: string;
}

const PaisSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
});

const Pais = model('Pais', PaisSchema, 'paises');

export default Pais;
