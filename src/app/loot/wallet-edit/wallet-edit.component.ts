import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LootService } from 'src/app/services/loot/loot.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Wallet } from 'src/app/models/Wallet';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal;

  submitted = false;
  walletForm: FormGroup;
  nome: string;
  hash: string;
  id:number;
  wallet:Wallet;

  constructor(public loot: LootService, public events: Events, private ngxService: NgxUiLoaderService,
    private formBuilder: FormBuilder, public router: Router, private modalService: NgbModal, public routeactive:ActivatedRoute) {
    ngxService.start();
      this.id = this.routeactive.snapshot.params.id;
      // console.log(this.id);

    }

   ngOnInit() {
     this.initForm();
     this.initValues();
  }

  initForm() {
    this.walletForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      hash: ['', Validators.compose([Validators.required])],
    });
    this.loot.getWallet(this.id).then((wallet: Wallet) => {
      // this.getWallet(this.id);
      this.walletForm.setValue({
          nome: wallet.nome,
          hash: wallet.hash
        });
      this.ngxService.stop();
    }).catch((erro) => {
      this.router.navigate(['loot/wallet'])
    })

  }

  updateWallet() {
    this.submitted = true

    if (this.walletForm.invalid) {
      return;
    }
    this.ngxService.start();

    this.loot.updateWallet(this.id, this.walletForm.value).then((response: Wallet) => {
      // console.log(response);

      this.ngxService.stop();
      this.nome = response.nome;
      this.hash = response.hash;
      this.events.publish('toast', 'Wallet updated with success', 'Success', 10000, 'toast-success');
      this.router.navigate([`/loot/wallets`]);
    }).catch((err: HttpErrorResponse) => {

      this.ngxService.stop();
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }), err => {
      this.ngxService.stop();
      this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
    }
  }

  initValues() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  get f() { return this.walletForm.controls; }

  openModal() {
    return this.modalService.open(this.modal, { centered: true });
  }

}
