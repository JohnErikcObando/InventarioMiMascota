const express = require('express');
const FormaPagoService = require('./../services/formaPago.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  CreateFormaPagoSchema,
  UpdateFormaPagoSchema,
  GetFormaPagoSchema,
  UpdateFormaPagoModifSchema,
} = require('./../schemas/formaPago.schema');

const router = express.Router();
const service = new FormaPagoService();

router.get('/', async (req, res, next) => {
  try {
    const formaPago = await service.find();
    res.json(formaPago);
  } catch (error) {
    next(error);
  }
});

router.get('/byFormaPago', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "usuario" requerido' });
    }

    const formaPago = await service.findByName(nombre);
    res.json(formaPago);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetFormaPagoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const formaPago = await service.findOne(id);
      res.json(formaPago);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(CreateFormaPagoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newFormaPago = await service.create(body);
      res.status(201).json(newFormaPago);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetFormaPagoSchema, 'params'),
  validatorHandler(UpdateFormaPagoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const formaPago = await service.update(id, body);
      res.json(formaPago);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetFormaPagoSchema, 'params'),
  validatorHandler(UpdateFormaPagoModifSchema, 'body'),
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
  validatorHandler(GetFormaPagoSchema, 'params'),
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

module.exports = router;
