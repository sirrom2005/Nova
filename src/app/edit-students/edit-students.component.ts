import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment'
import { IKeyValue } from '../Interface/IValueKey';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';
import { Service } from '../services/service.service';
import { IStudent } from '../Interface/IStudent';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})

export class EditStudentsComponent implements OnInit {
  studentid:number;
  Student:IStudent;
  formData:FormGroup;
  extraCurricular:IKeyValue;
  responsibilities:IKeyValue;
  classList:IKeyValue;
  houseColor:IKeyValue;
  schoolcitizenship:IKeyValue;
  countrylist: {};
  statelist: {};
  classRoomLstId:Number;
  houseColorIdLst:Number;
  validat:boolean = false;

  constructor(private http:HttpClient, private route: ActivatedRoute, private api:ApiService, private router: Router, private service:Service) {}

  ngOnInit() {
    this.api.getSchoolIdByUserId(this.service.getUserId())
    .subscribe(
      (id: any) => {
        //House Color List
        let reqa1 = this.http.get<IKeyValue>(environment.API_DOMAIN + `/valuekey/housecolor/${id}`);
        //Class List by school id
        let reqa2 = this.http.get<IKeyValue>(environment.API_DOMAIN + `/valuekey/class/${id}`);
        forkJoin([reqa1, reqa2]).subscribe(
          json => 
                {
                  this.houseColor = json[0];
                  this.classList  = json[1];
                }
        );
      }
    );

    //Extra Curricular Activity List
    let req1 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/extracurricularactivity');
    //Responsibilities List
    let req2 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/responsibilities');
    //Citenzenship List
    let req3 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/schoolcitizenship');
    //Country List
    let req4 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/country');

    forkJoin([req1, req2, req3, req4]).subscribe(
      json => 
            {
              this.extraCurricular    = json[0];
              this.responsibilities   = json[1];
              this.schoolcitizenship  = json[2];
              this.countrylist        = json[3];
              
              //Load Account data
              this.route.paramMap.subscribe(params => { 
                this.studentid = parseInt(params.get('student_id')); 
                this.api.getStudentAccount(this.studentid)
                .subscribe((data: IStudent) => {
                  this.getStateList(data.country.id);
                  this.Student = data;
                });
              });            
            }      
    );
  }

  onSubmit(account:IStudent) {
    this.validat = this.validatControl();
    if(!this.validat){
      return;
    }

    this.api.postStudentAccount(account)
    .subscribe(
      (      data: any) => {
        this.router.navigate(['/admin/view-student/'+this.Student.acconut_id]);
      },
      () => {
        console.error("ERROE");
      }
    );
  }

  validatControl() 
  {
    if(this.Student.firstname.trim() == ""){
      return false;
    }

    if(this.Student.lastname.trim() == ""){
      return false;
    }

    if(this.Student.dob.trim() == ""){
      return false;
    }

    if(this.Student.email.trim() == ""){
      return false;
    }

    if(this.Student.phone_home.trim() == ""){
      return false;
    }

    if(this.Student.housecolor.id == 0){
      return false;
    }

    if(this.Student.account_class.id==0)
    {
      return false;
    }

    if(this.Student.country.id == 0){
      return false;
    }

    if(this.Student.country_state.state_id == 0)
    {
      return false;
    }
    
    return true;
  }

  /*Set State list*/
  getStateList(idx: number){
    this.api.getCountryStateList(idx)
    .subscribe((data: {}) => {
      this.statelist = data;
    });
  }
  /*Get bool*/
  getExtracurricularState(obj:any){
    let val = this.Student.extra_curricular_activity.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setExtracurricular state*/
  setExtracurricular(state:boolean, obj:any){
    if(state){
      this.Student.extra_curricular_activity.push(obj);
    }else{
      let key = this.Student.extra_curricular_activity.map(x => x.id).indexOf(obj.id);
      this.Student.extra_curricular_activity.splice(key,1);
    }
  }
  /*Get bool*/
  getResponsibilitiesState(obj:any){
    let val = this.Student.responsibilities.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setResponsibilities state*/
  setResponsibilities(state:boolean, obj:any){
    if(state){
      this.Student.responsibilities.push(obj);
    }else{
      let key = this.Student.responsibilities.map(x => x.id).indexOf(obj.id);
      this.Student.responsibilities.splice(key,1);
    }
  }
  /*Get bool*/
  getSchoolCitizenshipState(obj:any){
    let val = this.Student.citizenship.map(x => x.id).indexOf(obj.id);
    return val>=0 ? true: false;
  }
  /*setResponsibilities state*/
  setSchoolCitizenship(state:boolean, obj:any){
    if(state){
      this.Student.citizenship.push(obj);
    }else{
      let key = this.Student.citizenship.map(x => x.id).indexOf(obj.id);
      this.Student.citizenship.splice(key,1);
    }
  }
  
}
