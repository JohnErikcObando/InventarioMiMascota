import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilidadService {
  private readonly duracionSnackBar = 3000;
  private readonly posicionHorizontalSnackBar = 'end';
  private readonly posicionVerticalSnackBar = 'top';

  constructor(private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  mostrarAlerta(mensaje: string, tipo: string) {
    this.mostrarSnackBar(mensaje, tipo);
  }

  private mostrarSnackBar(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: this.posicionHorizontalSnackBar,
      verticalPosition: this.posicionVerticalSnackBar,
      duration: this.duracionSnackBar,
    });
  }

  obtenerSesionUsuario() {
    const dataCadena = localStorage.getItem('usuario');
    if (dataCadena) {
      return JSON.parse(dataCadena);
    }
    return null;
  }

  eliminarSesionUsuario() {
    localStorage.removeItem('usuario');
  }
}
