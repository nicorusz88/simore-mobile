import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(4),
        Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('Hello LoginBackgroundSlider Page');
  }

  openResetPassword() {
    console.log('Reset password clicked');
  }

  doLogin() {
    if (!this.loginForm.valid) {
      console.log('Invalid or empty data');
    } else {
      const userEmail = this.loginForm.value.email;
      const userPassword = this.loginForm.value.password;

      console.log('user data', userEmail, userPassword);

      this.navCtrl.setRoot(HomePage);

    }
  }

}

