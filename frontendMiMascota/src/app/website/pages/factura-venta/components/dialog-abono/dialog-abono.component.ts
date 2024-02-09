import { Component, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AbonosFacturaVentaModel } from 'src/app/core/models/abonos-factura-venta.model';
import { FormaPagoModel } from 'src/app/core/models/forma-pago.model';
import { AbonosFacturaVentaService } from 'src/app/core/services/abonos-factura-venta.service';
import { FormaPagoService } from 'src/app/core/services/forma-pago.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { FacturaVentaService } from '../../../../../core/services/factura-venta.service';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dialog-abono',
  templateUrl: './dialog-abono.component.html',
  styleUrls: ['./dialog-abono.component.scss'],
})
export class DialogAbonoComponent {
  form: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: String = 'Guardar';
  totalAbono: number = 0;
  saldoAbono: number = 0;

  abonos: AbonosFacturaVentaModel[] = [];

  // date = new FormControl(new Date());

  formasPago: FormaPagoModel[] = [];

  displayedColumns: string[] = [
    'fecha',
    'recibo',
    'formaPago',
    'descripcion',
    'anulado',
    'valor',
  ];

  dataSource = new MatTableDataSource<AbonosFacturaVentaModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public factura: any,
    private abonosFacturaVentaService: AbonosFacturaVentaService,
    private sweetalert2Service: Sweetalert2Service,
    private formaPagoService: FormaPagoService,
    private facturaVentaService: FacturaVentaService
  ) {
    this.form = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAllFormasPago();
    this.getAllAbonos(this.factura.factura);

    console.log(
      'nroFactura',
      this.factura.factura,
      'saldo',
      this.factura.saldo
    );
  }

  save(event: MouseEvent) {
    if (this.botonAccion === 'Guardar') {
      this.create();
    } else {
      this.botonAccion === 'Editar';
      // this.update();
    }
  }

  create() {
    const data = this.form.value;
    console.log(data);

    this.abonosFacturaVentaService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess('La Abono Se Registró Correctamente');
      this.dialogRef.close();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    });
  }

  getAllAbonos(factura: string) {
    this.abonosFacturaVentaService.findByFactura(factura).subscribe((data) => {
      // Si data es un objeto, conviértelo en un array para asegurar la consistencia.
      this.abonos = Array.isArray(data) ? data : [data];

      const abonosMapped = this.abonos.map((abono) => ({
        ...abono,
        formaPago: abono.forma_pago?.nombre,
      }));

      this.dataSource = new MatTableDataSource<AbonosFacturaVentaModel>(
        this.abonos
      );
      this.dataSource.paginator = this.paginator;
    });

    this.totalAbono = this.getTotalCost();

    this.saldoAbono = this.factura.saldo;
  }

  getAllFormasPago() {
    this.formaPagoService.getAll().subscribe((data) => {
      this.formasPago = data;
    });
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      facturaVentaId: [this.factura.factura, Validators.required],
      formaPagoId: [1, Validators.required],
      fecha: [new Date(), Validators.required],
      valor: [
        '',
        [
          Validators.required,
          Validators.min(0), // Asegura que el valor no sea menor a 0
          Validators.max(this.factura.saldo), // Asegura que el valor no sea mayor al saldo
        ],
      ],
      descripcion: [''],
      anulado: [false],
      usuarioModif: ['MiMascota'],
    });
  }

  get facturaVentaId() {
    return this.form.get('facturaVentaId');
  }
  get formaPagoId() {
    return this.form.get('formaPagoId');
  }
  get fecha() {
    return this.form.get('fecha');
  }
  get valor() {
    return this.form.get('valor');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get anulado() {
    return this.form.get('anulado');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
  }

  getTotalCost() {
    return this.abonos
      .map((t) => t.valor)
      .reduce((acc, value) => acc + value, 0);
  }
}
