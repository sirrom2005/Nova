import { Component, OnInit } from '@angular/core';
import { IKeyValue } from '../Interface/IValueKey';
import { ApiService } from '../services/api.service';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formClass:IKeyValue;
  classList:Array<{id:Number, name:String, subject:String}> = [];

  constructor(private api:ApiService, private service:Service) { }

  ngOnInit(): void {
    this.api.getTeacherAccount(this.service.getUserId())
    .subscribe(data => {
      console.log(data)
      if(data.form_class.length>0){
        this.formClass = {id: data.form_class[0].id, name: data.form_class[0].name};
      }

      if(data.teacher_class_room.length>0){
        this.classList.push({id: data.teacher_class_room[0].class_room_id, name: data.teacher_class_room[0].class_room, subject: data.teacher_class_room[0].subject});
      }

      if(data.teacher_class_room.length>1){
        this.classList.push({id: data.teacher_class_room[1].class_room_id, name: data.teacher_class_room[1].class_room, subject: data.teacher_class_room[1].subject});
      }
    });
  }

}
