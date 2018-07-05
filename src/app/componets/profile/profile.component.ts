import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';
import {DatatransferService} from '../../services/datatransfer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor(private profileService: ProfileService, private router: Router, private dataTransferService: DatatransferService) {
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {

      let time = new Date(profile.dateBirth);
      let timeBOD = new Date(profile.firstRegistrationDate);
      profile.dateBirth = formatDateDatabase(time);
      profile.firstRegistrationDate = formatDateDatabase(timeBOD);

      this.user = profile;
    }, err => {
      console.log(err);
      return false;
    });

    function formatDate(date) {
      var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
      ];

      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      var d = new Date(date);
      var dayName = days[d.getDay()];

      return dayName + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    function formatDateDatabase(date) {

      var day = date.getDate();
      var monthIndex = date.getMonth() + 1;
      var year = date.getFullYear();

      if(day <10 ){
         day = "0" + date.getDate();
      }
      if(monthIndex<10){
        monthIndex = "0" + (date.getMonth() + 1);
      }

      return   year+ '-' + monthIndex + '-' + day;
    }

  }

  gotoEditProfile(item: any) {
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['profileEdit']);
  }

  gotoEditPassword(item: any){
    this.dataTransferService.setDataTransfer(item);
    this.router.navigate(['passwordEdit']);
  }

}
