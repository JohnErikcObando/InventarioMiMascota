const jwt = require('jsonwebtoken');

const secret = 'mascota';
const payload = {
  sub: 1,
  rol: 'admin',
};

function singToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = singToken(payload, secret);

console.log(token);
