import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  submitted = false;
  profileForm:FormGroup;
  private user:{name:'',email:''}

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.initValues()
    this.initForm()
  }

  initForm(){
    this.profileForm = this.formBuilder.group({
      name: [this.user.name,Validators.compose([Validators.required])],
      email: [this.user.email,Validators.compose([Validators.required])],
    });
  }

  initValues(){
      this.user = JSON.parse(localStorage.getItem('currentUser'))
  }

  get f() { return this.profileForm.controls; }

  editProfile(){

  }

}
