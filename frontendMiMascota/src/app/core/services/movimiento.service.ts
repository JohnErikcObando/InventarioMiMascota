import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  CreateMovimientoDTO,
  MovimientoModel,
  UpdateMovimientoDTO,
} from '../models/movimiento.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimientoService {
  private apiUrl = `${environment.API_URL}movimiento`;

  constructor(private http: HttpClient) {}

  create(dto: CreateMovimientoDTO) {
    return this.http.post<MovimientoModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateMovimientoDTO) {
    return this.http.put<MovimientoModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateMovimientoDTO) {
    return this.http.patch<MovimientoModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<MovimientoModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<MovimientoModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<MovimientoModel>(`${this.apiUrl}/${id}`).pipe(
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
