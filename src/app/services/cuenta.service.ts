import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private apiUrlCuentas = 'http://localhost:8080/cuentas';
  private apiUrlTransacciones = 'http://localhost:8080/transacciones';

  constructor(private http: HttpClient) {}

  // Obtener cuentas por usuario
  getCuentasByUsuarioId(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrlCuentas}/usuario/${usuarioId}`);
  }

  // Obtener transacciones por cuenta
  getTransaccionesByCuentaId(cuentaId: number): Observable<any> {
    return this.http.get(`${this.apiUrlTransacciones}/cuenta/${cuentaId}`);
  }

  // Crear una nueva cuenta
  createCuenta(cuenta: any): Observable<any> {
    return this.http.post(this.apiUrlCuentas, cuenta);
  }

  // Crear una nueva transacción
  createTransaccion(transaccion: any): Observable<any> {
    return this.http.post(this.apiUrlTransacciones, transaccion);
  }
}
