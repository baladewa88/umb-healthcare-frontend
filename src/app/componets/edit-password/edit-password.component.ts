import { Component, OnInit } from '@angular/core';
import {DatatransferService} from "../../services/datatransfer.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ConstantvariablesService} from "../../services/constantvariables.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  public user: any;

  constructor(private datatransferService: DatatransferService, private router: Router,
              private flashMessage: FlashMessagesService,
              private constantServ: ConstantvariablesService, private profileService: ProfileService) { }

  ngOnInit() {
    this.user = this.datatransferService.getDataTransfer();
  }

  onEditPasswordSubmit() {

      this.user.oldPassword;

      if(this.user.newPassword == this.user.retypenewPassword){
        console.log("Cocok");
      }

    let updateItem = {
      'password': this.user.password,
    }



    /*
    this.profileService.editProfile(updateItem, this.user.id).subscribe(data => {

      this.flashMessage.show('Your passwprd has been successful updated !', {cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['profile']);
    }, error => {
      this.flashMessage.show('failed update your password !', {cssClass: 'alert-danger', timeout: 5000});
    });
    */
  }

  goBackMenu(){
    this.router.navigate(['profile']);
  }

}
