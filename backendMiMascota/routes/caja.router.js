const express = require('express');
const CajaService = require('../services/caja.service');
const validatorHandler = require('../middlewares/validator.handler');
// const { checkAdminRole } = require('../middlewares/auth.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const {
  CreateCajaSchema,
  UpdateCajaSchema,
  GetCajaSchema,
  UpdateCajaModifSchema,
} = require('../schemas/caja.schema');
const boom = require('@hapi/boom');
const passport = require('passport');

const router = express.Router();
const service = new CajaService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const cajas = await service.find();
      res.json(cajas);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/byCaja', async (req, res, next) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res
        .status(400)
        .json({ error: 'Parámetro de consulta "Compra" requerido' });
    }

    const marcas = await service.findByName(nombre);
    res.json(marcas);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(GetCajaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const caja = await service.findOne(id);
      res.json(caja);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(CreateCajaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCaja = await service.create(body);
      res.status(201).json(newCaja);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  validatorHandler(GetCajaSchema, 'params'),
  validatorHandler(UpdateCajaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const caja = await service.update(id, body);
      res.json(caja);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id/usuariomodif',
  validatorHandler(GetCajaSchema, 'params'),
  validatorHandler(UpdateCajaModifSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log('body', body);

      const usuario = await service.update(id, body);
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(GetCajaSchema, 'params'),
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
