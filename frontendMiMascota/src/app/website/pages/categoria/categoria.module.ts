import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DialogFormCategoriaComponent } from './components/dialog-form-categoria/dialog-form-categoria.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoriasComponent, DialogFormCategoriaComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class CategoriaModule {}
