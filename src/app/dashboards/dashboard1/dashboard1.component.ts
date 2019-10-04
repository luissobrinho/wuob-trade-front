import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as c3 from 'c3';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { single } from './data';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { environment } from '../../environments/environments';
import { Events } from '@ionic/angular';
import { Scroll } from '../../functions/Scroll';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';

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
    user:any
    investmentsType:Array<{}>
    linkReference:string;

    colorScheme = {
        domain: ['#4fc3f7', '#fb8c00', '#7460ee', '#fa5838', '#5ac146', '#137eff']
    };
    schemeType = 'ordinal';

    constructor(public events:Events,public investiments:InvestimentsService) {
        
        Scroll.showScroll()
        Object.assign(this, {
            single
        });
        
        this.initValuesDashboard();
    }

    public initValuesDashboard(){
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        this.investmentsType = this.user.totalTipoRendimento;
        this.linkReference = `${environment.urlAngularTest}/${this.user.meta.referencia}`
        this.dailyChart()
    }

    dailyChart(){
         this.investiments.getDailyChart().then((response)=>{
            console.log(response);
            
         },err=>{
             console.log(err);
         })   
    }

    copyLink(text){
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
        this.events.publish('toast','Link copied', null, null,null)
    }

    lineChart: Chart = {
        type: 'Line',
        data: data['Line'],
        options: {
            low: 0,
            high: 48,
            showArea: true,
            fullWidth: true,
            height: 300,
            axisY: {
                onlyInteger: true,
                scaleMinSpace: 40,
                offset: 20,
                labelInterpolationFnc: function (value) {
                    return (value / 10) + 'k';
                }
            }
        }
    };

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
