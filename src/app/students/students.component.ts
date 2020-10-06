import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'
import { IStudent } from "../Interface/IStudent";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  Students:any;
  StudentList:IStudent;
  classLink: string;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => { 
      this.classLink = atob(params.get('form_class'));
    });

    this.http.get<IStudent>(environment.API_DOMAIN + '/students/').
    subscribe(data => {
      this.Students = data;
    });
  }

}