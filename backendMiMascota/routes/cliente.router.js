const express = require('express');
const ClienteService = require('../services/cliente.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  CreateClienteSchema,
  UpdateClienteSchema,
  GetClienteSchema,
  UpdateClienteModifSchema,
} = require('../schemas/cliente.schema');
const boom = require('@hapi/boom');

const router = express.Router();
const service = new ClienteService();

router.get('/', async (req, res, next) => {
  try {
    const clientes = await service.find();
    res.json(clientes);
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

router.get(
  '/:id',
  validatorHandler(GetClienteSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cliente = await service.findOne(id);
      res.json(cliente);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateClienteSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCliente = await service.create(body);
      res.status(201).json(newCliente);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetClienteSchema, 'params'),
  validatorHandler(UpdateClienteSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const cliente = await service.update(id, body);
      res.json(cliente);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetClienteSchema, 'params'),
  validatorHandler(UpdateClienteModifSchema, 'body'),
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
  validatorHandler(GetClienteSchema, 'params'),
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
