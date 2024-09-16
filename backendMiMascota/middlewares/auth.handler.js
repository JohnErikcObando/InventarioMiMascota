const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apikey = req.headers['api'];
  if (apikey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  console.log('user', user, 'user.role', user.rol);

  if (user.rol === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log('user', user, 'user.role', user.rol);

    if (roles.includes(user.rol)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
