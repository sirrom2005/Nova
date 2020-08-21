import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { StudentsComponent } from '../students/students.component';
import { EditStudentsComponent } from '../edit-students/edit-students.component';
import { ExamsComponent } from '../exams/exams.component';
import { ManageExamComponent } from '../exams/manage-exam.component';
import { GenerateReportComponent } from '../generate-report/generate-report.component';
import { ViewSchoolComponent } from '../view-school/view-school.component';
import { ViewStudentComponent } from '../view-student/view-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminComponent,
    StudentsComponent,
    EditStudentsComponent,
    ViewStudentComponent,
    ViewSchoolComponent,
    ExamsComponent,
    ManageExamComponent,
    GenerateReportComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
