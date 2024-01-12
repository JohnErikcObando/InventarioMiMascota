import { CajaModel } from './caja.model';
import { CompraModel } from './compra.model';
import { FormaPagoModel } from './forma-pago.model';
import { ProveedorModel } from './proveedor.model';

export interface FacturaCompraModel {
  id: string;
  proveedorId: string;
  cajaId: number;
  formaPagoId: number;
  movimientoId: number;
  fecha: Date;
  valor: number;
  descuento: number;
  subtotal: number;
  total: number;
  saldo: number;
  anulado: boolean;
  imagenUrl: string;
  descripcion: string;
  usuarioModif: string;
  caja: CajaModel;
  formaPago: FormaPagoModel;
  proveedor: ProveedorModel;
  detalleCompra: CompraModel;
}

export interface CreateFacturaCompraDTO
  extends Omit<FacturaCompraModel, 'id'> {}
export interface UpdateFacturaCompraDTO
  extends Partial<CreateFacturaCompraDTO> {}
