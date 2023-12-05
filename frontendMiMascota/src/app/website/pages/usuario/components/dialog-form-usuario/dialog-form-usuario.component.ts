import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AjustarTextoService } from 'src/app/shared/services/ajustar-texto.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

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

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUsuario: UsuarioModel,
    private ajustarTextoService: AjustarTextoService,
    private usuarioService: UsuarioService,
    private validatorsService: ValidatorsService
  ) {
    this.formUsuario = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.usuarioModal();
  }

  usuarioModal() {
    if (this.dataUsuario != null) {
      this.formUsuario.patchValue({
        rolUsuario: this.dataUsuario.rolUsuarioId,
        usuario: this.dataUsuario.usuario,
        password: this.dataUsuario.password,
        nombre: this.dataUsuario.nombre,
        apelllido: this.dataUsuario.apellido,
        email: this.dataUsuario.email,
        activo: this.dataUsuario.activo,
        usuarioModif: this.dataUsuario.usuarioModif,
      });
    }
  }

  create() {}

  edit() {}

  update() {}

  delete() {}

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
      rolUsuario: ['', Validators.required],
      usuario: ['', Validators.required],
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

  get rolUsuario() {
    return this.formUsuario.get('rolUsuario');
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
