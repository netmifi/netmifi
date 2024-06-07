import { Action } from 'easy-peasy';

interface AuthState {
    isAuth: boolean;
    setIsAuth: Action<AuthState, boolean>; // Action with payload of type boolean
}

export interface model {
    auth: AuthState;
}