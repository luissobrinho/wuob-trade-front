import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements User 
{
  login: string;
  email: string;
  name: string;
  pass: string;

  constructor(){
        this.name = 'admin'
        this.email = 'admin@test'
        this.login = 'admin'
        this.pass = 'admin'
   }

  signIn(email,pass){
      if(this.email === email && this.pass === pass)return true;

      return false;
  }

}
