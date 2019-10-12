import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/functions/MustMatch';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  submitted = false;
  recoverForm:FormGroup;
  token:string;

  constructor(private formBuilder:FormBuilder,public router:Router,private routeactive:ActivatedRoute,private auth:AuthenticationService) {
      this.token = this.routeactive.snapshot.params.ref;
      console.log(this.token);
      
   }

  ngOnInit() {
        this.recoverForm = this.formBuilder.group({
          email: ['',Validators.compose([Validators.required,Validators.email])],
          password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
          password_confirmation: ['',Validators.compose([Validators.required])],
          terms_and_cond:['1'],
          token:[this.token]
      },{
        validator: MustMatch('password', 'password_confirmation')
      });
  }

  get f() { return this.recoverForm.controls; }

  recover(){
      this.submitted = true

      if(this.recoverForm.invalid){
        return;
      }

      this.auth.recoverPassword(this.recoverForm.value)
  }




}
