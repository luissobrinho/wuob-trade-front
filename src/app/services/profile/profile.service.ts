import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { Profile } from 'src/app/models/Profile';import { AuthenticationService } from '../authentication/authentication.service';
import { TranslationService } from '../translation/translation.service';
;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _TOKEN:string;

  constructor(
    private api:ApiService,
    private ngxService: NgxUiLoaderService,
    public events:Events,
    private auth:AuthenticationService,
    public translation: TranslationService
    ) { 
     this._TOKEN = sessionStorage.getItem('Authorization')
      events.subscribe('token',(token)=>{
        this._TOKEN = token;
      })
  }

  updateProfile(user){
      this.translation.translate.use(user.meta.pais);
      let header = {
        Authorization: `Bearer ${this._TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      this.ngxService.start()
      this.api.post('user/profile',user,header).subscribe((response)=>{
            this.auth.getProfile(this._TOKEN).then((res)=>{
              this.ngxService.stop()
              this.events.publish('toast','User was updated with success', 'Success', 5000, 'toast-success')
            },err=>{
               this.ngxService.stop()
               this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
            })
      },err=>{
          this.ngxService.stop()
          this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
      })

  }

}
