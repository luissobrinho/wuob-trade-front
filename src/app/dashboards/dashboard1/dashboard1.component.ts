import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as c3 from 'c3';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { single } from './data';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { Events } from '@ionic/angular';
import { Scroll } from '../../functions/Scroll';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Rendimento } from 'src/app/models/rendimento';
import { ChartDataSets, ChartOptions, ChartAnimationOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements AfterViewInit {
  public config: PerfectScrollbarConfigInterface = {};

  single: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;
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
  user: any
  investmentsType: Array<{}>
  linkReference: string;
  valueInitial:string = "0.00000000"

  colorScheme = {
    domain: ['#4fc3f7', '#fb8c00', '#7460ee', '#fa5838', '#5ac146', '#137eff']
  };
  schemeType = 'ordinal';

  constructor(public events: Events, public investiments: InvestimentsService) {

    Scroll.showScroll()
    Object.assign(this, {
      single
    });
    this.initValuesDashboard();
  }

  public initValuesDashboard() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.investmentsType = this.user.totalTipoRendimento;
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`
    this.dailyChart()
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


  public lineChartData: ChartDataSets[] = [{label: '', data: [0]}];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any, responsive: true, responsiveAnimationDuration: 1 });

  public lineCharAnimations : ChartAnimationOptions = {
    easing: 'easeInQuart',
  }

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  dailyChart() {
    this.investiments.getDailyChart().then((rendimento: Rendimento[]) => {
      for (let index = 1; index <= 100; index++) {
        this.lineChartLabels.push(index.toString()+' Days');

      }
      this.lineChartData = [];
      rendimento.forEach((rend: Rendimento) => {
        this.lineChartData.push({ data: rend.total_diario, label: rend.valor + ' BTC' });
      });
    }, err => {
      console.log(err);
    })

  }

  ngAfterViewInit() {
    // ==============================================================
    // campaign
    // ==============================================================
    const chart1 = c3.generate({
      bindto: '#campaign',
      data: {
        columns: [
          ['Un-opened', 35],
          ['Clicked', 15],
          ['Open', 10],
          ['Bounced', 18],
        ],

        type: 'donut'
      },
      donut: {
        label: {
          show: false
        },
        width: 15,
      },

      legend: {
        hide: true
      },
      color: {
        pattern: ['#137eff', '#8b5edd', '#5ac146', '#eceff1']
      }
    });
  }
}
