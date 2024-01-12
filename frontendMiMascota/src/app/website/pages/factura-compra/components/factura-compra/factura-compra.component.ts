import { Component } from '@angular/core';
import { CajaModel } from 'src/app/core/models/caja.model';
import { FormaPagoModel } from 'src/app/core/models/forma-pago.model';
import { ProveedorModel } from 'src/app/core/models/proveedor.model';
import { ProveedorService } from '../../../../../core/services/proveedor.service';
import { CajaService } from '../../../../../core/services/caja.service';
import { FormaPagoService } from '../../../../../core/services/forma-pago.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { FacturaCompraService } from 'src/app/core/services/factura-compra.service';
import { ProductoModel } from 'src/app/core/models/producto.model';
import { ProductoService } from 'src/app/core/services/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { CompraModel } from 'src/app/core/models/compra.model';
import { startWith, switchMap } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrls: ['./factura-compra.component.scss'],
})
export class FacturaCompraComponent {
  form: FormGroup;
  comprasFormArray: FormArray;

  enterKeyPressed = true;

  date = new FormControl(new Date());

  proveedores: ProveedorModel[] = [];
  proveedoresFiltrados: ProveedorModel[] = [];

  cajas: CajaModel[] = [];
  formasPago: FormaPagoModel[] = [];
  productos: ProductoModel[] = [];

  sumaTotal: number = 0;

  constructor(
    private facturaCompraService: FacturaCompraService,
    private cajaService: CajaService,
    private proveedorService: ProveedorService,
    private formaPagoService: FormaPagoService,
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private sweetalert2Service: Sweetalert2Service
  ) {
    this.form = this.buildForm();
    this.comprasFormArray = this.formBuilder.array([]);
  }

  ngOnInit(): void {
    this.getAllProveedores();
    this.getAllCajas();
    this.getAllFormasPago();
    this.getAllProductos();

    this.valueChangesCampos();

    this.findProveedor();
  }

  save(event: MouseEvent) {
    const data = this.form.value;
    console.log('from', data);

    this.facturaCompraService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'Se registró la Factura correctamente'
      );

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  getAllProveedores() {
    this.proveedorService.getAll().subscribe((data) => {
      this.proveedores = data;
    });
  }

  getAllCajas() {
    this.cajaService.getAll().subscribe((data) => {
      this.cajas = data;
    });
  }

  getAllFormasPago() {
    this.formaPagoService.getAll().subscribe((data) => {
      this.formasPago = data;
    });
  }

  getAllProductos() {
    this.productoService.getAll().subscribe((data) => {
      this.productos = data;
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      cajaId: [1, Validators.required],
      formaPagoId: [1, Validators.required],
      fecha: ['', Validators.required],
      valor: [{ value: '', disabled: true }, Validators.required],
      descuento: [0],
      subtotal: [{ value: '', disabled: true }, Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],
      abono: ['0', Validators.required],
      saldo: [{ value: '', disabled: true }, Validators.required],
      anulado: [false],
      descripcion: [''],
      imagenUrl: ['', Validators.required],
      usuarioModif: ['Mi Mascota'],
      // Estructura para proveedorFactura
      proveedorFactura: this.formBuilder.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        telefono: ['', [Validators.maxLength(10), Validators.minLength(10)]],
        celular: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        direccion: [''],
        email: ['', [Validators.required, Validators.email]],
        activo: [true],
        usuarioModif: ['Mi Mascota'],
      }),
      detalleCompra: this.formBuilder.array([]),
    });
  }

  get detalleCompra(): FormArray {
    return this.form.get('detalleCompra') as FormArray;
  }

  addCompra() {
    const compraForm = this.formBuilder.group({
      productoId: ['', Validators.required],
      cantidad: [1, Validators.required],
      costo: ['', Validators.required],
      venta: ['', Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],
      usuarioModif: ['MiMascota'],
    });

    // Suscripción a cambios en 'cantidad' y 'venta' para recalcular 'total'
    compraForm
      .get('cantidad')
      ?.valueChanges.pipe(startWith(0))
      .subscribe(() => {
        this.calcularTotal(compraForm);
        this.actualizarSumaTotal();
      });

    compraForm
      .get('costo')
      ?.valueChanges.pipe(startWith(0))
      .subscribe(() => {
        this.calcularTotal(compraForm);
        this.actualizarSumaTotal();
      });

    // Añadir el formulario creado al FormArray
    this.detalleCompra.push(compraForm);
  }

  removeCompra(i: number) {
    this.detalleCompra.removeAt(i);
    this.actualizarSumaTotal();
  }

  calcularTotal(compraForm: FormGroup) {
    const cantidad = compraForm.get('cantidad')?.value ?? 0;
    const costo = compraForm.get('costo')?.value ?? 0;

    // Calcula el total multiplicando cantidad por venta
    const total = cantidad * costo;
    compraForm.get('total')?.setValue(total);
  }

  actualizarSumaTotal() {
    // Calcula la suma total de los detalles de compra
    const sumaTotalDetalles = this.detalleCompra.controls.reduce(
      (total, control) => {
        return total + (control.get('total')?.value ?? 0);
      },
      0
    );

    // Obtiene el valor y el descuento del formulario principal
    const valor = this.form.get('valor')?.value ?? 0;
    const descuento = this.form.get('descuento')?.value ?? 0;
    const saldo = this.form.get('abono')?.value ?? 0;

    // Calcula el total sumando la suma total de detalles y restando el descuento
    const total = sumaTotalDetalles - descuento;
    let saldoTotal = total - saldo;

    console.log('saldoTotal', saldoTotal);

    if (saldoTotal < 0) {
      saldoTotal = total;
    }

    // Actualiza el campo 'total' en el formulario principal
    this.form.get('total')?.setValue(total);

    // Actualiza el campo 'valor' en el formulario principal
    this.form.get('valor')?.setValue(sumaTotalDetalles);

    // Actualiza el campo 'saldo' en el formulario principal
    this.form.get('saldo')?.setValue(saldoTotal);
  }

  onProductoSelected(event: MatSelectChange) {
    const selectedProductoId = event.value; // Obtiene el ID seleccionado

    // Encuentra el índice del formulario de compra actual
    const index = this.detalleCompra.controls.findIndex(
      (control) =>
        control &&
        control.get('productoId') &&
        control.get('productoId')!.value === selectedProductoId
    );

    // Verifica si se encontró el formulario de compra correspondiente al producto seleccionado
    if (index !== -1) {
      const compraForm = this.detalleCompra.at(index) as FormGroup | null; // Asegurarse de que sea un FormGroup o null

      if (compraForm) {
        const ventaControl = compraForm.get('venta') as FormControl | null; // Asegurarse de que sea un FormControl o null

        if (ventaControl) {
          this.productoService.get(selectedProductoId).subscribe(
            (producto) => {
              ventaControl.setValue(producto.valor); // Asumiendo que 'valor' es el campo que contiene el valor de venta en tu modelo de Producto
              this.calcularTotal(compraForm); // Recalcula el total después de cargar el valor de venta
              this.actualizarSumaTotal();
            },
            (error) => {
              console.error('Error al cargar el valor de venta', error);
            }
          );
        }
      }
    }
  }

  preventEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  valueChangesCampos() {
    this.form.get('descuento')?.valueChanges.subscribe(() => {
      this.actualizarSumaTotal();
    });

    this.form.get('abono')?.valueChanges.subscribe(() => {
      this.actualizarSumaTotal();
    });
  }

  findProveedor() {
    this.form
      .get('proveedorFactura.nombre')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((nombre: string) => {
        // Filtra los proveedores basándose en el nombre ingresado
        this.proveedoresFiltrados = this.proveedores.filter((proveedor) =>
          (proveedor.nombre || '').includes(nombre)
        );
      });
  }

  // Función para seleccionar un proveedor de la lista filtrada
  selectProveedor(proveedor: ProveedorModel) {
    this.form.get('proveedorFactura')?.patchValue(proveedor);
    // Puedes agregar más lógica aquí si es necesario
  }

  // Función para mostrar el nombre del proveedor en el campo de entrada
  displayProveedorName(proveedor: ProveedorModel | null): string {
    return proveedor ? proveedor.nombre : '';
  }

  get idProveedor() {
    return this.form.get('proveedorFactura.id');
  }

  get nombreProveedor() {
    return this.form.get('proveedorFactura.nombre');
  }

  get telefonoProveedor() {
    return this.form.get('proveedorFactura.telefono');
  }
  get celularProveedor() {
    return this.form.get('proveedorFactura.celular');
  }
  get direccionProveedor() {
    return this.form.get('proveedorFactura.direccion');
  }
  get emailProveedor() {
    return this.form.get('proveedorFactura.email');
  }

  get activoProveedor() {
    return this.form.get('proveedorFactura.activo');
  }

  get usuarioModifProveedor() {
    return this.form.get('proveedorFactura.usuarioModif');
  }
}
