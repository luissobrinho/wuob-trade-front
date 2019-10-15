import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrMaskerModule } from 'br-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LootRoutes } from './loot-routing.module';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ReportComponent } from './report/report.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletslistComponent } from './walletslist/walletslist/walletslist.component';



@NgModule({
  declarations: [WithdrawComponent, ReportComponent, WalletComponent, WalletslistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LootRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrMaskerModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class LootModule { }
