import { Injectable } from '@angular/core';
import { ENV } from '../config/environment';
import {AuthenticationService} from './authentication.service'
import {HttpClient} from './http-client.service'

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckinService {
  endpoint: string;

  constructor(public httpClient: HttpClient, public authentication: AuthenticationService) {
    this.endpoint = ENV.API_URL;
  }

  all(): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/checkins/user/" + user.id;
    return this.httpClient.get(url).map(data => data.json());
  }

  get(checkinId: number): Observable<any> {
    let user = this.authentication.getUser();
    let url = this.endpoint + "/checkins/user/" + user.id;
    return this.httpClient.get(url).map(data => data.json()); 
  }

  answer(checkinId: number, answer: string): Observable<any> {
    let user = this.authentication.getUser();
    let url = this.endpoint + "/checkins/answer/" + checkinId;
    return this.httpClient.post(url, {answer: answer}).map(data => data.json()); 
  }

}