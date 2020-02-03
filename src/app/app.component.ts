import { Component } from '@angular/core';
import { User } from './models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TranslationService } from './services/translation/translation.service';
import { Events } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Profile } from './models/Profile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: Profile;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public translation: TranslationService,
    public events: Events,
    private toastr: ToastrService,
    private location: Location
  ) {
    let token = sessionStorage.getItem('Authorization');
    events.subscribe('toast', (message?: string, title?: string, override?: any, type?: string) => {
      this.toastr.show(message, title, override, type)
    });
    //added config of the language. default:en
    this.translation.configLang()

    if (token) {
      this.authenticationService.getProfile(token).then(() => {
        //Subscribe user 
        this.authenticationService.currentUser.subscribe(x => {
          this.currentUser = x;
          this.translation.translate.use(this.currentUser.meta.pais);
        });
        //redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/dashboard/classic']);
          setInterval(() => {
            this.authenticationService.getProfile(token).then(() => { });
          }, 30000)
        }
      })
    } else {
      if (this.location.path().indexOf('signup') < 0 && this.location.path().indexOf('recover') < 0) {
        this.authenticationService.logOut();
        this.router.navigate(['/authentication/login']);
      }
    }

  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(['/authentication/login']);
  }


}
