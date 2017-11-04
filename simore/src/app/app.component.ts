import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import {HttpClient} from '../providers/http-client.service'
import {AuthenticationService} from '../providers/authentication.service'

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public storage: Storage, 
    public httpClient: HttpClient,
    public authenticationService: AuthenticationService
  ) {
    this.initializeApp();

    let user = this.storage.get('user').then((user) => {
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
      { title: 'Salir', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
}
