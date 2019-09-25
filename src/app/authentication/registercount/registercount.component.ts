import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MustMatch } from 'src/app/functions/MustMatch';
import { CountdownConfig, CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { format } from 'date-fns';
import * as moment from 'moment';

const MINIUES = 1000 * 60;

@Component({
  selector: 'app-registercount',
  templateUrl: './registercount.component.html',
  styleUrls: ['./registercount.component.css']
})
export class RegistercountComponent implements OnInit {
  @ViewChild('countdown', { static: false }) private counter: CountdownComponent;
  stopConfig: CountdownConfig = { stopTime: new Date().getTime() + 1000 * 30 };
  submitted = false;
  registerForm: FormGroup;
  notify: string;
  config: CountdownConfig = { leftTime: 10, notify: [2, 5] };
  time: string = '00:00:00';
  days: number = 0;


  constructor(private auth: AuthenticationService, private formBuilder: FormBuilder, @Inject(LOCALE_ID) private locale: string) {
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


  customFormat: CountdownConfig = {
    leftTime: 65,
    formatDate: ({ date, formatStr, timezone }) => {
      let f = formatStr;
      if (date > MINIUES) {
        f = 'm分s秒';
      } else if (date === MINIUES) {
        f = 'm分';
      } else {
        f = 's秒';
      }
      return formatDate(date, f, this.locale, timezone || '+0000');
    },
  };

  dateFnsConfig: CountdownConfig = {
    // leftTime: 60 * 60 * 24 * 365 * (2020 - 1970),
    // format: 'DD/MM/YYYY HH:mm:ss',
    // formatDate: ({ date, formatStr }) => format(date, 'DD/MM/YYYY HH:mm:ss'),
    leftTime: (60 * 60 * 24 * 365) * (2020 - 1970) - (60 * 60 * 24 * 46),
    format: 'YYYY-MM-DD HH:mm:ss',
    formatDate: ({ date, formatStr }) => format(date, formatStr),
  };

  prettyConfig: CountdownConfig = {
    leftTime: 60,
    format: 'HH:mm:ss',
    prettyText: text => {
      return text
        .split(':')
        .map(v => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  resetStop() {
    this.stopConfig = { stopTime: new Date().getTime() + 1000 * 30 };
  }

  resetTimer() {
    this.counter.restart();
  }

  handleEvent(e: CountdownEvent) {
    console.log(e);
  }

  handleEvent2(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    console.log(e);
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


}
