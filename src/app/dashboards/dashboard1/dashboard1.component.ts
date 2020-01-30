import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Tickets, Ticket } from 'src/app/models/Ticket';
import { LootService } from 'src/app/services/loot/loot.service';
import { IAlert } from 'src/app/models/alert';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


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

  @ViewChild('modal', { static: true }) modal;
  @Input() public accountAlert: Array<IAlert> = [];

  public plans: Plan[] = [];
  qrCode: string;
  address: string;
  amount: string;

  single: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;

  user: any;
  investmentsType: Array<{}>
  totalInvestimentoValor: any;
  totalRendimentoAcumulado: any;
  investimentoValor: string | number;
  linkReference: string;
  valueInitial: string = "0.00000000";
  totalTicket: number = 0;
  public tickets: Ticket[] = [];

  video: string = "/clients/assets/video/videodashboard2.mp4";

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

  hash_new: string;
  constructor(
    public events: Events, 
    public investiments: InvestimentsService,
    public pacotes: PacoteService,
    public ticketService: TicketService, 
    private loot: LootService,
    private ngxService: NgxUiLoaderService, 
    private modalService: NgbModal,
    private translateService: TranslationService,
    private route: ActivatedRoute,
    private titleService: Title) {
    
    this.translateService.translate.get(["DASHBOARD.ACCOUNT.ALERT.WARNING"]).subscribe((texts) => {    
        this.accountAlert.push(
          {
            id: 1,
            show: false,
            type: 'success',
            message: texts["DASHBOARD.ACCOUNT.ALERT.SUCESS"]
          },
          {
            id: 2,
            show: false,
            type: 'info',
            message: texts["DASHBOARD.ACCOUNT.ALERT.INFO"]
          },
          {
            id: 3,
            show: false,
            type: 'warning',
            message: texts["DASHBOARD.ACCOUNT.ALERT.WARNING"]
          },
          {
            id: 4,
            show: false,
            type: 'danger',
            message: texts["DASHBOARD.ACCOUNT.ALERT.DANGER"]
          }
        );
      });

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
    
    this.translateService.translate.get(["ROUTES.DASHBOARD"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.DASHBOARD']["TITLE"]);
      }
    )

  }

  public initValuesDashboard() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(!this.user.investimento) {
      this.accountAlert[2].show = true;
    }
    

    this.investmentsType = this.user.totalTipoRendimento;
    this.totalRendimentoAcumulado = this.user.totalRendimentoAcumulado;
    this.totalInvestimentoValor = ((this.user.investimento) ? this.user.investimento.valor * 2 : 0 * 2);
    this.investimentoValor = (this.user.investimento) ? this.user.investimento.valor : 0;
    this.totalTicket = this.user.meta.ticket + this.user.meta.ticket_premium;
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`;
    this.getTicket();
    this.indicatePlans();
    this.campaing();
    this.dailyChart();
    // this.pieChart();
    this.checkWalletNewHash();
  }

  public closeAlertAccount(alert: IAlert) {
    this.accountAlert[3].show = false;
  }
  checkWalletNewHash() {
    this.loot.checkNewhashWallets()
      .then((response: string) => {
        this.hash_new =  (response) ? response : null; 
        if(this.hash_new){
          this.translateService.translate.get(["DASHBOARD.WALLET.TOAST.WARNING"]).subscribe(
            (text) => {
              this.events.publish('toast', text["DASHBOARD.WALLET.TOAST.WARNING"], text["DASHBOARD.WALLET.TOAST.TITLE"], 60000, 'toast-warning')
            }
          )
        }
      });  
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

        let acc = 0.000000;
        let tamanho = 0;

        if( typeof rendimento[0] !== 'undefined'){
        
          this.dataValor = (rendimento[0].total_diario).reduce((init, current) => {
            if (current > 0) {
              tamanho++;
              acc += current;
              init.push(acc);
            }
            return init;
          }, []);
        
          for (let index = 1; index <= tamanho; index++) {
            this.translateService.translate.get(["DASHBOARD.LINECHART.DAYS"]).subscribe(
              (text) => {
                this.lineChartLabels.push(index.toString() + text["DASHBOARD.LINECHART.DAYS"]);
              }
            )
          }

          this.lineChartData.push({ data: this.dataValor, label: rendimento[0].valor + ' BTC' });
        } else {

          this.lineChartData = [];
          this.dataValor = [];
          let tamanho = 0;
          for (let index = 1; index <= tamanho; index++) {
            this.translateService.translate.get(["DASHBOARD.LINECHART.DAYS"]).subscribe(
              (text) => {
                this.lineChartLabels.push(index.toString() + text["DASHBOARD.LINECHART.DAYS"]);
              }
            )
          }

          this.lineChartData.push({ data: this.dataValor, label: 0 + ' BTC' });

        }

      }, err => {
        this.lineChartData = [];
        this.dataValor = [];
        let tamanho = 0;
        for (let index = 1; index <= tamanho; index++) {
          this.translateService.translate.get(["DASHBOARD.LINECHART.DAYS"]).subscribe(
            (text) => {
              this.lineChartLabels.push(index.toString() + text["DASHBOARD.LINECHART.DAYS"]);
            }
          )
        }

        this.lineChartData.push({ data: this.dataValor, label: 0 + ' BTC' });

      }
    );

  }

  getTicket() {
    this.ticketService.getTicket().then(
      (ticket: Tickets) => {
        this.tickets = ticket.data;
        // console.log(this.tickets);
      }, err => {
        console.log(err);
      }
    )
    
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
    this.translateService.translate.get(["DASHBOARD.COPYLINK.MESSAGE"]).subscribe(
      (text) => {
        this.events.publish('toast', text["DASHBOARD.COPYLINK.MESSAGE"], null, null, null);
      }
    )
  }

  buyTicket(ticket: Ticket) {
    this.translateService.translate.get(["DASHBOARD.BUYTICKET"]).subscribe(
      (text) => {
        Swal.fire({
          title: text["DASHBOARD.BUYTICKET.TITLE"],
          text: text["DASHBOARD.BUYTICKET.TEXT"],
          icon: text["DASHBOARD.BUYTICKET.ICON"],
          showConfirmButton: true,
          showCancelButton: true
        }).then((willDelete) => {
          if (willDelete.value) {
            this.ngxService.start()
            this.ticketService.buyTicket(ticket.id).then(
              (response:any) => {
                this.ngxService.stop();
                Swal.fire(
                  text["DASHBOARD.BUYTICKET.SUCCESS.MESSAGE"],
                  response,
                  text["DASHBOARD.BUYTICKET.SUCCESS.TYPE"]
                )
                this.totalTicket += +ticket.quantidade;
            }, 
            err => {
              this.ngxService.stop();
              Swal.fire(
                text["DASHBOARD.BUYTICKET.FAIL.MESSAGE"],
                err,
                text["DASHBOARD.BUYTICKET.FAIL.TYPE"]
              )
            })
          }
        });
      }
    )
    
  }

  createInvestiment(plan: Plan) {
    this.translateService.translate.get(["DASHBOARD.CREATEINVESTIMENT"]).subscribe(
      (text) => {
        // console.log(text["DASHBOARD.CREATEINVESTIMENT"]["FAIL"]["MESSAGE"]);
        
        if (this.user.investimento) {
          if (plan.valor > this.user.investimento.valor) {
            Swal.fire({
              title: text["DASHBOARD.CREATEINVESTIMENT"]["TITLE"],
              text: text["DASHBOARD.CREATEINVESTIMENT"]["TEXT"],
              icon: text["DASHBOARD.CREATEINVESTIMENT"]["ICON"],
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
          } else {
    
            Swal.fire({
              title: text["DASHBOARD.CREATEINVESTIMENT"]["FAIL"]["MESSAGE"],
              text: text["DASHBOARD.CREATEINVESTIMENT"]["FAIL"]["TEXT"],
              icon: text["DASHBOARD.CREATEINVESTIMENT"]["FAIL"]["TYPE"],
              showConfirmButton: true,
            })
          }
        } else {
          Swal.fire({
            title: text["DASHBOARD.CREATEINVESTIMENT"]["TITLE"],
            text: text["DASHBOARD.CREATEINVESTIMENT"]["TEXT"],
            icon: text["DASHBOARD.CREATEINVESTIMENT"]["ICON"],
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
        }
      }
    )
    

  }

  campaing() {

    this.translateService.translate.get(["DASHBOARD.CAMPAING"]).subscribe(
      (text) => {
        let totalUncomplete = (typeof this.user.investimento == 'undefined') ? 100 : (this.totalInvestimentoValor - this.totalRendimentoAcumulado);
        
        const chart1 = c3.generate({
          bindto: '#campaign',
          data: {
            columns: [
              [text["DASHBOARD.CAMPAING"]["COLUMNS"]["YIELDS"], this.totalRendimentoAcumulado],
              [text["DASHBOARD.CAMPAING"]["COLUMNS"]["UNCOMPLETED"], totalUncomplete]
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
    )

  }

  openModal() {
    return this.modalService.open(this.modal, { centered: true, keyboard: false });
  }

}
