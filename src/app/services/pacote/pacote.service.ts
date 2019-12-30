import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Plans, Plan } from 'src/app/models/plans';
@Injectable({
  providedIn: 'root'
})
export class PacoteService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
      this._TOKEN = localStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getPlans(): Promise<Object> {
    //get user credentials
    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return this.api.get('pacotes', {}, header).toPromise();
  }

  getIndicatePlans(): Promise<Object> {
    //get user credentials
    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return this.api.get('pacotes_indica', {}, header).toPromise();
  }
}
