import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito/carrito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/api/producto/producto.service';
import { IElemento } from 'src/app/models/IElemento';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public agregarFormGroup: FormGroup;

  public productos: IProducto[] = [];

  public productosOpciones: IProducto[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private carritoService: CarritoService,
    private productoService: ProductoService,
  ) {
    this.productoService.obtenerProductosGet().subscribe(productos => {
      if (productos) {
        this.productos = productos;
        this.productosOpciones = this.productos.filter(producto => {
          return producto.tipo === this.agregarFormGroup.controls['tipoCtrl'].value;
        });
        if (this.productosOpciones[0]) {
          this.agregarFormGroup.controls['productoCtrl'].setValue(this.productosOpciones[0].id);
          this.agregarFormGroup.controls['idCtrl'].setValue(this.productosOpciones[0].id);
        } else {
          this.agregarFormGroup.controls['productoCtrl'].setValue('');
          this.agregarFormGroup.controls['idCtrl'].setValue('');
          this.agregarFormGroup.controls['cantidadCtrl'].setValue('');
          this.agregarFormGroup.controls['subtotalCtrl'].setValue('');
        }
      }
    });
    this.agregarFormGroup = this._formBuilder.group({
      tipoCtrl: ['Servicio', Validators.required],
      idCtrl: ['', Validators.required],
      productoCtrl: ['', Validators.required],
      precioCtrl: ['', Validators.required],
      cantidadCtrl: ['', Validators.required],
      subtotalCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.agregarFormGroup.controls['tipoCtrl'].valueChanges.subscribe(value => {
      this.productosOpciones = this.productos.filter(producto => {
        return producto.tipo === value;
      });
      if (this.productosOpciones[0]) {
        this.agregarFormGroup.controls['productoCtrl'].setValue(this.productosOpciones[0].id);
        this.agregarFormGroup.controls['idCtrl'].setValue(this.productosOpciones[0].id);
      } else {
        this.agregarFormGroup.controls['idCtrl'].setValue('');
        this.agregarFormGroup.controls['productoCtrl'].setValue('');
        this.agregarFormGroup.controls['cantidadCtrl'].setValue('');
        this.agregarFormGroup.controls['subtotalCtrl'].setValue('');
      }
    });

    this.agregarFormGroup.controls['productoCtrl'].valueChanges.subscribe(value => {
      if (this.productosOpciones[0]) {
        let id;
        if (typeof value === 'string') {
          id = parseInt(value);
        } else {
          id = value;
        }
        this.agregarFormGroup.controls['idCtrl'].setValue(id);
        let producto = this.productosOpciones.find(producto => producto.id === id);
        this.agregarFormGroup.controls['precioCtrl'].setValue(producto.precio);
      } else {
        this.agregarFormGroup.controls['idCtrl'].setValue('');
        this.agregarFormGroup.controls['precioCtrl'].setValue('');
        this.agregarFormGroup.controls['cantidadCtrl'].setValue('');
        this.agregarFormGroup.controls['subtotalCtrl'].setValue('');
      }
    });

    this.agregarFormGroup.controls['cantidadCtrl'].valueChanges.subscribe(value => {
      let cantidad = parseInt(value);
      if (cantidad > 0) {
        this.agregarFormGroup.controls['subtotalCtrl'].setValue(cantidad * parseInt(this.agregarFormGroup.controls['precioCtrl'].value));
      } else {
        this.agregarFormGroup.controls['subtotalCtrl'].setValue('');
      }
    })
  }

  onSubmitCancelar() {
    this.router.navigate(['agregar-cotizacion']);
  }

  onSubmitAgregar() {
    const item: IElemento = {
      cantidad: parseInt(this.agregarFormGroup.controls['cantidadCtrl'].value),
      id_producto: parseInt(this.agregarFormGroup.controls['idCtrl'].value),
      subtotal: parseInt(this.agregarFormGroup.controls['subtotalCtrl'].value)
    }
    this.carritoService.agregarElemento(item);
    this.router.navigate(['agregar-cotizacion']);
  }

}
