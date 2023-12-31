import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

import { UsuarioModel } from '../core/models/usuario.model';
import { MarcaService } from '../core/services/marca.service';
import { CategoriaService } from '../core/services/categoria.service';
import { CajaService } from '../core/services/caja.service';
import { FormaPagoService } from './../core/services/forma-pago.service';
import { UsuarioService } from '../core/services/usuario.service';
import { ProveedorService } from '../core/services/proveedor.service';
import { ProductoService } from '../core/services/producto.service';

export class MyValidators {
  static estado: string;
  static campo: string;
  static campoDos: string;

  static setEstado(estado: string) {
    MyValidators.estado = estado;
    console.log('validador', estado);
  }

  static setCampo(campo: string) {
    MyValidators.campo = campo;
    console.log('usuario en edición ID', campo);
  }

  static setCampoDos(campoDos: string) {
    MyValidators.campoDos = campoDos;
    console.log('usuario en edición ID', campoDos);
  }

  static ValidarCampoExistente(
    service: any,
    methodName: string,
    fieldName: string
  ) {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      console.log(
        'value',
        control.value,
        'campo',
        MyValidators.campo,
        'campodos',
        MyValidators.campoDos
      );

      if (MyValidators.estado === 'Editar') {
        if (
          (fieldName === 'nombre' && control.value === MyValidators.campo) ||
          (fieldName === 'id' && control.value === MyValidators.campoDos) ||
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
