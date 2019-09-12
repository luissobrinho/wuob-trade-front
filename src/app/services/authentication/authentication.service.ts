import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  
{
  private currentUserSubject:BehaviorSubject<User>;
  public currentUser:Observable<User>;
  private user:User;
  
  constructor(private ofAuth:AngularFireAuth){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.user = new User();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  signIn(email,pass){
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

  signOut(){
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
