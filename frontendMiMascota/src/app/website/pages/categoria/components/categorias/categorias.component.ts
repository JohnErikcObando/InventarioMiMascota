import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaModel } from 'src/app/core/models/categoria.model';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFormCategoriaComponent } from '../dialog-form-categoria/dialog-form-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent {
  categoria: CategoriaModel[] = [];

  displayedColumns: string[] = ['nombre', 'descripcion', 'accion'];

  dataSource = new MatTableDataSource<CategoriaModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private categoriaService: CategoriaService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.categoriaService.getAll().subscribe((data) => {
      this.categoria = data;
      this.dataSource = new MatTableDataSource<CategoriaModel>(this.categoria);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: number) {
    this.categoriaService.get(id).subscribe((data) => {
      this.categoria = [data];
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
      'De Eliminar la Marca!  ' + this.categoria[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.categoriaService
          .patch(this.categoria[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.categoriaService.delete(this.categoria[0].id).subscribe(() => {
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
      .open(DialogFormCategoriaComponent, {
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
