import { CajaModel } from './caja.model';
import { VentaModel } from './venta.model';
import { FormaPagoModel } from './forma-pago.model';
import { ProveedorModel } from './proveedor.model';
import { ClienteModel } from './cliente.model';

export interface FacturaVentaModel {
  id: string;
  clienteId: string;
  cajaId: number;
  formaPagoId: number;
  movimientoId: number;
  fecha: Date;
  valor: number;
  descuento: number;
  subtotal: number;
  total: number;
  abono: number;
  saldo: number;
  anulado: boolean;
  descripcion: string;
  usuarioModif: string;
  cliente: ClienteModel;
  detalleVenta: VentaModel[];
}

export interface CreateFacturaVentaDTO extends Omit<FacturaVentaModel, 'id'> {}
export interface UpdateFacturaVentaDTO extends Partial<CreateFacturaVentaDTO> {}
