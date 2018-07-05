import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisterComponent } from './componets/register/register.component';
import { HomeComponent } from './componets/home/home.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { ProfileComponent } from './componets/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { FooterComponent } from './componets/footer/footer.component';
import { SensorComponent } from './componets/sensor/sensor.component';


import {ProfileService} from './services/profile.service';
import {DatatransferService} from './services/datatransfer.service';
import {ConstantvariablesService} from './services/constantvariables.service';

import { EditProfileComponent } from './componets/edit-profile/edit-profile.component';
import { EditPasswordComponent } from './componets/edit-password/edit-password.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'profileEdit', component: EditProfileComponent, canActivate:[AuthGuard]},
  {path:'passwordEdit', component: EditPasswordComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    SensorComponent,
    EditProfileComponent,
    EditPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, ProfileService, DatatransferService, ConstantvariablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
