import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslationService } from '../translation/translation.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | any>;
  public currentUser: Observable<User | any>;
  private user: User;

  constructor(
    private ofAuth: AngularFireAuth,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    public events: Events,
    public router: Router,
    public translation: TranslationService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User | any {
    return this.currentUserSubject.value;
  }

  signIn(user) {
    //Init loading
    this.ngxService.start()
    //sign in web service
    let header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'Bearer'
    }

    return this.api.post('login', user, header).subscribe((response: { token: string }) => {
      //get user credentials 
      header.Authorization = `Bearer ${response.token}`;

      this.events.publish('token', response.token);

      this.api.get('user/profile', {}, header).subscribe((User: any) => {
        this.translation.translate.use(User.meta.pais);
        //store user and token in sessionStorage,sessionstorage and set as current use  
        sessionStorage.setItem('Authorization', `${response.token}`)
        sessionStorage.setItem('currentUser', JSON.stringify(User))
        this.currentUserSubject.next(User);
        //redirect to dashboard
        this.router.navigate(['dashboard/classic']).then(() => {
          this.ngxService.stop()
        }, err => {
          this.events.publish('toast', err, 'Erro', null, 'toast-error')
          this.ngxService.stop()
        })

      }, err => {
        this.events.publish('toast', err, 'Erro', null, 'toast-error')
        this.ngxService.stop()
      })

    }, err => {
      console.log(err);

      this.events.publish('toast', err, 'Erro', null, 'toast-error')
      this.ngxService.stop()
    })
  }

  signUp(user: User): Subscription {
    //Init loading
    this.ngxService.start()
    //register user and return token
    return this.api.post('register', user).subscribe((response: { token: string }) => {

      //get user credentials 
      let header = {
        Authorization: `Bearer ${response.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      this.events.publish('token', response.token);

      this.api.get('user/profile', {}, header).subscribe((User: any) => {
        this.translation.translate.use(User.meta.pais);
        //store user and token in sessionStorage,sessionstorage and set as current use  
        sessionStorage.setItem('Authorization', `${response.token}`)
        sessionStorage.setItem('currentUser', JSON.stringify(User))
        this.currentUserSubject.next(User);
        //redirect to dashboard
        this.router.navigate(['dashboard/classic']).then(() => {
          this.events.publish('toast', 'Registrado com sucesso', 'Sucesso', 10000, 'toast-success')
          this.ngxService.stop()
        }, err => {
          this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
          this.ngxService.stop()
        })

      }, err => {
        this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
        this.ngxService.stop()
      })

    }, err => {

      //Display error register
      this.events.publish('toast', "The given data was invalid.", 'Erro', 10000, 'toast-error')
      this.ngxService.stop()
    })
  }

  sendEmailResetPassword(user) {

    //get user credentials 
    let header = {
      Authorization: `Bearer`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    this.ngxService.start()
    this.api.post('password/username', user, header).subscribe((response) => {
      this.events.publish('toast', 'Verify your email.', 'Sucesso', 10000, 'toast-success')
      this.ngxService.stop()
    }, err => {
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      this.ngxService.stop()
    })
  }

  recoverPassword(user) {

    //get user credentials 
    let header = {
      Authorization: `Bearer`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    this.ngxService.start()
    this.api.post('password/reset', user, header).subscribe((response) => {

      this.router.navigate(['dashboard/classic']).then(() => {
        this.events.publish('toast', 'Password changed with success.', 'Sucesso', 10000, 'toast-success')
        this.ngxService.stop()
      }, err => {
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
        this.ngxService.stop()
      })

    }, err => {
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      this.ngxService.stop()
    })
  }

  logOut() {
    // remove user from local storage and set current user to null
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('Authorization');
    this.currentUserSubject.next(null);
  }

  getProfile(token): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      //get user credentials 
      let header = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      this.api.get('user/profile', {}, header).subscribe((User: {}) => {
        //update user sessionStorage,sessionstorage and set as current use
        sessionStorage.setItem('currentUser', JSON.stringify(User))
        this.currentUserSubject.next(User);
        this.events.publish('update:user', User)
        resolve(true)
      }, err => {
        reject(false)
        this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
      })
    })

  }
}
