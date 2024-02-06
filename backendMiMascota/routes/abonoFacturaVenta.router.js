const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateAbonoFacturaVentaSchema,
  UpdateAbonoFacturaVentaSchema,
  GetAbonoFacturaVentaSchema,
} = require('./../schemas/AbonoFacturaVenta.schema');
const AbonoFacturaService = require('../services/AbonoFacturaVenta.service');

const router = express.Router();
const service = new AbonoFacturaService();

router.get('/', async (req, res, next) => {
  try {
    const AbonoFacturaVenta = await service.find();
    res.json(AbonoFacturaVenta);
  } catch (error) {
    next(error);
  }
});

router.get('/facturaVenta/:facturaVentaId', async (req, res, next) => {
  try {
    const { facturaVentaId } = req.params;
    const AbonoFacturaVenta =
      await service.findByFacturaVentaId(facturaVentaId);
    res.json(AbonoFacturaVenta);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetAbonoFacturaVentaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const AbonoFacturaVenta = await service.findOne(id);
      res.json(AbonoFacturaVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateAbonoFacturaVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newAbonoFactura = await service.create(body);
      res.status(201).json(newAbonoFactura);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetAbonoFacturaVentaSchema, 'params'),
  validatorHandler(UpdateAbonoFacturaVentaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const AbonoFacturaVenta = await service.update(id, body);
      res.json(AbonoFacturaVenta);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetAbonoFacturaVentaSchema, 'params'),
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
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
  next(); // Pasa el control al siguiente middleware
});

module.exports = router;
