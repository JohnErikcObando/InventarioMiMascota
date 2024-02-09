import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogformMarcaComponent } from '../../../marca/components/dialogform-marca/dialogform-marca.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialog-form-categoria',
  templateUrl: './dialog-form-categoria.component.html',
  styleUrls: ['./dialog-form-categoria.component.scss'],
})
export class DialogFormCategoriaComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  marca: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogformMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public idMarca: number,
    private categoriaService: CategoriaService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesCateoria();
  }

  opcionesCateoria() {
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
    const data = this.form.value;
    this.categoriaService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'La Categoria Se Registró Correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idMarca: number) {
    this.categoriaService.get(idMarca).subscribe({
      next: (data) => {
        this.form.patchValue(data);
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
    const data = this.form.value;
    this.categoriaService.update(this.idMarca, data).subscribe((rta) => {
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
          this.categoriaService,
          'findByCategoria',
          'nombre'
        ),
      ],
      descripcion: ['', [Validators.maxLength(500)]],
      usuarioModif: ['MiMascota'],
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
