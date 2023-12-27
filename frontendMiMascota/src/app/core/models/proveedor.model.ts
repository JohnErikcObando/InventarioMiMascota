export interface ProveedorModel {
  id: string;
  nombre: string;
  telefono: string;
  celular: string;
  direccion: string;
  email: string;
  activo: string;
  usuarioModif: string;
}

export interface CreateProveedorDTO extends Omit<ProveedorModel, 'id'> {}
export interface UpdateProveedorDTO extends Partial<CreateProveedorDTO> {}
