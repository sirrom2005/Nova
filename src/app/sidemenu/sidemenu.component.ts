import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../common/app-globals'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit 
{
  readonly DefaultClass = encodeURIComponent(btoa(AppGlobals.FormClass[0]));

  constructor() { }

  ngOnInit() {
 
  }

}
