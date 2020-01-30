import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentResponse } from 'src/app/models/InvestmentResponse';
import { Plan, Plans } from 'src/app/models/plans';
import { PacoteService } from 'src/app/services/pacote/pacote.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  @ViewChild('modal', { static: true }) modal;

  public investimenttypes: [] = [];
  submitted = false;
  investimentForm: FormGroup;
  qrCode: string;
  address: string;
  amount: string;
  plans: Plan[];
  user: Profile
  investmentsType: Array<{}>
  linkReference: string;
  totalQtdInvestiments: any;
  valor_investimento: number;
  investimentoValor: string | number;

  constructor(
    public investiments: InvestimentsService, public events: Events, 
    private ngxService: NgxUiLoaderService,private formBuilder: FormBuilder, 
    public router: Router, private modalService: NgbModal,
    public pacotes: PacoteService, private translateService: TranslationService,
    private route: ActivatedRoute,private titleService: Title) { }

  ngOnInit() {
    this.user = <Profile>JSON.parse(localStorage.getItem('currentUser'));
    this.investmentsType = this.user.totalTipoRendimento;
    this.totalQtdInvestiments = this.user.totalInvestimento;
    this.valor_investimento = parseFloat((this.user.investimento) ? this.user.investimento.valor : '0');
    this.investimentoValor = (this.user.investimento) ? this.user.investimento.valor : 0;
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`;
    this.initForm();
    this.investimentTypes();
    this.Plans();

    this.translateService.translate.get(["ROUTES.INVESTIMENTS"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.INVESTIMENTS']["CREATEINVESTIMENTS"]);
      }
    )
  }

  initForm() {
    this.investimentForm = this.formBuilder.group({
      investimenttype: ['', Validators.compose([Validators.required])],
      valueinvestiment: ['', Validators.compose([Validators.required, Validators.min(0.001)])],
    });
  }

  Plans() {
    this.pacotes.getPlans().then(
      (plans: Plans) => {
        this.plans = plans.data;
      }, err => {
        console.log(err);
      });
  }

  createInvestiment(plan: Plan) {

    this.translateService.translate.get(["INVESTIMENTS.CREATE"]).subscribe(
      (text) => {
        if (this.user.investimento) {
          if (plan.valor > this.user.investimento.valor) {
            Swal.fire({
              title: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["TITLE"],
              text: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["TEXT"],
              icon: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["ICON"],
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
              title: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["FAIL"]["MESSAGE"],
              text: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["FAIL"]["TEXT"],
              icon: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["FAIL"]["TYPE"],
              showConfirmButton: true,
            })
          }
        } else {
          Swal.fire({
            title: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["TITLE"],
            text: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["TEXT"],
            icon: text["INVESTIMENTS.CREATE"]["CREATEINVESTIMENT"]["ICON"],
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

  investimentTypes() {
    this.ngxService.start()
    this.investiments.getInvestimentsType().then((types) => {
      this.ngxService.stop()
      this.investimenttypes = types;
    }, err => {
      this.ngxService.stop()
      this.events.publish('toast', err, 'Erro', null, 'toast-error')
    })
  }

  get f() { return this.investimentForm.controls; }

  openModal() {
    return this.modalService.open(this.modal, { centered: true });
  }

}
