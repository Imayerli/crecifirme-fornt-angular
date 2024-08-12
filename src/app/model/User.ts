export interface User {
  id: number;
  nombre: string;
  edad: number | null;
  estadoCivil: string;
  ingresosMensuales: number | null;
  preferenciasFinancieras: string;
  email: string;
  clave: string;
}


export interface UserResponse {
  token: string;
  user: User;
}
