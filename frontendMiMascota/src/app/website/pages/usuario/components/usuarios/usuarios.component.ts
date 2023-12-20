import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsuarioService } from '../../../../../core/services/usuario.service';

import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';

import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { DialogFormUsuarioComponent } from '../dialog-form-usuario/dialog-form-usuario.component';
import { MyValidators } from 'src/app/utils/my-validators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  usuario: UsuarioModel[] = [];

  displayedColumns: string[] = [
    'usuario',
    'nombreCompleto',
    'email',
    'activo',
    'accion',
  ];

  dataSource = new MatTableDataSource<UsuarioModel>([]); // Inicializar con un array vacío
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAllUsuario();
  }

  getAllUsuario() {
    this.usuarioService.getAll().subscribe((data) => {
      this.usuario = data;
      this.dataSource = new MatTableDataSource<UsuarioModel>(this.usuario);
      this.dataSource.paginator = this.paginator;
    });
  }

  getUsuario(id: number) {
    this.usuarioService.get(id).subscribe((data) => {
      this.usuario = [data];
    });
  }

  createUsuario() {
    MyValidators.setEstado('Guardar');
    this.dialogUsuario();
  }

  editUsuario(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogUsuario(id);
  }

  deleteUsuario(id: number) {
    // Obtener el usuario antes de la eliminación
    this.getUsuario(id);

    const confirmationMessage =
      'De Eliminar el Usuario!  ' + this.usuario[0].usuario;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.usuarioService
          .patch(this.usuario[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.usuarioService.delete(this.usuario[0].id).subscribe(() => {
              this.sweetalert2Service.swalSuccess(
                'Usuario Eliminado Correctamente'
              );
              setTimeout(() => {
                this.getAllUsuario();
              }, 1500);
            });
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogUsuario(id?: string) {
    const dialogRef = this.dialog
      .open(DialogFormUsuarioComponent, {
        disableClose: true,
        data: id || null,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.getAllUsuario();
        }
      });
  }
}
