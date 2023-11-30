const express = require('express');
const ProductoService = require('../services/producto.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateProductoSchema,
  UpdateProductoSchema,
  GetProductoSchema,
} = require('../schemas/producto.schema');

const router = express.Router();
const service = new ProductoService();

router.get('/', async (req, res, next) => {
  try {
    const productos = await service.find();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetProductoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const producto = await service.findOne(id);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log('ingresando al router', body);
      const newProducto = await service.create(body);
      res.status(201).json(newProducto);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetProductoSchema, 'params'),
  validatorHandler(UpdateProductoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const producto = await service.update(id, body);
      res.json(producto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetProductoSchema, 'params'),
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
