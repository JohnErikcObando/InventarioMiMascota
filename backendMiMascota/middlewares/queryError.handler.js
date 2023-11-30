const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

function queryValidatorHandler() {
  return async (req, res, next) => {
    const data = req.body;
    const usuario = await models.Usuario.findOne({ where: { email: data.email } });

    if (usuario) {
      return next(boom.conflict('El usuairo ya existe'));
    }
    next()
  }
}

module.exports = queryValidatorHandler;
