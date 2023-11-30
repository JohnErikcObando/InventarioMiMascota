const express = require('express');
const FacturaCompraService = require('../services/facturaCompra.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateFacturaCompraSchema,
  UpdateFacturaCompraSchema,
  GetFacturaCompraSchema,
} = require('../Schemas/facturaCompra.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new FacturaCompraService();

router.get('/', async (req, res, next) => {
  try {
    const facturasCompra = await service.find();
    res.json(facturasCompra);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetFacturaCompraSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const facturaCompra = await service.findOne(id);
      res.json(facturaCompra);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateFacturaCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newFacturaCompra = await service.create(body);
      res.status(201).json(newFacturaCompra);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetFacturaCompraSchema, 'params'),
  validatorHandler(UpdateFacturaCompraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const facturaCompra = await service.update(id, body);
      res.json(facturaCompra);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetFacturaCompraSchema, 'params'),
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
