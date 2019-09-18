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
            { title: 'Team', url: '/team' },
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
            { title: 'Residual', url: '/residual' },
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
            { title: 'Bonus', url: '/bonus' },
            { title: 'Bonus' }
          ]
        }
      },
    ]
  }
];
