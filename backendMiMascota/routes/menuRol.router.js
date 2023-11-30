const express = require('express');
const MenuRolService = require('../services/menuRol.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateMenuRolSchema,
  UpdateMenuRolSchema,
  GetMenuRolSchema,
} = require('../Schemas/menuRol.schema');

const router = express.Router();
const service = new MenuRolService();

router.get('/', async (req, res, next) => {
  try {
    const menuRoles = await service.find();
    res.json(menuRoles);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetMenuRolSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const menuRol = await service.findOne(id);
      res.json(menuRol);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateMenuRolSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMenuRol = await service.create(body);
      res.status(201).json(newMenuRol);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetMenuRolSchema, 'params'),
  validatorHandler(UpdateMenuRolSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const menuRol = await service.update(id, body);
      res.json(menuRol);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetMenuRolSchema, 'params'),
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
