import { Routes } from '@angular/router';
import { YieldreportComponent } from './yieldreport/yieldreport.component';


export const YieldRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'yieldreport',
        component: YieldreportComponent,
        data: {
          title: 'ROUTES.YIELD.YIELDREPORT',
          urls: [
            { title: 'ROUTES.YIELD.TITLE', url: 'yield' },
            { title: 'ROUTES.YIELD.YIELDREPORT' }
          ]
        }
      },
    ],
    
  }
];

