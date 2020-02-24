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
  schoolcitizenship:IKeyValue;
  countrylist: {};
  statelist: {};
  classRoomLstId:Number;
  houseColorIdLst:Number;
  validat:boolean = false;

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
    this.validat = this.validatControl();
    if(!this.validat){
      return;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = AppGlobals.API_DOMAIN + '/accounts/' + account.acconut_id;
       
    this.http.put(url, account, {headers, responseType:"json"})
    .subscribe(data => {
      console.log(data);
    });
  }

  validatControl() 
  {
    console.log((this.Students.housecolor.id == 0) + " <> " + (this.Students.classroom.id>0));

    if(this.Students.housecolor.id == 0){
      return false;
    }

    if(this.Students.classroom.id==0)
    {
      return false;
    }

    /*if(this.Students.country_id == 0){
      return false;
    }

    if(this.Students.parish_id == 0)
    {
      return false;
    }*/
    
    return true;
  }

  /*Set State list*/
  getStateList(idx){
    this.statelist = this.countrylist[idx].countrystate;
  }
  /*Get bool*/
  getExtracurricularState(obj:any){
    let val = this.Students.extra_curricular_activity.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setExtracurricular state*/
  setExtracurricular(state:boolean, obj:any, idx:number){
    if(state){
      this.Students.extra_curricular_activity.push(obj);
    }else{
      let key = this.Students.extra_curricular_activity.map(x => x.id).indexOf(obj.id);
      this.Students.extra_curricular_activity.splice(key,1);
    }
  }
  /*Get bool*/
  getResponsibilitiesState(obj:any){
    let val = this.Students.responsibilities.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setResponsibilities state*/
  setResponsibilities(state:boolean, obj:any, idx:number){
    if(state){
      this.Students.responsibilities.push(obj);
    }else{
      let key = this.Students.responsibilities.map(x => x.id).indexOf(obj.id);
      this.Students.responsibilities.splice(key,1);
    }
  }
  /*Get bool*/
  getSchoolCitizenshipState(obj:any){
    let val = this.Students.citizenship.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setResponsibilities state*/
  setSchoolCitizenship(state:boolean, obj:any, idx:number){
    if(state){
      this.Students.citizenship.push(obj);
    }else{
      let key = this.Students.citizenship.map(x => x.id).indexOf(obj.id);
      this.Students.citizenship.splice(key,1);
    }
  }
  
}
