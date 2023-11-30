import { Injectable } from '@angular/core';

import {
  EmpresaModel,
  CreateEmpresaDTO,
  UpdateEmpresaDTO,
} from '../models/empresa.model';

import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  empresa: EmpresaModel[] = [];

  private apiUrl = `${environment.API_URL}empresa`;

  constructor(private http: HttpClient) {}

  create(dto: CreateEmpresaDTO) {
    return this.http.post<EmpresaModel[]>(this.apiUrl, dto);
  }

  get(id: string) {
    return this.http.get<EmpresaModel[]>(`${this.apiUrl}/${id}`);
  }

  getAll() {
    return this.http.get<EmpresaModel[]>(`${this.apiUrl}`);
  }

  update(id: string, dto: UpdateEmpresaDTO) {
    return this.http.put<EmpresaModel>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<EmpresaModel>(`${this.apiUrl}/${id}`);
  }
}
