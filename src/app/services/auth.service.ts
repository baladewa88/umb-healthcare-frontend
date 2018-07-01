import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user, {headers: headers}).map(res=> res.json());
  }

  authenticateUser(user){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.post('http://localhost:3000/users/authenticate',user, {headers: headers}).map(res=> res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile/'+this.user.id, {headers: headers}).map(res=> res.json());
  }

  getSensor(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/sensors/getAllData', {headers: headers}).map(res=> res.json());
    //return this.http.get('http://localhost:3000/sensors/getDataById/'+'5a93b269d140a63a948eb779', {headers: headers}).map(res=> res.json());
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
