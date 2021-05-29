import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { ICliente } from 'src/app/models/ICliente';
import { ClienteService } from 'src/app/api/cliente/cliente.service';

@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css']
})
export class BuscarCotizacionComponent implements OnInit {

  public cotizacionesTotales: ICotizacion[];

  public cotizaciones: ICotizacion[];

  public usuarios: IUsuario[];

  public clientes: ICliente[];

  public cotizacionSelect: number;

  public consulta: string;

  public consultaFormGroup: FormGroup;

  public porSelect: string = "Nombre";

  public ordenadoSelect: string = "ID";

  public ascDesc: string = "asc";

  public resultadoFiltrado: ICotizacion[];

  public filtros = {
    consulta: '',
    por: '',
    ordenado: '',
    orden: ''
  };

  constructor(
    private router: Router,
    private cotizacionService: CotizacionService,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService
  ) {
    this.consultaFormGroup = this._formBuilder.group({
      consultaCtrl: ['', Validators.required],
      porCtrl: ['Nombre', Validators.required],
      tipoCtrl: ['ID', Validators.required],
      ascDescCtrl: ['asc', Validators.required],
    });
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
      this.cotizacionesTotales = cotizaciones;
      this.cotizaciones = this.cotizacionesTotales;
    });
    this.clienteService.obtenerClientesGet().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  obtenerNombreUsuario(id: number) {
    const usuario = this.usuarios.find(usuarios => {
      return usuarios.id === id
    });
    return usuario.usuario;
  }

  obtenerNombreCliente(id: number) {
    const cliente = this.clientes.find(cliente => {
      return cliente.id === id
    });
    return cliente.nombre;
  }

  ngOnInit(): void {

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

  seleccionarCotizacion(cotizacion: ICotizacion) {
    this.cotizacionSelect = cotizacion.id;
  }

  limpiarFiltros() {
    this.consultaFormGroup.controls['consultaCtrl'].setValue('');
    this.consultaFormGroup.controls['porCtrl'].setValue('Nombre');
    this.consultaFormGroup.controls['tipoCtrl'].setValue('ID');
    this.consultaFormGroup.controls['ascDescCtrl'].setValue('asc');
    this.cotizacionSelect = null;
    this.buscarCotizaciones();
  }

  buscarCotizaciones() {
    let resultados;
    let resultadosOrdenados;
    switch (this.filtros.por) {
      case 'Nombre':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreCliente(cotizacion.id_cliente).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.id - cot2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreCliente(cotizacion.id_cliente).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreCliente(cot1.id_cliente) > this.obtenerNombreCliente(cot2.id_cliente)) {
                return 1;
              }
              if (this.obtenerNombreCliente(cot1.id_cliente) < this.obtenerNombreCliente(cot2.id_cliente)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Usuario':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreCliente(cotizacion.id_cliente).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreUsuario(cot1.id_empleado) > this.obtenerNombreUsuario(cot2.id_empleado)) {
                return 1;
              }
              if (this.obtenerNombreUsuario(cot1.id_empleado) < this.obtenerNombreUsuario(cot2.id_empleado)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Estado':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreCliente(cotizacion.id_cliente).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (cot1.estado > cot2.estado) {
                return 1;
              }
              if (cot1.estado < cot2.estado) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          case 'Total':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreCliente(cotizacion.id_cliente).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.total - cot2.total;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          default:
            break
        }
        break;
      case 'Estado':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return cotizacion.estado.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.id - cot2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return cotizacion.estado.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreCliente(cot1.id_cliente) > this.obtenerNombreCliente(cot2.id_cliente)) {
                return 1;
              }
              if (this.obtenerNombreCliente(cot1.id_cliente) < this.obtenerNombreCliente(cot2.id_cliente)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Usuario':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return cotizacion.estado.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreUsuario(cot1.id_empleado) > this.obtenerNombreUsuario(cot2.id_empleado)) {
                return 1;
              }
              if (this.obtenerNombreUsuario(cot1.id_empleado) < this.obtenerNombreUsuario(cot2.id_empleado)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Estado':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return cotizacion.estado.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (cot1.estado > cot2.estado) {
                return 1;
              }
              if (cot1.estado < cot2.estado) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          case 'Total':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return cotizacion.estado.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.total - cot2.total;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          default:
            break
        }
        break;
      case 'Usuario':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreUsuario(cotizacion.id_empleado).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.id - cot2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreUsuario(cotizacion.id_empleado).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreCliente(cot1.id_cliente) > this.obtenerNombreCliente(cot2.id_cliente)) {
                return 1;
              }
              if (this.obtenerNombreCliente(cot1.id_cliente) < this.obtenerNombreCliente(cot2.id_cliente)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Usuario':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreUsuario(cotizacion.id_empleado).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (this.obtenerNombreUsuario(cot1.id_empleado) > this.obtenerNombreUsuario(cot2.id_empleado)) {
                return 1;
              }
              if (this.obtenerNombreUsuario(cot1.id_empleado) < this.obtenerNombreUsuario(cot2.id_empleado)) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Estado':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreUsuario(cotizacion.id_empleado).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              if (cot1.estado > cot2.estado) {
                return 1;
              }
              if (cot1.estado < cot2.estado) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          case 'Total':
            resultados = this.cotizacionesTotales.filter((cotizacion) => {
              return this.obtenerNombreUsuario(cotizacion.id_empleado).toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((cot1, cot2) => {
              return cot1.total - cot2.total;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break
          default:
            break
        }
        break;
      default:
        break;
    }
    this.cotizaciones = this.resultadoFiltrado;
    if (this.cotizaciones.length === 0) {
      this.snackBarService.redSnackBar('No se encontraron resultados.');
    }
  }

  deseleccionar() {
    this.cotizacionSelect = null;
  }

  eliminarCotizacion() {
    const cotizacion = this.cotizacionesTotales.find(cotizacion => cotizacion.id === this.cotizacionSelect);
    this.cotizacionService.eliminarCotizacionDelete(cotizacion).subscribe(res => {
      this.snackBarService.greenSnackBar('Cotización eliminada con éxito.');
      this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
        this.cotizacionesTotales = cotizaciones;
        this.cotizaciones = this.cotizacionesTotales;
      });
    }, error => this.snackBarService.redSnackBar('Ha ocurrido un error al eliminar la cotización.'));
  }

  doubleClick() {
    console.log('sos')
  }
}