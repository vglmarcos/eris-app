import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  public editarUsuarioFormGroup: FormGroup;
  private usuario: IUsuario;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.editarUsuarioFormGroup = this._formBuilder.group({
      usuarioCtrl: ['', Validators.required],
      contraCtrl: ['', Validators.required],
      contraConfirmCtrl: ['', Validators.required],
      correoCtrl: ['', [Validators.required, Validators.email]],
      telefonoCtrl: ['', Validators.required],
    });
    this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
      this.usuario = usuarios.find(usuario => usuario.estado);
      this.editarUsuarioFormGroup.controls['usuarioCtrl'].setValue(this.usuario.usuario);
      this.editarUsuarioFormGroup.controls['contraCtrl'].setValue(this.usuario.contra);
      this.editarUsuarioFormGroup.controls['correoCtrl'].setValue(this.usuario.correo);
      this.editarUsuarioFormGroup.controls['telefonoCtrl'].setValue(this.usuario.telefono);
    });
  }

  onSubmitGuardar() {
    const errorRequired = 
      this.editarUsuarioFormGroup.controls['usuarioCtrl'].hasError('required') ||
      this.editarUsuarioFormGroup.controls['contraCtrl'].hasError('required') ||
      this.editarUsuarioFormGroup.controls['contraConfirmCtrl'].hasError('required') ||
      this.editarUsuarioFormGroup.controls['correoCtrl'].hasError('required') ||
      this.editarUsuarioFormGroup.controls['telefonoCtrl'].hasError('required');
    
    const errorEmail = this.editarUsuarioFormGroup.controls['correoCtrl'].hasError('email');

    const passwordsMatchError = this.editarUsuarioFormGroup.controls['contraCtrl'].value 
      !== this.editarUsuarioFormGroup.controls['contraConfirmCtrl'].value;

    if(errorRequired) {
      this.snackBarService.redSnackBar('Se deben de llenar todos los datos.');
    } else if(errorEmail) {
      this.snackBarService.redSnackBar('El correo no es válido.');
    } else if(passwordsMatchError) {
      this.snackBarService.redSnackBar('Las contraseñas no coinciden.');
    } else {
      this.usuario.usuario = this.editarUsuarioFormGroup.controls['usuarioCtrl'].value;
      this.usuario.contra = this.editarUsuarioFormGroup.controls['contraCtrl'].value;
      this.usuario.correo = this.editarUsuarioFormGroup.controls['correoCtrl'].value;
      this.usuario.telefono = this.editarUsuarioFormGroup.controls['telefonoCtrl'].value;
      this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
        const usuarioSesion = usuarios.find(usuario => usuario.estado);

        const existeUsuarioNombre = 
          usuarios.find(usuario => usuario.usuario === this.usuario.usuario && usuarioSesion.usuario !== this.usuario.usuario);

        const existeUsuarioCorreo = 
          usuarios.find(usuario => usuario.correo === this.usuario.correo && usuarioSesion.correo !== this.usuario.correo);
        if(existeUsuarioNombre) {
          this.snackBarService.redSnackBar('Ya existe un usuario con ese nombre de usuario.');
        } else if(existeUsuarioCorreo) {
          this.snackBarService.redSnackBar('Ya existe un usuario con ese correo.');
        } else {
          this.usuarioService.editarUsuarioPut(this.usuario).subscribe(res => {
            this.router.navigate(['mostrar-perfil']);
            this.snackBarService.greenSnackBar('Se han actualizado los datos exitosamente.');
          }, error => this.snackBarService.redSnackBar('Ha ocurrido un error interno al actualizar los datos.'));
        }
      });
    }
  }

  onSubmitCancelar() {
    this.router.navigate(['mostrar-perfil']);
  }

}
