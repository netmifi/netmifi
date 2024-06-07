import { action, createStore } from "easy-peasy";
import { model } from "./model";

const store = createStore<model>({
    /* --- auth states and thunks --- */
   auth: {
    isAuth: false,
    setIsAuth: action((state, payload) => {
        state.isAuth = payload;
    }),
   }
    /* --- auth states and thunks --- */
});

export default store;