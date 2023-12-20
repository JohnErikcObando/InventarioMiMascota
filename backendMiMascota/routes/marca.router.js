const express = require('express');
const MarcaService = require('../services/marca.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateMarcaSchema,
  UpdateMarcaSchema,
  GetMarcaSchema,
  UpdateMarcaModifSchema,
} = require('../Schemas/marca.schema');

const router = express.Router();
const service = new MarcaService();

router.get('/', async (req, res, next) => {
  try {
    const marcas = await service.find();
    res.json(marcas);
  } catch (error) {
    next(error);
  }
});

router.get('/byMarca', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "marca" requerido' });
    }

    const marcas = await service.findByName(nombre);
    res.json(marcas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetMarcaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const marca = await service.findOne(id);
      res.json(marca);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateMarcaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const nuevaMarca = await service.create(body);
      res.status(201).json(nuevaMarca);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetMarcaSchema, 'params'),
  validatorHandler(UpdateMarcaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const marca = await service.update(id, body);
      res.json(marca);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetMarcaSchema, 'params'),
  validatorHandler(UpdateMarcaModifSchema, 'body'),
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
  validatorHandler(GetMarcaSchema, 'params'),
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
