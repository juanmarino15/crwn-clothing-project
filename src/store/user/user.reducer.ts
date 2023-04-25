import { AnyAction } from "redux";
import USER_ACTION_TYPES from "./user.types";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
} from "./user.action";

const USER_INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

//reducer function
export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signOutFailed.match(action) ||
		signInFailed.match(action) ||
		signUpFailed.match(action)
	) {
		return { ...state, error: action.payload };
	}

	return state;
};

// const { type, payload } = action; //de-structuring

// 	switch (type) {
// 		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
// 			return {
// 				...state, //spreading all previous values. anything afterwards is gonna be updated with current user
// 				//payload is the value that reducer use to pass and change
// 				currentUser: payload,
// 			};
// 		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
// 			return { ...state, currentUser: null };
// 		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
// 		case USER_ACTION_TYPES.SIGN_UP_FAILED:
// 		case USER_ACTION_TYPES.SIGN_IN_FAILED:
// 			return { ...state, error: payload };
// 		default:
// 			return state; //always return state
// 	}
// };
