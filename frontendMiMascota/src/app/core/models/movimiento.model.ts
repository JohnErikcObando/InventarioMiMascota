export interface MovimientoModel {
  id: number;
  fecha: Date;
  tipo: string;
  descripcion: string;
  valor: number;
  factura?: string;
  usuarioModif: string;
}

export interface CreateMovimientoDTO extends Omit<MovimientoModel, 'id'> {}
export interface UpdateMovimientoDTO extends Partial<CreateMovimientoDTO> {}
