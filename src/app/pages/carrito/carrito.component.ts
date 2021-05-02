import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitCancelar() {
    this.router.navigate(['agregar-cotizacion']);
  }

  onSubmitAgregar() {
    this.router.navigate(['agregar-cotizacion']);
  }

}
