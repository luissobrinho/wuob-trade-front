import { Component, OnInit, ViewChild } from '@angular/core';
import { YieldService } from 'src/app/services/yield/yield.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { Yield, Yields } from 'src/app/models/Yield';

@Component({
  selector: 'app-yieldreport',
  templateUrl: './yieldreport.component.html',
  styleUrls: ['./yieldreport.component.css']
})
export class YieldreportComponent implements OnInit {

  rows:Yield[] = [];
  page:Yields = {per_page: 0, total: 0, current_page: 0};

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  totalResidual:number = 0.000000;
  totalCredit:number = 0.000000;
  totalDebit:number = 0.000000;
  totalDirect:number = 0.000000;
  totalIndirect:number = 0.000000;

  columns = [
    { prop: 'valor' ,name:'Value'}, 
    { name: 'Type' ,prop:'tipo'},
    {name:'Date',prop:'created_at'}
  ];
  @ViewChild(YieldreportComponent, { static: true }) table:YieldreportComponent;
  constructor(public yields:YieldService,public ngxService: NgxUiLoaderService,public events:Events) { }

  ngOnInit() {
    this.loadTable()
  }

  loadTable(){
    this.ngxService.start()
    this.yields.getYields().then((response:Yields)=>{
      this.ngxService.stop()
      this.rows = response.data;
      this.page = response;
    },err=>{
      this.ngxService.stop()
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }).catch((err)=>{
      this.ngxService.stop()
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    })
  }

  setPage($event: {count: number, limit: number, offset: number, pageSize: number}) {
    this.ngxService.start()
    this.yields.getYieldsPage(`${this.page.path}?page=${$event.offset + 1}`)
      .then((response:Yields) => {
        this.rows = response.data;
        this.page = response;
        this.ngxService.stop()
      }, err => {
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    });
  }

}
