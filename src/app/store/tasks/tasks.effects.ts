import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as TasksActions from './tasks.actions';
import { Store } from '@ngrx/store';
import { selectAllTasks } from './tasks.selectors';
import { DataService } from 'src/app/service/data.service';
import { take } from 'rxjs/operators';
import { AppState } from '../app.state';

@Injectable()
export class TasksEffects {
  // Sauvegarde automatique dans localStorage
  persist$ = createEffect(() => this.actions$.pipe(
    ofType(
      TasksActions.addTask,
      TasksActions.updateTask,
      TasksActions.deleteTask,
      TasksActions.toggleComplete,
      TasksActions.loadTasks
    ),
    tap(() => {
      this.store.select(selectAllTasks).pipe(take(1)).subscribe(tasks => {
        const email = this.auth.currentEmail;
        if (email) {
          localStorage.setItem(`todos:${email}`, JSON.stringify(tasks));
        }
      });
    })
  ), { dispatch: false });

  // Chargement des tâches au login
  loadOnLogin$ = createEffect(() => this.actions$.pipe(
    ofType('[Auth] Login Success'),
    tap((payload: any) => {
      const email = payload.email;
      const raw = localStorage.getItem(`todos:${email}`) || '[]';
      const tasks = JSON.parse(raw);
      this.store.dispatch(TasksActions.loadTasks({ tasks }));
    })
  ), { dispatch: false });

  constructor(private actions$: Actions, private store: Store<AppState>, private auth: DataService) {}
}
