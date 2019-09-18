import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReportComponent } from './report/report.component';
import { WalletComponent } from './wallet/wallet.component';




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
            { title: 'Withdraw', url: '/withdraw' },
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
            { title: 'Report', url: '/report' },
            { title: 'Withdrawal Report' }
          ]
        }
      },
      {
        path: 'wallet',
        component: WalletComponent,
        data: {
          title: 'Wallet',
          urls: [
            { title: 'Wallet', url: '/wallet' },
            { title: 'Wallet' }
          ]
        }
      },
    ]
  }
];
