import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IStudent } from "../Interface/IStudent";
import { AppGlobals } from "../common/app-globals";
import { IKeyValue } from '../Interface/IValueKey';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})

export class EditStudentsComponent implements OnInit {
  studentid:String;
  Students = {};
  formData:FormGroup;
  extraCurricular:IKeyValue;
  responsibilities:IKeyValue;
  classList:IKeyValue;
  houseColor:IKeyValue;
  defaultSchooolId = 2011040016;

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
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/housecolor/' + this.defaultSchooolId)
    .subscribe(data => {
      this.houseColor = data;
    });

    //Extra Curricular Activity List
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/extracurricularactivity')
      .subscribe(data => {
        this.extraCurricular = data;
    });

    //Class List by school id
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/class/' + this.defaultSchooolId)
    .subscribe(data => {
      this.classList = data;
    });

    //Responsibilities List
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/responsibilities')
    .subscribe(data => {
      this.responsibilities = data;
    });

    //Load Account data
    this.route.paramMap.subscribe(params => { 
      this.studentid = params.get('student_id'); 
      this.http.get(AppGlobals.API_DOMAIN + '/accounts/' + this.studentid).
      subscribe(data => {
        this.Students = data;
      });
    });
  }

  onSubmit(account) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = AppGlobals.API_DOMAIN + '/accounts/' + account.acconut_id;
       
    this.http.put(url, account, {headers, responseType:"json"})
    .subscribe(data => {
      console.log(data);
    });
  }
}
