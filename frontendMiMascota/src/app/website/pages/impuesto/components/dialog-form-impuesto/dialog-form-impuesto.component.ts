import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImpuestoService } from 'src/app/core/services/impuesto.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialog-form-impuesto',
  templateUrl: './dialog-form-impuesto.component.html',
  styleUrls: ['./dialog-form-impuesto.component.scss'],
})
export class DialogFormImpuestoComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  impuesto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormImpuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public idImpuesto: number,
    private impuestoService: ImpuestoService,
    private sweetalert2Service: Sweetalert2Service,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesImpuesto();
  }

  opcionesImpuesto() {
    if (this.idImpuesto != null) {
      this.get(this.idImpuesto);
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  save(event: MouseEvent) {
    if (this.botonAccion === 'Guardar') {
      this.create();
    } else {
      this.botonAccion === 'Editar';
      this.update();
    }
  }

  create() {
    const data = this.form.value;
    this.impuestoService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El Impuesto Se Registró Correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        this.router.navigate(['/pages/impuesto']);
        console.log('Creo un impuesto');

      }, 1500);
    });1
  }

  get(idImpuesto: number) {
    this.impuestoService.get(idImpuesto).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
        this.impuesto = data.nombre;
        console.log('username', this.impuesto);
        MyValidators.setCampo(this.impuesto);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.impuestoService.update(this.idImpuesto, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('El usuario se edito correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required],
        MyValidators.ValidarCampoExistente(
          this.impuestoService,
          'findByImpuesto',
          'nombre'
        ),
      ],
      porcentaje: ['', [Validators.required]],
      usuarioModif: ['MiMascota'],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get porcentaje() {
    return this.form.get('porcentaje');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
