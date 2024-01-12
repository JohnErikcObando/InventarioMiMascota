import { CategoriaModel } from './categoria.model';
import { MarcaModel } from './marca.model';

export interface ProductoModel {
  id: number;
  marcaId: number;
  categoriaId: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  valor: number;
  fechaNow: string;
  imagenUrl: string;
  usuarioModif: string;
  marca: MarcaModel;
  categoria: CategoriaModel;
  marcaNombre?: string; // Agregar esta línea
  categoriaNombre?: string; // Agregar esta línea
}

export interface CreateProductoDTO extends Omit<ProductoModel, 'id'> {}
export interface UpdateProductoDTO extends Partial<CreateProductoDTO> {}
