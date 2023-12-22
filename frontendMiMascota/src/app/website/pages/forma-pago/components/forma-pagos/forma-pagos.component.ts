import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormaPagoModel } from 'src/app/core/models/forma-pago.model';
import { FormaPagoService } from 'src/app/core/services/forma-pago.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFromFormaPagoComponent } from '../dialog-from-forma-pago/dialog-from-forma-pago.component';

@Component({
  selector: 'app-forma-pagos',
  templateUrl: './forma-pagos.component.html',
  styleUrls: ['./forma-pagos.component.scss'],
})
export class FormaPagosComponent {
  formaPagos: FormaPagoModel[] = [];

  displayedColumns: string[] = ['nombre', 'accion'];

  dataSource = new MatTableDataSource<FormaPagoModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private formaPagoService: FormaPagoService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.formaPagoService.getAll().subscribe((data) => {
      this.formaPagos = data;
      this.dataSource = new MatTableDataSource<FormaPagoModel>(this.formaPagos);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: number) {
    this.formaPagoService.get(id).subscribe((data) => {
      this.formaPagos = [data];
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
      'De Eliminar la Marca!  ' + this.formaPagos[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.formaPagoService
          .patch(this.formaPagos[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.formaPagoService
              .delete(this.formaPagos[0].id)
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
      .open(DialogFromFormaPagoComponent, {
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
