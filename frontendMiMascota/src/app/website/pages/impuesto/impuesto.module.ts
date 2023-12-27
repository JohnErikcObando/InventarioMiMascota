import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpuestoRoutingModule } from './impuesto-routing.module';
import { DialogFormImpuestoComponent } from './components/dialog-form-impuesto/dialog-form-impuesto.component';
import { ImpuestosComponent } from './components/impuestos/impuestos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DialogFormImpuestoComponent, ImpuestosComponent],
  imports: [
    CommonModule,
    ImpuestoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ImpuestoModule {}
