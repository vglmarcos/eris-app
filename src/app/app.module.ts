import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuSecundarioComponent } from './components/menu-secundario/menu-secundario.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { BuscarProductoComponent } from './pages/buscar-producto/buscar-producto.component';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { BuscarEmpleadoComponent } from './pages/buscar-empleado/buscar-empleado.component';
import { BuscarReporteComponent } from './pages/buscar-reporte/buscar-reporte.component';
import { GenerarReporteComponent } from './pages/generar-reporte/generar-reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MostrarPerfilComponent,
    MenuComponent,
    MenuSecundarioComponent,
    AgregarProductoComponent,
    BuscarProductoComponent,
    AgregarEmpleadoComponent,
    BuscarEmpleadoComponent,
    BuscarReporteComponent,
    GenerarReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
