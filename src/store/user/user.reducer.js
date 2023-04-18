import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

//reducer function
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
	const { type, payload } = action; //de-structuring

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state, //spreading all previous values. anything afterwards is gonna be updated with current user
				//payload is the value that reducer use to pass and change
				currentUser: payload,
			};
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null };
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILED:
			return { ...state, error: payload };
		default:
			return state; //always return state
	}
};
