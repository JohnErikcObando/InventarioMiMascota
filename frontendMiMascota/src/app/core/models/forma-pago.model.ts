export interface FormaPagoModel {
  id: number;
  nombre: string;
  usuarioModif: string;
}

export interface CreateFormaPagoDTO extends Omit<FormaPagoModel, 'id'> {}
export interface UpdateFormaPagoDTO extends Partial<CreateFormaPagoDTO> {}
