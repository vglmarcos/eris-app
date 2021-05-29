import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/components/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { ReciboService } from 'src/app/api/recibo/recibo.service';
import { IRecibo } from 'src/app/models/IRecibo';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { ICliente } from 'src/app/models/ICliente';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';

export interface tablaRecibos {
  id: number,
  id_cotizacion: number,
  cliente: string,
  usuario: string,
  total: number,
  fecha: Date
}

@Component({
  selector: 'app-buscar-recibo',
  templateUrl: './buscar-recibo.component.html',
  styleUrls: ['./buscar-recibo.component.css']
})
export class BuscarReciboComponent implements OnInit {

  public recibosTotales: IRecibo[];

  public recibos: IRecibo[];

  public reciboSelect: number;

  public consulta: string;

  public consultaFormGroup: FormGroup;

  public porSelect: string = "Nombre";

  public ordenadoSelect: string = "ID";

  public ascDesc: string = "asc";

  public resultadoFiltrado: IRecibo[];

  public cotizaciones: ICotizacion[];

  public usuarios: IUsuario[];

  public clientes: ICliente[];

  public datosTabla: tablaRecibos[] = [];

  public filtros = {
    consulta: '',
    por: '',
    ordenado: '',
    orden: ''
  };

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private reciboService: ReciboService,
    private cotizacionService: CotizacionService,
    private clienteService: ClienteService,
    public snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {
    this.consultaFormGroup = this._formBuilder.group({
      consultaCtrl: ['', Validators.required],
      porCtrl: ['Cliente', Validators.required],
      tipoCtrl: ['ID', Validators.required],
      ascDescCtrl: ['asc', Validators.required],
    });
    this.reciboService.obtenerRecibosGet().subscribe(recibos => {
      this.recibosTotales = recibos;
      this.recibos = this.recibosTotales;
    });
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
      this.cotizaciones = cotizaciones;
    });
    this.clienteService.obtenerClientesGet().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  ngOnInit() {

    this.consultaFormGroup.controls['porCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });

    this.consultaFormGroup.controls['tipoCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });

    this.consultaFormGroup.controls['ascDescCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: value
      };
    });


    this.consultaFormGroup.controls['consultaCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });

  }

  obtenerNombreCliente(id: number) {
    const cotizacion = this.cotizaciones.find(cot => cot.id == id);
    const cliente = this.clientes.find(cliente => {
      return cliente.id === cotizacion.id_cliente
    });
    return cliente.nombre;
  }

  obtenerNombreUsuario(id: number) {
    const cotizacion = this.cotizaciones.find(cot => cot.id == id);
    const usuario = this.usuarios.find(usuarios => {
      return usuarios.id === cotizacion.id_empleado
    });
    return usuario.usuario;
  }

  obtenerTotal(id: number) {
    const cotizacion = this.cotizaciones.find(cotizacion => {
      return cotizacion.id === id
    });
    return cotizacion.total;
  }

  seleccionarRecibo(recibo: IRecibo) {
    this.reciboSelect = recibo.id;
    // const openRecibo = document.querySelector('aside');

    // openRecibo.addEventListener('dblclick', function (e) {
    //   openRecibo.classList.toggle('large');
    // });
  }

  limpiarFiltros() {
    this.consultaFormGroup.controls['consultaCtrl'].setValue('');
    this.consultaFormGroup.controls['porCtrl'].setValue('Cliente');
    this.consultaFormGroup.controls['tipoCtrl'].setValue('ID');
    this.consultaFormGroup.controls['ascDescCtrl'].setValue('asc');
    this.reciboSelect = null;
    this.buscarRecibos();
  }

  buscarRecibos() {

    // this.router.navigate(['visualizar-recibo']);
  }

  deseleccionar() {
    this.reciboSelect = null;
  }

  onSubmitEliminar() {
    this.reciboService.obtenerRecibosGet().subscribe(productos => {
      const producto = productos.find(prod => prod.id === this.reciboSelect);
      const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
        data: '¿Realmente deseas eliminar este recibo?',
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.res) {
          this.reciboService.eliminarReciboDelete(producto).subscribe(res => {
            this.snackBarService.greenSnackBar('Recibo eliminado con éxito');
            this.reciboService.obtenerRecibosGet().subscribe(recibos => {
              this.recibosTotales = recibos;
              this.recibos = this.recibosTotales;
            });
            this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
              this.cotizaciones = cotizaciones;
            });
            this.clienteService.obtenerClientesGet().subscribe(clientes => {
              this.clientes = clientes;
            });
            this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
              this.usuarios = usuarios;
            });
          });
        } else {
          this.snackBarService.redSnackBar('Eliminación de recibo cancelada');
          console.log(`Exit on click outside`);
        }
      });
    });
  }



}
