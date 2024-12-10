import { createStore, createTypedHooks } from "easy-peasy";
import model, { StoreModel } from "./models";


const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;




const store = createStore(model);

export default store;