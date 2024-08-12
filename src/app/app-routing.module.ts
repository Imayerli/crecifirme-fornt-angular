import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {RegisterComponent} from "./user/register/register.component";
import {UpdateComponent} from "./user/update/update.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registeruser', component: RegisterComponent },
  { path: 'updateuser', component: UpdateComponent},
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
