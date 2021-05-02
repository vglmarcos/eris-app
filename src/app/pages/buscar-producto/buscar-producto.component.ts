import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTOS } from './productos';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit {

  public productos = PRODUCTOS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['login']);
  }

  onSubmitModificar() {
    this.router.navigate(['modificar-producto']);
  }

  onSubmitNuevo() {
    this.router.navigate(['agregar-producto']);
  }
}
