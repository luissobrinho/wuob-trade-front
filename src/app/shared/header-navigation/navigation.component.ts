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
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslationService } from 'src/app/services/translation/translation.service';
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
    private translationService: TranslationService) {
      this.user = new User()
  }

  ngOnInit(){
      let User = JSON.parse(localStorage.getItem('currentUser'))
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
      language: 'en'
    },
    {
      btn: '',
      icon: 'flag-icon flag-icon-pt',
      title: 'Portuguese',
      language: 'pt'
    },
    {
      btn: '',
      icon: 'flag-icon flag-icon-fr',
      title: 'French',
      language: 'fr'
    },
  ];


  // This is for Mymessages
  // mymessages: Object[] = [
  //   {
  //     useravatar: 'assets/images/users/1.jpg',
  //     status: 'online',
  //     from: 'Pavan kumar',
  //     subject: 'Just see the my admin!',
  //     time: '9:30 AM'
  //   },
  //   {
  //     useravatar: 'assets/images/users/2.jpg',
  //     status: 'busy',
  //     from: 'Sonu Nigam',
  //     subject: 'I have sung a song! See you at',
  //     time: '9:10 AM'
  //   },
  //   {
  //     useravatar: 'assets/images/users/2.jpg',
  //     status: 'away',
  //     from: 'Arijit Sinh',
  //     subject: 'I am a singer!',
  //     time: '9:08 AM'
  //   },
  //   {
  //     useravatar: 'assets/images/users/4.jpg',
  //     status: 'offline',
  //     from: 'Pavan kumar',
  //     subject: 'Just see the my admin!',
  //     time: '9:00 AM'
  //   }
  // ];

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
    this.translationService.translate.use(language);
  }

}
