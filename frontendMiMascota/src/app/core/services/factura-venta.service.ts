import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateFacturaVentaDTO,
  FacturaVentaModel,
  UpdateFacturaVentaDTO,
} from '../models/factura-venta.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaVentaService {
  private apiUrl = `${environment.API_URL}facturaVenta`;

  constructor(private http: HttpClient) {}

  create(dto: CreateFacturaVentaDTO) {
    return this.http.post<FacturaVentaModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateFacturaVentaDTO) {
    return this.http.put<FacturaVentaModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateFacturaVentaDTO) {
    return this.http.patch<FacturaVentaModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<FacturaVentaModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<FacturaVentaModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<FacturaVentaModel>(`${this.apiUrl}/${id}`).pipe(
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
