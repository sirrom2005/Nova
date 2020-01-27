import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ViewSchoolComponent } from './view-school/view-school.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    EditStudentsComponent,
    ViewStudentComponent,
    SidemenuComponent,
    ViewSchoolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
