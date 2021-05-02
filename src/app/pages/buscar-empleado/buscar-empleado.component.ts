import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPLEADOS } from './empleados';

@Component({
  selector: 'app-buscar-empleado',
  templateUrl: './buscar-empleado.component.html',
  styleUrls: ['./buscar-empleado.component.css']
})
export class BuscarEmpleadoComponent implements OnInit {

  public empleados = EMPLEADOS;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['agregar-empleado']);
  }

}
