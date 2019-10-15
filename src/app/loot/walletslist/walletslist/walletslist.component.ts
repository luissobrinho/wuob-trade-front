import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportComponent } from '../../report/report.component';
import { LootService } from 'src/app/services/loot/loot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Wallets } from 'src/app/models/Wallet';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-walletslist',
  templateUrl: './walletslist.component.html',
  styleUrls: ['./walletslist.component.css']
})
export class WalletslistComponent implements OnInit {

  editing = {};
  rows = [];
  temp = [];
  data:any;

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'nome' ,name:'Name'}, { name: 'hash' , prop:'Hash'},{ prop:'Action' }];
  @ViewChild(ReportComponent, { static: true }) table:ReportComponent;
  constructor(private loot:LootService,private ngxService: NgxUiLoaderService,public events:Events,public router:Router) { }

  ngOnInit() {
      this.Wallets()
  }

  Wallets(){
    this.ngxService.start()
    this.loot.getWallets().then((response:Wallets)=>{

      this.ngxService.stop()

      this.data = response.data;
      this.rows = this.data;
      this.temp = [this.data];

    },err=>{
      this.ngxService.stop()
      this.events.publish('toast',err,'Erro',10000,'toast-error')
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
      this.editing[rowIndex + '-' + cell] = false;
      this.rows[rowIndex][cell] = event.target.value;
      this.rows = [...this.rows];
  }

  delete(row){

    let id = row.id;
    this.ngxService.start()
    this.loot.deleteWallet(id).then((res)=>{
          this.events.publish('toast','Wallet removed with success','Success',10000,'toast-success')
          
          this.data = []
          this.loot.getWallets().then((response:Wallets)=>{
      
            this.ngxService.stop()
            this.data = response.data;
            this.rows = this.data;
            this.temp = [this.data];
      
          },err=>{
            this.ngxService.stop()
            this.events.publish('toast',err,'Erro',10000,'toast-error')
          })

    },err=>{
      this.ngxService.stop()
      this.events.publish('toast',err,'Erro',10000,'toast-error')
    }).catch((err)=>{
      this.ngxService.stop()
      this.events.publish('toast',err,'Erro',10000,'toast-error')
    })
    
  }

  redirectEdit(row){
      this.router.navigate([`wallet-edit/${row.id}`])
  }


}
