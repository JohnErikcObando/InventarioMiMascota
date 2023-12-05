import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AjustarTextoService {
  ajustarTexto(value: string, capitalizarTodasLasPalabras: boolean = false): string {
    if (!value) {
      return value;
    }

    if (capitalizarTodasLasPalabras) {
      return value
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return value
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  }
}
