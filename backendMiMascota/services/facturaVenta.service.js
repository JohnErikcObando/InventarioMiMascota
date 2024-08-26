const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const CajaService = require('./caja.service');
const clienteService = require('./cliente.service');

class FacturaVentaService {
  constructor() {
    this.cajaService = new CajaService();
    this.clienteService = new clienteService();
  }

  async create(data) {
    const clienteFactura = data.clienteFactura || {};

    //Verificacion si el cliente existe
    let clienteExistente = null;
    try {
      if (clienteFactura.id) {
        clienteExistente = await this.clienteService.findOne(clienteFactura.id);
      }
    } catch (error) {
      // El cliente no se encontró, y se capturó la excepción
      clienteExistente = null;
    }

    if (!clienteExistente) {
      // Si el cliente no existe, crea uno nuevo
      clienteExistente = await this.clienteService.create(clienteFactura);
    }

    // Verificar la caja que tiene asignada la factura
    try {
      const cajaId = data.cajaId;
      // Obtener la caja actual y actualizar el número de factura
      const factura = await this.cajaService.obtenerCajaActual(cajaId);

      // Crear la factura de venta con el ID adecuado
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

      await this.cajaService.actualizarNumeroFactura(cajaId);

      return nuevaFacturaVenta;
    } catch (error) {
      console.error('Error al crear la factura de venta:', error.message);
      throw error;
    }
  }

  async find() {
    const facturasVenta = await models.FacturaVenta.findAll({
      include: [
        { model: models.Caja, as: 'caja' },
        { model: models.Cliente, as: 'cliente' },
        { model: models.Venta, as: 'detalleVenta' },
        { model: models.AbonoFacturaVenta, as: 'abonoFacturaCV' },
        { model: models.FormaPago, as: 'forma_pago' },
      ],
      order: [
        ['fecha', 'DESC'], // Ordenar por el campo 'ingreso' en orden descendente
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
