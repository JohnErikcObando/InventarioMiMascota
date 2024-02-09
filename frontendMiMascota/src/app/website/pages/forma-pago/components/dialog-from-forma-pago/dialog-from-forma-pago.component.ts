import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormaPagoService } from 'src/app/core/services/forma-pago.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialog-from-forma-pago',
  templateUrl: './dialog-from-forma-pago.component.html',
  styleUrls: ['./dialog-from-forma-pago.component.scss'],
})
export class DialogFromFormaPagoComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  formaPago: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFromFormaPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public idFormaPago: number,
    private formaPagoService: FormaPagoService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesFormaPago();
  }

  opcionesFormaPago() {
    if (this.idFormaPago != null) {
      this.get(this.idFormaPago);
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
    this.formaPagoService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'La Forma De Pago Se Registró Correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idFormaPago: number) {
    this.formaPagoService.get(idFormaPago).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
        this.formaPago = data.nombre;
        console.log('username', this.formaPago);
        MyValidators.setCampo(this.formaPago);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.formaPagoService.update(this.idFormaPago, data).subscribe((rta) => {
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
          this.formaPagoService,
          'findByFormaPago',
          'nombre'
        ),
      ],
      usuarioModif: ['MiMascota'],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
