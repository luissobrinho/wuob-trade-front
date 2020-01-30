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
          title: 'ROUTES.INVESTIMENTS.CREATEINVESTIMENTS',
          urls: [
            { title: 'ROUTES.INVESTIMENTS.TITLE', url: '/create' },
            { title: 'ROUTES.INVESTIMENTS.CREATEINVESTIMENTS' }
          ]
        }
      },
      {
        path: 'historic',
        component: HistoricComponent,
        data: {
          title: 'ROUTES.INVESTIMENTS.HISTORICINVESTIMENTS',
          urls: [
            { title: 'ROUTES.INVESTIMENTS.TITLE', url: '/historic' },
            { title: 'ROUTES.INVESTIMENTS.HISTORICINVESTIMENTS' }
          ]
        }
      },
    ]
  }
];
