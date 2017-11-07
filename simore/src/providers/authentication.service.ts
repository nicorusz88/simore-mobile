import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { ENV } from '../config/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  user: undefined;

  constructor(private http: Http) { }

  public setUser(user){
    this.user = user;
  }

  public getUser(){
    this.user;
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('content-type','application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    let options = new RequestOptions({headers: headers});

    var endpoint = ENV.API_URL + '/authenticate';
    return this.http.post(endpoint, body, options).map(
      data => data.json()
    );
  }

  
}
