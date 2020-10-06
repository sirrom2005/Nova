import { Component, OnInit } from '@angular/core';
import { IKeyValue } from '../Interface/IValueKey';
import { ApiService } from '../services/api.service';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-my-classroom',
  templateUrl: './my-classroom.component.html',
  styleUrls: ['./my-classroom.component.scss']
})
export class MyClassroomComponent implements OnInit {
  formClass:IKeyValue;
  classList:Array<{id:Number, name:String, subject:String}> = [];

  constructor(private api:ApiService, private service:Service) { }


  ngOnInit(): void {
    this.api.getTeacherAccount(this.service.getUserId())
    .subscribe(data => {
      console.log(data)
      if(data.form_class.length>0){
        this.formClass = data.form_class;
      }

      if(data.teacher_class_room.length>0){
        this.classList = data.teacher_class_room;
      }
    });
  }

}
