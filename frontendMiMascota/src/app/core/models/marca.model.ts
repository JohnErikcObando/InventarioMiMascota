export interface MarcaModel {
  id: number;
  nombre: string;
  descripcion: string;
  usuarioModif: string;
}

export interface CreateMarcaDTO extends Omit<MarcaModel, 'id'> {}
export interface UpdateMarcaDTO extends Partial<CreateMarcaDTO> {}
