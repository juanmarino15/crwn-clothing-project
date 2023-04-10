import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
	currentUser: null,
};

//reducer function
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
	const { type, payload } = action; //de-structuring

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state, //spreading all previous values. anything afterwards is gonna be updated with current user
				//payload is the value that reducer use to pass and change
				currentUser: payload,
			};
		default:
			return state; //always return state
	}
};
