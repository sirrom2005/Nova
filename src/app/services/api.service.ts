import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Service } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private service:Service) { }

  getExaminationList():any{ return this.http.get<any>(`${environment.API_DOMAIN}/examination/list/${this.service.getUserId()}`); }

  deleteExamination(id:number):any{ return this.http.delete<any>(`${environment.API_DOMAIN}/examination/${id}`); }
}
