import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

import { UsuarioModel } from '../core/models/usuario.model';
import { MarcaService } from '../core/services/marca.service';
import { CategoriaService } from '../core/services/categoria.service';
import { CajaService } from '../core/services/caja.service';
import { FormaPagoService } from './../core/services/forma-pago.service';
import { UsuarioService } from '../core/services/usuario.service';

export class MyValidators {
  static estado: string;
  static campo: string;

  static setEstado(estado: string) {
    MyValidators.estado = estado;
    console.log('validador', estado);
  }

  static setCampo(campo: string) {
    MyValidators.campo = campo;
    console.log('usuario en edición ID', campo);
  }

  static ValidarCampoExistente(service: any, methodName: string) {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (MyValidators.estado === 'Editar') {
        if (
          control.value === MyValidators.campo ||
          MyValidators.campo === undefined
        ) {
          return of(null);
        }
      }

      const value = control.value;

      return service[methodName](value).pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;

          if (!isAvailable) {
            return { not_available: true };
          }
          return null;
        }),
        catchError(() => of(null).pipe(delay(0)))
      );
    };
  }
}
