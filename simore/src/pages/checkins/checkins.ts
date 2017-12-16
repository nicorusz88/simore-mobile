import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin.service'
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-checkins',
  templateUrl: 'checkins.html'
})
export class CheckinsPage {

  checkins: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public checkinService: CheckinService) {
    
  }

  ionViewDidLoad() {
    this.checkinService.all().subscribe(
      checkins => {
        this.checkins = checkins;
        console.log(this.checkins);
      },
      error => {
      }
    );
  }

  answer(checkin){
    console.log(checkin);
  }
 
}
