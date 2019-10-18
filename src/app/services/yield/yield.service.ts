import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Yields } from 'src/app/models/Yield';

@Injectable({
  providedIn: 'root'
})
export class YieldService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
      this._TOKEN = localStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getYields():Promise<Yields>{

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise<Yields>((resolve,reject)=>{
        this.api.get('rendimento_investimentos',{},header).subscribe((response:Yields)=>{
            resolve(response)
        },err=>{
            reject(err)
        })
      })
  }

  getYieldsPage(url: string): Promise<Yields> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.request(url, header).subscribe((response: Yields) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })

  }

  
}
