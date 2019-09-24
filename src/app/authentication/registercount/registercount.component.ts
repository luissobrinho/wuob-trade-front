import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MustMatch } from 'src/app/functions/MustMatch';
import { Observable, Subscription } from 'rxjs';
import {  map ,flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-registercount',
  templateUrl: './registercount.component.html',
  styleUrls: ['./registercount.component.css']
})
export class RegistercountComponent implements OnInit, OnDestroy {

  submitted = false;
  registerForm:FormGroup;
  private future:Date;
  private futureString:string;
  private counter$:Observable<number>;
  private subscription:Subscription;
  private message:string;

  constructor(private auth:AuthenticationService,private formBuilder:FormBuilder,public elm:ElementRef) {
       this.futureString = elm.nativeElement.getAttribute('inputDate');
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
}

ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

ngOnInit() {

  this.future = new Date(this.futureString);
  this.counter$ = interval(1000).flatMap((x) => {
     return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
  });

  this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));
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

      this.auth.signUp(this.registerForm.value)
  }


}
