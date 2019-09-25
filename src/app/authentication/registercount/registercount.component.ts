import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MustMatch } from 'src/app/functions/MustMatch';
import * as moment from 'moment';


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


  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder) {
      this.countDown()
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmpassword: ['', Validators.compose([Validators.required])],
      term: ['', Validators.compose([Validators.required])]
    }, {
      validator: MustMatch('password', 'confirmpassword')
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
