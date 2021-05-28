import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;

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
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.loginGroup = this._formBuilder.group({
      userCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }

  onSubmit() {
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      const existeUsuario = usuarios.find(user => (user.usuario == this.loginGroup.controls['userCtrl'].value));
      if (this.loginGroup.controls['userCtrl'].value === '' || this.loginGroup.controls['passwordCtrl'].value === '') {
        this.snackBarService.redSnackBar('Por favor, ingrese todos sus datos para iniciar sesion');
      }
      else if (existeUsuario) {
        if (usuarios.find(pass => pass.contra == this.loginGroup.controls['passwordCtrl'].value)) {
          existeUsuario.estado = true;
          console.log(existeUsuario.estado);
          this.usuarioService.editarUsuarioPut(existeUsuario); //No jala cambiar el estado
          this.snackBarService.greenSnackBar('Bienvenido al sistema Eris');
          this.router.navigate(['mostrar-perfil']);
        }
        else {
          this.snackBarService.redSnackBar('Contraseña incorrecta. Por favor introduzca correctamente su contraseña')
        }
      }
      else {
        this.snackBarService.redSnackBar('El usuario no existe. Por favor introduzca de nuevo su nombre de usuario');
      }
    });

    // if (this.loginService.iniciarSesion(this.user, this.password)) {
    //   this.router.navigate(['mostrar-perfil']);
    // this.snackBarService.greenSnackBar('Bienvenido a Vitrum');
    //   console.log('ok');
    // }
    // else {
    //   this.snackBarService.redSnackBar('Usuario o contraseña incorrectos, favor de intentar nuevamente');
    // }
  }

}
