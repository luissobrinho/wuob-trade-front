import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements User 
{
  login: string;
  email: string;
  name: string;
  pass: string;

  constructor(private ofAuth:AngularFireAuth){
        this.name = 'admin'
        this.email = 'admin@test'
        this.login = 'admin'
        this.pass = 'admin'
   }

  signIn(email,pass){
      if(this.email === email && this.pass === pass)return true;

      return false;
  }

  signInGoogle(){
    return new Promise<any>((resolve,reject)=>{
        let provider =  new auth.GoogleAuthProvider()
        provider.addScope('profile');
        provider.addScope('email');
        this.ofAuth.auth
        .signInWithPopup(provider)
        .then(result => {

           resolve(result);

        },err=>reject(err))
    })
  }

}
