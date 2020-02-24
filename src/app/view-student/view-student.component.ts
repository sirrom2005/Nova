import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppGlobals } from "../common/app-globals";
import { IAccount } from "../Interface/IAccount";


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit {
  studentid:String;
  Student:IAccount;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => { 
      this.studentid = params.get('student_id'); 
      this.http.get<IAccount>(AppGlobals.API_DOMAIN + '/accounts/' + this.studentid).
      subscribe(data => {
        this.Student = data;
      });
    });
  }
}
