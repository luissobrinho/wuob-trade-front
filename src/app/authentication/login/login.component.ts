import { Component, Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router:Router,private auth:AuthenticationService,
      private toastr:ToastrService,private ngxService: NgxUiLoaderService) 
  {
   
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
    this.router.navigate(['/dashboard/classic'])
      // if(this.auth.signIn(this.email,this.pass)){
      //   console.log('oi')
      //   this.router.navigate(['/dashboard/classic'])
      // }else{
      //   console.log("oi2")
      //   this.router.navigate(['/'])
      // }

  }

  googleSignIn(){
    this.ngxService.start()
    this.auth.signInGoogle().then(result=>{
        let user = {
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL,
          phoneNumber:result.user.phoneNumber,
          provider:'google',
          username:(typeof result.additionalUserInfo.username === "undefined")?result.user.email:result.additionalUserInfo.username
        } 

        this.router.navigate(['dashboard/classic']).then(()=>{
          this.ngxService.stop()
        },err=>{
          this.toastr.error(err)
          this.ngxService.stop()
        })

    },err=>{
        this.ngxService.stop()
        this.toastr.error('Erro','Erro inesperado ao tentar logar!')
    })
  }

}
