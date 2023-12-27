import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { DialogFromProductoComponent } from './components/dialog-from-producto/dialog-from-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductosComponent, DialogFromProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProductoModule {}
