import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/components/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';

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
    public snackBarService: SnackBarService,
    public dialog: MatDialog
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
    this.consultaFormGroup.controls['consultaCtrl'].setValue('');
    this.consultaFormGroup.controls['porCtrl'].setValue('Nombre');
    this.consultaFormGroup.controls['tipoCtrl'].setValue('ID');
    this.consultaFormGroup.controls['ascDescCtrl'].setValue('asc');
    this.usuarioSelect = null;
    this.buscarEmpleados();
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
      case 'Usuario':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.usuariosTotales.filter(usuarios => {
              return usuarios.usuario.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
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
              return usuarios.usuario.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
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
              return usuarios.usuario.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
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
              return usuarios.usuario.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
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
    if (this.usuarios.length === 0) {
      this.snackBarService.redSnackBar('No se encontraron resultados.');
    }
  }

  deseleccionar() {
    this.usuarioSelect = null;
  }

  agregarEmpleado() {
    this.router.navigate(['agregar-empleado']);
  }

  eliminarEmpleado() {
    const usuarioSesion = this.usuariosTotales.find(usuario => usuario.estado);
    if (usuarioSesion.id === this.usuarioSelect) {
      this.snackBarService.redSnackBar('No se puede eliminar un usuario con sesión activa.');
    }
    else {
      const usuario = this.usuariosTotales.find(usuario => usuario.id === this.usuarioSelect);
      const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
        data: '¿Realmente deseas eliminar este usuario?',
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.res) {
          this.usuarioService.eliminarUsuarioDelete(usuario).subscribe(res => {
            this.snackBarService.greenSnackBar('Usuario eliminado con éxito.');
            this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
              this.usuariosTotales = usuarios;
              this.usuarios = this.usuariosTotales;
            });
          });
        } else {
          this.snackBarService.redSnackBar('Eliminación de producto cancelada');
          console.log(`Exit on click outside`);
        }
      }, error => this.snackBarService.redSnackBar('Ha ocurrido un error al eliminar el usuario.'));
    }
  }

  modificarEmpleado() {
    this.router.navigate(['editar-empleado'], { queryParams: { id: this.usuarioSelect } });
  }

}
