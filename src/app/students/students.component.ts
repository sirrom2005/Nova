import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment'
import { IClassLinks } from '../Interface/IClassLinks';
import { IStudent } from "../Interface/IStudent";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  FormClass:Array<string> = ["7/A","7/B"];
  ClassLinks:Array<IClassLinks> = [];
  Students:any;
  StudentList:IStudent;
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

    this.http.get<IStudent>(environment.API_DOMAIN + '/students/').
    subscribe(data => {
      this.Students = data;
      this.showClassList(this.classLink);
    });

    this.FormClass.forEach(x => this.ClassLinks.push({text:x, link:btoa(x)}))
  }

  showClassList(key:String){
    this.StudentList = this.Students[key.toString()];
  }

}