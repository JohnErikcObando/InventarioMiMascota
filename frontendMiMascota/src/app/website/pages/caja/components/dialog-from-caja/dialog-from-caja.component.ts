import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CajaService } from 'src/app/core/services/caja.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialog-from-caja',
  templateUrl: './dialog-from-caja.component.html',
  styleUrls: ['./dialog-from-caja.component.scss'],
})
export class DialogFromCajaComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  Caja: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFromCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public idCaja: number,
    private cajaService: CajaService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesCateoria();
  }

  opcionesCateoria() {
    if (this.idCaja != null) {
      this.get(this.idCaja);
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
    this.cajaService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('La Caja Se Registró Correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idCaja: number) {
    this.cajaService.get(idCaja).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
        this.Caja = data.nombre;

        MyValidators.setCampo(this.Caja);
        console.log('Campo', this.Caja);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.cajaService.update(this.idCaja, data).subscribe((rta) => {
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
        [Validators.required, Validators.minLength(4)],
        MyValidators.ValidarCampoExistente(
          this.cajaService,
          'findByCaja',
          'nombre'
        ),
      ],
      numFactura: ['0', [Validators.required]],
      prefijo: ['', [Validators.required, Validators.maxLength(2)]],
      tipoFactura: ['', [Validators.required]],
      usuarioModif: ['MiMascota'],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get descnumFacturaripcion() {
    return this.form.get('numFactura');
  }
  get prefijo() {
    return this.form.get('prefijo');
  }
  get tipoFactura() {
    return this.form.get('tipoFactura');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
