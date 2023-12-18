import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Models
import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { RolUsuarioModel } from '../../../../../core/models/rol-usuario.model';

// Services
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AjustarTextoService } from 'src/app/shared/services/ajustar-texto.service';
import { RolUsuarioService } from 'src/app/core/services/rol-usuario.service';

import { Sweetalert2Service } from 'src/app/core/services/sweetalert2.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { MyValidators } from '../../../../../utils/my-validators';

@Component({
  selector: 'app-dialog-form-usuario',
  templateUrl: './dialog-form-usuario.component.html',
  styleUrls: ['./dialog-form-usuario.component.scss'],
})
export class DialogFormUsuarioComponent {
  formUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';

  rolUsuarios: RolUsuarioModel[] = [];

  hide = true;
  username: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<DialogFormUsuarioComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public idUsuario: number,
    private ajustarTextoService: AjustarTextoService,
    private usuarioService: UsuarioService,
    private validatorsService: ValidatorsService,
    private rolUsuarioService: RolUsuarioService,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.formUsuario = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAllRolUsuario();
    this.opcionesUsuario();
  }

  opcionesUsuario() {
    if (this.idUsuario != null) {
      this.get(this.idUsuario);
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
    const data = this.formUsuario.value;
    this.usuarioService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'El usuario se registró correctamente'
      );
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  get(idusuario: number) {
    this.usuarioService.get(idusuario).subscribe({
      next: (data) => {
        this.formUsuario.patchValue(data);
        this.botonAccion = 'Editar';
        this.username = data.usuario;
        console.log('username', this.username);

        MyValidators.setUsername(this.username);

        // Verificar el valor de activo y asignarlo al formulario
        const activoControl = this.formUsuario.get('activo');
        if (activoControl && data.activo !== null) {
          activoControl.setValue(data.activo ? 'true' : 'false');
        }
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  update() {
    const data = this.formUsuario.value;
    this.usuarioService.update(this.idUsuario, data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('El usuario se edito correctamente');
      this.dialogRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  delete() {}

  private getAllRolUsuario() {
    this.rolUsuarioService.getAll().subscribe((data) => {
      this.rolUsuarios = data;
    });
  }

  ajustarTexto(): void {
    const nombreControl = this.formUsuario.get('nombre');
    const apellidoControl = this.formUsuario.get('apellido');

    if (nombreControl && nombreControl.value) {
      const nombreAjustado = this.ajustarTextoService.ajustarTexto(
        nombreControl.value,
        false
      );
      nombreControl.setValue(nombreAjustado);
    }

    if (apellidoControl && apellidoControl.value) {
      const apellidoAjustado = this.ajustarTextoService.ajustarTexto(
        apellidoControl.value,
        true
      );
      apellidoControl.setValue(apellidoAjustado);
    }
  }

  private buildForm() {
    this.formUsuario = this.formBuilder.group({
      rolUsuarioId: ['', Validators.required],
      usuario: [
        '',
        [Validators.required, Validators.minLength(4)],
        MyValidators.ValidarUsername(this.usuarioService),
      ],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          ,
          this.validatorsService.validateEmail(),
        ],
      ],
      activo: ['', Validators.required],
      usuarioModif: ['MiMascota'],
    });
  }

  get rolUsuarioId() {
    return this.formUsuario.get('rolUsuarioId');
  }

  get usuario() {
    return this.formUsuario.get('usuario');
  }

  get password() {
    return this.formUsuario.get('password');
  }

  get nombre() {
    return this.formUsuario.get('nombre');
  }

  get apellido() {
    return this.formUsuario.get('apellido');
  }

  get email() {
    return this.formUsuario.get('email');
  }

  get activo() {
    return this.formUsuario.get('activo');
  }

  get usuarioModif() {
    return this.formUsuario.get('usuarioModif');
  }
}
