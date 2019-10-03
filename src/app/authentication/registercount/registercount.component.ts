import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MustMatch } from 'src/app/functions/MustMatch';
import * as moment from 'moment';
import { Router, ActivatedRoute} from '@angular/router';
import { Scroll } from '../../functions/Scroll';


@Component({
  selector: 'app-registercount',
  templateUrl: './registercount.component.html',
  styleUrls: ['./registercount.component.css']
})
export class RegistercountComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  time: string = '00:00:00';
  days: number = 0;
  referenceLink:string = null;


  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder,private router:Router,
    private routeactive:ActivatedRoute) {
      Scroll.showScroll()
      this.referenceLink = (typeof this.routeactive.snapshot.params.ref !== ('undefined'||''||null))?this.routeactive.snapshot.params.ref:null;
      this.countDown()
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      username: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password_confirmation: ['', Validators.compose([Validators.required])],
      term: ['', Validators.compose([Validators.required])],
      referencia:[this.referenceLink]
    }, {
      validator: MustMatch('password', 'password_confirmation')
    });
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true

    if (this.registerForm.invalid) {
      return;
    }

    this.auth.signUp(this.registerForm.value)
  }

  countDown(){
        let eventTime = moment('03-11-2019 00:00:00', 'DD-MM-YYYY HH:mm:ss'),
        currentTime = moment(),
        interval = 1000;

      setInterval(() => {
        let currentTime = moment(),
          milliseconds = eventTime.diff(currentTime, 'milliseconds');

        if (this.days >= 0) {
          this.days = eventTime.diff(currentTime, 'days')
          this.time = moment(milliseconds).format('HH:mm:ss');
        }
      }, interval);
  }


}
