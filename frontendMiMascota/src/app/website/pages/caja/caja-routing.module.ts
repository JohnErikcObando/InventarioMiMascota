import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajasComponent } from './components/cajas/cajas.component';

const routes: Routes = [
  {
    path: '',
    component: CajasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CajaRoutingModule {}
