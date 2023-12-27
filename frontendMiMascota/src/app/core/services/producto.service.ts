import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateProductoDTO,
  ProductoModel,
  UpdateProductoDTO,
} from '../models/producto.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = `${environment.API_URL}producto`;

  constructor(private http: HttpClient) {}

  create(dto: CreateProductoDTO) {
    return this.http.post<ProductoModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateProductoDTO) {
    return this.http.put<ProductoModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateProductoDTO) {
    return this.http.patch<ProductoModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<ProductoModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<ProductoModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<ProductoModel>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(
            () => new Error('Algo esta fallando en el servidor')
          );
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('No existe'));
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No estas permitido'));
        }
        return throwError(() => new Error('Ups, algo salió mal'));
      })
    );
  }

  findByProducto(nombre: string) {
    return this.http
      .get<ProductoModel>(`${this.apiUrl}/byProducto`, {
        params: { nombre: nombre },
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            // Manejar el error 404 aquí, por ejemplo, devolver un valor predeterminado
            return throwError(() => ({ isAvailable: true }));
          }
          // Otros errores pueden manejarse según sea necesario
          return throwError(() => new Error('Error en la solicitud'));
        })
      );
  }
}
