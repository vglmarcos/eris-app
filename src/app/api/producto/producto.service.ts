import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto } from 'src/app/models/IProducto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private basePath: string = 'https://api-rest-eris.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  obtenerProductosGet(): Observable<IProducto[]> {
    return this.httpClient.request<IProducto[]>('get', `${this.basePath}/api/producto/obtenerProductos`);
  }

  agregarProductoPost(producto: IProducto) {
    return this.httpClient.request('post', `${this.basePath}/api/producto/agregarProducto`, {
      body: producto
    });
  }

  editarProductoPut(producto: IProducto) {
    return this.httpClient.request('put', `${this.basePath}/api/producto/editarProducto`, {
      body: producto
    });
  }

  eliminarProductoDelete(producto: IProducto) {
    return this.httpClient.request('delete', `${this.basePath}/api/producto/eliminarProducto`, {
      body: producto
    });
  }
}
