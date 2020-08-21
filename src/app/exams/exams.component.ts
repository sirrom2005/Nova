import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit 
{
  username:string
  dataList:Array<any> = [];
  showContent:boolean = false;

  constructor(private http:HttpClient, private service:ApiService) { }

  ngOnInit(): void {
    this.service.getExaminationList()
    .subscribe(data => {
      this.dataList = data;
      this.showContent = true;
    });
  }
}
