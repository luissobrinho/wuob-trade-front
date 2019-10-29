import { Component, OnInit, ViewChild } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvestmentResponse } from 'src/app/models/InvestmentResponse';


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

  constructor(public investiments:InvestimentsService,public events:Events,private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,public router:Router,private modalService: NgbModal) { }

  ngOnInit() {
    this.initForm()
    this.investimentTypes()
  }

  initForm(){
        this.investimentForm = this.formBuilder.group({
          investimenttype: ['',Validators.compose([Validators.required])],
          valueinvestiment: ['',Validators.compose([Validators.required,Validators.min(0.001)])],
        });
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

  createInvestiment(){

    this.submitted = true

    if(this.investimentForm.invalid){
      return;
    }
    this.ngxService.start()
    this.investiments.Invest(this.investimentForm.value).then((response: InvestmentResponse)=>{
        this.ngxService.stop()
        this.qrCode = response.qrcode_url
        this.address = response.address;
        this.amount = response.amount;
        let modalRef = this.openModal();
        modalRef['qrCode'] = response.qrcode_url;
        modalRef['add nbress'] = response.address;
    },err=>{
        this.ngxService.stop()
        console.log(err)
    })

  }

  openModal() {
    return this.modalService.open(this.modal, { centered: true});
  }

}
