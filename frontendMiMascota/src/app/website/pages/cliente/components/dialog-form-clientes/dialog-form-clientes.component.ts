import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-dialog-form-clientes',
  templateUrl: './dialog-form-clientes.component.html',
  styleUrls: ['./dialog-form-clientes.component.scss'],
})
export class DialogFormClientesComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  identificacion: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public idCliente: string,
    private clienteService: ClienteService,
    private sweetalert2Service: Sweetalert2Service,
    private validatorsService: ValidatorsService
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.opcionesCliente();
  }

  opcionesCliente() {
    if (this.idCliente != null) {
      this.get(this.idCliente);
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
    this.clienteService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El usuario se registró correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idCliente: string) {
    this.clienteService.get(idCliente).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        console.log('data', data);
        this.botonAccion = 'Editar';
        this.identificacion = data.id;
        MyValidators.setCampoDos(this.identificacion);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.form.value;
    this.clienteService.update(this.idCliente, data).subscribe((rta) => {
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
          this.clienteService,
          'findById',
          'id'
        ),
      ],
      nombre: ['', [Validators.required]],
      apellido: [''],
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
      usuarioModif: ['MiMascota'],
    });
  }

  get id() {
    return this.form.get('id');
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
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

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
}
