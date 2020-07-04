import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppGlobals } from '../common/app-globals';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit 
{
  dataList:Array<any> = [];

  constructor(private http:HttpClient,) { }

  ngOnInit(): void {
    this.http.get<any>(AppGlobals.API_DOMAIN + '/examination/').
    subscribe(data => {
      this.dataList = data;
    });
  }

}
