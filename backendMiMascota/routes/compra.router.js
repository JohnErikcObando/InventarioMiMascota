const express = require('express');
const CompraService = require('../services/compra.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateCompraSchema,
  UpdateCompraSchema,
  GetCompraSchema,
} = require('../Schemas/compra.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new CompraService();

router.get('/', async (req, res, next) => {
  try {
    const compras = await service.find();
    res.json(compras);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetCompraSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const compra = await service.findOne(id);
      res.json(compra);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCompra = await service.create(body);
      res.status(201).json(newCompra);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetCompraSchema, 'params'),
  validatorHandler(UpdateCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const compra = await service.update(id, body);
      res.json(compra);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetCompraSchema, 'params'),
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
