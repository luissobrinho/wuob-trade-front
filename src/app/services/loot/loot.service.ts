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
        events.subscribe('token',(token)=>{
          this._TOKEN = token;
        })
  }

  getWallets(): Promise<Wallets> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.get('carteiras', {}, header).subscribe((response: Wallets) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

   checkNewhashWallets(): Promise<string> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.get('carteiras', {}, header).subscribe((response: Wallets) => {
        resolve(response.data[0].hash_new)
      }, err => {
        reject(err);
      })

    })
  }

  getWalletsPages(url: string): Promise<Wallets> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.request(url, header).subscribe((response: Wallets) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

  getWallet(idForm): Promise<Wallet> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.get(`carteiras/${idForm}`, {}, header).subscribe((response: Wallet) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

  updateWallet(idForm, data): Promise<any> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.put(`carteiras/${idForm}`, data, header).subscribe((response: any) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

  activeWallet(wallet: Wallet, inputToken: {}): Promise<any> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.put(`carteiras/${wallet.id}/active`, inputToken, header).subscribe((response: any) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

  getReportWithDrawal(): Promise<WithDrawals> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.get('movimentacao_investimentos', {}, header).subscribe((response:WithDrawals) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })

  }

  getReportWithDrawalPage(url: string): Promise<WithDrawals> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.request(url, header).subscribe((response: WithDrawals) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })

  }

  createWithDraw(withdraw): Promise<movement> {

    let createWithdraw = this.mapValue(withdraw);

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<movement>((resolve, reject) => {
      this.api.post('movimentacao_investimentos', createWithdraw, header).subscribe((response: movement) => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })

  }

  private mapValue(movement) {
    return { carteira_id: movement.wallet, valor: movement.value }
  }

  createWallet(wallet): Promise<Wallet> {

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

  deleteWallet(id) {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<any>((resolve, reject) => {

      this.api.delete(`carteiras/${id}`, header).subscribe((response) => {
        resolve(response)
      }, err => {
        reject(err)
      })

    })

  }

  private mapValueWallet(wallet) {
    return { nome: wallet.nome, hash: wallet.hash }
  }
}
