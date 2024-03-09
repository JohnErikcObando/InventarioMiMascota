import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { DialogFormMovimientoComponent } from './components/dialog-form-movimiento/dialog-form-movimiento.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MovimientosComponent,
    DialogFormMovimientoComponent
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class MovimientoModule { }
