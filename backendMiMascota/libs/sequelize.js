const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

// console.log(process.env.NODE_ENV)
// console.log(config.isProd)
// if (config.isProd == true)
// {
//   console.log("Estamos activoS!!")
// }
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `postgres://mimascota:tr3qQ45bU8bs0jT34l2DyLEn6fvozWZ4@dpg-cn0m0vla73kc73ebvop0-a.oregon-postgres.render.com/mimascotadb`;

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
