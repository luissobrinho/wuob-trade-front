import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class InvestimentsService {

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


}
