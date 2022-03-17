import { createStore } from "redux";
import rootReducer from "./reducers/reducer";

let initialState = {};

const store = createStore(rootReducer, initialState);
export default store;
