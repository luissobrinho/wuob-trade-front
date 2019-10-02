import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  data:any;

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'amountf' ,name:'Value'}, { name: 'Coin' },{ name: 'Status', prop:'status' }, { name: 'Action', prop:'address' }];
  @ViewChild(HistoricComponent, { static: true }) table:HistoricComponent;
  constructor(public investiments:InvestimentsService,public ngxService: NgxUiLoaderService,public events:Events) {
        this.ngxService.start()
        this.investiments.getInvestiments().then((response)=>{
            console.log(response)
            this.ngxService.stop()
            this.data = response;
            this.rows = this.data;
            this.temp = [this.data];
            setTimeout(() => {
              this.loadingIndicator = false;
            }, 1500);
        },err=>{
            this.ngxService.stop()
            this.events.publish('toast', err, 'Erro', null, 'toast-error')
        })
  }

  ngOnInit() {

        
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
  }

}
