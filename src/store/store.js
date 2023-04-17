//this file contains all reducers
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
import thunk from "redux-thunk";
//needed for redux to work

//root-reducer

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== "production" && loggerMiddleware,
	thunk,
].filter(Boolean);

const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
// export const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [logger],
// });
