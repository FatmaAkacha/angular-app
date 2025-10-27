import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ✅ Composants
import { TaskFormComponent } from './store/tasks/task-form/task-form.component';
import { TaskListComponent } from './store/tasks/task-list/task-list.component';
import { LoginComponent } from './features/auth/login/login.component';

// ✅ NgRx Store
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from './store/tasks/task.reducer';
import { MainLayoutComponent } from './features/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    LoginComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // ✅ Initialisation du Store NgRx
    StoreModule.forRoot({
      tasks: tasksReducer
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
