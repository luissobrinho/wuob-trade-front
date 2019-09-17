import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MustMatch } from 'src/app/functions/MustMatch';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  submitted = false;
  registerForm:FormGroup;

  constructor(private auth:AuthenticationService,private toastr:ToastrService,private ngxService: NgxUiLoaderService
    ,private formBuilder:FormBuilder) {
     
    }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['',Validators.compose([Validators.required])],
          email: ['',Validators.compose([Validators.required,Validators.email])],
          password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
          confirmpassword: ['',Validators.compose([Validators.required])],
          term: ['',Validators.compose([Validators.required])]
      },{
        validator: MustMatch('password', 'confirmpassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  register(){
      this.submitted = true

      if(this.registerForm.invalid){
        return;
      }

      this.toastr.success('Success','User created with success!')
  }


}
