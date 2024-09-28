import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isCreateSectionVisible: boolean = true; // Inicialmente se muestra la sección de creación


  constructor(private authService: UserService) {}

  showCreateSection() {
    this.isCreateSectionVisible = true;
  }

  showConsultaSection() {
    this.isCreateSectionVisible = false;
  }

  logout() {
    this.authService.logout();
  }
}
