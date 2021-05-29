import { Injectable } from '@angular/core';
import { ICliente } from 'src/app/models/ICliente';
import { IElemento } from 'src/app/models/IElemento';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private items: IElemento[];

  private cliente: ICliente;

  constructor() { 
    this.items = [];
    this.cliente = {
      apellidos: '',
      correo: '',
      nombre: '',
      telefono: ''
    }
  }

  vaciarLista() {
    this.items = [];
    this.cliente = {
      apellidos: '',
      correo: '',
      nombre: '',
      telefono: ''
    };
  }

  agregarElemento(elemento: IElemento) {
    this.items.push(elemento);
  }

  quitarElemento(id: number) {
    this.items = this.items.filter(item => item.id_producto !== id);
  }

  obtenerLista(): IElemento[] {
    return this.items;
  }

  recordarCliente(cliente: ICliente) {
    this.cliente = cliente;
  }

  obtenerCliente(): ICliente {
    return this.cliente;
  }

}
