//this file contains all reducers
// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";

//needed for redux to work

//root-reducer

//a curryfunc function that returnsback a function
const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}

	console.log("type:", action.type);
	console.log("payload:", action.payload);
	console.log("currentState:", store.getState());

	next(action);

	console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

// export const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [logger],
// });
