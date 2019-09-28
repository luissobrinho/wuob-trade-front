import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/functions/MustMatch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  submitted = false;
  registerForm:FormGroup;

  constructor(private auth:AuthenticationService,private formBuilder:FormBuilder,public router:Router) {
       router.navigate(['authentication/register'])
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['',Validators.compose([Validators.required])],
          username: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
          email: ['',Validators.compose([Validators.required,Validators.email])],
          password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
          password_confirmation: ['',Validators.compose([Validators.required])],
          term: ['',Validators.compose([Validators.required])]
      },{
        validator: MustMatch('password', 'password_confirmation')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  register(){
      this.submitted = true

      if(this.registerForm.invalid){
        return;
      }

      this.auth.signUp(this.registerForm.value)
  }


}
