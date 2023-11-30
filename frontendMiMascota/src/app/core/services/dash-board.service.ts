import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { MovimientosMesModel } from '../models/movimientos-mes.model';
import { ProductosMesModel } from '../models/productos-mes.model';
import { VentasDiaModel } from '../models/ventas-dia.model';
import { VentasSemanaModel } from '../models/ventas-semana.model';
import { VentasMesModel } from '../models/ventas-mes.model';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  private apiUrl = `${environment.API_URL}dashBoard/`;
  constructor(private http: HttpClient) {}

  getMovimientosMes() {
    const url = `${this.apiUrl}movimientos-tipo-mes`;
    return this.http.get<MovimientosMesModel[]>(url).pipe(retry(3));
  }

  getProductosMes() {
    const url = `${this.apiUrl}productos-mas-vendidos-por-mes`;
    return this.http.get<ProductosMesModel[]>(url).pipe(retry(3));
  }

  getVentasDia() {
    const url = `${this.apiUrl}ventas-por-dia`;
    return this.http.get<VentasDiaModel[]>(url).pipe(retry(3));
  }

  getVentasMes() {
    const url = `${this.apiUrl}ventas-por-mes`;
    return this.http.get<VentasMesModel[]>(url).pipe(retry(3));
  }

  getVentasSemana() {
    const url = `${this.apiUrl}ventas-por-semana`;
    return this.http.get<VentasSemanaModel[]>(url).pipe(retry(3));
  }
}
