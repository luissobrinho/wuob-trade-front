   import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uuid } from 'src/app/functions/Uuid';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.urlApi

  constructor(public http: HttpClient) { }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(`${this.url}${endpoint}`, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

  post(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.post(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

  put(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.put(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

  delete(endpoint: string, reqOpts?: {}) {
    return this.http.delete(`${this.url}${endpoint}`, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

  patch(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.patch(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

  request(url: string, reqOpts?: {}) {
    return this.http.get(`${url}`, {
      headers: new HttpHeaders(reqOpts).append('HashAppSecurytWeb',Uuid.getUuid)
    })
  }

}
