import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { IProducto } from 'src/app/models/IProducto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/components/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  public productosTotales: IProducto[];

  public productos: IProducto[];

  public productoSelect: number;

  public consulta: string;

  public consultaFormGroup: FormGroup;

  public porSelect: string = "Nombre";

  public ordenadoSelect: string = "ID";
  nombre

  public ascDesc: string = "asc";

  public resultadoFiltrado: IProducto[];

  public filtros = {
    consulta: '',
    por: '',
    ordenado: '',
    orden: ''
  };

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private productoService: ProductoService,
    public snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) {
    this.consultaFormGroup = this._formBuilder.group({
      consultaCtrl: ['', Validators.required],
      porCtrl: ['Nombre', Validators.required],
      tipoCtrl: ['ID', Validators.required],
      ascDescCtrl: ['asc', Validators.required],
    });
    this.productoService.obtenerProductosGet().subscribe(productos => {
      this.productosTotales = productos;
      this.productos = this.productosTotales;
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

  seleccionarProducto(producto: IProducto) {
    this.productoSelect = producto.id;
  }


  limpiarFiltros() {
    this.consultaFormGroup.controls['consultaCtrl'].setValue('');
    this.consultaFormGroup.controls['porCtrl'].setValue('Nombre');
    this.consultaFormGroup.controls['tipoCtrl'].setValue('ID');
    this.consultaFormGroup.controls['ascDescCtrl'].setValue('asc');
    this.productoSelect = null;
    this.buscarProductos();
  }

  buscarProductos() {
    let resultados;
    let resultadosOrdenados;
    switch (this.filtros.por) {
      case 'Nombre':
        switch (this.filtros.ordenado) {
          case 'ID':
            resultados = this.productosTotales.filter(productos => {
              return productos.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              return producto1.id - producto2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.productosTotales.filter(productos => {
              return productos.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.nombre > producto2.nombre) {
                return 1;
              }
              if (producto1.nombre < producto2.nombre) {
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
            resultados = this.productosTotales.filter(productos => {
              return productos.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.producto > producto2.producto) {
                return 1;
              }
              if (producto1.usuario < producto2.producto) {
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
            resultados = this.productosTotales.filter(productos => {
              return productos.nombre.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.tipo > producto2.tipo) {
                return 1;
              }
              if (producto1.tipo < producto2.tipo) {
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
            resultados = this.productosTotales.filter(productos => {
              return productos.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              return producto1.id - producto2.id;
            });
            if (this.filtros.orden === 'asc') {
              this.resultadoFiltrado = resultadosOrdenados;
            } else {
              this.resultadoFiltrado = resultadosOrdenados.reverse();
            }
            break;
          case 'Nombre':
            resultados = this.productosTotales.filter(productos => {
              return productos.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.nombre > producto2.nombre) {
                return 1;
              }
              if (producto1.nombre < producto2.nombre) {
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
            resultados = this.productosTotales.filter(productos => {
              return productos.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.producto > producto2.producto) {
                return 1;
              }
              if (producto1.producto < producto2.producto) {
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
            resultados = this.productosTotales.filter(productos => {
              return productos.tipo.toLowerCase().startsWith(String(this.filtros.consulta).toLowerCase());
            });
            resultadosOrdenados = resultados.sort((producto1, producto2) => {
              if (producto1.tipo > producto2.tipo) {
                return 1;
              }
              if (producto1.tipo < producto2.tipo) {
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
    this.productos = this.resultadoFiltrado;
    console.log(this.productos)
    if (this.productos.length == 0 ) {
      this.snackBarService.redSnackBar('No se encontraron resultdos');
    }
  }

  deseleccionar() {
    this.productoSelect = null;
  }

  onSubmitEliminar(productoSelect) {
    this.productoService.obtenerProductosGet().subscribe(productos => {
      const producto = productos.find(prod => prod.id === productoSelect);
      const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
        data: '¿Realmente deseas eliminar este producto?',
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.res) {
          this.productoService.eliminarProductoDelete(producto).subscribe(res => {
            this.snackBarService.greenSnackBar('Producto eliminado con éxito');
            this.productoService.obtenerProductosGet().subscribe(prodt => {
              this.productosTotales = prodt;
              this.productos = this.productosTotales;
            });
          });
        } else {
          this.snackBarService.redSnackBar('Eliminación de producto cancelada');
          console.log(`Exit on click outside`);
        }
      });
    });
  }

  onSubmitModificar(productoSelect) {
    console.log(productoSelect);
    this.router.navigate(['modificar-producto'], { state: { idSelect: productoSelect } });
  }

  onSubmitNuevo() {
    this.router.navigate(['agregar-producto']);
  }


}

function open() {
  console.log('hola');
}