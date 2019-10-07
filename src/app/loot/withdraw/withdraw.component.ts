import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LootService } from 'src/app/services/loot/loot.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  submitted = false;
  withdrawForm:FormGroup;
  private balance:string;

  constructor(public loot:LootService,public events:Events,private ngxService: NgxUiLoaderService,
    private formBuilder:FormBuilder,public router:Router) { }

  ngOnInit() {
      this.initForm()
      this.initValues()
  }

  initForm(){
    this.withdrawForm = this.formBuilder.group({
      wallet: ['',Validators.compose([Validators.required])],
      value: ['',Validators.compose([Validators.required])],
    });
  }

  initValues(){
      let user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.balance = user.totalSaldo;
      this.Wallets()
  }

  get f() { return this.withdrawForm.controls; }

  Wallets(){
    this.ngxService.start()
    this.loot.getWallets().then((response)=>{
      this.ngxService.stop()
      console.log(response);
    },err=>{
      this.ngxService.stop()
      this.events.publish('toast',err,'Erro',10000,'toast-error')
    })
  }

  withDrawMoney(){

  }

}
