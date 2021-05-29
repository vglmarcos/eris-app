import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private basePath: string = 'https://api-rest-eris.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  obtenerCotizacionesGet(): Observable<ICotizacion[]> {
    return this.httpClient.request<ICotizacion[]>('get', `${this.basePath}/api/cotizacion/obtenerCotizaciones`);
  }

  agregarCotizacionPost(cotizacion: ICotizacion) {
    return this.httpClient.request('post', `${this.basePath}/api/cotizacion/agregarCotizacion`, {
      body: cotizacion
    });
  }

  editarCotizacionPut(cotizacion: ICotizacion) {
    return this.httpClient.request('put', `${this.basePath}/api/cotizacion/editarCotizacion`, {
      body: cotizacion
    });
  }

  eliminarCotizacionDelete(cotizacion: ICotizacion) {
    return this.httpClient.request('delete', `${this.basePath}/api/cotizacion/eliminarCotizacion`, {
      body: cotizacion
    });
  }
}
