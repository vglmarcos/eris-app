import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICliente } from 'src/app/models/ICliente';
import { Observable } from 'rxjs';

export interface respuesta {
  res: string,
  cliente: ICliente
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private basePath: string = 'https://api-rest-eris.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  obtenerClientesGet(): Observable<ICliente[]> {
    return this.httpClient.request<ICliente[]>('get', `${this.basePath}/api/cliente/obtenerClientes`);
  }

  agregarClientePost(cliente: ICliente) {
    return this.httpClient.request<respuesta>('post', `${this.basePath}/api/cliente/agregarCliente`, {
      body: cliente
    });
  }

  editarClientePut(cliente: ICliente) {
    return this.httpClient.request('put', `${this.basePath}/api/cliente/editarCliente`, {
      body: cliente
    });
  }

  eliminarClienteDelete(cliente: ICliente) {
    return this.httpClient.request('delete', `${this.basePath}/api/cliente/eliminarCliente`, {
      body: cliente
    });
  }
}
