import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {AuthenticationService} from '../../providers/authentication.service'
import {HttpClient} from '../../providers/http-client.service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  backgrounds = [
    'assets/imgs/background/background-1.jpg',
    'assets/imgs/background/background-2.jpg',
    'assets/imgs/background/background-3.jpg',
    'assets/imgs/background/background-4.jpg'
  ];
  private loginForm: FormGroup;

  constructor(
      public navCtrl: NavController, 
      public formBuilder: FormBuilder, 
      public storage: Storage, 
      public authentication: AuthenticationService,
      public alertCtrl: AlertController,
      public httpClient: HttpClient
    ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(4),
        Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  openResetPassword() {
    console.log('Reset password clicked');
  }

  doLogin() {
    if (!this.loginForm.valid) {
      console.log('Invalid or empty data');
    } else {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authentication.login(username, password).subscribe(
        user => {
          if (user.roles["PATIENT"]){
            console.log(user);
            this.httpClient.setAuthToken(user.token);
            this.storage.set('user', user);
            this.authentication.setUser(user);
            this.navCtrl.setRoot(HomePage);
          }else{
            this.showError("Credenciales inválidas");
          }
        }, 
        error => { 
          console.log(error);
          this.showError(error);
        }
      );
    }
  }

  showError(message){
    let youralert = this.alertCtrl.create({
      title: 'Atención',
      message: message
    });
    youralert.present();
  }

}

