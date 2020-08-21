import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { ExamQuestion } from '../Interface/ExamQuestion';
import { ExamAnswer } from '../Interface/ExamAnswer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IKeyValue } from '../Interface/IValueKey';
import { IExam } from '../Interface/IExam';
import { Service } from '../services/service.service';
import { ApiService } from '../services/api.service';

declare var jQuery: any;
declare function closeModal():any;

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.scss']
})

export class ManageExamComponent implements OnInit
{
  submitted:boolean = false;
  success:boolean   = false;
  error:boolean     = false;
  editMode:boolean  = false;
  pageId:number;
  question:string;
  formErrorSytle = { 
                      name:      "", 
                      exam_type: "",
                      duration:  "",
                      subject:   "",
                      question    : "",
                      answer_text1: "",
                      answer_text2: "",
                      answer_text3: "",
                      answer_text4: "",
                      answer_text5: "",
                      answer_text6: "",
                      exam_date:    "",
                      exam_expire_date: ""
                    };
  formData:FormGroup;
  exam:IExam;
  answerBodyJson:Array<any> = []; 
  examBodyJson:Array<any> = []; 
  subjectList:IKeyValue;
  examinationTypeList: IKeyValue;
  durationList: IKeyValue;
  editId: number;
  btnDisable:boolean = false;
  errorMessage:string;

  @ViewChild('sd') sdate : ElementRef;
  @ViewChild('ed') edate : ElementRef;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private route: ActivatedRoute, private router: Router, private service:Service, private apiService:ApiService){
    this.formData = this.formBuilder.group({
      question:     ['', Validators.required],
      answer_text1: ['', Validators.required],
      answer_text2: ['', Validators.required],
      answer_text3: [''],
      answer_text4: [''],
      answer_text5: [''],
      answer_text6: [''],
      answer: ['', Validators.required]
    });
  }

  ngOnInit(): void 
  {
    jQuery( function() {
      var options = {
                      dateFormat: "yy-mm-dd", 
                      showAnim: "blind",
                      defaultDate: "+1w",
                      changeMonth: true,
                      numberOfMonths: 2};
      var sDate = jQuery( "#exam_date" ).datepicker(options)
      .on( "change", function() {
        eDate.datepicker( "option", "minDate", getDate(this));
      });

      var eDate = jQuery( "#exam_expire_date" ).datepicker(options)
      .on( "change", function() {
        sDate.datepicker( "option", "maxDate", getDate(this));
      });;

      function getDate(ele:any) {
        var date:any;
        try {
          date = jQuery.datepicker.parseDate( "yy-mm-dd", ele.value );
        } catch( error ) {
          date = null;
        }
        return date;
      }
    });

    this.exam =  { 
      id:0,
      name:"",
      exam_body:[],
      exam_answer:[],
      exam_type: {id:0, name:""},
      duration: {id:0, name:""},
      allow_retry:0,
      description:"",
      notes:"",
      subject: {id:0, name:""},
      created_by:0,
      exam_date:"",
      exam_expire_date:""
    };

    this.route.paramMap.subscribe(params => { 
      let req1 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/subjectList');
      let req2 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/examinationTypeList');
      let req3 = this.http.get<IKeyValue>(environment.API_DOMAIN + '/valuekey/durationList');
      
      forkJoin(req1, req2, req3).subscribe(
        json => 
              {
                this.subjectList          = json[0];
                this.examinationTypeList  = json[1];
                this.durationList         = json[2];

                this.pageId = parseInt(params.get('id')) | 0;

                if(this.pageId!=0){
                  this.http.get<any>(environment.API_DOMAIN + '/examination/' + this.pageId).
                  subscribe(
                    data => { 
                      this.formatData(data);
                    }
                  );
                }
              }    
      );
    });
  }

  formatData(data:any){
    this.exam = data; 

    //examQuestion
    if(data!=null){
      let jsonStr = atob(data.exam_body);
      let jsonObj:Array<ExamQuestion> = JSON.parse(jsonStr);
      let examQuestion:Array<ExamQuestion> = <ExamQuestion[]>jsonObj;
      this.exam.exam_body = examQuestion;

      //examAnswer
      let jsonAnswerStr = atob(data.exam_answer);
      let jsonObjAnswer:Array<ExamAnswer> = JSON.parse(jsonAnswerStr);
      let examAnswer:Array<ExamAnswer> = <ExamAnswer[]>jsonObjAnswer;
      this.exam.exam_answer = examAnswer;
    }
  }

  AddQuestionPost()
  {
    this.submitted = true;
    this.error = false;
    
    let timeStamp = Date.now();

    const questionAnswer = {
      timeStamp: timeStamp,
      question: this.formData.controls.question.value,
      answer_text1: this.formData.controls.answer_text1.value,
      answer_text2: this.formData.controls.answer_text2.value,
      answer_text3: this.formData.controls.answer_text3.value,
      answer_text4: this.formData.controls.answer_text4.value,
      answer_text5: this.formData.controls.answer_text5.value,
      answer_text6: this.formData.controls.answer_text6.value
    };

    const answer = {timeStamp: timeStamp, answer: this.formData.controls.answer.value };

    this.formErrorSytle.question     = (questionAnswer.question==null     || questionAnswer.question.trim()==""    ) ? "is-invalid" : "" ;
    this.formErrorSytle.answer_text1 = (questionAnswer.answer_text1==null || questionAnswer.answer_text1.trim()=="") ? "is-invalid" : "" ;
    this.formErrorSytle.answer_text2 = (questionAnswer.answer_text2==null || questionAnswer.answer_text2.trim()=="") ? "is-invalid" : "" ;

    if(this.formData.invalid){
      this.error = true;
      if(this.formErrorSytle.question != "is-invalid" && this.formErrorSytle.answer_text1 != "is-invalid" && this.formErrorSytle.answer_text2 != "is-invalid")
      {
        if(this.formData.controls.answer.value == "" || this.formData.controls.answer.value == null){
          this.errorMessage = "Please select the correct answer for this question usng the box on the right";
        }
      }
      return;
    }

    this.errorMessage = "";

    if(this.editMode == true)
    {
      this.exam.exam_body[this.editId].question     = this.formData.controls.question.value;
      this.exam.exam_body[this.editId].answer_text1 = this.formData.controls.answer_text1.value;
      this.exam.exam_body[this.editId].answer_text2 = this.formData.controls.answer_text2.value;
      this.exam.exam_body[this.editId].answer_text3 = this.formData.controls.answer_text3.value;
      this.exam.exam_body[this.editId].answer_text4 = this.formData.controls.answer_text4.value;
      this.exam.exam_body[this.editId].answer_text5 = this.formData.controls.answer_text5.value;
      this.exam.exam_body[this.editId].answer_text6 = this.formData.controls.answer_text6.value;
      this.exam.exam_answer[this.editId].answer     = this.formData.controls.answer.value;
      this.formData.reset();
      closeModal();
    }else{ 
      this.exam.exam_body.push(questionAnswer);
      this.exam.exam_answer.push(answer);
      this.formData.reset();
    }
  }

  Save()
  {
    this.submitted = true;
    this.error = false;
    this.btnDisable = true;

    if(!this.validatControl()){
      this.btnDisable = false;
      return;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = {
      id          : this.exam.id,
      name        : this.exam.name,
      exam_body   : btoa(JSON.stringify(this.exam.exam_body)),
      exam_answer : btoa(JSON.stringify(this.exam.exam_answer)),
      exam_type   : {id: this.exam.exam_type.id},
      duration    : {id: this.exam.duration.id},
      subject     : {id: this.exam.subject.id},
      allow_retry : (this.exam.allow_retry)? 1 : 0,
      description : "",
      notes       : "",
      created_by  : this.service.getUserId(),
      exam_date   : this.sdate.nativeElement.value,
      exam_expire_date : this.edate.nativeElement.value,
    };

    var url = environment.API_DOMAIN + '/examination/';
    this.http.post<any>(url, body, {headers, responseType:"json"})
    .subscribe(post => {
      if(post.name.trim()!=""){
        this.router.navigate(['/admin/exams']);
      }
    });

    this.btnDisable = false;
  }

  validatControl() 
  {
    if(this.exam.name.trim() == ""){
      this.formErrorSytle.name = "is-invalid";
      return false;
    }
    this.formErrorSytle.name = "";

    if(this.exam.exam_type.id == 0){
      this.formErrorSytle.exam_type = "is-invalid";
      return false;
    }
    this.formErrorSytle.exam_type = "";

    if(this.exam.duration.id == 0){
      this.formErrorSytle.duration = "is-invalid";
      return false;
    }
    this.formErrorSytle.duration = "";

    if(this.exam.subject.id == 0){
      this.formErrorSytle.subject = "is-invalid";
      return false;
    }
    this.formErrorSytle.subject = "";

    if(this.sdate.nativeElement.value.trim() == ""){
      this.formErrorSytle.exam_date = "is-invalid";
      return false;
    }
    this.formErrorSytle.exam_date = "";

    if(this.edate.nativeElement.value.trim() == ""){
      this.formErrorSytle.exam_expire_date = "is-invalid";
      return false;
    }
    this.formErrorSytle.exam_expire_date = "";

    if(this.exam.exam_body.length==0){
      jQuery("#questionRequiredModal").modal('show');
      return false;
    }
    
    return true;
  }

  LoadEdit(id:number){
    this.editMode = true;
    this.editId = id;

    this.formData.controls.question.setValue(this.exam.exam_body[id].question);
    this.formData.controls.answer_text1.setValue(this.exam.exam_body[id].answer_text1);
    this.formData.controls.answer_text2.setValue(this.exam.exam_body[id].answer_text2);
    this.formData.controls.answer_text3.setValue(this.exam.exam_body[id].answer_text3);
    this.formData.controls.answer_text4.setValue(this.exam.exam_body[id].answer_text4);
    this.formData.controls.answer_text5.setValue(this.exam.exam_body[id].answer_text5);
    this.formData.controls.answer_text6.setValue(this.exam.exam_body[id].answer_text6);

    this.formData.controls.answer.setValue(this.exam.exam_answer[id].answer);
  }

  AddNew(){
    this.formData.reset();
    this.editMode = false;
    this.errorMessage = "";
    this.formErrorSytle.question = this.formErrorSytle.answer_text1 = this.formErrorSytle.answer_text2 = "";
  }

  Delete(id:number){
    this.exam.exam_body.splice(id, 1);
    this.exam.exam_answer.splice(id, 1);
  }

  deleteEvent(){
    this.apiService.deleteExamination(this.pageId).
    subscribe((data: any) => {
      jQuery("#deleteExamModal").modal('hide');
      this.router.navigate(['/admin/exams']);
    });
  }
}
