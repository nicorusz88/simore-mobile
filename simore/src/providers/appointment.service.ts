import { Injectable } from '@angular/core';
import { ENV } from '../config/environment';
import {AuthenticationService} from './authentication.service'
import {HttpClient} from './http-client.service'

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class AppointmentService {
  endpoint: string;

  constructor(public httpClient: HttpClient, public authentication: AuthenticationService) {
    this.endpoint = ENV.API_URL;
  }

  all(): Observable<any>{
    let user = this.authentication.getUser();
    let url = this.endpoint + "/appointments/user/" + user.id;
    return this.httpClient.get(url).map(data => data.json());
  }

}