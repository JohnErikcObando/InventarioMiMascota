import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { DialogFromProductoComponent } from '../dialog-from-producto/dialog-from-producto.component';
import { MyValidators } from 'src/app/utils/my-validators';
import { ProductoModel } from 'src/app/core/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  productos: ProductoModel[] = [];

  displayedColumns: string[] = [
    'nombre',
    'marca',
    'categoria',
    'codigo',
    'descripcion',
    'valor',
    'accion',
  ];

  dataSource = new MatTableDataSource<ProductoModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productoService.getAll().subscribe((data) => {
      this.productos = data;

      this.productos.forEach((producto) => {
        producto.marcaNombre = producto.marca.nombre;
        producto.categoriaNombre = producto.categoria.nombre;
      });

      this.dataSource = new MatTableDataSource<ProductoModel>(this.productos);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: number) {
    this.productoService.get(id).subscribe((data) => {
      this.productos = [data];
    });
  }

  edit(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogCategoria(id);
  }

  delete(id: number) {
    // Obtener el usuario antes de la eliminación
    this.get(id);

    const confirmationMessage =
      'De Eliminar la Marca!  ' + this.productos[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.productoService
          .patch(this.productos[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.productoService.delete(this.productos[0].id).subscribe(() => {
              this.sweetalert2Service.swalSuccess(
                'Usuario Eliminado Correctamente'
              );
              setTimeout(() => {
                this.getAll();
              }, 1500);
            });
          });
      }
    });
  }

  create() {
    MyValidators.setEstado('Guardar');
    this.dialogCategoria();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogCategoria(id?: string) {
    const dialogRef = this.dialog
      .open(DialogFromProductoComponent, {
        disableClose: true,
        data: id || null,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.getAll();
        }
      });
  }
}
