import mongoose from 'mongoose';

const conectar = async () => {
  try {
    await mongoose.connect(process.env.DBCON || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada');
  } catch (error) {
    console.error(`Error al conectar a la base de datos: '${error.message}' (${error.code})`);
    console.log('Cerrando servidor...');
    process.exitCode = 1;
    process.kill(process.pid, 'SIGTERM');
  }
};

export default { conectar };
