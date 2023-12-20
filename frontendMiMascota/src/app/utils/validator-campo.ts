import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValidatorCampo implements AsyncValidator {
  constructor() {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const service = control['asyncValidatorService']; // Obtener el servicio del control
    const methodName = control['asyncValidatorMethodName']; // Obtener el nombre del método del control

    return this.checkAvailability(service, methodName, control.value);
  }

  private checkAvailability(
    service: any,
    methodName: string,
    value: any
  ): Observable<ValidationErrors | null> {
    // Evitar validación si el campo está vacío
    if (!value) {
      return of(null);
    }

    return service[methodName](value).pipe(
      map((result) => (result ? { valueTaken: true } : null)),
      catchError(() => of(null)) // Manejar errores si es necesario
    );
  }
}
