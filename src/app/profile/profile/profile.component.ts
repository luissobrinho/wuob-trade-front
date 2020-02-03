import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Inputs} from '../../functions/Inputs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  submitted = false;
  profileForm:FormGroup;
  public user:{name:'',email:'',meta:{phone:'',pais:''}}
  public langs = [{'name':'Portuguese','value':'pt-PT'},{'name':'English','value':'en-US'},{'name':'French','value':'fr-FR'}]

  constructor(
    public formBuilder:FormBuilder,
    private profile:ProfileService,
    private translateService: TranslationService,
    private route: ActivatedRoute,
    private titleService: Title) {  }

  ngOnInit() {
    this.initValues();
    this.initForm();

    this.translateService.translate.get(["ROUTES.PROFILE"]).subscribe(
      (text) => {
        this.titleService.setTitle(text['ROUTES.PROFILE']["TITLE"]);
      }
    )
  }

  initForm(){
    this.profileForm = this.formBuilder.group({
      name: [this.user.name,Validators.compose([Validators.required])],
      email: [{value:this.user.email,disabled:true},Validators.compose([Validators.required])],
      meta: this.formBuilder.group({
        phone: [this.user.meta.phone,Validators.compose([Validators.required])],
        pais: [this.user.meta.pais,Validators.compose([Validators.required])],
        terms_and_cond:['1'],
      })
    });
  }

  initValues(){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'))
  }

  get f() { return this.profileForm.controls; }

  editProfile(){
      this.submitted = true
      
      if(this.profileForm.invalid){
        return;
      }

      this.profile.updateProfile(this.profileForm.value);
  }

  onlynumber(evt) {
    Inputs.onlyNumber(evt)
  }

}


