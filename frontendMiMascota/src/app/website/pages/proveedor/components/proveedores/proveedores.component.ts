import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorModel } from 'src/app/core/models/proveedor.model';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFromProveedorComponent } from '../dialog-from-proveedor/dialog-from-proveedor.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent {
  proveedores: ProveedorModel[] = [];

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'celular',
    'direccion',
    'email',
    'activo',
    'accion',
  ];

  dataSource = new MatTableDataSource<ProveedorModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private proveedorService: ProveedorService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.proveedorService.getAll().subscribe((data) => {
      this.proveedores = data;
      this.dataSource = new MatTableDataSource<ProveedorModel>(
        this.proveedores
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: string) {
    this.proveedorService.get(id).subscribe((data) => {
      this.proveedores = [data];
    });
  }

  edit(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogCategoria(id);
  }

  delete(id: string) {
    // Obtener el usuario antes de la eliminación
    this.get(id);

    const confirmationMessage =
      'De Eliminar la Marca!  ' + this.proveedores[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.proveedorService
          .patch(this.proveedores[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.proveedorService
              .delete(this.proveedores[0].id)
              .subscribe(() => {
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
      .open(DialogFromProveedorComponent, {
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
