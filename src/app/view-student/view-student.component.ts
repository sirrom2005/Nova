import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppGlobals } from "../common/app-globals";
import { IAccount } from "../Interface/IAccount";
import { IBehavior } from '../Interface/IBehavior';
import { IKeyValue } from '../Interface/IValueKey';
import { forkJoin } from 'rxjs';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit {
  formData:FormGroup;
  submitted:boolean = false;
  success:boolean   = false;
  error:boolean     = false;

  Studentid:string;
  Student:IAccount;
  ActionTitle:string;
  MeritList:Array<IBehavior>;
  DisiplinaryList:Array<IBehavior>;
  Conduct:any;
  ConductOptLst:any;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private route: ActivatedRoute) { 
      this.formData = this.formBuilder.group({
        conduct_id: ['', Validators.required],
        comments: ['', Validators.required]
      });
  }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => { 
      this.Studentid = params.get('student_id'); 

      //Get Student Account
      let req1 = this.http.get<IAccount>(AppGlobals.API_DOMAIN + '/accounts/' + this.Studentid);
      //Student behavior 
      let req2 = this.http.get<any>(AppGlobals.API_DOMAIN + '/studentbehavior/student/' + this.Studentid);
      //conductList List
      let req3 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/conductList');
      forkJoin(req1, req2, req3).subscribe(
        json => 
              {
                this.Student          = json[0];
                this.DisiplinaryList  = json[1].filter(x => x.conduct.type_id == 2);
                this.MeritList        = json[1].filter(x => x.conduct.type_id == 3);
                this.Conduct          = json[2];
              }     
      );
    });
  }

  studentAction(key:number){
    this.ActionTitle = (key==3) ? "Add Merit" : "Disiplinary Actions";
    this.ConductOptLst = this.Conduct.filter(x => x.type_id == key);
    //set dropdown list default value
    this.formData.controls.conduct_id.setValue(this.ConductOptLst[0].id);
    this.formData.controls.comments.setValue("");
  }

  SaveBehavior()
  {
    this.submitted = true;

    const body = {
      conduct_id:   this.formData.controls.conduct_id.value,
      comments:     this.formData.controls.comments.value,
      student_id:   this.Student.acconut_id,
      class_id:     this.Student.classroom.id,
      teacher_id:   5555
    };

    console.log(body);

    if(this.formData.invalid){
      console.log("Errorr");
      this.error = true;
      return;
    }
    console.log(">>>>");
  }

}
