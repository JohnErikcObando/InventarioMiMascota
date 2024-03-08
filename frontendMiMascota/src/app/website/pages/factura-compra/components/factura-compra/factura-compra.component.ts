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
import { startWith } from 'rxjs';
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

  proveedores: ProveedorModel[] = [];
  proveedoresFiltrados: ProveedorModel[] = [];

  cajas: CajaModel[] = [];
  formasPago: FormaPagoModel[] = [];

  productos: ProductoModel[] = [];
  productosFiltrados: ProductoModel[] = [];
  idProducto: number = 0;

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
    this.findProducto();
  }

  save(event: MouseEvent) {
    const data = this.form.value;

    delete data.nombreProducto;

    this.facturaCompraService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'La Factura Compra Se Registró Correctamente'
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
      fecha: [new Date(), Validators.required],
      valor: [0, Validators.required],
      descuento: [0, Validators.required],
      subtotal: [0, Validators.required],
      total: [0, Validators.required],
      abono: [0, Validators.required],
      saldo: [0, Validators.required],
      anulado: [false],
      descripcion: [''],
      imagenUrl: ['', Validators.required],
      usuarioModif: ['Mi Mascota'],
      nombreProducto: [''],
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

  // ---- agregar un producto
  addCompra() {
    // Obtener el id del producto'
    const idProducto = this.idProducto;

    // Verificar si hay un valor en el campo 'nombreProducto'
    if (idProducto !== 0) {
      // Crear un nuevo formulario de compra
      const compraForm = this.formBuilder.group({
        productoId: [0, Validators.required],
        cantidad: [1, Validators.required],
        costo: ['', Validators.required],
        venta: ['', Validators.required],
        total: [0, Validators.required],
        usuarioModif: ['MiMascota'],
      });

      console.log('idproducto', idProducto);

      // Establecer el valor del campo 'productoId' en el control del formulario
      compraForm.get('productoId')?.setValue(idProducto);

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

      // Añadir el nuevo formulario de compra al FormArray
      this.detalleCompra.push(compraForm);

      this.onProductoSelected(idProducto);

      console.log('nombreProducto', this.form.get('nombreProducto')?.value);
    }
    // Reiniciar el valor del campo 'nombreProducto'
    this.form.get('nombreProducto')?.setValue('');
    this.idProducto = 0;
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

  onProductoSelected(productoId: number) {
    const selectedProductoId = productoId; // Obtiene el ID seleccionado

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
          this.productoService.get(selectedProductoId).subscribe({
            next: (producto: ProductoModel) => {
              ventaControl.setValue(producto.valor);
              this.calcularTotal(compraForm);
              this.actualizarSumaTotal();
            },
            error: (error) => {
              console.error('Error al cargar el valor de venta', error);
            },
          });
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

  // -------------------------- buscar Proveedor --------------------------------------------
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
  }

  // --------------------------------------------------------------------------------------
  // -------------------------- buscar Producto --------------------------------------------

  findProducto() {
    this.form
      .get('nombreProducto')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((nombre: string) => {
        // Filtra los productos basándose en el nombre ingresado
        this.productosFiltrados = this.productos.filter((producto) =>
          (producto.nombre || '').includes(nombre)
        );
      });
  }

  // Función para seleccionar un producto de la lista filtrada
  selectProducto(producto: ProductoModel) {
    this.form.get('nombreProducto')?.setValue(producto.nombre);
    this.idProducto = producto.id;
  }

  // --------------------------------------------------------------------------------------

  get cajaId() {
    return this.form.get('cajaId');
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

  get descuento() {
    return this.form.get('descuento');
  }
  get subtotal() {
    return this.form.get('subtotal');
  }

  get total() {
    return this.form.get('total');
  }

  get abono() {
    return this.form.get('abono');
  }

  get saldo() {
    return this.form.get('saldo');
  }

  get anulado() {
    return this.form.get('anulado');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get imagenUrl() {
    return this.form.get('imagenUrl');
  }

  get usuarioModif() {
    return this.form.get('usuarioModif');
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

  get nombreProducto() {
    return this.form.get('nombreProducto');
  }
}
