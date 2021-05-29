import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  public PRODUCTOS: IProducto[];

  public producto: IProducto;

  public editProductGroup: FormGroup;

  public idSelect: number;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    public productoService: ProductoService
  ) {
    this.idSelect = this.router.getCurrentNavigation().extras.state.idSelect;
    this.editProductGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      typeCtrl: ['', Validators.required],
      priceCtrl: ['', Validators.required],
    });
    this.productoService.obtenerProductosGet().subscribe(productos => {
      this.producto = productos.find(prod => (prod.id == this.idSelect));
      this.editProductGroup.controls['nameCtrl'].setValue(this.producto.nombre);
      this.editProductGroup.controls['typeCtrl'].setValue(this.producto.tipo);
      this.editProductGroup.controls['priceCtrl'].setValue(this.producto.precio);
      console.log(this.producto);
    });
  }

  ngOnInit(): void {

  }

  onSubmitGuardar() {
    this.productoService.obtenerProductosGet().subscribe(productos => {
      // this.producto = productos.find(prod => (prod.id == this.idSelect));
      let existeProducto = productos.find(prod => (prod.nombre == this.editProductGroup.controls['nameCtrl'].value));
      if (this.editProductGroup.controls['nameCtrl'].hasError('required') ||
        this.editProductGroup.controls['typeCtrl'].hasError('required') ||
        this.editProductGroup.controls['priceCtrl'].hasError('required')) {
        this.snackBarService.redSnackBar('Faltan datos por capturar. Por favor ingrese todos los datos');
      }
      else if (existeProducto){
        if (existeProducto._id === this.producto._id) {
          this.producto.nombre = this.editProductGroup.controls['nameCtrl'].value;
          this.producto.tipo = this.editProductGroup.controls['typeCtrl'].value;
          this.producto.precio = this.editProductGroup.controls['priceCtrl'].value;

          this.productoService.editarProductoPut(this.producto).subscribe(res => {
            this.snackBarService.greenSnackBar('Se ha modificado correctamente el producto');
            this.router.navigate(['buscar-producto']);
          });
        }
        else {
          this.snackBarService.redSnackBar('No procede el registro. Ya existe un producto con ese nombre');
        }
      }
      else {
        console.log('hola');
        this.producto.nombre = this.editProductGroup.controls['nameCtrl'].value;
        this.producto.tipo = this.editProductGroup.controls['typeCtrl'].value;
        this.producto.precio = this.editProductGroup.controls['priceCtrl'].value;

        this.productoService.editarProductoPut(this.producto).subscribe(res => {
          this.snackBarService.greenSnackBar('Se ha modificado correctamente el producto');
          this.router.navigate(['buscar-producto']);
        });
      }
    });
  }

  onSubmitCancelar() {
    this.snackBarService.redSnackBar('Modificación de producto cancelada');
    this.router.navigate(['buscar-producto']);
  }

}
