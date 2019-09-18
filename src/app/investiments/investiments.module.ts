import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter, CalendarDateFormatter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { InvestimentsRoutingModule } from './investiments-routing.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    InvestimentsRoutingModule,
    FormsModule,
    NgxChartsModule,
    NgxDatatableModule,
    PerfectScrollbarModule,
    NgbModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ]
})
export class InvestimentsModule { }
