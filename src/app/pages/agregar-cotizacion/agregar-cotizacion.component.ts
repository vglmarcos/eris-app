import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CARRITO } from './carrito';

@Component({
  selector: 'app-agregar-cotizacion',
  templateUrl: './agregar-cotizacion.component.html',
  styleUrls: ['./agregar-cotizacion.component.css']
})
export class AgregarCotizacionComponent implements OnInit {

  public carrito = CARRITO;

  public fecha = new Date();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitEliminar() {

  }

  onSubmitAgregar() {
    this.router.navigate(['carrito']);
  }

  onSubmitGuardar() {
    this.router.navigate(['buscar-cotizacion']);
  }

}
