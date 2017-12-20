import { Injectable } from '@angular/core';
import { ENV } from '../config/environment';
import {AuthenticationService} from './authentication.service'
import {HttpClient} from './http-client.service'

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import moment from 'moment';


@Injectable()
export class FitBitService {
  endpoint: string;

  urlPrefix: string = "/measurements/fitbit/";

  constructor(public httpClient: HttpClient, public authentication: AuthenticationService) {
    this.endpoint = ENV.API_URL;
  }

  updateUserToken(accessToken, expiresIn, accountUserId){
    let user = this.authentication.getUser();
    let url = this.endpoint + "/users/" + user.id + '/fitbit';
    return this.httpClient.post(url, {wearableType: 'FITBIT', access_token: accessToken, expires_in: expiresIn, user_id: accountUserId}).map(data => data.json());
  }

  heartRate(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "heart-rate/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

  steps(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "steps/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

  weight(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "weight/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

  burntCalories(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "burnt-calories/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

  bloodPressure(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "blood-pressure/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

  distance(treatmentId: number): Observable<any>{
    let url = this.endpoint + this.urlPrefix + "distance/treatment/" + treatmentId + "/date/" + moment().format("YYYY-MM-DD");
    return this.httpClient.get(url).map(data => data.json());
  }

}