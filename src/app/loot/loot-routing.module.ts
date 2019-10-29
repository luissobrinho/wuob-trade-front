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
          title: 'Withdraw',
          urls: [
            { title: 'Loot', url: '/withdraw' },
            { title: 'Withdraw' }
          ]
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Withdrawal Report',
          urls: [
            { title: 'Loot', url: '/report' },
            { title: 'Withdrawal Report' }
          ]
        }
      },
      {
        path: 'wallet',
        component: WalletComponent,
        data: {
          title: 'My Wallet',
          urls: [
            { title: 'Loot', url: '/wallet' },
            { title: 'My Wallet' }
          ]
        }
      },
      {
        path: 'wallet-edit/:id',
        component: WalletEditComponent,
        data: {
          title: 'Edit Wallet',
          urls: [
            { title: 'Loot', url: '/wallet-edit' },
            { title: 'wallet-edit' }
          ]
        }
      },
      {
        path: 'wallets',
        component: WalletslistComponent,
        data: {
          title: 'My Wallets',
          urls: [
            { title: 'Loot', url: '/My Wallets' },
            { title: 'My Wallets' }
          ]
        }
      },
    ]
  }
];
