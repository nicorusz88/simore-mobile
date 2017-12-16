import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MedicationService } from '../../providers/medication.service'
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-medications',
  templateUrl: 'medications.html'
})
export class MedicationsPage {

  medications: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public medicationService: MedicationService) {
    
  }

  ionViewDidLoad() {
    this.medicationService.all().subscribe(
      medications => {
        this.medications = medications;
        console.log(this.medications);
      },
      error => {
      }
    );
  }
 
}
