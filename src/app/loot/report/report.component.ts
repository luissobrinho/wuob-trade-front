import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LootService } from 'src/app/services/loot/loot.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  data:any;

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'value' ,name:'Value'}, { name: 'Coin' , prop:'coin'},{ name: 'Status', prop:'status' }];
  @ViewChild(ReportComponent, { static: true }) table:ReportComponent;
  constructor(private loot:LootService,public ngxService: NgxUiLoaderService,public events:Events) { }

  ngOnInit() {
     this.reportWithDrawal()
  }

  reportWithDrawal(){
      this.ngxService.start()
      this.loot.getReportWithDrawal().then((response)=>{
        this.ngxService.stop()
        this.data = response;
        this.rows = this.data;
        this.temp = [this.data];
      },err=>{
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', null, 'toast-error')
      })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = this.data;
  }
  
  updateValue(event, cell, rowIndex) {
      console.log('inline editing rowIndex', rowIndex);
      this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
      console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

}
