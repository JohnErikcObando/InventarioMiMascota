const express = require('express');
const ProveedorService = require('../services/proveedor.service');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');

const {
  CreateProveedorSchema,
  UpdateProveedorSchema,
  GetProveedorSchema,
  UpdateProveedorModifSchema,
} = require('../schemas/proveedor.schema');

const router = express.Router();
const service = new ProveedorService();

router.get('/', async (req, res, next) => {
  try {
    const proveedores = await service.find();
    res.json(proveedores);
  } catch (error) {
    next(error);
  }
});

router.get('/byId', async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "usuario" requerido' });
    }

    const proveedor = await service.findById(id);
    res.json(proveedor);
  } catch (error) {
    next(error);
  }
});

router.get('/byProveedor', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "usuario" requerido' });
    }

    const proveedor = await service.findByName(nombre);
    res.json(proveedor);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetProveedorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const proveedor = await service.findOne(id);
      res.json(proveedor);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateProveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProveedor = await service.create(body);
      res.status(201).json(newProveedor);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetProveedorSchema, 'params'),
  validatorHandler(UpdateProveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const proveedor = await service.update(id, body);
      res.json(proveedor);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetProveedorSchema, 'params'),
  validatorHandler(UpdateProveedorModifSchema, 'body'),
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
  validatorHandler(GetProveedorSchema, 'params'),
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
