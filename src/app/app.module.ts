import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavigationComponent } from  './navigation/navigation.component';
import { RegisterComponent } from './user/register/register.component';
import {UpdateComponent} from "./user/update/update.component";

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    NavigationComponent,
    RegisterComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['your-api-url.com'],
        disallowedRoutes: ['your-api-url.com/']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
