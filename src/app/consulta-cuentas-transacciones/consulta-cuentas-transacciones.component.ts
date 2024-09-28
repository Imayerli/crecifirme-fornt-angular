import { Component, OnInit } from '@angular/core';
import { CuentaService } from "../services/cuenta.service";
import { User } from "../model/User";
import { UserService } from "../services/user.service";
import {forkJoin, map, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-consulta-cuentas-transacciones',
  templateUrl: './consulta-cuentas-transacciones.component.html',
  styleUrls: ['./consulta-cuentas-transacciones.component.css']
})
export class ConsultaCuentasTransaccionesComponent implements OnInit {
  cuentasConTransacciones: any[] = []; // Arreglo para almacenar cuentas con sus transacciones
  private user: User = {
    id: 0,
    nombre: '',
    edad: null,
    estadoCivil: '',
    ingresosMensuales: null,
    preferenciasFinancieras: '',
    email: '',
    clave: ''
  };

  constructor(private userService: UserService, private cuentaService: CuentaService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.fetchCuentasConTransacciones(); // Método para obtener cuentas y transacciones
  }

  fetchCuentasConTransacciones(): void {
    this.cuentaService.getCuentasByUsuarioId(this.user.id).subscribe(
      cuentas => {
        if (!Array.isArray(cuentas)) {
          console.error('La respuesta no es un arreglo:', cuentas);
          return; // Salir si no es un arreglo
        }

        this.cuentasConTransacciones = []; // Reiniciar el arreglo para evitar duplicados

        const transaccionesRequests = cuentas.map(cuenta => {
          // Para cada cuenta, obtenemos las transacciones
          return this.cuentaService.getTransaccionesByCuentaId(cuenta.cuentaID).pipe(
            map(transacciones => {
              // Retornamos la cuenta junto con sus transacciones
              return { ...cuenta, transacciones };
            }),
            catchError(error => {
              console.error('Error al obtener transacciones para la cuenta:', cuenta.cuentaID, error);
              return of({ ...cuenta, transacciones: [] }); // Retornar la cuenta con transacciones vacías en caso de error
            })
          );
        });
        forkJoin(transaccionesRequests).subscribe(
          result => {
            this.cuentasConTransacciones = result;
          },
          error => {
            console.error('Error al cargar transacciones:', error);
          }
        );
      },
      error => {
        console.error('Error al cargar cuentas:', error);
      }
    );
  }


}
