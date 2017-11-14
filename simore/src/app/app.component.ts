import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import {HttpClient} from '../providers/http-client.service'
import {AuthenticationService} from '../providers/authentication.service'

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//import { FCM } from '@ionic-native/fcm';

import { Push, PushObject, PushOptions} from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public storage: Storage, 
    public httpClient: HttpClient,
    public authenticationService: AuthenticationService, 
    public alertCtrl: AlertController,
    //public fcm: FCM,
    public push: Push
  ) {
    this.initializeApp();

    this.storage.get('user').then((user) => {
      if(user && user.token){
        this.httpClient.setAuthToken(user.token);
        this.authenticationService.setUser(user);
        this.rootPage = HomePage;
      }else{
        this.rootPage = LoginPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushsetup();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.storage.remove('user');
    this.nav.setRoot(LoginPage);
  }

  pushsetup() {
    const options: PushOptions = {
       android: {
           sound: 'true'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'true'
       },
       windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log(notification);
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'New Push notification',
          message: notification.message
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log(registration);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
