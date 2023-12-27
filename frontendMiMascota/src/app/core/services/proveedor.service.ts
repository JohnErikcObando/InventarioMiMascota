import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateProveedorDTO,
  ProveedorModel,
  UpdateProveedorDTO,
} from '../models/proveedor.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private apiUrl = `${environment.API_URL}proveedor`;

  constructor(private http: HttpClient) {}

  create(dto: CreateProveedorDTO) {
    return this.http.post<ProveedorModel>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateProveedorDTO) {
    return this.http.put<ProveedorModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: string, dto: UpdateProveedorDTO) {
    return this.http.patch<ProveedorModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: string) {
    return this.http.delete<ProveedorModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<ProveedorModel[]>(this.apiUrl);
  }

  get(id: string) {
    return this.http.get<ProveedorModel>(`${this.apiUrl}/${id}`).pipe(
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

  findByProveedor(nombre: string) {
    console.log('ingreso a consultar por nombre');
    return this.http
      .get<ProveedorModel>(`${this.apiUrl}/byProveedor`, {
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

  findById(id: string) {
    console.log('ingreso a consultar por id');

    return this.http
      .get<ProveedorModel>(`${this.apiUrl}/byId`, {
        params: { id: id },
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
