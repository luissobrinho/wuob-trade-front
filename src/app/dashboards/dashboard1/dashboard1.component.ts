import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as c3 from 'c3';
import * as d3 from 'd3';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { single } from './data';
import { Events } from '@ionic/angular';
import { Scroll } from '../../functions/Scroll';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Rendimento } from 'src/app/models/rendimento';
import { Plans, Plan } from 'src/app/models/plans';
import { ChartDataSets, ChartOptions, ChartAnimationOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { PacoteService } from 'src/app/services/pacote/pacote.service';
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InvestmentResponse } from 'src/app/models/InvestmentResponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';



declare var require: any;

const data: any = require('./data.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css'],
  animations: []
})
export class Dashboard1Component implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild('modal', {static: true}) modal;

  public plans: Plan[] = [];
  qrCode:string;
  address: string;
  amount: string;

  single: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;

  user: any
  investmentsType: Array<{}>
  linkReference: string;
  valueInitial: string = "0.00000000";

  video: string = "/assets/video/videodashboard2.mp4";

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Region';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 5;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;
  
  colorScheme = {
    domain: ['#4fc3f7', '#fb8c00', '#7460ee', '#fa5838', '#5ac146', '#137eff']
  };
  schemeType = 'ordinal';
  
  public lineChartData: ChartDataSets[] = [{ label: '', data: [0] }];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any, responsive: true, responsiveAnimationDuration: 1 });

  public lineCharAnimations: ChartAnimationOptions = {
    easing: 'easeInQuart',
  }

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [],
    },
  ];
  totalInvestimentoValor: any;
  totalRendimentoAcumulado: any;

  valorAnime = true;

  constructor(public events: Events, public investiments: InvestimentsService, 
    public pacotes: PacoteService, private ngxService: NgxUiLoaderService, private modalService: NgbModal) {

    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    Scroll.showScroll()
    Object.assign(this, {
      single
    });
    this.initValuesDashboard();

    this.events.subscribe('update:user', (user: any) => {
      this.user = user;
    });
    
  }

  public initValuesDashboard() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.investmentsType = this.user.totalTipoRendimento;
    this.totalRendimentoAcumulado = this.user.totalRendimentoAcumulado;
    this.totalInvestimentoValor = (this.user.investimento.valor * 2);
    
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`;
    this.dailyChart();
    // this.pieChart();
    this.indicatePlans();
    this.campaing();
  }

  pieChart() {
    this.user.totalTipoRendimento.forEach(invest => {
      this.pieChartLabels.push(invest.nome);
      this.pieChartData.push(invest.valor);
      if (invest.id == 1) {
        this.pieChartColors[0].backgroundColor.push('rgba(90, 193, 70, 1)')
      }
      if (invest.id == 2) {
        this.pieChartColors[0].backgroundColor.push('rgba(19, 126, 255, 1)')
      }
      if (invest.id == 3) {
        this.pieChartColors[0].backgroundColor.push('rgba(250, 88, 56, 1)')
      }
    });
  }

  public dataValor = [];
  dailyChart() {
    this.investiments.getDailyChart().subscribe(
      (rendimento: Rendimento) => {
    this.lineChartData = [];
     console.log(rendimento);
     
     let acc = 0.000000;
     let tamanho = 0;
     this.dataValor  = (rendimento[0].total_diario).reduce((init, current) => {
          if(current > 0) {
            tamanho++;
            acc += current;
            init.push(acc);
          }       
          return init;
        },[]);    
        
        for (let index = 1; index <= tamanho; index++) {
          this.lineChartLabels.push(index.toString() + ' Days');
        }

        this.lineChartData.push({ data: this.dataValor, label: rendimento[0].valor + ' BTC' });
      }
    );
    
  }

  indicatePlans() {
    this.pacotes.getIndicatePlans().then(
      (plans: Plans) => {
        this.plans = plans.data;
      }, err => {
        console.log(err);
      });
  }

  copyLink(text) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.events.publish('toast', 'Link copied', null, null, null)
  }

  createInvestiment(plan: Plan) {
    
    if(plan.valor > this.user.investimento.valor){
      Swal.fire({
        title: "Are you sure?",
        text: "Once processed, you will not be able to recover it!",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true
      }).then((willDelete) => {
        if (willDelete.value) {
          this.ngxService.start()
          this.investiments.Invest({ pacote_id: plan.id }).then((response: InvestmentResponse) => {
            this.ngxService.stop()
            this.qrCode = response.qrcode_url
            this.address = response.address;
            this.amount = response.amount;
            let modalRef = this.openModal();
            modalRef['qrCode'] = response.qrcode_url;
            modalRef['addnbress'] = response.address;
          }, err => {
            this.ngxService.stop()
            console.log(err)
          })
        }
      });
    }else{

      Swal.fire({
        title: "Opps!",
        text: "You selecetd a plan smaller than your investiment",
        icon: "warning",
        showConfirmButton: true,
      })
    }
    
  }

  campaing() {
    const chart1 = c3.generate({
      bindto: '#campaign',
      data: {
        columns: [
          ['Yields', this.totalRendimentoAcumulado],
          ['Un-complete', (this.totalInvestimentoValor - this.totalRendimentoAcumulado)]
        ],
        type: 'donut'
      },
      donut: {
        label: {
          show: false,
          format: (v, r, i) => {
            return d3.format('BTC')(v);
          }
        },
        width: 15,
      },
      color: {
        pattern: ['#51b64e', '#f5f5f5']
      }
    });
  }

  openModal() {
    return this.modalService.open(this.modal, { centered: true});
  }

}
