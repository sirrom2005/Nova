import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;
  formErrorSytle = {username: "", password: ""};

  constructor(private formBuilder:FormBuilder, private service:Service ) {
    this.formData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login()
  {
    if(!this.validatControl()){
      return;
    }

    this.service.doLogin(this.formData.controls.username.value, this.formData.controls.password.value);
  }

  validatControl() 
  {
    var username = this.formData.controls.username.value.trim();
    var password = this.formData.controls.password.value.trim();

    this.formErrorSytle.username = username=="" ? "is-invalid" : "" ;
    this.formErrorSytle.password = password=="" ? "is-invalid" : "" ;
    return (username=="" || password=="")? false : true;
  }
}
