import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs';
import { MenuModel } from '../models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${environment.API_URL}menu`;

  constructor(private http: HttpClient) {}

  getListaMenu() {
    return this.http.get<MenuModel[]>(this.apiUrl).pipe(retry(3));
  }
}
