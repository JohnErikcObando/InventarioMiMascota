import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateFacturaCompraDTO,
  FacturaCompraModel,
  UpdateFacturaCompraDTO,
} from '../models/factura-compra.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacturaCompraService {
  private apiUrl = `${environment.API_URL}facturaCompra`;

  constructor(private http: HttpClient) {}

  create(dto: CreateFacturaCompraDTO) {
    return this.http.post<FacturaCompraModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateFacturaCompraDTO) {
    return this.http.put<FacturaCompraModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateFacturaCompraDTO) {
    return this.http.patch<FacturaCompraModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<FacturaCompraModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<FacturaCompraModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<FacturaCompraModel>(`${this.apiUrl}/${id}`).pipe(
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
