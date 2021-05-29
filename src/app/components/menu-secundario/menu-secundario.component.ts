import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';

@Component({
  selector: 'app-menu-secundario',
  templateUrl: './menu-secundario.component.html',
  styleUrls: ['./menu-secundario.component.css']
})
export class MenuSecundarioComponent implements OnInit {

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
    public snackBarService: SnackBarService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      const usuarioLogout = usuarios.find(user => user.estado == true);
      usuarioLogout.estado = false;
      console.log(usuarioLogout.estado);
      this.usuarioService.editarUsuarioPut(usuarioLogout).subscribe(res => {
        
      }); // No jala cmabiar el estado
    })
    this.snackBarService.redSnackBar('Ha cerrado sesión correctamente');
  }
}