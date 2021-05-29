import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IReporte } from 'src/app/models/IReporte';
import { IRecibo } from 'src/app/models/IRecibo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private basePath: string = 'https://api-rest-eris.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  obtenerReportesGet(): Observable<IReporte[]> {
    return this.httpClient.request<IReporte[]>('get', `${this.basePath}/api/reporte/obtenerReportes`);
  }

  agregarReportePost(reporte: IReporte) {
    return this.httpClient.request('post', `${this.basePath}/api/reporte/agregarReporte`, {
      body: reporte
    });
  }

  editarReportePut(reporte: IReporte) {
    return this.httpClient.request('put', `${this.basePath}/api/reporte/editarReporte`, {
      body: reporte
    });
  }

  eliminarReporteDelete(reporte: IReporte) {
    return this.httpClient.request('delete', `${this.basePath}/api/reporte/eliminarReporte`, {
      body: reporte
    });
  }

  obtenerRecibosGet(reporte: IReporte): Observable<IRecibo[]> {
    return this.httpClient.request<IRecibo[]>('get', `${this.basePath}/api/reporte/obtenerRecibos`, {
      body: reporte
    });
  }
}
