import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LootService } from 'src/app/services/loot/loot.service';
import { Wallet, Wallets } from 'src/app/models/Wallet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { movement } from 'src/app/models/movement';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal;

  submitted = false;
  withdrawForm:FormGroup;
  public balance:string = '';
  public wallets: Wallet[] = [];
  valor: string;
  status_text: string;

  constructor(public loot:LootService,public events:Events,private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder, public router: Router, private modalService: NgbModal) { }

  ngOnInit() {
      this.initForm()
      this.initValues()
  }

  initForm(){
    this.withdrawForm = this.formBuilder.group({
      wallet: ['',Validators.compose([Validators.required])],
      value: ['',Validators.compose([Validators.required, Validators.min(0.005)])],
    });
  }

  initValues(){
      let user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.balance = user.totalSaldoIndicacaoDireta;
      this.Wallets()
  }

  get f() { return this.withdrawForm.controls; }

  Wallets(){
    this.ngxService.start()
    this.loot.getWallets().then((response:Wallets)=>{

      this.ngxService.stop()

      this.wallets = response.data;

      // console.log(this.wallets);

    },err=>{
      this.ngxService.stop()
      this.events.publish('toast',err,'Erro',10000,'toast-error')
    })
  }

  withDrawMoney(){
    this.submitted = true

    if (this.withdrawForm.invalid) {
      return;
    }
    this.ngxService.start();
    // console.log(this.withdrawForm.value);

    this.loot.createWithDraw(this.withdrawForm.value).then((response: movement) =>{
      // console.log(response);

      this.ngxService.stop();
      this.valor = response.valor;
      this.status_text = response.status_text;
      this.events.publish('toast', this.status_text, 'Success', 10000, 'toast-success')
      // let modalRef = this.openModal();
      // modalRef['valor'] = response.valor;
      // modalRef['status_text'] = response.status_text;
    }).catch((err: HttpErrorResponse) => {

      this.ngxService.stop();
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }), err => {
      this.ngxService.stop();
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }
  }

  openModal() {
    return this.modalService.open(this.modal, { centered: true });
  }

}
