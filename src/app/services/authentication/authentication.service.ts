import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService
{
  private currentUserSubject:BehaviorSubject<User|any>;
  public currentUser:Observable<User|any>;
  private user:User;

  constructor(private ofAuth:AngularFireAuth,private api:ApiService,private ngxService: NgxUiLoaderService, public events:Events, public router:Router){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue():User|any {
    return this.currentUserSubject.value;
  }

  signIn(user) {
    //Init loading
    this.ngxService.start()
    //sign in web service
    return this.api.post('login', user).subscribe((response: { token: string }) => {
      //get user credentials 
      let header = {Authorization: `Bearer ${response.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' }
      this.api.get('user/profile', {}, header).subscribe((User: {}) => {
        //store user and token in localstorage,sessionstorage and set as current use  
        localStorage.setItem('Authorization', `Bearer ${response.token}`)
        sessionStorage.setItem('Authorization', `Bearer ${response.token}`)
        localStorage.setItem('currentUser', JSON.stringify(User))
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
      this.events.publish('toast', 'Ocorreu um erro inesperado.', 'Erro', null, 'toast-error')
      this.ngxService.stop()
    })
  }

  signUp(user:User):Subscription{
    //Init loading
    this.ngxService.start()
    //register user and return token
    return this.api.post('register',user).subscribe((response:{token:string})=>{

      //get user credentials 
      let header = {Authorization: `Bearer ${response.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' }
      this.api.get('user/profile', {}, header).subscribe((User: {}) => {
           
        //store user and token in localstorage,sessionstorage and set as current use  
            localStorage.setItem('Authorization', `Bearer ${response.token}`)
            sessionStorage.setItem('Authorization', `Bearer ${response.token}`)
            localStorage.setItem('currentUser', JSON.stringify(User))
            sessionStorage.setItem('currentUser', JSON.stringify(User))
            this.currentUserSubject.next(User);
            //redirect to dashboard
            this.router.navigate(['dashboard/classic']).then(() => {
              this.events.publish('toast','Registrado com sucesso','Sucesso',10000,'toast-success')
              this.ngxService.stop()
            }, err => {
              this.events.publish('toast', err, 'Erro',10000, 'toast-error')
              this.ngxService.stop()
            })

          }, err => {
            this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
            this.ngxService.stop()
          })

    },err=>{
        //Display error register
        this.events.publish('toast','Ocorreu um erro','Erro',10000,'toast-error')
        this.ngxService.stop()
    })
}

logOut(){
  // remove user from local storage and set current user to null
  localStorage.clear();
  sessionStorage.clear();
  this.currentUserSubject.next(null);
}

getProfile(token){
      //get user credentials 
      let header = {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' }
      this.api.get('user/profile', {}, header).subscribe((User: {}) => {
        
           //update user localstorage,sessionstorage and set as current use
           localStorage.setItem('currentUser', JSON.stringify(User))
           sessionStorage.setItem('currentUser', JSON.stringify(User))
           this.currentUserSubject.next(User);

         }, err => {
           this.events.publish('toast', err, 'Erro', 5000, 'toast-error')
      })
}

  // signInGoogle(){
  //   return new Promise<any>((resolve,reject)=>{
  //       let provider =  new auth.GoogleAuthProvider()
  //       provider.addScope('profile');
  //       provider.addScope('email');
  //       this.ofAuth.auth
  //       .signInWithPopup(provider)
  //       .then(result => {
  //         this.user.name = result.user.displayName;
  //         this.user.email = result.user.email;
  //         this.user.setPass(result.user.uid)
  //         this.ngxService.start()
  //         return this.api.post('login', this.user).subscribe((response: { token: string }) => {
  //           let header = {Authorization: `Bearer ${response.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' }
  //           this.api.get('user/profile', {}, header).subscribe((User: {}) => {

  //             localStorage.setItem('Authorization', `Bearer ${response.token}`)
  //             sessionStorage.setItem('Authorization', `Bearer ${response.token}`)
  //             localStorage.setItem('currentUser', JSON.stringify(User))
  //             sessionStorage.setItem('currentUser', JSON.stringify(User))
  //             this.currentUserSubject.next(User);
  //             this.router.navigate(['dashboard/classic']).then(() => {
  //               this.ngxService.stop()
  //             }, err => {
  //               this.events.publish('toast', err, 'Erro', null, 'toast-error')
  //               this.ngxService.stop()
  //             })

  //           }, err => {
  //             this.events.publish('toast', err, 'Erro', null, 'toast-error')
  //             this.ngxService.stop()
  //           })

  //         }, err => {
  //           this.events.publish('toast', 'Ocorreu um erro inesperado.', 'Erro', null, 'toast-error')
  //           this.ngxService.stop()
  //         })

  //       },err=>reject(err))
  //   })
  // }


  // mapUser(result):User|any{
  //   this.user.email = result.user.email
  //   this.user.name = result.user.displayName
  //   this.user.login = (typeof result.additionalUserInfo.username === "undefined")?result.user.email:result.additionalUserInfo.username
  //   this.user.photo = result.user.photoURL
  //   this.user.provider = 'google'

  //   return this.user;
  // }

}
