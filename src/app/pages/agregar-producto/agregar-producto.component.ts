import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})

export class AgregarProductoComponent implements OnInit {

  public PRODUCTOS: IProducto[];

  public producto: IProducto = {
    nombre: '',
    tipo: '',
    precio: 0,
  };

  public addProductGroup: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.addProductGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      typeCtrl: ['', Validators.required],
      priceCtrl: ['', Validators.required],
    });

  }

  onSubmitGuardar() {
    this.productoService.obtenerProductosGet().subscribe(productos => {
      let existeProducto = productos.find(prod => (prod.nombre == this.addProductGroup.controls['nameCtrl'].value));
      console.log(existeProducto);
      if (this.addProductGroup.controls['nameCtrl'].value === '' ||
        this.addProductGroup.controls['typeCtrl'].value === '' ||
        this.addProductGroup.controls['priceCtrl'].value === '') {
        this.snackBarService.redSnackBar('Faltan datos por capturar. Por favor ingrese todos los datos');
      }
      else if (existeProducto) {
        this.snackBarService.redSnackBar('No procede el registro. Ya existe un producto con ese nombre');
      }
      else {
        this.producto = {
          nombre: this.addProductGroup.controls['nameCtrl'].value,
          tipo: this.addProductGroup.controls['typeCtrl'].value,
          precio: this.addProductGroup.controls['priceCtrl'].value,
        }
        console.log(this.producto);
        this.productoService.agregarProductoPost(this.producto).subscribe(res => {
          this.snackBarService.greenSnackBar('Alta de producto exitosa');
          this.router.navigate(['buscar-producto']);
        });
      }
    });
  }

  onSubmitCancelar() {
    this.snackBarService.redSnackBar('Alta de producto cancelada');
    this.router.navigate(['buscar-producto']);
  }

}