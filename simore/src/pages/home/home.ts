import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { PatientService } from '../../providers/patient.service'
import { VitalsPage } from '../vitals/vitals'
import { NotificationsPage } from '../notifications/notifications'
import {NotificationService} from '../../providers/notification.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  patient: any;
  undeadNotifications: number = 0;

  constructor(
    public navCtrl: NavController, 
    public patientService: PatientService, 
    public storage: Storage, 
    public alertCtrl: AlertController,
    public notificationService: NotificationService
  ) {  

  }

  ionViewDidLoad() {
    this.storage.get('registrationId').then((registrationId) => {
      this.patientService.get().subscribe(
        patient => {
          this.patient = patient;
          this.patient.deviceToken = registrationId;
          this.patientService.update(this.patient).subscribe(data => {}, error => {});

          this.notificationService.get().subscribe( notifications => {
            for (let i = 0; i < notifications.length; i++){
              if (!notifications[i].readDate){
                this.undeadNotifications++;
              }
            }
          },notifications => {

          });
        },
        error => { 
        }
      );
    });
    
  }


  goToVitals(){
    this.navCtrl.push(VitalsPage);
  }

  goToNotifications() {
    this.navCtrl.push(NotificationsPage); 
  }

}
