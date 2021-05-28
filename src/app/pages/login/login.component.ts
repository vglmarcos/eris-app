import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginGroup: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.loginGroup = this._formBuilder.group({
      userCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }

  onSubmit() {
    // if (this.loginService.iniciarSesion(this.user, this.password)) {
    //   this.router.navigate(['mostrar-perfil']);
    // this.snackBarService.greenSnackBar('Bienvenido a Vitrum');
    //   console.log('ok');
    // }
    // else {
    //   this.snackBarService.redSnackBar('Usuario o contraseña incorrectos, favor de intentar nuevamente');
    // }
    this.snackBarService.greenSnackBar('Bienvenido al sistema Eris');
    this.router.navigate(['mostrar-perfil']);
  }

}
