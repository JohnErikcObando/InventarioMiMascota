const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

const router = express.Router();

// router.post(
//   '/login',
//   passport.authenticate('local', { session: false }),
//   async (req, res, next) => {
//     try {
//       const user = req.user;
//       const payload = {
//         sub: user.id,
//         rol: user.rol_usuario.nombre,
//       };

//       console.log('rol', user.rol_usuario.nombre);

//       const token = jwt.sign(payload, config.jwtSecret);

//       // Envía la respuesta con el usuario y el token en un solo objeto
//       res.json({
//         user,
//         token,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// );

// Mock storage for refresh tokens (replace this with database logic)
let refreshTokens = [];

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        rol: user.rol_usuario.nombre,
      };

      // Generate access token
      const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '600m' });

      // Generate refresh token
      const refreshToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });

      // Store the refresh token in an array (or database)
      refreshTokens.push(refreshToken);

      res.json({
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token required' });
  }

  // Check if refresh token is valid and exists
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, config.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    // Generate a new access token
    const newAccessToken = jwt.sign({ sub: user.sub, rol: user.rol }, config.jwtSecret, {
      expiresIn: '600m',
    });

    res.json({
      accessToken: newAccessToken,
    });
  });
});


router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;

  // Remove the refresh token from the array (or database)
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);

  res.status(204).send();
});

module.exports = router;
