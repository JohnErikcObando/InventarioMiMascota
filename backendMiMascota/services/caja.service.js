const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const { Sequelize } = require('sequelize');

class CajaService {
  constructor() {}

  async create(data) {
    const newCaja = await models.Caja.create(data);
    return newCaja;
  }

  async find() {
    const cajas = await models.Caja.findAll({
      order: [
        ['nombre', 'ASC'], // Orden ascendente por el campo 'nombre'
      ],
    });
    return cajas;
  }

  async findOne(id) {
    const caja = await models.Caja.findByPk(id);
    if (!caja) {
      throw boom.notFound('Caja not found');
    }

    return caja;
  }

  async findByName(nombre) {
    const caja = await models.Caja.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: nombre,
        },
      },
    });

    if (!caja || caja.length === 0) {
      throw boom.notFound('Caja not found');
    }

    return caja;
  }

  async update(id, changes) {
    const caja = await this.findOne(id);
    const updatedCaja = await caja.update(changes);
    return updatedCaja;
  }

  async delete(id) {
    const caja = await this.findOne(id);
    await caja.destroy();
    return { id };
  }

  async obtenerCajaActual(cajaId) {
    try {
      const caja = await this.findOne(cajaId);
      const { prefijo, numFactura } = caja;

      // Formatear el número de caja a un string con ceros a la izquierda
      const numFacturaFormateado = numFactura.toString().padStart(4, '0');

      // Retornar la concatenación de prefijo y número de factura formateado
      return `${prefijo}${numFacturaFormateado}`;
    } catch (error) {
      console.error('Error al obtener la caja actual:', error.message);
      throw error;
    }
  }

  async actualizarNumeroFactura(cajaId) {
    try {
      // Obtener la caja actual
      const caja = await this.findOne(cajaId);

      // Incrementar el número de factura
      const nuevoNumeroFactura = caja.numFactura + 1;

      // Actualizar el número de factura en la base de datos
      await this.update(cajaId, { numFactura: nuevoNumeroFactura });
    } catch (error) {
      // Manejo de errores específico para la actualización del número de factura
      console.error(
        'Error al actualizar el número de factura en la caja:',
        error.message,
      );
      throw error;
    }
  }
}

module.exports = CajaService;
