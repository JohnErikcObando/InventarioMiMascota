import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateFormaPagoDTO,
  FormaPagoModel,
  UpdateFormaPagoDTO,
} from '../models/forma-pago.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormaPagoService {
  private apiUrl = `${environment.API_URL}formaPago`;

  constructor(private http: HttpClient) {}

  create(dto: CreateFormaPagoDTO) {
    return this.http.post<FormaPagoModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateFormaPagoDTO) {
    return this.http.put<FormaPagoModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateFormaPagoDTO) {
    return this.http.patch<FormaPagoModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<FormaPagoModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<FormaPagoModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<FormaPagoModel>(`${this.apiUrl}/${id}`).pipe(
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

  findByFormaPago(nombre: string) {
    return this.http
      .get<FormaPagoModel>(`${this.apiUrl}/byFormaPago`, {
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
