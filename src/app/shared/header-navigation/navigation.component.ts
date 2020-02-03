import { Component, AfterViewInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {

  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  user:User;

  constructor(private modalService: NgbModal,
    private auth:AuthenticationService,
    private router:Router,
    private ngxService: NgxUiLoaderService,
    private translateService: TranslationService,
    private route: ActivatedRoute,
    private titleService: Title) {
      this.user = new User()
  }

  ngOnInit(){
      let User = JSON.parse(sessionStorage.getItem('currentUser'))
      this.user.name = User.name
      this.user.email = User.email
      this.user.photo = './assets/images/users/1.jpg'
      // this.user.photo = (typeof User.photo !== 'undefined')?User.photo:'/assets/images/users/1.jpg'
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: '',
      icon: 'flag-icon flag-icon-us',
      title: 'United States',
      language: 'en-US'
    },
    {
      btn: '',
      icon: 'flag-icon flag-icon-pt',
      title: 'Portuguese',
      language: 'pt-PT'
    },
    {
      btn: '',
      icon: 'flag-icon flag-icon-fr',
      title: 'French',
      language: 'fr-FR'
    },
  ];

  ngAfterViewInit() {}

  logOut(){
    this.auth.logOut()
    this.ngxService.start()
    this.router.navigate(['/']).then(()=>{
      this.ngxService.stop()
    })
  }

  profile(){
    this.router.navigate(['/profile'])
  }

  wallets(){
    this.router.navigate(['/loot/wallets'])
  }

  translate(language) {
    this.translateService.translate.use(language);
  }

}
