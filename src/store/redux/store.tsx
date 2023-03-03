import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./rootReducers";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default store;
