const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const CajaService = require('./caja.service');
const clienteService = require('./cliente.service');
const { Op } = require('sequelize');

class FacturaVentaService {
  constructor() {
    this.cajaService = new CajaService();
    this.clienteService = new clienteService();
  }

  async create(data) {
    const clienteFactura = data.clienteFactura || {};

    // Verificación si el cliente existe
    let clienteExistente = null;
    if (clienteFactura.id) {
      clienteExistente = await this.clienteService.findOne(clienteFactura.id);
    }

    if (!clienteExistente) {
      // Si el cliente no existe, crea uno nuevo
      clienteExistente = await this.clienteService.create(clienteFactura);
    }

    // Verificar la caja y obtener el número de factura
    const cajaId = data.cajaId;
    const factura = await this.cajaService.obtenerCajaActual(cajaId);

    // Crear la factura de venta
    const nuevaFacturaVenta = await models.FacturaVenta.create({
      ...data,
      id: factura,
      clienteId: clienteExistente.id,
    });

    // Asociar los detalles de venta con la factura
    const detalleVentaData = data.detalleVenta || [];
    await Promise.all(
      detalleVentaData.map(async (detalleVenta) => {
        await models.Venta.create({
          ...detalleVenta,
          facturaVentaId: nuevaFacturaVenta.id,
        });
      }),
    );

    return nuevaFacturaVenta;
  }

  async find(fechaInicio, fechaFin) {
    const where = {};

    // Verificar si se proporcionan fechas para el filtro
    if (fechaInicio && fechaFin) {
      const startDate = new Date(fechaInicio);
      const endDate = new Date(fechaFin);
      endDate.setDate(endDate.getDate() + 1); // Agrega un día a la fecha final

      where.fecha = {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      };
    }

    console.log(where);

    const facturasVenta = await models.FacturaVenta.findAll({
      where, // Aplicar el filtro de rango de fechas
      include: [
        { model: models.Caja, as: 'caja' },
        { model: models.Cliente, as: 'cliente' },
        { model: models.Venta, as: 'detalleVenta' },
        { model: models.AbonoFacturaVenta, as: 'abonoFacturaCV' },
        { model: models.FormaPago, as: 'forma_pago' },
      ],
      order: [
        ['fecha', 'DESC'], // Ordenar por el campo 'fecha' en orden descendente
      ],
    });

    return facturasVenta;
  }

  async findOne(id) {
    const facturaVenta = await models.FacturaVenta.findByPk(id, {
      include: [
        { model: models.Caja, as: 'caja' },
        { model: models.Cliente, as: 'cliente' },
        { model: models.Venta, as: 'detalleVenta' },
        { model: models.AbonoFacturaVenta, as: 'abonoFacturaCV' },
      ],
    });
    if (!facturaVenta) {
      throw boom.notFound('FacturaVenta not found');
    }
    return facturaVenta;
  }

  async update(id, changes) {
    const facturaVenta = await this.findOne(id);
    const facturaVentaActualizada = await facturaVenta.update(changes);
    return facturaVentaActualizada;
  }

  async delete(id) {
    const facturaVenta = await this.findOne(id);
    await facturaVenta.destroy();
    return { id };
  }
}

module.exports = FacturaVentaService;
