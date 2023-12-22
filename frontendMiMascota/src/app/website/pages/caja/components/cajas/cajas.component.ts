import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CajaModel } from 'src/app/core/models/caja.model';
import { CajaService } from 'src/app/core/services/caja.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFromCajaComponent } from '../dialog-from-caja/dialog-from-caja.component';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss'],
})
export class CajasComponent {
  cajas: CajaModel[] = [];

  displayedColumns: string[] = [
    'nombre',
    'numFactura',
    'prefijo',
    'tipoDocumento',
    'accion',
  ];

  dataSource = new MatTableDataSource<CajaModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private cajaService: CajaService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cajaService.getAll().subscribe((data) => {
      this.cajas = data;
      this.dataSource = new MatTableDataSource<CajaModel>(this.cajas);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: number) {
    this.cajaService.get(id).subscribe((data) => {
      this.cajas = [data];
    });
  }

  edit(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogCaja(id);
  }

  delete(id: number) {
    // Obtener el usuario antes de la eliminación
    this.get(id);

    const confirmationMessage =
      'De Eliminar la Marca!  ' + this.cajas[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.cajaService
          .patch(this.cajas[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.cajaService.delete(this.cajas[0].id).subscribe(() => {
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
    this.dialogCaja();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogCaja(id?: string) {
    const dialogRef = this.dialog
      .open(DialogFromCajaComponent, {
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
