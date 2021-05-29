import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { ICliente } from 'src/app/models/ICliente';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { IElemento } from 'src/app/models/IElemento';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ReciboService } from 'src/app/api/recibo/recibo.service';
import { IRecibo } from 'src/app/models/IRecibo';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrls: ['./agregar-cotizacion.component.css']
})
export class AgregarCotizacionComponent implements OnInit {

  public fecha = new Date();

  public totalCot: number = 0;

  public subTotalCot: number = 0;

  public cotizaciones: ICotizacion[] = [];

  public clientes: ICliente[] = [];

  public carrito: IElemento[] = [];

  public productos: IProducto[] = [];

  public clienteFormGroup: FormGroup;

  public loadingProduct: boolean = false;

  public productoSeleccionado: number;

  public cliente: ICliente;

  public usuario: IUsuario;

  public clienteRecordado: ICliente = {
    apellidos: '',
    correo: '',
    nombre: '',
    telefono: ''
  };

  constructor(
    private _formBuilder: FormBuilder,
    private cotizacionService: CotizacionService,
    private router: Router,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private snackBarService: SnackBarService,
    private reciboService: ReciboService
  ) {
    this.carrito = this.carritoService.obtenerLista();
    this.loadingProduct = true;
    this.productoService.obtenerProductosGet().subscribe(productos => {
      this.productos = productos;
      this.loadingProduct = false;
    });
    this.clienteRecordado = this.carritoService.obtenerCliente();
    this.clienteFormGroup = this._formBuilder.group({
      idCtrl: [this.sacarID()],
      nombreCtrl: [this.clienteRecordado.nombre, Validators.required],
      apellidosCtrl: [this.clienteRecordado.apellidos, Validators.required],
      telefonoCtrl: [this.clienteRecordado.telefono, Validators.required],
      correoCtrl: [this.clienteRecordado.correo, [Validators.required, Validators.email]],
      checkedCtrl: [false],
    });

    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuario = usuarios.find(usuario => usuario.estado);
    });

    for(let i = 0; i < this.carrito.length; i++) {
      this.subTotalCot += this.carrito[i].subtotal;
    }

    this.totalCot = this.subTotalCot + (this.subTotalCot * 0.16);
  }

  obtenerProductoByID(id: number): IProducto {
    return this.productos.find(producto => producto.id === id);
  }

  sacarID() {
    if (this.cotizaciones.length === 0) return 1;
    let mayor = 0;
    for (let i = 0; i < this.cotizaciones.length; i++) {
      if (mayor < this.cotizaciones[i].id) {
        mayor = this.cotizaciones[i].id
      }
    }
    return mayor + 1;
  }

  ngOnInit(): void {
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizacion => {
      this.cotizaciones = cotizacion;
      this.clienteFormGroup.controls['idCtrl'].setValue(this.sacarID());
    });

    this.clienteFormGroup.controls['nombreCtrl'].valueChanges.subscribe(value => {
      this.cliente = this.clientes.find(cliente => cliente.nombre.trim().toLowerCase() === value.trim().toLowerCase());
      if (this.cliente) {
        this.clienteRecordado.nombre = value;
        this.clienteFormGroup.controls['apellidosCtrl'].setValue(this.cliente.apellidos);
        this.clienteFormGroup.controls['telefonoCtrl'].setValue(this.cliente.telefono);
        this.clienteFormGroup.controls['correoCtrl'].setValue(this.cliente.correo);
      } else {
        this.clienteRecordado.nombre = value;
        this.clienteFormGroup.controls['apellidosCtrl'].setValue('');
        this.clienteFormGroup.controls['telefonoCtrl'].setValue('');
        this.clienteFormGroup.controls['correoCtrl'].setValue('');
      }
    });

    this.clienteFormGroup.controls['apellidosCtrl'].valueChanges.subscribe(value => {
      this.clienteRecordado.apellidos = value;
    });

    this.clienteFormGroup.controls['telefonoCtrl'].valueChanges.subscribe(value => {
      this.clienteRecordado.telefono = value;
    });

    this.clienteFormGroup.controls['correoCtrl'].valueChanges.subscribe(value => {
      this.clienteRecordado.correo = value;
    });

  }

  onSubmitEliminar() {
    this.carritoService.quitarElemento(this.productoSeleccionado);
    this.carrito = this.carritoService.obtenerLista();
  }

  selectProducto(item: IElemento) {
    this.productoSeleccionado = item.id_producto;
    console.log(this.obtenerProductoByID(this.productoSeleccionado));
    console.log(item);
  }

  onSubmitAgregar() {
    this.carritoService.recordarCliente(this.clienteRecordado);
    this.router.navigate(['carrito']);
  }

  onSubmitGuardar() {
    if (!this.cliente) {
      this.cliente = {
        apellidos: this.clienteFormGroup.controls['apellidosCtrl'].value,
        correo: this.clienteFormGroup.controls['correoCtrl'].value,
        nombre: this.clienteFormGroup.controls['nombreCtrl'].value,
        telefono: this.clienteFormGroup.controls['telefonoCtrl'].value,
      }

      console.log(this.cliente)
      this.clienteService.agregarClientePost(this.cliente).subscribe(res => {

        let subtotal = 0;

        for (let i = 0; i < this.carritoService.obtenerLista().length; i++) {
          subtotal += this.carritoService.obtenerLista()[i].subtotal;
        }

        let iva = subtotal * 0.16;

        let total = iva + subtotal;


        const cotizacion: ICotizacion = {
          carrito: this.carritoService.obtenerLista(),
          estado: this.clienteFormGroup.controls['checkedCtrl'].value ? 'Completada' : 'Pendiente',
          id_cliente: res.cliente.id,
          id_empleado: this.usuario.id,
          subtotal: subtotal,
          total: total,
        };

        this.cotizacionService.agregarCotizacionPost(cotizacion).subscribe(res => {
          this.snackBarService.greenSnackBar('Se agregó la cotización con éxito.');
          if(cotizacion.estado === "Completada") {
            const recibo: IRecibo = {
              id_cotizacion: this.sacarID()
            }

            this.reciboService.agregarReciboPost(recibo).subscribe(recibo => {
              this.snackBarService.greenSnackBar('Recibo generado con éxito.');
            });
          }
          this.carritoService.vaciarLista();
          this.router.navigate(['buscar-cotizacion']);
        });
      });
    } else {
      let subtotal = 0;

      for (let i = 0; i < this.carritoService.obtenerLista().length; i++) {
        subtotal += this.carritoService.obtenerLista()[i].subtotal;
      }

      let iva = subtotal * 0.16;

      let total = iva + subtotal;


      const cotizacion: ICotizacion = {
        carrito: this.carritoService.obtenerLista(),
        estado: 'Pendiente',
        id_cliente: this.cliente.id,
        id_empleado: this.usuario.id,
        subtotal: subtotal,
        total: total,
      };

      this.cotizacionService.agregarCotizacionPost(cotizacion).subscribe(res => {
        this.snackBarService.greenSnackBar('Se agregó la cotización con éxito.');
        if(cotizacion.estado === "Completada") {
          const recibo: IRecibo = {
            id_cotizacion: this.sacarID()
          }

          this.reciboService.agregarReciboPost(recibo).subscribe(recibo => {
            this.snackBarService.greenSnackBar('Recibo generado con éxito.');
          });
        }
        this.carritoService.vaciarLista();
        this.router.navigate(['buscar-cotizacion']);
      });
    }
  }

}
