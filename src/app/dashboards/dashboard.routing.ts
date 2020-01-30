import { Routes } from '@angular/router';

import { Dashboard1Component } from './dashboard1/dashboard1.component';


export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'classic',
        component: Dashboard1Component,
        data: {
          title: 'ROUTES.DASHBOARD.TITLE',
          urls: [
            { title: 'ROUTES.DASHBOARD.HOMEPAGE', url: '/dashboard/classic' },
            { title: 'ROUTES.DASHBOARD.TITLE' }
          ]
        }
      },
    ]
  }
];
