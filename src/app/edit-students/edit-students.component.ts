import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  Students:IStudent;
  formData:FormGroup;
  extraCurricular:IKeyValue;
  responsibilities:IKeyValue;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private route: ActivatedRoute) { 
    this.formData = this.formBuilder.group({
      acconut_id: ['', Validators.required],
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      enrollment_date: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.studentid = params.get('student_id'); 
      this.http.get<IStudent>(AppGlobals.API_DOMAIN + '/students/' + this.studentid).
      subscribe(data => {
        this.Students = data;
      });
    });

    //Extra Curricular Activity List
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/extracurricularactivity')
      .subscribe(data => {
        this.extraCurricular = data;
      });

    //Responsibilities List
    this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/responsibilities')
    .subscribe(data => {
      this.responsibilities = data;
    });
  }

  onSubmit(body) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const url = AppGlobals.API_DOMAIN + '/students/';
       
    this.http.post<IStudent>(url, body, {headers, responseType:"json"})
    .subscribe(data => {
      console.log(data);
    });
  }

}
