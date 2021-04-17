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
import { ModificarProductoComponent } from './pages/modificar-producto/modificar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MostrarPerfilComponent,
    MenuComponent,
    MenuSecundarioComponent,
    AgregarProductoComponent,
    BuscarProductoComponent,
    ModificarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
