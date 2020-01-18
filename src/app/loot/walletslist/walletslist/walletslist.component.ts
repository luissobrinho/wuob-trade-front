import { Wallet } from './../../../models/Wallet';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportComponent } from '../../report/report.component';
import { LootService } from 'src/app/services/loot/loot.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Wallets } from 'src/app/models/Wallet';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-walletslist',
  templateUrl: './walletslist.component.html',
  styleUrls: ['./walletslist.component.css']
})
export class WalletslistComponent implements OnInit {

  page: Wallets = {per_page: 0, total: 0, current_page: 0};
  rows: Wallet[] = [];
  wallet: Wallet;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [
    { prop: 'nome', name: 'Name'},
    { name: 'hash', prop: 'Hash'},
    { name: 'hash_new', prop: 'HashNew'},
    { prop: 'Action'}
  ];
  @ViewChild(ReportComponent, { static: true }) table: ReportComponent;
  constructor(private loot: LootService, private ngxService: NgxUiLoaderService, public events: Events, public router: Router) { }

  setPage($event: {count: number, limit: number, offset: number, pageSize: number}) {
    this.ngxService.start()
    this.loot.getWalletsPages(`${this.page.path}?page=${$event.offset + 1}`)
      .then((response: Wallets) => {
        this.page = response;
        this.rows = response.data;
        this.ngxService.stop()
      }, err => {
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      });
  }

  loadTable() {
    this.ngxService.start()
    this.loot.getWallets()
      .then((response: Wallets) => {
        this.page = response;
        this.rows = response.data;
        this.ngxService.stop()
      }, err => {
        this.ngxService.stop()
        this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
      });
  }

  ngOnInit() {
    this.loadTable();
  }


  delete(row) {

    let id = row.id;
    this.ngxService.start()
    this.loot.deleteWallet(id).then((res) => {
      this.events.publish('toast', 'Wallet removed with success', 'Success', 10000, 'toast-success')

      this.loadTable()

    }, err => {
      this.ngxService.stop()
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }).catch((err) => {
      this.ngxService.stop()
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    })

  }

  redirectEdit(row) {
    this.router.navigate([`/loot/wallet-edit/${row.id}`])
  }

  tokenConfirm(row: Wallet){
    Swal.fire({
      title: "Enter your token confirmation",
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }else{
          this.ngxService.start();
          this.loot.activeWallet(row, {token:value}).then(
            (res) => {
              this.events.publish('toast', 'Wallet updated with success', 'Success', 10000, 'toast-success')
        
              this.loadTable()
        
            }, err => {
              this.ngxService.stop()
              this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
            }).catch((err) => {
              this.ngxService.stop()
              this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
            })
        }
      }
    })
  }

}
