import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TreeviewModule } from 'ngx-treeview';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamComponent } from './team/team.component';
import { ResidualComponent } from './residual/residual.component';
import { BonusComponent } from './bonus/bonus.component';
import { NetworkRoutes } from './network-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  declarations: [TeamComponent, ResidualComponent, BonusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NetworkRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TreeviewModule.forRoot(),
    NgxDatatableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NetworkModule { }
