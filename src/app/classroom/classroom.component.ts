import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {
  classList:Array<any> = [];

  constructor(private api:ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => 
    { 
      var id = parseInt(params.get('class_id')) | 0;

      this.api.getClassList(id)
      .subscribe(
        (data:any) => { 
          this.classList = data;
        }
      );
    });
    
  }

}
