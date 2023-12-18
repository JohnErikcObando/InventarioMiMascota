import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import {
  CreateUsuarioDTO,
  UpdateUsuarioDTO,
  UsuarioModel,
} from '../models/usuario.model';

import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.API_URL}usuario`;

  constructor(private http: HttpClient) {}

  create(dto: CreateUsuarioDTO) {
    return this.http.post<UsuarioModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateUsuarioDTO) {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateUsuarioDTO) {
    return this.http.patch<UsuarioModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<UsuarioModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<UsuarioModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/${id}`).pipe(
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

  findByUsername(username: string) {
    return this.http
      .get<UsuarioModel>(`${this.apiUrl}/byUsuario`, {
        params: { usuario: username },
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
