import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LootService } from 'src/app/services/loot/loot.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  rows:WithDrawal[] = [];
  page:WithDrawals = {per_page: 0, total: 0, current_page: 0};

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'value' ,name:'Value'},
    { name: 'Coin' , prop:'coin'},
    { name: 'Status', prop:'status' }
  ];
  @ViewChild(ReportComponent, { static: true }) table:ReportComponent;
  constructor(
    private loot:LootService,
    public ngxService: NgxUiLoaderService,
    public events:Events,
    private translateService: TranslationService,
    private route: ActivatedRoute,private titleService: Title) { }

  ngOnInit() {
     this.loaderTable();

     this.translateService.translate.get(["ROUTES.LOOT"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.LOOT']["WITHDRAWALREPORT"]);
      }
    )
  }

  loaderTable(){
      this.ngxService.start()
      this.loot.getReportWithDrawal().then((response)=>{
        this.ngxService.stop()
        this.rows = response.data;
        this.page = response;
      },err=>{
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', null, 'toast-error')
      })
  }

  setPage($event: {count: number, limit: number, offset: number, pageSize: number}) {
    this.ngxService.start()
    this.loot.getReportWithDrawalPage(`${this.page.path}?page=${$event.offset + 1}`)
      .then((response: WithDrawals) => {
       
        this.rows = response.data;
        this.page = response;
        this.ngxService.stop()
      }, err => {
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      });
  }

}
