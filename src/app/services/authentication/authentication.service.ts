import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements User {
  
  user: { login: string; email: string; name: string; pass: string; };
  
  constructor(){
        this.user.name = 'admin'
        this.user.email = 'admin@test'
        this.user.login = 'admin'
        this.user.pass = 'admin'
   }

  signIn(email,pass){

      if(this.user.email === email && this.user.pass === pass)return this.user;

      return false;
  }

}
