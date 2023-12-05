// ajustar-texto.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ajustarTexto',
})
export class AjustarTextoPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
