import { createContext, useState, useEffect, useReducer } from "react";
import {
	onAuthStateChangedListener,
	signOutUser,
} from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import USER_ACTION_TYPES from "../store/user/user.types";

//as actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

//reducer function
const userReducer = (state, action) => {
	const { type, payload } = action; //de-structuring

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state, //spreading all previous values. anything afterwards is gonna be updated with current user
				//payload is the value that reducer use to pass and change
				currentUser: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in userReducer`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	//use state approach
	// const [currentUser, setCurrentUser] = useState(null);

	//user reducer gives us two values. a state object and a dispatch function
	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE); //current reducer, and initial value are the args

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };

	//only running when second paramenter happens
	useEffect(() => {
		const unsuscribe = onAuthStateChangedListener((user) => {
			//if there is a user coming through
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user); //setting  user state
		});
		return unsuscribe;
	}, []); //empty so only runs once(when mounting)
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

//reducer layout
/*
const userReducer = (state,action) =>{
	return {
		currentUser:
	}
}
*/
