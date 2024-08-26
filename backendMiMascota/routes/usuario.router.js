const express = require('express');
const UsuarioService = require('../services/usuario.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateUsuarioSchema,
  UpdateUsuarioSchema,
  GetUsuarioSchema,
  UpdateUsuarioModifSchema,
} = require('../schemas/usuario.schema');

const router = express.Router();
const service = new UsuarioService();

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await service.find();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.get('/byUsuario', async (req, res, next) => {
  try {
    const { usuario } = req.query;

    if (!usuario) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "usuario" requerido' });
    }

    const usuarios = await service.findByUsername(usuario);
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetUsuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuario = await service.findOne(id);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },
);


router.post(
  '/',
  validatorHandler(CreateUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await service.create(body);
      res.status(201).json(newUsuario);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetUsuarioSchema, 'params'),
  validatorHandler(UpdateUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const usuario = await service.update(id, body);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetUsuarioSchema, 'params'),
  validatorHandler(UpdateUsuarioModifSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const usuario = await service.update(id, body);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetUsuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);


router.post('/login', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    const validatedUser = await service.validateUser(usuario, password);
    res.status(200).json({ message: 'Login successful', user: validatedUser });
  } catch (error) {
    next(error);
  }
});



// Middleware de manejo de errores
router.use((err, req, res, next) => {
  console.error(err);

  if (!err.isBoom) {
    // Si el error no es de tipo Boom, crea un Boom error interno
    err = boom.internal(err.message || 'Internal Server Error');
  }

  res.status(err.output.statusCode).json(err.output.payload);
  next(); // Pasa el control al siguiente middleware
});

module.exports = router;
