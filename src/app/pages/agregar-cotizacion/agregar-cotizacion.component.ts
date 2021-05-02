import { Component, OnInit } from '@angular/core';
import { CARRITO } from './carrito';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrls: ['./agregar-cotizacion.component.css']
})
export class AgregarCotizacionComponent implements OnInit {

  public carrito = CARRITO;

  public fecha = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onSubmitModificar() {

  }

  onSubmitNuevo() {
    
  }

}
