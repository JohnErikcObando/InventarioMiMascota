const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      // Si hay errores, pasa al siguiente middleware con un error Boom.
      return next(boom.badRequest(error));
    }

    // Si la validación es exitosa, simplemente continúa con el siguiente middleware.
    next();
  };
}

module.exports = validatorHandler;
