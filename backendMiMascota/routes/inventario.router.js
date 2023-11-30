const express = require('express');
const InventarioService = require('../services/inventario.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateInventarioSchema,
  UpdateInventarioSchema,
  GetInventarioSchema,
} = require('../Schemas/inventario.schema');

const router = express.Router();
const service = new InventarioService();

router.get('/', async (req, res, next) => {
  try {
    const impuestos = await service.find();
    res.json(impuestos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetInventarioSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const impuesto = await service.findOne(id);
      res.json(impuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateInventarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newImpuesto = await service.create(body);
      res.status(201).json(newImpuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetInventarioSchema, 'params'),
  validatorHandler(UpdateInventarioSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const impuesto = await service.update(id, body);
      res.json(impuesto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetInventarioSchema, 'params'),
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
