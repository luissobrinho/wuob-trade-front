import { Component, OnInit } from '@angular/core';
import { InvestimentsService } from 'src/app/services/investiments/investiments.service';
import { Events } from '@ionic/angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  private investimenttypes:[] = [];

  constructor(public investiments:InvestimentsService,public events:Events,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.investimentTypes()
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

}
