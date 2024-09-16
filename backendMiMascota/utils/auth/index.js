const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwstStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JwstStrategy);
