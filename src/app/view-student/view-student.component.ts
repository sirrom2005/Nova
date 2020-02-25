import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppGlobals } from "../common/app-globals";
import { IAccount } from "../Interface/IAccount";
import { IBehavior } from '../Interface/IBehavior';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit {
  Studentid:string;
  Student:IAccount;
  ActionTitle:string;
  MeritList:Array<IBehavior>;
  DisiplinaryList:Array<IBehavior>;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => { 
      this.Studentid = params.get('student_id'); 
      this.http.get<IAccount>(AppGlobals.API_DOMAIN + '/accounts/' + this.Studentid).
      subscribe(data => {
        this.Student = data;
        this.http.get<any>(AppGlobals.API_DOMAIN + '/studentbehavior/student/' + data.acconut_id).
        subscribe(json1 => {
          this.DisiplinaryList = json1.filter(x => x.conduct.type_id == 2);
          this.MeritList = json1.filter(x => x.conduct.type_id == 3);
        });
      });
    });
  }

  studentAction(key:number){
    this.ActionTitle = (key==3) ? "Add Merit" : "Disiplinary Actions";
    //json1.filter(x => x.conduct.type_id == );
  }

}
