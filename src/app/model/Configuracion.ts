export interface DatosConfiguracion {
  [key: string]: string[] | string;
}

export interface Configuracion {
  preferenciasID: number;
  tipoConfiguracion: string;
  clasificacionConfiguracion: string;
  datosConfiguracion: DatosConfiguracion;
}

export interface Usuario {
  nombre: string;
  edad: number;
  estadoCivil: string;
  ingresosMensuales: number;
  clave: string;
  email: string;
  configuraciones: Configuracion[];
}
