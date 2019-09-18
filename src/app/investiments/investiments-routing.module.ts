import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';



export const InvestimentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateComponent,
        data: {
          title: 'Create Investiments',
          urls: [
            { title: 'Create', url: '/create' },
            { title: 'Create Investiments' }
          ]
        }
      },
    ]
  }
];
