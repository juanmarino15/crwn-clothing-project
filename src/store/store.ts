//this file contains all reducers
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { compose, applyMiddleware, Middleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger";
// import thunk from "redux-thunk"; //thunk approach
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
//needed for redux to work

export type RootState = ReturnType<typeof rootReducer>;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[];
};

//root-reducer

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== "production" && loggerMiddleware,
	sagaMiddleware,
	// thunk,
].filter((middleware): middleware is Middleware => Boolean(middleware));

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

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// export const store = configureStore({
// 	reducer: rootReducer,
// 	middleware: [logger],
// });
