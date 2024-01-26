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

  abonos: AbonosFacturaVentaModel[] = [];

  date = new FormControl(new Date());

  formasPago: FormaPagoModel[] = [];

  displayedColumns: string[] = [
    'fecha',
    'recibo',
    'formaPago',
    'valor',
    'descripcion',
    'anulado',
  ];

  dataSource = new MatTableDataSource<AbonosFacturaVentaModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAbonoComponent>,
    @Inject(MAT_DIALOG_DATA) public factura: string,
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
    this.getAllAbonos(this.factura);

    if (this.facturaVentaId) {
      this.facturaVentaId.setValue(this.factura);
    }
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
      this.sweetalert2Service.swalSuccess(
        'El usuario se registró correctamente'
      );
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

      console.log('abonos: ', this.abonos);

      this.dataSource = new MatTableDataSource<AbonosFacturaVentaModel>(
        this.abonos
      );
      this.dataSource.paginator = this.paginator;
    });
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
      facturaVentaId: ['', Validators.required],
      formaPagoId: [1, Validators.required],
      fecha: [new Date(), Validators.required],
      valor: ['', Validators.required],
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
