import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IAccount } from "../Interface/IAccount";
import { AppGlobals } from "../common/app-globals";
import { IKeyValue } from '../Interface/IValueKey';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})

export class EditStudentsComponent implements OnInit {
  studentid:String;
  Students:IAccount;
  formData:FormGroup;
  extraCurricular:IKeyValue;
  responsibilities:IKeyValue;
  classList:IKeyValue;
  houseColor:IKeyValue;
  defaultSchooolId = 2011040016;
  schoolcitizenship: IKeyValue;
  countrylist: {};
  statelist: {};
  classRoomLstId:Number;
  houseColorIdLst:Number;
  isExBoolChecked:Array<boolean> = [];

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private route: ActivatedRoute) { 
    /*this.formData = this.formBuilder.group({
      acconut_id: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      enrollment_date: ['', Validators.required]
    });*/
  }

  ngOnInit() {
    //House Color List
    let req1 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + `/valuekey/housecolor/${this.defaultSchooolId}`);
    //Extra Curricular Activity List
    let req2 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/extracurricularactivity');
    //Class List by school id
    let req3 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + `/valuekey/class/${this.defaultSchooolId}`);
    //Responsibilities List
    let req4 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/responsibilities');
    //Citenzenship List
    let req5 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/schoolcitizenship');
    //Country List
    let req6 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/country');

    forkJoin(req1, req2, req3, req4, req5, req6).subscribe(
      json => 
            {
              this.houseColor         = json[0];
              this.extraCurricular    = json[1];
              this.classList          = json[2];
              this.responsibilities   = json[3];
              this.schoolcitizenship  = json[4];
              this.countrylist        = json[5];
              
              //Load Account data
              this.route.paramMap.subscribe(params => { 
                this.studentid = params.get('student_id'); 
                this.http.get<IAccount>(AppGlobals.API_DOMAIN + '/accounts/' + this.studentid).
                subscribe(data => {
                  this.getStateList(data.country_id-1);
                  this.Students = data;
                });
              });
             
            }      
    );
  }

  onSubmit(account) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = AppGlobals.API_DOMAIN + '/accounts/' + account.acconut_id;
       
    this.http.put(url, account, {headers, responseType:"json"})
    .subscribe(data => {
      console.log(data);
    });
  }

  getStateList(idx){
    this.statelist = this.countrylist[idx].countrystate;
  }

  isChecked:boolean = false;
 
  get value() {
    return this.isChecked;
  }
 
  set value(val:boolean) { 
    this.isChecked = val ? true : false;
  }

  setState(val:number, idx:number){
    if(this.isExBoolChecked[idx]){
      this.isExBoolChecked[idx] = false;
    }else{
      this.isExBoolChecked[idx] = true;
    }
    //this.Students.extra_curricular_activity[idx].id = val;

    
    console.log(this.isExBoolChecked[idx]);
  }

  isExChecked(val:number, idx:number){
    //console.log(val + " >> " + idx);
    //console.log( " in >> " + this.Students.extra_curricular_activity.map(x => x.id).indexOf(val) );
    //return this.Students.extra_curricular_activity[idx].id == 0 || this.Students.extra_curricular_activity[idx].id == undefined ? false : true;
    this.isExBoolChecked[idx] = this.Students.extra_curricular_activity.map(x => x.id).indexOf(val) > -1? true : false;

    if(this.isExBoolChecked[idx]){
      //this.Students.extra_curricular_activity[idx] = {id:val, name:"--"};
    }
    return this.isExBoolChecked[idx];  
  }

  public setFlag(obj:IAccount, property: any, trueValue: any, falseValue: any): any {
    if (obj === trueValue) {
      obj[property] = falseValue;
    } else {
      obj[property] = trueValue;
    }
  }
}
