import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MovimientoModel } from 'src/app/core/models/movimiento.model';
import { MovimientoService } from 'src/app/core/services/movimiento.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFormMovimientoComponent } from '../dialog-form-movimiento/dialog-form-movimiento.component';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
})
export class MovimientosComponent {
  movimientos: MovimientoModel[] = [];

  displayedColumns: string[] = [
    'fecha',
    'tipo',
    'descripcion',
    'valor',
    'factura',
    'accion',
  ];

  dataSource = new MatTableDataSource<MovimientoModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private movimientoService: MovimientoService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAllMovimiento();
  }

  getAllMovimiento() {
    this.movimientoService.getAll().subscribe((data) => {
      this.movimientos = data;
      this.dataSource = new MatTableDataSource<MovimientoModel>(
        this.movimientos
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  getMovimiento(id: number) {
    this.movimientoService.get(id).subscribe((data) => {
      this.movimientos = [data];
    });
  }

  editMovimiento(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogMovimiento(id);
  }

  deleteMovimiento(id: number) {
    // Obtener el usuario antes de la eliminación
    this.getMovimiento(id);

    const confirmationMessage =
      'De Eliminar la Movimiento!  ' + this.movimientos[0].id;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.movimientoService
          .patch(this.movimientos[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.movimientoService
              .delete(this.movimientos[0].id)
              .subscribe(() => {
                this.sweetalert2Service.swalSuccess(
                  'Usuario Eliminado Correctamente'
                );
                setTimeout(() => {
                  this.getAllMovimiento();
                }, 1500);
              });
          });
      }
    });
  }

  createMovimiento() {
    MyValidators.setEstado('Guardar');
    this.dialogMovimiento();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogMovimiento(id?: string) {
    const dialogRef = this.dialog
      .open(DialogFormMovimientoComponent, {
        disableClose: true,
        data: id || null,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.getAllMovimiento();
        }
      });
  }
}
