import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Pipe({
  name: 'formatFecha',
})
export class FormatFechaPipe implements PipeTransform {
  constructor() {
    // Registra el archivo de configuración del idioma español
    registerLocaleData(localeEs, 'es');
  }

  transform(value: any): any {
    if (value) {
      const datePipe = new DatePipe('es'); // Usa 'es' como el código de idioma para español
      const formattedDate = datePipe.transform(value, 'yyyy-MMM-dd');
      return formattedDate;
    }
    return null;
  }
}
