import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaModel } from 'src/app/core/models/categoria.model';
import { MarcaModel } from 'src/app/core/models/marca.model';
import { MarcaService } from 'src/app/core/services/marca.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { CategoriaService } from '../../../../../core/services/categoria.service';

@Component({
  selector: 'app-dialog-from-producto',
  templateUrl: './dialog-from-producto.component.html',
  styleUrls: ['./dialog-from-producto.component.scss'],
})
export class DialogFromProductoComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  marcas: MarcaModel[] = [];
  categorias: CategoriaModel[] = [];

  producto: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFromProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public idProducto: number,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesCliente();
    this.getAllMarcas();
    this.getAllCategorias();
  }

  opcionesCliente() {
    if (this.idProducto != null) {
      this.get(this.idProducto);
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
    this.productoService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El usuario se registró correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idProducto: number) {
    this.productoService.get(idProducto).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
        this.producto = data.nombre;
        MyValidators.setCampo(this.producto);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.productoService.update(this.idProducto, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('El usuario se edito correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  getAllMarcas() {
    this.marcaService.getAll().subscribe((data) => {
      this.marcas = data;
    });
  }

  getAllCategorias() {
    this.categoriaService.getAll().subscribe((data) => {
      this.categorias = data;
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required],
        MyValidators.ValidarCampoExistente(
          this.productoService,
          'findByProducto',
          'nombre'
        ),
      ],
      marcaId: ['', [Validators.required]],
      categoriaId: ['', [Validators.required]],
      codigo: [''],
      descripcion: [''],
      valor: ['', [Validators.required]],
      usuarioModif: ['MiMascota'],
    });
  }

  get id() {
    return this.form.get('id');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get marcaId() {
    return this.form.get('marcaId');
  }
  get categoriaId() {
    return this.form.get('categoriaId');
  }
  get codigo() {
    return this.form.get('codigo');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }

  get valor() {
    return this.form.get('valor');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
