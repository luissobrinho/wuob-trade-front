import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router:Router,private auth:AuthenticationService,private ofAuth:AngularFireAuth,private toastr:ToastrService) {
   
  }

  loginform = true;
  recoverform = false;
  email:any
  pass:any

  showRecoverForm() {
  	this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
    
  }

  signIn(){
      let user = this.auth.signIn(this.email,this.pass)
      if(user){
        this.router.navigate(['/',user])
      }else{
        this.router.navigate(['/authentication/login'])
      }

  }

  googleSignIn(){
    this.googleAuth(new auth.GoogleAuthProvider());
  }

 async googleAuth(provider){
    this.ofAuth.auth.signInWithPopup(provider).then((result)=>{
      if(result){
        let user = {
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
          phoneNumber:result.user.phoneNumber,
          provider:'google',
          username:(typeof result.additionalUserInfo.username === "undefined")?result.user.email:result.additionalUserInfo.username
        }  
      }
    }).catch((err)=>{
        this.toastr.error('Error','Ocorreu um erro inesperado ao tentar logar!',{
          timeOut: 4000
        })
    })
  }

}
