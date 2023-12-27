export interface CategoriaModel {
  id: number;
  nombre: string;
  descripcion: string;
  usuarioModif: string;
}

export interface CreateCategoriaDTO extends Omit<CategoriaModel, 'id'> {}
export interface UpdateCategoriaDTO extends Partial<CreateCategoriaDTO> {}
