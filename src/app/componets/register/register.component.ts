import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullName: String;
  email: String;
  password: String;
  role: String;

  constructor(private validateService: ValidateService ,
              private flashMessage:FlashMessagesService,
              private authService: AuthService,
              private  router:Router) {}

  ngOnInit() {
  }

  onRegisterSubmit (){
    //console.log(this.name);
    //const role = this.role;

    const  user = {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      role:  this.role
    }

    if(user.role != null && user.email != null && user.password != null && user.fullName != null) {

      // Validate Email
      if(!this.validateService.validateEmail(user.email)){
        this.flashMessage.show('Please Use valid email', {cssClass: 'alert-danger', timeout: 5000});
        return false;
      }

      // Register User
      this.authService.registerUser(user).subscribe(data => {
        if (data.email != null) {
          this.flashMessage.show('Conratulations, now you are registered as ' + data.email + ' and please go to log in', {
            cssClass: 'alert-success',
            timeout: 5000
          });
          //console.log("Berhasil Input data");
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show('Failed Register', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
          //console.log("Gagal Input data");
        }
      }, error => {
        console.log(error);
        this.flashMessage.show('Unknown Error', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      });
    }
    else{
      this.flashMessage.show('Please Fill all the field', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }

  }

}
