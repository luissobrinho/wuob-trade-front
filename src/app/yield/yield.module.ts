import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { YieldRoutes } from './yield-routing.module';
import { YieldreportComponent } from './yieldreport/yieldreport.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [YieldreportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(YieldRoutes),
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YieldModule { }
