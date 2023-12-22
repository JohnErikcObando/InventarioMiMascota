import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from 'src/app/core/services/marca.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialogform-marca',
  templateUrl: './dialogform-marca.component.html',
  styleUrls: ['./dialogform-marca.component.scss'],
})
export class DialogformMarcaComponent {
  formMarca: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  marca: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogformMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public idMarca: number,
    private marcaService: MarcaService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.formMarca = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesMarca();
  }

  opcionesMarca() {
    if (this.idMarca != null) {
      this.get(this.idMarca);
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
    const data = this.formMarca.value;
    this.marcaService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El usuario se registró correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idMarca: number) {
    this.marcaService.get(idMarca).subscribe({
      next: (data) => {
        this.formMarca.patchValue(data);
        this.botonAccion = 'Editar';
        this.marca = data.nombre;
        console.log('username', this.marca);
        MyValidators.setCampo(this.marca);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.formMarca.value;
    this.marcaService.update(this.idMarca, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('El usuario se edito correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  private buildForm() {
    this.formMarca = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required],
        MyValidators.ValidarCampoExistente(this.marcaService, 'findByMarca'),
      ],
      descripcion: ['', [Validators.maxLength(500)]],
      usuarioModif: ['MiMascota'],
    });
  }

  get nombre() {
    return this.formMarca.get('nombre');
  }

  get descripcion() {
    return this.formMarca.get('descripcion');
  }

  get usuarioModif() {
    return this.formMarca.get('usuarioModif');
  }
}
