import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-reporte',
  templateUrl: './buscar-reporte.component.html',
  styleUrls: ['./buscar-reporte.component.css']
})
export class BuscarReporteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['generar-reporte']);
  }
  
}
