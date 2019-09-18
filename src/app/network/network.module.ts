import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamComponent } from './team/team.component';
import { ResidualComponent } from './residual/residual.component';
import { BonusComponent } from './bonus/bonus.component';
import { NetworkRoutes } from './network-routing.module';



@NgModule({
  declarations: [TeamComponent, ResidualComponent, BonusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NetworkRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class NetworkModule { }
