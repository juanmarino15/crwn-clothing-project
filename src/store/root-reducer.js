import { combineReducers } from "redux"; //combine all reducers to one
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
	user: userReducer,
});
