export interface RolUsuarioModel {
  id: number;
  nombre: string;
  fecha_now?: Date;
  usuarioModif?: string;
}

export interface CreateRolUsuarioDTO extends Omit<RolUsuarioModel, 'id'> {}
export interface UpdateRolUpdate extends Partial<CreateRolUsuarioDTO> {}
