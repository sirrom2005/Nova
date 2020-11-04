import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { IBehavior } from '../Interface/IBehavior';
import { IKeyValue } from '../Interface/IValueKey';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IStudent } from '../Interface/IStudent';

declare var jQuery: any;

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})

export class ViewStudentComponent implements OnInit {
  formData:FormGroup;
  submitted:boolean = false;
  success:boolean   = false;
  error:boolean     = false;
  btnDisable:boolean= false;
  sysError:boolean  = false;

  Studentid:string;
  Student:IStudent;
  ActionTitle:string;
  MeritList:Array<IBehavior>;
  DisiplinaryList:Array<IBehavior>;
  Conduct:any;
  ConductOptLst:any;
  body:IBehavior;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private route: ActivatedRoute) { 
      this.formData = this.formBuilder.group({
        conduct_id: ['', Validators.required],
        comments: ['', Validators.required]
      });
  }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => { 
      this.Studentid = params.get('student_id'); 
      //Get Student Account
      let req1 = this.http.get<IStudent>(environment.API_DOMAIN + '/students/' + this.Studentid);
      //conductList List
      let req2 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/conductList');
      forkJoin(req1, req2).subscribe(
        json => 
              {
                this.Student  = json[0];
                this.Conduct  = json[1];
              }     
      );
    });

    this.fetchStudentbehavior();
  }

  fetchStudentbehavior() {
      //Student behavior 
      this.http.get<any>(environment.API_DOMAIN + '/studentbehavior/student/' + this.Studentid)
      .subscribe(data => {
        this.DisiplinaryList  = data.filter(x => x.conduct.type_id == 2);
        this.MeritList        = data.filter(x => x.conduct.type_id == 3);
      });
  }

  studentAction(key:number){
    this.submitted = false;
    this.success   = false;
    this.error     = false;
    this.btnDisable= false;
    this.sysError  = false;

    this.ActionTitle = (key==3) ? "Add Merit" : "Add Disiplinary Actions";
    this.ConductOptLst = this.Conduct.filter(x => x.type_id == key);
    //set dropdown list default value, 0 index value
    this.formData.controls.conduct_id.setValue(this.ConductOptLst[0].id);
    this.formData.controls.comments.setValue("");
  }

  SaveBehavior()
  {
    this.submitted = true;

    if(this.formData.invalid){
      this.error = true;
      return;
    }

    const body = {
      teacher_id: 1047025,
      comments:   this.formData.controls.comments.value,
      student_id: this.Student.acconut_id,
      class_room: {id:this.Student.account_class.id},
      conduct:    {id: this.formData.controls.conduct_id.value}
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options:any = {headers, responseType:"json"};
    const url = environment.API_DOMAIN + '/studentbehavior';
       
    this.btnDisable = true;
    this.http.post<number>(url, body, options)
    .subscribe(
      () => {
        this.fetchStudentbehavior();
        jQuery("#meritModal").modal('hide');
      },
      error => {
        this.sysError = true;
        this.btnDisable = false;
        console.log( error )
      }
    );
  }

  deleteKey:number;
  setDeletKey(id:number){
    this.deleteKey = id;
  }

  deleteBehavior(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options:any = {headers, responseType:"json"};
    const url = environment.API_DOMAIN + '/studentbehavior/' + this.deleteKey;
       
    this.http.delete(url, options).subscribe(
      data => {
        this.DisiplinaryList = this.DisiplinaryList.filter(x => x.id != this.deleteKey);
        this.MeritList = this.MeritList.filter(x => x.id != this.deleteKey);
        console.log(data)
      }
    );
  }
}
