import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcasComponent } from './components/marcas/marcas.component';
import { DialogformMarcaComponent } from './components/dialogform-marca/dialogform-marca.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MarcasComponent, DialogformMarcaComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class MarcaModule {}
