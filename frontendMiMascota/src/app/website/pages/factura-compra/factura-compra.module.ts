import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaCompraRoutingModule } from './factura-compra-routing.module';
import { FacturaCompraComponent } from './components/factura-compra/factura-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FacturaCompraComponent],
  imports: [
    CommonModule,
    FacturaCompraRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
  ],
})
export class FacturaCompraModule {}
