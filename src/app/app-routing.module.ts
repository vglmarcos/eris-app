import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { BuscarProductoComponent } from './pages/buscar-producto/buscar-producto.component';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { BuscarEmpleadoComponent } from './pages/buscar-empleado/buscar-empleado.component';
import { BuscarReporteComponent } from './pages/buscar-reporte/buscar-reporte.component';
import { GenerarReporteComponent } from './pages/generar-reporte/generar-reporte.component';
import { BuscarCotizacionComponent } from './pages/buscar-cotizacion/buscar-cotizacion.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mostrar-perfil',
    component: MostrarPerfilComponent
  },
  {
    path: 'agregar-producto',
    component: AgregarProductoComponent
  },
  {
    path: 'buscar-producto',
    component: BuscarProductoComponent
  },
  {
    path: 'agregar-empleado',
    component: AgregarEmpleadoComponent
  },
  {
    path: 'buscar-empleado',
    component: BuscarEmpleadoComponent
  },
  {
    path: 'buscar-reporte',
    component: BuscarReporteComponent
  },
  {
    path: 'generar-reporte',
    component: GenerarReporteComponent
  },
  {
    path: 'buscar-cotizacion',
    component: BuscarCotizacionComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
