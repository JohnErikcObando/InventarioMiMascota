import { AbstractControl } from '@angular/forms';
import { UsuarioService } from '../core/services/usuario.service';
import { Observable, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';
import { UsuarioModel } from '../core/models/usuario.model';
import { MarcaService } from '../core/services/marca.service';

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

  static ValidarUsername(service: UsuarioService) {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (MyValidators.estado === 'Editar') {
        console.log('ingreso al if ');
        if (control.value === MyValidators.campo) {
          return of(null);
        }
      }

      const value = control.value;
      console.log('value', value, 'MyValidators.usuarioId', MyValidators.campo);
      return service.findByUsername(value).pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;
          console.log(response);

          if (!isAvailable) {
            return { not_available: true };
          }
          return null;
        }),
        catchError(() => of(null).pipe(delay(0)))
      );
    };
  }

  static ValidarMarca(service: MarcaService) {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (MyValidators.estado === 'Editar') {
        console.log('ingreso al if ');
        if (control.value === MyValidators.campo) {
          return of(null);
        }
      }

      const value = control.value;
      console.log('value', value, 'MyValidators.campo', MyValidators.campo);
      return service.findByMarca(value).pipe(
        map((response: any) => {
          const isAvailable = response.isAvailable;
          console.log('validatos marca', response);

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
