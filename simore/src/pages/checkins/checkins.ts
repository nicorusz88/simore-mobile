import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin.service'
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-checkins',
  templateUrl: 'checkins.html'
})
export class CheckinsPage {

  checkins: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public alertCtrl: AlertController, public checkinService: CheckinService) {
    
  }

  ionViewDidLoad() {
    this.loadCheckins();    
  }

  answer(checkin){
    if (checkin.answer){
      let alert = this.alertCtrl.create({
        title: '¡Atención!',
        message: '¿Se encuentra seguro de querer enviar la respuesta?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Responder',
            handler: () => {
              this.doAnswer(checkin);
            }
          }
        ]
      });
      alert.present();
    }else{
      let toast = this.toastCtrl.create({
        message: 'Debe ingresar una respuesta',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    }
  }


  loadCheckins(){
    this.checkinService.all().subscribe(
      checkins => {
        this.checkins = checkins;
        console.log(this.checkins);
      },
      error => {
      }
    );
  }

  private doAnswer(checkin){
    this.checkinService.answer(checkin.id, checkin.answer).subscribe(
      result => {
        console.log(result);
        this.loadCheckins();
      },
      error => {
        console.log(error);
      }
    );
  }
 
}
