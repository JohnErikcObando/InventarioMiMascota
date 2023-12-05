import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { DialogFormUsuarioComponent } from './components/dialog-form-usuario/dialog-form-usuario.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosComponent, DialogFormUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class UsuarioModule {}
