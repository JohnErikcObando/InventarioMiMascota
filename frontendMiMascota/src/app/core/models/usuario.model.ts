export interface UsuarioModel {
  id: number;
  rolUsuarioId: number;
  usuario: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  fechaNow?: Date;
  usuarioModif: string;
}

export interface CreateUsuarioDTO extends Omit<UsuarioModel, 'id'> {}
export interface UpdateUsuarioDTO extends Partial<CreateUsuarioDTO> {}
