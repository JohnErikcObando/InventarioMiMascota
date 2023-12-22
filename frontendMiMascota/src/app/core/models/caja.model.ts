export interface CajaModel {
  id: number;
  nombre: string;
  numFactura: number;
  prefijo: string;
  tipoFactura: string;
  usuarioModif: string;
}

export interface CreateCajaDTO extends Omit<CajaModel, 'id'> {}
export interface UpdateCajaDTO extends Partial<CreateCajaDTO> {}
