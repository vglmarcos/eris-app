import { Component, OnInit } from '@angular/core';
import { COTIZACIONES } from './cotizaciones';

@Component({
  selector: 'app-buscar-cotizacion',
  templateUrl: './buscar-cotizacion.component.html',
  styleUrls: ['./buscar-cotizacion.component.css']
})
export class BuscarCotizacionComponent implements OnInit {

  public cotizaciones = COTIZACIONES;

  constructor() { }

  ngOnInit(): void {
  }

}
