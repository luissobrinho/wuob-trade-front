import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Inputs} from '../../functions/Inputs';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  submitted = false;
  profileForm:FormGroup;
  private user:{name:'',email:'',meta:{phone:'',pais:''}}
  private langs = [{'name':'Portuguese','value':'pt'},{'name':'English','value':'en'},{'name':'French','value':'fr'}]

  constructor(private formBuilder:FormBuilder,private profile:ProfileService) { this.initForm() }

  ngOnInit() {
    this.initValues()
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
      this.user = JSON.parse(localStorage.getItem('currentUser'))
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


