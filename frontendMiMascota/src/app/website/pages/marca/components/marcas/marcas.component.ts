import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MarcaModel } from 'src/app/core/models/marca.model';
import { MarcaService } from '../../../../../core/services/marca.service';
import { Sweetalert2Service } from '../../../../../shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogformMarcaComponent } from '../dialogform-marca/dialogform-marca.component';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent {
  marca: MarcaModel[] = [];

  displayedColumns: string[] = ['nombre', 'descripcion', 'accion'];

  dataSource = new MatTableDataSource<MarcaModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private marcaService: MarcaService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAllMarca();
  }

  getAllMarca() {
    this.marcaService.getAll().subscribe((data) => {
      this.marca = data;
      this.dataSource = new MatTableDataSource<MarcaModel>(this.marca);
      this.dataSource.paginator = this.paginator;
    });
  }

  getMarca(id: number) {
    this.marcaService.get(id).subscribe((data) => {
      this.marca = [data];
    });
  }

  editMarca(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogMarca(id);
  }

  deleteMarca(id: number) {
    // Obtener el usuario antes de la eliminación
    this.getMarca(id);

    const confirmationMessage =
      'De Eliminar la Marca!  ' + this.marca[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.marcaService
          .patch(this.marca[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.marcaService.delete(this.marca[0].id).subscribe(() => {
              this.sweetalert2Service.swalSuccess(
                'Usuario Eliminado Correctamente'
              );
              setTimeout(() => {
                this.getAllMarca();
              }, 1500);
            });
          });
      }
    });
  }

  createMarca() {
    MyValidators.setEstado('Guardar');
    this.dialogMarca();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogMarca(id?: string) {
    const dialogRef = this.dialog
      .open(DialogformMarcaComponent, {
        disableClose: true,
        data: id || null,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.getAllMarca();
        }
      });
  }
}
