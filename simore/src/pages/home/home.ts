import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PatientService} from '../../providers/patient.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  patient: Object;

  constructor(public navCtrl: NavController, public patientService: PatientService) {  }

  ionViewDidLoad() {
    this.patientService.getPatient().subscribe(
      patient => { this.patient = patient;}, 
      error => { });
  }

}
