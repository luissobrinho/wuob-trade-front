import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Balance } from 'src/app/models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
      this._TOKEN = localStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getBalance():Promise<Balance>{

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<Balance>((resolve,reject)=>{
      this.api.get('user/balanco',{},header).subscribe((response:Balance)=>{
          resolve(response)
      },err=>{
          reject(err)
      })
    })
}

}
