import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {AuthenticationService} from '../../providers/authentication.service'
import {NotificationService} from '../../providers/notification.service'

import {VitalsPage} from '../vitals/vitals'


import moment from 'moment';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  icons: string[] = [];
  pages: string[] = [];
  items: Array<{
    id: number, 
    icon: string, 
    title: string, 
    note: string,
    notificationType: string,
    read: boolean
  }>;


  constructor(
      public navCtrl: NavController, 
      public storage: Storage, 
      public authenticationService: AuthenticationService,
      public notificationService: NotificationService
    ) {
    // Let's populate this page with some filler content for funzies

    this.icons['MEDICATION'] = 'md-medkit';
    this.icons['VITAL'] = 'md-heart';
    this.icons['CHECKIN'] = 'md-clock';
    this.icons['APPOINTMENT'] = 'md-calendar';
    this.icons['RECOMMENDATION'] = 'md-checkmark';

    this.pages['MEDICATION'] = VitalsPage;
    this.pages['VITAL'] = VitalsPage;
    this.pages['CHECKIN'] = VitalsPage;
    this.pages['APPOINTMENT'] = VitalsPage;
    this.pages['RECOMMENDATION'] = VitalsPage;

    this.items = [];
  }

  ionViewDidLoad() {
    this.loadData();
  }

  itemTapped($event, item){
    if (!item.read){
      this.notificationService.markAsRead(item.id).subscribe(data => {
        item.class = 'read';
        this.navCtrl.push(this.pages[item.notificationType]);
      }, error => {
      });
    }else{
      this.navCtrl.push(this.pages[item.notificationType]);
    }
  }

  loadData(){
    this.notificationService.get().subscribe( notifications => {
      for (let i = 0; i < notifications.length; i++){
        let notification = notifications[i];
        console.log(notification);
        this.items.push({
          id: notification.id,
          date: moment(notification.actualSendDate).format('DD/MM/YYYY HH:mm:ss'),
          note: notification.body,
          icon: this.icons[notification.notificationType],
          read: notification.readDate != null,
          notificationType: notification.notificationType,
          class: notification.readDate ? 'read' : 'unread'
        });
      }
    }, error => {

    });
  }

}

