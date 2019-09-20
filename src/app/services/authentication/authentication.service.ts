import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  
{
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;
  private user:User;
  
  constructor(private ofAuth:AngularFireAuth,private api:ApiService,private ngxService: NgxUiLoaderService, public events:Events){}


  public get currentUserValue():User {
    return this.currentUserSubject.value;
  }

  signIn(email,pass){

    // console.log(this.urlAPI + '/api/v1/login');
    
    // this.http.post(this.urlAPI +'/api/v1/login',{
    //   email: email,
    //   password:pass
    // }).subscribe(user=>{
    //   console.log(user);
      
    // },err=>{
    //   console.log(err);
      
    // });
      // if(email === 'admin@admin' && pass === 'admin12345'){
      //     this.user.name = 'admin'
      //     this.user.email = 'admin@admin'
      //     this.user.login = 'admin'
      //     localStorage.setItem('currentUser',JSON.stringify(this.user))
      //     this.currentUserSubject.next(this.user);
      //     return true
      // }else{
      //     return false
      // }
      return true;
  }

  signInGoogle(){
    return new Promise<any>((resolve,reject)=>{
        let provider =  new auth.GoogleAuthProvider()
        provider.addScope('profile');
        provider.addScope('email');
        this.ofAuth.auth
        .signInWithPopup(provider)
        .then(result => {
          
          //Storing user in Local Storage
          localStorage.setItem('currentUser', JSON.stringify(this.mapUser(result)));
          //Added as user current
          this.currentUserSubject.next(this.user);
          //User resolved
          resolve(this.user);

        },err=>reject(err))
    })
  }

  signUp(user:User):Subscription{
      this.ngxService.start()
      return this.api.post('register',user).subscribe((token:string)=>{
         this.ngxService.stop()
         localStorage.setItem('Authorization',`Bearer ${token}`)
         sessionStorage.setItem('Authorization',`Bearer ${token}`)
         this.events.publish('toast','Registrado com sucesso','Sucesso',null,'toast-success')
      },err=>{
          this.events.publish('toast','Ocorreu um erro','Erro',null,'toast-error')
          this.ngxService.stop()
      })
  }

  logOut(){
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  mapUser(result):User{
    this.user.email = result.user.email
    this.user.name = result.user.displayName
    this.user.login = (typeof result.additionalUserInfo.username === "undefined")?result.user.email:result.additionalUserInfo.username
    this.user.photo = result.user.photoURL
    this.user.provider = 'google'

    return this.user;
  }

}
