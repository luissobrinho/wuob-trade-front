import { Routes } from '@angular/router';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RegistercountComponent } from './registercount/registercount.component';
import { RecoverComponent } from './recover/recover.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: 'lock',
        component: LockComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      // {
      //   path: 'signup',
      //   component: SignupComponent
      // },
      {
        path: 'signup/:ref',
        component: SignupComponent
      },
      {
        path: 'recover/:ref',
        component: RecoverComponent
      },
      // {
      //   path: 'register',
      //   component: RegistercountComponent
      // },
      // {
      //   path: 'register/:ref',
      //   component: RegistercountComponent
      // },
  
    ]
  }
];
