import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TaskFormComponent } from './store/tasks/task-form/task-form.component';
import { TaskListComponent } from './store/tasks/task-list/task-list.component';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: 'tasks', component: TaskListComponent },
      { path: 'add-task', component: TaskFormComponent }, // <-- ajouté
      { path: '', redirectTo: 'tasks', pathMatch: 'full' } // redirection par défaut
    ]
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
