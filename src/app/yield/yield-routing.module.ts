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
          title: 'Yield',
          urls: [
            { title: 'Yield Report', url: 'yield' },
            { title: 'Yield Report' }
          ]
        }
      },
    ],
    
  }
];

