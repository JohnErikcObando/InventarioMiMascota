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
  private apiUrl = `${environment.API_URL}/usuario`;

  constructor(private http: HttpClient) {}

  create(dto: CreateUsuarioDTO) {
    return this.http.post<UsuarioModel>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateUsuarioDTO) {
    return this.http.put<UsuarioModel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<UsuarioModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<UsuarioModel[]>(this.apiUrl);
  }

  get(id: string) {
    return this.http.get<UsuarioModel>(`${this.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores
        return throwError(() => new Error('Ups, algo salió mal'));
      })
    );
  }
}
