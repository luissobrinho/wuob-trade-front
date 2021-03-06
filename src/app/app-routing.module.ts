import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { GuardService } from './services/guard/guard.service'
import { GuardactiveService } from './services/guardactive/guardactive.service'
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ProfileComponent } from '../app/profile/profile/profile.component';

export const Approutes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: '', redirectTo: '/authentication/login', pathMatch: 'full'},
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      },
      {
        path: 'confirmemail',
        component:ConfirmemailComponent,
        canActivate:[GuardService]
      },
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboards/dashboard.module#DashboardModule',
        canActivate:[GuardService,GuardactiveService]
      },
      { path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
      {
        path: 'sample-pages',
        loadChildren: './sample-pages/sample-pages.module#SamplePagesModule'
      },
      {
        path: 'investiments',
        loadChildren: './investiments/investiments.module#InvestimentsModule',
        canActivate:[GuardService]
      },
      {
        path: 'loot',
        loadChildren: './loot/loot.module#LootModule',
        canActivate:[GuardService]
      },
      {
        path: 'network',
        loadChildren: './network/network.module#NetworkModule',
        canActivate:[GuardService]
      },
      {
        path: 'yield',
        loadChildren: './yield/yield.module#YieldModule',
        canActivate:[GuardService]
      },
      {
        path: 'profile',
        component:ProfileComponent,
        canActivate:[GuardService,GuardactiveService]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
