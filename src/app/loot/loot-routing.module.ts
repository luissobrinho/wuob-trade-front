import { Routes } from '@angular/router';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReportComponent } from './report/report.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletEditComponent } from './wallet-edit/wallet-edit.component';
import { WalletslistComponent } from './walletslist/walletslist/walletslist.component';

export const LootRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'withdraw',
        component: WithdrawComponent,
        data: {
          title: 'ROUTES.LOOT.WITHDRAW',
          urls: [
            { title: 'ROUTES.LOOT.TITLE', url: '/withdraw' },
            { title: 'ROUTES.LOOT.WITHDRAW' }
          ]
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'ROUTES.LOOT.WITHDRAWALREPORT',
          urls: [
            { title: 'ROUTES.LOOT.TITLE', url: '/report' },
            { title: 'ROUTES.LOOT.WITHDRAWALREPORT' }
          ]
        }
      },
      {
        path: 'wallet',
        component: WalletComponent,
        data: {
          title: 'ROUTES.LOOT.MYWALLET',
          urls: [
            { title: 'ROUTES.LOOT.TITLE', url: '/wallet' },
            { title: 'ROUTES.LOOT.MYWALLET' }
          ]
        }
      },
      {
        path: 'wallet-edit/:id',
        component: WalletEditComponent,
        data: {
          title: 'ROUTES.LOOT.EDITWALLET',
          urls: [
            { title: 'ROUTES.LOOT.TITLE', url: '/wallet-edit' },
            { title: 'ROUTES.LOOT.EDITWALLET' }
          ]
        }
      },
      {
        path: 'wallets',
        component: WalletslistComponent,
        data: {
          title: 'ROUTES.LOOT.MYWALLETS',
          urls: [
            { title: 'ROUTES.LOOT.TITLE', url: '/My Wallets' },
            { title: 'ROUTES.LOOT.MYWALLETS' }
          ]
        }
      },
    ]
  }
];
