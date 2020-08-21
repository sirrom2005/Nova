import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit 
{
  username:string;
  isAuthenticated:boolean;

  constructor(private service:Service) { }

  ngOnInit(): void {

    this.isAuthenticated = this.service.isAuthenticated();
    this.username = this.service.getUserName();

    console.log("GenerateReportComponent  username> " + this.username);
    console.log("GenerateReportComponent this.isAuthenticated > " + this.isAuthenticated);
  }

}
