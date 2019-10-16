import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { InvestmentResponse, Investments } from 'src/app/models/InvestmentResponse';
import { Rendimento } from 'src/app/models/rendimento';
import { reject } from 'q';
import { resolve } from 'dns';
@Injectable({
  providedIn: 'root'
})
export class InvestimentsService {

  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
      this._TOKEN = localStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getInvestimentsType(): Promise<[]> {

    //get user credentials
    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {
      this.api.get('tipo_investimentos', {}, header).subscribe((response: { data: [] }) => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })

  }

  Invest(investiment): Promise<InvestmentResponse> {

    let Investiment = this.mapValue(investiment)

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<InvestmentResponse>((resolve, reject) => {
      this.api.post('investimento_usuarios', Investiment, header).subscribe((response: InvestmentResponse) => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })
  }

  getInvestiments(): Promise<Investments> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<Investments>((resolve, reject) => {
      this.api.get('investimento_usuarios', {}, header).subscribe((response:Investments) => {
        resolve(response)
      }, err => {
        reject(err)
      })
    })

  }

  getInvestimentsPages(url: string): Promise<Investments> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise((resolve, reject) => {

      this.api.request(url, header).subscribe((response: Investments) => {
        resolve(response)
      }, err => {
        reject(err);
      })

    })
  }

  getDailyChart(): Promise<any> {

    let header = {
      Authorization: `Bearer ${this._TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    return new Promise<any>((resolve,reject)=>{
        this.api.get('user/grafico_diario', {}, header).subscribe((response)=>{
            resolve(response)
        },err=>{
            reject(err)
        })
    })
  
  }

  private mapValue(investiment) {
    return { tipo_investimento_id: investiment.investimenttype, valor: investiment.valueinvestiment }
  }

}
