import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  AbonosFacturaVentaModel,
  CreateAbonosFacturaVentaDTO,
  UpdateAbonosFacturaVentaDTO,
} from '../models/abonos-factura-venta.model';
import { catchError, throwError } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AbonosFacturaVentaService {
  private apiUrl = `${environment.API_URL}abonoFacturaVenta`;

  constructor(private http: HttpClient) {}

  create(dto: CreateAbonosFacturaVentaDTO) {
    return this.http.post<AbonosFacturaVentaModel>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateAbonosFacturaVentaDTO) {
    return this.http.put<AbonosFacturaVentaModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: number, dto: UpdateAbonosFacturaVentaDTO) {
    return this.http.patch<AbonosFacturaVentaModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: number) {
    return this.http.delete<AbonosFacturaVentaModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<AbonosFacturaVentaModel[]>(this.apiUrl);
  }

  get(id: number) {
    return this.http.get<AbonosFacturaVentaModel>(`${this.apiUrl}/${id}`).pipe(
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

  findByFactura(factura: string) {
    return this.http
      .get<AbonosFacturaVentaModel>(`${this.apiUrl}/facturaVenta/${factura}`)
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
