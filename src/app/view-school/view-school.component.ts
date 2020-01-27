import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../common/app-globals';
import { ISchool } from "../Interface/ISchool";

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent implements OnInit {

  School:ISchool;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get<ISchool>(AppGlobals.API_DOMAIN + '/schools/1201103719').
    subscribe(data => {
      this.School = data;
    });
  }

}

/*,
    {
        "title":"Andriod App",
        "url":"",
        "task":"Design | Programming",
        "desc":"Andriod apps to acomplish task for various clients"
    },
    {
        "title":"Fimiyaad.com",
        "url":"http://fimiyaad.com",
        "task":"Web Programming",
        "desc":"Mentainance"
    },
    {
        "title":"School Managment System",
        "url":"",
        "task":"Design | Web Programming",
        "desc":"hhhh"
    } */