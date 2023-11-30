'use strict';

const { EMPRESA_TABLE, EmpresaSchema } = require('./../models/empresa.model');
const { MOVIMIENTO_TABLE, MovimientoSchema} = require('./../models/movimiento.model');
const { MENU_TABLE, MenuSchema } = require('./../models/menu.model');
const { ROL_USUARIO_TABLE, RolUsuarioSchema} = require('./../models/rolUsuario.model');
const { MENU_ROL_TABLE, MenuRolSchema } = require('./../models/menuRol.model');
const { USUARIO_TABLE, UsuarioSchema } = require('./../models/usuario.model');
const { HISTORIAL_TABLE, HistorialSchema} = require('./../models/historial.model');
const { MARCA_TABLE, MarcaSchema } = require('./../models/marca.model');
const { CATEGORIA_TABLE, CategoriaSchema } = require('./../models/categoria.model');
const { PRODUCTO_TABLE, ProductoSchema} = require('./../models/producto.model');
const { INVENTARIO_TABLE, InventarioSchema} = require('./../models/inventario.model');
const { PROVEEDOR_TABLE, ProveedorSchema} = require('./../models/proveedor.model');
const { CLIENTE_TABLE, ClienteSchema } = require('./../models/cliente.model');
const { FORMA_PAGO_TABLE, FormaPagoSchema} = require('./../models/formaPago.model');
const { CAJA_TABLE, CajaSchema } = require('./../models/caja.model');
const { FACTURA_COMPRA_TABLE,FacturaCompraSchema} = require('../models/facturaCompra.model');
const { COMPRA_TABLE, CompraSchema } = require('./../models/compra.model');
const { IMPUESTO_TABLE, ImpuestoSchema} = require('./../models/impuesto.model');
const { FACTURA_VENTA_TABLE, FacturaVentaSchema} = require('./../models/facturaVenta.model');
const { VENTA_TABLE, VentaSchema } = require('./../models/venta.model');
const { IMPUESTO_FACTURA_TABLE, ImpuestoFacturaSchema} = require('./../models/impuestoFactura.model');
const { ABONO_FACTURA_TABLE_VENTA, AbonoFacturaVentaSchema} = require('../models/AbonoFacturaVenta.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(EMPRESA_TABLE, EmpresaSchema);
    await queryInterface.createTable(MOVIMIENTO_TABLE, MovimientoSchema);
    await queryInterface.createTable(MENU_TABLE, MenuSchema);
    await queryInterface.createTable(ROL_USUARIO_TABLE, RolUsuarioSchema);
    await queryInterface.createTable(MENU_ROL_TABLE, MenuRolSchema);
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(HISTORIAL_TABLE, HistorialSchema);
    await queryInterface.createTable(MARCA_TABLE, MarcaSchema);
    await queryInterface.createTable(CATEGORIA_TABLE, CategoriaSchema);
    await queryInterface.createTable(PRODUCTO_TABLE, ProductoSchema);
    await queryInterface.createTable(INVENTARIO_TABLE, InventarioSchema);
    await queryInterface.createTable(PROVEEDOR_TABLE, ProveedorSchema);
    await queryInterface.createTable(CLIENTE_TABLE, ClienteSchema);
    await queryInterface.createTable(FORMA_PAGO_TABLE, FormaPagoSchema);
    await queryInterface.createTable(CAJA_TABLE, CajaSchema);
    await queryInterface.createTable(FACTURA_COMPRA_TABLE, FacturaCompraSchema);
    await queryInterface.createTable(COMPRA_TABLE, CompraSchema);
    await queryInterface.createTable(IMPUESTO_TABLE, ImpuestoSchema);
    await queryInterface.createTable(FACTURA_VENTA_TABLE, FacturaVentaSchema);
    await queryInterface.createTable(VENTA_TABLE, VentaSchema);
    await queryInterface.createTable(IMPUESTO_FACTURA_TABLE,ImpuestoFacturaSchema);
    await queryInterface.createTable(ABONO_FACTURA_TABLE_VENTA, AbonoFacturaVentaSchema);

  },

  async down(queryInterface) {
    await queryInterface.dropTable(EMPRESA_TABLE);
    await queryInterface.dropTable(MOVIMIENTO_TABLE);
    await queryInterface.dropTable(MENU_TABLE);
    await queryInterface.dropTable(ROL_USUARIO_TABLE);
    await queryInterface.dropTable(MENU_ROL_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(HISTORIAL_TABLE);
    await queryInterface.dropTable(MARCA_TABLE);
    await queryInterface.dropTable(CATEGORIA_TABLE);
    await queryInterface.dropTable(PRODUCTO_TABLE);
    await queryInterface.dropTable(INVENTARIO_TABLE);
    await queryInterface.dropTable(PROVEEDOR_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
    await queryInterface.dropTable(FORMA_PAGO_TABLE);
    await queryInterface.dropTable(CAJA_TABLE);
    await queryInterface.dropTable(IMPUESTO_TABLE);
    await queryInterface.dropTable(FACTURA_COMPRA_TABLE);
    await queryInterface.dropTable(COMPRA_TABLE);
    await queryInterface.dropTable(FACTURA_VENTA_TABLE);
    await queryInterface.dropTable(VENTA_TABLE);
    await queryInterface.dropTable(IMPUESTO_FACTURA_TABLE);
    await queryInterface.dropTable(ABONO_FACTURA_TABLE_VENTA);

  },
};
