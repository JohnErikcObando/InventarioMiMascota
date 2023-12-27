import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ClienteModel,
  CreateClienteDTO,
  UpdateClienteDTO,
} from '../models/cliente.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = `${environment.API_URL}cliente`;

  constructor(private http: HttpClient) {}

  create(dto: CreateClienteDTO) {
    return this.http.post<ClienteModel>(this.apiUrl, dto);
  }

  update(id: string, dto: UpdateClienteDTO) {
    return this.http.put<ClienteModel>(`${this.apiUrl}/${id}`, dto);
  }

  patch(id: string, dto: UpdateClienteDTO) {
    return this.http.patch<ClienteModel>(
      `${this.apiUrl}/${id}/usuariomodif`,
      dto
    );
  }

  delete(id: string) {
    return this.http.delete<ClienteModel>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<ClienteModel[]>(this.apiUrl);
  }

  get(id: string) {
    return this.http.get<ClienteModel>(`${this.apiUrl}/${id}`).pipe(
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

  findById(id: string) {
    return this.http
      .get<ClienteModel>(`${this.apiUrl}/byId`, {
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
