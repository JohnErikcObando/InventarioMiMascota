const express = require('express');

const EmpresaService = require('./../services/empresa.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  CreateEmpresaSchema,
  updateEmpresaSchema,
  GetEmpresaSchema,
} = require('./../Schemas/empresa.schema');

const router = express.Router();
const service = new EmpresaService();

router.get('/', async (req, res, next) => {
  try {
    const empresa = await service.find();
    res.json(empresa);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(GetEmpresaSchema, 'params'),
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
  validatorHandler(CreateEmpresaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEmpresa = await service.create(body);
      res.status(201).json(newEmpresa);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetEmpresaSchema, 'params'),
  validatorHandler(updateEmpresaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const empresa = await service.update(id, body);
      res.json(empresa);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetEmpresaSchema, 'params'),
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
