import {Component, OnInit} from '@angular/core';
import { CuentaService } from '../services/cuenta.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {User} from "../model/User";

@Component({
  selector: 'app-crear-cuentas-transacciones',
  templateUrl: './crear-cuentas-transacciones.component.html',
  styleUrl: './crear-cuentas-transacciones.component.css'
})
export class CrearCuentasTransaccionesComponent  implements OnInit {
  transaccionForm: FormGroup;
  cuentas: any[] = [];
  categorias: string[] = ['Alimentos', 'Transporte', 'Entretenimiento', 'Salud']; // Ejemplo de categorías
  tiposTransaccion: string[] = ['Gasto', 'Ingreso']; // Tipos de transacciones
  categoriascuenta: string[] = ['Ahorros', 'Corriente', 'Inversión', 'Gastos'];
  activeTab: string = 'cuenta'; // Por defecto, muestra el formulario de cuenta
  alertMessage: string = '';
  alertType: string = '';
  showAlert: boolean = false;
  cuentaForm: FormGroup;

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

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private http: HttpClient
  ) {
    // Inicialización del formulario
    this.transaccionForm = this.fb.group({
      monto: ['', Validators.required],
      tipoTransaccion: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      cuentaID: ['', Validators.required],
      frecuenciaID: [1] // Cambia esto según cómo manejes las frecuencias
    });
    this.user =  this.userService.getUser();

    this.cuentaForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      saldo: [0, [Validators.required, Validators.min(0)]],
      usuarioID: [this.user.id] // Cambia esto según cómo obtengas el ID del usuario
    });
  }

  ngOnInit(): void {
    this.fetchCuentas();
  }

  fetchCuentas(): void {
    this.cuentaService.getCuentasByUsuarioId(this.user.id).subscribe(data => {
      this.cuentas = data || []; // Asegúrate de que sea un array
    }, error => {
      console.error('Error fetching cuentas:', error);
      this.cuentas = []; // O manejar el error de otra manera
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  cuenta = {
    nombre: '',
    categoria: '',
    descripcion: '',
    saldo: 0,
    usuarioID: this.user.id
  };

  transaccion = {
    monto: 0,
    tipoTransaccion: '',
    categoria: '',
    descripcion: '',
    cuentaID: 0,
    frecuenciaID: 1
  };



  onSubmit(): void {
    if (this.transaccionForm.valid) {
      this.crearTransaccion();
    }
  }

  onSubmitCuenta(): void {
    if (this.cuentaForm.valid) {
      this.crearCuenta();
    }
  }
// Método para crear una nueva cuenta
  crearCuenta(): void {
    const cuentaData = this.cuentaForm.value;
    this.cuentaService.createCuenta(cuentaData).subscribe(
      response => {
        this.showAlertMessage('Cuenta creada exitosamente.', 'success');
        this.resetCuentaForm();
      },
      error => {
        this.showAlertMessage('Error al crear la cuenta.', 'danger');
      }
    );
  }

  // Método para crear una nueva transacción
  crearTransaccion(): void {
    const transaccionData = this.transaccionForm.value;
    this.cuentaService.createTransaccion(transaccionData).subscribe(
      response => {
        this.showAlertMessage('Transacción creada exitosamente.', 'success');
        this.resetTransaccionForm();
      },
      error => {
        this.showAlertMessage('Error al crear la transacción.', 'danger');
      }
    );
  }

  // Mostrar mensajes de alerta
  showAlertMessage(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  // Resetear el formulario de cuenta
  resetCuentaForm(): void {
    this.cuenta = {
      nombre: '',
      categoria: '',
      descripcion: '',
      saldo: 0,
      usuarioID: 1
    };
  }

  // Resetear el formulario de transacción
  resetTransaccionForm(): void {
    this.transaccion = {
      monto: 0,
      tipoTransaccion: '',
      categoria: '',
      descripcion: '',
      cuentaID: 1,
      frecuenciaID: 1
    };
  }

}
