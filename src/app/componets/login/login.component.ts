import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: String;
  password: String;
  role: String;

  constructor(
    private authService: AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {

    const user = {
      email: this.email,
      password: this.password,
      role: this.role
    }

    if(user.role != null || user.email != null || user.password != null){
      this.authService.authenticateUserTimedic(user).subscribe(data =>  {
        //console.log(data);
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login Successful', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }, error => {
        //console.log(error.status);
        if(error.status=="401"){
          this.flashMessage.show('Login Failed / Incorrect Email or Password', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);
        }
      });
    }
    else {
      this.flashMessage.show('Please Fill all the field', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/login']);
    }


  }
}
