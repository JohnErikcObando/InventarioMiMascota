import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaVentaRoutingModule } from './factura-venta-routing.module';
import { FacturaVentaComponent } from './components/factura-venta/factura-venta/factura-venta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogAbonoComponent } from './components/dialog-abono/dialog-abono.component';

@NgModule({
  declarations: [FacturaVentaComponent, DialogAbonoComponent],
  imports: [
    CommonModule,
    FacturaVentaRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class FacturaVentaModule {}
