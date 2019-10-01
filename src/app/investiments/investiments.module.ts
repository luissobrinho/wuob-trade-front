import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent, ModalContent } from './create/create.component';
import { InvestimentsRoutes } from './investiments-routing.module';
import { HistoricComponent } from './historic/historic.component';
import { ComponentModule } from './component/component.module';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  declarations: [CreateComponent, HistoricComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(InvestimentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentModule,
    BrMaskerModule,
    NgbModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvestimentsModule { }
