// src/app/user/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Configuracion } from '../../model/Configuracion';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage: string = '';
  registroForm: FormGroup;
  configuraciones: { [key: string]: Configuracion[] } = {};
  activeStepIndex = 0;
  steps = ['Datos Personales', 'Cuenta'];
  activeTipoIndex = 0;
  user = {
    tipoDocumento: '',
    nroDocumento: '',
    nombre: '',
    apellidos: '',
    sexo: '',
    fechanacimiento: '',
    estadoCivil: '',
    celular: '',
    email: '',
    clave: ''
  };

  constructor(private authService: UserService, private router: Router, private fb: FormBuilder, private configuracionService: ConfiguracionService) {
    this.registroForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      nroDocumento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, this.dateValidator]],
      estadoCivil: ['', Validators.required],
      celular: ['', Validators.required],
      clave: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  async register() {
    try {
      console.log('Registering user', this.user)
      const response = await this.authService.registerUser(this.user);
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage = 'El registro del usuario es no se pudo realizar, verifique los datos ingresados';
    }
  }

  get configuracionesFormArray(): FormArray {
    return this.registroForm.get('configuraciones') as FormArray;
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


  previousTipo() {
    if (this.activeTipoIndex > 0) {
      this.activeTipoIndex--;
    }
  }


  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

// Validador personalizado para la fecha de nacimiento
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    // Validación del formato de la fecha (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return { invalidFormat: true };
    }

    const inputDate = new Date(value);
    const today = new Date();

    // Verificar que la fecha es válida y no está en el futuro
    if (isNaN(inputDate.getTime()) || inputDate >= today) {
      return { invalidDate: true };
    }

    return null; // La validación es exitosa
  }

}
