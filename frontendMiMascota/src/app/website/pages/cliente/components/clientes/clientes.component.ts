import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteModel } from 'src/app/core/models/cliente.model';

import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogFormClientesComponent } from '../dialog-form-clientes/dialog-form-clientes.component';
import { ClienteService } from 'src/app/core/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  clientes: ClienteModel[] = [];

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'celular',
    'direccion',
    'email',
    'accion',
  ];

  dataSource = new MatTableDataSource<ClienteModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService,
    private sweetalert2Service: Sweetalert2Service
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.clienteService.getAll().subscribe((data) => {
      this.clientes = data;
      this.dataSource = new MatTableDataSource<ClienteModel>(this.clientes);
      this.dataSource.paginator = this.paginator;
    });
  }

  get(id: string) {
    this.clienteService.get(id).subscribe((data) => {
      this.clientes = [data];
    });
  }

  edit(id: string) {
    MyValidators.setEstado('Editar');
    this.dialogCliente(id);
  }

  delete(id: string) {
    // Obtener el usuario antes de la eliminación
    this.get(id);

    const confirmationMessage =
      'De Eliminar la Marca!  ' + this.clientes[0].nombre;

    this.sweetalert2Service.swalConfirm(confirmationMessage).then((result) => {
      if (result.isConfirmed) {
        // Concatenar el usuario actual con información adicional
        const usuarioConcatenado = 'Mi mascota2'; //`${this.usuario[0].usuario} - Eliminado`;

        // Actualizar el usuario antes de la eliminación
        this.clienteService
          .patch(this.clientes[0].id, { usuarioModif: usuarioConcatenado })
          .subscribe(() => {
            // Eliminar el usuario después de actualizar
            this.clienteService.delete(this.clientes[0].id).subscribe(() => {
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
    this.dialogCliente();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dialogCliente(id?: string) {
    const dialogRef = this.dialog
      .open(DialogFormClientesComponent, {
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
