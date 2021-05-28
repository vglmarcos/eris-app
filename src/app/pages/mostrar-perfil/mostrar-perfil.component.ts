import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';

@Component({
  selector: 'app-mostrar-perfil',
  templateUrl: './mostrar-perfil.component.html',
  styleUrls: ['./mostrar-perfil.component.css']
})
export class MostrarPerfilComponent implements OnInit {

  public usuario: IUsuario = {
    usuario: '',
    apellidos: '',
    contra: '',
    correo: '',
    estado: false,
    nombre: '',
    telefono: '',
    tipo: ''
  };

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuario = usuarios.find(usuario => usuario.estado);
    });
  }

  ngOnInit(): void { }

  onSubmitEditar() {
    this.router.navigate(['modificar-perfil']);
  }

}