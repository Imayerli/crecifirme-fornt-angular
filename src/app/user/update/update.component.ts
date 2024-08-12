// src/app/update-user/update-user.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  user = {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
  }

  async update() {
    try {
      const response = await this.userService.updateUser(this.user);
      console.log('Update successful', response);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Update failed', error);
    }
  }
}
