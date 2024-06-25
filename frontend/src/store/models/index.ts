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

  export default model;