import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ImpuestoModel } from 'src/app/core/models/impuesto.model';
import { ImpuestoService } from 'src/app/core/services/impuesto.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFormImpuestoComponent } from '../dialog-form-impuesto/dialog-form-impuesto.component';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss'],
})
export class ImpuestosComponent {
  impuesto: ImpuestoModel[] = [];

  displayedColumns: string[] = ['nombre', 'porcentaje', 'accion'];

  dataSource = new MatTableDataSource<ImpuestoModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private impuestoService: ImpuestoService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.impuestoService.getAll().subscribe((data) => {
      this.impuesto = data;
      this.dataSource = new MatTableDataSource<ImpuestoModel>(this.impuesto);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: number) {
    this.impuestoService.get(id).subscribe((data) => {
      this.impuesto = [data];
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
      'De Eliminar la Marca!  ' + this.impuesto[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.impuestoService
          .patch(this.impuesto[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.impuestoService.delete(this.impuesto[0].id).subscribe(() => {
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
      .open(DialogFormImpuestoComponent, {
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
