import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { DialogFromProveedorComponent } from './components/dialog-from-proveedor/dialog-from-proveedor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProveedoresComponent, DialogFromProveedorComponent],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class ProveedorModule {}
