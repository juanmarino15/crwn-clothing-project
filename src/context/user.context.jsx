import { createContext, useState, useEffect } from "react";
import {
	onAuthStateChangedListener,
	signOutUser,
} from "../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//as actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	// signOutUser();

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
