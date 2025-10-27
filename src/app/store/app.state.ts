import { AuthState } from "../features/auth/auth.reducer";
import { TasksState } from "./tasks/task.reducer";

export interface AppState {
  tasks: TasksState;
  auth: AuthState;
}
