import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppointmentService } from '../../providers/appointment.service'
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html'
})
export class AppointmentsPage {

  appointments: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appointmentService: AppointmentService) {
    
  }

  ionViewDidLoad() {
    this.appointmentService.all().subscribe(
      appointments => {
        this.appointments = appointments;
        console.log(this.appointments);
      },
      error => {
      }
    );
  }
 
}
