import { action, Action } from "easy-peasy";


export interface NavModel {
    navState: boolean,
    set: Action<NavModel, boolean>
}

const nav:NavModel = {
    navState: false,
    set: action((state, payload)=> {
        state.navState = payload
    })
}

export default nav;