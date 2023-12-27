import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  CategoriaModel,
  CreateCategoriaDTO,
  UpdateCategoriaDTO,
} from '../models/categoria.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = `${environment.API_URL}categoria`;

  constructor(private http: HttpClient) {}

  create(dto: CreateCategoriaDTO) {
    return this.http.post<CategoriaModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateCategoriaDTO) {
    return this.http.put<CategoriaModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateCategoriaDTO) {
    return this.http.patch<CategoriaModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<CategoriaModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<CategoriaModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<CategoriaModel>(`${this.apiUrl}/${id}`).pipe(
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

  findByCategoria(nombre: string) {
    return this.http
      .get<CategoriaModel>(`${this.apiUrl}/byCategoria`, {
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
