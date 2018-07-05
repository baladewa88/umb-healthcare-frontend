import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../services/profile.service'
import {DatatransferService} from '../../services/datatransfer.service'
import {ConstantvariablesService} from '../../services/constantvariables.service'
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: any;
  religionsel: String;
  gendersel: String;
  dateBirthsel: String;
  religionList: any;
  genderList: any;

  constructor(private datatransferService: DatatransferService,
              private router: Router,
              private flashMessage: FlashMessagesService, private profileService: ProfileService, private constantServ: ConstantvariablesService) { }

  ngOnInit() {
    this.user = this.datatransferService.getDataTransfer();

    this.religionsel = this.user.religion;
    this.gendersel = this.user.gender;
    //this.dateBirthsel = this.user.dateBirth;
    this.religionList = this.constantServ.getReligionList();
    this.genderList = this.constantServ.getGenderList();
  }

  updateReligionEvent(input:string){
    this.religionsel = JSON.parse(input);
    //console.log(this.religionsel)
  }

  updateGenderEvent(input:string){
    this.gendersel = JSON.parse(input);
    //console.log(this.gendersel);
  }

  onEditSubmit() {

    let updateItem = {
      'fullName': this.user.fullName,
      'email': this.user.email,
      'dateBirth': this.user.dateBirth,
      'address': this.user.address,
      'employeeIdNumber': this.user.employeeIdNumber,
      'phoneNumber': this.user.phoneNumber,
      'adminCode': this.user.adminCode,
      'religion' : this.religionsel,
      'gender' : this.gendersel,
      'placeBirth' : this.user.placeBirth
    }

    console.log(this.user.dateBirth);
    console.log(updateItem.religion);
    console.log(updateItem.gender);

    this.profileService.editProfile(updateItem, this.user.id).subscribe(data => {

      this.flashMessage.show('Your profile has been successful updated !', {cssClass: 'alert-success', timeout: 5000});
      //console.log('INI DATA');
      //console.log(data);
      this.router.navigate(['profile']);
    }, error => {
      //console.log('INI ERROR');
      //console.log(error);
      this.flashMessage.show('failed update your profile !', {cssClass: 'alert-danger', timeout: 5000});
    });

  }


  goBackMenu(){
    this.router.navigate(['profile']);
  }

}
