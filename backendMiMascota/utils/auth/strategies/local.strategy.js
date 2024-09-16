const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/usuario.service');
const service = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: 'usuario',
    passwordField: 'password',
  },
  async (usuario, password, done) => {
    try {
      console.log('usuario', usuario, 'password', password);

      const user = await service.findByUsername(usuario);
      if (!user) {
        done(boom.unauthorized(), false);
      }

      console.log('user', user);


      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStrategy;
