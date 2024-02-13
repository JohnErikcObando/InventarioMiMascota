const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize); //Recibe la conexion

//Crear sincronizacion
// Evitar sincronización automática en producción
if (process.env.NODE_ENV !== 'production') {
  sequelize
    .sync()
    .then(() => {
      console.log('Sincronización de modelos completa.');
      console.log('BD', URI);
    })
    .catch((error) => {
      console.error('Error en la sincronización de modelos:', error);
    });
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });

module.exports = sequelize;
