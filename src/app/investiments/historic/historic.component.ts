import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { InvestmentResponse, Investments } from 'src/app/models/InvestmentResponse';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  
  rows:InvestmentResponse[] = [];
  page:Investments = {per_page: 0, total: 0, current_page: 0};

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  columns = [
    { prop: 'amountf' ,name:'Value'}, 
    { name: 'Coin' ,prop:('Coin'===null)?'-':'Coin'},
    { name: 'Status', prop:'status' }, 
    { name: 'Action', prop:'address' }
  ];
  @ViewChild(HistoricComponent, { static: true }) table:HistoricComponent;
  constructor(public investiments:InvestimentsService,public ngxService: NgxUiLoaderService,public events:Events) {}

  setPage($event: {count: number, limit: number, offset: number, pageSize: number}) {
    this.ngxService.start()
    this.investiments.getInvestimentsPages(`${this.page.path}?page=${$event.offset + 1}`)
      .then((response: Investments) => {
       
        this.rows = response.data;
        this.page = response;
        this.ngxService.stop()
      }, err => {
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      });
  }

  ngOnInit() {
    this.loadTable()
  }

  loadTable(){
      this.ngxService.start()
      this.investiments.getInvestiments().then((response:Investments)=>{
      
          this.ngxService.stop()
          this.rows = response.data
          this.page = response
        
      },err=>{
          this.ngxService.stop()
          this.events.publish('toast', err, 'Erro', null, 'toast-error')
      })   
  }

  copyLink(row){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = row.address;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.events.publish('toast','Link copied', null, null,null)
  }

}
