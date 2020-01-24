import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../common/app-globals';

export class Student 
{
    account_id:Number; 
    username:String; 
    firstname:String; 
    middlename:String; 
    lastname:String; 
    gender:String; 
    formclass:String
};

export interface IClassLinks{
  text:string,
  link:string
};

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  ClassLinks:Array<IClassLinks> = [];
  Students:any;
  StudentList:Student;
  classLink: string;

  constructor(private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => { 
      this.classLink = atob(params.get('form_class'));
      if(this.StudentList!=undefined){ 
        this.showClassList(this.classLink);
      }
    });

    this.http.get<Student>(AppGlobals.API_DOMAIN + '/students/').
    subscribe(data => {
      this.Students = data;
      this.showClassList(this.classLink);
    });

    AppGlobals.FormClass.forEach(x => this.ClassLinks.push({text:x, link:btoa(x)}))
  }

  showClassList(key:String){
    this.StudentList = this.Students[key.toString()];
  }

}