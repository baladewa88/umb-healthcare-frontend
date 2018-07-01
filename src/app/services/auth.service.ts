import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {tokenNotExpired} from 'angular2-jwt';

import {environment} from '../../environments/environment'
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    let checkRole = user.role;
    let endPoint = "";

    if(checkRole == "Clinic"){
      endPoint = environment.origin_host + 'register/userClinic';
    }
    else if (checkRole == "Nurse"){
      endPoint = environment.origin_host + 'register/userNurse';
    }
    else if (checkRole == "Doctor"){
      endPoint = environment.origin_host + 'register/userDoctor';
    }
    else if (checkRole == "Patient"){
      endPoint = environment.origin_host + 'register/userPatient';
    }
    else if (checkRole == "Admin"){
      endPoint = environment.origin_host + 'register/userAdmin';
    }

    return this.http.post(endPoint, user, {headers: headers}).map(res => res.json());
  }

  authenticateUserTimedic(user): Observable<any> {

    var body = 'email=' + user.email + '&password=' + user.password;
    let checkRole = user.role;
    let endPoint = "";
    let headers = new Headers();

    if(checkRole == "Clinic"){
      endPoint = environment.origin_host + 'authenticate/userClinic';
    }
    else if (checkRole == "Nurse"){
      endPoint = environment.origin_host + 'authenticate/userNurse';
    }
    else if (checkRole == "Doctor"){
      endPoint = environment.origin_host + 'authenticate/userDoctor';
    }
    else if (checkRole == "Patient"){
      endPoint = environment.origin_host + 'authenticate/userPatient';
    }
    else if (checkRole == "Admin"){
      endPoint = environment.origin_host + 'authenticate/userAdmin';
    }

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(endPoint, body, {headers: headers}).map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + 'users/profile/'+this.user.id, {headers: headers}).map(res=> res.json());
  }

  getSensor(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get(environment.origin_host + 'sensors/getAllData', {headers: headers}).map(res=> res.json());
  }

  storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
