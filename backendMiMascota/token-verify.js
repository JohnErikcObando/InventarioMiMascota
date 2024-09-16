const jwt = require('jsonwebtoken');

const secret = 'M1m45c0t4';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbCI6ImFkbWluIiwiaWF0IjoxNzI1MDYwMzQ2fQ.JGcrxLpmEdMNTi2-emX66ZFq4ugJ_LDRVeIelR7sIZk';

function verifyToken(payload, secret) {
  return jwt.verify(payload, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
