import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  sensor: Object;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {

    this.authService.getSensor().subscribe(sensor =>{
        this.sensor = sensor;
    }, err => {
      console.log(err);
      return false;
    });

  }

}
