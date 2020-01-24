import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})

export class EditStudentsComponent implements OnInit {
  studentid:String;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { this.studentid = params.get('student_id'); });
    console.log(">>> " + this.studentid);
  }

}
