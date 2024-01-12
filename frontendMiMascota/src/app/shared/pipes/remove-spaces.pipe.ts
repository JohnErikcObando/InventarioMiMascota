import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces',
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Usa la función trim() para eliminar los espacios al inicio y al final,
    // y luego utiliza replace con una expresión regular para eliminar los espacios en blanco en medio
    return value.split(' ').join('').trim();
  }
}
