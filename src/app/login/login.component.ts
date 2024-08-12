import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', clave: '' };

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}

  async login() {
    try {
      const response = await this.authService.login(this.credentials);
      console.log('Login successful', response);
      const modal = this.el.nativeElement.querySelector('#loginModal');
      this.renderer.setStyle(modal, 'display', 'none'); // Hide the modal after successful login
      this.router.navigate([this.router.url]); // Reload the page
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
