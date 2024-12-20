import { FacturaVentaModule } from './factura-venta/factura-venta.module';
import { CategoriaModule } from './categoria/categoria.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { EmpresaModule } from './empresa/empresa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MarcaModule } from './marca/marca.module';
import { CajaModule } from './caja/caja.module';
import { FormaPagoModule } from './forma-pago/forma-pago.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ClienteModule } from './cliente/cliente.module';
import { ImpuestoModule } from './impuesto/impuesto.module';
import { ProductoModule } from './producto/producto.module';
import { FacturaCompraModule } from './factura-compra/factura-compra.module';
import { MovimientoModule } from './movimiento/movimiento.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dash-board/dash-board.module').then(
            (m) => m.DashBoardModule
          ),
      },
      {
        path: 'empresa',
        loadChildren: () =>
          import('./empresa/empresa.module').then((m) => EmpresaModule),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./usuario/usuario.module').then((m) => UsuarioModule),
      },
      {
        path: 'marca',
        loadChildren: () =>
          import('./marca/marca.module').then((m) => MarcaModule),
      },
      {
        path: 'categoria',
        loadChildren: () =>
          import('./categoria/categoria.module').then((m) => CategoriaModule),
      },
      {
        path: 'caja',
        loadChildren: () =>
          import('./caja/caja.module').then((m) => CajaModule),
      },
      {
        path: 'formaPago',
        loadChildren: () =>
          import('./forma-pago/forma-pago.module').then((m) => FormaPagoModule),
      },
      {
        path: 'proveedor',
        loadChildren: () =>
          import('./proveedor/proveedor.module').then((m) => ProveedorModule),
      },
      {
        path: 'cliente',
        loadChildren: () =>
          import('./cliente/cliente.module').then((m) => ClienteModule),
      },
      {
        path: 'impuesto',
        loadChildren: () =>
          import('./impuesto/impuesto.module').then((m) => ImpuestoModule),
      },
      {
        path: 'producto',
        loadChildren: () =>
          import('./producto/producto.module').then((m) => ProductoModule),
      },
      {
        path: 'facturaCompra',
        loadChildren: () =>
          import('./factura-compra/factura-compra.module').then(
            (m) => FacturaCompraModule
          ),
      },
      {
        path: 'facturaVenta',
        loadChildren: () =>
          import('./factura-venta/factura-venta.module').then(
            (m) => FacturaVentaModule
          ),
      },
      {
        path: 'movimiento',
        loadChildren: () =>
          import('./movimiento/movimiento.module').then(
            (m) => MovimientoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
