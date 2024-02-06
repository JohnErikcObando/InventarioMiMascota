const express = require('express');

const empresa = require('./empresa.router');
const movimiento = require('./movimiento.router');
const menu = require('./menu.router');
const rolUsuario = require('./rolUsuario.router');
const menuRol = require('./menuRol.router');
const usuario = require('./usuario.router');
const historial = require('./historial.router');
const marca = require('./marca.router');
const categoria = require('./categoria.router');
const producto = require('./producto.router');
const inventario = require('./inventario.router');
const proveedor = require('./proveedor.router');
const cliente = require('./cliente.router');
const formaPago = require('./formaPago.router');
const caja = require('./caja.router');
const facturaCompra = require('./facturaCompra.router');
const compra = require('./compra.router');
const impuesto = require('./impuesto.router');
const facturaVenta = require('./facturaVenta.router');
const venta = require('./venta.router');
const impuestoFactura = require('./impuestoFactura.router');
const abonoFacturaRouter = require('./abonoFacturaVenta.router');

const dashBoard = require('./dashBoard.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/empresa', empresa);
  router.use('/movimiento', movimiento);
  router.use('/menu', menu);
  router.use('/rolUsuario', rolUsuario);
  router.use('/menuRol', menuRol);
  router.use('/usuario', usuario);
  router.use('/historial', historial);
  router.use('/marca', marca);
  router.use('/categoria', categoria);
  router.use('/producto', producto);
  router.use('/inventario', inventario);
  router.use('/proveedor', proveedor);
  router.use('/cliente', cliente);
  router.use('/formaPago', formaPago);
  router.use('/caja', caja);
  router.use('/facturaCompra', facturaCompra);
  router.use('/compra', compra);
  router.use('/impuesto', impuesto);
  router.use('/facturaVenta', facturaVenta);
  router.use('/venta', venta);
  router.use('/impuestoFactura', impuestoFactura);
  router.use('/abonoFacturaVenta', abonoFacturaRouter);

  router.use('/dashBoard', dashBoard);
}

module.exports = routerApi;
