import { Component } from '@angular/core';
import { User } from './models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';

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
        public translate:TranslateService,
    ) {
        this.translate.addLangs(['en','fr'])
        this.translate.setDefaultLang('en')
        const browserlang = this.translate.getBrowserLang()
        this.translate.use(browserlang.match(/en|fr/)? browserlang:'en') 
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
