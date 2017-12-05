import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FitBitService} from '../../providers/fit-bit.service'
import {PatientService} from '../../providers/patient.service'
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-vitals',
  templateUrl: 'vitals.html'
})
export class VitalsPage {

  patient: any;
  entry: any;
  data: any = [];
  vitals: any = [];
  services: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public patientService: PatientService, public fitBitService: FitBitService) {
    // If we navigated to this page, we will have an item available as a nav param

    this.patientService.get().subscribe(
      patient => {
        this.patient = patient;

        this.vitals["HEART_RATE"] = this.fitBitService.heartRate(this.patient.treatment.id);
        this.vitals["STEPS"] = this.fitBitService.steps(this.patient.treatment.id);
        this.vitals["WEIGHT"] = this.fitBitService.weight(this.patient.treatment.id);
        this.vitals["BURNT_CALORIES"] = this.fitBitService.burntCalories(this.patient.treatment.id);
        this.vitals["BLOOD_PRESSURE"] = this.fitBitService.bloodPressure(this.patient.treatment.id);
        this.vitals["DISTANCE"] = this.fitBitService.distance(this.patient.treatment.id);

        for (let i = 0; i < this.patient.treatment.vitals.length; i++) {
          this.services.push(this.vitals[this.patient.treatment.vitals[i].type]);
        }

        Observable.forkJoin(this.services).subscribe(t=> {
          for (let i = 0; i < this.patient.treatment.vitals.length; i++) {
            this.data[this.patient.treatment.vitals[i].type] = t[i];
          }
          console.log(this.data);
        });
      },
      error => {
      }
    );
  }


  hasVital(name){
    return this.data[name].length >= 1;
  }

 
}
