import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  email: string | null;
}

// ✅ Toujours initialisé à null pour éviter les undefined
export const initialState: AuthState = {
  email: null,
};

// ✅ Reducer sécurisé
export const authReducer = createReducer(
  initialState,
  on(login, (state, { email }) => ({
    ...state,
    email: email ?? null // sécurité si email undefined
  })),
  on(logout, (state) => ({
    ...state,
    email: null
  }))
);
