import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { startWith } from 'rxjs';
import { CajaModel } from 'src/app/core/models/caja.model';
import { ClienteModel } from 'src/app/core/models/cliente.model';
import { FormaPagoModel } from 'src/app/core/models/forma-pago.model';
import { ProductoModel } from 'src/app/core/models/producto.model';
import { CajaService } from 'src/app/core/services/caja.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { FacturaVentaService } from 'src/app/core/services/factura-venta.service';
import { FormaPagoService } from 'src/app/core/services/forma-pago.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { Sweetalert2Service } from 'src/app/shared/services/sweetalert2.service';
import { MyValidators } from 'src/app/utils/my-validators';
import { DialogAbonoComponent } from '../../dialog-abono/dialog-abono.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.scss'],
})
export class FacturaVentaComponent {
  form: FormGroup;
  ventasFormArray: FormArray;

  cajas: CajaModel[] = [];
  formasPago: FormaPagoModel[] = [];
  productos: ProductoModel[] = [];
  clientes: ClienteModel[] = [];
  clientesFiltrados: ClienteModel[] = [];

  date = new FormControl(new Date());

  numeroFactura: string = '';
  busquedaExitosa: boolean = false;

  readOnlyMode = new FormControl(true);

  constructor(
    private fb: FormBuilder,
    private cajaService: CajaService,
    private clienteService: ClienteService,
    private formaPagoService: FormaPagoService,
    private productoService: ProductoService,
    private facturaVentaService: FacturaVentaService,
    private sweetalert2Service: Sweetalert2Service,
    private dialog: MatDialog
  ) {
    this.form = this.buildForm();
    this.ventasFormArray = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getAllClientes();
    this.getAllCajas();
    this.getAllFormasPago();
    this.getAllProductos();
    this.valueChangesCampos();
    this.findCliente();
    this.addVenta();
  }

  save(event: MouseEvent) {
    const data = this.form.value;
    console.log('from', data);

    delete data.buscarFactura;

    this.facturaVentaService.create(data).subscribe((rta) => {
      this.sweetalert2Service.swalSuccess(
        'Se registró la Factura correctamente'
      );

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  }

  preventEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getAllClientes() {
    this.clienteService.getAll().subscribe((data) => {
      this.clientes = data;
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

  buscarFactura() {
    this.numeroFactura = this.form.get('buscarFactura')?.value;

    // Validación de que el campo de búsqueda no esté vacío
    if (this.numeroFactura) {
      this.busquedaExitosa = true;

      // Llama al servicio para obtener la información de la factura
      this.facturaVentaService.get(this.numeroFactura).subscribe(
        (factura) => {
          // Rellena los campos del formulario con la información de la factura encontrada

          console.log(factura);

          console.log(factura.valor);

          // Rellena el formulario de clienteFactura
          this.form.get('clienteFactura')?.patchValue({
            id: factura.cliente.id,
            nombre: factura.cliente.nombre,
            apellido: factura.cliente.apellido,
            direccion: factura.cliente.direccion,
            telefono: factura.cliente.telefono,
            celular: factura.cliente.celular,
            email: factura.cliente.email,
            usuarioModif: factura.cliente.usuarioModif,
          });

          // Rellena los detalles de venta si es necesario
          const detallesVenta = factura.detalleVenta.map((detalle) =>
            this.fb.group({
              productoId: detalle.productoId,
              cantidad: detalle.cantidad,
              valor: detalle.valor,
              total: detalle.total,
              usuarioModif: detalle.usuarioModif,
            })
          );
          this.form.setControl('detalleVenta', this.fb.array(detallesVenta));

          this.form.patchValue({
            fecha: factura.fecha,
            cajaId: factura.cajaId,
            formaPagoId: factura.formaPagoId,
            abono: factura.abono,
            descuento: factura.descuento,
            anulado: factura.anulado,
            descripcion: factura.descripcion,
            usuarioModif: factura.usuarioModif,
          });
          // Establecer busquedaExitosa en true
        },
        (error) => {
          console.error('Error al buscar la factura');

          this.busquedaExitosa = false;
          // this.resetForm();

          this.sweetalert2Service.swalwarning(
            'La factura no se encuentra en el sistema'
          );
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      );
    }
  }

  addAbono() {
    MyValidators.setEstado('Guardar');
    this.dialogAbono(this.numeroFactura);
  }

  saldoFactura(): number {
    const saldo = this.form.get('saldo')?.value ?? 0;
    return saldo;
  }

  buildForm(): FormGroup {
    return this.fb.group({
      cajaId: [2, Validators.required],
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
      usuarioModif: ['Mi Mascota'],
      buscarFactura: [''],
      // Estructura para clienteFactura
      clienteFactura: this.fb.group({
        id: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: [''],
        direccion: [''],
        telefono: ['', [Validators.maxLength(10), Validators.minLength(10)]],
        celular: ['', [Validators.minLength(10), Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        usuarioModif: ['Mi Mascota'],
      }),
      detalleVenta: this.fb.array([]),
    });
  }

  // Función para restablecer el formulario
  resetForm() {
    this.form.reset(); // Esto restablecerá todos los campos a sus valores iniciales
  }

  get detalleVenta(): FormArray {
    return this.form.get('detalleVenta') as FormArray;
  }

  addVenta() {
    const ventaForm = this.fb.group({
      productoId: [
        { value: '', disabled: this.busquedaExitosa },
        Validators.required,
      ],
      cantidad: [
        { value: 1, disabled: this.busquedaExitosa },
        Validators.required,
      ],
      valor: [
        { value: '', disabled: this.busquedaExitosa },
        Validators.required,
      ],
      total: [
        { value: 0, disabled: this.busquedaExitosa },
        Validators.required,
      ],
      usuarioModif: ['MiMascota'],
    });

    // Suscripción a cambios en 'cantidad' y 'venta' para recalcular 'total'
    ventaForm
      .get('cantidad')
      ?.valueChanges.pipe(startWith(0))
      .subscribe(() => {
        this.calcularTotal(ventaForm);
        this.actualizarSumaTotal();
      });

    ventaForm
      .get('valor')
      ?.valueChanges.pipe(startWith(0))
      .subscribe(() => {
        this.calcularTotal(ventaForm);
        this.actualizarSumaTotal();
      });

    // Añadir el formulario creado al FormArray
    this.detalleVenta.push(ventaForm);
  }

  removeVenta(i: number) {
    this.detalleVenta.removeAt(i);
    this.actualizarSumaTotal();
  }

  calcularTotal(ventaForm: FormGroup) {
    const cantidad = ventaForm.get('cantidad')?.value ?? 0;
    const valor = ventaForm.get('valor')?.value ?? 0;

    // Calcula el total multiplicando cantidad por venta
    const total = cantidad * valor;
    ventaForm.get('total')?.setValue(total);
  }

  actualizarSumaTotal() {
    // Calcula la suma total de los detalles de compra
    const sumaTotalDetalles = this.detalleVenta.controls.reduce(
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
    const index = this.detalleVenta.controls.findIndex(
      (control) =>
        control &&
        control.get('productoId') &&
        control.get('productoId')!.value === selectedProductoId
    );

    // Verifica si se encontró el formulario de compra correspondiente al producto seleccionado
    if (index !== -1) {
      const ventaForm = this.detalleVenta.at(index) as FormGroup | null; // Asegurarse de que sea un FormGroup o null

      if (ventaForm) {
        const ventaControl = ventaForm.get('valor') as FormControl | null; // Asegurarse de que sea un FormControl o null

        if (ventaControl) {
          this.productoService.get(selectedProductoId).subscribe(
            (producto) => {
              ventaControl.setValue(producto.valor); // Asumiendo que 'valor' es el campo que contiene el valor de venta en tu modelo de Producto
              this.calcularTotal(ventaForm); // Recalcula el total después de cargar el valor de venta
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

  valueChangesCampos() {
    this.form.get('descuento')?.valueChanges.subscribe(() => {
      this.actualizarSumaTotal();
    });

    this.form.get('abono')?.valueChanges.subscribe(() => {
      this.actualizarSumaTotal();
    });
  }

  findCliente() {
    this.form
      .get('clienteFactura.nombre')
      ?.valueChanges.pipe(startWith(''))
      .subscribe((nombre: string) => {
        // Filtra los clientes basándose en el nombre ingresado
        this.clientesFiltrados = this.clientes.filter((cliente) =>
          (cliente.nombre || '').includes(nombre)
        );
      });
  }

  // Función para seleccionar un clientes de la lista filtrada
  selectCliente(cliente: ClienteModel) {
    this.form.get('clienteFactura')?.patchValue(cliente);
    // Puedes agregar más lógica aquí si es necesario
  }

  // Función para mostrar el nombre del clientes en el campo de entrada
  displayClientesName(cliente: ClienteModel | null): string {
    return cliente ? cliente.nombre : '';
  }

  dialogAbono(factura?: string) {
    const dialogRef = this.dialog
      .open(DialogAbonoComponent, {
        disableClose: true,
        data: factura || null,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === true) {
          this.buscarFactura();
        }
      });
  }

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
  get usuarioModif() {
    return this.form.get('usuarioModif');
  }
  get idCliente() {
    return this.form.get('clienteFactura.id');
  }
  get nombreCliente() {
    return this.form.get('clienteFactura.nombre');
  }
  get apellidoCliente() {
    return this.form.get('clienteFactura.apellido');
  }
  get direccionCliente() {
    return this.form.get('clienteFactura.direccion');
  }
  get telefonoCliente() {
    return this.form.get('clienteFactura.telefono');
  }
  get celularCliente() {
    return this.form.get('clienteFactura.celular');
  }
  get emailCliente() {
    return this.form.get('clienteFactura.email');
  }
  get usuarioModifCliente() {
    return this.form.get('clienteFactura.usuarioModif');
  }
}
