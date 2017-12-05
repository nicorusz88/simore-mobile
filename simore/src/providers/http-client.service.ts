
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class HttpClient {

  token: string;

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('x-auth-token', this.token); 
  }

  setAuthToken(token){
    this.token = token;
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    return this.http.get(url, options);
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    return this.http.post(url, JSON.parse(JSON.stringify(data)), options);
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    return this.http.put(url, JSON.parse(JSON.stringify(data)), options);
  }
}