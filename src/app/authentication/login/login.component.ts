import { Component, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  authenticationService: any;
  loginform = true;
  recoverform = false;
  email:any;
  pass:any;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private router:Router,private auth:AuthenticationService,private routeactive:ActivatedRoute,
      private toastr:ToastrService,private ngxService: NgxUiLoaderService,private formBuilder:FormBuilder) 
  {
 
    //redirect to home if already logged in
    if (this.auth.currentUserValue) {
        this.router.navigate(['/dashboard/classic']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required,Validators.email],
        password: ['', Validators.required,Validators.minLength(8)]
    });

    //get return url from route parameters or default to '/'
    this.returnUrl = this.routeactive.snapshot.queryParams['returnUrl'] || '/';
  }

  showRecoverForm() {
  	this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  SubmitSignIn(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.signIn(this.f.email.value,this.f.password.value)
  }

  signIn(email,pass){

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
