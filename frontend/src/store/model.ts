import { Action } from 'easy-peasy';

interface NavState {
    navState: boolean;
    setNavState: Action<NavState, boolean>; // Action with payload of type boolean
}

interface AuthState {
    isAuth: boolean;
    setIsAuth: Action<AuthState, boolean>; // Action with payload of type boolean
}

export interface model {
    auth: AuthState;
    nav: NavState,
}