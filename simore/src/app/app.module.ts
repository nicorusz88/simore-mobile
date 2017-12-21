import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { VitalsPage } from '../pages/vitals/vitals';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { RecommendationsPage } from '../pages/recommendations/recommendations';
import { MedicationsPage } from '../pages/medications/medications';
import { CheckinsPage } from '../pages/checkins/checkins';
import { MessagesPage } from '../pages/messages/messages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// Services
import { HttpClient } from '../providers/http-client.service';
import { AuthenticationService } from '../providers/authentication.service';
import { PatientService } from '../providers/patient.service';
import { FitBitService } from '../providers/fit-bit.service'
import { NotificationService } from '../providers/notification.service'
import { AppointmentService } from '../providers/appointment.service'
import { RecommendationService } from '../providers/recommendation.service'
import { MedicationService } from '../providers/medication.service'
import { CheckinService } from '../providers/checkin.service'
import { MessageService } from '../providers/message.service'

import { Push } from '@ionic-native/push';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    VitalsPage,
    NotificationsPage,
    AppointmentsPage,
    MedicationsPage,
    RecommendationsPage,
    CheckinsPage,
    MessagesPage
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
    NotificationsPage,
    AppointmentsPage,
    MedicationsPage,
    RecommendationsPage,
    CheckinsPage,
    MessagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    AuthenticationService,
    PatientService,
    FitBitService,
    NotificationService,
    AppointmentService,
    RecommendationService,
    MedicationService,
    CheckinService,
    Push,
    InAppBrowser,
    MessageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
