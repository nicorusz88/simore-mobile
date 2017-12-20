import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { PatientService } from '../../providers/patient.service'
import { FitBitService } from '../../providers/fit-bit.service'
import { VitalsPage } from '../vitals/vitals'
import { AppointmentsPage } from '../appointments/appointments'
import { NotificationsPage } from '../notifications/notifications'
import { RecommendationsPage } from '../recommendations/recommendations'
import { MedicationsPage } from '../medications/medications'
import { CheckinsPage } from '../checkins/checkins'

import { NotificationService } from '../../providers/notification.service'

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  patient: any;
  undeadNotifications: number = 0;
  interval: any;

  constructor(
    public navCtrl: NavController, 
    public patientService: PatientService, 
    public storage: Storage, 
    public alertCtrl: AlertController,
    public notificationService: NotificationService,
    public iab: InAppBrowser,
    public fitBitService: FitBitService
  ) {  

  }

  ionViewDidLoad() {
    this.loadData();
    this.interval = setInterval(() => {this.loadNotifications()}, 5000);
  }

  ionViewWillEnter() {
    this.interval = setInterval(() => {this.loadNotifications()}, 5000);
  }

  ionViewWillLeave() {
    console.log("Paro la carga de notificaciones");
    if (this.interval){
      clearInterval(this.interval);
    }
  }


  goToVitals(){
    if (this.patient.oauths && this.patient.oauths.length > 0){
      this.navCtrl.push(VitalsPage);
    }else{
      let alert = this.alertCtrl.create({
        title: 'Atención!',
        subTitle: 'No posee ningún Wareable conectado con Simore, debe conectar uno para poder ver los Vitals',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  goToAppointments(){
    this.navCtrl.push(AppointmentsPage);
  }

  goToMedications(){
    this.navCtrl.push(MedicationsPage);
  }

  goToRecommendations(){
    this.navCtrl.push(RecommendationsPage);
  }

  goToNotifications() {
    this.navCtrl.push(NotificationsPage); 
  }

  goToCheckins() {
    this.navCtrl.push(CheckinsPage); 
  }

  fitbitLogin(){
    const browser = this.iab.create('https://www.fitbit.com/oauth2/authorize?client_id=228L4M&response_type=token&scope=activity%20profile%20heartrate%20location%20nutrition%20sleep%20weight&expires_in=31536000');
    browser.on('loadstart').subscribe(event => {
      if (event.url.match(/^https?:\/\/localhost/)){

        let callbackResponse = (event.url).split("#")[1];
        let responseParameters = (callbackResponse).split("&");
        let parameterMap = {
          access_token: null,
          expires_in: null,
          user_id: null
        };
        for(let i = 0; i < responseParameters.length; i++) {
          if (responseParameters[i].split("=")[0] == 'access_token'){
            parameterMap.access_token = responseParameters[i].split("=")[1];
          }

          if (responseParameters[i].split("=")[0] == 'expires_in'){
            parameterMap.expires_in = responseParameters[i].split("=")[1];
          }

          if (responseParameters[i].split("=")[0] == 'user_id'){
            parameterMap.user_id = responseParameters[i].split("=")[1];
          }
        }

        this.fitBitService.updateUserToken(parameterMap.access_token, parameterMap.expires_in, parameterMap.user_id).subscribe(data => {
          this.loadData();
        }, error => {
          console.log(error);
        });

        browser.close();
      }
    }, err => {
    });
  }


  private loadData(){
    this.storage.get('registrationId').then((registrationId) => {
      this.patientService.get().subscribe(
        patient => {
          this.patient = patient;
          this.patient.deviceToken = registrationId;
          this.patientService.update(this.patient).subscribe(data => {}, error => {});

          this.loadNotifications();
        },
        error => { 
        }
      );
    });
  }


  private loadNotifications(){
    this.notificationService.get().subscribe( notifications => {
      for (let i = 0; i < notifications.length; i++){
        if (!notifications[i].readDate){
          this.undeadNotifications++;
        }
      }
    }, notifications => {

    });
  }

}
