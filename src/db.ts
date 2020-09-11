import mongoose from 'mongoose';

const conectar = async () => {
  await mongoose.connect(process.env.DBCON || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Base de datos conectada');
};

export default { conectar };
