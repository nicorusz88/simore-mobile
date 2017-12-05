import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VitalsPage } from '../pages/vitals/vitals';
import { NotificationsPage } from '../pages/notifications/notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

// Services
import { HttpClient } from '../providers/http-client.service';
import { AuthenticationService } from '../providers/authentication.service';
import { PatientService } from '../providers/patient.service';
import { FitBitService } from '../providers/fit-bit.service'
import { NotificationService } from '../providers/notification.service'

import { Push } from '@ionic-native/push';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    VitalsPage,
    NotificationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    VitalsPage,
    NotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    AuthenticationService,
    PatientService,
    FitBitService,
    NotificationService,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
