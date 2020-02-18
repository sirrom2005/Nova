import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IStudent } from "../Interface/IStudent";
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
  Students = {
      classroom: {},
      housecolor: {}
    };
  formData:FormGroup;
  extraCurricular:IKeyValue;
  responsibilities:IKeyValue;
  classList:IKeyValue;
  houseColor:IKeyValue;
  defaultSchooolId = 2011040016;
  schoolcitizenship: IKeyValue;

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
    let req3 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + `/valuekey/class/${this.defaultSchooolId}`)
    //Responsibilities List
    let req4 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/responsibilities')
    //Citenzenship List
    let req5 = this.http.get<IKeyValue>(AppGlobals.API_DOMAIN + '/valuekey/schoolcitizenship')

    forkJoin(req1, req2, req3, req4, req5).subscribe(
      json => 
            {
              this.houseColor = json[0];
              this.extraCurricular = json[1];
              this.classList = json[2];
              this.responsibilities = json[3];
              this.schoolcitizenship = json[4];
            }
    );

    //Load Account data
    this.route.paramMap.subscribe(params => { 
      this.studentid = params.get('student_id'); 
      this.http.get<any>(AppGlobals.API_DOMAIN + '/accounts/' + this.studentid).
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
