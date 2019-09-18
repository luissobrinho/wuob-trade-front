import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { InvestimentsRoutes } from './investiments-routing.module';
import { HistoricComponent } from './historic/historic.component';





@NgModule({
  declarations: [CreateComponent, HistoricComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InvestimentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class InvestimentsModule { }
