const express = require('express');
const RolUsuarioService = require('../services/rolUsuario.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateRolUsuarioSchema,
  UpdateRolUsuarioSchema,
  GetRolUsuarioSchema,
} = require('./../schemas/rolUsuario.schema');

const router = express.Router();
const service = new RolUsuarioService();

router.get('/', async (req, res, next) => {
  try {
    const rolesUsuario = await service.find();
    res.json(rolesUsuario);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetRolUsuarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rolUsuario = await service.findOne(id);
      res.json(rolUsuario);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateRolUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRolUsuario = await service.create(body);
      res.status(201).json(newRolUsuario);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetRolUsuarioSchema, 'params'),
  validatorHandler(UpdateRolUsuarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const rolUsuario = await service.update(id, body);
      res.json(rolUsuario);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetRolUsuarioSchema, 'params'),
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

// Middleware de manejo de errores a
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
