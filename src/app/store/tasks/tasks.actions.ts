import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/domain/task';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const toggleComplete = createAction(
  '[Task] Toggle Complete',
  props<{ id: string }>()
);

export const clearTasks = createAction('[Task] Clear Tasks');

export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ tasks: Task[] }>()
);
