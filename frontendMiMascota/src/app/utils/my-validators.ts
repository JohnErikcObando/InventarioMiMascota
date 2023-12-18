import { AbstractControl } from '@angular/forms';
import { UsuarioService } from '../core/services/usuario.service';
import { Observable, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';
import { UsuarioModel } from '../core/models/usuario.model';

export class MyValidators {
  static estado: string;
  static username: string;

  static setEstado(estado: string) {
    MyValidators.estado = estado;
    console.log('validador', estado);
  }

  static setUsername(username: string) {
    MyValidators.username = username;
    console.log('usuario en edición ID', username);
  }

  static ValidarUsername(service: UsuarioService) {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (MyValidators.estado === 'Editar') {
        console.log('ingreso al if ');
        if (control.value === MyValidators.username) {
          return of(null);
        }
      }

      const value = control.value;
      console.log(
        'value',
        value,
        'MyValidators.usuarioId',
        MyValidators.username
      );
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
}
