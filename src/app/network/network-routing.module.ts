import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { TeamComponent } from './team/team.component';
import { ResidualComponent } from './residual/residual.component';
import { BonusComponent } from './bonus/bonus.component';





export const NetworkRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'team',
        component: TeamComponent,
        data: {
          title: 'ROUTES.NETWORK.TEAM',
          urls: [
            { title: 'ROUTES.NETWORK.TITLE', url: '/team' },
            { title: 'ROUTES.NETWORK.TEAM' }
          ]
        }
      },
      {
        path: 'residual',
        component: ResidualComponent,
        data: {
          title: 'Residual',
          urls: [
            { title: 'Network', url: '/residual' },
            { title: 'Residual' }
          ]
        }
      },
      {
        path: 'bonus',
        component: BonusComponent,
        data: {
          title: 'Bonus',
          urls: [
            { title: 'Network', url: '/bonus' },
            { title: 'Bonus' }
          ]
        }
      },
    ]
  }
];
