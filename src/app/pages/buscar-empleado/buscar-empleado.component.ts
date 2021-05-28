import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent implements OnInit {

  public usuariosTotales: IUsuario[];

  public usuarios: IUsuario[];

  public usuarioSelect: number;

  public consulta: string;

  public consultaFormGroup: FormGroup;

  public porSelect: string = "Nombre";

  public ordenadoSelect: string = "ID";

  public ascDesc: string = "asc";

  public resultadoFiltrado: IUsuario[];

  public filtros = {
    consulta: '',
    por: '',
    ordenado: '',
    orden: ''
  };

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
  ) {
    this.consultaFormGroup = this._formBuilder.group({
      consultaCtrl: ['', Validators.required],
      porCtrl: ['Nombre', Validators.required],
      tipoCtrl: ['ID', Validators.required],
      ascDescCtrl: ['asc', Validators.required],
    });
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuariosTotales = usuarios;
      this.usuarios = this.usuariosTotales;
    });
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

  seleccionarUsuario(usuario: IUsuario) {
    this.usuarioSelect = usuario.id;
  }

  limpiarFiltros() {

  }

  buscarEmpleados() {
    let resultados;
    let resultadosOrdenados;
    switch (this.filtros.por) {
      case 'Nombre':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              return usuario1.id - usuario2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.nombre > usuario2.nombre) {
                return 1;
              }
              if (usuario1.nombre < usuario2.nombre) {
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
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.usuario > usuario2.usuario) {
                return 1;
              }
              if (usuario1.usuario < usuario2.usuario) {
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
          case 'Tipo':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.tipo > usuario2.tipo) {
                return 1;
              }
              if (usuario1.tipo < usuario2.tipo) {
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
          default:
            break
        }
        break;
      case 'Tipo':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              return usuario1.id - usuario2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.nombre > usuario2.nombre) {
                return 1;
              }
              if (usuario1.nombre < usuario2.nombre) {
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
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.usuario > usuario2.usuario) {
                return 1;
              }
              if (usuario1.usuario < usuario2.usuario) {
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
          case 'Tipo':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((usuario1, usuario2) => {
              if (usuario1.tipo > usuario2.tipo) {
                return 1;
              }
              if (usuario1.tipo < usuario2.tipo) {
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
          default:
            break
        }
        break;
      default:
        break;
    }
    this.usuarios = this.resultadoFiltrado;
  }

  deseleccionar() {
    this.usuarioSelect = null;
  }

  onSubmit() {
    this.router.navigate(['agregar-empleado']);
  }

}
