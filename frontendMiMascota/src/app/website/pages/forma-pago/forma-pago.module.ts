import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormaPagoRoutingModule } from './forma-pago-routing.module';
import { DialogFromFormaPagoComponent } from './components/dialog-from-forma-pago/dialog-from-forma-pago.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormaPagosComponent } from './components/forma-pagos/forma-pagos.component';

@NgModule({
  declarations: [DialogFromFormaPagoComponent, FormaPagosComponent],
  imports: [
    CommonModule,
    FormaPagoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class FormaPagoModule {}
