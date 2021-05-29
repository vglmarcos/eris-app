import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { REPORTES } from './reportes';

@Component({
  selector: 'app-buscar-reporte',
  templateUrl: './buscar-reporte.component.html',
  styleUrls: ['./buscar-reporte.component.css']
})
export class BuscarReporteComponent implements OnInit {

  public reportes = REPORTES;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

  onSubmitVer() {
  }
  
}
