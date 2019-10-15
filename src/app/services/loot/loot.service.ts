import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { Wallets, Wallet } from 'src/app/models/Wallet';
import { movement } from 'src/app/models/movement';
import { HttpErrorResponse } from '@angular/common/http';

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

  createWithDraw(withdraw): Promise<movement>{

    let createWithdraw = this.mapValue(withdraw);

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

  createWallet(wallet): Promise<Wallet>{

    let createWallet = this.mapValueWallet(wallet);

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<Wallet>((resolve, reject) => {
      this.api.post('carteiras', createWallet, header).subscribe((response: Wallet) => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  }

  deleteWallet(id){

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise<any>((resolve,reject)=>{

          this.api.delete(`carteiras/${id}`,header).subscribe((response)=>{
              resolve(response)
          },err=>{
              reject(err)
          })

      })
     
  }

  private mapValueWallet(wallet){
    return { nome: wallet.nome, hash: wallet.hash }
  }
}
