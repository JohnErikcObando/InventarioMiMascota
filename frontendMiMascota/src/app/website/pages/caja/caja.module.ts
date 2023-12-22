import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajasComponent } from './components/cajas/cajas.component';
import { DialogFromCajaComponent } from './components/dialog-from-caja/dialog-from-caja.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CajasComponent, DialogFromCajaComponent],
  imports: [
    CommonModule,
    CajaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class CajaModule {}
