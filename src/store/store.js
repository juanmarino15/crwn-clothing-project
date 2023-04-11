//this file contains all reducers
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

//needed for redux to work

//root-reducer

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
	Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

// export const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [logger],
// });
