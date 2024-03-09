import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovimientoModel } from 'src/app/core/models/movimiento.model';
import { DialogFromProductoComponent } from '../../../producto/components/dialog-from-producto/dialog-from-producto.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovimientoService } from 'src/app/core/services/movimiento.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';

@Component({
  selector: 'app-dialog-form-movimiento',
  templateUrl: './dialog-form-movimiento.component.html',
  styleUrls: ['./dialog-form-movimiento.component.scss'],
})
export class DialogFormMovimientoComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  movimiento: MovimientoModel[] = [];

  date = new FormControl(new Date());

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFromProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public idmovimiento: number,
    private movimientoService: MovimientoService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {}

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
    this.movimientoService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El movimiento se registró correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idmovimiento: number) {
    this.movimientoService.get(idmovimiento).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.movimientoService.update(this.idmovimiento, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El movimiento Se Registró Correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      tipo: ['', [Validators.required]],
      descripcion: [''],
      valor: ['', [Validators.required]],
      usuarioModif: ['MiMascota'],
    });
  }

  get formControl() {
    return this.form.controls;
  }
}
