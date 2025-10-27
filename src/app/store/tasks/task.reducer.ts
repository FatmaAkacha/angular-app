import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from 'src/app/domain/task';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TasksActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(TasksActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  on(TasksActions.toggleComplete, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  })),
  on(TasksActions.clearTasks, state => ({ ...state, tasks: [] })),
  on(TasksActions.loadTasks, (state, { tasks }) => ({ ...state, tasks }))
);
