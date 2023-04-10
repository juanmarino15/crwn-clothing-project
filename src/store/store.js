//this file contains all reducers
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

//needed for redux to work

//root-reducer

export const store = configureStore({
	reducer: rootReducer,
	middleware: [logger],
});
