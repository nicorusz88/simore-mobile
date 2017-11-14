import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {PatientService} from '../../providers/patient.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  patient: Object;

  constructor(public navCtrl: NavController, public patientService: PatientService, public storage: Storage, public alertCtrl: AlertController) {  }

  ionViewDidLoad() {
    this.storage.get('registrationId').then((registrationId) => {
      console.log(registrationId);
    });
    this.patientService.getPatient().subscribe(
      patient => { this.patient = patient;}, 
      error => { });
  }

}
