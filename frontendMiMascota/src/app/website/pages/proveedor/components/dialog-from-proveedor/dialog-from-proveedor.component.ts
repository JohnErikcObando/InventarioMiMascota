import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { ValidatorsService } from '../../../../../shared/services/validators.service';

@Component({
  selector: 'app-dialog-from-proveedor',
  templateUrl: './dialog-from-proveedor.component.html',
  styleUrls: ['./dialog-from-proveedor.component.scss'],
})
export class DialogFromProveedorComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  proveedor: string = '';
  idproveedor: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFromProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public idProveedor: string,
    private proveedorService: ProveedorService,
    private sweetalert2Service: Sweetalert2Service,
    private validatorsService: ValidatorsService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesCliente();
  }

  opcionesCliente() {
    if (this.idProveedor != null) {
      this.get(this.idProveedor);
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
    this.proveedorService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El Proveedor Se Registró Correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        this.router.navigate(['/pages/proveedor']);
        console.log('Ruta proveedor');
      }, 1500);
    });
  }

  get(idProveedor: string) {
    this.proveedorService.get(idProveedor).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.botonAccion = 'Editar';
        this.proveedor = data.nombre;
        this.idproveedor = data.id;
        console.log('username', this.proveedor);
        MyValidators.setCampo(this.proveedor);
        MyValidators.setCampoDos(this.idproveedor);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.proveedorService.update(this.idProveedor, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('El usuario se edito correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [
        '',
        [Validators.required],
        MyValidators.ValidarCampoExistente(
          this.proveedorService,
          'findById',
          'id'
        ),
      ],
      nombre: [
        '',
        [Validators.required],
        MyValidators.ValidarCampoExistente(
          this.proveedorService,
          'findByProveedor',
          'nombre'
        ),
      ],
      telefono: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      celular: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      direccion: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          ,
          this.validatorsService.validateEmail(),
        ],
      ],
      activo: ['', [Validators.required]],
      usuarioModif: ['MiMascota'],
    });
  }

  get id() {
    return this.form.get('id');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get telefono() {
    return this.form.get('telefono');
  }
  get celular() {
    return this.form.get('celular');
  }
  get direccion() {
    return this.form.get('direccion');
  }
  get email() {
    return this.form.get('email');
  }

  get activo() {
    return this.form.get('activo');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
