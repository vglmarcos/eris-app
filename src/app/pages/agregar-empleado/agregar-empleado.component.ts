import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

  public agregarFormGroup: FormGroup;

  public usuario: IUsuario;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    public snackBarService: SnackBarService
  ) {
    this.agregarFormGroup = this._formBuilder.group({
      nombreCtrl: ['', Validators.required],
      apellidosCtrl: ['', Validators.required],
      tipoCtrl: ['Administrador', Validators.required],
      telefonoCtrl: ['', Validators.required],
      usuarioCtrl: ['', Validators.required],
      correoCtrl: ['', [Validators.required, Validators.email]],
      contraCtrl: ['', Validators.required],
      contraConfCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  cancelar() {
    this.snackBarService.redSnackBar('Alta de empleado cancelada');
    this.router.navigate(['buscar-empleado']);
  }

  guardar() {
    const requiredError = 
      this.agregarFormGroup.controls['nombreCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['apellidosCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['tipoCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['telefonoCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['usuarioCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['correoCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['contraCtrl'].hasError('required') ||
      this.agregarFormGroup.controls['contraConfCtrl'].hasError('required');
    
    const emailError = this.agregarFormGroup.controls['correoCtrl'].hasError('email');

    const passwordsMatchError = this.agregarFormGroup.controls['contraCtrl'].value 
      !== this.agregarFormGroup.controls['contraConfCtrl'].value;
    
      if(requiredError) {
        this.snackBarService.redSnackBar('Se deben de llenar todos los datos.');
      } else if(emailError) {
        this.snackBarService.redSnackBar('El correo no es válido.');
      } else if(passwordsMatchError) {
        this.snackBarService.redSnackBar('Las contraseñas no coinciden.');
      } else {
        this.usuario = {
          nombre: this.agregarFormGroup.controls['nombreCtrl'].value,
          apellidos: this.agregarFormGroup.controls['apellidosCtrl'].value,
          usuario: this.agregarFormGroup.controls['usuarioCtrl'].value,
          correo: this.agregarFormGroup.controls['correoCtrl'].value,
          estado: false,
          contra: this.agregarFormGroup.controls['contraCtrl'].value,
          telefono: this.agregarFormGroup.controls['telefonoCtrl'].value,
          tipo: this.agregarFormGroup.controls['tipoCtrl'].value
        }

        this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
          const existeUsuarioNombre = usuarios.find(usuario => usuario.usuario === this.usuario.usuario);
          const existeUsuarioCorreo = usuarios.find(usuario => usuario.correo === this.usuario.correo);

          if(existeUsuarioNombre) {
            this.snackBarService.redSnackBar('Ya existe un usuario con ese nombre de usuario.');
          } else if(existeUsuarioCorreo) {
            this.snackBarService.redSnackBar('Ya existe un usuario con ese correo.');
          } else {
            this.usuarioService.agregarUsuarioPost(this.usuario).subscribe(res => {
              this.router.navigate(['buscar-empleado']);
              this.snackBarService.greenSnackBar('Se agregó el usuario con éxito.');
            }, error => this.snackBarService.redSnackBar('Ha ocurrido un error interno al agregar el usuario.'));
          }
        });
      }
  }

}
