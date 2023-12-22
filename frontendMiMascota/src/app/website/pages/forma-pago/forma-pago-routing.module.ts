import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaPagosComponent } from './components/forma-pagos/forma-pagos.component';

const routes: Routes = [
  {
    path: '',
    component: FormaPagosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaPagoRoutingModule {}
