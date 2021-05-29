import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { BuscarProductoComponent } from './pages/buscar-producto/buscar-producto.component';
import { ModificarProductoComponent } from "./pages/modificar-producto/modificar-producto.component";
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { BuscarEmpleadoComponent } from './pages/buscar-empleado/buscar-empleado.component';
import { BuscarCotizacionComponent } from './pages/buscar-cotizacion/buscar-cotizacion.component';
import { BuscarReporteComponent } from './pages/buscar-reporte/buscar-reporte.component';
import { GenerarReporteComponent } from './pages/generar-reporte/generar-reporte.component';
import { ModificarPerfilComponent } from './pages/modificar-perfil/modificar-perfil.component';
import { VisualizarReporteComponent } from './pages/visualizar-reporte/visualizar-reporte.component';
import { AgregarCotizacionComponent } from './pages/agregar-cotizacion/agregar-cotizacion.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { BuscarReciboComponent } from './pages/buscar-recibo/buscar-recibo.component';
import { VisualizarReciboComponent } from './pages/visualizar-recibo/visualizar-recibo.component';

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
    path: 'modificar-producto',
    component: ModificarProductoComponent
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
    path: 'buscar-cotizacion',
    component: BuscarCotizacionComponent
  },
  {
    path: 'generar-reporte',
    component: GenerarReporteComponent
  },
  {
    path: 'modificar-perfil',
    component: ModificarPerfilComponent
  },
  {
    path: 'visualizar-reporte',
    component: VisualizarReporteComponent
  },
  {
    path: 'agregar-cotizacion',
    component: AgregarCotizacionComponent
  },
  {
    path: 'editar-empleado',
    component: EditarEmpleadoComponent
  },
  {
    path: 'acerca-de',
    component: AcercaDeComponent
  },
  {
    path: 'carrito',
    component: CarritoComponent
  },
  {
    path: 'buscar-recibo',
    component: BuscarReciboComponent
  },
  {
    path: 'visualizar-recibo',
    component: VisualizarReciboComponent
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
