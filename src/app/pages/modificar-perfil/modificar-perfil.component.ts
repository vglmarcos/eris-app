import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitGuardar(){
    this.router.navigate(['mostrar-perfil']);
  }

  onSubmitCancelar(){
    this.router.navigate(['mostrar-perfil']);
  }

}
