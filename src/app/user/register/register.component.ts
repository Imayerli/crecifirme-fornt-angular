// src/app/register/register.component.ts
import {Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {Configuracion} from "../../model/Configuracion";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfiguracionService} from "../../services/configuracion.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  configuraciones: Configuracion[] = [];
  activeStepIndex = 0;
  steps = ['Datos Personales', 'Cuenta', 'Configuraciones'];

  user = {
    nombre: '',
    edad: null,
    estadoCivil: '',
    ingresosMensuales: null,
    preferenciasFinancieras: '',
    email: '',
    clave: ''
  };

  constructor(private authService: UserService, private router: Router,private fb: FormBuilder, private configuracionService: ConfiguracionService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      ingresosMensuales: ['', Validators.required],
      clave: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      configuraciones: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.configuracionService.getConfiguraciones().subscribe((data: Configuracion[]) => {
      this.configuraciones = data;
      this.initConfiguraciones();
    });
  }

  async register() {
    try {
      const response = await this.authService.register(this.user);
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  get configuracionesFormArray(): FormArray {
    return this.registroForm.get('configuraciones') as FormArray;
  }

  initConfiguraciones() {
    this.configuraciones.forEach(config => {
      const group = this.fb.group({
        preferenciasID: [config.preferenciasID],
        tipoConfiguracion: [config.tipoConfiguracion],
        clasificacionConfiguracion: [config.clasificacionConfiguracion],
        datosConfiguracion: this.fb.group(config.datosConfiguracion)
      });
      this.configuracionesFormArray.push(group);
    });
  }

  nextStep() {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
    }
  }

  previousStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  onSubmit() {
    console.log(this.registroForm.value);
    // Lógica para enviar el formulario al backend
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
