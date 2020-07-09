import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit 
{
  readonly DefaultClass = encodeURIComponent(btoa("7/A"));

  constructor() { }

  ngOnInit() {
 
  }

}
