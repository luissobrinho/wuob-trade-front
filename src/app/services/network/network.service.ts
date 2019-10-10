import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  
  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events) {
     this._TOKEN = sessionStorage.getItem('Authorization')
   }

   getNetwork():Promise<any>{
      
      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      return new Promise((resolve,reject)=>{

          this.api.get('user/network-down',{},header).subscribe((response)=>{
              resolve(response)
          },err=>{
              reject(err);
          })

      })
  }

}
