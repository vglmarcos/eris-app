import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-perfil',
  templateUrl: './mostrar-perfil.component.html',
  styleUrls: ['./mostrar-perfil.component.css']
})
export class MostrarPerfilComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitEditar() {
    this.router.navigate(['modificar-perfil']);
  }

}
