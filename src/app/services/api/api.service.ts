import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = environment.urlApi()

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
      headers: new HttpHeaders(reqOpts)
    })
  }

  post(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.post(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts)
    })
  }

  put(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.put(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts)
    })
  }

  delete(endpoint: string, reqOpts?: {}) {
    return this.http.delete(`${this.url}${endpoint}`, {
      headers: new HttpHeaders(reqOpts)
    })
  }

  patch(endpoint: string, body: any, reqOpts?: {}) {
    return this.http.patch(`${this.url}${endpoint}`, body, {
      headers: new HttpHeaders(reqOpts)
    })
  }

}
