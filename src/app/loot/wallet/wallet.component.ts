import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LootService } from 'src/app/services/loot/loot.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Wallet } from 'src/app/models/Wallet';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal;

  submitted = false;
  walletForm: FormGroup;
  nome: string;
  hash: string;

  constructor(public loot: LootService, public events: Events, private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder, public router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.initForm();
    this.initValues();
  }

  initForm() {
    this.walletForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      hash: ['', Validators.compose([Validators.required])],
    });
  }

  initValues() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  get f() { return this.walletForm.controls; }

  createWallet(){
    this.submitted = true

    if (this.walletForm.invalid) {
      return;
    }
    this.ngxService.start();

    this.loot.createWallet(this.walletForm.value).then((response: Wallet) => {
      console.log(response);

      this.ngxService.stop();
      this.nome = response.nome;
      this.hash = response.hash;
      this.events.publish('toast', 'Success', 10000, 'toast-success')
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
