import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaCompraComponent } from './components/factura-compra/factura-compra.component';

const routes: Routes = [
  {
    path: '',
    component: FacturaCompraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaCompraRoutingModule {}
