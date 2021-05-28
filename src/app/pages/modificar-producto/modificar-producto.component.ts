import { Component, OnInit } from '@angular/core';
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

  public producto: IProducto = {
    nombre: '',
    tipo: '',
    precio: 0,
  };

  public editProductGroup: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    public productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.productoService.obtenerProductosGet().subscribe(productos => {
      // this.producto = productos.find(prod => prod.id == data.id);
    })
  }

  onSubmitGuardar() {
    this.router.navigate(['login']);
  }

  onSubmitCancelar() {
    this.router.navigate(['buscar-producto']);
  }

}
