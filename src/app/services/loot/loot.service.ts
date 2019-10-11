import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Wallets } from 'src/app/models/Wallet';
import { movement } from 'src/app/models/movement';

@Injectable({
  providedIn: 'root'
})
export class LootService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
    this._TOKEN = sessionStorage.getItem('Authorization')
  }

  getWallets():Promise<Wallets>{

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise((resolve,reject)=>{

          this.api.get('carteiras',{},header).subscribe((response:Wallets)=>{
              resolve(response)
          },err=>{
              reject(err);
          })

      })
  }

  createWithDraw(withdraw): Promise<movement>{

    let createWithdraw = this.mapValue(withdraw);
    // console.log(createWithdraw);


    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<movement>((resolve, reject) => {
      this.api.post('movimentacao_investimentos', createWithdraw, header).subscribe((response:movement) => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })

  }

  private mapValue(movement) {
    return { carteira_id: movement.wallet, valor: movement.value }
  }
}
