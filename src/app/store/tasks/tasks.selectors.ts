import { createSelector } from '@ngrx/store';
import { TasksState } from './task.reducer';
import { AuthState } from 'src/app/features/auth/auth.reducer';
import { AppState } from '../app.state';

// ✅ On prend le slice correct dans AppState
export const selectTasksState = (state: AppState) => state.tasks;
export const selectAuthState = (state: AppState) => state.auth;
export const selectUserEmail = (state: AppState) => state.auth?.email ?? null;


// ✅ Selector combiné
export const selectAllTasks = createSelector(
  selectTasksState,
  selectAuthState,
  (tasksState: TasksState, authState: AuthState) => {
    const email = authState?.email ?? '';
    return tasksState.tasks.filter(task => task.userEmail === email);
  }
);

