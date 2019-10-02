import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { InvestmentResponse } from 'src/app/models/InvestmentResponse';
@Injectable({
  providedIn: 'root'
})
export class InvestimentsService{

  private _TOKEN:string;

  constructor(private api:ApiService,public events:Events) {
      this._TOKEN = sessionStorage.getItem('Authorization')
  }

  getInvestimentsType():Promise<[]>{

      //get user credentials 
      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
      }

      return new Promise((resolve,reject)=>{
            this.api.get('tipo_investimentos',{},header).subscribe((response:{data:[]})=>{
                  resolve(response.data)
            },err=>{
                  reject(err)
            })
      })

  }

  Invest(investiment):Promise<InvestmentResponse>{

      let Investiment = this.mapValue(investiment)

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
      }

      return new Promise<InvestmentResponse>((resolve,reject)=>{
          this.api.post('investimento_usuarios',Investiment, header).subscribe((response: InvestmentResponse)=>{
              resolve(response)
          },err=>{
              reject(err)
          })
      })
  }

  getInvestiments():Promise<InvestmentResponse>{

      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
      }
        
      return new Promise<InvestmentResponse>((resolve,reject)=>{
          this.api.get('investimento_usuarios',{}, header).subscribe((response:{data:InvestmentResponse})=>{
              resolve(response.data)
          },err=>{
              reject(err)
          })
      })

  }

  private mapValue(investiment){
      return {tipo_investimento_id:investiment.investimenttype,valor:investiment.valueinvestiment}
  }

}
