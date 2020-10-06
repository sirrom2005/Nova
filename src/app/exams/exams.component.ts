import { Component, OnInit } from '@angular/core';
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

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getExaminationList()
    .subscribe(data => {
      this.dataList = data;
      this.showContent = true;
    });
  }
}
