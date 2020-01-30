import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LootService } from 'src/app/services/loot/loot.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Wallet } from 'src/app/models/Wallet';
import Swal from 'sweetalert2'
import { TranslationService } from 'src/app/services/translation/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wallet-edit',
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal;

  submitted = false;
  walletForm: FormGroup;
  hasEdit = false;
  nome: string;
  hash: string;
  hash_new:string;
  id:number;
  wallet:Wallet;

  constructor(
    public loot: LootService, public events: Events, 
    private ngxService: NgxUiLoaderService,private formBuilder: FormBuilder, 
    public router: Router, private modalService: NgbModal, 
    public routeactive:ActivatedRoute, private translateService: TranslationService,
    private route: ActivatedRoute,private titleService: Title) {
    ngxService.start();
      this.id = this.routeactive.snapshot.params.id;
      // console.log(this.id);

    }

   ngOnInit() {
     this.initForm();
     this.initValues();

     this.translateService.translate.get(["ROUTES.LOOT"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.LOOT']["EDITWALLET"]);
      }
    )
  }

  initForm() {
    this.walletForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      hash: ['', Validators.compose([Validators.required])],
    });
    this.loot.getWallet(this.id).then((wallet: Wallet) => {
      
      this.hash_new = (wallet.hash_new) ? wallet.hash_new : '';
      if(this.hash_new.length > 0) {
        this.hasEdit = true;
      }

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

    this.translateService.translate.get(["WALLETEDIT.UPDATEWALLET"]).subscribe(
      (text) => {
        this.submitted = true

        if (this.walletForm.invalid) {
          return;
        }

        Swal.fire({
          title: text["WALLETEDIT.UPDATEWALLET"]["SWAL"]["TITLE"],
          text: text["WALLETEDIT.UPDATEWALLET"]["SWAL"]["TEXT"],
          icon: text["WALLETEDIT.UPDATEWALLET"]["SWAL"]["ICON"],
          showConfirmButton: true,
          showCancelButton: true
        })
        .then((willDelete) => {
          if (willDelete.value) {
            this.ngxService.start()

            this.nome = this.walletForm.value.nome;
            this.hash_new = this.walletForm.value.hash;

            this.loot.updateWallet(this.id, {nome: this.nome, hash_new: this.hash_new}).then(
              (response: Wallet) => {
                this.ngxService.stop();
                this.loot.getWallet(this.id).then(
                  (wallet: Wallet) => {
                    this.tokenConfirm(wallet);
                  }
                )

                
            }, 
            err => {
              this.ngxService.stop();
              Swal.fire(
                'Opps!',
                err,
                'warning'
              )
            })
          }
        });
      }
    )

    
  }

  tokenConfirm(row: Wallet){

    this.translateService.translate.get(["WALLETEDIT.TOKENCONFIRM"]).subscribe(
      (text) => {
        Swal.fire({
          title: text["WALLETEDIT.TOKENCONFIRM"]["SWAL"]["TITLE"],
          input: 'text',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return text["WALLETEDIT.TOKENCONFIRM"]["SWAL"]["VALIDATOR"]
            }else{
              this.ngxService.start();
              this.loot.activeWallet(row, {token:value}).then(
                (res) => {
                  this.events.publish('toast', text["WALLETEDIT.TOKENCONFIRM"]["TOAST"]["TITLE"], text["WALLETEDIT.TOKENCONFIRM"]["TOAST"]["TYPE"], 10000, 'toast-success')
            
                  this.ngxService.stop()
            
                }, err => {
                  this.ngxService.stop()
                  this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
                }).catch((err) => {
                  this.ngxService.stop()
                  this.events.publish('toast', err, 'Erro', 10000, 'toast-error')
                })
            }
          }
        })
      }
    )

   
  }

  initValues() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  get f() { return this.walletForm.controls; }

  openModal() {
    return this.modalService.open(this.modal, { centered: true });
  }

}
