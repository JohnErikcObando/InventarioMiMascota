import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsuarioService } from '../../../../../core/services/usuario.service';
import { UsuarioModel } from 'src/app/core/models/usuario.model';
import { DialogFormUsuarioComponent } from '../dialog-form-usuario/dialog-form-usuario.component';

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
    private usuarioService: UsuarioService
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

  getUsuario() {}

  createUsuario() {
    const dialogRef = this.dialog
      .open(DialogFormUsuarioComponent, {
        disableClose: true,
        height: '510px',
        width: '500px', // Usa disableClose en lugar de disable
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.getAllUsuario();
        }
      });
  }

  editUsuario() {}

  deleteUsuario() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
