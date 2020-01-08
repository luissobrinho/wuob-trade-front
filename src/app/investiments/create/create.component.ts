import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentResponse } from 'src/app/models/InvestmentResponse';
import { Plan, Plans } from 'src/app/models/plans';
import { PacoteService } from 'src/app/services/pacote/pacote.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Profile } from 'src/app/models/Profile';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  @ViewChild('modal', {static: true}) modal;

  public investimenttypes:[] = [];
  submitted = false;
  investimentForm:FormGroup;
  qrCode:string;
  address: string;
  amount: string;
  plans: Plan[];
  user: Profile
  investmentsType: Array<{}>
  linkReference: string;
  totalQtdInvestiments: any;
  valor_investimento: number;

  constructor(public investiments:InvestimentsService,public events:Events,private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,public router:Router,private modalService: NgbModal,
    public pacotes: PacoteService) { }

  ngOnInit() {
    this.user = <Profile>JSON.parse(localStorage.getItem('currentUser'));
    this.investmentsType = this.user.totalTipoRendimento;
    this.totalQtdInvestiments = this.user.totalInvestimento;
    this.valor_investimento = parseFloat(this.user.investimento.valor);
    this.linkReference = `${environment.urlAngular}/${this.user.meta.referencia}`;
    this.initForm();
    this.investimentTypes();
    this.Plans();
  }

  initForm(){
        this.investimentForm = this.formBuilder.group({
          investimenttype: ['',Validators.compose([Validators.required])],
          valueinvestiment: ['',Validators.compose([Validators.required,Validators.min(0.001)])],
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

  investimentTypes(){
      this.ngxService.start()
      this.investiments.getInvestimentsType().then((types)=>{
          this.ngxService.stop()
          this.investimenttypes = types;
      },err=>{
          this.ngxService.stop()
          this.events.publish('toast', err, 'Erro', null, 'toast-error')
      })
  }

  get f() { return this.investimentForm.controls; }

  // createInvestiment(plan: Plan){

  //   this.submitted = true

  //   if(this.investimentForm.invalid){
  //     return;
  //   }
  //   this.ngxService.start()
  //   this.investiments.Invest({pacote_id: plan.id}).then((response: InvestmentResponse)=>{
  //       this.ngxService.stop()
  //       this.qrCode = response.qrcode_url
  //       this.address = response.address;
  //       this.amount = response.amount;
  //       let modalRef = this.openModal();
  //       modalRef['qrCode'] = response.qrcode_url;
  //       modalRef['addnbress'] = response.address;
  //   },err=>{
  //       this.ngxService.stop()
  //       console.log(err)
  //   })

  // }

  openModal() {
    return this.modalService.open(this.modal, { centered: true});
  }

}
