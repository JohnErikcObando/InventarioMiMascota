const express = require('express');
const MenuService = require('../services/menu.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateMenuSchema,
  UpdateMenuSchema,
  GetMenuSchema,
} = require('../schemas/menu.schema');

const router = express.Router();
const service = new MenuService();

router.get('/', async (req, res, next) => {
  try {
    const menus = await service.find();
    res.json(menus);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetMenuSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const menu = await service.findOne(id);
      res.json(menu);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateMenuSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMenu = await service.create(body);
      res.status(201).json(newMenu);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetMenuSchema, 'params'),
  validatorHandler(UpdateMenuSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const menu = await service.update(id, body);
      res.json(menu);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetMenuSchema, 'params'),
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
