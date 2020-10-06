import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Service } from '../services/service.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData:FormGroup;
  getCurrentYear:number = this.service.getCurrentYear();
  errorMessage:string;
  formErrorSytle = {username: "", password: ""};

  constructor(private formBuilder:FormBuilder, private service:Service, private api:ApiService,  private route: ActivatedRoute, ) {
    this.formData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      switch(params.get('action')){
        case "session-expired":
          this.errorMessage = "Login session expired.";
        break;
        case "forbidden":
          this.errorMessage = "Action not allowded for this user.";
        break;
        default:
          this.errorMessage = "";
        break;
      }
    });
  }

  login()
  {
    if(!this.validatControl()){
      return;
    }

    this.api.doLogin(this.formData.controls.username.value, this.formData.controls.password.value)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403) {
          this.errorMessage = "Invalid username password.";
          return  throwError(error);
        }
      })
    )
    .subscribe((data: { jwt: any; }) => {
      if(data.jwt!=null){
        this.errorMessage = null;
        this.service.doLogin(data);
      }
    });
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
