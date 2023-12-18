import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateRolUsuarioDTO,
  RolUsuarioModel,
  UpdateRolUpdate,
} from '../models/rol-usuario.model';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolUsuarioService {
  private apiUrl = `${environment.API_URL}/rolUsuario`;

  constructor(private http: HttpClient) {}

  create(dto: CreateRolUsuarioDTO) {
    return this.http.post<RolUsuarioModel>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateRolUpdate) {
    return this.http.put<RolUsuarioModel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<RolUsuarioModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<RolUsuarioModel[]>(`${this.apiUrl}`).pipe(retry(3));
  }

  get(id: string) {
    return this.http.get<RolUsuarioModel>(`${this.apiUrl}/${id}`).pipe(
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
}
