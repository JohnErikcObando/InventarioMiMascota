const express = require('express');
const CategoriaService = require('../services/categoria.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateCategoriaSchema,
  UpdateCategoriaSchema,
  GetCategoriaSchema,
  UpdateCategoriaModifSchema,
} = require('./../schemas/categoria.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new CategoriaService();

router.get('/', async (req, res, next) => {
  try {
    const categorias = await service.find();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
});

router.get('/byCategoria', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "usuario" requerido' });
    }

    const categorias = await service.findByName(nombre);
    res.json(categorias);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetCategoriaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.findOne(id);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategoria = await service.create(body);
      res.status(201).json(newCategoria);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetCategoriaSchema, 'params'),
  validatorHandler(UpdateCategoriaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categoria = await service.update(id, body);
      res.json(categoria);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetCategoriaSchema, 'params'),
  validatorHandler(UpdateCategoriaModifSchema, 'body'),
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
  validatorHandler(GetCategoriaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
      0;
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
