export interface ClienteModel {
  id: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  usuarioModif: string;
}

export interface CreateClienteDTO extends Omit<ClienteModel, 'id'> {}
export interface UpdateClienteDTO extends Partial<CreateClienteDTO> {}
