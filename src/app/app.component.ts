import { Component } from '@angular/core';
import { User } from './models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TranslationService } from './services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        public translation:TranslationService,
    ) { 
        //added config of the language. default:en
        translation.configLang()
        //Subscribe user 
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        //redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/dashboard/classic']);
         }
    }

    logout() {
        this.authenticationService.logOut();
        this.router.navigate(['/authentication/login']);
    }


}
