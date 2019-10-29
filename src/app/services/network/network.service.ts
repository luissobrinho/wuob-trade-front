import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  
  private _TOKEN: string;

  constructor(private api: ApiService, public events: Events,private ngxService:NgxUiLoaderService) {
      this._TOKEN = localStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  getNetwork():Promise<any>{
      
      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      this.ngxService.start()
      return new Promise((resolve,reject)=>{
          this.api.get('user/network-down',{},header).subscribe((response)=>{
            this.ngxService.stop()
            resolve(response)
          },err=>{
            this.ngxService.stop()
            reject(err);
          })

      })
  }

}
