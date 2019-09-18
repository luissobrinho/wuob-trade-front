import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LootRoutes } from './loot-routing.module';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReportComponent } from './report/report.component';
import { WalletComponent } from './wallet/wallet.component';


@NgModule({
  declarations: [WithdrawComponent, ReportComponent, WalletComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LootRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})

export class LootModule { }
