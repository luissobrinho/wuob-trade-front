import { Component, OnInit, ViewChild } from '@angular/core';
import { YieldService } from 'src/app/services/yield/yield.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Events } from '@ionic/angular';
import { Yield, Yields } from 'src/app/models/Yield';
import { BalanceService } from 'src/app/services/balance/balance.service';
import { Balance } from 'src/app/models/balance';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-yieldreport',
  templateUrl: './yieldreport.component.html',
  styleUrls: ['./yieldreport.component.css']
})
export class YieldreportComponent implements OnInit {

  user: any
  investmentsType: Array<{}>
  totalInvestimentoValor: any;
  totalRendimentoAcumulado: any;

  rows:Yield[] = [];
  page:Yields = {per_page: 0, total: 0, current_page: 0};

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  balances: Balance;

  columns = [
    { prop: 'valor' ,name:'Value'}, 
    { name: 'Type' ,prop:'tipo'},
    {name:'Date',prop:'created_at'}
  ];
  @ViewChild(YieldreportComponent, { static: true }) table:YieldreportComponent;
  constructor(
    public yields:YieldService, 
    public balance:BalanceService,
    public ngxService: NgxUiLoaderService,
    public events:Events,
    private translateService: TranslationService,
    private route: ActivatedRoute,private titleService: Title) { }

  ngOnInit() {
    
    this.events.subscribe('update:user', (user: any) => {
      this.user = user;
    });
    this.loadUser();
    this.loadTable();

    this.balance.getBalance().then(
      (response:Balance) => {
        this.balances = (response);
      }
    );

    this.translateService.translate.get(["ROUTES.YIELD"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.YIELD']["YIELDREPORT"]);
      }
    )
    
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.investmentsType = this.user.totalTipoRendimento;
    this.totalRendimentoAcumulado = this.user.totalRendimentoAcumulado;
    this.totalInvestimentoValor = ((this.user.investimento) ? this.user.investimento.valor * 2 : 0 * 2);
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
