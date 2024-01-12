import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeric',
})
export class NumericPipe implements PipeTransform {
  transform(value: any): any {
    // Remueve cualquier caracter que no sea un número y no permite letras
    const numericValue = value.replace(/\D/g, '');

    // Actualiza el valor del campo solo si es un número válido
    if (!isNaN(parseInt(numericValue, 10))) {
      return numericValue;
    } else {
      return '';
    }
  }
}
