import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Configuracion} from "../model/Configuracion";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:8080/preferencias';

  constructor(private http: HttpClient) {}

  getConfiguracionesByTipo(tipoConfiguracion: string): Observable<Configuracion[]> {
    const params = new HttpParams()
      .set('tipoConfiguracion', tipoConfiguracion)

    return this.http.get<Configuracion[]>(`${this.apiUrl}/tipo`, { params });
  }
}
