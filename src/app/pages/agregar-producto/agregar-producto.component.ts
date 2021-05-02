import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitGuardar() {
    this.router.navigate(['buscar-producto']);
  }

  onSubmitCancelar() {
    this.router.navigate(['buscar-producto']);
  }

}