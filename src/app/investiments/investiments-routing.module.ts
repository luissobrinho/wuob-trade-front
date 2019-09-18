import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HistoricComponent } from './historic/historic.component';



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
      {
        path: 'historic',
        component: HistoricComponent,
        data: {
          title: 'Historic Investiments',
          urls: [
            { title: 'Historic', url: '/historic' },
            { title: 'Historic Investiments' }
          ]
        }
      },
    ]
  }
];
