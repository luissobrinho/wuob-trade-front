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
          title: 'Team',
          urls: [
            { title: 'Network', url: '/team' },
            { title: 'Team' }
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
