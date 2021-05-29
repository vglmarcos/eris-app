import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { IUsuario } from 'src/app/models/IUsuario';

@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css']
})
export class BuscarCotizacionComponent implements OnInit {

  public cotizacionesTotales: ICotizacion[];

  public cotizaciones: ICotizacion[];

  public usuariosTotales: IUsuario[];

  public usuarios: IUsuario[];

  public cotizacionSelect: number;

  public consulta: string;

  public consultaFormGroup: FormGroup;

  public porSelect: string = "Nombre";

  public ordenadoSelect: string = "ID";

  public ascDesc: string = "asc";

  public resultadoFiltrado: ICotizacion[];

  public filtros = {
    consulta: '',
    por: '',
    ordenado: '',
    orden: ''
  };

  constructor(
    private router: Router,
    private cotizacionService: CotizacionService,
    private usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    public snackBarService: SnackBarService
  ) {
    this.consultaFormGroup = this._formBuilder.group({
      consultaCtrl: ['', Validators.required],
      porCtrl: ['Nombre', Validators.required],
      tipoCtrl: ['ID', Validators.required],
      ascDescCtrl: ['asc', Validators.required],
    });
    this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
      this.cotizacionesTotales = cotizaciones;
      this.cotizaciones = this.cotizacionesTotales;
      this.usuarioService.obtenerUsuariosGet().subscribe(usuarios => {
        this.usuariosTotales = usuarios;
        this.usuarios = this.usuariosTotales;
      });
    });
  }

  ngOnInit(): void {

    this.consultaFormGroup.controls['porCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });

    this.consultaFormGroup.controls['tipoCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });

    this.consultaFormGroup.controls['ascDescCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: this.consultaFormGroup.controls['consultaCtrl'].value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: value
      };
    });


    this.consultaFormGroup.controls['consultaCtrl'].valueChanges.subscribe(value => {
      this.filtros = {
        consulta: value,
        por: this.consultaFormGroup.controls['porCtrl'].value,
        ordenado: this.consultaFormGroup.controls['tipoCtrl'].value,
        orden: this.consultaFormGroup.controls['ascDescCtrl'].value
      };
    });
  }

  seleccionarUsuario(cotizacion: ICotizacion) {
    this.cotizacionSelect = cotizacion.id;
  }

  limpiarFiltros() {
    this.consultaFormGroup.controls['consultaCtrl'].setValue('');
    this.consultaFormGroup.controls['porCtrl'].setValue('Nombre');
    this.consultaFormGroup.controls['tipoCtrl'].setValue('ID');
    this.consultaFormGroup.controls['ascDescCtrl'].setValue('asc');
    this.cotizacionSelect = null;
    this.buscarEmpleados();
  }

  buscarEmpleados() {

    if (this.usuarios.length === 0) {
      this.snackBarService.redSnackBar('No se encontraron resultados.');
    }
  }

  deseleccionar() {
    this.cotizacionSelect = null;
  }

  eliminarEmpleado() {
    const cotizacion = this.cotizacionesTotales.find(cotizacion => cotizacion.id === this.cotizacionSelect);
    this.cotizacionService.eliminarCotizacionDelete(cotizacion).subscribe(res => {
      this.snackBarService.greenSnackBar('Cotización eliminada con éxito.');
      this.cotizacionService.obtenerCotizacionesGet().subscribe(cotizaciones => {
        this.cotizacionesTotales = cotizaciones;
        this.cotizaciones = this.cotizacionesTotales;
      });
    }, error => this.snackBarService.redSnackBar('Ha ocurrido un error al eliminar la cotización.'));
  }
}