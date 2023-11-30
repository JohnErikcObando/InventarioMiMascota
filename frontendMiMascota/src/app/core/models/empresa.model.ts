export interface EmpresaModel {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  celular: string;
  logo: string;
  email: string;
  usuarioModif: string;
}

export interface CreateEmpresaDTO extends Omit<EmpresaModel, 'id'> {}

export interface UpdateEmpresaDTO extends Partial<CreateEmpresaDTO> {}
