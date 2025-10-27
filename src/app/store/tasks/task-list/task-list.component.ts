import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../../../store/tasks/tasks.selectors';
import * as TasksActions from '../../../store/tasks/tasks.actions';
import { Task } from 'src/app/domain/task';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<Task[]>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  toggle(id: string) { 
    this.store.dispatch(TasksActions.toggleComplete({ id }));
  }

  delete(id: string) { 
    this.store.dispatch(TasksActions.deleteTask({ id })); 
  }
}
