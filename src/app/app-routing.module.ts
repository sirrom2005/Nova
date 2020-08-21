import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from '../app/students/students.component';
import { ViewStudentComponent } from '../app/view-student/view-student.component';
import { EditStudentsComponent } from '../app/edit-students/edit-students.component';
import { ViewSchoolComponent } from '../app/view-school/view-school.component';
import { ExamsComponent } from '../app/exams/exams.component';
import { ManageExamComponent } from './exams/manage-exam.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { SecurityGuard } from './services/security.guard';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Error404Component } from './common/error404/error404.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminComponent, 
    children: [
      { path: '',                         component: DashboardComponent,      canActivate: [SecurityGuard] },
      { path: 'students',                 component: StudentsComponent,       canActivate: [SecurityGuard] },
      { path: 'students/:form_class',     component: StudentsComponent,       canActivate: [SecurityGuard] },
      { path: 'edit-student/:student_id', component: EditStudentsComponent,   canActivate: [SecurityGuard] },
      { path: 'view-student/:student_id', component: ViewStudentComponent,    canActivate: [SecurityGuard] },
      { path: 'view-school',              component: ViewSchoolComponent,     canActivate: [SecurityGuard] },
      { path: 'exams',                    component: ExamsComponent,          canActivate: [SecurityGuard] },
      { path: 'new-exam',                 component: ManageExamComponent,     canActivate: [SecurityGuard] },
      { path: 'manage-exam/:id',          component: ManageExamComponent,     canActivate: [SecurityGuard] },
      { path: 'generate-report',          component: GenerateReportComponent, canActivate: [SecurityGuard] }
    ]
  },
  {path: '404', component: Error404Component},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
