import nav, { NavModel } from './nav';
import auth, { AuthModel } from './auth';


export interface StoreModel {
    nav: NavModel,
    auth: AuthModel
  }

 const model: StoreModel = {
    nav,
    auth
  }

  export default  model;
//  interface NavState {
//     navState: boolean;
//     setNavState: Action<NavState, boolean>; // Action with payload of type boolean
// }

//  interface AuthState {
//     isAuth: boolean;
//     setIsAuth: Action<AuthState, boolean>; // Action with payload of type boolean
// }

// export interface model {
//     auth: AuthState;
//     nav: NavState,
// }