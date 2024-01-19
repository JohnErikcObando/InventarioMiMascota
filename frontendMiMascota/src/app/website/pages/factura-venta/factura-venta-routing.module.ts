import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaVentaComponent } from './components/factura-venta/factura-venta/factura-venta.component';

const routes: Routes = [
  {
    path: '',
    component: FacturaVentaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaVentaRoutingModule {}
