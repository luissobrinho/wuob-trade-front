import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LootService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
    this._TOKEN = sessionStorage.getItem('Authorization')
  }

  getWallets():Promise<any>{
      
      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise((resolve,reject)=>{

          this.api.get('carteiras',{},header).subscribe((response:{data:[]})=>{
              resolve(response.data)
          },err=>{
              reject(err);
          })

      })
  }

  getReportWithDrawal():Promise<any>{

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise((resolve,reject)=>{

        this.api.get('movimentacao_investimentos',{},header).subscribe((response:{data:[]})=>{
            resolve(response.data)
        },err=>{
            reject(err);
        })

      })

  }


}
