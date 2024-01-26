import { FormaPagoModel } from './forma-pago.model';

export interface AbonosFacturaVentaModel {
  id: number;
  factura_venta_id: string;
  forma_pago_id: number;
  fecha: Date;
  valor: number;
  descripcion: string;
  anulado: boolean;
  usuarioModif: string;
  forma_pago: FormaPagoModel;
}

export interface CreateAbonosFacturaVentaDTO
  extends Omit<AbonosFacturaVentaModel, 'id'> {}
export interface UpdateAbonosFacturaVentaDTO
  extends Partial<CreateAbonosFacturaVentaDTO> {}
