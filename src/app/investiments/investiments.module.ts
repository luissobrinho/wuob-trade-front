import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { InvestimentsRoutes } from './investiments-routing.module';





@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InvestimentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class InvestimentsModule { }
