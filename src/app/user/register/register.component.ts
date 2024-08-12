// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    nombre: '',
    edad: null,
    estadoCivil: '',
    ingresosMensuales: null,
    preferenciasFinancieras: '',
    email: '',
    clave: ''
  };

  constructor(private authService: UserService, private router: Router) {}

  async register() {
    try {
      const response = await this.authService.register(this.user);
      console.log('Registration successful', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
}
