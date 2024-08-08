import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', clave: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials);
  }
}
