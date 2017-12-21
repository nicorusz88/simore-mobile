import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import { MessageService } from '../../providers/message.service'
import { PatientService } from '../../providers/patient.service'
import { Message } from '../../model/message'

import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  @ViewChild(Content) content: Content;

  messages: any;
  patient: any;
  professional: any;
  messageText: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public messageService: MessageService,
    public patientService: PatientService
  ) {
    
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {
    this.patientService.get().subscribe(patient => {
      this.patient = patient;
      this.professional = patient.professional;

      this.loadMessages();
    },
    error => {
    });
  }


  send() {
    let message = new Message();
    message.from = {};
    message.to = {};
    message.from.id = this.patient.id;
    message.to.id = this.professional.id;
    message.text = this.messageText;
    this.messageService.send(message).subscribe(data =>{
      this.messageText = '';
      this.loadMessages();
    }, error => {

    });
  }

  scrollToBottom(){
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 1000);
    
  }


  private loadMessages(){
    this.messageService.convesation(this.professional.id).subscribe(messages => {
      this.messages = messages;
      for(let i = 0; i < this.messages.length; i++){
        if (this.messages[i].from.id == this.professional.id && !this.messages[i].read){
          this.messageService.setRead(this.messages[i].id).subscribe(data => {

          }, error => {

          });
        }
      }
      this.scrollToBottom();
    }, error => {
    });
  }
 
}
