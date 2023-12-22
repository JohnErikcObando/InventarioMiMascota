import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from 'src/app/core/services/menu.service';
import { DialogFromFormaPagoComponent } from './formaPago/components/dialog-from-forma-pago/dialog-from-forma-pago.component';

@NgModule({
  declarations: [
    DialogFromFormaPagoComponent
  ],
  imports: [CommonModule, PagesRoutingModule, HttpClientModule],
  providers: [MenuService],
})
export class PagesModule {}
