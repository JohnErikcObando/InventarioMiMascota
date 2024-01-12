export interface CompraModel {
  id?: number;
  facturaCompraId?: string;
  productoId: number;
  cantidad: number;
  costo: number;
  venta: number;
  total: number;
  usuarioModif: string;
}
