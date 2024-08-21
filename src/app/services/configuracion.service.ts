import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Configuracion} from "../model/Configuracion";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor() { }

  getConfiguraciones(): Observable<Configuracion[]> {
    const configuraciones: Configuracion[] = [
      {
        preferenciasID: 1,
        tipoConfiguracion: 'PreferenciasFinancieras',
        clasificacionConfiguracion: 'Personalización',
        datosConfiguracion: {
          Inversiones: ['Bolsa', 'Criptomonedas'],
          Ahorro: ['Cuenta de Ahorro', 'Certificados de Depósito'],
          Gastos: ['Educación', 'Transporte']
        }
      },
      {
        preferenciasID: 9,
        tipoConfiguracion: 'Alertas',
        clasificacionConfiguracion: 'General',
        datosConfiguracion: {
          'Inversiones en la bolsa para principiantes': 'Video',
          Categoría: 'Inversiones',
          Descripción: 'Contenido del video sobre inversiones básicas en bolsa para principiantes.'
        }
      }
      // Agrega más configuraciones aquí...
    ];

    return of(configuraciones);
  }
}
