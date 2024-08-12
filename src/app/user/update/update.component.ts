// src/app/user/update/update.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from "../../model/User";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  user: User = {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user =  this.userService.getUser();
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
