export interface VentaModel {
  id?: number;
  facturaCompraId?: string;
  productoId: number;
  cantidad: number;
  valor: number;
  total: number;
  usuarioModif: string;
}
