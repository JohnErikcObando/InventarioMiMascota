export interface ImpuestoModel {
  id: number;
  nombre: string;
  porcentaje: number;
  usuarioModif: string;
}

export interface CreateImpuestoDTO extends Omit<ImpuestoModel, 'id'> {}
export interface UpdateImpuestoDTO extends Partial<CreateImpuestoDTO> {}
