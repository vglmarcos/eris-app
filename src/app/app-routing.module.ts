import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { BuscarProductoComponent } from './pages/buscar-producto/buscar-producto.component';
<<<<<<< HEAD
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';
=======
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { BuscarEmpleadoComponent } from './pages/buscar-empleado/buscar-empleado.component';
>>>>>>> empleado-page

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
<<<<<<< HEAD
    path: 'modificar-producto',
    component: ModificarProductoComponent
=======
    path: 'agregar-empleado',
    component: AgregarEmpleadoComponent
  },
  {
    path: 'buscar-empleado',
    component: BuscarEmpleadoComponent
>>>>>>> empleado-page
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
