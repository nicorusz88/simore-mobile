import { Injectable } from '@angular/core';
import { ENV } from '../config/environment';
import {AuthenticationService} from './authentication.service'
import {HttpClient} from './http-client.service'
import { Message } from '../model/message';


import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class MessageService {
  endpoint: string;

  constructor(public httpClient: HttpClient, public authentication: AuthenticationService) {
    this.endpoint = ENV.API_URL + "/messages";
  }

  send(message: Message): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/send";
    return this.httpClient.post(url,  JSON.parse(JSON.stringify(message))).map(data => data.json());
  }

  setRead(messageId: number): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/set-read/" + messageId;
    return this.httpClient.get(url).map(data => data.json());
  }

  convesation(professionalId: number): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/conversation/" + user.id + "/" + professionalId;
    return this.httpClient.get(url).map(data => data.json());
  }

  getAllSent(userId: number): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/sent/" + userId;
    return this.httpClient.get(url).map(data => data.json());
  }

  unread(): Observable<number> {
    let user = this.authentication.getUser();
    let url = this.endpoint + "/unread/" + user.id;
    return this.httpClient.get(url).map(data => {
      return parseInt(data.text());
    });
  }
}