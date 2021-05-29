import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/models/IUsuario';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
    selector: 'app-editar-empleado',
    templateUrl: './editar-empleado.component.html',
    styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

    public editarFormGroup: FormGroup;

    public usuario: IUsuario;

    public idUsuario: number;

    constructor(
        private router: Router,
        private _formBuilder: FormBuilder,
        private usuarioService: UsuarioService,
        public snackBarService: SnackBarService
    ) {
        this.idUsuario = this.router.getCurrentNavigation().extras.queryParams.id;
        this.editarFormGroup = this._formBuilder.group({
            nombreCtrl: ['', Validators.required],
            apellidosCtrl: ['', Validators.required],
            tipoCtrl: ['', Validators.required],
            telefonoCtrl: ['', Validators.required],
            usuarioCtrl: ['', Validators.required],
            correoCtrl: ['', [Validators.required, Validators.email]],
            contraCtrl: ['', Validators.required],
            contraConfCtrl: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
            this.usuario = usuarios.find(usuario => usuario.id === this.idUsuario);
            this.editarFormGroup = this._formBuilder.group({
                nombreCtrl: [this.usuario.nombre, Validators.required],
                apellidosCtrl: [this.usuario.apellidos, Validators.required],
                tipoCtrl: [this.usuario.tipo, Validators.required],
                telefonoCtrl: [this.usuario.telefono, Validators.required],
                usuarioCtrl: [this.usuario.usuario, Validators.required],
                correoCtrl: [this.usuario.correo, [Validators.required, Validators.email]],
                contraCtrl: [this.usuario.contra, Validators.required],
                contraConfCtrl: ['', Validators.required],
            });
        });
    }

    cancelar() {
        this.snackBarService.redSnackBar('Se canceló la edición del usuario.');
        this.router.navigate(['buscar-empleado']);
    }

    editar() {
        const requiredError =
            this.editarFormGroup.controls['nombreCtrl'].hasError('required') ||
            this.editarFormGroup.controls['apellidosCtrl'].hasError('required') ||
            this.editarFormGroup.controls['tipoCtrl'].hasError('required') ||
            this.editarFormGroup.controls['telefonoCtrl'].hasError('required') ||
            this.editarFormGroup.controls['usuarioCtrl'].hasError('required') ||
            this.editarFormGroup.controls['correoCtrl'].hasError('required') ||
            this.editarFormGroup.controls['contraCtrl'].hasError('required') ||
            this.editarFormGroup.controls['contraConfCtrl'].hasError('required');

        const emailError = this.editarFormGroup.controls['correoCtrl'].hasError('email');

        const passwordsMatchError = this.editarFormGroup.controls['contraCtrl'].value
            !== this.editarFormGroup.controls['contraConfCtrl'].value;

        if (requiredError) {
            this.snackBarService.redSnackBar('Se deben de llenar todos los datos.');
        } else if (emailError) {
            this.snackBarService.redSnackBar('El correo no es válido.');
        } else if (passwordsMatchError) {
            this.snackBarService.redSnackBar('Las contraseñas no coinciden.');
        } else {
            this.usuario.nombre = this.editarFormGroup.controls['nombreCtrl'].value;
            this.usuario.apellidos = this.editarFormGroup.controls['apellidosCtrl'].value;
            this.usuario.usuario = this.editarFormGroup.controls['usuarioCtrl'].value;
            this.usuario.correo = this.editarFormGroup.controls['correoCtrl'].value;
            this.usuario.estado = this.usuario.estado;
            this.usuario.contra = this.editarFormGroup.controls['contraCtrl'].value;
            this.usuario.telefono = this.editarFormGroup.controls['telefonoCtrl'].value;
            this.usuario.tipo = this.editarFormGroup.controls['tipoCtrl'].value;
        }

        this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
            const usuarioElegido = usuarios.find(usuario => usuario.id === this.usuario.id);
            console.log(usuarioElegido);
            const existeUsuarioNombre = usuarios.find(usuario => usuario.usuario === this.usuario.usuario && usuarioElegido.usuario !== this.usuario.usuario);
            const existeUsuarioCorreo = usuarios.find(usuario => usuario.correo === this.usuario.correo && usuarioElegido.correo !== this.usuario.correo);
            console.log(existeUsuarioCorreo)
            if (existeUsuarioNombre) {
                this.snackBarService.redSnackBar('Ya existe un usuario con ese nombre de usuario.');
            } else if (existeUsuarioCorreo) {
                this.snackBarService.redSnackBar('Ya existe un usuario con ese correo.');
            } else {
                this.usuarioService.editarUsuarioPut(this.usuario).subscribe(res => {
                    this.router.navigate(['buscar-empleado']);
                    this.snackBarService.greenSnackBar('Se editó el usuario con éxito.');
                }, error => this.snackBarService.redSnackBar('Ha ocurrido un error interno al editar el usuario.'));
            }
        });
    }
}