import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../app/students/students.component';
import { ViewStudentComponent } from '../app/view-student/view-student.component';
import { EditStudentsComponent } from '../app/edit-students/edit-students.component';
import { ViewSchoolComponent } from '../app/view-school/view-school.component';
import { ExamsComponent } from '../app/exams/exams.component';
import { ManageExamComponent } from './exams/manage-exam.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'students/:form_class', component: StudentsComponent },
  { path: 'edit-student/:student_id', component: EditStudentsComponent },
  { path: 'view-student/:student_id', component: ViewStudentComponent },
  { path: 'view-school', component: ViewSchoolComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'manage-exam/:id', component: ManageExamComponent },
  { path: 'generate-report', component: GenerateReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
