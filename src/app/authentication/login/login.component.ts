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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationService: any;
  loginform = true;
  recoverform = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private router:Router,private auth:AuthenticationService,private routeactive:ActivatedRoute,
      private toastr:ToastrService,private ngxService: NgxUiLoaderService,private formBuilder:FormBuilder)
  {
    window.document.getElementsByTagName('body').item(0).classList.remove('overflow')
    //redirect to home if already logged in
    if (this.auth.currentUserValue) {
        this.router.navigate(['/dashboard/classic']);
    }
  }

  ngOnInit() {

  this.loginForm = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
      remember: ['']
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
        return false;
    }

    this.signIn(this.loginForm.value);
  }

  signIn(user){
      this.auth.signIn(user);
  }

  // googleSignIn(){
  //   this.ngxService.start()
  //   this.auth.signInGoogle().then(result=>{

  //       this.router.navigate(['dashboard/classic']).then(()=>{
  //         this.ngxService.stop()
  //       },err=>{
  //         this.toastr.error(err)
  //         this.ngxService.stop()
  //       })

  //   },err=>{
  //       this.ngxService.stop()
  //       this.toastr.error('Erro','Erro inesperado ao tentar logar!')
  //   })
  // }

}
