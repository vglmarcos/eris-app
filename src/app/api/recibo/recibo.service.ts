import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRecibo } from 'src/app/models/IRecibo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

  private basePath: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  obtenerRecibosGet(): Observable<IRecibo[]> {
    return this.httpClient.request<IRecibo[]>('get', `${this.basePath}/api/recibo/obtenerRecibos`);
  }

  agregarReciboPost(recibo: IRecibo) {
    return this.httpClient.request('post', `${this.basePath}/api/recibo/agregarRecibo`, {
      body: recibo
    });
  }

  editarReciboPut(recibo: IRecibo) {
    return this.httpClient.request('put', `${this.basePath}/api/recibo/editarRecibo`, {
      body: recibo
    });
  }

  eliminarReciboDelete(recibo: IRecibo) {
    return this.httpClient.request('delete', `${this.basePath}/api/recibo/eliminarRecibo`, {
      body: recibo
    });
  }
}
